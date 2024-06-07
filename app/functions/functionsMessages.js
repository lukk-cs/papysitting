import { collection, doc, query, where, getDocs, getDoc, addDoc, orderBy, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';


// Créer une nouvelle conversation ou récupérer l'ID de la conversation existante
export const initializeConversation = async (uid_young, uid_old) => {
    try {
        const existingConversationId = await findExistingConversation(uid_young, uid_old);
        if (existingConversationId) {
            return existingConversationId;
        } else {
            return createConversation(uid_young, uid_old);
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la conversation :', error);
        throw error;
    }
};

// Fonction pour trouver une conversation existante
const findExistingConversation = async (uid_young, uid_old) => {
    try {
        db = FIREBASE_DB;
        const conversationsRef = collection(db, 'conversations');
        const querySnapshot = await getDocs(query(conversationsRef, where('participants', '==', [uid_young, uid_old])));
        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].id;
        }
        return null;
    } catch (error) {
        console.error('Erreur lors de la recherche de la conversation existante :', error);
        throw error;
    }
};

// Créer une nouvelle conversation
export const createConversation = async (uid_young, uid_old) => {
    try {
        const db = FIREBASE_DB;
        const conversationsRef = collection(db, 'conversations');
        
        // Ajouter un nouveau document à la collection conversations
        const docRef = await addDoc(conversationsRef, {
            participants: [uid_young, uid_old],
            lastUpdated: new Date(), // Date actuelle
        });
        
        // Renvoyer l'ID du nouveau document créé
        return docRef.id;
    } catch (error) {
        console.error('Erreur lors de la création de la conversation :', error);
        throw error;
    }
};


// Envoyer un message dans une conversation
export const sendMessage = async (conversationId, senderUid, messageContent) => {
    try {
        db = FIREBASE_DB;
        const conversationsRef = collection(db, 'conversations');
        const messagesRef = collection(doc(conversationsRef, conversationId), 'messages');
        await addDoc(messagesRef, {
            senderUid: senderUid,
            content: messageContent,
            timestamp: new Date()
        });
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message :', error);
        throw error;
    }
};


// Function to get messages from a conversation
export const getMessages = async (conversationId) => {
    try {
        db = FIREBASE_DB;
        // Reference to the collection of messages within the conversation document
        const messagesRef = collection(db, "conversations", conversationId, "messages");

        // Get all documents from the messages subcollection
        const messagesQuerySnapshot = await getDocs(query(messagesRef, orderBy('timestamp')));
        // Initialize an array to store the messages
        const messages = [];

        // Loop through each document in the subcollection
        messagesQuerySnapshot.forEach((doc) => {
            // Get the data of each document and push it to the messages array
            messages.push(doc.data());
            console.log(doc.id, " => ", doc.data());
        });

        // Return the array of messages
        return messages;
    } catch (error) {
        // Handle any errors
        console.error('Error fetching messages:', error);
        throw error;
    }
};




