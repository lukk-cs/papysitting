// LoadingScreen.js
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulez le chargement des données
    setTimeout(() => {
      setLoading(false); // Met à jour l'état pour indiquer que le chargement est terminé
    }, 2000); // Remplacez 2000 par le temps réel de chargement de vos données
  }, []);

  return (
    <View style={styles.container}>
      <Text>test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default LoadingScreen;
