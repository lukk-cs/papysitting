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
import { checkAllDocuments } from '../../functions/functionsDatabase';

const Documents = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {uid} = route.params;
  const [documentStatus, setDocumentStatus] = useState({
    idExists: false,
    inseeExists: false,
    crimeExists: false,
    ribExists: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { idExists, inseeExists, crimeExists, ribExists } = await checkAllDocuments(uid);
        setDocumentStatus({ idExists, inseeExists, crimeExists, ribExists });
      } catch (error) {
        console.error('Error fetching document statuses:', error);
      }
    };

    fetchData();
  }, [uid]);

  const renderDocumentItem = (title, onPress, exists) => (
    <View>
      <View style={stylesDocuments.itemContainer}>
        <Ionicons name="document-outline" size={24} color="black" />
        <TouchableOpacity style={stylesDocuments.button} onPress={onPress}>
          <Text style={stylesDocuments.buttonText}>{title}</Text>
          <Ionicons name={exists ? "create-outline" : "chevron-forward-outline"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style = {{ marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#a0a5a8',
        paddingBottom: 10,}}>
        {!exists && <Text style={stylesDocuments.notUploadedText}>Document non déposé</Text>}
      </View>
    </View>
  );


  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={stylesContainers.scrollContainer}>
        <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
          <View style={stylesDocuments.container}>
            <Text style={stylesDocuments.title}>Téléchargez les documents suivants pour vos premières visites !</Text>
            {renderDocumentItem("Document d'identité", () => navigation.navigate('Identity', { uid }), documentStatus.idExists)}
            {renderDocumentItem("Déclaration Insee ou Kbis", () => navigation.navigate('Insee', { uid }), documentStatus.inseeExists)}
            {renderDocumentItem("Casier judiciare", () => navigation.navigate('Crime', { uid }), documentStatus.crimeExists)}
            {renderDocumentItem("RIB", () => navigation.navigate('RIB', { uid }), documentStatus.ribExists)}
          </View>
        </SafeAreaProvider>
      </ScrollView>
      <View style={stylesRegister.buttonContainer}>
        <TouchableOpacity
          onPress={() => console.log('caac')}
          style={styles.button}
        >
          <Text style={stylesLogin.textButton}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Documents;
