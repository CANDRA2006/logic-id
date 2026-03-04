import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  increment,
  serverTimestamp,
  where,
  getDocs,
  limit
} from "firebase/firestore";
import { db } from "./firebase";

export const subscribeToFeedback = (callback) => {
  const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"), limit(50));
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(items);
  });
};

export const postFeedback = async (userId, username, message, rating) => {
  if (!message || message.length < 10 || message.length > 500) {
    throw new Error("Message must be 10-500 characters.");
  }
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be 1-5.");
  }

  // Anti-spam: check last comment within 60 seconds
  const recentQuery = query(
    collection(db, "feedback"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(1)
  );
  const recentSnap = await getDocs(recentQuery);
  if (!recentSnap.empty) {
    const lastDoc = recentSnap.docs[0].data();
    if (lastDoc.createdAt) {
      const lastTime = lastDoc.createdAt.toDate().getTime();
      const now = Date.now();
      if (now - lastTime < 60000) {
        const waitSecs = Math.ceil((60000 - (now - lastTime)) / 1000);
        throw new Error(`Please wait ${waitSecs} seconds before posting again.`);
      }
    }
  }

  await addDoc(collection(db, "feedback"), {
    userId,
    username,
    message: message.trim(),
    rating,
    likes: 0,
    createdAt: serverTimestamp()
  });
};

export const deleteFeedback = async (docId) => {
  await deleteDoc(doc(db, "feedback", docId));
};

export const likeFeedback = async (docId) => {
  await updateDoc(doc(db, "feedback", docId), {
    likes: increment(1)
  });
};
