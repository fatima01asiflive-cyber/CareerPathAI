import { AptitudeQuestion, getQuestionsForInterests } from '../utils/questions';

export interface AssessmentSubmission {
  answers: Record<number, number>; // questionId -> selectedOptionIndex
  totalQuestions: number;
}

export interface AssessmentScoreResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  questionBreakdown: {
    questionId: number;
    questionText: string;
    selectedOption: string;
    correctOption: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export const assessmentService = {
  /**
   * Loads 10 aptitude questions based on selected student interests.
   */
  getQuestions(interests: string[] = []): AptitudeQuestion[] {
    return getQuestionsForInterests(interests);
  },

  /**
   * Grades student aptitude test submission and calculates percentage.
   */
  calculateScore(questions: AptitudeQuestion[], answers: Record<number, number>): AssessmentScoreResult {
    let correctCount = 0;

    const breakdown = questions.map((q) => {
      const selectedIndex = answers[q.id];
      const isCorrect = selectedIndex === q.correctIndex;
      if (isCorrect) correctCount++;

      return {
        questionId: q.id,
        questionText: q.question,
        selectedOption: selectedIndex !== undefined ? q.options[selectedIndex] : 'Not Answered',
        correctOption: q.options[q.correctIndex],
        isCorrect,
        explanation: q.explanation,
      };
    });

    const total = questions.length;
    const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    return {
      totalQuestions: total,
      correctAnswers: correctCount,
      scorePercentage: percentage,
      questionBreakdown: breakdown,
    };
  },
};
