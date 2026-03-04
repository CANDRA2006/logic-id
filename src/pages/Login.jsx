import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser, loginWithGoogle } from "../services/authService";
import { useLang } from "../context/LangContext";

export default function Login() {
  const navigate = useNavigate();
  const { t } = useLang();
  const a = t.auth;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(email, password);
      navigate("/play");
    } catch {
      setError(a.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/play");
    } catch {
      setError(a.googleFailed);
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
          <h1 className="text-2xl font-black text-white mb-2">{a.welcomeBack}</h1>
          <p className="text-zinc-500 text-sm">{a.signInSub}</p>
        </div>
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">{a.email}</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder-zinc-700 focus:outline-none focus:border-violet-500/50 transition-colors"
                placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">{a.password}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder-zinc-700 focus:outline-none focus:border-violet-500/50 transition-colors"
                placeholder="••••••••" />
            </div>
            {error && <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-semibold rounded-xl transition-all text-sm">
              {loading ? a.signingIn : a.signIn}
            </button>
          </form>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-zinc-600">{a.orContinue}</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <button onClick={handleGoogle} disabled={loading}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/8 text-zinc-300 font-medium rounded-xl transition-all text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {a.continueGoogle}
          </button>
        </div>
        <p className="text-center text-sm text-zinc-600 mt-4">
          {a.noAccount}{" "}
          <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium">{a.createOne}</Link>
        </p>
      </motion.div>
    </div>
  );
}
