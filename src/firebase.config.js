
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPtaF65wvO1StLrUj98mNe6Jhiro3uwTc",
    authDomain: "house-marketplace-app-333db.firebaseapp.com",
    projectId: "house-marketplace-app-333db",
    storageBucket: "house-marketplace-app-333db.appspot.com",
    messagingSenderId: "768732539758",
    appId: "1:768732539758:web:80e5b728e69073cecf2f7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore()











