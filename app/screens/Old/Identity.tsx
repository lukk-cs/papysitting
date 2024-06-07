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

const Identity = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {uid} = route.params;

  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={stylesContainers.scrollContainer}>
        <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
          <View style={stylesDocuments.container}>
            <Text style={stylesDocuments.title}>Quel document possèdes-tu ?</Text>

            <View style={stylesRegister.buttonContainer}>
                <TouchableOpacity
                onPress={() => navigation.navigate('IdentityCard', {uid : uid})}
                style={stylesDocuments.blueButton}
                >
                <Text style={stylesDocuments.textBlueButton}>Carte d'identité</Text>
                </TouchableOpacity>
            </View>

            <View style={stylesRegister.buttonContainer}>
                <TouchableOpacity
                onPress={() => navigation.navigate('Passport', {uid : uid})}
                style={stylesDocuments.whiteButton}
                >
                <Text style={stylesDocuments.textWhiteButton}>Passeport</Text>
                </TouchableOpacity>
            </View>
          </View>
        </SafeAreaProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Identity;
