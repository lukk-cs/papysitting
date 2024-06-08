import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, Image, ScrollView, StatusBar } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from "../../styles/styles";
import stylesCalendar from "../../styles/stylesCalendar";
import { format } from "date-fns";
import CalendarPicker from 'react-native-calendar-picker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import stylesDashboard from "../../styles/stylesDashboard";

const BeginDate = () => {
  const route = useRoute();

  const { name, uid } = route.params;
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState(null); // Initialisation avec la date actuelle
  const [showEventModal, setShowEventModal] = useState(false);
  const startDate = selectedStartDate
    ? format(selectedStartDate, 'yyyy-MM-dd').toString()
    : '';

  {/* Récupère la date du jour sur lequel l'user clique
  récupère les évènements liés à cette datex
  affiche les éléments */}
  const handleDateChange = async (date) => {
    setSelectedStartDate(date);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={styles.scrollContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={stylesCalendar.container}>
            <CalendarPicker
              selectedDayColor='#0D3B66' // Couleur du jour sélecionné
              selectedDayTextColor="#FFFFFF" // Couleur du texte du jour sélectionné
              todayBackgroundColor="#F2F2F2" // Couleur de fond de la date d'aujourd'hui
              todayTextStyle={{ color: '#333' }} // Style du texte de la date d'aujourd'hui
              textStyle={{ color: '#000' }} // Style du texte de toutes les dates
              onDateChange={handleDateChange}
              selectedStartDate={selectedStartDate}
            />
          </View>

          <Text style={stylesCalendar.text}>Rémunation horaire : 13,50€ </Text>
        </ScrollView>

        <View style={stylesDashboard.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, startDate ? styles.button : stylesDashboard.buttonInactive]}
            onPress={() => navigation.navigate('Dashboard3', { name: name, uid: uid, startDate: startDate })}
            disabled={!startDate}
          >
            <Text style={styles.loginTextButton}>Faire une demande</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default BeginDate;
