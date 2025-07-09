import { auth, app } from "../firebase/firebase";

import {
  collection,
  doc,
  getDocs,
  initializeFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string,
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  let uid = result.user.uid;

  await setDoc(doc(db, "users", uid), {
    name: name,
    email: email,
    role: "user",
    createdAt: new Date(),
  });
  await doSignInWithEmailAndPassword(email, password);

  return uid;
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const uid = result.user.uid;
  const email = result.user.email;
  const name = result.user.displayName;

  // Check if a user with this email already exists
  const userDocRef = query(
    collection(db, "users"),
    where("email", "==", email),
  );
  const userSnap = await getDocs(userDocRef);

  if (!userSnap) {
    await setDoc(doc(db, "users", uid), {
      name: name,
      email: email,
      role: "user",
      createdAt: new Date(),
    });
  }

  return result.user.uid;
};

export const doSignOut = async () => {
  return await auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  if (!auth.currentUser) return null;

  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  if (!auth.currentUser) return null;

  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/`,
  });
};
