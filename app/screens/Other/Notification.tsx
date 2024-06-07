import React from 'react';
import { View, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const NotificationButton = () => {
  const handleNotification = async () => {
    try {
      // Envoie d'une notification à l'appareil de l'utilisateur
      await messaging().send({
        notification: {
          title: 'Nouvelle notification',
          body: 'Ceci est le corps de la notification.',
        },
        token: 'AIzaSyDrndnB5quRS2GsmtH9raYqWCjayHJGRXE',
      });
      console.log('Notification envoyée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification :', error);
    }
  };

  return (
    <View>
      <Button title="Envoyer une notification" onPress={handleNotification} />
    </View>
  );
};

export default NotificationButton;
