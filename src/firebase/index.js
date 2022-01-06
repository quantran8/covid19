import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyBRmhqiyqwI2hzEOwtKPavX9VdpBUsMzRU',
  authDomain: 'auth-dev-cc204.firebaseapp.com',
  projectId: 'auth-dev-cc204',
  storageBucket: 'auth-dev-cc204.appspot.com',
  messagingSenderId: '383297924807',
  appId: '1:383297924807:web:1301a84837be8e05c218e2',
};
// Initialize Firebase
const fireBase = firebase.initializeApp(firebaseConfig);
export const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};
export const FirestoreDB = fireBase.firestore();
export default fireBase;
