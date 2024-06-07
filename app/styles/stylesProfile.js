import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'



const stylesProfile = StyleSheet.create({


    itemContainer1 : {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: gray,
        paddingBottom: 20,
    },

    itemContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: gray,
    },

    itemText: {
        color: black,
        fontSize: 16,
        fontFamily: 'HelveticaNeue',
        textAlign: 'left',
    },
    button : {
        flexDirection: 'row',
        //aligner la colonne de droite à droite :
        width: '80%',
        height: 60,
        alignItems: "left",
        justifyContent: "center",
        marginHorizontal: 10,
        padding: 10,
        color: 'black',
      },

    button2: {
        flexDirection: 'row',
        //aligner la colonne de droite à droite :
        width: '80%',
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        padding: 10,
        color: 'black',
      },

      buttonText: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'HelveticaNeue-Bold',
        width: '90%'
    },

    buttonText2: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'HelveticaNeue-Bold',
        width: '100%',
        marginLeft: 30,
    },

    buttonSubText: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'HelveticaNeue',
        width: '90%'
    },
});

export default stylesProfile;