import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from '../../styles/styles';
import stylesRegister from '../../styles/stylesRegister';
import stylesLogin from '../../styles/stylesLogin';
import { signUp } from '../../functions/functionsAuthentification';

const Register = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isGooglePlaceSelected, setIsGooglePlaceSelected] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [loading, setLoading] = useState(false);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(0.5);
  const type = route.params;
  console.log(type);


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
  
    <View style={styles.containerLocalisation}>
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
        <TextInput
          style={styles.Input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={[stylesRegister.textButton, { marginBottom: 10 }]}>
          Déjà inscrit ? Se connecter
        </Text>

        <Text style={stylesRegister.textButton}>
          En créant votre compte, vous acceptez nos Condtitions générales d’utilisation ainsi que notre Politique de confidentialité.
        </Text>
      </View>
      <View style={stylesRegister.buttonContainer}>
        <TouchableOpacity
            onPress={() => { navigation.navigate('BeforeRegisterRelative') }}
          style={styles.button}
        >
          <Text style={stylesLogin.textButton}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;