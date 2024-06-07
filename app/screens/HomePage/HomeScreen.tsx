import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from '../../styles/styles';
import stylesDashboard from '../../styles/stylesDashboard';
import stylesDasboard from '../../styles/stylesDashboard';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { query, collection, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { getUserProfileImage } from '../../functions/functionsStorage';
import { distance, fetchMatchingOlds, filterObsoleteByDate, filterObsoleteDaysNextVisits } from '../../functions/functionsMatching';

{/* carrés pour les infos, osef pour l'instant

const Square = ({ title }) => {
  return (
    <TouchableOpacity style={stylesDashboard.square}>
      <Text style={stylesDashboard.squareText}>{title}</Text>
    </TouchableOpacity>
  );
};
*/}

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [uid, setUid] = useState('');
  const [hasMadeRequest, setHasMadeRequest] = useState(false);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [freq, setFreq] = useState('');
  const [begin, setBegin] = useState('');
  const [address, setAddress] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [matchingOlds, setMatchingOlds] = useState([]);
  const [meetingsFetched, setMeetingsFetched] = useState(false);

  {/* fonction appelée à chaque rafraichissement de la page : ici on cherche la prohaine visite */}
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchMatchingOldsData();
    await fetchMeetings();
    setIsRefreshing(false);
  };

  const fetchMatchingOldsData = async () => {
    setLoading(true);
    await fetchMatchingOlds(
      setUid,
      setHasMadeRequest,
      setDates,
      () => {}, // skip setting freq
      () => {}, // skip setting begin
      () => {}, // skip setting address
      setUserName,
      setMatchingOlds,
      setLoading
    );
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchMatchingOldsData();
    }, [])
  );

  useEffect(() => {
    fetchMatchingOldsData();
  }, []);

  const fetchMeetings = async () => {
    const db = FIREBASE_DB;
    const auth = FIREBASE_AUTH;
    const user = auth.currentUser;
    if (!user) {
      console.error('Utilisateur non connecté');
      return;
    }
    const uid = user.uid;
    const meetingsRef = collection(db, 'matchings');
    const meetingsQuery = query(meetingsRef, where('uid_young', '==', uid));
    const meetingsSnapshot = await getDocs(meetingsQuery);
    const fetchedMeetings = [];
    for (const doc of meetingsSnapshot.docs) {
      const meetingData = doc.data();
      const oldsRef = collection(db, 'olds');
      const oldQuery = query(oldsRef, where('uid', '==', meetingData.uid_old));
      const oldSnapshot = await getDocs(oldQuery);
      if (!oldSnapshot.empty) {
        const oldData = oldSnapshot.docs[0].data();
        const annoncesVieuxRef = collection(db, 'annoncesVieux');
        const annonceQuery = query(annoncesVieuxRef, where('user', '==', meetingData.uid_old));
        const annonceSnapshot = await getDocs(annonceQuery);
        let freq = '';
        let beginDate = '';
        if (!annonceSnapshot.empty) {
          freq = annonceSnapshot.docs[0].data().freq;
          beginDate = annonceSnapshot.docs[0].data().begin;
        }
        fetchedMeetings.push({
          id: doc.id,
          uid_old: meetingData.uid_old,
          availability: meetingData.availability,
          oldName: `${oldData.firstName} ${oldData.lastName}`,
          address: oldData.address,
          distance: (await distance(uid, meetingData.uid_old)).toFixed(1),
          freq: freq,
          begin: beginDate
        });
      }
    }
    console.log('MEETINGS : ', fetchedMeetings)
    let filteredFetchedMeetings = await filterObsoleteDaysNextVisits(fetchedMeetings);
    setMeetings(filteredFetchedMeetings.length > 0 ? filteredFetchedMeetings : []);
    //setHasMadeRequest(filteredFetchedMeetings.length > 0);
    //console.log('filteredfetchedmeetings : ', filteredFetchedMeetings)
    //console.log('hasmaderequest : ', hasMadeRequest)
    setMeetingsFetched(true);
  };

  useEffect(() => {
    fetchMeetings();
  }, [uid]);



  const formatAvailability = (availability) => {
    let formattedAvailability = '';
    // Définir l'ordre des jours de la semaine
    const daysOrder = ['Lundi matin', 'Lundi midi', 'Lundi a-m', 'Lundi soir',
                      'Mardi matin', 'Mardi midi', 'Mardi a-m', 'Mardi soir',
                      'Mercredi matin', 'Mercredi midi', 'Mercredi a-m', 'Mercredi soir',
                      'Jeudi matin', 'Jeudi midi', 'Jeudi a-m', 'Jeudi soir',
                      'Vendredi matin', 'Vendredi midi', 'Vendredi a-m', 'Vendredi soir',
                      'Samedi matin', 'Samedi midi', 'Samedi a-m', 'Samedi soir',
                      'Dimanche matin', 'Dimanche midi', 'Dimanche a-m', 'Dimanche soir'];
    // Trier les jours de la semaine selon l'ordre défini
    const sortedDays = Object.keys(availability).sort((a, b) => {
      return daysOrder.indexOf(a) - daysOrder.indexOf(b);
    });
    // Construire la chaîne de caractères formatée
    sortedDays.forEach(day => {
      const hour = availability[day][0]; // différence entre formatAvailability et formatAvailability2, c'est juste qu'on l'applique pas aux memes dictionnaires
      formattedAvailability += `${day} : ${hour}h, `;
    });
    return formattedAvailability;
  };

  const formatAvailability2 = (availability) => {
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
  
  const getCurrentDayOrder = () => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const daysOrder = ['Dimanche matin', 'Dimanche midi', 'Dimanche a-m', 'Dimanche soir', 'Lundi matin', 'Lundi midi', 'Lundi a-m', 'Lundi soir', 'Mardi matin', 'Mardi midi', 'Mardi a-m', 'Mardi soir', 'Mercredi matin', 'Mercredi midi', 'Mercredi a-m', 'Mercredi soir', 'Jeudi matin', 'Jeudi midi', 'Jeudi a-m', 'Jeudi soir', 'Vendredi matin', 'Vendredi midi', 'Vendredi a-m', 'Vendredi soir', 'Samedi matin', 'Samedi midi', 'Samedi a-m', 'Samedi soir'];
    const offset = currentDay * 4;
    return [...daysOrder.slice(offset), ...daysOrder.slice(0, offset)];
  };

  const flattenMeetings = (meetings) => {
    let flattenedMeetings = [];
    const currentDayOrder = getCurrentDayOrder();
    meetings.forEach(meeting => {
      Object.keys(meeting.availability).forEach(day => {
        flattenedMeetings.push({
          id: `${meeting.id}-${day}`,
          uid_old: meeting.uid_old,
          oldName: meeting.oldName,
          address: meeting.address,
          distance: meeting.distance,
          day: day,
          time: meeting.availability[day],
        });
      });
    });
    flattenedMeetings.sort((a, b) => currentDayOrder.indexOf(a.day) - currentDayOrder.indexOf(b.day));
    return flattenedMeetings;
  };
  
  const getNextAvailableDay = (availability) => {
    const daysOrder = getCurrentDayOrder();
    const currentDayIndex = new Date().getDay() * 4; // multiply by 4 because each day has 4 slots (morning, noon, afternoon, evening)
    const sortedAvailability = Object.entries(availability).sort((a, b) => {
      return daysOrder.indexOf(a[0]) - daysOrder.indexOf(b[0]);
    });
  
    for (let i = currentDayIndex; i < daysOrder.length; i++) {
      const day = daysOrder[i];
      if (availability[day]) {
        return { day, time: availability[day] };
      }
    }
  
    for (let i = 0; i < currentDayIndex; i++) {
      const day = daysOrder[i];
      if (availability[day]) {
        return { day, time: availability[day] };
      }
    }
  
    return null;
  };
{/*données pour les infos dans les petits carrés osef pour l'instant
  const data = [
    { id: '1', title: 'Actualité 1' },
    { id: '2', title: 'Actualité 2' },
    { id: '3', title: 'Actualité 3' },
    // Ajoutez d'autres données si nécessaire
  ];
*/}

