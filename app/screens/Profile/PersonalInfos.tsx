import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import styles from '../../styles/styles';
import stylesRegister from '../../styles/stylesRegister';
import stylesLogin from '../../styles/stylesLogin';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesContainers from '../../styles/stylesContainers';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../FirebaseConfig';

const PersonalInfos = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [address, setAddress] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [isGooglePlaceSelected, setIsGooglePlaceSelected] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(0.5);
  const [initialData, setInitialData] = useState({});

  const user = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'youngs', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setInitialData(data);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setPhone(data.phone);
          setAddress(data.address);
          setLat(data.lat);
          setLong(data.long);
          setGender(data.gender);
        } else {
          Alert.alert('User data not found.');
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        Alert.alert('An error occurred while fetching user data.');
      }
    };

    fetchUserData();
  }, []);

  const handleSelectAddress = async (place: GooglePlaceDetail | null) => {
    try {
      const description = place?.formatted_address;
      if (description) {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: description,
            key: 'AIzaSyCPVmiolNvupC394kwt8KX5VYD5QB3u6sI',
          },
        });
        const { results } = response.data;
        if (results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          const latitude = lat;
          const longitude = lng;
          const formattedAddress = results[0].formatted_address;
          setAddress(formattedAddress); // Mise à jour de l'adresse dans l'état
          setLat(latitude);
          setLong(longitude);
          setIsGooglePlaceSelected(true); // Mettre à jour l'état pour indiquer qu'une adresse a été sélectionnée
        } else {
          Alert.alert('Adresse invalide.');
        }
      } else {
        Alert.alert('Adresse invalide.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées :', error);
      Alert.alert('Une erreur s\'est produite.');
    }
  };

  const hasChanges = () => {
    return (
      firstName !== initialData.firstName ||
      lastName !== initialData.lastName ||
      email !== initialData.email ||
      phone !== initialData.phone ||
      address !== initialData.address ||
      gender !== initialData.gender
    );
  };

  useEffect(() => {
    setButtonOpacity(hasChanges() ? 1 : 0.5);
  }, [firstName, lastName, email, phone, address, gender]);

  const updateUser = async () => {
    setLoading(true);
    try {
      const userDocRef = doc(FIREBASE_DB, 'youngs', user.uid);
      await updateDoc(userDocRef, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        lat: lat,
        long: long,
        gender: gender
      });
      Alert.alert('Information updated successfully!');
      navigation.navigate('Profile'); // Redirect to profile page after updating
    } catch (error) {
      console.error(error);
      Alert.alert('Update failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView style={stylesContainers.scrollContainer} behavior={Platform.OS === "ios" ? "padding" : undefined} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
        <FlatList
          contentContainerStyle={stylesContainers.scrollContainer}
          data={[{ key: 'registration_form' }]}
          renderItem={({ item }) => (
            <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
              <View style={styles.containerLocalisation}>
                <View style={stylesRegister.buttonContainer}>
                  <TouchableOpacity
                    style={[stylesRegister.buttonFemale, gender === 'female' && stylesRegister.activeButtonFemale]}
                    onPress={() => setGender('female')}
                  >
                    <Text style={[
                      gender === 'female' ? styles.textBlueButton : styles.textWhiteButton
                    ]}>
                      Madame
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[stylesRegister.buttonMale, gender === 'male' && stylesRegister.activeButtonMale]}
                    onPress={() => setGender('male')}
                  >
                    <Text style={[
                      gender === 'male' ? styles.textBlueButton : styles.textWhiteButton
                    ]}>
                      Monsieur
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={stylesRegister.GPAC}>
                  <GooglePlacesAutocomplete
                    placeholder="Entrez votre adresse"
                    onPress={(data, details = null) => {
                      handleSelectAddress(details);
                    }}
                    fetchDetails={true}
                    query={{
                      key: 'AIzaSyCPVmiolNvupC394kwt8KX5VYD5QB3u6sI',
                      language: 'fr',
                    }}
                    styles={{
                      textInputContainer: {
                        width: '90%',
                        borderRadius: 8,
                        borderColor: '#a0a5a8',
                      },
                      textInput: {
                        fontFamily: 'HelveticaNeue-Bold',
                        fontSize: 18,
                        marginBottom: 0,
                        borderWidth: 0.8,
                        borderColor: '#a0a5a8',
                        borderRadius: 8,
                        color: 'black',
                      },
                    }}
                  />
                </View>
                <View style={styles.registerInputContainer}>
                  <TextInput
                    style={styles.Input}
                    placeholder="Votre Prénom"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                  <TextInput
                    style={styles.Input}
                    placeholder="Votre Nom"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                  <TextInput
                    style={styles.Input}
                    placeholder="Téléphone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />

                  <TextInput
                    style={styles.Input}
                    placeholder="Votre Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <TextInput
                    style={styles.Input}
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    editable={false}
                  />
                </View>
              </View>
            </SafeAreaProvider>
          )}
          keyboardShouldPersistTaps='handled'
        />
        <View style={stylesRegister.buttonContainer}>
          <TouchableOpacity
            onPress={updateUser}
            style={[styles.button, { opacity: buttonOpacity }]}
            disabled={!hasChanges()}
          >
            <Text style={stylesLogin.textButton}>Modifier</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PersonalInfos;
