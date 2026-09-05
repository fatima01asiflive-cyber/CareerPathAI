const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

function fallbackReply(message, context) {
  const q = String(message || '').toLowerCase();
  const career = context?.career || 'your target career';
  const name = context?.name || 'Student';

  if (q.includes('85') || q.includes('threshold') || q.includes('score')) {
    return `Hi ${name}! The 85% decision rule means a score of 85% or above supports moving directly into the selected specialized track. Below 85%, CareerPath AI should recommend targeted foundation work before advanced progression.`;
  }
  if (q.includes('roadmap') || q.includes('next') || q.includes('learn')) {
    return `For ${career}, focus on the next incomplete roadmap milestone, then apply the concept in a small project. Keep your learning consistent and use the Projects area to turn roadmap progress into portfolio evidence.`;
  }
  if (q.includes('project') || q.includes('resume') || q.includes('portfolio')) {
    return `For ${career}, prioritize one strong, deployed project with a clear README, meaningful Git history, tests where appropriate, and a measurable outcome. Your Projects page contains the assigned capstone work.`;
  }
  if (q.includes('devops')) return 'DevOps combines development and operations. Start with Git and Linux, then Docker, CI/CD, cloud fundamentals, monitoring and automation.';
  if (q.includes('react')) return 'React is a component-based UI library. Learn components and JSX, props/state, hooks, routing, forms, API integration and testing.';
  if (q.includes('mongodb')) return 'MongoDB is a document database commonly used in MERN applications. Express/Node exposes APIs while React consumes them.';
  return `Great question, ${name}. I can guide you through ${career}, your roadmap, assessments, projects, resources, skills and study planning.`;
}

async function askGemini(payload) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const contents = [];
  for (const item of (payload.history || []).slice(-20)) {
    const role = item.role === 'model' ? 'model' : 'user';
    const text = String(item.content || '').trim();
    if (text) contents.push({ role, parts: [{ text }] });
  }
  contents.push({ role: 'user', parts: [{ text: String(payload.message || '') }] });

  const system = `You are IntelliPath AI Coach inside CareerPath AI.
Give practical, accurate career guidance for students. Use the student's context when useful.
Do not claim that you performed actions you did not perform. Do not invent university, certificate, job, salary, deadline or policy facts.
The app has Dashboard, Academic Journey, Career, Roadmap, Resources, Assessments, Courses, Projects, Notifications and Settings.
Mock Interview, Universities and Certificates are not core supported features; do not direct the user to them.
Respond in the requested language: ${payload.language || 'English'}.
Student context: ${JSON.stringify(payload.userContext || {})}.
Page context: ${payload.pageContext || 'chatbot'}.`;

  const body = {
    system_instruction: { parts: [{ text: system }] },
    contents,
    generationConfig: { temperature: 0.5, maxOutputTokens: 900 }
  };

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(DEFAULT_MODEL)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`Gemini HTTP ${response.status}`);
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim() || null;
}

exports.chat = async (req, res) => {
  try {
    const { message, history = [], userContext = {}, pageContext, language } = req.body || {};
    if (!message || typeof message !== 'string' || message.length > 4000) {
      return res.status(400).json({ success: false, message: 'A message up to 4000 characters is required.' });
    }

    let reply;
    try {
      reply = await askGemini({ message, history, userContext, pageContext, language });
    } catch (error) {
      console.warn('Gemini request failed:', error.message);
    }
    if (!reply) reply = fallbackReply(message, userContext);

    return res.json({
      success: true,
      reply,
      model: process.env.GEMINI_API_KEY ? DEFAULT_MODEL : 'local-fallback'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'AI Coach request failed.' });
  }
};
