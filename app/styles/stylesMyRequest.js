import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'



const stylesMyRequest = StyleSheet.create({

      container1: {
        width: '90%',
        borderRadius: 12,
        alignSelf: 'center',
        backgroundColor: 'white',
        marginVertical: 20,
        // ombre
        shadowColor: black,
        shadowOffset: {
            height: 5,
        },
        shadowOpacity: 0.2,
      },

      container2: {
        width: '90%',
        borderRadius: 12,
        alignSelf: 'center',
        backgroundColor: 'white',
        marginVertical: 20,
      },

      title: {
        fontSize: 20,
        fontFamily: 'HelveticaNeue-Bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
      },

      subtitle: {
        paddingHorizontal: 20,
        fontSize: 15,
        fontFamily: 'HelveticaNeue',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
      },

      textButton : {
        paddingHorizontal: 20,
        fontSize: 15,
        fontFamily: 'HelveticaNeue',
        marginBottom: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
      },

      text: {
        textAlign: 'left',
        fontSize: 18,
        fontFamily: 'HelveticaNeue-Bold',
        marginTop: 10,
        marginBottom: 10,
      },

      title2: {
        textAlign: 'left',
        fontSize: 20,
        fontFamily: 'HelveticaNeue-Bold',
        marginTop: 20,
        marginBottom: 10,
      },

      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
      },

      itemWithBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingBottom: 10, // pour ajuster l'espace entre la ligne et le texte
      },

      icon: {
        marginRight: 10,
      },

      text2: {
        textAlign: 'left',
        fontSize: 18,
        fontFamily: 'HelveticaNeue',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
      },

      textContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
      },
});

export default stylesMyRequest;