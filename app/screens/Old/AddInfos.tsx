import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Button, Modal, Keyboard, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from '../../styles/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { uploadProfilePicture } from '../../functions/functionsDatabase';
import stylesAddInfos from '../../styles/stylesAddInfos';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesContainers from '../../styles/stylesContainers';
import { FIREBASE_STORAGE } from '../../../FirebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import { getUserProfileImage } from '../../functions/functionsStorage';

interface IProps {}

const AddInfos: React.FC<IProps> = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { name, uid } = route.params;
    const [presentationText, setPresentationText] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [isEditingPhoto, setIsEditingPhoto] = useState<boolean>(false); // Ajout de l'état pour savoir si l'utilisateur est en train d'éditer la photo

    useEffect(() => {
        const fetchProfileImage = async () => {
            const imageUrl = await getUserProfileImage(uid);
            if (imageUrl) {
                setProfileImageUrl(imageUrl);
            }
        };

        fetchProfileImage();
    }, []);


const pickImage = async () => {
    try {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedAsset = result.assets[0];
            setSelectedImage(selectedAsset.uri);
            const imageUrl = await uploadProfilePicture(uid, selectedAsset.uri);
            if (imageUrl) {
                setProfileImageUrl(imageUrl);
            }
            setIsEditingPhoto(true);
        }
    } catch (error) {
        console.log('Erreur de sélection d\'image:', error);
    }
};

    
    return (
        <SafeAreaView style={stylesContainers.safeViewContainer}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={stylesContainers.scrollContainer}>
                <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
                    <View style={styles.container}>
                        <View style={stylesAddInfos.imageContainer}>
                            {profileImageUrl && (
                                <Image source={{ uri: profileImageUrl }} style={{ width: '90%', height: 200, borderRadius: 12 }} />
                            )}

                            {!profileImageUrl && !selectedImage && (
                                <TouchableOpacity onPress={pickImage}>
                                    <Text>Ajouter une photo</Text>
                                </TouchableOpacity>
                            )}

                            {!profileImageUrl && selectedImage && (
                                <TouchableOpacity onPress={pickImage}>
                                    <Image source={{ uri: selectedImage }} style={{ width: '90%', height: 100, borderRadius: 12 }} />
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={{marginTop: -20, alignSelf: 'center', width: '100%'}}>
                            <TouchableOpacity style={stylesAddInfos.buttonPhoto} onPress={pickImage}> 
                                <Text style={styles.textBlueButton}>{isEditingPhoto ? 'Modifier la photo' : 'Ajouter une photo'}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={stylesAddInfos.nameContainer}>
                            <Text style={stylesAddInfos.nameText}>{name}</Text>
                        </View>

                        <View style = {stylesAddInfos.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                multiline={true}
                                numberOfLines={4}
                                value={presentationText}
                                onChangeText={(text) => setPresentationText(text)}
                                returnKeyType="done"
                                onSubmitEditing={() => Keyboard.dismiss()}
                                blurOnSubmit={true}
                            />
                        </View> 
                    </View>
                </SafeAreaProvider>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddInfos2', {uid: uid, presentation : presentationText})}> 
                    <Text style={styles.textBlueButton}>Valider</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default AddInfos; 
