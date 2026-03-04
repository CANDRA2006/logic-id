import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";

const RANK_STYLES = [
  "text-amber-400 bg-amber-500/10 border-amber-500/25",
  "text-zinc-300 bg-zinc-500/10 border-zinc-500/25",
  "text-orange-400 bg-orange-500/10 border-orange-500/25",
];

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { t } = useLang();
  const l = t.leaderboard;

  useEffect(() => {
    const q = query(collection(db, "leaderboard"), orderBy("bestScore", "desc"), limit(20));
    const unsub = onSnapshot(q, (snap) => {
      setPlayers(snap.docs.map((d, i) => ({ ...d.data(), rank: i + 1 })));
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-black text-white">{l.title}</h1>
            <span className="text-xs text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded-full font-medium animate-pulse">{l.live}</span>
          </div>
          <p className="text-zinc-500 text-sm">{l.subtitle}</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-20"><p className="text-zinc-600 text-sm">{l.noPlayers}</p></div>
        ) : (
          <div className="space-y-2">
            {players.map((player, i) => {
              const isCurrentUser = user?.uid === player.userId;
              const rankStyle = RANK_STYLES[i] || "text-zinc-600 bg-zinc-800/50 border-zinc-700/30";
              return (
                <motion.div key={player.userId} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${isCurrentUser ? "bg-violet-500/8 border-violet-500/25" : "bg-white/2 border-white/5 hover:bg-white/4"}`}
                >
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-black flex-shrink-0 ${rankStyle}`}>{player.rank}</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{(player.username || "?")[0].toUpperCase()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white truncate">{player.username}</p>
                      {isCurrentUser && <span className="text-xs text-violet-400 font-medium">({l.you})</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-zinc-600">Lv.{player.level}</span>
                      <span className="text-xs text-zinc-700">•</span>
                      <span className="text-xs text-zinc-600">{player.totalXP || 0} XP</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black text-white">{player.bestScore.toLocaleString()}</p>
                    <p className="text-xs text-zinc-600">{l.bestScore}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
