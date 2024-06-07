import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; // Importation de Ionicons depuis le package react-native-vector-icons
import styles from '../../styles/styles';
import stylesRegister from '../../styles/stylesRegister';
import stylesLogin from '../../styles/stylesLogin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesContainers from '../../styles/stylesContainers';
import stylesDocuments from '../../styles/stylesDocuments';
import stylesAccountCreated from '../../styles/stylesAccountCreated';
import { postRIB } from '../../functions/functionsDatabase';

const RIB = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [RIB, setRIB] = useState('');
  const [nameRIB, setNameRIB] = useState('');
  const {uid} = route.params;
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={stylesContainers.scrollContainer}>
        <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
          <View style={stylesDocuments.container}>
            <Text style={stylesDocuments.title}>Nous avons besoin de ton RIB pour te rémunérer</Text>
            <Text style={stylesDocuments.subtitle}>Le RIB est essentiel pour recevoir facilement et de manière sécurisée les paiements de tes visites,Le RIB ne permet en aucun cas de prélever de l’argent sur ton compte.</Text>

            <View style={styles.registerInputContainer}>
                <TextInput
                  style={styles.Input}
                  placeholder="RIB"
                  value={RIB}
                  onChangeText={setRIB}
                />
                <TextInput
                  style={styles.Input}
                  placeholder="Titulaire du compte"
                  value={nameRIB}
                  onChangeText={setNameRIB}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Documents', {uid: uid})}
                    style={stylesAccountCreated.buttonPass}
                    >
                    <Text style={stylesAccountCreated.textButtonPass}>Renseigner mon RIB plus tard ></Text>
                </TouchableOpacity>
            </View>
          </View>
        </SafeAreaProvider>
      </ScrollView>
      <View style={stylesRegister.buttonContainer}>
        <TouchableOpacity
          onPress={() => postRIB(uid, RIB, nameRIB, setLoading)}
          style={styles.button}
        >
          <Text style={stylesLogin.textButton}>Valider</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RIB;
