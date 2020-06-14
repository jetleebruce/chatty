import React from "react";
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBq5tEW7yNLTm6x6gFcQZYY88jOkXbsJYc",
  authDomain: "chatty-d2006.firebaseapp.com",
  databaseURL: "https://chatty-d2006.firebaseio.com",
  projectId: "chatty-d2006",
  storageBucket: "chatty-d2006.appspot.com",
  messagingSenderId: "586383282146",
  appId: "1:586383282146:web:93c979f75f8a88c5fbb3bb",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
