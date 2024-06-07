import { getDistance } from 'geolib';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig'
import { getFirstName } from '../functions/functionsAuthentification';

export const distance = async (uid_young, uid_old) => {
    try {
        const db = FIREBASE_DB;
        const youngs = collection(db, 'youngs');
        const olds = collection(db, 'olds');

        console.log('uid pour trouver la distance : ', uid_young, uid_old)
        const youngQuery = query(youngs, where('uid', '==', uid_young));
        const oldQuery = query(olds, where('uid', '==', uid_old));

        const querySnapshotYoung = await getDocs(youngQuery);
        const querySnapshotOld = await getDocs(oldQuery);

        if (querySnapshotYoung.empty || querySnapshotOld.empty) {
            console.error('Aucun document utilisateur trouvé pour ces UID.');
            return null;
        }

        const youngData = querySnapshotYoung.docs[0].data();
        const oldData = querySnapshotOld.docs[0].data();

        const { lat: lat_old, long: lon_old } = oldData;
        const { lat: lat_young, long: lon_young } = youngData;
        
        // Utilisez la fonction getDistance de geolib pour obtenir la distance
        console.log('latold :' , lat_old, 'lonold :', lon_old, 'latyoung :', lat_young, 'lonyoung :', lon_young)
        const distanceInMeters = getDistance(
            { latitude: lat_old, longitude: lon_old },
            { latitude: lat_young, longitude: lon_young },
            100 // precision à la centaine de metre
        );
        // Convertir la distance en kilomètres
        const distanceInKilometers = distanceInMeters / 1000;

        return distanceInKilometers;
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        return null;
    }
};


// Fonction pour filtrer les vieux avec des créneaux non-satisfaits qui correspondent aux dispos du jeune
export const filterOldsByAvailability = async (youngAvailability, oldsList) => {
    const matchingOlds = [];
    oldsList.forEach(old => {
        const oldAvailability = old.hours; // Supposons que chaque document dans annoncesVieux a une propriété "hours"
        const commonAvailability = {};
        for (const day in oldAvailability) {
            //if (oldAvailability.hasOwnProperty(day) && youngAvailability.hasOwnProperty(day)) {
                //if (oldAvailability[day][1] === 0 && youngAvailability[day][1] === 0 && oldAvailability[day][0] <= youngAvailability[day][0]) {
                    commonAvailability[day] = oldAvailability[day];
                //}
            //}
        }
        if (Object.keys(commonAvailability).length > 0) {
            matchingOlds.push({
                uid: old.user,
                commonAvailability: commonAvailability,
                annonceId: old.annonceId, // Transmettre annonceId
                freq: old.freq
            });
        }
    });
    return matchingOlds;
};

// Fonction pour filtrer les vieux en fonction de la distance
export const filterOldsByDistance = async (youngLocation, oldsList, maxDistance) => {
    const nearbyOlds = [];
    try {
        const db = FIREBASE_DB;
        const olds = collection(db, 'olds');
        // Parcourir la liste des vieux
        for (const old of oldsList) {
            // Récupérer les coordonnées du vieux depuis la collection olds
            const oldQuery = query(olds, where('uid', '==', old.uid));
            const querySnapshot = await getDocs(oldQuery);
            if (!querySnapshot.empty) {
                const oldData = querySnapshot.docs[0].data();
                const { firstName, lastName, address } = oldData;
                const oldLocation = { latitude: oldData.lat, longitude: oldData.long };
                // Calculer la distance entre le jeune et le vieux
                const distance = getDistance(youngLocation, oldLocation);

                // Vérifier si la distance est inférieure ou égale à la distance maximale autorisée
                if (distance <= maxDistance) {
                    nearbyOlds.push({
                        uid: old.uid,
                        firstName: firstName,
                        lastName: lastName,
                        address: address,
                        distance: parseFloat((distance / 1000).toFixed(1)),
                        commonAvailability: old.commonAvailability,
                        annonceId: old.annonceId, // Transmettre annonceId
                        freq: old.freq
                    });
                }
            }
            //console.log('nearbyOlds:', nearbyOlds)
        }
        return nearbyOlds;
    } catch (error) {
        console.error('Erreur lors du filtrage des vieux par distance :', error);
        return [];
    }
};

