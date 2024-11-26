// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRrNl0se885MYTWK5xCWz9UBXHXQlZzjU",
  authDomain: "festmoa.firebaseapp.com",
  projectId: "festmoa",
  storageBucket: "festmoa.firebasestorage.app",
  messagingSenderId: "63694017633",
  appId: "1:63694017633:web:6a5971cff640b7c2b14620",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
