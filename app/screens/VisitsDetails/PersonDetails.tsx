import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import stylesDashboard from '../../styles/stylesDashboard';
import stylesDashboard4 from '../../styles/stylesDashboard4';
import stylesPersonDetails from '../../styles/stylesPersonDetails';
import { createMatchingDoc, markOfferAsDeclined, updateAvailabilityStatus } from '../../functions/functionsMatching';

const PersonDetails = () => {
  const route = useRoute();
  const { uid_young, uid_old, firstName, lastName, address, availability, annonceId } = route.params;
  const navigation = useNavigation();

  const handleDeclineOffer = () => {
    const db = FIREBASE_DB
    markOfferAsDeclined(db, annonceId, uid_young); // je définirai uid_young plus tard
  };
  console.log(uid_old, firstName, lastName, address, availability);


  const handleAcceptOffer = () => {
    updateAvailabilityStatus(uid_young, annonceId, availability)
    createMatchingDoc(uid_young, uid_old, availability)
    navigation.navigate('Dashboard')
  }

  const formatAvailability = (availability) => {
    let formattedAvailability = '';
    // Ordre des jours de la semaine
    const daysOrder = ['Lundi matin', 'Lundi midi', 'Lundi a-m', 'Lundi soir', 'Mardi matin', 'Mardi midi', 'Mardi a-m', 'Mardi soir', 'Mercredi matin', 'Mercredi midi', 'Mercredi a-m', 'Mercredi soir', 'Jeudi matin', 'Jeudi midi', 'Jeudi a-m', 'Jeudi soir', 'Vendredi matin', 'Vendredi midi', 'Vendredi a-m', 'Vendredi soir'];
    // Trier les jours de disponibilité selon l'ordre défini
    const sortedDays = Object.keys(availability).sort((a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b));
    // Construire la chaîne de caractères formatée avec les jours dans l'ordre souhaité
    sortedDays.forEach(day => {
      formattedAvailability += `${day}: ${availability[day][0]}h\n`;
    });
    return formattedAvailability;
  };
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={styles.scrollContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={stylesDashboard4.scrollContainer} nestedScrollEnabled={true}>
          <View style={styles.container}>
            <Text>Nom: {firstName}</Text>
            <Text>Prénom: {lastName}</Text>
            <Text>Adresse: {address}</Text>
            <Text>Disponibilité commune:</Text>
            <Text>{formatAvailability(availability)}</Text>
          </View>
        </ScrollView>
        <View style={stylesDashboard.buttonContainer}>
          <TouchableOpacity style={stylesPersonDetails.buttonDecline}
            onPress={handleDeclineOffer}>
            <Text style={styles.textWhiteButton}>Refuser</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesPersonDetails.buttonAccept}
            onPress={handleAcceptOffer}
          >
            <Text style={styles.loginTextButton}>Accepter</Text>
          </TouchableOpacity>
        </View> 
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PersonDetails;