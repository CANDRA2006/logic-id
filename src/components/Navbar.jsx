import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { logoutUser } from "../services/authService";
import { useState } from "react";
import LangSwitcher from "./LangSwitcher";

export default function Navbar() {
  const { user, userData } = useAuth();
  const { t } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/play", label: t.nav.play },
    { to: "/leaderboard", label: t.nav.leaderboard },
    { to: "/community", label: t.nav.community },
  ];

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-black text-sm">LA</span>
          </div>
          <span className="font-black text-white tracking-tight text-lg">
            Logic<span className="text-violet-400">Arena</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === link.to ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >{link.label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LangSwitcher />
          {user ? (
            <>
              <Link to="/profile" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{(userData?.username || user.displayName || "U")[0].toUpperCase()}</span>
                </div>
                <span className="text-zinc-300 text-sm font-medium">{userData?.username || user.displayName || t.nav.profile}</span>
                {userData?.level && (
                  <span className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full border border-violet-500/30">Lv.{userData.level}</span>
                )}
              </Link>
              <button onClick={handleLogout} className="hidden md:block text-sm text-zinc-500 hover:text-red-400 transition-colors px-3 py-2">
                {t.nav.logout}
              </button>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">{t.nav.login}</Link>
              <Link to="/register" className="text-sm bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition-all font-medium">{t.nav.signup}</Link>
            </div>
          )}
          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 bg-[#0a0a0a] px-6 py-4 space-y-1"
        >
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                location.pathname === link.to ? "text-white bg-white/10" : "text-zinc-400 hover:text-white"
              }`}
            >{link.label}</Link>
          ))}
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-zinc-400 hover:text-white text-sm">{t.nav.profile}</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-red-400 text-sm">{t.nav.logout}</button>
            </>
          ) : (
            <div className="pt-2 flex gap-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2 border border-white/10 rounded-lg text-zinc-300 text-sm">{t.nav.login}</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2 bg-violet-600 rounded-lg text-white text-sm">{t.nav.signup}</Link>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
}
