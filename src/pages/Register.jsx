import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { registerUser } from "../services/authService";
import { useLang } from "../context/LangContext";

export default function Register() {
  const navigate = useNavigate();
  const { t } = useLang();
  const a = t.auth;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (username.length < 3) { setError(a.usernameTooShort); return; }
    if (password.length < 6) { setError(a.passwordTooShort); return; }
    setLoading(true);
    try {
      await registerUser(email, password, username);
      navigate("/play");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setError(a.emailInUse);
      else setError(a.registrationFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 pt-20">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-violet-600/6 rounded-full blur-[100px] pointer-events-none" />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm relative">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-black text-sm">LA</span>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-white mb-2">{a.joinArena}</h1>
          <p className="text-zinc-500 text-sm">{a.createSub}</p>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">{a.username}</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3} maxLength={24}
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder-zinc-700 focus:outline-none focus:border-violet-500/50 transition-colors"
                placeholder="YourUsername" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">{a.email}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder-zinc-700 focus:outline-none focus:border-violet-500/50 transition-colors"
                placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">{a.password}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder-zinc-700 focus:outline-none focus:border-violet-500/50 transition-colors"
                placeholder={a.minPassword} />
            </div>
            {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold rounded-xl transition-all text-sm">
              {loading ? a.creatingAccount : a.createAccount}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-zinc-600 mt-4">
          {a.alreadyHave}{" "}
          <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium">{a.signIn}</Link>
        </p>
      </motion.div>
    </div>
  );
}
