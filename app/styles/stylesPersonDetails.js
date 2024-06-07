import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'



const stylesPersonDetails = StyleSheet.create({

    buttonAccept : {
        width: '60%',
        borderRadius: 30,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: blue,
        marginTop: 20,
        alignSelf: 'center',
        marginHorizontal: 7,
    },

    buttonDecline : {
        width: '35%',
        borderRadius: 30,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        marginTop: 20,
        borderWidth: 1.5,
        borderColor: blue,
        alignSelf: 'center',
        marginHorizontal: 7,

    },
});

export default stylesPersonDetails;