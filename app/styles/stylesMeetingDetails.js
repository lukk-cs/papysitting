import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'



const stylesMeetingDetails = StyleSheet.create({

      title: {
        fontSize: 20,
        fontFamily: 'HelveticaNeue-Bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'left',
      },
      
      container : {
        marginHorizontal: 10,
      },

      containerSchedule:  {
        marginVertical: 20,
        alignItems: 'center',
      },

      textBold: {
        fontSize: 15,
        fontFamily: 'HelveticaNeue-Bold',
        color: textcolor,
        textAlign: 'left',
      }, 
});

export default stylesMeetingDetails;