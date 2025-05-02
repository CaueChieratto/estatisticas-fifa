import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmPmmdpYMu4f16G5umml9sp1OdFX2vBTg",
  authDomain: "dadosfifa-eee64.firebaseapp.com",
  projectId: "dadosfifa-eee64",
  storageBucket: "dadosfifa-eee64.firebasestorage.app",
  messagingSenderId: "189492745207",
  appId: "1:189492745207:web:9a0821b249099cf8aad4f2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
