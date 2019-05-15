
import firebase from 'firebase'
import firestore from 'firebase/firestore'
var firebaseConfig = {
    apiKey: "AIzaSyCTzf14krbLc4cegtDIFjH__Hso1oVq_Ck",
    authDomain: "codinghub-92abe.firebaseapp.com",
    databaseURL: "https://codinghub-92abe.firebaseio.com",
    projectId: "codinghub-92abe",
    storageBucket: "codinghub-92abe.appspot.com",
    messagingSenderId: "1066921093400",
    appId: "1:1066921093400:web:c5f5ac06caa2f6e5"
  };
  // Initialize Firebase
  const firebaseApp =firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore();