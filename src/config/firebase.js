
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSBq_uyjAKDMItL2Zi81I13qKunZNcBzc",
  authDomain: "quiz-monitoring-system.firebaseapp.com",
  projectId: "quiz-monitoring-system",
  storageBucket: "quiz-monitoring-system.appspot.com",
  messagingSenderId: "918554119597",
  appId: "1:918554119597:web:488e91a02a7473b0b72524",
  measurementId: "G-8G047KS5LT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);