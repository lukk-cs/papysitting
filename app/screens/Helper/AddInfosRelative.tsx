import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Button, Modal, Keyboard, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import styles from '../../styles/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { updateUriInUserDocument, getUserData, postAdditionalUserInfo } from '../../functions/functionsDatabase';
import stylesAddInfos from '../../styles/stylesAddInfos';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesContainers from '../../styles/stylesContainers';

interface IProps {}

const AddInfosRelative: React.FC<IProps> = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    //const { name, uid } = route.params;
    const [presentationText, setPresentationText] = useState('');
    
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
            updateUriInUserDocument(uid, selectedAsset.uri);
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
                        {selectedImage && (
                            <Image source={{ uri: selectedImage }} style={{ width: '90%', height: 100, borderRadius: 12 }} />
                        )}

                        {!selectedImage && (
                                <TouchableOpacity onPress={pickImage}>
                                <Text>Ajouter une photo</Text>
                                </TouchableOpacity>
                            )}

                    </View>

                    <View style={{marginTop: -20, alignSelf: 'center', width: '100%'}}>
                        <TouchableOpacity style={stylesAddInfos.buttonPhoto} onPress={() => navigation.navigate('AddInfos2', {uid: uid, presentation : presentationText})}> 
                            <Text style={styles.textBlueButton}>Ajouter une photo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={stylesAddInfos.nameContainer}>
                        <Text style={stylesAddInfos.nameText}>nom</Text>
                    </View>

                    <View style = {stylesAddInfos.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            numberOfLines={4} // You can adjust this based on your preference
                            value={presentationText}
                            onChangeText={(text) => setPresentationText(text)}
                            returnKeyType="done" // Change return key to 'done'
                            onSubmitEditing={() => Keyboard.dismiss()} // Dismiss keyboard on 'done' press
                            blurOnSubmit={true} // Dismiss keyboard when 'done' is pressed
                        />

                    </View> 
                </View>
            </SafeAreaProvider>
        </ScrollView>
        <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddInfosRelative2')}> 
                    <Text style={styles.textBlueButton}>Valider</Text>
                </TouchableOpacity>
        </View>
    </SafeAreaView>
    );
};


export default AddInfosRelative; 
