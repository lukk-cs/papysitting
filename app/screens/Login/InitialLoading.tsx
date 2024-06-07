// InitialLoading.js
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InitialLoading = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Initialisez l'état du chargement à vrai

  useEffect(() => {
    // Simulez le chargement en attendant 2 secondes
    const timer = setTimeout(() => {
      setLoading(false); // Une fois le chargement terminé, définissez l'état de chargement sur faux
      navigation.navigate('FirstPage'); // Naviguez vers l'écran de connexion une fois le chargement terminé
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      {/* Remplacez l'ActivityIndicator par votre image */}
      <Image source={require('../../../assets/logo.png')} style={{ width: 100, height: 100 }} />
    </View>
  );
};

export default InitialLoading;
