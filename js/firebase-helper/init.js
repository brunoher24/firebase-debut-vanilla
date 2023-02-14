// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBov-tVVaP4It4pH6Dgbsp7LVTB3SCh4ZE",
    authDomain: "test-em-59675.firebaseapp.com",
    projectId: "test-em-59675",
    storageBucket: "test-em-59675.appspot.com",
    messagingSenderId: "626260201720",
    appId: "1:626260201720:web:6e1ed697a38af15609ab0d",
    measurementId: "G-F2TN9C1J3P",
    databaseURL: "https://test-em-59675-default-rtdb.firebaseio.com"
};
// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(fbApp);

export default fbApp;