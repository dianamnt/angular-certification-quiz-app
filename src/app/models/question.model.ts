export interface Question {
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  userAnswer?: string;
  all_answers?: string[];
}
