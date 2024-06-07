import React, { useState, useEffect, useId } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, StatusBar, Image } from 'react-native';
import { Slider } from 'react-native-elements';
import stylesDashboard4 from '../../styles/stylesDashboard4';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import stylesDashboard from '../../styles/stylesDashboard';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesAccountCreated from '../../styles/stylesAccountCreated';
import stylesContainers from '../../styles/stylesContainers';

const Dashboard6 = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {startDate, chosenMoments, chosenHours } = route.params;

  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
    <StatusBar barStyle="dark-content" />
    <ScrollView contentContainerStyle={stylesContainers.scrollContainer}>
        <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
        <View style={styles.imageContainer}>
            <Image source={require('../../../assets/party-popper.png')} style={stylesAccountCreated.icon} />
        </View>
        <View style={stylesAccountCreated.textContainer}>
            <Text style={stylesAccountCreated.accountCreated}>Vos heures ont été enregistrées avec succès ! </Text>
            <Text style={stylesAccountCreated.text}>Pour que nous puissions trouver la solution la plus adaptée, nous avons besoin que vous complétiez votre profil </Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('AddInfos1', {uid: uid})}
                style={styles.button}
                >
                <Text style={styles.textButton}>Compléter mon profil</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Dashboard', {startDate : startDate, chosenHours : chosenHours })}
                style={stylesAccountCreated.buttonPass}
                >
                <Text style={stylesAccountCreated.textButtonPass}>Revenir à l'accueil</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaProvider>
    </ScrollView>
    </SafeAreaView>
);
};

export default Dashboard6;
