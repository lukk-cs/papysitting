import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native';
import styles from '../../styles/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import stylesAddInfos from '../../styles/stylesAddInfos';
import stylesDashboard from '../../styles/stylesDashboard';
import { updateUserInfo, getUserInfo } from '../../functions/functionsDatabase';

interface IProps {}

const AddInfos2: React.FC<IProps> = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { uid, presentation } = route.params;
    const [birthDate, setBirthDate] = useState<string>('');
    const [license, setLicense] = useState('');
    const [school, setSchool] = useState('');
    const [interests, setInterests] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo(uid);
            if (userInfo) {
                setBirthDate(userInfo.birthDate || '');
                setLicense(userInfo.license || '');
                setSchool(userInfo.school || '');
                setInterests(userInfo.interests || '');
            }
        };

        fetchUserInfo();
    }, []);

    const formatDate = (input: string) => {
        let cleaned = ('' + input).replace(/\D/g, '');
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

    const handleValidation = async () => {
        await updateUserInfo(uid, birthDate, license, school, interests, setLoading);
        if (!loading) {
            navigation.navigate('ProfileComplete');
        } else {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour des informations.');
        }
    };

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
                                inputIOS: styles.Input,
                                inputAndroid: styles.Input,
                            }}
                            onValueChange={(value) => setLicense(value)}
                            value={license}
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
                    onPress={handleValidation}
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
