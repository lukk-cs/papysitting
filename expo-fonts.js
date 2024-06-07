import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'HelveticaNeue-Regular': require('./assets/fonts/HelveticaNeue-Regular.ttf'),
    'HelveticaNeue-Bold': require('./assets/fonts/HelveticaNeue-Bold.ttf'),
    // Ajoutez ici d'autres styles de la police si nécessaire
  });

  return fontsLoaded;
};
