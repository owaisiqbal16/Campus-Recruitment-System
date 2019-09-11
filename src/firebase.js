import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyC13SeRscCeONRIw6pKmhK6i4Zr-rR3iSQ",
    authDomain: "campus-f5692.firebaseapp.com",
    databaseURL: "https://campus-f5692.firebaseio.com",
    projectId: "campus-f5692",
    storageBucket: "campus-f5692.appspot.com",
    messagingSenderId: "794900523236"
};

const initializeFirebase = () => firebase.initializeApp(config);

export default initializeFirebase;