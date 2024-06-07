import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesContainers from '../../styles/stylesContainers';
import stylesFirstPage from '../../styles/stylesFirstPage';

const FirstPage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={stylesContainers.scrollContainer}>
        <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
            <View style={stylesFirstPage.titleContainer}>
                <Text style={stylesFirstPage.Title}>Bienvenue chez Pappiness</Text>
                <Text style={stylesFirstPage.Subtitle}>Une communauté d'entraide intergénérationnelle</Text>
            </View>

            <View style={stylesFirstPage.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={stylesFirstPage.blueButton}
                >
                    <Text style={stylesFirstPage.textBlueButton}>Inscription</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={stylesFirstPage.whiteButton}
                >
                    <Text style={stylesFirstPage.textWhiteButton}>Connexion</Text>
                </TouchableOpacity>
            </View>



        </SafeAreaProvider>
      </ScrollView>
    </SafeAreaView>
  );
};


export default FirstPage;
