import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'



const stylesDocuments = StyleSheet.create({

    title: {
        color: black,
        fontSize: 16,
        fontFamily: 'HelveticaNeue-Bold',
        textAlign: 'left',
        marginBottom: 10,
    },
    container: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    itemContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: gray,
        paddingBottom: 10,
    },
    itemText: {
        color: black,
        fontSize: 16,
        fontFamily: 'HelveticaNeue',
        textAlign: 'left',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'HelveticaNeue-Bold',
        width: '90%',
        alignSelf: 'center',
    },
    button : {
        flexDirection: 'row',
        //aligner la colonne de droite à droite :
        width: '90%',
        height: 60,
        alignItems: "left",
        justifyContent: "center",
        marginHorizontal: 10,
        padding: 10,
        color: 'black',
        
      },

    blueButton : {
        width: '85%',
        borderRadius: 12,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginVertical: 50,
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
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: blue,
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,  
      },

    textWhiteButton: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        color: blue,
    },


    textBlueButton: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },

    subtitle: {
        color: gray,
        fontSize: 14,
        fontFamily: 'HelveticaNeue',
        textAlign: 'left',
        marginBottom: 10,
    },

    photoPreview: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
});

export default stylesDocuments;