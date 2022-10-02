import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBhSel4Aa2v7-8qRkvJtobogEPleRR2Vss",
    authDomain: "signinpage-ae412.firebaseapp.com",
    projectId: "signinpage-ae412",
    storageBucket: "signinpage-ae412.appspot.com",
    messagingSenderId: "956753519357",
    appId: "1:956753519357:web:cc01b88e21c13927a21494"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }