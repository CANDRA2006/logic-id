import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { useMatchHistory } from "../hooks/useMatchHistory";
import XPBar from "../components/XPBar";

const formatDate = (ts) => {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const categoryColor = (cat) => {
  if (cat?.includes("Math") || cat?.includes("Logika")) return "text-violet-400";
  if (cat?.includes("Pattern") || cat?.includes("Pola") || cat?.includes("Patrón")) return "text-cyan-400";
  return "text-emerald-400";
};

export default function Profile() {
  const { user, userData } = useAuth();
  const { t } = useLang();
  const p = t.profile;
  const { matches, loading } = useMatchHistory(user?.uid);

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-black text-white">{userData.username[0].toUpperCase()}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-black text-white">{userData.username}</h1>
                <span className="text-sm font-bold px-3 py-1 rounded-full border"
                  style={{ color: "#a78bfa", background: "rgba(139,92,246,0.1)", borderColor: "rgba(139,92,246,0.25)", boxShadow: "0 0 12px rgba(139,92,246,0.2)" }}>
                  Level {userData.level}
                </span>
              </div>
              <p className="text-sm text-zinc-500 mb-3">{user?.email}</p>
              <XPBar xp={userData.totalXP} level={userData.level} />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: p.totalXP, value: userData.totalXP || 0 },
            { label: p.bestScore, value: userData.bestScore || 0 },
            { label: p.matches, value: userData.totalMatches || 0 },
            { label: p.avgAccuracy, value: `${userData.accuracyAverage || 0}%` },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white/2 border border-white/5 rounded-xl p-4 text-center"
            >
              <p className="text-xl font-black text-white">{typeof s.value === "number" ? s.value.toLocaleString() : s.value}</p>
              <p className="text-xs text-zinc-600 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div>
          <h2 className="text-base font-bold text-white mb-4">{p.recentMatches}</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center py-12 bg-white/2 border border-white/5 rounded-2xl">
              <p className="text-zinc-600 text-sm">{p.noMatches}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {matches.slice(0, 10).map((match, i) => (
                <motion.div key={match.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 bg-white/2 border border-white/5 rounded-xl p-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold ${categoryColor(match.category)}`}>{match.category}</span>
                      <span className="text-xs text-zinc-700">•</span>
                      <span className="text-xs text-zinc-600">{formatDate(match.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-500">Accuracy: {match.accuracy}%</span>
                      <span className="text-xs text-emerald-400">+{match.xpEarned} XP</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-base font-black text-white">{match.score.toLocaleString()}</p>
                    <p className="text-xs text-zinc-600">{p.score}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
