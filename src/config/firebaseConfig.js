// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbjSivgao2SJvfcGKAFgRAsjgqaqw8u60",
  authDomain: "spoonacular-d240e.firebaseapp.com",
  projectId: "spoonacular-d240e",
  storageBucket: "spoonacular-d240e.appspot.com",
  messagingSenderId: "290396496353",
  appId: "1:290396496353:web:07a705f812deb693cef2a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export default firebaseConfig;