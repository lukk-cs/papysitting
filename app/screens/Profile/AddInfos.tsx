import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Keyboard, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { updatePresentation, getPresentation, uploadProfilePicture } from '../../functions/functionsDatabase';
import stylesAddInfos from '../../styles/stylesAddInfos';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesContainers from '../../styles/stylesContainers';
import { getUserProfileImage } from '../../functions/functionsStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../styles/styles';

interface IProps {}

const AddInfos: React.FC<IProps> = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { name, uid } = route.params;
    const [presentationText, setPresentationText] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [isEditingPhoto, setIsEditingPhoto] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProfileImage = async () => {
            const imageUrl = await getUserProfileImage(uid);
            if (imageUrl) {
                setProfileImageUrl(imageUrl);
                setIsEditingPhoto(true);
            }
        };

        const fetchPresentation = async () => {
            const presentation = await getPresentation(uid);
            if (presentation) {
                setPresentationText(presentation);
            }
        };

        fetchProfileImage();
        fetchPresentation();
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

    const handleValidation = async () => {
        await updatePresentation(uid, presentationText, setLoading);
        navigation.navigate('AddInfos2', { uid: uid, presentation: presentationText });
    };

    return (
        <SafeAreaView style={stylesContainers.safeViewContainer}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAwareScrollView contentContainerStyle={stylesContainers.scrollContainer}>
                <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
                    <View style={styles.container}>
                        <View style={stylesAddInfos.imageContainer}>
                            {(profileImageUrl || selectedImage) && (
                                <Image source={{ uri: selectedImage || profileImageUrl }} style={{ width: '90%', height: 200, borderRadius: 12 }} />
                            )}

                            {!profileImageUrl && !selectedImage && (
                                <TouchableOpacity onPress={pickImage}>
                                    <Text>Ajouter une photo</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={{ marginTop: -20, alignSelf: 'center', width: '100%' }}>
                            <TouchableOpacity style={stylesAddInfos.buttonPhoto} onPress={pickImage}> 
                                <Text style={styles.textBlueButton}>{isEditingPhoto ? 'Modifier la photo' : 'Ajouter une photo'}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={stylesAddInfos.nameContainer}>
                            <Text style={stylesAddInfos.nameText}>{name}</Text>
                        </View>

                        <View style={stylesAddInfos.inputContainer}>
                            <Text style={stylesAddInfos.label}>Présentation</Text>
                            <TextInput
                                style={[
                                    stylesAddInfos.textInput, 
                                    { color: presentationText ? 'black' : 'grey' }
                                ]}
                                multiline={true}
                                numberOfLines={4}
                                value={presentationText}
                                onChangeText={(text) => setPresentationText(text)}
                                returnKeyType="done"
                                onSubmitEditing={() => Keyboard.dismiss()}
                                blurOnSubmit={true}
                                placeholder="exemple de présentation..."
                                placeholderTextColor="grey"
                            />
                        </View>
                    </View>
                </SafeAreaProvider>
            </KeyboardAwareScrollView>
            <View style={styles.buttonContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000f" />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleValidation}> 
                        <Text style={styles.textBlueButton}>Valider</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
};

export default AddInfos;
