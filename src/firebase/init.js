
import firebase from 'firebase'
import firestore from 'firebase/firestore'
var firebaseConfig = {
    // keys here
  };
  // Initialize Firebase
  const firebaseApp =firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore();