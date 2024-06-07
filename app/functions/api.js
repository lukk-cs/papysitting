import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { getFirstName } from './functionsAuthentification';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { proposeMatchingOlds } from './functionsMatching';


// Fonction pour vérifier si un jour est passé par rapport à la date actuelle
const isPastDay = (day) => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 pour dimanche, 1 pour lundi, etc.
    return day < dayOfWeek;
  };
  
const filterObsoleteByDate = (oldsList) => {
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Début de la semaine actuelle
  
    return oldsList.filter(old => {
      if (old.freq === 'ponctuelle') {
        const beginDate = new Date(old.begin);
        console.log('beginDate : ', beginDate)
        console.log('currentWeekStart : ', currentWeekStart)
        return beginDate >= currentWeekStart; // Garder les annonces dont la date de début est de la semaine actuelle ou à venir
      }
      return true; // Garder toutes les autres annonces
    });
};
  
// Fonction pour filtrer les jours obsolètes dans les demandes de visites ponctuelles
const filterObsoleteDays = (oldsList) => {
  const currentDate = new Date();
  const currentDay = (currentDate.getDay() + 6) % 7; // Ajuster pour que lundi soit 0
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  return oldsList.map(old => {
    if (old.freq === 'ponctuelle') {
      const beginDate = new Date(old.begin);
      const beginDay = (beginDate.getDay() + 6) % 7; // Ajuster pour que lundi soit 0
      const daysToRemove = [];

      // Parcourir les jours de la semaine dans la demande
      for (const day in old.hours) {
        if (old.hours.hasOwnProperty(day)) {
          const dayName = day.split(' ')[0]; // Extraire le jour de la semaine
          const dayIndex = daysOfWeek.indexOf(dayName);
          if (dayIndex === -1) continue;

          // Supprimer les jours de la semaine avant la date de début ou avant le jour actuel si la date de début est passée
          if ((beginDate <= currentDate && dayIndex < currentDay) || (beginDate > currentDate && dayIndex < beginDay)) {
            daysToRemove.push(day);
          }
        }
      }

      // Supprimer les jours obsolètes de la demande
      daysToRemove.forEach(day => {
        delete old.hours[day];
      });
    }
    return old;
  });
};

  
  

