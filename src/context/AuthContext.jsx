import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import {auth, db} from '../services/firebase'
import {doc, setDoc} from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);

    setDoc(doc(db, 'users', email), {
      favShows: []
    })
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
export function UserAuth(){
    return useContext(AuthContext)
}
