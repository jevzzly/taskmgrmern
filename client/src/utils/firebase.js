// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "task-manager-ddf4a.firebaseapp.com",
  projectId: "task-manager-ddf4a",
  storageBucket: "task-manager-ddf4a.appspot.com",
  messagingSenderId: "306147733986",
  appId: "1:306147733986:web:fa98dc8f93101f93b989bb",
  measurementId: "G-YFWKS4RXVX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);