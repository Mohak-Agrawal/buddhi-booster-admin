// /utils/firebaseConfig.js

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAfvsdL_J-6NZd8WdbVL6H0kNUd0rn_Wiw',
  authDomain: 'buddhi-booster.firebaseapp.com',
  projectId: 'buddhi-booster',
  storageBucket: 'buddhi-booster.appspot.com',
  messagingSenderId: '543050989903',
  appId: '1:543050989903:web:545b80c54959c8dc23853a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Firestore
const firestore = getFirestore(app);

export { firestore };
