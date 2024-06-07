import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { collection, query, where, getDocs, addDoc, orderBy, onSnapshot, doc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getMessages, sendMessage, createConversation } from '../../functions/functionsMessages';

interface IMessage {
  id: string;
  senderUid: string;
  content: string;
  timestamp: number;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageText, setMessageText] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const route = useRoute();
  const { uid_young, uid_old, name_old } = route.params;
  const [conversationId, setConversationId] = useState<string | null>(null); // Variable d'état pour suivre l'ID de la conversation
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: name_old });
  }, [name_old]);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        let existingConversationId = await findExistingConversation(uid_young, uid_old);
        if (!existingConversationId) {
          existingConversationId = await createConversation(uid_young, uid_old);
        }
        setConversationId(existingConversationId);
      } catch (error) {
        console.error('Error initializing chat:', error);
      }
    };
  
    initializeChat();
  }, []);
  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (conversationId) {
          console.log('Fetching messages for conversation:', conversationId)
          const messages = await getMessages(conversationId);
          setMessages(messages);
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
  
    fetchMessages();
  }, [conversationId]);

  const sendMessageHandler = async () => {
    if (messageText.trim() === '') return;
  
    try {
      await sendMessage(conversationId!, uid_young, messageText);
      setMessageText('');
      // Mise à jour des messages localement
      const newMessage = {
        id: 'new_message_' + Date.now(), // Générez un ID unique pour le nouveau message
        senderUid: uid_young,
        content: messageText,
        timestamp: Date.now(), // Utilisez le timestamp actuel
      };
      setMessages(prevMessages => [...prevMessages, newMessage]); // Ajoutez le nouveau message à l'array existant
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  // Fonction pour trouver une conversation existante
  const findExistingConversation = async (uid_young: string, uid_old: string): Promise<string | null> => {
    try {
      const querySnapshot = await getDocs(query(collection(FIREBASE_DB, 'conversations'), where('participants', '==', [uid_young, uid_old])));
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
      }
      return null;
    } catch (error) {
      console.error('Error finding existing conversation:', error);
      return null;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <FlatList
      data={messages}
      keyExtractor={(item, index) => index.toString()} // Utiliser l'index comme clé si vous n'avez pas d'ID unique
      renderItem={({ item }) => (
        <View style={{ alignItems: item.senderUid === uid_young ? 'flex-end' : 'flex-start' }}>
          <Text style={{ backgroundColor: item.senderUid === uid_young ? 'blue' : 'gray', padding: 8, margin: 4, borderRadius: 8, color: 'white' }}>
            {item.content}
          </Text>
        </View>
      )}      
      ListFooterComponent={<View style={{ height: 16 }} />}
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
    />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0} // Ajustez cet offset selon vos besoins
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingBottom: 8 }}>
          <TextInput
            style={{ flex: 1, borderWidth: 1, borderColor: 'gray', borderRadius: 8, padding: 8 }}
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
            placeholder="Type your message here..."
          />
          <TouchableOpacity onPress={sendMessageHandler} style={{ marginLeft: 8, padding: 8, backgroundColor: 'blue', borderRadius: 8 }}>
            <Text style={{ color: 'white' }}>Send message</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatPage;
