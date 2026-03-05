import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";

export default function Home() {
  const { user } = useAuth();
  const { t } = useLang();
  const h = t.home;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <section className="relative overflow-hidden pt-24 pb-32 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-600/6 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-violet-400 uppercase mb-6 border border-violet-500/20 px-4 py-1.5 rounded-full bg-violet-500/5">
              {h.badge}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            {h.title1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">{h.title2}</span><br />
            {h.title3}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-500 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >{h.subtitle}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            {user ? (
              <Link to="/play" className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all text-sm shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40">
                {h.continuePlaying}
              </Link>
            ) : (
              <>
                <Link to="/register" className="px-8 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all text-sm shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40">
                  {h.cta}
                </Link>
                <Link to="/leaderboard" className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-zinc-300 font-medium rounded-xl transition-all text-sm border border-white/8">
                  {h.viewLeaderboard}
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-white/2 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "3", label: h.stats.categories },
            { value: "50+", label: h.stats.questions },
            { value: "10", label: h.stats.levels },
            { value: "Live", label: h.stats.leaderboard },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="text-center">
              <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{h.builtFor}</h2>
            <p className="text-zinc-500 text-base max-w-md mx-auto">{h.builtForSub}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {h.features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-white/3 hover:bg-white/5 border border-white/6 hover:border-violet-500/20 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="text-2xl text-violet-400 mb-4 group-hover:text-violet-300 transition-colors">◈</div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {!user && (
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-violet-600/10 to-cyan-600/10 border border-violet-500/15 rounded-3xl p-12">
              <h2 className="text-3xl font-black text-white mb-4">{h.ready}</h2>
              <p className="text-zinc-500 mb-8 text-sm">{h.readySub}</p>
              <Link to="/register" className="inline-block px-10 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all text-sm shadow-lg shadow-violet-600/25">
                {h.createAccount}
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <p className="text-zinc-700 text-xs">Logic Arena © 2026 | All rights reserved.</p>
      </footer>
    </div>
  );
}