// Fonction pour proposer les vieux correspondants au jeune
export const proposeMatchingOlds = async (youngAvailability, youngLocation, oldsList, maxDistance) => {
    const matchingOldsByAvailability = await filterOldsByAvailability(youngAvailability, oldsList); // push pour chaque vieux (si les dispos collent) les horaires qui marchent + uid du vieux + id de l'annonce
    //console.log('matchingOldsByAvailability:', matchingOldsByAvailability);
    const matchingOldsByDistance = await filterOldsByDistance(youngLocation, matchingOldsByAvailability, maxDistance); //pour chaque vieux dans matchingOldsByAvailability renvoie uid, prenom, nom, addresse, id de l'annonce et dispos communes si le rayon est bon
    //console.log('matchingOldsByDistance:', matchingOldsByDistance);
    return matchingOldsByDistance; // ici on a tous les vieux qui ont les memes dispos et une distance qui colle avec maxDistance
};

// Fonction pour mettre à jour les heures dans annoncesJeunes et annoncesVieux
export const updateAvailabilityStatus = async (uid_young, annonceId_old, commonAvailability) => {
    try {
      const db = FIREBASE_DB;
      
      // Mettre à jour les heures dans annoncesJeunes
      //trouver annonceId_young à partir de uid_young
      const jeunesQuery = query(collection(db, 'annoncesJeunes'), where('user', '==', uid_young));
      const jeunesSnapshot = await getDocs(jeunesQuery);
      let annonceId_young = '';
      jeunesSnapshot.forEach(doc => {
          annonceId_young = doc.id;
      });

      const jeunesDocRef = doc(db, 'annoncesJeunes', annonceId_young);
      const newAvailabilityYoung = {};
      for (const day in commonAvailability) {
        if (commonAvailability.hasOwnProperty(day)) {
          newAvailabilityYoung[day] = [commonAvailability[day][0], 1];
        }
      }
      await updateDoc(jeunesDocRef, {
        hours: newAvailabilityYoung,
      });
  
      // Mettre à jour les heures dans annoncesVieux
      const vieuxDocRef = doc(db, 'annoncesVieux', annonceId_old);
      const newAvailabilityOld = {};
      for (const day in commonAvailability) {
        if (commonAvailability.hasOwnProperty(day)) {
          newAvailabilityOld[day] = [commonAvailability[day][0], 1];
        }
      }
      await updateDoc(vieuxDocRef, {
        hours: newAvailabilityOld,
      });
  
      console.log('Heures mises à jour avec succès dans annoncesJeunes et annoncesVieux');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des heures :', error);
    }
  };

  export const markOfferAsDeclined = async (db, annonceId, jeuneUid) => {
    try {
        // Récupérer l'annonce spécifique à partir de son ID
        const annonceRef = doc(db, 'annoncesVieux', annonceId);
        const annonceDoc = await getDoc(annonceRef);
        
        if (annonceDoc.exists()) {
            // Obtenir les données de l'annonce
            const annonceData = annonceDoc.data();

            // Vérifier si le champ "declined" existe déjà
            const declined = annonceData.declined || [];

            // Vérifier si l'UID du jeune n'est pas déjà présent dans la liste des refus
            if (!declined.includes(jeuneUid)) {
                // Ajouter l'UID du jeune à la liste des refus
                declined.push(jeuneUid);

                // Mettre à jour l'annonce avec le champ "declined" mis à jour
                await updateDoc(annonceRef, {
                    declined: declined
                });

                console.log(`L'offre avec l'ID ${annonceId} a été marquée comme refusée par le jeune avec l'UID ${jeuneUid}.`);
            } else {
                console.log(`L'offre avec l'ID ${annonceId} a déjà été refusée par le jeune avec l'UID ${jeuneUid}.`);
            }
        } else {
            console.log(`Aucune annonce trouvée avec l'ID ${annonceId}.`);
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'annonce :', error);
    }
};

