import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbatkkE72iMq5oGnYhByX_OKjTTQ0SkJE",
  authDomain: "music-9eafc.firebaseapp.com",
  projectId: "music-9eafc",
  storageBucket: "music-9eafc.appspot.com",
  messagingSenderId: "368634921215",
  appId: "1:368634921215:web:4176cdb27b5b7137f94cca"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);
const refDoc = ref()

export { auth, db, storage, refDoc}