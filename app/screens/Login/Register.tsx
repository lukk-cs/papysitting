import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView, StatusBar, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from '../../styles/styles';
import stylesRegister from '../../styles/stylesRegister';
import stylesLogin from '../../styles/stylesLogin';
import { signUp } from '../../functions/functionsAuthentification';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stylesContainers from '../../styles/stylesContainers';

const Register = () => {
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

  console.log('firstName : ', firstName, 'lastName : ', lastName, 'email : ', email, 'phone : ', phone, 'address : ', address, 'password : ', password, 'gender :', gender);
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


  useEffect(() => {
    const isFilled = !!firstName && !!lastName && !!email && !!phone && address !== null && !!password && !!gender;
    setAllFieldsFilled(isFilled);
  }, [firstName, lastName, email, password, address, phone, gender]);

  useEffect(() => {
    setButtonOpacity(allFieldsFilled ? 1 : 0.5);
  }, [allFieldsFilled]);

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
                  />
                </View>

                <View style={{marginHorizontal: 20}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text style={[styles.textLink, { marginBottom: 10 }]}>
                      Déjà inscrit ? Se connecter
                    </Text>
                  </TouchableOpacity>


                  <Text style={stylesRegister.textButton}>
                    En créant votre compte, vous acceptez nos Condtitions générales d’utilisation ainsi que notre Politique de confidentialité.
                  </Text>
                </View>
              </View>
            </SafeAreaProvider>
          )}
          keyboardShouldPersistTaps='handled'

        />
        <View style={stylesRegister.buttonContainer}>
          <TouchableOpacity
            onPress={() => { signUp(firstName, lastName, phone, email, address, lat, long, password, setLoading, navigation) }}
            style={[styles.button, { opacity: buttonOpacity }]}
            disabled={!allFieldsFilled}
          >
            <Text style={stylesLogin.textButton}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

};
export default Register;
