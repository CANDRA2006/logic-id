import { useEffect, useState } from "react";
import { subscribeToFeedback } from "../services/feedbackService";

export const useFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = subscribeToFeedback((items) => {
      setFeedback(items);
      setLoading(false);
    });
    return unsub;
  }, []);

  const avgRating =
    feedback.length > 0
      ? (feedback.reduce((sum, f) => sum + (f.rating || 0), 0) / feedback.length).toFixed(1)
      : "0.0";

  const topComment = feedback.reduce(
    (top, f) => (!top || f.likes > top.likes ? f : top),
    null
  );

  return { feedback, loading, avgRating, topComment };
};
