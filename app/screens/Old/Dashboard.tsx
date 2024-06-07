import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import VisitsScreen from './VisitsScreen';
import MessagesScreen from './MessagesScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Visites') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Messages') {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0D3B66',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Visites" component={VisitsScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profil" component={ProfileScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
  );
};

export default Dashboard;
