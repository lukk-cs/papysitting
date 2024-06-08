import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesContainers from '../../styles/stylesContainers';
import stylesDocuments from '../../styles/stylesDocuments';
import { getUserProfileImage } from '../../functions/functionsStorage';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../FirebaseConfig';
import { fetchOldNames } from '../../functions/api';
import stylesMessages from '../../styles/stylesMessages';
import styles from '../../styles/styles';

const MessagesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [uid_young, setUidYoung] = useState('');
  const [oldNames, setOldNames] = useState([]);
  const [oldImages, setOldImages] = useState([]); // Ajout d'un état pour stocker les URL des images de profil des vieux
  const auth = FIREBASE_AUTH;


  useEffect(() => {
    const user = auth.currentUser;
    const uid_young = user.uid;
    setUidYoung(uid_young);
    fetchOldNames(uid_young, setUidYoung, setOldNames);
  }, []);


  const fetchOldProfileImage = async (uid_old) => {
    try {
      const imageUrl = await getUserProfileImage(uid_old);
      return imageUrl;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'URL de l'image de profil du vieux :", error);
      return null;
    }
  };
  
  useEffect(() => {
    const fetchOldImages = async () => {
      const images = await Promise.all(oldNames.map(async (item) => {
        const imageUrl = await fetchOldProfileImage(item.uid_old);
        return imageUrl;
      }));
      setOldImages(images);
    };

    fetchOldImages();
  }, [oldNames]);
  

  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={stylesContainers.scrollContainer}>
        <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
          <View style={stylesDocuments.container}>
            <Text style={styles.Title}>Messages</Text>
            {oldNames.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>Planifie un rendez-vous pour pouvoir envoyer des messages !</Text>
            ) : (
              /* Boucle sur tous les items de oldNames */
              oldNames.map((item, index) => (
                <View key={index} style={stylesMessages.personContainer}>
                  {oldImages[index] ? (
                    <Image source={{ uri: oldImages[index] }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                  ) : (
                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }}>
                      <Ionicons name="person-outline" size={24} color="black" />
                    </View>
                  )}
                  <TouchableOpacity 
                    style={stylesDocuments.button} 
                    onPress={() => navigation.navigate('ChatPage', { uid_young: uid_young, uid_old: item.uid_old, name_old : item.name_old })}
                  >
                    <Text style={stylesDocuments.buttonText}>{item.name_old}</Text>
                    <Ionicons name="chevron-forward-outline" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </SafeAreaProvider>
      </ScrollView>
    </SafeAreaView>
  );
  
};

export default MessagesScreen;
