import { motion } from "framer-motion";
import { getXPProgress, getXPForNextLevel } from "../services/gameService";
import { useLang } from "../context/LangContext";

export default function XPBar({ xp, level }) {
  const { t } = useLang();
  const progress = getXPProgress(xp, level);
  const nextLevelXP = getXPForNextLevel(level);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-zinc-500 font-medium">{t.xp.xpProgress}</span>
        <span className="text-xs text-zinc-400 font-mono">{xp} / {nextLevelXP}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500"
          initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: "easeOut" }}
          style={{ boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)" }}
        />
      </div>
    </div>
  );
}
