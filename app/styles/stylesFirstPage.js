import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'

const titleSize = 32;


const stylesFirstPage = StyleSheet.create({
    Title: {
        color: textcolor,
        fontSize: titleSize,
        fontFamily: 'HelveticaNeue-Bold',
        fontWeight: 'bold',
        marginBottom: 20,
      },
    Subtitle: {
        color: textcolor,
        fontSize: 18,
        fontFamily: 'HelveticaNeue-Bold',
      },
    
    InputTitle : {
        color: textcolor,
        fontSize: 16,
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        marginBottom: 10,
      },

    Input : {
        fontFamily: 'HelveticaNeue-Bold',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: gray,
        color: textcolor,
        padding: 15,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 20,
        fontSize: 18,
      },

      InputText: {
        color: textcolor,
        fontSize: 18,
        fontFamily: 'HelveticaNeue-Bold',
        fontWeight: 'bold',
      },

    titleContainer : {  
        marginTop: 20,
        marginLeft: 20,
    },

    buttonContainer: {
        marginTop: 50,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },

    blueButton : {
        width: '85%',
        borderRadius: 12,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 50,
        padding: 10,
        backgroundColor: blue,
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,  
    },

    whiteButton : {
        width: '85%',
        borderRadius: 12,
        height: 60,
        borderWidth : 2,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'white',
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,  
    },

    textBlueButton: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },

    textWhiteButton: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        color: textcolor,
    },
});

export default stylesFirstPage;