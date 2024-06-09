import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import stylesDashboard from '../../styles/stylesDashboard'; // Importez vos styles ici
import stylesSeeAll from '../../styles/stylesSeeAll';

const SeeAllSuggested = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { matchingOlds, uid } = route.params;
    console.log(matchingOlds)
    return (
        <View style={{flex:1, marginVertical: 20}}>
            <FlatList
                data={matchingOlds}
                keyExtractor={(item) => item.uid}
                renderItem={({ item }) => {
                return (
                <TouchableOpacity
                    style={stylesSeeAll.squareSuggestions}
                    onPress={() => navigation.navigate('PersonDetails', { uid_young : uid, uid_old: item.uid, firstName : item.firstName, lastName : item.lastName, address : item.address, availability : item.commonAvailability, annonceId: item.annonceId})}
                >
                    <View style={{justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                        <Text style={stylesDashboard.squareTextSuggestionsBold}>{`${item.firstName} ${item.lastName}`}</Text>
                        <Text style={stylesDashboard.squareTextSuggestionsBold}>{`Visites ${item.freq}s`}</Text>
                        <Text style={stylesDashboard.squareTextSuggestions}>{`j/semaine`}</Text>
                        <Text style={stylesDashboard.squareTextSuggestions}>{`${item.distance} km`}</Text>

                </View>
                </TouchableOpacity>
                );
                }}
            />
        </View>
    );
};

export default SeeAllSuggested;
