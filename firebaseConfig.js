import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBkKbelWZGIcM07mVljw0jKUXU1QyJZId0",
    authDomain: "walangeri-5dd96.firebaseapp.com",
    projectId: "walangeri-5dd96",
    storageBucket: "walangeri-5dd96.appspot.com",
    messagingSenderId: "415760462969",
    appId: "1:415760462969:web:4dcbc4c3a842c97a3ad0a8",
    measurementId: "G-HSJVFWB389",
    databaseURL: "https://walangeri-5dd96-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig)

export default app