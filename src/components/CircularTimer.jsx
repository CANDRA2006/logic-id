import { motion } from "framer-motion";

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CircularTimer({ timeLeft, maxTime = 20 }) {
  const progress = timeLeft / maxTime;
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  
  const color = timeLeft > 10 ? "#8b5cf6" : timeLeft > 5 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r={RADIUS}
          stroke="#1f1f2e"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx="50" cy="50" r={RADIUS}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          transition={{ duration: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-2xl font-black tabular-nums"
          style={{ color }}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
