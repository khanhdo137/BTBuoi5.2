import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjt2QKMLGqDJVHUnzqpajBy3QrzZMirA4",
  authDomain: "xacthucnguoidung-1cb6e.firebaseapp.com",
  projectId: "xacthucnguoidung-1cb6e",
  storageBucket: "xacthucnguoidung-1cb6e.appspot.com",
  messagingSenderId: "998209088559",
  appId: "1:998209088559:web:f2f8657d902aa9ed59eada",
  measurementId: "G-JFVY2HMFPH"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const firestore = getFirestore(app);

export { auth, firestore };
