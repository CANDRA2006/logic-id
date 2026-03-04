import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export const registerUser = async (email, password, username) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: username });
  await setDoc(doc(db, "users", cred.user.uid), {
    userId: cred.user.uid,
    username,
    email,
    totalXP: 0,
    level: 1,
    bestScore: 0,
    accuracyAverage: 0,
    totalMatches: 0,
    createdAt: serverTimestamp()
  });
  await setDoc(doc(db, "leaderboard", cred.user.uid), {
    userId: cred.user.uid,
    username,
    level: 1,
    bestScore: 0,
    totalXP: 0,
    updatedAt: serverTimestamp()
  });
  return cred.user;
};

export const loginUser = async (email, password) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  const userRef = doc(db, "users", cred.user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    const username = cred.user.displayName || cred.user.email.split("@")[0];
    await setDoc(userRef, {
      userId: cred.user.uid,
      username,
      email: cred.user.email,
      totalXP: 0,
      level: 1,
      bestScore: 0,
      accuracyAverage: 0,
      totalMatches: 0,
      createdAt: serverTimestamp()
    });
    await setDoc(doc(db, "leaderboard", cred.user.uid), {
      userId: cred.user.uid,
      username,
      level: 1,
      bestScore: 0,
      totalXP: 0,
      updatedAt: serverTimestamp()
    });
  }
  return cred.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};
