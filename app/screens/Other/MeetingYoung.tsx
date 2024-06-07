import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button, KeyboardAvoidingView, TextInput, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { postYoung } from "../../functions/functionsDatabase";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import styles from "../../styles/styles";

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const Meeting = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const [availability, setAvailability] = useState({});
    const [uid, setUid] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = FIREBASE_AUTH.currentUser;

                if (user) {
                    const uid = user.uid;
                    setUid(uid);
                } else {
                    console.error('Utilisateur non connecté');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur :', error);
            }
        };

        fetchData();
    }, []);

    const handleDaySelection = (day) => {
        // Si le jour est déjà sélectionné, désélectionnez-le
        if (selectedDays.includes(day)) {
            setSelectedDays((prevSelectedDays) => prevSelectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
            // Si le jour n'est pas sélectionné, ajoutez-le
            setSelectedDays((prevSelectedDays) => [...prevSelectedDays, day]);
        }

        // Réinitialisez l'état d'accessibilité pour le jour sélectionné
        setAvailability((prevAvailability) => {
            const newAvailability = { ...prevAvailability };
            newAvailability[day] = { morning: false, noon: false, evening: false };
            return newAvailability;
        });
    };

    const handleAvailabilityToggle = (day, time) => {
        // Mettez à jour l'état d'accessibilité pour le jour et le temps sélectionnés
        setAvailability((prevAvailability) => ({
            ...prevAvailability,
            [day]: {
                ...prevAvailability[day],
                [time]: !prevAvailability[day][time],
            },
        }));
    };

    const renderAvailabilityCheckboxes = () => {
        return daysOfWeek.map((day) => (
            <View key={day} style={styles.dayContainer}>
                <CheckBox
                    title={day}
                    checked={selectedDays.includes(day)}
                    onPress={() => handleDaySelection(day)}
                    containerStyle={styles.checkboxContainer}
                    textStyle={styles.checkboxLabel}
                />
                {selectedDays.includes(day) && (
                    <View style={styles.availabilityContainer}>
                        <Text style={styles.dayLabel}>Sélectionnez les disponibilités pour {day} :</Text>
                        <CheckBox
                            title="Matin"
                            checked={availability[day]?.morning || false}
                            onPress={() => handleAvailabilityToggle(day, 'morning')}
                        />
                        <CheckBox
                            title="Midi"
                            checked={availability[day]?.noon || false}
                            onPress={() => handleAvailabilityToggle(day, 'noon')}
                        />
                        <CheckBox
                            title="Soir"
                            checked={availability[day]?.evening || false}
                            onPress={() => handleAvailabilityToggle(day, 'evening')}
                        />
                    </View>
                )}
            </View>
        ));
    };

    return (
        <ScrollView style={styles.scrollContainer}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                    value={title}
                    style={styles.loginInput}
                    placeholder="Title"
                    autoCapitalize="none"
                    onChangeText={(text) => setTitle(text)}
                />
                <TextInput
                    value={description}
                    style={styles.loginInput}
                    placeholder="Description"
                    autoCapitalize="none"
                    onChangeText={(text) => setDescription(text)}
                />

                {renderAvailabilityCheckboxes()}

                {loading ? (
                    <ActivityIndicator size="large" color="#0000f" />
                ) : (
                    <Button title="Post" onPress={() => postYoung(title, description, availability, uid, setLoading)} />
                )}
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default Meeting;
