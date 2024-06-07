import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { Slider } from 'react-native-elements';
import stylesDashboard4 from '../../styles/stylesDashboard4';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import stylesDashboard from '../../styles/stylesDashboard';
import { post } from '../../functions/functionsDatabase';

const Dashboard5 = () => {
  const [selectedHours, setSelectedHours] = useState<{ [key: string]: [number, number] }>({});
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { name, uid, startDate, frequency, chosenMoments } = route.params;

  // Initialisation des heures à [1,0] pour chaque moment
  useEffect(() => {
    // Créer un objet avec toutes les heures initialisées à [1, 0]
    const initialHours: { [key: string]: [number, number] } = {};
  
    // Parcourir tous les jours de la semaine
    Object.keys(chosenMoments).forEach((jour: string) => {
      // Parcourir tous les moments du jour
      chosenMoments[jour].forEach((moment: string) => {
        // Définir l'heure à [1, 0] pour ce moment de la journée
        initialHours[`${jour} ${moment}`] = [1, 0];
      });
    });
  
    // Mettre à jour les heures sélectionnées avec les heures initialisées
    setSelectedHours(initialHours);
  }, []);
  
  
  useEffect(() => {
    console.log(selectedHours);
  }, [selectedHours]);

  // Fonction pour convertir l'heure au format souhaité
  const formatHour = (hourArray: [number, number]) => {
    const hour = hourArray[0];
    const integerPart = Math.floor(hour);
    const decimalPart = hour % 1;
    const minute = decimalPart === 0 ? '' : decimalPart === 0.5 ? '30' : '00';
    return `${integerPart}h${minute}`;
  };
  

  const handleHourChange = (moment: string, hour: number) => {
    // Assurez-vous que l'heure est toujours au moins 1
    const adjustedHour = Math.max(1, hour);
  
    setSelectedHours(prev => ({
      ...prev,
      [moment]: [adjustedHour, 0] as [number, number]
    }));
  };
  
  
  const getDisplayHour = (hourArray: [number, number]) => { // Définir le type de hourArray comme [number, number]
    return hourArray[0]; // Renvoie la première valeur du tableau (le nombre d'heures)
  };
  

  // Triez les jours de la semaine
  const sortedDays = Object.keys(chosenMoments).sort((a, b) => {
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    return days.indexOf(a) - days.indexOf(b);
  });

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={stylesDashboard.scrollContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={stylesDashboard4.scrollContainer} nestedScrollEnabled={true}>
          <View style={stylesDashboard4.container}>
            {sortedDays.map((jour, index) => (
              <View key={jour} style={stylesDashboard4.row}>
                {chosenMoments[jour].sort().map((moment: string) => (
                  <View key={`${jour} ${moment}`} style={stylesDashboard4.row}>
                    <Text style={stylesDashboard4.dayText}>{jour} {moment}</Text>
                    <View style={stylesDashboard4.momentsContainer}>
                      <Slider
                          style={stylesDashboard4.slider}
                          value={selectedHours[`${jour} ${moment}`] ? getDisplayHour(selectedHours[`${jour} ${moment}`]) : 1}
                          minimumValue={1}
                          maximumValue={4}
                          step={0.5}
                          thumbTintColor="#4f9deb"
                          onValueChange={hour => handleHourChange(`${jour} ${moment}`, hour)}
                          thumbStyle={stylesDashboard4.thumbStyle}
                        />
                      <View style={stylesDashboard4.sliderValueContainer}>
                        <Text style={stylesDashboard4.sliderValue}>{formatHour(selectedHours[`${jour} ${moment}`] || 1)}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={stylesDashboard.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000f" />
              ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => post(name, startDate, frequency, uid, selectedHours, setLoading, navigation)}
            >
              <Text style={styles.loginTextButton}>Finaliser ma demande</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default Dashboard5;
