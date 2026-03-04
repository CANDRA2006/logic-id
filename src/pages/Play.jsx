import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import XPBar from "../components/XPBar";

const CATEGORY_IDS = ["math", "patterns", "critical"];
const CATEGORY_STYLES = [
  { color: "from-violet-600 to-violet-400", glow: "shadow-violet-600/20", border: "hover:border-violet-500/30", badge: "bg-violet-500/10 text-violet-300 border-violet-500/20", icon: "∑" },
  { color: "from-cyan-600 to-cyan-400", glow: "shadow-cyan-600/20", border: "hover:border-cyan-500/30", badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20", icon: "◈" },
  { color: "from-emerald-600 to-emerald-400", glow: "shadow-emerald-600/20", border: "hover:border-emerald-500/30", badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", icon: "⊛" },
];

export default function Play() {
  const { userData } = useAuth();
  const { t } = useLang();
  const p = t.play;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {userData && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/3 border border-white/6 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-black">{userData.username[0].toUpperCase()}</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{userData.username}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs bg-violet-500/15 text-violet-300 border border-violet-500/25 px-2 py-0.5 rounded-full font-medium">Level {userData.level}</span>
                  <span className="text-xs text-zinc-600">{userData.totalXP} XP</span>
                </div>
              </div>
            </div>
            <div className="sm:w-64"><XPBar xp={userData.totalXP} level={userData.level} /></div>
          </motion.div>
        )}

        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2">{p.chooseCategory}</h1>
          <p className="text-zinc-500 text-sm">{p.chooseSub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {CATEGORY_IDS.map((id, i) => {
            const s = CATEGORY_STYLES[i];
            const cat = p.categories[i];
            return (
              <motion.div key={id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link to={`/game/${id}`}
                  className={`group block bg-white/3 hover:bg-white/5 border border-white/6 ${s.border} rounded-2xl p-6 transition-all duration-300 shadow-xl ${s.glow} hover:shadow-2xl`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-2xl text-white font-black mb-5 shadow-lg`}>{s.icon}</div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${s.badge} mb-3 inline-block`}>10 Questions</span>
                  <h2 className="text-base font-bold text-white mb-2">{cat.label}</h2>
                  <p className="text-xs text-zinc-500 leading-relaxed">{cat.description}</p>
                  <div className="mt-5 flex items-center gap-1 text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
                    <span>{p.startMatch}</span>
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { val: userData?.totalMatches || 0, label: p.matchesPlayed },
            { val: userData?.bestScore || 0, label: p.bestScore },
            { val: `${userData?.accuracyAverage || 0}%`, label: p.avgAccuracy },
          ].map((s) => (
            <div key={s.label} className="bg-white/2 border border-white/5 rounded-xl py-4">
              <p className="text-xl font-black text-white">{s.val}</p>
              <p className="text-xs text-zinc-600 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
