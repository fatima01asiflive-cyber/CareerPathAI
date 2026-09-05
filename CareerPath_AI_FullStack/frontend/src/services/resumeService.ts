export interface ResumeAnalysisOutput {
  overallScore: number;
  atsCompatibility: 'Excellent' | 'Good' | 'Needs Work' | 'Poor';
  wordCount: number;
  extractedName?: string;
  extractedEmail?: string;
  extractedPhone?: string;
  extractedRole?: string;
  matchedKeywords: string[];
  missingCriticalKeywords: string[];
  recommendedKeywords: string[];
  sectionScores: {
    contactInfo: number;
    professionalSummary: number;
    workExperience: number;
    technicalSkills: number;
    education: number;
    projectsAndPortfolio: number;
    actionVerbsAndMetrics: number;
  };
  keyStrengths: string[];
  criticalIssues: string[];
  actionableImprovements: string[];
  bulletPointFeedback: Array<{
    original: string;
    suggestion: string;
    reason: string;
  }>;
}

const DOMAIN_KEYWORDS: Record<string, { critical: string[]; recommended: string[] }> = {
  'ai-engineer': {
    critical: ['Python', 'PyTorch', 'TensorFlow', 'Machine Learning', 'Deep Learning', 'NLP', 'Data Preprocessing', 'Model Evaluation', 'Transformers', 'FastAPI'],
    recommended: ['MLOps', 'Docker', 'Kubernetes', 'Hugging Face', 'Scikit-Learn', 'Vector DB', 'CI/CD', 'Git', 'CUDA', 'REST API', 'RAG'],
  },
  'data-scientist': {
    critical: ['Python', 'SQL', 'Pandas', 'NumPy', 'Machine Learning', 'Statistical Modeling', 'Tableau', 'Data Visualization', 'Hypothesis Testing', 'Data Wrangling'],
    recommended: ['Power BI', 'Scikit-Learn', 'Feature Engineering', 'BigQuery', 'Spark', 'R', 'A/B Testing', 'Seaborn', 'Matplotlib', 'Jupyter'],
  },
  'software-engineer': {
    critical: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'REST API', 'SQL', 'Git', 'Data Structures', 'Algorithms', 'Clean Architecture'],
    recommended: ['Docker', 'AWS', 'Next.js', 'PostgreSQL', 'GraphQL', 'Tailwind CSS', 'Unit Testing', 'Jest', 'CI/CD', 'Microservices', 'Redis'],
  },
  'cyber-security': {
    critical: ['Network Security', 'Penetration Testing', 'SIEM', 'Vulnerability Assessment', 'Firewalls', 'Wireshark', 'Cryptography', 'Incident Response', 'Linux', 'OWASP Top 10'],
    recommended: ['Burp Suite', 'Metasploit', 'SOC', 'Python Scripting', 'ISO 27001', 'Cloud Security', 'NIST Framework', 'CISSP Concepts', 'Bash'],
  },
  'ui-ux-designer': {
    critical: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Usability Testing', 'Information Architecture', 'User Journey Mapping', 'Interaction Design', 'UI Components'],
    recommended: ['Adobe XD', 'Micro-interactions', 'Accessibility (WCAG)', 'Design Tokens', 'Typography', 'Framer', 'User Personas', 'Responsive Design', 'Color Theory'],
  },
  'financial-analyst': {
    critical: ['Financial Modeling', 'DCF Valuation', 'Excel (VBA & Macros)', 'Financial Statements Analysis', 'Budgeting & Forecasting', 'Variance Analysis', 'Corporate Finance', 'Investment Analysis'],
    recommended: ['Power BI', 'SQL', 'Tableau', 'Bloomberg Terminal', 'CFA Level 1 Concepts', 'Risk Assessment', 'Portfolio Management', 'Ratio Analysis'],
  },
  'biomedical-specialist': {
    critical: ['Biomedical Instrumentation', 'Clinical Diagnostics', 'Medical Imaging', 'Bioinformatics', 'Physiology', 'FDA / Regulatory Compliance', 'Laboratory Protocols', 'Quality Assurance'],
    recommended: ['MATLAB', 'Python', 'Signal Processing', 'Genomics', 'Bio-MEMS', 'ISO 13485', 'Biostatistics', 'PCR Techniques'],
  },
};

