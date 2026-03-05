import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { mathLogicQuestions } from "../data/mathLogic";
import { patternQuestions } from "../data/patterns";
import { criticalThinkingQuestions } from "../data/criticalThinking";
import { calculateScore, calculateXP, saveMatchResult } from "../services/gameService";
import CircularTimer from "../components/CircularTimer";
import LangSwitcher from "../components/LangSwitcher";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const allQuestionsMap = {
  math: mathLogicQuestions,
  patterns: patternQuestions,
  critical: criticalThinkingQuestions,
};

const getLangQuestions = (category, language) => {
  const pool = allQuestionsMap[category] || mathLogicQuestions;
  return pool[language] || pool["en"];
};

export default function Game() {
  const { category } = useParams();
  const { user, refreshUserData } = useAuth();
  const { lang, t } = useLang();
  const g = t.game;
  const p = t.play;
  const navigate = useNavigate();

  const CATEGORY_LABELS = {
    math: p.categories[0].label,
    patterns: p.categories[1].label,
    critical: p.categories[2].label,
  };

  const CATEGORY_COLORS = {
    math: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    patterns: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    critical: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  };

  const DIFF_LABELS = { easy: g.easy, medium: g.medium, hard: g.hard };
  const DIFF_COLORS = {
    easy: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    medium: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    hard: "text-red-400 border-red-500/30 bg-red-500/10",
  };

  const [questions, setQuestions] = useState(() =>
    shuffle(getLangQuestions(category, lang)).slice(0, 10)
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [saving, setSaving] = useState(false);
  const [results, setResults] = useState(null);

  // Use a ref so the save effect always sees the latest values
  // without needing them in the dependency array
  const gameDataRef = useRef({ score, correct, questions });
  useEffect(() => {
    gameDataRef.current = { score, correct, questions };
  }, [score, correct, questions]);

  const hasSavedRef = useRef(false);

  const currentQ = questions[currentIdx];

  // Reload questions when language changes (only if game is still in progress)
  useEffect(() => {
    if (gameOver) return;
    setQuestions(shuffle(getLangQuestions(category, lang)).slice(0, 10));
    setCurrentIdx(0);
    setSelected(null);
    setAnswered(false);
    setTimeLeft(20);
    setScore(0);
    setCorrect(0);
    hasSavedRef.current = false;
  }, [lang, category, gameOver]);

  const nextQuestion = useCallback(() => {
    setCurrentIdx((i) => {
      if (i < 9) {
        setSelected(null);
        setAnswered(false);
        setTimeLeft(20);
        return i + 1;
      } else {
        setGameOver(true);
        return i;
      }
    });
  }, []);

  const handleAnswer = useCallback(
    (optionIdx) => {
      if (answered) return;
      setSelected(optionIdx);
      setAnswered(true);
      const isCorrect = optionIdx === currentQ.correct;
      const pts = calculateScore(isCorrect, timeLeft, currentQ.difficulty);
      if (isCorrect) {
        setScore((s) => s + pts);
        setCorrect((c) => c + 1);
      }
      setTimeout(nextQuestion, 1200);
    },
    [answered, currentQ, timeLeft, nextQuestion]
  );

  // Timer
  useEffect(() => {
    if (answered || gameOver) return;
    if (timeLeft <= 0) {
      setAnswered(true);
      setTimeout(nextQuestion, 1000);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, answered, gameOver, nextQuestion]);

  // Save match result once when game ends
  useEffect(() => {
    if (!gameOver || !user || hasSavedRef.current) return;
    hasSavedRef.current = true;

    const { score: finalScore, correct: finalCorrect, questions: finalQuestions } = gameDataRef.current;

    const saveGame = async () => {
      setSaving(true);
      const accuracy = Math.round((finalCorrect / finalQuestions.length) * 100);
      const xpEarned = calculateXP(finalScore, accuracy, finalQuestions);
      try {
        const res = await saveMatchResult(user.uid, {
          category: CATEGORY_LABELS[category],
          score: finalScore,
          accuracy,
          xpEarned,
          questions: finalQuestions,
        });
        setResults({ accuracy, xpEarned, ...res });
        refreshUserData();
      } catch (err) {
        console.error("Failed to save match:", err);
      } finally {
        setSaving(false);
      }
    };

    saveGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, user]);

  if (gameOver) {
    const { correct: finalCorrect, questions: finalQuestions } = gameDataRef.current;
    const accuracy = Math.round((finalCorrect / finalQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{accuracy >= 70 ? "◎" : "◇"}</div>
            <h2 className="text-3xl font-black text-white mb-1">{g.matchComplete}</h2>
            <p className="text-zinc-500 text-sm">{CATEGORY_LABELS[category]}</p>
          </div>

          <div className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-4 mb-6">
            {[
              { label: g.finalScore, value: gameDataRef.current.score, accent: true },
              { label: g.accuracy, value: `${accuracy}%` },
              { label: g.correct, value: `${finalCorrect} / ${finalQuestions.length}` },
              {
                label: g.xpEarned,
                value: saving ? "..." : `+${results?.xpEarned ?? 0} XP`,
              },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">{row.label}</span>
                <span
                  className={`font-bold text-sm ${
                    row.accent ? "text-violet-400 text-lg" : "text-white"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
            {results?.newLevel && (
              <div className="border-t border-white/5 pt-4 text-center">
                <p className="text-xs text-zinc-500 mb-1">{g.currentLevel}</p>
                <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  Level {results.newLevel}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/game/${category}`)}
              className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all text-sm"
            >
              {g.playAgain}
            </button>
            <button
              onClick={() => navigate("/play")}
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/8 text-zinc-300 font-medium rounded-xl transition-all text-sm"
            >
              {g.categories}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${CATEGORY_COLORS[category]}`}
            >
              {CATEGORY_LABELS[category]}
            </span>
            <span className="text-sm text-zinc-500">
              {currentIdx + 1} / {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <LangSwitcher />
            <div className="text-right">
              <p className="text-xs text-zinc-600">{g.score}</p>
              <p className="text-lg font-black text-white">{score}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-600">{g.accuracy}</p>
              <p className="text-lg font-black text-white">
                {currentIdx === 0 ? "--" : `${Math.round((correct / currentIdx) * 100)}%`}
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/5 rounded-full mb-8">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-300"
            style={{ width: `${(currentIdx / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded border font-medium ${
                    DIFF_COLORS[currentQ.difficulty]
                  }`}
                >
                  {DIFF_LABELS[currentQ.difficulty]}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white leading-snug">
                {currentQ.question}
              </h2>
            </motion.div>
          </AnimatePresence>
          <div className="flex-shrink-0">
            <CircularTimer timeLeft={timeLeft} maxTime={20} />
          </div>
        </div>

        {/* Options */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-3"
          >
            {currentQ.options.map((opt, i) => {
              let style =
                "bg-white/3 border-white/8 text-zinc-300 hover:bg-white/6 hover:border-white/15 hover:text-white";
              if (answered) {
                if (i === currentQ.correct)
                  style = "bg-emerald-500/15 border-emerald-500/40 text-emerald-300";
                else if (i === selected && selected !== currentQ.correct)
                  style = "bg-red-500/15 border-red-500/40 text-red-300";
                else style = "bg-white/2 border-white/5 text-zinc-600";
              }
              return (
                <motion.button
                  key={i}
                  whileHover={!answered ? { scale: 1.02 } : {}}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={`border rounded-xl px-4 py-4 text-sm font-medium text-left transition-all duration-200 ${style}`}
                >
                  <span className="opacity-50 text-xs mr-2">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Explanation */}
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            <p className="text-xs text-zinc-500">{currentQ.explanation}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}