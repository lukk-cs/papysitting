import { collection, query, where, getDocs, setDoc, getDoc, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_STORAGE } from '../../FirebaseConfig';
import { Alert } from 'react-native';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject, getMetadata, listAll } from 'firebase/storage';
import * as ImageManipulator from 'expo-image-manipulator'

const checkDocumentExistence = async (uid, documentBasePath) => {
  const storage = FIREBASE_STORAGE;
  const pdfRef = storageRef(storage, `${documentBasePath}.pdf`);
  const jpgRef = storageRef(storage, `${documentBasePath}.jpg`);

  try {
    await getDownloadURL(pdfRef);
    return true;
  } catch (error) {
    console.log(`PDF document ${documentBasePath}.pdf does not exist.`, error);
  }

  try {
    await getDownloadURL(jpgRef);
    return true;
  } catch (error) {
    console.log(`JPG document ${documentBasePath}.jpg does not exist.`, error);
    return false;
  }
};

const checkRIBExistence = async (uid) => {
  const db = FIREBASE_DB;
  const q = query(collection(db, 'youngs'), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0].data();
    return !!userDoc.RIB; // Return true if RIB exists
  }

  return false;
};

export const checkAllDocuments = async (uid) => {
  const idExists = await checkDocumentExistence(uid, `user_ID/${uid}/ID`);
  const inseeExists = await checkDocumentExistence(uid, `user_Insee/${uid}/Insee`);
  const crimeExists = await checkDocumentExistence(uid, `user_Crime/${uid}/Crime`);
  const RIBExists = await checkRIBExistence(uid)
  return { idExists, inseeExists, crimeExists, RIBExists };
};

export const uploadID = async (userId, documentUri) => {
  try {
      const storage = FIREBASE_STORAGE;

      // Créer une référence au document dans Firebase Storage
      const documentPath = `user_ID/${userId}/ID.pdf`;
      const documentRef = storageRef(storage, documentPath);

      // Supprimer l'ancien document (s'il existe)
      try {
          await deleteObject(documentRef);
          console.log('Ancien document supprimé avec succès.');
      } catch (error) {
          console.log("L'ancien document n'existe pas ou une erreur s'est produite lors de la suppression.");
      }
      console.log('Before upload')
      // Créer une référence pour le nouveau document
      const newDocumentRef = storageRef(storage, documentPath);
      
      // Convertir l'URI du nouveau document en données binaires
      const documentResponse = await fetch(documentUri);
      const documentBlob = await documentResponse.blob();
      console.log('Document blob:', documentBlob);

      // Télécharger le nouveau document dans Firebase Storage
      await uploadBytes(newDocumentRef, documentBlob);
      console.log('Document téléchargé avec succès dans Firebase Storage.');
  } catch (error) {
      console.error('Erreur lors du téléchargement du document :', error);
      throw error;
  }
};

export const uploadIDPhoto = async (userId, documentUri) => {
  try {
    const storage = FIREBASE_STORAGE;

    // Créer une référence au document dans Firebase Storage
    const documentPath = `user_ID/${userId}/ID.jpg`;
    const documentRef = storageRef(storage, documentPath);

    // Supprimer l'ancien document (s'il existe)
    try {
      await deleteObject(documentRef);
      console.log('Ancien document supprimé avec succès.');
    } catch (error) {
      console.log("L'ancien document n'existe pas ou une erreur s'est produite lors de la suppression.");
    }

    // Créer une référence pour le nouveau document
    const newDocumentRef = storageRef(storage, documentPath);

    // Redimensionner l'image avant de l'envoyer à Firebase Storage
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      documentUri,
      [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio 
      { compress: 0.7, format: 'jpeg' },
    );

    // Convertir l'URI de l'image redimensionnée en données binaires
    const resizedPhotoResponse = await fetch(resizedPhoto.uri);
    const resizedPhotoBlob = await resizedPhotoResponse.blob();

    // Télécharger l'image redimensionnée dans Firebase Storage
    await uploadBytes(newDocumentRef, resizedPhotoBlob);
    console.log('Document téléchargé avec succès dans Firebase Storage.');

  } catch (error) {
    console.error('Erreur lors du téléchargement du document :', error);
    throw error;
  }
};

