import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1xKu1nrunrSwZjISkX-7Ix6b95zYJEZE",
  authDomain: "socialmedia-userprofilepicture.firebaseapp.com",
  projectId: "socialmedia-userprofilepicture",
  storageBucket: "socialmedia-userprofilepicture.appspot.com",
  messagingSenderId: "369952039155",
  appId: "1:369952039155:web:e7edfedd99b3462f2d5786",
  measurementId: "G-E13014K2Y5",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
