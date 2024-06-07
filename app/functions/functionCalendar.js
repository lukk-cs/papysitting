import moment from 'moment';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';

/**
 * Récupère les dates des événements futurs pour un utilisateur donné.
 * @param {string} uid - L'identifiant de l'utilisateur.
 * @returns {Promise<Array<string>>} - Les dates des événements futurs.
 */
export const getFutureEventDates = async (uid) => {
    const currentDate = moment().format('YYYY-MM-DD');
    const eventsCollection = collection(FIREBASE_DB, 'calendar');
    const q = query(eventsCollection, 
                    where('date', '>=', currentDate), 
                    where('uid', '==', uid));
      
    try {
        const querySnapshot = await getDocs(q);
      
        if (querySnapshot.empty) {
            console.log('Aucun événement futur trouvé pour cet utilisateur.');
            return [];
        }
      
        // Récupérer les dates des événements futurs
        const eventDates = querySnapshot.docs.map(doc => {
            const eventData = doc.data();
            return eventData.date;
        });

        return eventDates;

    } catch (error) {
        console.error('Erreur lors de la récupération des événements futurs :', error);
        return [];
    }
}

/**
 * Récupère les événements pour une date spécifique et un utilisateur donné.
 * @param {string} date - La date au format 'YYYY-MM-DD'.
 * @param {string} uid - L'identifiant de l'utilisateur.
 * @returns {Promise<Array<Object>>} - Les événements pour la date donnée.
 */
export const getEventsForDate = async (date, uid) => {
    const eventsCollection = collection(FIREBASE_DB, 'calendar');
    const q = query(eventsCollection, 
                    where('date', '==', date), 
                    where('uid', '==', uid));
      
    try {
        const querySnapshot = await getDocs(q);
      
        if (querySnapshot.empty) {
            console.log('Aucun événement trouvé pour cette date et cet utilisateur.');
            return [];
        }
      
        // Mapper les documents snapshot en objets JS avec toutes les informations
        const events = querySnapshot.docs.map(doc => {
            const eventData = doc.data();
            return {
                id: doc.id,
                ...eventData // Récupère toutes les propriétés de l'événement
            };
        });
        return events;

    } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
        return [];
    }
}
