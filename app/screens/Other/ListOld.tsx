import { View, Text, Button, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import { collection, getDocs } from 'firebase/firestore';
import styles from "../../styles/styles";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const ListOld = ({ navigation }: RouterProps) => {
    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        const fetchAnnonces = async () => {
            const annoncesCollection = collection(FIREBASE_DB, 'annoncesVieux');
            const annoncesSnapshot = await getDocs(annoncesCollection);
            const annoncesData = [];
            
            annoncesSnapshot.forEach((doc) => {
                annoncesData.push({ id: doc.id, ...doc.data() });
            });

            setAnnonces(annoncesData);
        };

        fetchAnnonces();
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
            <Text style = {styles.loginText}>liste des annonces</Text>
            <FlatList
                data={annonces}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style = {styles.listItem}>
                        <Text style={styles.listItemTitle}>{item.titre}</Text>
                        <Text style={styles.listItemDescription}>{item.description}</Text>
                        <Text style={styles.listItemDescription}>
                        <View style={styles.disponibilitesContainer}>
                            <Text style = {styles.DispoText}>Disponibilités</Text>
                            {Object.entries(item.disponibilites).map(([jour, dispo], index) => (
                            <View key={index}>
                                <Text style={styles.disponibilitesDay}>{jour}</Text>
                                <Text style={styles.disponibilitesTime}>
                                Matin: {dispo.morning ? 'Oui' : 'Non'}
                                </Text>
                                <Text style={styles.disponibilitesTime}>
                                Midi: {dispo.noon ? 'Oui' : 'Non'}
                                </Text>
                                <Text style={styles.disponibilitesTime}>
                                Soir: {dispo.evening ? 'Oui' : 'Non'}
                                </Text>
                            </View>
                            ))}
                        </View>
                        </Text>

                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
                    </View>
                )}
            />
        </View>
    );
};

export default ListOld;
