import { StyleSheet } from 'react-native';


const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor = 'black';
const blue = '#0D3B66'



const stylesDashboard = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 0,
        flex: 1,
      },
      scrollContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
      containerWithRequest: {
        backgroundColor: 'yellow',
      },
      
      square: {
        width: 200,
        height: 150,
        backgroundColor: blue,
        borderRadius: 10,
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      squareText: {
        textAlign: 'center',
        fontSize: 16,
      },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'flex-end',
        alignSelf: 'center',
      },
    subtitlesContainer : {

        alignContent : 'center',
        marginLeft : 20,
        marginBottom: 10,
    },
    button : {
        width: '85%',
        borderRadius: 12,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        padding: 10,
        borderWidth : 2,
        borderColor : blue,
        backgroundColor: 'white',
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,  
      },
    textWhiteButton : {
        textAlign: 'center',
        fontSize: 19,
        color: 'black',
        fontFamily: 'HelveticaNeue-Bold',
      },

    squareSuggestions: {
        width: 250,
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

      squareNext1: {
        height: 125,
        width: 300,
        backgroundColor: '#FAF0CA',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf : 'center',
        marginTop: 20,
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,  
      },

      squareNext2: {
        height: 50,
        width: 300,
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf : 'center',
        
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,  
      },

    textSeeDetails: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        width: 200,
        textAlign: 'center'
      },

    squareTextSuggestions: {
        fontSize: 16,
        fontFamily: 'HelveticaNeue',
        color: 'black',
        width: 200,
        textAlign: 'left'
    },

    squareTextSuggestionsBold: {
        fontSize: 16,
        fontFamily: 'HelveticaNeue-Bold',
        color: 'black',
        width: 200,
        textAlign: 'left'
    },

    flatListContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
    button1: {
        width: '85%',
        borderRadius: 12,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginTop: 20,
        padding: 10,
        borderWidth : 0,
        borderColor : blue,
        backgroundColor: 'white',
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,  
      },
    button2 : {
        width: '85%',
        borderRadius: 12,
        height: 250,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginTop: 20,
        padding: 10,
        borderWidth : 2,
        borderColor : blue,
        backgroundColor: 'white',
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,  
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginHorizontal: 20,
        marginVertical: 10,
      },
      subtitleButton: {
        color: textcolor,
        fontFamily: 'HelveticaNeue',
        fontSize: 16,
        marginLeft: 10,
      },

      titleButton : {
        color: textcolor,
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 20,
        marginTop: 10,
        marginBottom : 20,
      },
      buttonInactive: {
        width: '85%',
        borderRadius: 12,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        padding: 10,
        borderColor : gray,
        backgroundColor: blue,
        opacity: 0.5,
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,  
      },

      containerHomeScreen2: {
        width: '80%',
        borderRadius: 0,
        alignSelf: 'center',
        backgroundColor: 'white',
        // ombre
        shadowColor: black,
        shadowOffset: {
            height: 5,
        },
        shadowOpacity: 0.2,
      },

      iconContainer: {
        marginRight: 10,
        alignSelf: 'center',
      },
      textContainer: {
        flex: 1,
      },
      
      textFreq: {
        marginLeft: 10,
        paddingVertical: 10,
        fontSize: 18,
        fontFamily: 'HelveticaNeue-Bold',
        color: 'black',
      },
      textDates: {
        fontSize: 14,
        fontFamily: 'HelveticaNeue-Bold',
        color: 'black',
      },

      textBegin: {
        fontSize: 14,
        marginBottom: 10,
        marginTop: 5,
        fontFamily: 'HelveticaNeue',
        color: 'black',
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
      },
      containerHomeScreen1: {
        //n'arrondire que le dessus
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        alignSelf: 'center',
        marginTop: 10,
        width: '80%',
        borderRadius: 0,
        backgroundColor: '#F6B45C',
        // ombre
        shadowColor: black,
        shadowOffset: {
            height: 5,
        },
        shadowOpacity: 0.2,
      },

      buttonHomeScreen3: {
        width: '80%',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        backgroundColor: '#F6B45C',
        alignSelf: 'center',
        marginBottom: 20,
        // ombre
        shadowColor: black,
        shadowOffset: {
          height: 5,
        },
        shadowOpacity: 0.2,
      },

      textButtonHS3: {
        color: textcolor,
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 20,
        marginVertical: 10,
        textAlign: 'center',
      },

      containerMyRequest: {
        width: '80%',
        borderRadius: 12,
        alignSelf: 'center',
        backgroundColor: 'white',
        // ombre
        shadowColor: black,
        shadowOffset: {
            height: 5,
        },
        shadowOpacity: 0.2,
      },

});

export default stylesDashboard;