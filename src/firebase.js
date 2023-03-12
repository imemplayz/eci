// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuXupW2trAB06td5RA9U3_OaptTpGwaE0",
  authDomain: "ec-iset.firebaseapp.com",
  databaseURL: "https://ec-iset-default-rtdb.firebaseio.com",
  projectId: "ec-iset",
  storageBucket: "ec-iset.appspot.com",
  messagingSenderId: "204549490622",
  appId: "1:204549490622:web:ba8b2599e600de0c299bef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
