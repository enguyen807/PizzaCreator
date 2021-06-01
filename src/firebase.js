import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DBURL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MSGSENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
};

firebase.initializeApp(config);
const db = firebase.firestore();

export const firebaseAuth = firebase.auth();
export const dbMenuRef = db.collection("menu");
export const dbUserRef = db.collection("user");
