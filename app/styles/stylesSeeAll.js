import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'



const stylesAccountCreated = StyleSheet.create({
    squareSuggestions: {
        width: '90%',
        height: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 30,
        justifyContent: 'center',
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2, 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 10,
      },
    input : {
        height: 120,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: gray,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 20,
        
    },
    buttonPass: {
        width: '49%',
      },
    textButtonPass : {
        textAlign: 'center',
        fontSize: 16,
        color: 'black',
        fontFamily: 'HelveticaNeue',
      },
    accountCreated : {
        fontSize : 22,
        fontFamily : 'HelveticaNeue-Bold',
        alignSelf: 'center',
        textAlign: 'center',
        marginHorizontal: 50, 
        marginBottom: 20,
        marginTop: 30,
    },
    text : {
        fontSize : 16,
        fontFamily : 'HelveticaNeue',
        alignSelf: 'center',
        textAlign: 'center',
        marginHorizontal: 30, 
        marginTop: 20,
    },
    textContainer : {
        marginTop : 20,
        marginBottom : 20,
        alignContent : 'center',
    },

    icon: {
        width: 50,
        height: 50,
        marginTop: 75,
    },
});

export default stylesAccountCreated;