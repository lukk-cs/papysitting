import { StyleSheet } from 'react-native';

const neu1 = '#ecf0f3';
const neu2 = '#d1d9e6';
const white = '#f9f9f9';
const gray = '#a0a5a8';
const black = '#181818';
const purple = '#4B70E2';
const transition = '1.25s';
const textcolor =black // '#282D5C';
const orange = '#F89603';
const inputcolor = 'rgba(255, 244, 235, 0.30)';
const bgcolor = '#FFF'
const pink = '#FFEAF5'
const blue = '#0D3B66'



const styles = StyleSheet.create({
  Input : {
    fontFamily: 'HelveticaNeue',
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

  button : {
    width: '85%',
    borderRadius: 12,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
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

  Title: {
    color: black,
    fontSize: 35,
    fontFamily: 'HelveticaNeue-Bold',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  titleContainer : {  
    marginTop: 20,
    marginLeft: 20,
  },

  textBlueButton: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
    color: white,
  },

  textWhiteButton: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 5,
    color: blue,
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

  Subtitle: {
    color: textcolor,
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
  },
  Subtitle2: {
    color: textcolor,
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'HelveticaNeue',
    marginLeft: 20
  },
//
    LoginTitle: {
        color: textcolor,
        fontSize: 26,
        fontFamily: 'HelveticaNeue-Bold',
        fontWeight: 'bold',
        marginBottom: 30,
      },
    LoginSubtitle: {
        color: textcolor,
        fontSize: 26,
        fontWeight: 'bold',
        fontFamily: 'HelveticaNeue-Bold',
      },
    RegisterTitle: {
        color: textcolor,
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 20,
    },

    bienvenueContainer: {
        marginTop: 20,
        marginLeft: 0,
        flexDirection: 'row'
      },
    bienvenueContainer1: {
        marginLeft: 20,
        flexDirection: 'column'
      },

    DO3container1 : {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },

    DO3container2 : {
        width: '90%',
        alignItems: 'left',
        marginHorizontal: 20,
    },


    connexionInputContainer: {
        alignSelf: 'center',
        marginTop: 30,
        width: '85%',
      },
    registerInputContainer: {
        marginTop: 10,
        marginHorizontal: 15,
        flex: 1,
        backgroundColor: bgcolor,
        justifyContent: 'space-between',



    },
    durationContainer: {
      padding: 10,
      width: '90%',
      flexDirection: 'column',
    },
  
    durationRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 10,

    },
    dayText: {
      fontSize: 16,
      marginRight: 10,
    },
    timeText: {
      fontSize: 16,
      marginRight: 10,
    },
    pickerSelectStyles: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // pour s'assurer que le texte reste à l'intérieur de la vue
      },

      buttonText: {
        color: '#fff',
        fontSize: 18,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
      },
      genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      genderButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      genderButtonText: {
        color: '#fff',
        fontSize: 16,
      },
    durationColumn: {
      marginRight: 10,
      padding: 10,
      borderWidth: 1,
      alignItems: 'right',
    },
    safeAreaView: {
      backgroundColor: bgcolor,
    },
    
    availabilityGrid: {
      flexDirection: 'column',
      marginTop: 20,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 20,
      marginHorizontal: 10,
      marginVertical: 10,
      backgroundColor: pink,
      alignItems: 'center'

    },

  modalContent: {
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 8,
      width: '70%', // Adjust the width as needed
      backgroundColor: pink,  
    },
  
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  gridRow: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    padding: 10,
    alignItems: 'center',
  },
  gridHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  gridCell: {
    flex: 1,
    textAlign: 'center',
  },

    scrollView: {
        backgroundColor: bgcolor,
    },

    emptySlotText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
    },

    dayContainer: {
        marginVertical: 10,
        alignItems: 'center',
      },

      availabilityContainer: {
        marginTop: 10,
        backgroundColor: neu2,
        padding: 10,
        borderRadius: 10,
        width: '90%',
      },

      pinkContainer4: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: pink,
        borderRadius: 30,
        marginHorizontal: 10,
        marginVertical: 20,
        paddingVertical: 15,
        paddingHorizontal: 7,
      },

      gridContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: pink,
        borderRadius: 30,
        marginHorizontal: 10,
        marginVertical: 20,
        paddingVertical: 15,
        paddingHorizontal: 7,
      },


      gridContainer5: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: orange,
        borderRadius: 30,
        marginHorizontal: 10,
        marginVertical: 20,
        paddingVertical: 15,
        paddingHorizontal: 7,
      },

      headerRow: {
        flexDirection: 'row',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,

      },
      cell: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        height: 32,
        width: 32,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 12,
      },
      gridTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: textcolor,
      },
      selectedCell: {
        backgroundColor: orange,
      },

      selectedCell5: {
        backgroundColor: textcolor,
      },
      unselectedCell: {
        backgroundColor: 'white',
      },

    editButton : {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },

    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    dayLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: black,
      },
    container: {
        backgroundColor: bgcolor,
        //alignItems: 'left',
        flex: 1,
    },

    containerLocalisation: {
      backgroundColor: bgcolor,
      flex: 1,
  },

    disponibilitesContainer: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
      },
    disponibilitesDay: {
        fontWeight: 'bold',
        marginBottom: 5,
      },
    disponibilitesTime: {
        marginLeft: 10,
      },

    scrollContainer: {
        backgroundColor: bgcolor,
    },
    image: {
        marginBottom: 40,
    },
    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },
    TextInput: {
        width: '80%',
        fontSize: 12,
        marginBottom: 1,
        borderWidth: .5,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 5
    },

    textInput: {
      height: 50, // Set initial height based on the number of lines
      borderColor: 'gray',
      borderWidth: 1,
      width: '100%',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingTop: 10,
      textAlignVertical: 'top', // Start the text from the top
    },
    
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginButton: {
        width: '70%',
        borderRadius: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: orange,
        // ombre
        shadowColor: black,
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.2,        
    },

    Button51: {
      width: '45%',
      borderRadius: 30,
      height: 70,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      marginVertical: 10,
      backgroundColor: orange,
      // ombre
      shadowColor: black,
      shadowOffset: {
          width: 2,
          height: 5,
      },
      shadowOpacity: 0.2,        
  },

  Button52: {
    width: '45%',
    borderRadius: 30,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: orange,
    // ombre
    shadowColor: black,
    shadowOffset: {
        width: 2,
        height: 5,
    },
    shadowOpacity: 0.2,        
},

    buttonContainer5: {
      flexDirection: 'row',
      justifyContent: 'center',
    },

    nextStepButton: {
      width: '70%',
      borderRadius: 30,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      backgroundColor: orange,
      marginVertical: 10,
      // ombre
      shadowColor: black,
      shadowOffset: {
          width: 2,
          height: 5,
      },
      shadowOpacity: 0.2,        
  },

    callButton: {
      width: '97%',
      borderRadius: 30,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      marginVertical: 10,
      backgroundColor: textcolor,
      // ombre
      shadowColor: black,
      shadowOffset: {
          width: 2,
          height: 5,
      },
      shadowOpacity: 0.2,        
    },

    backButton2: {
      width: '70%',
      borderRadius: 30,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 10,
      marginTop: 10,
      backgroundColor: textcolor,
      // ombre
      shadowColor: black,
      shadowOffset: {
          width: 2,
          height: 5,
      },
      shadowOpacity: 0.2,        
    },

    flatListItem: {
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    listItem: {
        padding: 20,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listItemDescription: {
        fontSize: 16,
    },
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0', // Couleur de fond agréable
    },
    ou: {
        color: textcolor,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    pickerSelect: {
        paddingTop: 15,
        paddingHorizontal: 10,
        borderWidth: 0,
    },

    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageContainerLogin: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  },

    imageStyle: {
        width: 40, 
        height: 40,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    
    validationIcon: {
      alignSelf: 'center',
      width: 200,  
      height: 200,
    },

    validationContainer: {
      backgroundColor: bgcolor,
      alignItems: 'center',
      flex: 1,
      marginTop : 100,
      width: '100%'
    },

    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
      },
    backIcon: {
        width: 20,
        height: 20,
        marginVertical: 15,
    },

    waitIcon: {
      width: 100,
      height: 100,
      marginRight: 5,
    },

    headerContainer: {
        alignItems: 'left',
        marginLeft: 20, 
        marginTop: 30,
    },
    DashboardSubtitle: {
        fontSize: 24,
        color: textcolor,
    },

    Dashboard5Subtitle: {
        fontSize: 20,
        color: orange,
        marginVertical: 10,
    },

    loginText: {
        width: '90%',
        textAlign: 'left',
        fontSize: 22,
        marginBottom: 5,
        color: textcolor,
        marginTop: 20,
    },
    DO4text1: {
        width: '90%',
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 5,
        color: textcolor,
        marginTop: 50,
        fontWeight: 'bold'
    },
    DO4text2: {
      width: '90%',
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 5,
      color: textcolor,
      marginTop: 18,
  },
    DO4text3: {
      width: '90%',
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 5,
      color: textcolor,
      marginTop: 25,
      fontWeight: 300,
      fontStyle: 'italic'
  },
    textNoAccount: {
        fontSize: 16,
        color: '#858585',
        fontWeight: 600,
        marginTop: 50
    },
    DispoText: {
        width: '90%',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    loginTextButton: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        color: white,
    },

    textButton5: {
      textAlign: 'center',
      fontSize: 19,
      fontWeight: 'bold',
      marginBottom: 5,
      color: white,
    },
  

    loginSubtext: {
        width: '90%',
        fontSize: 12,
        marginBottom: 10,
    },
    loginSubsubtext: {
        width: '90%',
        fontSize: 12,
        marginBottom: 1,
    },
    loginInput: {
        backgroundColor: inputcolor,
        borderWidth: 1,
        borderColor: black,
        padding: 15,
        marginBottom: 5,
        borderRadius: 30,
        marginTop: 5,
        fontSize: 18,
    },
    loginButtonContainer: {
        marginTop: 50,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },

    nextStepButtonContainer: {
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },

    textItalic : {
        marginHorizontal: 20,
        fontStyle: 'italic',
        color: textcolor,
        textAlign: 'center',
    },

    dashboardButtonContainer: {
      marginVertical: 10,
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
  },
    loginButtonText: {
        color: white,
        fontSize: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center', // pour aligner les éléments verticalement au centre
        marginTop: 0, // ou tout autre espacement nécessaire
      },
    textLink: {
        color: textcolor, // ou toute autre couleur que vous préférez
        fontSize: 16,
        fontWeight: 'bold'
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: '100%',

      },
      checkboxLabel: {
        marginLeft: 2,
        fontSize: 14,
        marginRight: 10,
        width: '37%'
      },
      forgotPassword: {
        color: textcolor,
        marginTop: 10,
        marginRight: 5,
        fontSize: 18,
        textAlign: 'right',
        fontWeight: 'bold',
      },

      tableText: {
        textAlign: 'center',
        padding: 10,
      },
      
});

export default styles;