export const uploadInsee = async (userId, documentUri) => {
  try {
      const storage = FIREBASE_STORAGE;

      // Créer une référence au document dans Firebase Storage
      const documentPath = `user_Insee/${userId}/ID.pdf`;
      const documentRef = storageRef(storage, documentPath);

      // Supprimer l'ancien document (s'il existe)
      try {
          await deleteObject(documentRef);
          console.log('Ancien document supprimé avec succès.');
      } catch (error) {
          console.log("L'ancien document n'existe pas ou une erreur s'est produite lors de la suppression.");
      }
      console.log('Before upload')
      // Créer une référence pour le nouveau document
      const newDocumentRef = storageRef(storage, documentPath);
      
      // Convertir l'URI du nouveau document en données binaires
      const documentResponse = await fetch(documentUri);
      const documentBlob = await documentResponse.blob();
      console.log('Document blob:', documentBlob);

      // Télécharger le nouveau document dans Firebase Storage
      await uploadBytes(newDocumentRef, documentBlob);
      console.log('Document téléchargé avec succès dans Firebase Storage.');
  } catch (error) {
      console.error('Erreur lors du téléchargement du document :', error);
      throw error;
  }
};

export const uploadCrimePhoto = async (userId, documentUri) => {
  try {
    const storage = FIREBASE_STORAGE;

    // Créer une référence au document dans Firebase Storage
    const documentPath = `user_Crime/${userId}/crime.jpg`;
    const documentRef = storageRef(storage, documentPath);

    // Supprimer l'ancien document (s'il existe)
    try {
      await deleteObject(documentRef);
      console.log('Ancien document supprimé avec succès.');
    } catch (error) {
      console.log("L'ancien document n'existe pas ou une erreur s'est produite lors de la suppression.");
    }

    // Créer une référence pour le nouveau document
    const newDocumentRef = storageRef(storage, documentPath);

    // Redimensionner l'image avant de l'envoyer à Firebase Storage
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      documentUri,
      [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio 
      { compress: 0.7, format: 'jpeg' },
    );

    // Convertir l'URI de l'image redimensionnée en données binaires
    const resizedPhotoResponse = await fetch(resizedPhoto.uri);
    const resizedPhotoBlob = await resizedPhotoResponse.blob();

    // Télécharger l'image redimensionnée dans Firebase Storage
    await uploadBytes(newDocumentRef, resizedPhotoBlob);
    console.log('Document téléchargé avec succès dans Firebase Storage.');

  } catch (error) {
    console.error('Erreur lors du téléchargement du document :', error);
    throw error;
  }
};

export const uploadCrime = async (userId, documentUri) => {
  try {
      const storage = FIREBASE_STORAGE;

      // Créer une référence au document dans Firebase Storage
      const documentPath = `user_Crime/${userId}/Crime.pdf`;
      const documentRef = storageRef(storage, documentPath);

      // Supprimer l'ancien document (s'il existe)
      try {
          await deleteObject(documentRef);
          console.log('Ancien document supprimé avec succès.');
      } catch (error) {
          console.log("L'ancien document n'existe pas ou une erreur s'est produite lors de la suppression.");
      }
      console.log('Before upload')
      // Créer une référence pour le nouveau document
      const newDocumentRef = storageRef(storage, documentPath);
      
      // Convertir l'URI du nouveau document en données binaires
      const documentResponse = await fetch(documentUri);
      const documentBlob = await documentResponse.blob();
      console.log('Document blob:', documentBlob);

      // Télécharger le nouveau document dans Firebase Storage
      await uploadBytes(newDocumentRef, documentBlob);
      console.log('Document téléchargé avec succès dans Firebase Storage.');
  } catch (error) {
      console.error('Erreur lors du téléchargement du document :', error);
      throw error;
  }
};

export const uploadInseePhoto = async (userId, documentUri) => {
  try {
    const storage = FIREBASE_STORAGE;

    // Créer une référence au document dans Firebase Storage
    const documentPath = `user_Insee/${userId}/ID.jpg`;
    const documentRef = storageRef(storage, documentPath);

    // Supprimer l'ancien document (s'il existe)
    try {
      await deleteObject(documentRef);
      console.log('Ancien document supprimé avec succès.');
    } catch (error) {
      console.log("L'ancien document n'existe pas ou une erreur s'est produite lors de la suppression.");
    }

    // Créer une référence pour le nouveau document
    const newDocumentRef = storageRef(storage, documentPath);

    // Redimensionner l'image avant de l'envoyer à Firebase Storage
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      documentUri,
      [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio 
      { compress: 0.7, format: 'jpeg' },
    );

    // Convertir l'URI de l'image redimensionnée en données binaires
    const resizedPhotoResponse = await fetch(resizedPhoto.uri);
    const resizedPhotoBlob = await resizedPhotoResponse.blob();

    // Télécharger l'image redimensionnée dans Firebase Storage
    await uploadBytes(newDocumentRef, resizedPhotoBlob);
    console.log('Document téléchargé avec succès dans Firebase Storage.');

  } catch (error) {
    console.error('Erreur lors du téléchargement du document :', error);
    throw error;
  }
};

