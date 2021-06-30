import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJPWK76soKCJASGoSJkqODmBVyNd_gXuA",
  authDomain: "team-meet-2e2a8.firebaseapp.com",
  projectId: "team-meet-2e2a8",
  storageBucket: "team-meet-2e2a8.appspot.com",
  messagingSenderId: "626525208876",
  appId: "1:626525208876:web:569fea0cb9aff959a72c89",
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
