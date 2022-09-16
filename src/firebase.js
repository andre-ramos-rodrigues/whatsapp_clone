import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfsqM6Gc33asq_iZlVAL9VbneqZZ4DMdI",
  authDomain: "zapzap-8df7e.firebaseapp.com",
  projectId: "zapzap-8df7e",
  storageBucket: "zapzap-8df7e.appspot.com",
  messagingSenderId: "966590597259",
  appId: "1:966590597259:web:f2978a44b2b4f929f8ec8e"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()