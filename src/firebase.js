// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3Qofw8_ZRG7LCMggOrisx8QdNJ--CuI8",
    authDomain: "reels-21413.firebaseapp.com",
    projectId: "reels-21413",
    storageBucket: "reels-21413.appspot.com",
    messagingSenderId: "766598408085",
    appId: "1:766598408085:web:fb928f136327386a8d789c"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth=firebase.auth();

const firestore =firebase.firestore();
export const database ={
  users:firestore.collection('users'),
  posts:firestore.collection('posts'),
  comments:firestore.collection('comments'),
  getTimeStamp : firebase.firestore.FieldValue.serverTimestamp    // to sort posts on basis of newest to oldest
}

export const storage = firebase.storage();