export const createMatchingDoc = async (uid_young, uid_old, availability) => {
    // Créer un nouveau document dans la collection matchings
    try {
      const db = FIREBASE_DB;
      
      // Modifier la structure de l'objet availability
      const formattedAvailability = {};
      for (const day in availability) {
        if (availability.hasOwnProperty(day)) {
          formattedAvailability[day] = availability[day][0]; // Sélectionner la première valeur (heure) pour chaque jour
        }
      }
      
      // Ajouter le document dans la collection matchings
      const matchingDocRef = await addDoc(collection(db, 'matchings'), {
        uid_young,
        uid_old,
        availability: formattedAvailability // Utiliser la nouvelle structure modifiée
      });
      
      console.log('Nouveau document matchings créé avec ID: ', matchingDocRef.id);
    } catch (error) {
      console.error('Erreur lors de la création du document matchings :', error);
    }
};


// Fonction pour vérifier si un jour est passé par rapport à la date actuelle
const isPastDay = (day) => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 pour dimanche, 1 pour lundi, etc.
    return day < dayOfWeek;
  };
  
export const filterObsoleteByDate = (oldsList) => {
    const currentDate = new Date();
    const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())); // Début de la semaine actuelle
  
    return oldsList.filter(old => {
      if (old.freq === 'ponctuelle') {
        const beginDate = new Date(old.begin);
        //console.log('beginDate : ', beginDate)
        //console.log('currentWeekStart : ', currentWeekStart)
        return beginDate >= currentWeekStart; // Garder les annonces dont la date de début est de la semaine actuelle ou à venir
      }
      return true; // Garder toutes les autres annonces
    });
};
  
