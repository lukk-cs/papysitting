import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'

const titleSize = 35;


const stylesLogin = StyleSheet.create({

    Subtitle: {
        color: textcolor,
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'HelveticaNeue',
      },
    
    InputTitle : {
        color: textcolor,
        fontSize: 16,
        fontFamily: 'HelveticaNeue',
        fontWeight: 'bold',
        marginBottom: 10,
      },


      InputText: {
        color: textcolor,
        fontSize: 18,
        fontFamily: 'HelveticaNeue-Bold',
        fontWeight: 'bold',
      },


    buttonContainer: {
        marginTop: 50,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },

    textButton: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },

    inputContainer: {
        alignSelf: 'center',
        marginTop: 30,
        width: '85%',
    },

    forgotPassword: {
        color: textcolor,
        marginTop: 10,
        marginRight: 5,
        fontSize: 18,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    textRegister: {
        color: textcolor,
        marginTop: 50,
        marginLeft: 5,
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
    },

    textNoAccount: {
        fontSize: 16,
        color: '#858585',
        fontWeight: 600,
        marginTop: 50
    },
});

export default stylesLogin;