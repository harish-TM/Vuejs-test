// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYpVOLBo8PmWqp2H-aWqV8qxEEFdWlAiQ",
  authDomain: "vue-recipes-7e49d.firebaseapp.com",
  projectId: "vue-recipes-7e49d",
  storageBucket: "vue-recipes-7e49d.appspot.com",
  messagingSenderId: "883800530927",
  appId: "1:883800530927:web:15b78c74af2cd227c2e01a",
  measurementId: "G-K8NFPHV21R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const recipesColRef = collection(db,'recipes');
export default recipesColRef;