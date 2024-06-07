import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styles from '../../styles/styles';
import stylesDashboard from '../../styles/stylesDashboard';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Dashboard3 = () => {
    const [showButton1, setShowButton1] = useState(true);
    const [showButton2, setShowButton2] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
    const { name, uid, startDate } = route.params;
    const [frequency, setFrequency] = useState('');

    const toggleButtons1 = () => {
        setShowButton1(!showButton1);
        setShowButton2(!!showButton1);
        setFrequency(showButton1 ? 'reguliere' : 'ponctuelle');
    };

    const toggleButtons2 = () => {
        setShowButton1(!!showButton2);
        setShowButton2(!showButton2);
        setFrequency(showButton2 ? 'ponctuelle' : 'reguliere');
    };
    console.log(frequency)
    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView style={stylesDashboard.scrollContainer}>
            <StatusBar barStyle="dark-content" />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={stylesDashboard.container}>
                        <TouchableOpacity
                            style={[styles.button, showButton1 ? stylesDashboard.button1 : stylesDashboard.button2]}
                            onPress={toggleButtons1}
                            >
                            {showButton1 ? (
                                <Text style={styles.textWhiteButton}>Visites régulières</Text>
                            ) : (
                                <>
                                <Text style={stylesDashboard.titleButton}>Visites régulières</Text>
                                <View>
                                    <View style={stylesDashboard.itemContainer}>
                                    <Ionicons name="checkmark" size={20} color="black" />
                                    <Text style={stylesDashboard.subtitleButton}>Solution de planning sur-mesure</Text>
                                    </View>
                                    <View style={stylesDashboard.itemContainer}>
                                    <Ionicons name="checkmark" size={20} color="black" />
                                    <Text style={stylesDashboard.subtitleButton}>Annulation gratuite jusqu’à 24h avant chaque visite</Text>
                                    </View>
                                    <View style={stylesDashboard.itemContainer}>
                                    <Ionicons name="checkmark" size={20} color="black" />
                                    <Text style={stylesDashboard.subtitleButton}>Domicile et jeunes assurés</Text>
                                    </View>
                                </View>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[stylesDashboard.button1, showButton2 ? stylesDashboard.button1 : stylesDashboard.button2]}
                            onPress={toggleButtons2}
                        >
                            {showButton2 ? (
                            <Text style={stylesDashboard.textWhiteButton}>Visites ponctuelles</Text>
                            ) : (
                                <>
                                <Text style={stylesDashboard.titleButton}>Visites ponctuelles</Text>
                                <View>
                                    <View style={stylesDashboard.itemContainer}>
                                    <Ionicons name="checkmark" size={20} color="black" />
                                    <Text style={stylesDashboard.subtitleButton}>Solution de planning sur-mesure</Text>
                                    </View>
                                    <View style={stylesDashboard.itemContainer}>
                                    <Ionicons name="checkmark" size={20} color="black" />
                                    <Text style={stylesDashboard.subtitleButton}>Annulation gratuite jusqu’à 24h avant chaque visite</Text>
                                    </View>
                                    <View style={stylesDashboard.itemContainer}>
                                    <Ionicons name="checkmark" size={20} color="black" />
                                    <Text style={stylesDashboard.subtitleButton}>Domicile et jeunes assurés</Text>
                                    </View>
                                </View>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                <View style={stylesDashboard.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, frequency ? styles.button : stylesDashboard.buttonInactive]}
                        onPress={() => navigation.navigate('Dashboard4', { name: name, uid : uid, startDate: startDate, frequency: frequency })}
                        disabled={!frequency}
                    >
                        <Text style={styles.loginTextButton}>Valider</Text>
                    </TouchableOpacity>
                </View>

        </SafeAreaView>
        </GestureHandlerRootView>
    );
};


export default Dashboard3;
