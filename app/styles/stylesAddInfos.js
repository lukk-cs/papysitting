import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'



const stylesAddInfos = StyleSheet.create({
    inputContainer: {
        alignSelf: 'center',
        width: '80%',
        height: 'auto',
        marginTop: 20,

    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 200,
        marginTop: 20,
        borderRadius: 30,
        alignSelf: 'center',
        //shadow
        shadowColor: black,
        shadowOffset: {
            height: 5,
            width: 5,
        },
        shadowOpacity: 0.2,
    },
    nameContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 50,
        alignSelf: 'center',
    },
    nameText: {
        fontSize: 20,
        fontFamily: 'HelveticaNeue-Bold'
    },
    
    rollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 50,
    },

    Input : {
        fontFamily: 'HelveticaNeue-Bold',
        backgroundColor: 'white',
        borderWidth: .5,
        borderColor: gray,
        color: textcolor,
        padding: 15,
        borderRadius: 8,
        marginTop: 5,
        marginBottom: 20,
        fontSize: 18,
    },

    addHelperContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 50,
    },
    addHelperText: {
        fontSize: 20,
        fontFamily: 'HelveticaNeue-Bold',
        width: '80%',
    },

    buttonPhoto: {
        width: '65%',
        borderRadius: 30,
        height: 60,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        padding: 2,
        borderColor : blue,
        backgroundColor: blue,
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,  
      },

});

export default stylesAddInfos;