const fetchAssociatedProfileImage = async () => {
  try {
    let imageUrl = await getUserProfileImage(meetings[0].uid_old);
    console.log('URL1 : ', imageUrl)
    return imageUrl;
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      // Gérer le cas où l'objet n'est pas trouvé dans Firebase Storage
      console.error("L'image de profil n'a pas été trouvée dans Firebase Storage. Utilisation de l'image de remplacement.");
      return null;
    } else {
      // Gérer d'autres erreurs
      console.error("Erreur lors de la récupération de l'URL de l'image de profil de la personne associée :", error);
      return null;
    }
  }
};


  const [associatedProfileImage, setAssociatedProfileImage] = useState(null);

  useEffect(() => {
    const fetchAssociatedImage = async () => {
      if (meetings.length > 0 && meetings[0].uid_old) {
        const imageUrl = await fetchAssociatedProfileImage();
        setAssociatedProfileImage(imageUrl);
        console.log('url : ', imageUrl)
      }
    };
  
    fetchAssociatedImage();
  }, [meetings]);
  
  //console.log('hasmaderequest2', hasMadeRequest)

  const flattenedMeetings = flattenMeetings(meetings);

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={styles.scrollContainer}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scrollContainer}
          refreshControl = {
            <RefreshControl
              refreshing = {refreshing}
              onRefresh = {onRefresh} // quand on demande a recharger la page, c'est onRefresh qui est appelé (voir plus haut) et qui cherche la prochaine visite
            />
          }
        >
          <View style={styles.container}>
            {/* titre : bonjour prénom */}
            <View style={styles.headerContainer}>
              <Text style={styles.Title}>Bonjour {userName},</Text>
            </View>
            {/* affiche en gros la prochaine visite, se rafraichit à chaque fois qu'on revient sur la page
            s'il n'y a pas de prochaine visite, propose de renseigner ses dispos */}
            {!isRefreshing && (
              <View style ={{flex: 1}}>
                {loading || !meetingsFetched ? (
                  <ActivityIndicator size="large" color="#0000f" />
                ) : hasMadeRequest ? (
                  meetings.length > 0 ? (
                    <>
                      <Text style={styles.Subtitle2}>Prochaine visite</Text>
                      <TouchableOpacity
                        style={stylesDashboard.squareNext1}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10, width: '100%', height: '100%' }}>
                          {associatedProfileImage ? (
                            <Image
                              source={{ uri: associatedProfileImage }}
                              style={{ width: 70, height: 70, borderRadius: 35, marginHorizontal: 20 }}
                            />
                          ) : (
                            <Ionicons name="person-outline" size={70} color="black" style={{ marginHorizontal: 20 }} />
                          )}
                          <View style={{ alignItems: 'flex-start' }}>
                            <Text style={stylesDashboard.squareTextSuggestionsBold}>{`${meetings[0].oldName}`}</Text>
                            {getNextAvailableDay(meetings[0].availability) && (
                              <Text style={stylesDashboard.squareTextSuggestionsBold}>
                                {`${getNextAvailableDay(meetings[0].availability).day} : ${getNextAvailableDay(meetings[0].availability).time}h`}
                              </Text>
                            )}
                            <Text style={stylesDashboard.squareTextSuggestions}>{`${meetings[0].address}`}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={stylesDasboard.squareNext2}
                        onPress={() => navigation.navigate('MeetingDetails', { uid_young: uid, uid_old: meetings[0].uid_old, availability: meetings[0].availability, oldName: meetings[0].oldName, address: meetings[0].address })}
                      >
                        <Text style={stylesDasboard.textSeeDetails}>Voir le détail</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Text style={{alignSelf: 'center', marginBottom : 20}}>Aucune date trouvée pour la prochaine visite</Text>
                  )
                ) : (
                  <View>
                    {/* si on ne trouve aps de dispo, on affiche : */}
                    <View style={stylesDasboard.subtitlesContainer}>
                      <Text style={styles.Subtitle}>Renseigne tes disponibilités</Text>
                    </View>

                    <View style={stylesDashboard.buttonContainer}>
                      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard2', { name: userName, uid: uid })}>
                        <Text style={styles.loginTextButton}>Ajouter mes disponibilités</Text>
                      </TouchableOpacity>
                    </View>

                  </View>
                )}


                {/* affiche les visites suggérées i.e. tous les vieux qui ont besoin d'une visite et qui sont proches */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight : 20, }}>
                  <Text style={styles.Subtitle2}>Visites Suggérées</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Meetings', { uid: uid })}>
                    <Text style={{fontFamily: 'HelveticaNeue', color: '#a0a5a8', fontSize: 16, textDecorationLine: 'underline',}}>Voir tout</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginHorizontal: 20, marginVertical: 5}}>
                  <Text style={{fontFamily: 'HelveticaNeue', color: '#a0a5a8', fontSize: 16}}>Ces visites sont faites pour toi !</Text>
                </View>


                {/* flqtlist de toutes les dispos, trouvées avec fetchmatchingolds (voir api, d'ailleurs ça devrait etre dans fonctions) */}
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <FlatList
                    horizontal
                    data={matchingOlds}
                    keyExtractor={(item) => item.uid}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={stylesDashboard.squareSuggestions}
                        onPress={() => navigation.navigate('PersonDetails', { uid_young : uid, uid_old: item.uid, firstName : item.firstName, lastName : item.lastName, address : item.address, availability : item.commonAvailability, annonceId: item.annonceId})}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                          <View style={{ alignItems: 'flex-start' }}>
                            <Text style={stylesDashboard.squareTextSuggestions}>{`${item.firstName} ${item.lastName}\n Visites ${item.freq}s \n ${formatAvailability(item.commonAvailability)}\n${item.distance} km`}</Text>
                          </View>
                        <View style={{alignSelf: 'top'}}>
                          <Ionicons name="chevron-forward-outline" size={24} color="black" />
                        </View>

                      </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight : 20, }}>
                  <Text style={styles.Subtitle2}>Visites à venir</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Meetings', { uid: uid })}>
                    <Text style={{fontFamily: 'HelveticaNeue', color: '#a0a5a8', fontSize: 16, textDecorationLine: 'underline',}}>Voir tout</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <FlatList
                    horizontal
                    data={flattenedMeetings}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={stylesDashboard.squareSuggestions}
                        onPress={() => navigation.navigate('MeetingDetails', { uid_young: uid, uid_old: item.uid_old, availability: { [item.day]: item.time }, oldName: item.oldName, address: item.address })}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                        <View style={{ alignItems: 'flex-start' }}>
                          <Text style={stylesDashboard.squareTextSuggestionsBold}>{item.oldName}</Text>
                          <Text style={stylesDashboard.squareTextSuggestionsBold}>{`${item.day} : ${item.time}h`}</Text>
                          <Text style={stylesDashboard.squareTextSuggestions}>{`${item.address} à ${item.distance} km`}</Text>
                        </View>

                          <View style={{ alignSelf: 'top' }}>
                            <Ionicons name="chevron-forward-outline" size={24} color="black" />
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>

