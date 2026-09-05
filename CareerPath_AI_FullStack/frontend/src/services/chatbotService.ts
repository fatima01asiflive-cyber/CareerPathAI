import { ChatMessage, UserProfile } from '../types';

export type ChatLanguage = 'English' | 'Roman Urdu' | 'Urdu';

interface ChatOptions {
  pageContext?: string;
  language?: ChatLanguage;
}

export const CHATBOT_SUGGESTIONS = [
  'What should I learn next in my roadmap?',
  'How does the 85% aptitude decision rule work?',
  'What projects should I build for my resume?',
  'Which programming languages or tools are most in demand?',
  'How do I prepare for technical and behavioral interviews?',
  'How can I switch from non-tech to data science or UI/UX?',
  'Career guidance for Medicine & Health Sciences',
  'What foundation courses should I take if score is below 85%?',
];

export const chatbotService = {
  /**
   * Generates real AI responses via server-side /api/chat with full student context and history.
   */
  async generateResponse(
    message: string,
    user: UserProfile | null,
    history: ChatMessage[] = [],
    options: ChatOptions = {}
  ): Promise<ChatMessage> {
    const userName = user?.name || 'Student';
    const currentCareer = user?.recommendedCareerId
      ? user.recommendedCareerId.replace('-', ' ').toUpperCase()
      : 'SOFTWARE ENGINEERING';

    try {
      // Call backend API connected to Gemini API
      const res = await fetch('/api/aiguider/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: history.slice(-20).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
          pageContext: options.pageContext || 'chatbot',
          language: options.language || (/[؀-ۿ]/.test(message) ? 'Urdu' : /\b(kaise|kyun|kya|mujhe|mere|aap|batao|samjhao|hai|hain)\b/i.test(message) ? 'Roman Urdu' : 'English'),
          userContext: {
            name: userName,
            career: currentCareer,
            education: user?.educationLevel || 'Not provided',
            institution: user?.institution || 'Not provided',
            academicField: user?.academicField || user?.fscStream || 'Not provided',
            marksPercentage: user?.marksPercentage ?? 'Not provided',
            aptitudeScore: user?.aptitudeScore ?? 'Not assessed',
            interests: user?.interests || [],
            favoriteSubjects: user?.favoriteSubjects || '',
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.reply) {
          return {
            id: 'msg-' + Date.now(),
            sender: 'assistant',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestions: this.getDynamicSuggestions(message, currentCareer),
          };
        }
      }
    } catch (err) {
      console.warn('Network call to /api/chat failed, using client-side engine:', err);
    }

    // Client-side fallback if server is unreachable
    const lower = message.toLowerCase();
    let reply = '';
    let suggestions = [
      'Show my personalized 6-month roadmap',
      'What courses will boost my foundation?',
      'Tips for my next capstone project',
    ];

    if (
      lower.includes('kya') ||
      lower.includes('kaise') ||
      lower.includes('batao') ||
      lower.includes('urdu') ||
      lower.includes('karein')
    ) {
      reply = `Salam ${userName}! IntelliPath AI Coach main aapka khushamdeed. Aap **${currentCareer}** ya kisi doosray domain ke baray mein sawalat pooch sakte hain:\n\n• **Roadmap & Courses**: agla step kya hona chahiye?\n• **85% Rule**: agar score kam aye toh kya karein?\n• **Mock Interview**: interview ki tayyari kaise karein?\n• **Projects**: resume ke liye best projects kaunse hain?`;
      suggestions = [
        'Roadmap check karna hai',
        '85% threshold rule samjhao',
        'Mock interview ki tayyari',
      ];
    } else if (lower.includes('roadmap') || lower.includes('next') || lower.includes('learn')) {
      reply = `Hello ${userName}! Based on your profile and target track (**${currentCareer}**):\n\n1. **Current Priority**: Master foundational concepts and core architecture in your field.\n2. **Action Item**: Complete your scheduled phases in your [Roadmap](/roadmap) to unlock advanced capstone projects.\n3. **Practical Tip**: Practice consistently every week to maintain your learning verification streak!`;
      suggestions = ['Go to My Roadmap', 'View Recommended Courses', 'Start a Mock Interview'];
    } else if (lower.includes('interview') || lower.includes('prepare') || lower.includes('coding')) {
      reply = `Preparing for interviews requires a 3-part structured strategy:\n\n• **Technical Core (50%)**: Clarify problem constraints upfront and demonstrate structured problem-solving.\n• **Communication (30%)**: Explain your thought process out loud before writing final solutions.\n• **Behavioral (20%)**: Use the STAR method (Situation, Task, Action, Result) when discussing past experiences.\n\nPractice with instant AI feedback in our [Mock Interview Suite](/mock-interview)!`;
      suggestions = ['Practice Technical Interview', 'Practice System Design', 'Review Sample Answers'];
    } else if (lower.includes('project') || lower.includes('resume') || lower.includes('portfolio')) {
      reply = `For a standout resume in **${currentCareer}**, build distinct portfolio deliverables:\n\n1. **Full Production Application**: With clean authentication, responsive UI, and persistent storage.\n2. **Domain-Specific Innovation**: Solve a real problem in healthcare, finance, or automated tooling.\n3. **Clean Documentation**: Include architecture diagrams and clear deployment instructions.\n\nCheck your assigned projects in the [Projects Tab](/projects)!`;
      suggestions = ['View Assigned Projects', 'Check AI Project Review Rules', 'Project Guidelines'];
    } else if (lower.includes('85') || lower.includes('score') || lower.includes('threshold')) {
      reply = `Here is how the **85% Decision Logic** operates in IntelliPath:\n\n• **Score ≥ 85%**: Your diagnostic assessment strongly validates your selected career path! You proceed directly into your primary specialized track.\n• **Score < 85%**: We never discourage you! Your interest is completely valid, but your current foundation needs targeted reinforcement. We automatically prescribe 3–4 foundational bridge courses to get you fully prepared before advancing.`;
      suggestions = ['Retake Aptitude Assessment', 'View Foundation Courses', 'Check Category Breakdown'];
    } else if (lower.includes('recursion')) {
      reply = `**Recursion** is a technique where a function calls itself to solve a smaller version of the same problem. It needs a **base case** to stop. Example: factorial(5) = 5 × factorial(4), with factorial(1) = 1.`;
      suggestions = ['Show recursion with code', 'What is a base case?', 'Give me a recursion practice question'];
    } else if (lower.includes('binary search')) {
      reply = `**Binary search** works on sorted data. It checks the middle value and discards half of the remaining search space after each comparison. Its time complexity is **O(log n)**.`;
      suggestions = ['Show binary search code', 'Explain O(log n)', 'Give me a binary search question'];
    } else if (lower.includes('react') && (lower.includes('what is') || lower.includes('explain'))) {
      reply = `**React** is a JavaScript library for building user interfaces from reusable components. Learn components → JSX → props/state → events → hooks → routing → API integration.`;
      suggestions = ['Explain React state', 'What are React props?', 'React beginner roadmap'];
    } else if (lower.includes('html') && (lower.includes('what is') || lower.includes('explain'))) {
      reply = `**HTML** defines the structure of a web page using elements such as headings, paragraphs, links, images and forms. CSS controls presentation and JavaScript adds behavior.`;
      suggestions = ['Explain CSS', 'Explain JavaScript', 'HTML interview questions'];
    } else if (lower.includes('api') && (lower.includes('what is') || lower.includes('explain'))) {
      reply = `An **API** is a defined way for software systems to communicate. A web API receives an HTTP request such as GET or POST and returns data, often as JSON. React can call an Express API to read or update database data.`;
      suggestions = ['Explain REST API', 'GET vs POST', 'React API example'];
    } else if (lower.includes('mongodb')) {
      reply = `**MongoDB** is a NoSQL document database. It stores flexible JSON-like documents. In MERN, MongoDB stores data, Express/Node provides the API, and React provides the UI.`;
      suggestions = ['Explain MongoDB collections', 'MongoDB vs MySQL', 'MERN architecture'];
    } else if (lower.includes('devops')) {
      reply = `**DevOps** combines development and operations practices for reliable software delivery. Core topics are Git, Linux, Docker, CI/CD, cloud, monitoring and automation.`;
      suggestions = ['Explain Docker', 'What is CI/CD?', 'DevOps beginner roadmap'];
    } else if (lower.includes('cgpa') || lower.includes('gpa')) {
      reply = `To improve your **CGPA**, prioritize your weakest subjects, use active recall, solve past papers, track every assessment mark, and review mistakes weekly. Share your subjects and marks if you want a specific plan.`;
      suggestions = ['Make me a weekly study plan', 'How does CGPA calculation work?', 'How can I improve in one semester?'];
    } else {
      reply = `Great question, ${userName}! In **${currentCareer}**, consistent progression through structured coursework and hands-on deliverables delivers proven career results.\n\nFeel free to ask for step-by-step guidance on any Computer Science topic, syllabus breakdown, or technical concept!`;
      suggestions = [
        'Explore Multi-Domain Careers',
        'Review My Strengths & Growth Areas',
        'Open Mock Interview',
      ];
    }

    return {
      id: 'msg-' + Date.now(),
      sender: 'assistant',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions,
    };
  },

  getDynamicSuggestions(query: string, career: string): string[] {
    const q = query.toLowerCase();
    if (q.includes('roadmap') || q.includes('next')) {
      return ['Go to My Roadmap', 'What courses should I take next?', 'How to track milestone progress?'];
    }
    if (q.includes('interview')) {
      return ['Start Technical Mock Interview', 'Behavioral Interview Tips', 'System Design questions'];
    }
    if (q.includes('project')) {
      return ['View Assigned Projects', 'How will AI grade my project?', 'How to link GitHub repo'];
    }
    return [
      `What skills are needed for ${career}?`,
      'Explain the 85% assessment rule',
      'Recommend top learning resources',
    ];
  },
};
