export const patternQuestions = [
  {
    id: "pr_001",
    question: "What comes next: A, C, F, J, O, ?",
    options: ["T", "U", "V", "W"],
    correct: 1,
    difficulty: "hard",
    explanation: "Gaps: +2,+3,+4,+5,+6 → O+6=U"
  },
  {
    id: "pr_002",
    question: "1, 1, 2, 3, 5, 8, 13, ?",
    options: ["18", "20", "21", "22"],
    correct: 2,
    difficulty: "easy",
    explanation: "Fibonacci: 8+13=21"
  },
  {
    id: "pr_003",
    question: "What is the next number: 2, 3, 5, 7, 11, 13, ?",
    options: ["14", "15", "16", "17"],
    correct: 3,
    difficulty: "easy",
    explanation: "Prime numbers sequence, next is 17"
  },
  {
    id: "pr_004",
    question: "Find the odd one out: 144, 169, 196, 216, 225",
    options: ["144", "169", "196", "216"],
    correct: 3,
    difficulty: "medium",
    explanation: "216 = 6³, not a perfect square. Others: 12²,13²,14²,15²"
  },
  {
    id: "pr_005",
    question: "2, 6, 18, 54, ?",
    options: ["108", "144", "162", "216"],
    correct: 2,
    difficulty: "easy",
    explanation: "Each term ×3: 54×3=162"
  },
  {
    id: "pr_006",
    question: "What pattern: O, T, T, F, F, S, S, E, N, ?",
    options: ["S", "T", "E", "N"],
    correct: 1,
    difficulty: "hard",
    explanation: "One,Two,Three,Four,Five,Six,Seven,Eight,Nine,Ten → T"
  },
  {
    id: "pr_007",
    question: "1, 4, 9, 16, 25, 36, ?",
    options: ["42", "45", "48", "49"],
    correct: 3,
    difficulty: "easy",
    explanation: "Perfect squares: 7²=49"
  },
  {
    id: "pr_008",
    question: "DCBA, HGFE, LKJI, ?",
    options: ["NMLP", "PONM", "RQPO", "SRQP"],
    correct: 1,
    difficulty: "medium",
    explanation: "Each group: 4 letters in reverse, skipping none: PONM"
  },
  {
    id: "pr_009",
    question: "256, 128, 64, 32, ?",
    options: ["8", "12", "16", "24"],
    correct: 2,
    difficulty: "easy",
    explanation: "Dividing by 2 each time: 32/2=16"
  },
  {
    id: "pr_010",
    question: "3, 8, 15, 24, 35, ?",
    options: ["46", "48", "50", "52"],
    correct: 1,
    difficulty: "medium",
    explanation: "n²-1: 7²-1=48"
  },
  {
    id: "pr_011",
    question: "What number replaces the ? : 4 → 16 → 256 → ?",
    options: ["512", "1024", "4096", "65536"],
    correct: 3,
    difficulty: "medium",
    explanation: "Each term is squared: 256²=65536"
  },
  {
    id: "pr_012",
    question: "J, F, M, A, M, J, J, A, S, O, ?",
    options: ["N", "D", "P", "Q"],
    correct: 0,
    difficulty: "medium",
    explanation: "First letters of months: November"
  },
  {
    id: "pr_013",
    question: "1, 2, 4, 7, 11, 16, ?",
    options: ["20", "21", "22", "23"],
    correct: 2,
    difficulty: "medium",
    explanation: "Differences: 1,2,3,4,5,6 → 16+6=22"
  },
  {
    id: "pr_014",
    question: "Which doesn't belong: BDFH, CEGI, DFHJ, CEIK",
    options: ["BDFH", "CEGI", "DFHJ", "CEIK"],
    correct: 3,
    difficulty: "hard",
    explanation: "BDFH,CEGI,DFHJ all have consecutive even gaps. CEIK has gap 2,3,2"
  },
  {
    id: "pr_015",
    question: "2, 5, 11, 23, 47, ?",
    options: ["72", "88", "95", "97"],
    correct: 2,
    difficulty: "hard",
    explanation: "Each term = previous×2+1: 47×2+1=95"
  },
  {
    id: "pr_016",
    question: "What comes next: ♠♥♦♣♠♥♦?",
    options: ["♠", "♥", "♣", "♦"],
    correct: 2,
    difficulty: "easy",
    explanation: "Pattern repeats: ♠♥♦♣, after ♦ comes ♣"
  }
];