export const fetchMatchingOlds = async (
  setUid,
  setHasMadeRequest,
  setDates,
  setFreq,
  setBegin,
  setAddress,
  setUserName,
  setMatchingOlds,
  setLoading
) => {
    
  setLoading(true);
  try {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;
    const user = auth.currentUser;
    if (user) {
      const currentUserUid = user.uid;
      setUid(currentUserUid);

            const q = query(collection(db, 'annoncesJeunes'), where('user', '==', currentUserUid));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size > 0) {
                setHasMadeRequest(true);
                const docData = querySnapshot.docs[0].data();
                const hours = docData.hours;
                const freq = docData.freq;
                const begin = docData.begin;
                const dates = Object.keys(hours);
                const address = docData.address;
                setDates(dates);
                setFreq(freq);
                setBegin(begin);
                setAddress(address);
            } else {
                setHasMadeRequest(false);
            }

            const fetchedUserName = await getFirstName(currentUserUid);
            if (fetchedUserName) {
                setUserName(fetchedUserName);
            } else {
                console.error('Prénom non trouvé');
            }

            // Récupérer les disponibilités du jeune depuis la collection annoncesJeunes
            const jeunesRef = collection(db, 'annoncesJeunes');
            const jeunesQuery = query(jeunesRef, where('user', '==', currentUserUid));
            const jeunesSnapshot = await getDocs(jeunesQuery);
            let youngAvailability = {};
            jeunesSnapshot.forEach(doc => {
                youngAvailability = doc.data().hours;
            });

            // Récupérer les coordonnées du jeune depuis la collection youngs
            const youngsRef = collection(db, 'youngs');
            const youngQuery = query(youngsRef, where('uid', '==', currentUserUid));
            const youngSnapshot = await getDocs(youngQuery);
            let youngLocation = { latitude: 0, longitude: 0 };
            youngSnapshot.forEach(doc => {
                const { lat, long } = doc.data();
                youngLocation = { latitude: lat, longitude: long };
            });

            // Récupérer la liste des vieux depuis la collection annoncesVieux
            const vieuxRef = collection(db, 'annoncesVieux');
            const vieuxSnapshot = await getDocs(vieuxRef);
            const oldsList = [];
            vieuxSnapshot.forEach(doc => {
                const oldData = doc.data();
                const matchingHours = {};
                for (const day in oldData.hours) {
                    if (oldData.hours.hasOwnProperty(day) && youngAvailability.hasOwnProperty(day)) {
                        const oldHours = oldData.hours[day][0];
                        const youngHours = youngAvailability[day][0];
                        if (oldHours <= youngHours) { // si le jeune est dispo plus d'heure que le vieux demande, on rajoute le créneau dans matchinghours
                            matchingHours[day] = oldData.hours[day];
                        }
                    }
                }
                if (Object.keys(matchingHours).length > 0) { // si il y a des horaires qui matchent
                    oldsList.push({ 
                        ...oldData, 
                        matchingHours, 
                        annonceId: doc.id, // Ajout de l'ID de l'annonce
                        freq: oldData.freq
                    });
                }
            });

            // Filtrage des annonces obsolètes
            let filteredOldsList = filterObsoleteByDate(oldsList);
            filteredOldsList = filterObsoleteDays(filteredOldsList);

            console.log('oldslist : ', oldsList)

            const matchingOlds = await proposeMatchingOlds(youngAvailability, youngLocation, filteredOldsList, 10000000000000000000);

            // Récupérer les annonces déclinées par le jeune
            const declinedOlds = [];
            vieuxSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.declined && data.declined.includes(currentUserUid)) {
                declinedOlds.push(doc.id);
                console.log('Annonce déclinée:', doc.id);
                }
            });

            // Filtrer les annonces pour exclure celles qui ont été déclinées par le jeune
            const finalMatchingOlds = matchingOlds.filter(old => {
                return !declinedOlds.includes(old.annonceId);
            });

        // Mettre à jour l'état matchingOlds avec les annonces filtrées
        setMatchingOlds(finalMatchingOlds);
        } else {
        console.error('Utilisateur non connecté');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
    setLoading(false);
};


export const fetchOldNames = async (uid_young, setUidYoung, setOldNames) => {
    try {
        const auth = FIREBASE_AUTH;
        const user = auth.currentUser;
        const db = FIREBASE_DB;
        if (user) {
            const uid = await user.uid;
            setUidYoung(uid);

            // Récupérer les matchings associés à l'uid_young
            const matchingsRef = collection(db, 'matchings');
            console.log('Récupération des matchings..');
            const matchingsQuery = query(matchingsRef, where('uid_young', '==', uid_young));
            
            const matchingsSnapshot = await getDocs(matchingsQuery);
            const oldIds = [];
            matchingsSnapshot.forEach(doc => {
                const matchingData = doc.data();
                oldIds.push(matchingData.uid_old);
            });
            // Récupérer les noms associés aux uid_old
            const vieuxRef = collection(db, 'olds'); // Adapter en fonction de votre nom de collection
            const vieuxNames = [];
            for (const oldId of oldIds) {
                const vieuxQuery = query(vieuxRef, where('uid', '==', oldId));
                const vieuxDoc = await getDocs(vieuxQuery);
                const vieuxData = vieuxDoc.docs[0].data();
                const vieuxName = `${vieuxData.firstName} ${vieuxData.lastName}`;
                vieuxNames.push({ uid_old: oldId, name_old: vieuxName });
            }
            // Mettre à jour l'état avec les noms des vieux
            setOldNames(vieuxNames);
        } else {
            console.error('Utilisateur non connecté');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des noms utilisateur :', error);
    }
};