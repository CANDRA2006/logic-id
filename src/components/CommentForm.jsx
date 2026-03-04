import { useState } from "react";
import { motion } from "framer-motion";
import { postFeedback } from "../services/feedbackService";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";

export default function CommentForm() {
  const { user, userData } = useAuth();
  const { t } = useLang();
  const c = t.community;
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!user) return null;

  const handleSubmit = async () => {
    setError("");
    if (message.length < 2) { setError(c.tooShort); return; }
    if (message.length > 500) { setError(c.tooLong); return; }
    setLoading(true);
    try {
      await postFeedback(user.uid, userData?.username || user.displayName || "Anonymous", message, rating);
      setMessage("");
      setRating(5);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white/3 border border-white/8 rounded-2xl p-6"
    >
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">{c.shareExperience}</h3>
      <div className="flex items-center gap-1 mb-4">
        {[1,2,3,4,5].map((star) => (
          <button key={star} onMouseEnter={() => setHoveredStar(star)} onMouseLeave={() => setHoveredStar(null)}
            onClick={() => setRating(star)} className="text-2xl transition-transform hover:scale-110">
            <span className={star <= (hoveredStar ?? rating) ? "text-amber-400" : "text-zinc-700"}>★</span>
          </button>
        ))}
        <span className="text-sm text-zinc-500 ml-2">{rating}/5</span>
      </div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)}
        placeholder={c.writeFeedback} maxLength={500}
        className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder-zinc-600 resize-none h-28 focus:outline-none focus:border-violet-500/50 transition-colors"
      />
      <div className="flex items-center justify-between mt-2 mb-3">
        <span className={`text-xs ${message.length > 480 ? "text-red-400" : "text-zinc-600"}`}>{message.length}/500</span>
        {error && <span className="text-xs text-red-400">{error}</span>}
        {success && <span className="text-xs text-emerald-400">{c.posted}</span>}
      </div>
      <button onClick={handleSubmit} disabled={loading || message.length < 2}
        className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-medium rounded-xl transition-all">
        {loading ? c.posting : c.post}
      </button>
    </motion.div>
  );
}
