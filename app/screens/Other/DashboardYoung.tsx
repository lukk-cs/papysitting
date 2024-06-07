import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { useNavigation } from '@react-navigation/native';
import { handleLogout } from "../../functions/functionsAuthentification";
import { getUserData } from "../../functions/functionsDatabase";
import styles from "../../styles/styles";
import { TouchableOpacity } from "react-native";


const DashboardYoung = () => {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('');


      useEffect(() => {
        const fetchData = async () => {
          try {
            const user = FIREBASE_AUTH.currentUser;
            
            if (user) {
              const fetchedUserName = await getUserData(user.uid);
              if (fetchedUserName) {
                setUserName(fetchedUserName);
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
    


    return (
        <View style={styles.container}>
            <Text style = {styles.loginText}> Bienvenue {userName} !</Text>
            <TouchableOpacity style ={styles.loginButton} onPress={() => navigation.navigate('MeetingYoung')}>
              <Text style={styles.loginTextButton}>Publier une annonce</Text>
            </TouchableOpacity>
            <Button title="Voir les annonces de personnes âgées" onPress={() => navigation.navigate('ListOld')} />
            <Button title="Voir mes annonces" onPress={() => navigation.navigate('ListSelfYoung')} />

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('ChatScreen')}>
                <Text style={styles.loginTextButton}>Accéder à la messagerie</Text>
            </TouchableOpacity>

            <Button title="Deconnexion" onPress={() => handleLogout(navigation)} />
        </View>

        
    );
};


export default DashboardYoung;
