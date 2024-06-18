import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from "firebase/firestore"
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfN7ch2JGSx5j1Okdki1FpoQLog8EFFAc",
  authDomain: "papysittingid.firebaseapp.com",
  projectId: "papysittingid",
  storageBucket: "papysittingid.appspot.com",
  messagingSenderId: "598976090296",
  appId: "1:598976090296:web:55f9fa8cd6fa3fccdc644d",
  measurementId: "G-61DQXHMC93"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
// export const FIREBASE_REALTIME_DB = getDatabase(FIREBASE_APP);