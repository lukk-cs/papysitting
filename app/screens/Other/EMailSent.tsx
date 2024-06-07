import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from "../../styles/styles";

const EMailSent = ({ route }) => {
    const { userEmail } = route.params // route.params permet de recup userEmail et la donne a userEmail
    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Vérifiez votre boîte mail</Text>
            <Text style={styles.loginSubtext}>Veuillez consulter votre adresse mail {userEmail} pour savoir comment réinitialiser votre mot de passe.</Text>
        </View>
    );
};


export default EMailSent;

