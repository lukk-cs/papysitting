import {View, Text, Button, FlatList, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../../FirebaseConfig";
import { collection, getDocs, where, query } from 'firebase/firestore';
import styles from "../../styles/styles";
import {handleDeleteAnnonceJeunes} from '../../functions/functionsDatabase';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const ListSelfYoung = ({ navigation }: RouterProps) => {
    const [user, setUser] = useState(null);
    const [annonces, setAnnonces] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = FIREBASE_AUTH.currentUser;
            console.log('user: ' + currentUser)
            if (currentUser) {
                setUser(currentUser);
            } else {
                console.error('Utilisateur non connecté');
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchAnnonces = async () => {
            if (user) {
                console.log('user: ' + user)
                const annoncesCollection = collection(FIREBASE_DB, 'annoncesJeunes');
                const q = query(annoncesCollection, where('prenom', '==', user.uid));
                const annoncesSnapshot = await getDocs(q);
                const annoncesData = [];

                annoncesSnapshot.forEach((doc) => {
                    annoncesData.push({ id: doc.id, ...doc.data() });
                });

                setAnnonces(annoncesData);
            }
        };

        fetchAnnonces();
    }, [user]);

    return (
        <View style={styles.disponibilitesContainer}>
            <Text style={styles.loginText}>Vos annonces</Text>
            <FlatList
                data={annonces}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listItemTitle}>{item.titre}</Text>
                        <Text style={styles.listItemDescription}>{item.description}</Text>
                        <Text style={styles.listItemDescription}>
                            <View style={styles.disponibilitesContainer}>
                                <Text style={styles.DispoText}>Disponibilités</Text>
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

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteAnnonceJeunes(item.id, setAnnonces)}
                        >
                            <Text style={styles.deleteButtonText}>Supprimer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => navigation.navigate('EditAnnonce', { annonceId: item.id })}
                        >
                            <Text style={styles.editButtonText}>Modifier</Text>
                        </TouchableOpacity>


                    </View>
                )}
            />
        </View>
    );
};
export default ListSelfYoung;
