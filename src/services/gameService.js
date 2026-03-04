import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
  increment
} from "firebase/firestore";
import { db } from "./firebase";

export const LEVEL_THRESHOLDS = [0, 200, 500, 1000, 2000, 3500, 5500, 8000, 11000, 15000];

export const getLevel = (xp) => {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  return Math.min(level, 10);
};

export const getXPForNextLevel = (level) => {
  return LEVEL_THRESHOLDS[Math.min(level, LEVEL_THRESHOLDS.length - 1)] || 15000 + (level - 9) * 5000;
};

export const getXPProgress = (xp, level) => {
  const current = LEVEL_THRESHOLDS[level - 1] || 0;
  const next = getXPForNextLevel(level);
  return Math.min(((xp - current) / (next - current)) * 100, 100);
};

const DIFFICULTY_WEIGHT = { easy: 1, medium: 1.5, hard: 2.5 };
const BASE_POINTS = { easy: 100, medium: 150, hard: 250 };

export const calculateScore = (isCorrect, timeRemaining, difficulty) => {
  if (!isCorrect) return 0;
  const base = BASE_POINTS[difficulty] || 100;
  const timeBonus = timeRemaining * 5;
  const weight = DIFFICULTY_WEIGHT[difficulty] || 1;
  return Math.floor((base + timeBonus) * weight);
};

export const calculateXP = (totalScore, accuracy, questions) => {
  const accuracyBonus = accuracy > 80 ? 1.3 : accuracy > 60 ? 1.1 : 1.0;
  const difficultyBonus = questions.reduce((sum, q) => {
    return sum + (DIFFICULTY_WEIGHT[q.difficulty] || 1);
  }, 0) / questions.length;
  return Math.floor((totalScore / 10) * accuracyBonus * difficultyBonus);
};

export const saveMatchResult = async (userId, matchData) => {
  const { category, score, accuracy, xpEarned, questions } = matchData;

  await addDoc(collection(db, "matches"), {
    userId,
    category,
    score,
    accuracy,
    xpEarned,
    questionsCount: questions.length,
    createdAt: serverTimestamp()
  });

  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const userData = userSnap.data();
  const newTotalXP = (userData.totalXP || 0) + xpEarned;
  const newLevel = getLevel(newTotalXP);
  const newBestScore = Math.max(userData.bestScore || 0, score);
  const totalMatches = (userData.totalMatches || 0) + 1;
  const newAccuracy = Math.round(
    ((userData.accuracyAverage || 0) * (totalMatches - 1) + accuracy) / totalMatches
  );

  await updateDoc(userRef, {
    totalXP: newTotalXP,
    level: newLevel,
    bestScore: newBestScore,
    accuracyAverage: newAccuracy,
    totalMatches
  });

  await updateDoc(doc(db, "leaderboard", userId), {
    level: newLevel,
    bestScore: newBestScore,
    totalXP: newTotalXP,
    updatedAt: serverTimestamp()
  });

  return { newTotalXP, newLevel, newBestScore };
};

export const getUserData = async (userId) => {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? snap.data() : null;
};
