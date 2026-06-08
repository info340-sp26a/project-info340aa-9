import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  databaseURL:
    "https://spr-26-info-340-project-aa-9-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyCAmLYoqUuG0SjqhiCf_dkDCWrTJ2BfjUY",
  authDomain: "spr-26-info-340-project-aa-9.firebaseapp.com",
  projectId: "spr-26-info-340-project-aa-9",
  storageBucket: "spr-26-info-340-project-aa-9.firebasestorage.app",
  messagingSenderId: "620978490044",
  appId: "1:620978490044:web:8288b5354a6fef40ea5eb9",
  measurementId: "G-PT3ZFNJ70S"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };