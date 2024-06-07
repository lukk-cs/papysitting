import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import stylesDashboard4 from '../../styles/stylesDashboard4';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import stylesDashboard from '../../styles/stylesDashboard';
import { useRoute, useNavigation } from '@react-navigation/native';

const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const moments = ['matin', 'midi', 'a-m', 'soir'];

export default function App() {
  const [selections, setSelections] = useState({});
  const route = useRoute();
  const navigation = useNavigation();
  const { name, uid, startDate, frequency } = route.params;
  const [chosenMoments, setChosenMoments] = useState({});
  const momentChosen = Object.values(selections).some(moment => Object.values(moment).some(value => value));

  const toggleSelection = (jour, moment) => {
    setSelections(prev => ({
      ...prev,
      [jour]: {
        ...prev[jour],
        [moment]: !prev[jour]?.[moment]
      }
    }));
  };

  useEffect(() => {
    const updatedChosenMoments = {};
  
    jours.forEach(jour => {
      const momentsSelected = moments.filter(moment => selections[jour]?.[moment]);
      if (momentsSelected.length > 0) {
        updatedChosenMoments[jour] = momentsSelected;
      }
    });
  
    setChosenMoments(updatedChosenMoments);
  }, [selections]);
  
  console.log(chosenMoments)

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={stylesDashboard.scrollContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={stylesDashboard4.container}>
          {jours
            .sort((a, b) => jours.indexOf(a) - jours.indexOf(b))
            .map((jour, index) => (
              <View key={jour} style={stylesDashboard4.row}>
                <Text style={stylesDashboard4.dayText}>{jour}</Text>
                <View style={stylesDashboard4.momentsContainer}>
                  {moments.map(moment => (
                    <TouchableOpacity
                      key={moment}
                      style={[
                        stylesDashboard4.button,
                        selections[jour]?.[moment] ? stylesDashboard4.selected : null
                      ]}
                      onPress={() => toggleSelection(jour, moment)}
                    >
                      <Text style={[
                        stylesDashboard4.text,
                        selections[jour]?.[moment] ? stylesDashboard4.textSelected : stylesDashboard4.text
                      ]}>{moment}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {index < jours.length && <View style={stylesDashboard4.daySeparator} />}
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={stylesDashboard.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, momentChosen ? styles.button : stylesDashboard.buttonInactive]}
            onPress={() => navigation.navigate('Dashboard5', { name: name, uid : uid, startDate: startDate, frequency: frequency, chosenMoments: chosenMoments })}
            disabled={!startDate}
          >
            <Text style={styles.loginTextButton}>Faire une demande</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
