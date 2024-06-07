// Importez les modules nécessaires
import React, { useEffect, useState } from "react";
import { View, StatusBar, Text, TextInput, Button, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView, Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import stylesLogin from "../../styles/stylesLogin";
import stylesContainers from "../../styles/stylesContainers";
import styles from "../../styles/styles";
import { getUserData, signIn, signInYoung } from "../../functions/functionsAuthentification";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useCustomFonts } from "../../../expo-fonts";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
const Stack = createNativeStackNavigator();


const Login = () => {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={stylesContainers.safeViewContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={stylesContainers.scrollContainer}>
        <SafeAreaProvider style={stylesContainers.safeProviderContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.Title}>Bienvenue</Text>
            <Text style={stylesLogin.Subtitle}>Se connecter</Text>
          </View>
          <View style={stylesLogin.inputContainer}>
            <TextInput
              value={email}
              style={[styles.Input, { color: 'black' }]}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              secureTextEntry={true}
              value={password}
              style={styles.Input}
              placeholder="Mot de passe"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity>
              <Text style={stylesLogin.forgotPassword}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>

          
          <View style={stylesLogin.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000f" />
            ) : (
              <TouchableOpacity
                onPress={() => signIn(navigation, email, password, setLoading)}
                style={styles.button}
              >
                <Text style={stylesLogin.textButton}>Se connecter</Text>
              </TouchableOpacity>
            )}
            
            <Text style={styles.ou}>------------- OU -------------</Text>

              <View style={styles.imageContainerLogin}>
                <Image source={require('../../../assets/logo-fb.png')} style={styles.imageStyle} />
                <TouchableOpacity>
                  <Image source={require('../../../assets/logo-google.png')} style={styles.imageStyle} />
                </TouchableOpacity>
              </View>

            <View style={styles.rowContainer}>
              <Text style={stylesLogin.textNoAccount}>Pas encore de compte ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={stylesLogin.textRegister}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </View>




        </SafeAreaProvider>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
