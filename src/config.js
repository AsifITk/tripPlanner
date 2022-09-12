// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration]]

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

const firebaseConfig = {
  apiKey: "AIzaSyBGamsU625V57PmSzWpFUc41HJmOStkNcE",
  authDomain: "trips-b7c8a.firebaseapp.com",
  projectId: "trips-b7c8a",
  storageBucket: "trips-b7c8a.appspot.com",
  messagingSenderId: "554408430988",
  appId: "1:554408430988:web:89f464e3c345c1231cdaa9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { auth, db };
