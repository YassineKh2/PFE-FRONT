import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode } from "react";
import { doc, getDoc } from "firebase/firestore";

import { auth } from "../firebase/firebase";

import { db } from "@/services/Auth";

const AuthContext = createContext({
  userLoggedIn: false,
  currentUser: {
    email: "",
    uid: "",
    role: "",
    photoURL: "",
    displayName: "",
    depositTier: "",
  },
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    uid: "",
    role: "user",
    photoURL: "",
    displayName: "",
    depositTier: "",
  });
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return unsubscribe;
  }, []);

  // FIX TS
  async function initializeUser(user: any) {
    if (user) {
      const uid = user.uid;

      const userRef = doc(db, "users", uid);
      const userdata = await getDoc(userRef);

      const data = userdata.data();

      user.role = data?.role;
      user.depositTier = data?.depositTier;

      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser({
        email: "",
        uid: "",
        role: "user",
        photoURL: "",
        displayName: "",
        depositTier: "",
      });
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
