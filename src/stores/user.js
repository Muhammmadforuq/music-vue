import { ref,} from 'vue'
import { defineStore } from 'pinia'
import { auth , db } from '@/includes/firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const useLoggedIn = defineStore('userLogin', () => {
  const userLogin = ref(false);

  const register = async (value) =>{
    const userCredential =  await createUserWithEmailAndPassword(auth, value.email, value.password);
    const user = userCredential.user;


    const docRef = doc(db, 'users', userCredential.user.uid);
    await setDoc(docRef, {
      name: value.name,
      email: value.email,
      age: value.age,
      country: value.country,
    });
    await updateProfile(user, {
      displayName: value.name,
    });

    userLogin.value = true
  }

  const authenticate = async (value)=>{
    await signInWithEmailAndPassword(auth, value.email, value.password);
    userLogin.value = true;
  }

  const logOut = async () =>{
    await signOut(auth);
    userLogin.value = false;
  }
  return { userLogin, register, authenticate, logOut}
})