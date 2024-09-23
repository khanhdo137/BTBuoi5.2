import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2fPGi71DrXU4CdplHRtSz0UL4UGocR7w",
  authDomain: "ex52-c6748.firebaseapp.com",
  projectId: "ex52-c6748",
  storageBucket: "ex52-c6748.appspot.com",
  messagingSenderId: "655286612568",
  appId: "1:655286612568:web:d457e147c36a29ea80102d",
  measurementId: "G-CVQHW2SZKJ"
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
