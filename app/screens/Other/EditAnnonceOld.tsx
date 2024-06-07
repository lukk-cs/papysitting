// EditAnnonceYoung.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, KeyboardAvoidingView, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { CheckBox } from "react-native-elements";
import { updateAnnonceVieux, getAnnonceVieuxDetails} from "../../functions/functionsDatabase";
import styles from "../../styles/styles";

const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const EditAnnonceOld = ({ route, navigation }) => {
    const { annonceId } = route.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedDays, setSelectedDays] = useState([]);
    const [availability, setAvailability] = useState({});

    useEffect(() => {
        const fetchAnnonceDetails = async () => {
            try {
                const annonceDetails = await getAnnonceVieuxDetails(annonceId);

                setTitle(annonceDetails.titre);
                setDescription(annonceDetails.description);
                setAvailability(annonceDetails.disponibilites);
                setSelectedDays(Object.keys(annonceDetails.disponibilites));

                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails de l\'annonce :', error);
                // Affichez un message d'erreur ou effectuez une action appropriée
                setLoading(false);
            }
        };

        fetchAnnonceDetails();
    }, [annonceId]);

    const handleDaySelection = (day) => {
        // Gérez la sélection des jours
        if (selectedDays.includes(day)) {
            setSelectedDays((prevSelectedDays) => prevSelectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
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
        // Gérez la bascule de disponibilité
        setAvailability((prevAvailability) => ({
            ...prevAvailability,
            [day]: {
                ...prevAvailability[day],
                [time]: !prevAvailability[day][time],
            },
        }));
    };

    const handleUpdate = async () => {
        // Effectuez les validations nécessaires ici avant la mise à jour
        if (!title || !description || selectedDays.length === 0) {
            // Affichez un message d'erreur ou effectuez une action appropriée
            return;
        }

        try {
            setLoading(true);
            const updatedDetails = {
                titre: title,
                description: description,
                disponibilites: availability,
            };

            await updateAnnonceVieux(annonceId, updatedDetails);

            // Redirigez l'utilisateur vers la page de liste après la mise à jour
            navigation.navigate('ListSelfOld');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'annonce :', error);
            // Affichez un message d'erreur ou effectuez une action appropriée
        } finally {
            setLoading(false);
        }
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

    if (loading) {
        return <ActivityIndicator size="large" color="#0000f" />;
    }

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

                {/* Render the availability checkboxes */}
                {renderAvailabilityCheckboxes()}

                {loading ? (
                    <ActivityIndicator size="large" color="#0000f" />
                ) : (
                    <Button title="Update" onPress={() => handleUpdate()} />
                )}
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default EditAnnonceOld;