{/* pour accéder à stripe
                <View style={stylesDasboard.buttonContainer}>
                    <TouchableOpacity style={stylesDasboard.button}>
                      <Text style={stylesDasboard.textWhiteButton}>PAYE</Text>
                    </TouchableOpacity>
                </View>
*/}
                <View style={{flex:1}}>
                  <View style={stylesDasboard.subtitlesContainer}>
                    <Text style={styles.Subtitle}>Télécharge tes pièces justificatives</Text>
                  </View>
                  
                  <View style={stylesDasboard.buttonContainer}>
                    <TouchableOpacity style={stylesDasboard.button} onPress={() => navigation.navigate('Documents', {uid : uid})}>
                      <Text style={stylesDasboard.textWhiteButton}>Ajouter mes documents</Text>
                    </TouchableOpacity>
                  </View>
                  
{/* actualités, ne sert à rien
                  
                  <View style={{justifyContent: 'center'}}>
                    <View style={stylesDasboard.subtitlesContainer}>
                      <Text style={styles.Subtitle}>Actualité</Text>
                    </View>
                    <FlatList
                      data={data}
                      horizontal
                      renderItem={({ item }) => <Square title={item.title} />}
                      keyExtractor={(item) => item.id}
                      contentContainerStyle={stylesDashboard.flatListContainer}
                    />
                  </View>

                  <View style={{justifyContent: 'center'}}>
                    <View style={stylesDasboard.subtitlesContainer}>
                      <Text style={styles.Subtitle}>Pourquoi rejoindre Pappiness ?</Text>
                    </View>
                  </View>
*/}
                </View>
              </View>
              )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
  
};

export default HomeScreen;

