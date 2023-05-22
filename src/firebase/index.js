// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7Itqx_HFa0GwgRXm2YrTDPZnRuK_XVR8",
  authDomain: "vue-blog-a1ba7.firebaseapp.com",
  projectId: "vue-blog-a1ba7",
  storageBucket: "vue-blog-a1ba7.appspot.com",
  messagingSenderId: "1042059839752",
  appId: "1:1042059839752:web:bfb39ffd5261650c0844bd",
  measurementId: "G-LLPCXT4LKH",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
