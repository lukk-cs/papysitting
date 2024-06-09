import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import stylesDashboard from '../../styles/stylesDashboard';
import stylesSeeAll from '../../styles/stylesSeeAll';
import { getUserProfileImage } from '../../functions/functionsStorage';

const SeeAllNext = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { meetings, uid } = route.params;
    const [profileImages, setProfileImages] = useState({});
    console.log(meetings)

    useEffect(() => {
        const fetchProfileImages = async () => {
            const images = {};
            for (const item of meetings) {
                const imageUrl = await getUserProfileImage(item.uid_old);
                images[item.uid_old] = imageUrl;
            }
            setProfileImages(images);
        };

        fetchProfileImages();
    }, [meetings]);

    const formatAvailability = (availability) => {
        let formattedAvailability = '';
        // Définir l'ordre des jours de la semaine
        const daysOrder = ['Lundi matin', 'Lundi midi', 'Lundi a-m', 'Lundi soir',
                          'Mardi matin', 'Mardi midi', 'Mardi a-m', 'Mardi soir',
                          'Mercredi matin', 'Mercredi midi', 'Mercredi a-m', 'Mercredi soir',
                          'Jeudi matin', 'Jeudi midi', 'Jeudi a-m', 'Jeudi soir',
                          'Vendredi matin', 'Vendredi midi', 'Vendredi a-m', 'Vendredi soir',
                          'Samedi matin', 'Samedi midi', 'Samedi a-m', 'Samedi soir',
                          'Dimanche matin', 'Dimanche midi', 'Dimanche a-m', 'Dimanche soir'];    // Trier les jours de la semaine selon l'ordre défini
        const sortedDays = Object.keys(availability).sort((a, b) => {
          return daysOrder.indexOf(a) - daysOrder.indexOf(b);
        });
        // Construire la chaîne de caractères formatée
        sortedDays.forEach(day => {
          const hour = availability[day];
          formattedAvailability += `${day} : ${hour}h\n`;
        });
        return formattedAvailability;
      };
      

    return (
        <View style={{ flex: 1, marginVertical: 20 }}>
            <FlatList
                data={meetings}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={stylesSeeAll.squareSuggestions}
                            onPress={() => navigation.navigate('MeetingDetails', {
                                uid_young: uid,
                                uid_old: item.uid_old,
                                availability: item.availability,
                                oldName: item.oldName,
                                address: item.address
                            })}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10,  }}>
                                <Image 
                                    source={profileImages[item.uid_old] ? { uri: profileImages[item.uid_old] } : require('../../../assets/pdp.png')} 
                                    style={{ width: 80, height: 80, borderRadius: 40 }} 
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={stylesDashboard.squareTextSuggestionsBold}>{`${item.oldName}`}</Text>
                                    <Text style={stylesDashboard.squareTextSuggestionsBold}>{`Visites ${item.freq}s`}</Text>
                                    <Text style={stylesDashboard.squareTextSuggestions}>{`${formatAvailability(item.availability)}`}</Text>
                                    <Text style={stylesDashboard.squareTextSuggestions}>{`${item.distance} km`}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default SeeAllNext;
