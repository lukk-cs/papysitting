import React, { useState } from "react";
import { View, StatusBar, Text, TextInput, Button, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView, Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import stylesContainers from "../../styles/stylesContainers";
import stylesAccountCreated from "../../styles/stylesAccountCreated";
import styles from "../../styles/styles"; 
import { SafeAreaProvider } from 'react-native-safe-area-context';


const DeleteVisit = () => {
    const navigation = useNavigation();


    return (
        <SafeAreaView style={stylesContainers.safeViewContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={stylesContainers.scrollContainer}>
            <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
            <View style={stylesAccountCreated.textContainer}>
                <Text style={stylesAccountCreated.accountCreated}>Es-tu sûr(e) ?</Text>
                <Text style={stylesAccountCreated.text}>Tu ne pourras plus revenir en arrière</Text>
                <TextInput style={stylesAccountCreated.input} placeholder="Raison de l'annulation" />
            </View>

            </SafeAreaProvider>
        </ScrollView>
        <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('DeleteVisit')}
                    style={styles.button}
                    >
                    <Text style={styles.textBlueButton}>Annuler la visite</Text>
                </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
};

export default DeleteVisit;
