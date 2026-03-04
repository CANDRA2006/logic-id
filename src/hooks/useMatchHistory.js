import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot, limit } from "firebase/firestore";
import { db } from "../services/firebase";

export const useMatchHistory = (userId) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const q = query(
      collection(db, "matches"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const unsub = onSnapshot(q, (snap) => {
      setMatches(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, [userId]);

  return { matches, loading };
};
