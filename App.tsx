import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MeetingOld from './app/screens/Other/MeetingOld';
import Dashboard from './app/screens/HomePage/Dashboard';
import Dashboard3 from './app/screens/Availibilities/Frequency';
import Dashboard4 from './app/screens/Availibilities/DaysofWeek';
import Dashboard5 from './app/screens/Availibilities/HoursofDay';
import Success from './app/screens/Availibilities/Success';
import DashboardYoung from './app/screens/Other/DashboardYoung';
import Register from "./app/screens/Login/Register"
import MeetingYoung from "./app/screens/Other/MeetingYoung"
import ListYoung from './app/screens/Other/ListYoung';
import ListOld from './app/screens/Other/ListOld';
import ListSelfYoung from './app/screens/Other/ListSelfYoung';
import ListSelfOld from './app/screens/Other/ListSelfOld';
import EditAnnonceYoung from './app/screens/Other/EditAnnonceYoung';
import EditAnnonceOld from './app/screens/Other/EditAnnonceOld';
import EMailSent from './app/screens/Other/EMailSent';
import ForgotPassword from './app/screens/Other/ForgotPassword';
import ChatPage from './app/screens/Messages/ChatPage';
import InitialLoading from './app/screens/Login/InitialLoading';
import Login from './app/screens/Login/Login';
import FirstPage from './app/screens/Login/FirstPage';
import AccountCreated from './app/screens/Login/AccountCreated';
import AddInfos from './app/screens/Profile/AddInfos';
import AddInfos2 from './app/screens/Profile/AddInfos2';
import MyRequest from './app/screens/VisitsDetails/MyRequest';
import PersonDetails from './app/screens/VisitsDetails/PersonDetails';
import Documents from './app/screens/Documents/Documents';
import Identity from './app/screens/Documents/Identity';
import IdentityCard from './app/screens/Documents/IdentityCard';
import Passport from './app/screens/Documents/Passport';
import Insee from './app/screens/Documents/Insee';
import Crime from './app/screens/Documents/Crime';
import ProfileComplete from './app/screens/Profile/ProfileComplete';
import RIB from './app/screens/Documents/RIB';
import MeetingDetails from './app/screens/VisitsDetails/MeetingDetails';
import DeleteVisit from './app/screens/VisitsDetails/DeleteVisit';
import Dashboard2 from './app/screens/Availibilities/BeginDate';
import SeeAllSuggested from './app/screens/VisitsDetails/SeeAllSuggested';
import SeeAllNext from './app/screens/VisitsDetails/SeeAllNext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="InitialLoading" component={InitialLoading} options={{ headerShown: false }} />
        <Stack.Screen name="FirstPage" component={FirstPage} options={{ headerShown: false }} />
        <Stack.Screen name="AccountCreated" component={AccountCreated} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={Register} options={{ title: 'Créer un nouveau compte', headerBackTitleVisible: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
        <Stack.Screen name="SeeAllSuggested" component={SeeAllSuggested} options={{title:'Toutes les visites suggérées', headerBackVisible: false}}/>
        <Stack.Screen name="SeeAllNext" component={SeeAllNext} options={{title:'Toutes les prochaines visites', headerBackVisible: false}}/>
        <Stack.Screen name="Documents" component={Documents} options={{ title: 'Charger les documents' , headerBackTitleVisible: false }}/>
        <Stack.Screen name="MyRequest" component={MyRequest} options={{ title: 'Ma demande' , headerBackTitleVisible: false }}/>
        <Stack.Screen name="Identity" component={Identity} options={{ title: 'Document d\'identité', headerBackTitleVisible: false  }}/>
        <Stack.Screen name="IdentityCard" component={IdentityCard} options={{ title: 'Carte d\'identité' , headerBackTitleVisible: false }}/>
        <Stack.Screen name="Passport" component={Passport} options={{ title: 'Passeport', headerBackTitleVisible: false  }}/>
        <Stack.Screen name="Insee" component={Insee} options={{ title: 'Déclaration Insee ou Kbis', headerBackTitleVisible: false }}/>
        <Stack.Screen name="Crime" component={Crime} options={{ title: 'Casier judiciaire', headerBackTitleVisible: false  }}/>
        <Stack.Screen name="RIB" component={RIB} options={{ title: 'RIB', headerBackTitleVisible: false  }}/>
        <Stack.Screen 
          name="Dashboard2" 
          component={Dashboard2} 
          options={{ 
            headerBackTitleVisible: false, 
            title: 'Quand souhaitez-vous prendre\nvotre première visite ?', 
            headerTitleStyle: {
              textAlign: 'center', // Alignement central
              flex: 1, // Pour s'assurer que le titre peut occuper toute la largeur de l'écran
              flexWrap: 'wrap' // Permettre le retour à la ligne
            }
          }}
        />   
        <Stack.Screen name="Dashboard3" component={Dashboard3}
          options={{ title: 'Quel type de demande\nsouhaitez-vous faire ?'
          , headerBackTitleVisible: false 
            }}/>
        <Stack.Screen name="Dashboard4" component={Dashboard4} options={{ title: 'À quel moment ?', headerBackTitleVisible: false }}/>
        <Stack.Screen name="Dashboard5" component={Dashboard5} options={{ title: 'Quelle durée ?', headerBackTitleVisible: false  }}/>
        <Stack.Screen name="Success" component={Success} options={{ headerShown: false }}/>
        <Stack.Screen name="PersonDetails" component={PersonDetails} options={{ title: 'Détails de la personne' , headerBackTitleVisible: false }}/>
        <Stack.Screen name="MeetingDetails" component={MeetingDetails} options={{ title: 'Détails de la visite' , headerBackTitleVisible: false }}/>
        <Stack.Screen name="DeleteVisit" component={DeleteVisit} options={{ title: '' , headerBackTitleVisible: false }}/>
        <Stack.Screen name="AddInfos" component={AddInfos} options={{ title: 'Compléter mon profil' , headerBackTitleVisible: false }}/>
        <Stack.Screen name="AddInfos2" component={AddInfos2} options={{ title: 'Informations supplémentaires' , headerBackTitleVisible: false }}/>
        <Stack.Screen name="ProfileComplete" component={ProfileComplete} options={{ headerShown: false }}/>
        <Stack.Screen name="DashboardYoung" component={DashboardYoung} />
        <Stack.Screen name="MeetingOld" component={MeetingOld} />
        <Stack.Screen name="MeetingYoung" component={MeetingYoung} />
        <Stack.Screen name="ListOld" component={ListOld} />
        <Stack.Screen name="ListYoung" component={ListYoung} />
        <Stack.Screen name="ListSelfYoung" component={ListSelfYoung} />
        <Stack.Screen name="ListSelfOld" component={ListSelfOld} />
        <Stack.Screen name="EditAnnonceYoung" component={EditAnnonceYoung} />
        <Stack.Screen name="EditAnnonceOld" component={EditAnnonceOld} />
        <Stack.Screen name="EmailSent" component={EMailSent} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="ChatPage"
          component={ChatPage}
          options={({ route }) => ({
            title: route.params?.recipientName ? route.params.recipientName : 'Chat',
            headerBackTitleVisible: false
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
