import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './App';
import reportWebVitals from './Types/reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB57PCi-CS-Vl6lKRfKHYQvJi3yM8_gmfU",
  authDomain: "livindex-240b9.firebaseapp.com",
  projectId: "livindex-240b9",
  storageBucket: "livindex-240b9.firebasestorage.app",
  messagingSenderId: "657825835216",
  appId: "1:657825835216:web:b78a019c1d3c933f57d6d5",
  measurementId: "G-CM07HBG54G"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
