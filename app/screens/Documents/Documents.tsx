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

const Documents = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {uid} = route.params;

  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={stylesContainers.scrollContainer}>
        <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
          <View style={stylesDocuments.container}>
            <Text style={stylesDocuments.title}>Téléchargez les documents suivants pour vos premières visites !</Text>
            <View style={stylesDocuments.itemContainer}>
              <Ionicons name="document-outline" size={24} color="black" />
              <TouchableOpacity style={stylesDocuments.button} onPress={() => navigation.navigate('Identity', {uid : uid})}>
                <Text style={stylesDocuments.buttonText}>Document d'identité</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={stylesDocuments.itemContainer}>
              <Ionicons name="document-outline" size={24} color="black" />
              <TouchableOpacity style={stylesDocuments.button} onPress={() => navigation.navigate('Insee', {uid : uid})}>
                <Text style={stylesDocuments.buttonText}>Déclaration Insee ou Kbis</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={stylesDocuments.itemContainer}>
              <Ionicons name="document-outline" size={24} color="black" />
              <TouchableOpacity style={stylesDocuments.button} onPress={() => navigation.navigate('Crime', {uid : uid} )}>
                <Text style={stylesDocuments.buttonText}>Casier judiciare</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={stylesDocuments.itemContainer}>
              <Ionicons name="document-outline" size={24} color="black" />
              <TouchableOpacity style={stylesDocuments.button} onPress={() => navigation.navigate('RIB', {uid : uid})}>
                <Text style={stylesDocuments.buttonText}>RIB</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>

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
