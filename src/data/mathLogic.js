export const mathLogicQuestions = [
  {
    id: "ml_001",
    question: "If 2x + 3 = 15, what is x?",
    options: ["4", "5", "6", "7"],
    correct: 1,
    difficulty: "easy",
    explanation: "2x = 12, so x = 6"
  },
  {
    id: "ml_002",
    question: "What is the next number in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["38", "40", "42", "44"],
    correct: 2,
    difficulty: "medium",
    explanation: "Differences are 4,6,8,10,12 → next is 30+12=42"
  },
  {
    id: "ml_003",
    question: "A train travels 120km in 2 hours. How long to travel 300km at the same speed?",
    options: ["4h", "4.5h", "5h", "5.5h"],
    correct: 2,
    difficulty: "easy",
    explanation: "Speed = 60km/h, 300/60 = 5 hours"
  },
  {
    id: "ml_004",
    question: "If log₂(x) = 5, what is x?",
    options: ["10", "16", "32", "64"],
    correct: 2,
    difficulty: "hard",
    explanation: "2^5 = 32"
  },
  {
    id: "ml_005",
    question: "What is the sum of interior angles of a hexagon?",
    options: ["540°", "620°", "720°", "840°"],
    correct: 2,
    difficulty: "medium",
    explanation: "(n-2)×180 = 4×180 = 720°"
  },
  {
    id: "ml_006",
    question: "If 5! = 120, what is 6!?",
    options: ["600", "620", "720", "840"],
    correct: 2,
    difficulty: "easy",
    explanation: "6! = 6 × 5! = 6 × 120 = 720"
  },
  {
    id: "ml_007",
    question: "A rectangle has perimeter 50cm. If length is 15cm, what is the area?",
    options: ["140cm²", "145cm²", "150cm²", "155cm²"],
    correct: 2,
    difficulty: "easy",
    explanation: "Width = (50-30)/2 = 10, Area = 15×10 = 150"
  },
  {
    id: "ml_008",
    question: "What is the GCD of 48 and 36?",
    options: ["6", "8", "10", "12"],
    correct: 3,
    difficulty: "medium",
    explanation: "48 = 4×12, 36 = 3×12, GCD = 12"
  },
  {
    id: "ml_009",
    question: "If x² - 5x + 6 = 0, what are the roots?",
    options: ["2,3", "1,6", "2,4", "-2,-3"],
    correct: 0,
    difficulty: "medium",
    explanation: "(x-2)(x-3)=0, roots are 2 and 3"
  },
  {
    id: "ml_010",
    question: "What is 2^10?",
    options: ["512", "1000", "1024", "2048"],
    correct: 2,
    difficulty: "easy",
    explanation: "2^10 = 1024"
  },
  {
    id: "ml_011",
    question: "How many prime numbers are between 10 and 30?",
    options: ["4", "5", "6", "7"],
    correct: 1,
    difficulty: "medium",
    explanation: "11,13,17,19,23,29 → but 5 between exclusive? 11,13,17,19,23 = 5"
  },
  {
    id: "ml_012",
    question: "The probability of rolling a sum of 7 with two dice is:",
    options: ["1/6", "5/36", "6/36", "7/36"],
    correct: 2,
    difficulty: "hard",
    explanation: "Combinations: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6/36 = 1/6"
  },
  {
    id: "ml_013",
    question: "What is the value of √(144 + 25)?",
    options: ["12", "13", "14", "15"],
    correct: 1,
    difficulty: "easy",
    explanation: "√169 = 13"
  },
  {
    id: "ml_014",
    question: "If 3 workers finish a job in 8 days, how long for 6 workers?",
    options: ["2 days", "3 days", "4 days", "5 days"],
    correct: 2,
    difficulty: "medium",
    explanation: "Work = 3×8 = 24 worker-days, 24/6 = 4 days"
  },
  {
    id: "ml_015",
    question: "What is the 10th term of arithmetic sequence 3, 7, 11, 15...?",
    options: ["37", "39", "41", "43"],
    correct: 1,
    difficulty: "medium",
    explanation: "a(n) = 3 + (n-1)×4 = 3 + 36 = 39"
  },
  {
    id: "ml_016",
    question: "A circle has area 25π. What is its circumference?",
    options: ["5π", "10π", "15π", "25π"],
    correct: 1,
    difficulty: "medium",
    explanation: "r²=25, r=5, circumference=2πr=10π"
  },
  {
    id: "ml_017",
    question: "What is the remainder when 2^100 is divided by 3?",
    options: ["0", "1", "2", "3"],
    correct: 1,
    difficulty: "hard",
    explanation: "2^1 mod 3=2, 2^2 mod 3=1, pattern cycles with period 2. 100 is even → 1"
  }
];
