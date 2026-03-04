import { motion, AnimatePresence } from "framer-motion";
import { useFeedback } from "../hooks/useFeedback";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import CommentForm from "../components/CommentForm";
import CommentCard from "../components/CommentCard";
import { Link } from "react-router-dom";

export default function Community() {
  const { feedback, loading, avgRating, topComment } = useFeedback();
  const { user } = useAuth();
  const { t } = useLang();
  const c = t.community;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-black text-white">{c.title}</h1>
            <span className="text-xs text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded-full font-medium animate-pulse">{c.live}</span>
          </div>
          <p className="text-zinc-500 text-sm">{c.subtitle}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-white/3 border border-white/6 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-amber-400">{avgRating}</p>
            <p className="text-xs text-zinc-600 mt-1">{c.avgRating}</p>
          </div>
          <div className="bg-white/3 border border-white/6 rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-white">{feedback.length}</p>
            <p className="text-xs text-zinc-600 mt-1">{c.reviews}</p>
          </div>
          <div className="bg-white/3 border border-white/6 rounded-xl p-4 text-center">
            <div className="flex justify-center gap-0.5">
              {[1,2,3,4,5].map((s) => (
                <span key={s} className={`text-sm ${s <= Math.round(parseFloat(avgRating)) ? "text-amber-400" : "text-zinc-700"}`}>★</span>
              ))}
            </div>
            <p className="text-xs text-zinc-600 mt-1">{c.stars}</p>
          </div>
        </div>

        {user ? (
          <div className="mb-8"><CommentForm /></div>
        ) : (
          <div className="mb-8 bg-white/3 border border-white/6 rounded-2xl p-6 text-center">
            <p className="text-zinc-500 text-sm mb-3">{c.signInPrompt}</p>
            <Link to="/login" className="inline-block text-sm bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-xl transition-all font-medium">
              {c.signIn}
            </Link>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : feedback.length === 0 ? (
          <div className="text-center py-16 bg-white/2 border border-white/5 rounded-2xl">
            <p className="text-zinc-600 text-sm">{c.noFeedback}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {feedback.map((item) => (
                <CommentCard key={item.id} comment={item} isTop={topComment?.id === item.id && item.likes > 0} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
