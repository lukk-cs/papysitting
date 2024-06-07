// ForgotPassword.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import styles from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import {sendPasswordResetEmail} from 'firebase/auth';

const ForgotPassword = () => {
    const navigation = useNavigation();
    const auth = FIREBASE_AUTH
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Erreur', 'Veuillez entrer votre e-mail.');
            return; //finito la fonction
        }

        setLoading(true); //si ya un adresse, indique un chargement

        try {
            await sendPasswordResetEmail(auth, email); // merci firebase
            console.log('Succès' + 'Un e-mail de réinitialisation a été envoyé à votre adresse e-mail.');
        } catch (error) {
            console.log('Erreur' + 'Une erreur est survenue. Veuillez réessayer.');
        }

        navigation.navigate('EMailSent', { userEmail: email }); //userEmail prend la valeur email

        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Mot de passe oublié ?</Text>
            <Text style={styles.loginSubtext}>Veuillez entrer votre e-mail pour retrouver votre mot de passe.</Text>
            <TextInput
                value={email}
                style={styles.loginInput}
                placeholder="E-mail"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
            />

            <TouchableOpacity
                onPress={handleResetPassword}
                style={styles.loginButton}
                disabled={!email || loading}
            >
                <Text style={styles.loginTextButton}>Rechercher</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#0000f" />}
        </View>
    );
};

export default ForgotPassword;