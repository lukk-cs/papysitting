import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'



const stylesDashboard4 = StyleSheet.create({
    container: {
        padding: 20,
      },
      row: {
        flexDirection: 'column',
        marginBottom: 10,
      },
      dayText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
      },
      momentsContainer: {
        flexDirection: 'row',
        marginTop: 5,
      },
      button: {
        marginLeft: 10,
        height: 60,
        width: 70,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        textAlign: 'center',
        alignContent: 'center',
        alignSelf: 'center',
            // ombre
            shadowColor: 'black',
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.2,  
      },
      selected: {
        backgroundColor: '#0D3B66',
      },
      text: {
        color: 'black',
        fontFamily: 'HelveticaNeue-Bold',
        textAlign: 'center',
        paddingVertical: 10,
      },
      textSelected: {
        color: 'white',
      },
      daySeparator: {
        borderBottomWidth: 1.5,
        borderBottomColor: 'lightgray',
        marginTop: 15, 
      },
      
      sliderContainer: {
        marginHorizontal: 20,
        marginTop: 20,
      },
      sliderValue: {
        fontSize: 18,
        //centrer le texte au milieu du container
        textAlign: 'center',
      },

      momentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      slider: {
        flex: 1,
        marginLeft: 10,
        marginRight: 20,
        marginVertical: 10,
      },
      scrollContainer: {
        flexGrow: 1,
      },
      thumbStyle: {
        width: 30,
        height: 30,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
      },
      thumbText: {
        color: 'white',
        fontSize: 16,
      },
      sliderValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: 'gray',

        borderWidth: 2,
        
      },
});

export default stylesDashboard4;