// Fonction pour filtrer les jours obsolètes dans les demandes de visites ponctuelles
export const filterObsoleteDays = (oldsList) => {
  const currentDate = new Date();
  const currentDay = (currentDate.getDay() + 6) % 7; // Ajuster pour que lundi soit 0
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  return oldsList.map(old => {
    if (old.freq === 'ponctuelle') {
      const beginDate = new Date(old.begin);
      const beginDay = (beginDate.getDay() + 6) % 7; // Ajuster pour que lundi soit 0
      const daysToRemove = [];

      // Calculer la différence en millisecondes entre beginDate et currentDate
      const millisecondsInOneDay = 1000 * 60 * 60 * 24;
      const differenceInMilliseconds = currentDate - beginDate;
      const differenceInDays = differenceInMilliseconds / millisecondsInOneDay;

      // Parcourir les jours de la semaine dans la demande
      for (const day in old.hours) {
        if (old.hours.hasOwnProperty(day)) {
          const dayName = day.split(' ')[0]; // Extraire le jour de la semaine
          const dayIndex = daysOfWeek.indexOf(dayName);
          if (dayIndex === -1) continue;

          // Supprimer les jours de la semaine avant la date de début ou avant le jour actuel si la date de début est passée depuis 7 jours
          if (differenceInDays > 7 || (beginDate <= currentDate && dayIndex < currentDay)) {
            //console.log('deleted day : ', day)
            //console.log(currentDate, beginDate, dayIndex, beginDay)
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


// Fonction pour filtrer les jours obsolètes dans les demandes de visites ponctuelles
export const filterObsoleteDaysNextVisits = async (fetchedMeetings) => {
  const currentDate = new Date();
  const currentDay = (currentDate.getDay() + 6) % 7; // Ajuster pour que lundi soit 0
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const db = FIREBASE_DB; // Remplacez par votre instance Firebase

  for (const meeting of fetchedMeetings) {
    if (meeting.freq === 'ponctuelle') {
      const beginDate = new Date(meeting.begin);
      const beginDay = (beginDate.getDay() + 6) % 7; // Ajuster pour que lundi soit 0
      const daysToRemove = [];

      // Calculer la différence en millisecondes entre beginDate et currentDate
      const millisecondsInOneDay = 1000 * 60 * 60 * 24;
      const differenceInMilliseconds = currentDate - beginDate;
      const differenceInDays = differenceInMilliseconds / millisecondsInOneDay;

      // Parcourir les jours de la semaine dans la demande
      for (const day in meeting.availability) {
        if (meeting.availability.hasOwnProperty(day)) {
          const dayName = day.split(' ')[0]; // Extraire le jour de la semaine
          const dayIndex = daysOfWeek.indexOf(dayName);
          if (dayIndex === -1) continue;

          // Supprimer les jours de la semaine avant la date de début ou avant le jour actuel si la date de début est passée depuis 7 jours
          if (differenceInDays > 7 || (beginDate <= currentDate && dayIndex < currentDay)) {
            daysToRemove.push(day);
          }
        }
      }

      // Supprimer les jours obsolètes de la demande dans la base de données Firebase
      for (const dayToRemove of daysToRemove) {
        delete meeting.availability[dayToRemove];
      }

      // Si meeting.availability est vide, supprimer toute la collection matchings
      if (Object.keys(meeting.availability).length === 0) {
        const matchingsRef = collection(db, 'matchings');
        const matchingDocRef = doc(matchingsRef, meeting.id);
        await deleteDoc(matchingDocRef);
      } else {
        // Mettre à jour les documents dans la collection matchings
        const matchingsRef = collection(db, 'matchings');
        const matchingDocRef = doc(matchingsRef, meeting.id);
        await updateDoc(matchingDocRef, {
          availability: meeting.availability
        });
      }
    }
  }

  // Filtrer les réunions après la mise à jour
  fetchedMeetings = fetchedMeetings.filter(meeting => Object.keys(meeting.availability).length > 0);

  return fetchedMeetings;
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
                        //console.log('jours de dispo pour le vieux et le jeune :', oldData, youngAvailability)
                        if (oldHours <= youngHours && oldData.hours[day][1] === 0 && youngAvailability[day][1] === 0) { // si le jeune est dispo plus d'heure que le vieux demande, on rajoute le créneau dans matchinghours
                            matchingHours[day] = oldData.hours[day];
                        }
                    }
                }
                //console.log('MATCHING HOURS : ', matchingHours)
                if (Object.keys(matchingHours).length > 0) { // si il y a des horaires qui matchent
                    oldsList.push({ 
                        ...oldData, 
                        matchingHours, 
                        annonceId: doc.id, // Ajout de l'ID de l'annonce
                        freq: oldData.freq
                    });
                }
            });

            //console.log('OLDS : ', oldsList)
            // Filtrage des annonces obsolètes
            let filteredOldsList = filterObsoleteByDate(oldsList);
            filteredOldsList = filterObsoleteDays(filteredOldsList);
            //console.log('FILTERED OLDS : ', filteredOldsList)


            const matchingOlds = await proposeMatchingOlds(youngAvailability, youngLocation, filteredOldsList, 10000000000000000000);

            // Récupérer les annonces déclinées par le jeune
            const declinedOlds = [];
            vieuxSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.declined && data.declined.includes(currentUserUid)) {
                declinedOlds.push(doc.id);
                }
            });

            //console.log('Annonces déclinées:', declinedOlds);

            // Filtrer les annonces pour exclure celles qui ont été déclinées par le jeune
            const finalMatchingOlds = matchingOlds.filter(old => {
                return !declinedOlds.includes(old.annonceId);
            });

        //console.log('FINALMATCHING : ', finalMatchingOlds)
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
            //console.log('Identifiants des vieux récupérés :', oldIds);
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
            console.log('Noms des vieux récupérés :', vieuxNames)
        } else {
            console.error('Utilisateur non connecté');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
    }
};