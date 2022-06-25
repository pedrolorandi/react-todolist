import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByf7BwNToTcaNIFYQVbXPlR1PEjWpF0t4",
  authDomain: "todolist-268ac.firebaseapp.com",
  projectId: "todolist-268ac",
  storageBucket: "todolist-268ac.appspot.com",
  messagingSenderId: "538423419227",
  appId: "1:538423419227:web:bd4173ff52c9fc34d6fa7e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
