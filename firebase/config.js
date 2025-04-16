import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZO4y6bOafD3ts8QgQ0llaEizi8-olH6o",
  authDomain: "ucundinamarca-98584.firebaseapp.com",
  projectId: "ucundinamarca-98584",
  storageBucket: "ucundinamarca-98584.appspot.com",
  messagingSenderId: "1049941302773",
  appId: "1:1049941302773:android:fc6d490c2c481d08b194bc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
