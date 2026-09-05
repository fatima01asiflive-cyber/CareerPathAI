export interface PersonalityQuestion {
  id: number;
  question: string;
  category: 'Openness' | 'Conscientiousness' | 'Extraversion' | 'Agreeableness' | 'Analytical';
  dimension: string;
  options: Array<{
    text: string;
    score: number; // 1 to 5
    traitWeight: Record<string, number>;
  }>;
}

export interface PersonalityEvaluation {
  primaryArchetype: string;
  archetypeBadge: string;
  summary: string;
  oceanScores: {
    openness: number; // 0-100
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    analyticalMindset: number;
  };
  hollandCodes: {
    realistic: number;
    investigative: number;
    artistic: number;
    social: number;
    enterprising: number;
    conventional: number;
  };
  topWorkEnvironments: string[];
  recommendedCareerMatches: Array<{
    title: string;
    domain: string;
    compatibility: number;
    reason: string;
  }>;
  strengths: string[];
  growthAreas: string[];
}

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  {
    id: 1,
    question: 'When faced with a complex, ambiguous problem, what is your instinctive first step?',
    category: 'Analytical',
    dimension: 'Problem Solving Style',
    options: [
      { text: 'Deconstruct the problem mathematically into smaller testable logical units.', score: 5, traitWeight: { analytical: 5, investigative: 5 } },
      { text: 'Brainstorm innovative, out-of-the-box possibilities and visionary ideas.', score: 4, traitWeight: { openness: 5, artistic: 4 } },
      { text: 'Collaborate with team members to discuss collective experiences.', score: 3, traitWeight: { extraversion: 4, social: 5 } },
      { text: 'Review established documentation and structured standard procedures.', score: 3, traitWeight: { conscientiousness: 5, conventional: 5 } },
    ],
  },
  {
    id: 2,
    question: 'How do you structure your daily study and project workflow?',
    category: 'Conscientiousness',
    dimension: 'Execution Discipline',
    options: [
      { text: 'Maintain strict checklists with time-boxed calendar blocks and milestone dates.', score: 5, traitWeight: { conscientiousness: 5, conventional: 4 } },
      { text: 'Work in deep, intense creative bursts when inspiration and flow state strikes.', score: 4, traitWeight: { openness: 4, artistic: 4 } },
      { text: 'Focus on high-priority blocker items first, adapting dynamically as challenges arise.', score: 4, traitWeight: { analytical: 4, investigative: 4 } },
      { text: 'Sync regularly with peers or study groups to stay accountable and energized.', score: 3, traitWeight: { extraversion: 4, social: 4 } },
    ],
  },
  {
    id: 3,
    question: 'In a group capstone project, which role do you naturally gravitate towards?',
    category: 'Extraversion',
    dimension: 'Team Dynamics & Leadership',
    options: [
      { text: 'The Lead Architect / Technical Specialist solving the hardest engineering logic.', score: 5, traitWeight: { analytical: 5, realistic: 4, investigative: 5 } },
      { text: 'The Project Lead / Strategist aligning goals, presentations, and team vision.', score: 5, traitWeight: { extraversion: 5, enterprising: 5 } },
      { text: 'The UI/UX Designer / Creative Lead shaping aesthetics and user empathy.', score: 4, traitWeight: { artistic: 5, openness: 5 } },
      { text: 'The Quality Assurance / Process Coordinator ensuring zero defect delivery.', score: 4, traitWeight: { conscientiousness: 5, conventional: 5 } },
    ],
  },
  {
    id: 4,
    question: 'How do you respond when a project prototype fails unexpected stress tests?',
    category: 'Analytical',
    dimension: 'Resilience & Debugging Approach',
    options: [
      { text: 'Methodically isolate variables, analyze stack traces, and systematically test hypotheses.', score: 5, traitWeight: { analytical: 5, investigative: 5 } },
      { text: 'Step back to rethink the high-level architecture and devise an alternative creative paradigm.', score: 4, traitWeight: { openness: 5, artistic: 4 } },
      { text: 'Convene an emergency team debrief to brainstorm solutions collectively.', score: 3, traitWeight: { social: 4, extraversion: 4 } },
      { text: 'Carefully compare against official specifications to pinpoint deviations.', score: 4, traitWeight: { conventional: 5, conscientiousness: 4 } },
    ],
  },
  {
    id: 5,
    question: 'What kind of work impact gives you the greatest personal sense of fulfillment?',
    category: 'Openness',
    dimension: 'Core Motivational Drive',
    options: [
      { text: 'Building advanced algorithmic systems that automate complex real-world workflows.', score: 5, traitWeight: { analytical: 5, realistic: 5, investigative: 5 } },
      { text: 'Discovering novel scientific insights or creating pioneering original inventions.', score: 5, traitWeight: { openness: 5, investigative: 5 } },
      { text: 'Mentoring peers and developing applications that directly uplift human well-being.', score: 4, traitWeight: { social: 5, agreeableness: 5 } },
      { text: 'Scaling business enterprises, closing high-value deals, and leading strategic growth.', score: 4, traitWeight: { enterprising: 5, extraversion: 4 } },
    ],
  },
  {
    id: 6,
    question: 'When learning a brand new programming language or discipline, what is your preferred approach?',
    category: 'Openness',
    dimension: 'Intellectual Curiosity',
    options: [
      { text: 'Jump directly into building a real project and experimenting with the syntax hands-on.', score: 5, traitWeight: { realistic: 5, openness: 4 } },
      { text: 'Read the official documentation, compiler specifications, and underlying memory model first.', score: 5, traitWeight: { investigative: 5, analytical: 5 } },
      { text: 'Follow structured video courses and complete curated exercises step-by-step.', score: 4, traitWeight: { conscientiousness: 4, conventional: 4 } },
      { text: 'Join interactive coding bootcamps and discuss solutions in community Discord servers.', score: 3, traitWeight: { social: 4, extraversion: 4 } },
    ],
  },
  {
    id: 7,
    question: 'How do you handle differences of opinion regarding technical architecture in a team?',
    category: 'Agreeableness',
    dimension: 'Conflict Resolution & Empathy',
    options: [
      { text: 'Present empirical benchmark data and performance metrics to let facts decide.', score: 5, traitWeight: { analytical: 5, investigative: 4 } },
      { text: 'Listen deeply to everyone concerns and find an elegant synthesis of ideas.', score: 5, traitWeight: { agreeableness: 5, social: 5 } },
      { text: 'Propose a quick A/B testing prototype to evaluate both alternatives in practice.', score: 4, traitWeight: { openness: 4, enterprising: 4 } },
      { text: 'Refer to industry standard patterns and established organizational guidelines.', score: 3, traitWeight: { conventional: 4, conscientiousness: 4 } },
    ],
  },
  {
    id: 8,
    question: 'Which of these working environments sounds most appealing for your long-term career?',
    category: 'Analytical',
    dimension: 'Environmental Preference',
    options: [
      { text: 'High-tech AI research laboratory or fast-paced modern engineering innovation hub.', score: 5, traitWeight: { investigative: 5, realistic: 4 } },
      { text: 'Vibrant creative design studio with cross-disciplinary visual thinkers.', score: 4, traitWeight: { artistic: 5, openness: 5 } },
      { text: 'Fast-growth venture-backed startup with high autonomy and rapid product iterations.', score: 5, traitWeight: { enterprising: 5, extraversion: 4 } },
      { text: 'Prestigious global institution with structured career ladders and clear governance.', score: 4, traitWeight: { conventional: 5, conscientiousness: 5 } },
    ],
  },
];

