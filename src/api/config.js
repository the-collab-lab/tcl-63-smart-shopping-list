import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcxr9IOiphkOFjwCrE3AqvP9y6DS0BTtk",
  authDomain: "tcl-63-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-63-smart-shopping-list",
  storageBucket: "tcl-63-smart-shopping-list.appspot.com",
  messagingSenderId: "682718974234",
  appId: "1:682718974234:web:9bced1f4036dec70615ca3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