export const uploadProfilePicture = async (userId, documentUri) => {
  try {
    const storage = FIREBASE_STORAGE;

    // Créer une référence au document dans Firebase Storage
    const documentPath = `user_images/${userId}/profile.jpg`;
    const documentRef = storageRef(storage, documentPath);

    // Supprimer l'ancien document (s'il existe)
    try {
      await deleteObject(documentRef);
      console.log('Ancien document supprimé avec succès.');
    } catch (error) {
      console.log("L'ancien document n'existe pas ou une erreur s'est produite lors de la suppression.");
    }

    // Créer une référence pour le nouveau document
    const newDocumentRef = storageRef(storage, documentPath);

    // Redimensionner l'image avant de l'envoyer à Firebase Storage
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      documentUri,
      [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio 
      { compress: 0.7, format: 'jpeg' },
    );

    // Convertir l'URI de l'image redimensionnée en données binaires
    const resizedPhotoResponse = await fetch(resizedPhoto.uri);
    const resizedPhotoBlob = await resizedPhotoResponse.blob();

    // Télécharger l'image redimensionnée dans Firebase Storage
    await uploadBytes(newDocumentRef, resizedPhotoBlob);
    console.log('Document téléchargé avec succès dans Firebase Storage.');

  } catch (error) {
    console.error('Erreur lors du téléchargement du document :', error);
    throw error;
  }
};

export const post = async (name, startDate, frequency, uid, chosenHours, setLoading, navigation) => {
    setLoading(true);
  
    try {
      const db = FIREBASE_DB;
      const annoncesCollection = collection(db, 'annoncesJeunes');

  
      // First, add the new demand to the database
      await addDoc(annoncesCollection, {
        user: uid,
        begin: startDate,
        freq: frequency,
        hours: chosenHours,
      });
  
      // Then, delete existing documents associated with user's uid
      const userQuery = query(annoncesCollection, where('user', '==', uid));
      const userDocs = await getDocs(userQuery);
  
      userDocs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });


      console.log('Post successful!');
    } catch (error) {
      console.error(error);
      alert("Post failed: " + error.message);
    } finally {
      setLoading(false);
      navigation.navigate('Dashboard6', { name : name, uid : uid });
    }
  };
  
  export const deleteOld = async (uid, navigation) => {
    try {
      const db = FIREBASE_DB;
      const annoncesCollection = collection(db, 'annoncesJeunes');
      const userQuery = query(annoncesCollection, where('user', '==', uid));
      const userDocs = await getDocs(userQuery);
  
      userDocs.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
  
      console.log('Delete successful!');
      navigation.navigate('Dashboard', { uid : uid });
    } catch (error) {
      console.error(error);
      alert("Delete failed: " + error.message);
    }
  };

  export const postRIB = async (uid, RIB, holder, setLoading) => {
    const db = FIREBASE_DB;
    setLoading(true);
    
    try {
        // Référence à la collection 'youngs'
        const youngsCollectionRef = collection(db, 'youngs');
        
        // Créer une requête pour obtenir le document correspondant à l'UID donné
        const q = query(youngsCollectionRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        
        // Vérifier si un document correspondant a été trouvé
        if (querySnapshot.empty) {
            console.error("No matching document found");
            return;
        }
        
        // Récupérer l'ID du premier document correspondant trouvé (devrait être unique)
        const docId = querySnapshot.docs[0].id;
        
        // Référence au document spécifique dans la collection 'youngs'
        const userDocRef = doc(db, 'youngs', docId);
        
        // Mettre à jour le document avec les nouveaux champs RIB et holder
        await updateDoc(userDocRef, {
            RIB: RIB,
            holder: holder,
        });

        console.log('RIB added successfully');
    } catch (error) {
        console.error(error);
        Alert.alert('RIB not added : ', error.message);
    } finally {
        setLoading(false);
    }
};
