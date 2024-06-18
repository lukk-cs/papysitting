import { firebase } from '@react-native-firebase/database';
import { getDatabase, ref, set } from "firebase/database";

export const saveDataToRealtimeDB = async (path, data) => {
  try {
    await firebase.database().ref(path).set(data);
  } catch (error) {
    console.error('Error saving data to Realtime Database:', error);
  }
};

export const getDataFromRealtimeDB = async (path) => {
  try {
    const snapshot = await firebase.database().ref(path).once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Error retrieving data from Realtime Database:', error);
    return null;
  }
};

export function writeUserData(userId, name) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
  });
}