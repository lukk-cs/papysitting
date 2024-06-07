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
import stylesMyRequest from '../../styles/stylesMyRequest';
import { Ionicons } from '@expo/vector-icons';
import { deleteOld } from '../../functions/functionsDatabase';

const MyRequest = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { uid, dates, freq, begin, address } = route.params;


  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
    <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={stylesContainers.scrollContainer}>
            <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
            
            <View style={stylesMyRequest.container1}>
                <Text style={stylesMyRequest.title}>Demande enregistrée, et maintenant ? </Text>
                <Text style={stylesMyRequest.subtitle}>Pour que nous puissions trouver la solution la plus adaptée, nous avons besoin que vous complétiez votre profil </Text>
                <Text style={stylesMyRequest.textButton}>Plus de détails </Text>
            </View>

            <View style={stylesMyRequest.container2}>
                <Text style={stylesMyRequest.title2}>Ma demande en détail</Text>

                <View style={[stylesMyRequest.itemContainer, stylesMyRequest.itemWithBorder]}>
                    <Ionicons name="pin-outline" size={24} color="black" style={stylesMyRequest.icon} />
                    <Text style={stylesMyRequest.text}>{address}</Text>
                </View>

                <View style={stylesMyRequest.itemContainer}>
                    <Ionicons name="calendar-outline" size={24} color="black" style={stylesMyRequest.icon} />
                    <Text style={stylesMyRequest.text}>À partir du {begin}</Text>
                </View>

                <View style={[stylesMyRequest.textContainer, stylesMyRequest.itemWithBorder]}>
                    <Text style={stylesMyRequest.text2}>9,90€/h de visite</Text>
                    <Text style={stylesMyRequest.text2}>19,80€/h avant crédit impôt</Text>
                </View>

                <View style={stylesMyRequest.itemContainer}>
                    <Ionicons name="people-outline" size={24} color="black" style={stylesMyRequest.icon} />
                    <Text style={stylesMyRequest.text}>Visites</Text>
                </View>

                <View style={[stylesMyRequest.textContainer, stylesMyRequest.itemWithBorder]}>
                    <Text style={stylesMyRequest.text2}>{dates.join('\n')}</Text>
                </View>

                <Text style={stylesMyRequest.title2}>Conditions d'annulation</Text>
                <Text style={stylesMyRequest.subtitle}>Annulation gratuite jusqu’à 24h avant votre visite.</Text>
                <TouchableOpacity onPress={() => deleteOld(uid, navigation)}>
                    <Text style={stylesMyRequest.textButton}>Annuler ma demande</Text>
                </TouchableOpacity>
            </View>



            </SafeAreaProvider>
        </ScrollView>
    </SafeAreaView>
);
};

export default MyRequest;
