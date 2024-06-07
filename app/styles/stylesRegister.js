import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'



const stylesRegister = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignSelf: 'center',
        marginTop: 10,
      },
    activeButtonFemale : {
        backgroundColor: blue,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        padding: 10,
        borderRadius: 8,
        width: '49%',
      },

    activeButtonMale : {
        backgroundColor: blue,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        padding: 10,
        borderRadius: 8,
        width: '49%',
      },

    buttonFemale: {
        backgroundColor: 'white',
        padding: 10,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        width: '49%',
        borderWidth: 2,
        borderColor: blue,
      },

      buttonMale: {
        backgroundColor: 'white',
        padding: 10,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        width: '49%',
        borderWidth: 2,
        borderColor: blue,
      },
    GPAC: {
      alignSelf: 'flex-start',
      flex: 1,
      backgroundColor: 'white',
      width: '100%',
      alignItems: 'center',
      flex: 1,
      marginTop: 20,
      marginBottom: 10,
      },


    picker: {
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: blue,
        width: '100%',
        padding: 10,
        marginBottom: 20,
      },
});

export default stylesRegister;