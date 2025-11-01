// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuwa_pL7gpT88PKMhE1JbxzoqLKStIakE",
  authDomain: "skillset-ai.firebaseapp.com",
  projectId: "skillset-ai",
  storageBucket: "skillset-ai.firebasestorage.app",
  messagingSenderId: "579581501759",
  appId: "1:579581501759:web:298307dfeafa9b97f4338a",
  measurementId: "G-TZB4SJZC5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
