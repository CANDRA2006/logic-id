export const criticalThinkingQuestions = [
  {
    id: "ct_001",
    question: "All roses are flowers. Some flowers fade quickly. Therefore:",
    options: [
      "All roses fade quickly",
      "Some roses may fade quickly",
      "No roses fade quickly",
      "Roses never fade"
    ],
    correct: 1,
    difficulty: "medium",
    explanation: "We can only conclude some roses may fade — the overlap is uncertain"
  },
  {
    id: "ct_002",
    question: "If you're running second in a race and pass the person in 2nd place, what position are you in?",
    options: ["1st", "2nd", "3rd", "4th"],
    correct: 1,
    difficulty: "easy",
    explanation: "You pass the person in 2nd — so you take 2nd place"
  },
  {
    id: "ct_003",
    question: "A doctor gives you 3 pills and says take one every half hour. How long before all pills are taken?",
    options: ["30 min", "60 min", "90 min", "1.5 hrs"],
    correct: 1,
    difficulty: "medium",
    explanation: "Take pill 1 now, pill 2 at 30min, pill 3 at 60min = 60 minutes"
  },
  {
    id: "ct_004",
    question: "Which of these is NOT a valid logical argument structure?",
    options: [
      "If P then Q; P; therefore Q",
      "If P then Q; not Q; therefore not P",
      "If P then Q; Q; therefore P",
      "All A are B; X is A; therefore X is B"
    ],
    correct: 2,
    difficulty: "hard",
    explanation: "Affirming the consequent is a logical fallacy"
  },
  {
    id: "ct_005",
    question: "A man is looking at a photo. 'Brothers and sisters I have none, but that man's father is my father's son.' Who is in the photo?",
    options: ["His uncle", "Himself", "His son", "His father"],
    correct: 2,
    difficulty: "hard",
    explanation: "'My father's son' = himself (no siblings), so 'that man's father' = himself → photo shows his son"
  },
  {
    id: "ct_006",
    question: "If all Bloops are Razzies, and all Razzies are Lazzies, then:",
    options: [
      "All Lazzies are Bloops",
      "All Bloops are Lazzies",
      "No Bloops are Lazzies",
      "Some Lazzies are not Razzies"
    ],
    correct: 1,
    difficulty: "easy",
    explanation: "Transitive: Bloops→Razzies→Lazzies, so all Bloops are Lazzies"
  },
  {
    id: "ct_007",
    question: "Which statement is a tautology?",
    options: [
      "It will rain or it will be sunny",
      "It will rain or it will not rain",
      "If it rains, I will stay home",
      "Either cats are mammals or dogs are birds"
    ],
    correct: 1,
    difficulty: "hard",
    explanation: "P ∨ ¬P is always true — a tautology"
  },
  {
    id: "ct_008",
    question: "You find a coin from 550 BC. How do you know it's a fake?",
    options: [
      "Old coins have no year",
      "No coins existed then",
      "BC dates weren't known then",
      "Coins were only paper"
    ],
    correct: 2,
    difficulty: "medium",
    explanation: "BC/AD dating system didn't exist until centuries after Christ — nobody in 550 BC knew it was 550 BC"
  },
  {
    id: "ct_009",
    question: "An analogy: Composer is to Symphony as Architect is to:",
    options: ["Blueprint", "Building", "City", "Brick"],
    correct: 1,
    difficulty: "easy",
    explanation: "A composer creates a symphony; an architect creates a building"
  },
  {
    id: "ct_010",
    question: "If today is Monday, what day is 100 days from now?",
    options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
    correct: 2,
    difficulty: "medium",
    explanation: "100 mod 7 = 2, Monday + 2 = Wednesday"
  },
  {
    id: "ct_011",
    question: "The barber shaves all those who do not shave themselves. Who shaves the barber?",
    options: [
      "The barber shaves himself",
      "Someone else shaves the barber",
      "The paradox has no solution",
      "The barber doesn't get shaved"
    ],
    correct: 2,
    difficulty: "hard",
    explanation: "Russell's paradox — the statement is self-contradictory with no valid resolution"
  },
  {
    id: "ct_012",
    question: "Which is the strongest argument against universal surveillance?",
    options: [
      "It costs too much",
      "Cameras can malfunction",
      "It chills free expression and presumption of innocence",
      "It doesn't catch all criminals"
    ],
    correct: 2,
    difficulty: "medium",
    explanation: "The strongest principled argument is the systemic harm to civil liberties"
  },
  {
    id: "ct_013",
    question: "Identify the logical fallacy: 'You can't trust his climate opinion — he drives a car.'",
    options: ["Straw man", "Ad hominem / Tu quoque", "False dichotomy", "Appeal to authority"],
    correct: 1,
    difficulty: "medium",
    explanation: "Attacking the person's consistency rather than their argument = tu quoque (ad hominem)"
  },
  {
    id: "ct_014",
    question: "If A > B, B > C, and C > D, which MUST be true?",
    options: ["A > D", "D > A", "B > D", "Both A>D and B>D"],
    correct: 3,
    difficulty: "medium",
    explanation: "By transitivity: A>B>C>D, so both A>D and B>D are necessarily true"
  },
  {
    id: "ct_015",
    question: "What is the contrapositive of 'If it rains, I carry an umbrella'?",
    options: [
      "If I carry an umbrella, it rains",
      "If it doesn't rain, I don't carry an umbrella",
      "If I don't carry an umbrella, it doesn't rain",
      "It always rains"
    ],
    correct: 2,
    difficulty: "hard",
    explanation: "Contrapositive of P→Q is ¬Q→¬P"
  },
  {
    id: "ct_016",
    question: "Three boxes: one has apples, one has oranges, one has both. All labels are wrong. You pick from the 'Both' box and get an apple. What's in the 'Oranges' box?",
    options: ["Apples", "Oranges", "Both", "Cannot determine"],
    correct: 0,
    difficulty: "hard",
    explanation: "The 'Both' box has apples (all labels wrong). 'Apples' box can't be apples, and since 'Both' has apples, 'Apples' has oranges and 'Oranges' has both. Wait — 'Oranges' box has apples."
  }
];