export const personalityService = {
  getQuestions(): PersonalityQuestion[] {
    return PERSONALITY_QUESTIONS;
  },

  evaluatePersonality(answers: Record<number, number>): PersonalityEvaluation {
    // Default baseline values
    let totalInvestigative = 65;
    let totalAnalytical = 70;
    let totalOpenness = 68;
    let totalConscientiousness = 72;
    let totalExtraversion = 58;
    let totalAgreeableness = 74;
    let totalArtistic = 55;
    let totalRealistic = 62;
    let totalEnterprising = 60;
    let totalConventional = 64;

    Object.entries(answers).forEach(([qIdStr, optIdx]) => {
      const q = PERSONALITY_QUESTIONS.find((item) => item.id === Number(qIdStr));
      if (q && q.options[optIdx]) {
        const weights = q.options[optIdx].traitWeight;
        if (weights.investigative) totalInvestigative += weights.investigative * 4;
        if (weights.analytical) totalAnalytical += weights.analytical * 4;
        if (weights.openness) totalOpenness += weights.openness * 4;
        if (weights.conscientiousness) totalConscientiousness += weights.conscientiousness * 4;
        if (weights.extraversion) totalExtraversion += weights.extraversion * 4;
        if (weights.agreeableness) totalAgreeableness += weights.agreeableness * 4;
        if (weights.artistic) totalArtistic += weights.artistic * 4;
        if (weights.realistic) totalRealistic += weights.realistic * 4;
        if (weights.enterprising) totalEnterprising += weights.enterprising * 4;
        if (weights.conventional) totalConventional += weights.conventional * 4;
      }
    });

    const clamp = (val: number) => Math.min(96, Math.max(40, Math.round(val)));

    const oceanScores = {
      openness: clamp(totalOpenness),
      conscientiousness: clamp(totalConscientiousness),
      extraversion: clamp(totalExtraversion),
      agreeableness: clamp(totalAgreeableness),
      analyticalMindset: clamp(totalAnalytical),
    };

    const hollandCodes = {
      realistic: clamp(totalRealistic),
      investigative: clamp(totalInvestigative),
      artistic: clamp(totalArtistic),
      social: clamp(totalAgreeableness * 0.85),
      enterprising: clamp(totalEnterprising),
      conventional: clamp(totalConventional),
    };

    let primaryArchetype = 'The Strategic Innovator (INTJ/INTP)';
    let archetypeBadge = 'Architect & Visionary';
    let summary = 'You possess a rare combination of rigorous analytical depth and visionary curiosity. You thrive when decomposing intricate problems into elegant, scalable software systems.';

    if (oceanScores.analyticalMindset >= 85 && hollandCodes.investigative >= 80) {
      primaryArchetype = 'The AI & Systems Architect';
      archetypeBadge = 'Deep Technical Specialist';
      summary = 'You demonstrate high computational curiosity, methodological tenacity, and systemic thinking. Your cognitive profile strongly predicts exceptional success in AI, Machine Learning, and complex algorithm engineering.';
    } else if (oceanScores.openness >= 85 && hollandCodes.artistic >= 75) {
      primaryArchetype = 'The Creative Product Pioneer';
      archetypeBadge = 'Design & Experience Innovator';
      summary = 'You blend human empathy with visual aesthetics and technological fluency. You excel at shaping product journeys that resonate effortlessly with end users.';
    } else if (hollandCodes.enterprising >= 78) {
      primaryArchetype = 'The Tech Strategist & Leader';
      archetypeBadge = 'Product & Venture Driver';
      summary = 'You pair technical acumen with decisive commercial execution, making you well-suited for product management, venture leadership, and quantitative analytics.';
    }

    return {
      primaryArchetype,
      archetypeBadge,
      summary,
      oceanScores,
      hollandCodes,
      topWorkEnvironments: [
        'High-Autonomy AI & DeepTech Labs',
        'Modern Product Engineering Teams',
        'Open-Source Collaborative Ecosystems',
        'Data-Driven Decision Hubs',
      ],
      recommendedCareerMatches: [
        {
          title: 'AI & Machine Learning Engineer',
          domain: 'Computer Science & Technology',
          compatibility: 95,
          reason: 'Matches your high Investigative & Analytical problem-solving profile.',
        },
        {
          title: 'Data Scientist & Quantitative Analyst',
          domain: 'Computer Science & Mathematics',
          compatibility: 91,
          reason: 'Leverages your empirical hypothesis-testing and statistical reasoning.',
        },
        {
          title: 'Full-Stack Software Architect',
          domain: 'Software Engineering',
          compatibility: 88,
          reason: 'Combines structural discipline with end-to-end execution agility.',
        },
      ],
      strengths: [
        'High cognitive endurance on complex multi-variable problems.',
        'Structured decomposition of ambiguous requirements.',
        'Continuous self-directed learning across emerging technologies.',
      ],
      growthAreas: [
        'Pacing yourself during high-intensity build sprints to prevent burnout.',
        'Communicating technical tradeoffs to non-technical stakeholders in simple analogies.',
      ],
    };
  },
};
