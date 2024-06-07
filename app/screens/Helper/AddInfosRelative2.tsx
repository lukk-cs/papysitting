import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Button, Modal, Keyboard, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from '../../styles/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { updateUriInUserDocument, getUserData, postAdditionalUserInfo } from '../../functions/functionsDatabase';
import stylesAddInfos from '../../styles/stylesAddInfos';
import RNPickerSelect from 'react-native-picker-select';
import stylesRegister from '../../styles/stylesRegister';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesContainers from '../../styles/stylesContainers';


interface IProps {}

const AddInfosRealtive2: React.FC<IProps> = () => {
    const navigation = useNavigation();
    const route = useRoute();
    //const { uid, presentation } = route.params;
    const [birthYear, setBirthYear] = useState('');
    const [dependency, setDependency] = useState('');
    const [mobility, setMobility] = useState('');
    const [pet, setPet] = useState('');
    
    

    return (
        <SafeAreaView style={stylesContainers.safeViewContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={stylesContainers.scrollContainer}>
            <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
                <View style={styles.container}>
                    <View style={styles.registerInputContainer}>
                        <RNPickerSelect
                        placeholder={{label : 'Sa date de naissance'} }
                        style={{
                            inputIOS: styles.Input, // for iOS
                            inputAndroid: styles.Input, // for Android
                        }}
                        onValueChange={(value) => setBirthYear(value)}
                        items={[
                            { label: 'Option 1', value: 'option1' },
                            { label: 'Option 2', value: 'option2' },
                            { label: 'Option 3', value: 'option3' },
                        ]}
                        />

                        <RNPickerSelect
                        placeholder={{label : 'Son niveau de dépendance'} }
                        style={{
                            inputIOS: styles.Input, // for iOS
                            inputAndroid: styles.Input, // for Android
                        }}
                        onValueChange={(value) => setDependency(value)}
                        items={[
                            { label: 'Option 1', value: 'option1' },
                            { label: 'Option 2', value: 'option2' },
                            { label: 'Option 3', value: 'option3' },
                        ]}
                    />

                        <RNPickerSelect
                        placeholder={{label : 'Son niveau de mobilité'} }
                        style={{
                            inputIOS: styles.Input, // for iOS
                            inputAndroid: styles.Input, // for Android
                        }}
                        onValueChange={(value) => setMobility(value)}
                        items={[
                            { label: 'Option 1', value: 'option1' },
                            { label: 'Option 2', value: 'option2' },
                            { label: 'Option 3', value: 'option3' },
                        ]}
                    />

                        <RNPickerSelect
                        placeholder={{label : 'Animaux de compagnie ?'} }
                        style={{
                            inputIOS: styles.Input, // for iOS
                            inputAndroid: styles.Input, // for Android
                        }}
                        onValueChange={(value) => setPet(value)}
                        items={[
                            { label: 'Option 1', value: 'option1' },
                            { label: 'Option 2', value: 'option2' },
                            { label: 'Option 3', value: 'option3' },
                        ]}
                    />
                    </View>


                </View>
            </SafeAreaProvider>
        </ScrollView>
        <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DashboardOld')}> 
                    <Text style={styles.textBlueButton}>Valider</Text>
                </TouchableOpacity>
        </View>
    </SafeAreaView>
    );
};

export default AddInfosRealtive2; 