const ACTION_VERBS = [
  'spearheaded', 'architected', 'engineered', 'developed', 'deployed', 'optimized',
  'streamlined', 'implemented', 'accelerated', 'orchestrated', 'built', 'designed',
  'reduced', 'increased', 'generated', 'transformed', 'delivered', 'automated'
];

export const resumeService = {
  /**
   * Evaluates raw resume text or structured tokens using NLP heuristics and ATS scoring formulas.
   */
  analyzeResume(resumeText: string, targetRole: string = 'ai-engineer'): ResumeAnalysisOutput {
    const text = resumeText || '';
    const lower = text.toLowerCase();
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // Contact info extraction heuristics
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const nameCandidate = words.slice(0, 3).join(' ');

    const domainConfig = DOMAIN_KEYWORDS[targetRole] || DOMAIN_KEYWORDS['ai-engineer'];

    // Keyword matching
    const matchedKeywords: string[] = [];
    const missingCriticalKeywords: string[] = [];
    const recommendedKeywords: string[] = [];

    domainConfig.critical.forEach((kw) => {
      if (lower.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw);
      } else {
        missingCriticalKeywords.push(kw);
      }
    });

    domainConfig.recommended.forEach((kw) => {
      if (lower.includes(kw.toLowerCase())) {
        if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
      } else {
        recommendedKeywords.push(kw);
      }
    });

    // Action verbs and quantifiable metrics search
    let actionVerbCount = 0;
    ACTION_VERBS.forEach((v) => {
      if (lower.includes(v)) actionVerbCount++;
    });

    const metricMatches = text.match(/\b\d+([.,]\d+)?(%|k|m|x|ms|fps|gb|tb|hrs)?\b/gi) || [];
    const metricsCount = metricMatches.length;

    // Section detection scores
    const hasContact = emailMatch && (phoneMatch || lower.includes('linkedin.com') || lower.includes('github.com')) ? 95 : emailMatch ? 70 : 40;
    const hasSummary = lower.includes('summary') || lower.includes('objective') || lower.includes('profile') || lower.includes('about') ? 90 : 50;
    const hasExperience = lower.includes('experience') || lower.includes('employment') || lower.includes('work history') || lower.includes('internship') ? 92 : 45;
    const hasSkills = lower.includes('skills') || lower.includes('technologies') || lower.includes('proficiencies') ? 95 : 40;
    const hasEducation = lower.includes('education') || lower.includes('degree') || lower.includes('university') || lower.includes('bachelor') || lower.includes('matric') || lower.includes('fsc') ? 90 : 50;
    const hasProjects = lower.includes('projects') || lower.includes('portfolio') || lower.includes('capstone') ? 92 : 45;

    const actionScore = Math.min(100, Math.round(actionVerbCount * 12 + metricsCount * 8));

    // Keyword density score
    const keywordCoverage = (matchedKeywords.length / (domainConfig.critical.length + domainConfig.recommended.length)) * 100;
    const technicalSkillsScore = Math.min(100, Math.round(keywordCoverage * 1.2 + (hasSkills > 80 ? 20 : 0)));

    // Weighted Overall ATS Score
    const sectionScores = {
      contactInfo: hasContact,
      professionalSummary: hasSummary,
      workExperience: hasExperience,
      technicalSkills: technicalSkillsScore,
      education: hasEducation,
      projectsAndPortfolio: hasProjects,
      actionVerbsAndMetrics: actionScore,
    };

    const overallScore = Math.min(
      98,
      Math.max(
        35,
        Math.round(
          sectionScores.contactInfo * 0.1 +
          sectionScores.professionalSummary * 0.1 +
          sectionScores.workExperience * 0.2 +
          sectionScores.technicalSkills * 0.3 +
          sectionScores.education * 0.1 +
          sectionScores.projectsAndPortfolio * 0.1 +
          sectionScores.actionVerbsAndMetrics * 0.1
        )
      )
    );

    let atsCompatibility: 'Excellent' | 'Good' | 'Needs Work' | 'Poor' = 'Needs Work';
    if (overallScore >= 85) atsCompatibility = 'Excellent';
    else if (overallScore >= 72) atsCompatibility = 'Good';
    else if (overallScore >= 55) atsCompatibility = 'Needs Work';
    else atsCompatibility = 'Poor';

    // Formulate strengths and suggestions
    const keyStrengths: string[] = [];
    const criticalIssues: string[] = [];
    const actionableImprovements: string[] = [];

    if (matchedKeywords.length >= 6) {
      keyStrengths.push(`Strong keyword alignment with ${matchedKeywords.length} verified technical competencies.`);
    }
    if (metricsCount >= 3) {
      keyStrengths.push(`Good utilization of quantitative impact metrics (${metricsCount} data points detected).`);
    }
    if (hasEducation >= 80 && hasContact >= 80) {
      keyStrengths.push('Clean fundamental layout with standard contact info and academic credentials.');
    }

    if (missingCriticalKeywords.length > 0) {
      criticalIssues.push(`Missing high-priority industry ATS keywords: ${missingCriticalKeywords.slice(0, 4).join(', ')}.`);
    }
    if (actionVerbCount < 3) {
      criticalIssues.push('Low usage of dynamic action verbs (spearheaded, engineered, optimized).');
    }
    if (metricsCount < 2) {
      actionableImprovements.push('Quantify your project outcomes: include % improvements, throughput numbers, or user adoption figures.');
    }
    if (hasProjects < 60) {
      actionableImprovements.push('Add a dedicated Projects section with GitHub links and tech stacks to showcase real portfolio evidence.');
    }
    if (wordCount < 250) {
      actionableImprovements.push(`Resume word count is low (${wordCount} words). Expand on responsibilities and project architecture to reach 400-600 words.`);
    }

    const bulletPointFeedback = [
      {
        original: 'Worked on building machine learning models for classification.',
        suggestion: 'Architected and deployed XGBoost & PyTorch classification pipelines, achieving 94.2% test accuracy and cutting inference latency by 35%.',
        reason: 'Uses active strong verb + specifies tech stack + quantifies real-world performance metric.',
      },
      {
        original: 'Responsible for frontend UI components and fixing bugs.',
        suggestion: 'Engineered 18+ reusable TypeScript React components adhering to WCAG AA accessibility standards, improving client page load speed by 28%.',
        reason: 'Transforms passive duty into demonstrable engineering accomplishment with quantifiable outcome.',
      },
    ];

    return {
      overallScore,
      atsCompatibility,
      wordCount,
      extractedName: nameCandidate.length > 3 ? nameCandidate : 'Applicant',
      extractedEmail: emailMatch ? emailMatch[0] : undefined,
      extractedPhone: phoneMatch ? phoneMatch[0] : undefined,
      extractedRole: targetRole,
      matchedKeywords,
      missingCriticalKeywords,
      recommendedKeywords: recommendedKeywords.slice(0, 8),
      sectionScores,
      keyStrengths: keyStrengths.length > 0 ? keyStrengths : ['Structured section headings detected.'],
      criticalIssues: criticalIssues.length > 0 ? criticalIssues : ['No critical parser blocking errors found.'],
      actionableImprovements: actionableImprovements.length > 0 ? actionableImprovements : ['Keep your resume regularly synchronized with new capstone project milestones.'],
      bulletPointFeedback,
    };
  },
};
