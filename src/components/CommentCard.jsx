import { useState } from "react";
import { motion } from "framer-motion";
import { likeFeedback, deleteFeedback } from "../services/feedbackService";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";

const formatDate = (ts) => {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function CommentCard({ comment, isTop }) {
  const { user } = useAuth();
  const { t } = useLang();
  const c = t.community;
  const [liking, setLiking] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isOwner = user?.uid === comment.userId;

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    await likeFeedback(comment.id);
    setTimeout(() => setLiking(false), 800);
  };

  const handleDelete = async () => {
    setDeleting(true);
    await deleteFeedback(comment.id);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      className={`relative bg-white/3 border rounded-2xl p-5 transition-all ${isTop ? "border-amber-500/30 bg-amber-500/3" : "border-white/6"}`}
    >
      {isTop && (
        <span className="absolute -top-3 left-4 text-xs bg-amber-500 text-black font-bold px-3 py-1 rounded-full">{c.topComment}</span>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">{(comment.username || "A")[0].toUpperCase()}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-200">{comment.username}</p>
            <p className="text-xs text-zinc-600">{formatDate(comment.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {[1,2,3,4,5].map((s) => (
            <span key={s} className={`text-sm ${s <= comment.rating ? "text-amber-400" : "text-zinc-700"}`}>★</span>
          ))}
        </div>
      </div>
      <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{comment.message}</p>
      <div className="mt-4 flex items-center justify-between">
        <button onClick={handleLike} disabled={liking}
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-violet-400 transition-colors group">
          <span className="text-base group-hover:scale-110 transition-transform inline-block">♡</span>
          <span>{comment.likes || 0}</span>
        </button>
        {isOwner && !showConfirm && (
          <button onClick={() => setShowConfirm(true)} className="text-xs text-zinc-600 hover:text-red-400 transition-colors">{c.delete}</button>
        )}
        {isOwner && showConfirm && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">{c.sure}</span>
            <button onClick={handleDelete} disabled={deleting} className="text-xs text-red-400 hover:text-red-300">{deleting ? "..." : c.yes}</button>
            <button onClick={() => setShowConfirm(false)} className="text-xs text-zinc-500 hover:text-zinc-300">{c.no}</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
