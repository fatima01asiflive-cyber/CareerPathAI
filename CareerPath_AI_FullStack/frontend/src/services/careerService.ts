import { UserProfile } from '../types';
import { CAREER_DATABASE, CareerDetail, DEFAULT_CAREER_ID } from '../utils/careerData';

export interface FoundationRecommendation {
  title: string;
  category: string;
  description: string;
  duration: string;
  isFree: boolean;
}

export interface CareerRecommendationResult {
  recommendedCareer: CareerDetail;
  alternativeCareers: CareerDetail[];
  matchScore: number;
  isStrongMatch: boolean; // Score >= 85
  strengths: string[];
  weakAreas: string[];
  foundationAdvice: string;
  recommendedFoundationCourses: FoundationRecommendation[];
}

export const careerService = {
  /**
   * Evaluates user profile & aptitude score to generate personalized recommendation.
   * Enforces the 85% Decision Logic:
   * >= 85%: Strong endorsement of primary interest.
   * < 85%: Encouraging supportive feedback + foundational bridge courses.
   */
  getRecommendation(user: UserProfile): CareerRecommendationResult {
    const aptitudeScore = user.aptitudeScore ?? 85;
    const isStrongMatch = aptitudeScore >= 85;

    // Determine best matching career based on selected interests or default
    let targetCareerId = DEFAULT_CAREER_ID;
    const interests = user.interests || [];

    if (interests.some((i) => i.toLowerCase().includes('ai') || i.toLowerCase().includes('machine learning'))) {
      targetCareerId = 'ai-engineer';
    } else if (interests.some((i) => i.toLowerCase().includes('data') || i.toLowerCase().includes('analytics'))) {
      targetCareerId = 'data-scientist';
    } else if (interests.some((i) => i.toLowerCase().includes('security') || i.toLowerCase().includes('cyber'))) {
      targetCareerId = 'cyber-security';
    } else if (interests.some((i) => i.toLowerCase().includes('design') || i.toLowerCase().includes('arts') || i.toLowerCase().includes('ux'))) {
      targetCareerId = 'ui-ux-designer';
    } else if (interests.some((i) => i.toLowerCase().includes('business') || i.toLowerCase().includes('finance') || i.toLowerCase().includes('commerce'))) {
      targetCareerId = 'financial-analyst';
    } else if (interests.some((i) => i.toLowerCase().includes('medicine') || i.toLowerCase().includes('health') || i.toLowerCase().includes('bio'))) {
      targetCareerId = 'biomedical-specialist';
    } else if (interests.some((i) => i.toLowerCase().includes('engineering') || i.toLowerCase().includes('hardware'))) {
      targetCareerId = 'electrical-engineer';
    } else if (interests.some((i) => i.toLowerCase().includes('psychology') || i.toLowerCase().includes('social'))) {
      targetCareerId = 'psychology-researcher';
    }

    if (user.recommendedCareerId && CAREER_DATABASE[user.recommendedCareerId]) {
      targetCareerId = user.recommendedCareerId;
    }

    const recommendedCareer = CAREER_DATABASE[targetCareerId] || CAREER_DATABASE[DEFAULT_CAREER_ID];

    // Pick 3 alternative pathways
    const alternativeCareers = Object.values(CAREER_DATABASE)
      .filter((c) => c.id !== targetCareerId)
      .slice(0, 3);

    // Strengths & Weakness derivation
    const strengths = isStrongMatch
      ? [
          'Strong conceptual grasp of domain-specific logic and problem formulation.',
          'High analytical problem-solving agility on quantitative reasoning checks.',
          'Solid foundational alignment with industry standard best practices.',
        ]
      : [
          'Clear genuine curiosity and enthusiasm for the selected career track.',
          'Strong verbal and qualitative interpretation capability.',
          'Promising baseline logic that can be rapidly accelerated with targeted practice.',
        ];

    const weakAreas = isStrongMatch
      ? [
          'Advanced multi-tier system scalability and edge-case benchmarking.',
          'Specialized algorithmic optimization for large dataset memory constraints.',
        ]
      : [
          'Algorithmic time complexity and data structure selection.',
          'Core mathematical foundations and formal proof derivations.',
          'Hands-on syntax fluency and structured debugging workflows.',
        ];

    const foundationAdvice = isStrongMatch
      ? 'The assessment strongly supports your selected interest. Your cognitive strengths and diagnostic performance indicate ready aptitude for this track.'
      : 'Your interest is valid and full of potential, but your current foundation needs targeted improvement before advancing to complex milestones. Completing the recommended bridge courses will build the core proficiency you need to thrive.';

    const recommendedFoundationCourses: FoundationRecommendation[] = [
      {
        title: 'Mathematical & Logical Foundations for Computing',
        category: 'Mathematics',
        description: 'Discrete math, propositional logic, and algorithmic thinking principles.',
        duration: '3 Weeks',
        isFree: true,
      },
      {
        title: 'Core Programming Syntax & Structured Problem Solving',
        category: 'Computer Science',
        description: 'Deep dive into variables, control flow, functions, and debugging workflows.',
        duration: '4 Weeks',
        isFree: true,
      },
      {
        title: 'Introduction to Data Structures & Big-O Notation',
        category: 'Computer Science',
        description: 'Linear arrays, stacks, queues, and understanding performance tradeoffs.',
        duration: '3 Weeks',
        isFree: true,
      },
    ];

    return {
      recommendedCareer: {
        ...recommendedCareer,
        matchScore: aptitudeScore,
      },
      alternativeCareers,
      matchScore: aptitudeScore,
      isStrongMatch,
      strengths,
      weakAreas,
      foundationAdvice,
      recommendedFoundationCourses,
    };
  },

  getAllCareers(): CareerDetail[] {
    return Object.values(CAREER_DATABASE);
  },

  getCareerById(id: string): CareerDetail | undefined {
    return CAREER_DATABASE[id];
  },
};
