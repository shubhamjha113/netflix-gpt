// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFTCvQET_xTdbrjVLLp9BbxmVxcMVP604",
  authDomain: "netflixgpt-4563d.firebaseapp.com",
  projectId: "netflixgpt-4563d",
  storageBucket: "netflixgpt-4563d.firebasestorage.app",
  messagingSenderId: "364731589061",
  appId: "1:364731589061:web:b998e3d2defc638c872bac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();