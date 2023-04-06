// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsO1WgHnXw2MUlP8QoIlUbttAo4bF3B_8",
    authDomain: "hci-final-a1f8e.firebaseapp.com",
    databaseURL: "https://hci-final-a1f8e-default-rtdb.firebaseio.com",
    projectId: "hci-final-a1f8e",
    storageBucket: "hci-final-a1f8e.appspot.com",
    messagingSenderId: "1076400384497",
    appId: "1:1076400384497:web:d48cf33e6dc84fefd8bc50"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

export default app;