import firebase from 'firebase';

require('dotenv').config()

const apiKey = process.env.REACT_APP_API_KEY;

var firebaseConfig = {
    apiKey: apiKey,
    authDomain: "launch-tj-spa.firebaseapp.com",
    databaseURL: "https://launch-tj-spa.firebaseio.com",
    projectId: "launch-tj-spa",
    storageBucket: "launch-tj-spa.appspot.com",
    messagingSenderId: "908758524483",
    appId: "1:908758524483:web:6d6ea8ce1bdcbebbc02af6",
    measurementId: "G-5HY2GQ24H8"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

//adds google authentication
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;