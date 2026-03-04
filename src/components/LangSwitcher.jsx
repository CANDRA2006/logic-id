import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, translations } from "../context/LangContext";

export default function LangSwitcher() {
  const { lang, switchLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = translations[lang];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 transition-all text-sm text-zinc-300"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline font-medium">{current.label}</span>
        <svg
          className={`w-3 h-3 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 bg-[#141414] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 min-w-[140px]"
          >
            {Object.values(translations).map((t) => (
              <button
                key={t.code}
                onClick={() => { switchLang(t.code); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                  lang === t.code ? "text-violet-400 bg-violet-500/8" : "text-zinc-300"
                }`}
              >
                <span>{t.flag}</span>
                <span className="font-medium">{t.label}</span>
                {lang === t.code && (
                  <span className="ml-auto text-violet-400 text-xs">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
