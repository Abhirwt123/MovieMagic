import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBqTWxUIbyiZYlwCP_J85PAk3dCT7wKndg",
  authDomain: "moviemagic-96d91.firebaseapp.com",
  projectId: "moviemagic-96d91",
  storageBucket: "moviemagic-96d91.appspot.com",
  messagingSenderId: "261382365555",
  appId: "1:261382365555:web:06a311a38d1230d151a506",
  measurementId: "G-Y5QX74X2E6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider =new GoogleAuthProvider(app)

