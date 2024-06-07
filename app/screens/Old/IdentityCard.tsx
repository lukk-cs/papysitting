import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Platform, FlatList, Image } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import styles from '../../styles/styles';
import stylesRegister from '../../styles/stylesRegister';
import stylesLogin from '../../styles/stylesLogin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesContainers from '../../styles/stylesContainers';
import stylesDocuments from '../../styles/stylesDocuments';
import { uploadIDPhoto, uploadID } from '../../functions/functionsDatabase';
import * as DocumentPicker from 'expo-document-picker';


const IdentityCard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [docUri, setDocUri] = useState<string | null>(null);
  const {uid} = route.params;

  const handleTakePhoto = async () => {
    try {
      // Demander la permission d'accéder à l'appareil photo
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée pour accéder à l\'appareil photo.');
        return;
      }

      // Ouvrir l'appareil photo pour capturer une image
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
          setPhotoUri(result.assets[0].uri);
  
          // Appeler la fonction pour télécharger le document
          await uploadIDPhoto(uid, result.assets[0].uri);
          Alert.alert('Document téléchargé avec succès.');
        } else {
          Alert.alert('Veuillez choisir un document à télécharger.');
        }
      } else {
        console.log('La sélection du document a été annulée.');
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du document :', error);
      Alert.alert('Une erreur s\'est produite lors du téléchargement du document.');
    }
  };
  

  const handleUploadDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false,
      });
  
      if (!result.canceled) {
        if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
          setDocUri(result.assets[0].uri);
  
          // Appeler la fonction pour télécharger le document
          await uploadID(uid, result.assets[0].uri);
          Alert.alert('Document téléchargé avec succès.');
        } else {
          Alert.alert('Veuillez choisir un document à télécharger.');
        }
      } else {
        console.log('La sélection du document a été annulée.');
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du document :', error);
      Alert.alert('Une erreur s\'est produite lors du téléchargement du document.');
    }
  };
  
  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={stylesContainers.scrollContainer}>
        <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
          <View style={stylesDocuments.container}>
            <Text style={stylesDocuments.title}>Merci de nous fournir le recto de ta carte d'identité</Text>

            {photoUri && (
              <Image source={{ uri: photoUri }} style={stylesDocuments.photoPreview} />
            )}

            <View style={stylesRegister.buttonContainer}>
              <TouchableOpacity
                onPress={handleUploadDocument} // Appeler la fonction pour télécharger le document
                style={stylesDocuments.blueButton}
              >
                <Text style={stylesDocuments.textBlueButton}>Document</Text>
              </TouchableOpacity>
            </View>

            <View style={stylesRegister.buttonContainer}>
              <TouchableOpacity
                onPress={handleTakePhoto} // Appeler la fonction pour prendre une photo
                style={stylesDocuments.whiteButton}
              >
                <Text style={stylesDocuments.textWhiteButton}>Prendre une photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IdentityCard;
