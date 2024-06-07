import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from '../../styles/styles';
import stylesRegister from '../../styles/stylesRegister';
import stylesLogin from '../../styles/stylesLogin';
import { signUp } from '../../functions/functionsAuthentification';
import RNPickerSelect from 'react-native-picker-select';

const RegisterRelative = () => {
  const route = useRoute();
  const navigation = useNavigation();
    const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(0.5);
  const [adress, setAdress] = useState('');
  const type = route.params;


  const handleSelectAddress = async (place) => {
    try {
      const description = place.formatted_address;
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
          setSelectedAddress({ description, latitude, longitude });
          setIsGooglePlaceSelected(false);
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
    const isFilled = !!firstName && !!name && !!email && !!phone && !!adress && !!password && !!type;
    setAllFieldsFilled(isFilled);
}, [firstName, name, email, password, adress, type, phone]);

useEffect(() => {
    setButtonOpacity(allFieldsFilled ? 1 : 0.5);
}, [allFieldsFilled]);

const handleRegister = () => {
//    if (allFieldsFilled) {
//        setLoading(true);
//        signUp(firstName, adress, email, password, name, phone, type, setLoading, navigation);
//    }
};

  return (
  
    <View style={styles.container}>
      <View style={stylesRegister.buttonContainer}>
        <TouchableOpacity
          style={[stylesRegister.button, gender === 'female' && stylesRegister.activeButton]}
          onPress={() => setGender('female')}
        >
          <Text style={[
            stylesRegister.textButton,
            gender === 'female' ? styles.textBlueButton : styles.textWhiteButton
          ]}>
            Madame
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[stylesRegister.button, gender === 'male' && stylesRegister.activeButton]}
          onPress={() => setGender('male')}
        >
          <Text style={[
            stylesRegister.textButton,
            gender === 'male' ? styles.textBlueButton : styles.textWhiteButton
          ]}>
            Monsieur
          </Text>
        </TouchableOpacity>
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
          value={name}
          onChangeText={setName}
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

        <RNPickerSelect
            placeholder={{label : 'Votre lien de parenté'} }
            style={{
                inputIOS: styles.Input, // for iOS
                inputAndroid: stylesRegister.Input, // for Android
            }}
            onValueChange={(value) => setLink(value)}
            items={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
            ]}
        />
      
      </View>

      <View 
        style={stylesRegister.GPAC}
      >
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
                borderWidth: 1,
              },
              textInput: {
                fontFamily: 'HelveticaNeue-Bold',
                fontSize: 18,
              },
            }}
          />

      </View>
      
      <View style={stylesRegister.buttonContainer}>
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('AddInfosRelative');
            }}
          style={styles.button}
        >
          <Text style={stylesLogin.textButton}>Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterRelative;