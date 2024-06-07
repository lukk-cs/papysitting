import React, { useState } from "react";
import { View, StatusBar, Text, TextInput, Button, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView, Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import stylesContainers from "../../styles/stylesContainers";
import stylesAccountCreated from "../../styles/stylesAccountCreated";
import styles from "../../styles/styles"; 
import { SafeAreaProvider } from 'react-native-safe-area-context';


const AccountCreated = () => {
    const navigation = useNavigation();


    return (
        <SafeAreaView style={stylesContainers.safeViewContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={stylesContainers.scrollContainer}>
            <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../../../assets/party-popper.png')} style={stylesAccountCreated.icon} />
            </View>
            <View style={stylesAccountCreated.textContainer}>
                <Text style={stylesAccountCreated.accountCreated}>Votre compte a été créé avec succès ! </Text>
                <Text style={stylesAccountCreated.text}>Pour que nous puissions trouver la solution la plus adaptée, nous avons besoin que vous complétiez votre profil </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.button}
                    >
                    <Text style={styles.textButton}>Compléter mon profil</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DashboardOld')}
                    style={stylesAccountCreated.buttonPass}
                    >
                    <Text style={stylesAccountCreated.textButtonPass}>Passer cette étape ></Text>
                </TouchableOpacity>
            </View>
            </SafeAreaProvider>
        </ScrollView>
        </SafeAreaView>
    );
};

export default AccountCreated;
