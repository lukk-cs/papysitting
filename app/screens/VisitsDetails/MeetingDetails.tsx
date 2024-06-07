import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import stylesDashboard from '../../styles/stylesDashboard';
import stylesDashboard4 from '../../styles/stylesDashboard4';
import stylesPersonDetails from '../../styles/stylesPersonDetails';
import { createMatchingDoc, markOfferAsDeclined, updateAvailabilityStatus } from '../../functions/functionsMatching';
import { getUserProfileImage } from '../../functions/functionsStorage';
import stylesAddInfos from '../../styles/stylesAddInfos';
import stylesMeetingDetails from '../../styles/stylesMeetingDetails';
import { Ionicons } from '@expo/vector-icons';

const MeetingDetails = () => {
  const route = useRoute();
  const { uid_young, uid_old, availability, oldName, address, annonceId } = route.params;
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const navigation = useNavigation();

    useEffect(() => {
        const fetchProfileImage = async () => {
            const imageUrl = await getUserProfileImage(uid_old);
            if (imageUrl) {
                setProfileImageUrl(imageUrl);
            }
        };

        fetchProfileImage();
    }, []);
    console.log(uid_young)
  console.log('url : ', profileImageUrl);


  const formatAvailability = (availability) => {
    let formattedAvailability = '';
    // Ordre des jours de la semaine
    const daysOrder = ['Lundi matin', 'Lundi midi', 'Lundi a-m', 'Lundi soir', 'Mardi matin', 'Mardi midi', 'Mardi a-m', 'Mardi soir', 'Mercredi matin', 'Mercredi midi', 'Mercredi a-m', 'Mercredi soir', 'Jeudi matin', 'Jeudi midi', 'Jeudi a-m', 'Jeudi soir', 'Vendredi matin', 'Vendredi midi', 'Vendredi a-m', 'Vendredi soir'];
    // Trier les jours de disponibilité selon l'ordre défini
    const sortedDays = Object.keys(availability).sort((a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b));
    // Construire la chaîne de caractères formatée avec les jours dans l'ordre souhaité
    console.log('sortedDays:', availability);
    sortedDays.forEach(day => {
      formattedAvailability += `${day}: ${availability[day]}h\n`;
    });
    return formattedAvailability;
  };
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={styles.scrollContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={stylesMeetingDetails.container}>
          <ScrollView contentContainerStyle={stylesDashboard4.scrollContainer} nestedScrollEnabled={true}>
            <Text style = {stylesMeetingDetails.title}>Tu rends visites à {oldName}</Text>
            <View style={stylesAddInfos.imageContainer}>
              {profileImageUrl ? (
                <Image source={{ uri: profileImageUrl }} style={{ width: '100%', height: 200, borderRadius: 12 }} />
              ) : (
                <View style={{ width: '100%', height: 200, borderRadius: 12, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                  <Ionicons name="person-outline" size={100} color="black" />
                </View>
              )}
            </View>

            <View style={stylesMeetingDetails.containerSchedule}>
              <Text style={stylesMeetingDetails.textBold}>{formatAvailability(availability)}</Text>
              <Text style={stylesMeetingDetails.textBold}>{address}</Text>
            </View>
          </ScrollView>
        </View>
        <View style={stylesDashboard.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DeleteVisit')}>
            <Text style={styles.textItalic}>Annuler la visite ></Text>
          </TouchableOpacity>
        </View> 
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default MeetingDetails;