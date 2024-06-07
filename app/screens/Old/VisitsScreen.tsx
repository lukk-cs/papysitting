import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useId, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import stylesDashboard from '../../styles/stylesDashboard';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { getFirstName } from '../../functions/functionsAuthentification';
import {handleLogout} from '../../functions/functionsAuthentification';

const VisitsScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [uid, setUid] = useState('');


  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={styles.scrollContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.Title}>Visites</Text>
            </View>

            <View style={stylesDashboard.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddInfos', {name : name ,uid : uid})}>
                <Text style={styles.textButton}>Modifier mes disponibilités</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.Subtitle2}>À venir :</Text>

            <Text style={styles.Subtitle2}>En cours :</Text>

            <Text style={styles.Subtitle2}>Passées :</Text>

            
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default VisitsScreen;
