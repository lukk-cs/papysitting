import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';



export const getFirstName = async (uid) => {
    const usersCollection = collection(FIREBASE_DB, 'youngs');
    const q = query(usersCollection, where('uid', '==', uid));
    console.log('uid : ', uid)
    try {
        const querySnapshot = await getDocs(q);
      
        if (querySnapshot.empty) {
            console.error('Aucun document utilisateur trouvé dans la collection "youngs" pour cet UID.');
            return null;
        }
      
        // Vous pourriez avoir plusieurs documents correspondants à l'UID (ce qui serait inhabituel, car l'UID devrait être unique)
        // Ici, nous prenons le premier document trouvé.
        const userData = querySnapshot.docs[0].data();
      
        // Vous pouvez accéder aux propriétés spécifiques, par exemple, le nom de l'utilisateur
        const firstName = userData.firstName;
      
        return firstName;

    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur dans la collection "users":', error);
        return null;
    }
};

export const getFirstNameOld = async (uid) => {
    const usersCollection = collection(FIREBASE_DB, 'olds');
    const q = query(usersCollection, where('uid', '==', uid));
    console.log('uid : ', uid)
    try {
        const querySnapshot = await getDocs(q);
      
        if (querySnapshot.empty) {
            console.error('Aucun document utilisateur trouvé dans la collection "olds" pour cet UID.');
            return null;
        }
      
        // Vous pourriez avoir plusieurs documents correspondants à l'UID (ce qui serait inhabituel, car l'UID devrait être unique)
        // Ici, nous prenons le premier document trouvé.
        const userData = querySnapshot.docs[0].data();
      
        // Vous pouvez accéder aux propriétés spécifiques, par exemple, le nom de l'utilisateur
        const firstName = userData.firstName;
        return firstName;

    } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur dans la collection "users":', error);
        return null;
    }
};

export const handleLogout = async (navigation) => {
    const auth = FIREBASE_AUTH
    try {
        await auth.signOut();
        //une fois déconnecté, renvoyer l'user vers la page login
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
};

export const checkAccountExistence = async (uid) => {
    const db = FIREBASE_DB;
    try {
        // Créer une requête pour récupérer les documents de la collection 'users' où uid correspond à la valeur donnée
        console.log('Checking account existence for UID:', uid);
        const q = query(collection(db, 'youngs'), where('uid', '==', uid));
        
        // Exécuter la requête
        const querySnapshot = await getDocs(q);

        // Vérifier si des documents ont été trouvés
        if (!querySnapshot.empty) {
            console.log('UID found:', uid);
            return true; // L'UID existe
        } else {
            console.log('UID not found:', uid);
            return false; // L'UID n'existe pas
        }
    } catch (error) {
        console.error('Error checking account existence:', error);
        return false;
    }
};

export const signInOld = async (navigation, email, password, setLoading) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;

    setLoading(true);
    try {
        console.log('Before signInWithEmailAndPassword');
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response.user.uid);
        console.log('Full response object:', response.user);

        // Vérifiez si le compte existe
        console.log(response.user.uid)
        const accountExists = await checkAccountExistence(response.user.uid);
        console.log('accountExists:', accountExists);

        if (accountExists) {
            // Récupérez tous les documents de la collection 'users'
            const usersCollection = collection(db, 'users');
            const querySnapshot = await getDocs(usersCollection);

            // Itérez sur les documents pour trouver le document correspondant à l'UID
            let userDocSnapshot;
            for (const docSnapshot of querySnapshot.docs) {
                const userData = docSnapshot.data();
                if (userData.uid === response.user.uid) {
                    userDocSnapshot = docSnapshot;
                    break;
                }
            }

            if (userDocSnapshot && userDocSnapshot.exists()) {
                const userType = userDocSnapshot.data().type;

                if (userType === 'old') {
                    navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{ name: 'DashboardOld' }], // Assurez-vous que 'Dashboard' est le nom de votre écran de tableau de bord
                        })
                      );
                } else {
                    // Déconnectez l'utilisateur et affichez un message d'erreur
                    await auth.signOut();
                    alert("You are not old, you cannot log in here!");
                }
            } else {
                alert('User document not found');
            }
        } else {
            alert('Account does not exist');
        }
    } catch (error) {
        alert("Sign in failed: " + error.message);
    } finally {
        setLoading(false);
    }
};

export const signIn = async (navigation, email, password, setLoading) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;

    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);

        // Vérifiez si le compte existe
        const accountExists = await checkAccountExistence(response.user.uid);
        console.log('accountExists:', accountExists);

        if (accountExists) {
            // Effectuez une requête pour trouver le document correspondant à l'UID de l'utilisateur
            const usersCollection = collection(db, 'youngs');
            const userQuery = query(usersCollection, where('uid', '==', response.user.uid));
            const userQuerySnapshot = await getDocs(userQuery);

            if (!userQuerySnapshot.empty) {
                const userData = userQuerySnapshot.docs[0].data();
                const userType = userData.type;
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard'}],
                    })
                );

            } else {
                alert('User document not found');
            }
        } else {
            alert('Account does not exist');
        }
    } catch (error) {
        alert("Sign in failed: " + error.message);
    } finally {
        setLoading(false);
    }
};

export const signUp = async (firstName, lastName, phone, email, address, lat, long, password, setLoading, navigation) => {
    const db = FIREBASE_DB
    const auth = FIREBASE_AUTH
    setLoading(true);
    try {
    // Créer le compte utilisateur avec e-mail et mot de passe
    const response = await createUserWithEmailAndPassword(auth, email, password);

    // Créer un document dans la collection "users" avec des données supplémentaires
    const userDocRef = await addDoc(collection(db, 'youngs'), {
        uid: response.user.uid,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        lat: lat,
        long: long,
    });

    Alert.alert('Account created successfully!');
    navigation.navigate('Login');
    } catch (error) {
    console.error(error);
    Alert.alert('Sign up failed', error.message);
    } finally {
    setLoading(false);
    }
};