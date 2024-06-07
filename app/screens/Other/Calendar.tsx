import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import styles from '../../styles/styles';
import moment from 'moment';
import { getFutureEventDates, getEventsForDate } from '../../functions/functionCalendar'; // Importer les fonctions Firebase
import { FIREBASE_AUTH } from '../../../FirebaseConfig';

const App = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [eventsForDate, setEventsForDate] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [uid, setUid] = useState('');

  const startDate = selectedStartDate
  ? moment(selectedStartDate).format('YYYY-MM-DD').toString()
  : '';
  const [highlightedDates, setHighlightedDates] = useState([]);
  
    {/* Récupère l'uid de l'user et ses évènement futurs
    met une gomette rouge sur tous les jours où il y a qqch*/}
  useEffect(() => {
    const fetchFutureEventDates = async () => {
        try {
            const user = FIREBASE_AUTH.currentUser;
            if (user) {
                setUid(user.uid);
                const futureEventDates = await getFutureEventDates(uid);
                setHighlightedDates(futureEventDates);
                console.log('dates future : ', futureEventDates);
            } else {
                console.error('Utilisateur non connecté');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des dates d\'événements futurs :', error);
        }
    };

    fetchFutureEventDates();
}, [uid]);

    {/* Récupère la date du jour sur lequel l'user clique
    récupère les évènements liés à cette date
    affiche les éléments */}
    const handleDateChange = async (date) => {
        setSelectedStartDate(date);
        const events = await getEventsForDate(moment(date).format('YYYY-MM-DD').toString(), uid);
        console.log('events : ', events);
        setEventsForDate(events);
        setShowEventModal(events.length > 0);
    };
    

      return (
        <View style={styles.container}>
        <Modal
            visible={showEventModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowEventModal(false)}>
            <View style={styles.container}>
                <Text style={styles.gridTitle}>Événements pour le {startDate} :</Text>
                {eventsForDate.map((event, index) => (
                    <TouchableOpacity key={index} style={styles.listItem}>
                        <Text>Description: {event.desc}</Text>
                        <Text>Heure: {event.hour}</Text>
                        {/* Affichez toutes les autres informations de l'événement ici */}
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.Button51} onPress={() => setShowEventModal(false)}>
                    <Text style={styles.editButtonText}>Fermer</Text>
                </TouchableOpacity>
            </View>
        </Modal>


            <CalendarPicker 
                selectedDayColor="#2E66E7" // Couleur du jour sélectionné
                selectedDayTextColor="#FFFFFF" // Couleur du texte du jour sélectionné
                todayBackgroundColor="#F2F2F2" // Couleur de fond de la date d'aujourd'hui
                todayTextStyle={{ color: '#333' }} // Style du texte de la date d'aujourd'hui
                textStyle={{ color: '#000' }} // Style du texte de toutes les dates
                customDatesStyles={highlightedDates.map(date => ({
                    date: moment(date, 'YYYY-MM-DD').toDate(),
                    style: { backgroundColor: 'red' }, // Style personnalisé pour les dates des événements futurs
                    textStyle: { color: 'white' }
                }))}                
                onDateChange={handleDateChange} />


        </View>
    );
}

export default App;
