import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoW92JYUqLqvPzFW764zq7tPxvIfv5yRc",
  authDomain: "project1-ee39c.firebaseapp.com",
  projectId: "project1-ee39c",
  storageBucket: "project1-ee39c.firebasestorage.app",
  messagingSenderId: "103921745182",
  appId: "1:103921745182:web:d136d2a22d168dcf719d0f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);