import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Button, Modal, Keyboard, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from '../../styles/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { updateUriInUserDocument, getUserData, postAdditionalUserInfo } from '../../functions/functionsDatabase';
import stylesAddInfos from '../../styles/stylesAddInfos';
import RNPickerSelect from 'react-native-picker-select';
import stylesRegister from '../../styles/stylesRegister';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import stylesDashboard from '../../styles/stylesDashboard';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface IProps {}

const AddInfos2: React.FC<IProps> = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { uid, presentation } = route.params;
    const [school, setSchool] = useState('');
    const [license, setLicense] = useState('');
    const [interests, setInterests] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [birthDate, setBirthDate] = useState<string>('');
    
    const formatDate = (input: string) => {
        // Supprimer tout ce qui n'est pas un chiffre
        let cleaned = ('' + input).replace(/\D/g, '');

        // Ajouter automatiquement les '/' après chaque paire de chiffres
        let formatted = '';
        for (let i = 0; i < cleaned.length; i++) {
            if (i === 2 || i === 4) {
                formatted += '/';
            }
            formatted += cleaned[i];
        }

        return formatted;
    };

    const handleTextChange = (text: string) => {
        setBirthDate(formatDate(text));
    };
    console.log(birthDate, school, license, interests)

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
          <SafeAreaView style={styles.scrollContainer}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>

                    <View style={stylesAddInfos.inputContainer}>
                        <TextInput
                            style={styles.Input}
                            placeholder="Date de naissance jj/mm/aaaa"
                            value={birthDate}
                            onChangeText={handleTextChange}
                            keyboardType="numeric"
                            maxLength={10}
                        />


                        <RNPickerSelect
                        placeholder={{label : 'As-tu le permis de conduire ?'} }
                        style={{
                            inputIOS: styles.Input, // for iOS
                            inputAndroid: styles.Input, // for Android
                        }}
                        onValueChange={(value) => setLicense(value)}
                        items={[
                            { label: 'Oui', value: 'yes' },
                            { label: 'Non', value: 'no' },
                        ]}
                    />
                    
                        <TextInput
                        style={stylesAddInfos.Input}
                        placeholder="Ton école ou université"
                        value={school}
                        onChangeText={setSchool}
                        />

                        <TextInput
                        style={stylesAddInfos.Input}
                        placeholder="Tes centres d'intérêts"
                        value={interests}
                        onChangeText={setInterests}
                        />
                    </View>

                </View>
            </ScrollView>
          
            <View style={stylesDashboard.buttonContainer}>
              <TouchableOpacity
            style={[styles.button, birthDate && school && license && interests ? styles.button : stylesDashboard.buttonInactive]}
                onPress={() => navigation.navigate('ProfileComplete')}
                disabled={!birthDate || !school || !license || !interests}
              >
                <Text style={styles.loginTextButton}>Valider</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </GestureHandlerRootView>
    );
};


export default AddInfos2; 
