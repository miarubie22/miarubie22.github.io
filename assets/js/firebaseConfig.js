// Import the functions you need from the SDKs you need
// // Import and configure Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsD-bjN1GeLhLIJ_1NOQjfZOFcbg9Ygks",
  authDomain: "tutormia-3df78.firebaseapp.com",
  projectId: "tutormia-3df78",
  storageBucket: "tutormia-3df78.appspot.com",
  messagingSenderId: "918075738562",
  appId: "1:918075738562:web:ab2adfebe32419bad5ee5b",
  measurementId: "G-JGPLNGSKL2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
