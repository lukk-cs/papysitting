import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useId, useState } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import stylesDashboard from '../../styles/stylesDashboard';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { getFirstName } from '../../functions/functionsAuthentification';
import {handleLogout} from '../../functions/functionsAuthentification';
import stylesDocuments from '../../styles/stylesDocuments';
import { getUserProfileImage } from '../../functions/functionsStorage';
import stylesProfile from '../../styles/stylesProfile';


const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [uid, setUid] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;

        if (user) {
          const uid = user.uid
          setUid(uid);
          const fetchedUserName = await getFirstName(uid);

          if (fetchedUserName) {
            setName(fetchedUserName);
          } else {
            console.error('Prénom non trouvé');
          }
        } else {
          console.error('Utilisateur non connecté');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur :', error);
      }
    };

    fetchData();
  }, []);
  


  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        if (uid) {
          const imageUrl = await getUserProfileImage(uid);
          setImageUrl(imageUrl);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'URL de l'image de profil :", error);
      }
    };

    fetchProfileImage();
  }, [uid]);


  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={styles.scrollContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.Title}>Profil</Text>
            </View>
            
            <View style={stylesProfile.itemContainer1}>
              <View style={{marginLeft: 10 }}>
                {imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 60, height: 60, borderRadius: 30 }} />}
              </View>
              <TouchableOpacity style={stylesProfile.button} onPress={() => navigation.navigate('AddInfos', {name : name ,uid : uid})}>
                <View style={{
                  justifyContent: 'space-between',
                  width: '100%',
                  marginHorizontal: -20,
                  alignItems: 'center',
                } }>
                  <Text style={stylesProfile.buttonText}>{name}</Text>
                  <Text style={stylesProfile.buttonSubText}>Éditer / voir mon profil</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.Subtitle2}>Paramètres</Text>

            <View style={stylesProfile.itemContainer}>
              <View style={{marginLeft: 10 }}>
                <Ionicons name="person-outline" size={24} color="black" />
              </View>
              <TouchableOpacity style={stylesProfile.button2} onPress={() => navigation.navigate('Identity', {uid : uid})}>
                <Text style={stylesProfile.buttonText2}>Informations personnelles</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={stylesProfile.itemContainer}>
              <View style={{marginLeft: 10 }}>
                <Ionicons name="calendar-outline" size={24} color="black" />
              </View>
              <TouchableOpacity style={stylesProfile.button2} onPress={() => navigation.navigate('Identity', {uid : uid})}>
                <Text style={stylesProfile.buttonText2}>Mes disponibilités</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>


            <View style={stylesProfile.itemContainer}>
              <View style={{marginLeft: 10 }}>
                <Ionicons name="wallet-outline" size={24} color="black" />
              </View>
              <TouchableOpacity style={stylesProfile.button2} onPress={() => navigation.navigate('Identity', {uid : uid})}>
                <Text style={stylesProfile.buttonText2}>Paiements et versements</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>



            <View style={stylesProfile.itemContainer}>
              <View style={{marginLeft: 10 }}>
                <Ionicons name="settings-outline" size={24} color="black" />
              </View>
              <TouchableOpacity style={stylesProfile.button2} onPress={() => navigation.navigate('Identity', {uid : uid})}>
                <Text style={stylesProfile.buttonText2}>Reglage du compte</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>



            <View style={stylesProfile.itemContainer}>
              <View style={{marginLeft: 10 }}>
                <Ionicons name="document-outline" size={24} color="black" />
              </View>
              <TouchableOpacity style={stylesProfile.button2} onPress={() => navigation.navigate('Documents', {uid : uid})}>
                <Text style={stylesProfile.buttonText2}>Mes documents</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.Subtitle2}>Assistance</Text>

            <View style={stylesProfile.itemContainer}>
              <View style={{marginLeft: 10 }}>
                <Ionicons name="help-circle-outline" size={24} color="black" />
              </View>
              <TouchableOpacity style={stylesProfile.button2} onPress={() => navigation.navigate('Identity', {uid : uid})}>
                <Text style={stylesProfile.buttonText2}>Aide</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={stylesDashboard.buttonContainer}>
              <TouchableOpacity style={{marginBottom: 30, marginTop: 20}} onPress={() => handleLogout(navigation)}>
                <Text style={{color: 'red', textDecorationLine: 'underline'}}>Déconnexion</Text>
              </TouchableOpacity>
            </View>

            
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
export default ProfileScreen;
