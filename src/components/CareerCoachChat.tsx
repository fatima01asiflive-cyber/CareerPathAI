import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, TabType, UserAccount } from '../types';

interface CareerCoachChatProps {
  onNavigate: (tab: TabType) => void;
  isDarkMode: boolean;
  user?: UserAccount;
}

// Clean text: strip unwanted hashtags, social tags, and normalize whitespace
function sanitizeCoachText(raw: string): string {
  if (!raw) return '';
  return raw
    // Remove markdown heading hashtags at line starts (### Heading -> Heading)
    .replace(/^#{1,6}\s*/gm, '')
    // Remove inline hashtag markdown (e.g. ###)
    .replace(/#{1,6}/g, '')
    // Remove social-media style hashtags (#career, #coding, #ai, etc.)
    .replace(/#([a-zA-Z0-9_-]+)/g, '$1')
    // Normalize excessive newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const CareerCoachChat: React.FC<CareerCoachChatProps> = ({
  onNavigate,
  isDarkMode,
  user,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'coach',
      text: `Hello ${user?.name || 'there'}! I'm Coach Sarah, your AI Career Architect & Mentor.

I can guide you with high-precision technical advice on programming languages, choosing between AI vs Web Development, structuring your 4-month roadmap, optimizing your resume for ATS, and preparing for top-tier interviews.

What career challenge or goal would you like to explore today?`,
      timestamp: '09:30 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const coachAvatar =
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Clean up any ongoing TTS on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyText = (id: string, text: string) => {
    const cleanText = sanitizeCoachText(text);
    navigator.clipboard.writeText(cleanText);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleToggleSpeech = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMsgId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = sanitizeCoachText(text);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      utterance.onend = () => setSpeakingMsgId(null);
      utterance.onerror = () => setSpeakingMsgId(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingMsgId(id);
    }
  };

  const handleClearChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMsgId(null);
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'coach',
        text: `Chat session refreshed. Hello ${user?.name || 'there'}! What would you like to explore next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const getIntelligentFallbackReply = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('which programming language') || q.includes('language should i learn') || q.includes('best language')) {
      return `For 2026, here is the industry ranking based on market demand and modern software architecture:

1. **Python (Highest AI & Data Ecosystem)**
Master Python for Artificial Intelligence, Machine Learning (PyTorch, HuggingFace), Data Science, and rapid asynchronous backends (FastAPI).

2. **TypeScript (Modern Full-Stack Standard)**
Essential for scalable frontend interfaces with React 19 / Next.js and resilient Node.js microservices. TypeScript is currently the #1 language for production web engineering.

3. **C++ (High-Performance & System Foundations)**
Crucial for algorithmic problem solving, competitive programming, game engines, and low-latency financial systems.

4. **Go / Golang (Cloud Infrastructure)**
The fastest-growing language for Kubernetes, Docker services, and high-concurrency microservices.

*Key Strategy Recommendation:*
Start with **Python** to build strong algorithmic foundations and AI models, then master **TypeScript** for modern web applications!`;
    }

    if (q.includes('ai or web') || q.includes('choose ai') || q.includes('web development') || q.includes('web dev')) {
      return `Here is a clear, data-driven comparison to help you choose the right path:

• **Artificial Intelligence & Machine Learning:**
- *Core Strengths:* Best for students passionate about mathematical modeling, probability, linear algebra, and data patterns.
- *Key Technologies:* Python, PyTorch, Vector Embeddings (RAG), Scikit-Learn, Docker.
- *Market Compensation:* 42% annual industry growth with higher starting salary brackets ($800 - $1,600/mo entry remote).

• **Full-Stack Web Development:**
- *Core Strengths:* Best for creators who love building visible user-facing software, rapid feedback loops, and SaaS products.
- *Key Technologies:* React 19, TypeScript, Express, PostgreSQL, Tailwind CSS, AWS.
- *Market Openings:* Largest absolute volume of job openings across Pakistan, Gulf, and global remote markets.

*Pro-Tip for 2026:*
The most lucrative path is **AI Full-Stack Engineering**—building modern React applications powered by intelligent AI backends!`;
    }

    if (q.includes('data scientist') || q.includes('become a data scientist') || q.includes('data science')) {
      return `To become a top-tier Data Scientist in 2026, follow this structured 4-step roadmap:

1. **Step 1: Core Mathematical Foundations & Analytics**
Master Python (Pandas, NumPy), Advanced SQL (Window Functions, CTEs), Linear Algebra, and Statistical Inference.

2. **Step 2: Predictive Machine Learning**
Master Supervised and Unsupervised algorithms using Scikit-Learn (Random Forests, Gradient Boosting, XGBoost, Clustering).

3. **Step 3: Deep Learning & Neural Architectures**
Build deep neural networks and NLP pipelines using PyTorch and HuggingFace Transformers.

4. **Step 4: Real-World Portfolio & Production Delivery**
Deploy end-to-end data analytics pipelines with FastAPI and Streamlit, showcase code on GitHub, and publish case studies.`;
    }

    if (q.includes('resume') || q.includes('ats') || q.includes('cv')) {
      return `Here are the essential rules to guarantee a 90%+ score on Applicant Tracking Systems (ATS):

1. **Adopt a Single-Column Layout**
Avoid multi-column sidebars, floating tables, text boxes, and complex graphics that confuse ATS parsers.

2. **Apply the STAR Impact Formula**
Structure bullet points as: [Strong Action Verb] + [Specific Technology] + [Quantifiable Metric]
*Example:* "Engineered asynchronous REST APIs in FastAPI, reducing query latency by 42% for 15,000 active users."

3. **Include Verifiable Technical Keywords**
Ensure your skills match exact job descriptions (e.g., PyTorch, Docker, React, PostgreSQL, CI/CD).

*Instant Action:* Run your CV through our **AI Resume Analyzer** tab to check your exact ATS compatibility percentage!`;
    }

    if (q.includes('gpa') || q.includes('cgpa') || q.includes('marks')) {
      return `Here is how to maximize your career prospects regardless of your current CGPA:

1. **For CGPA 3.5+ (High Academic Standing)**
Highlight your academic merit for scholarship applications, foreign Master's admissions (Erasmus, Fulbright), and top-tier research labs.

2. **For CGPA Below 3.0 (Portfolio-First Strategy)**
Recruiters in modern tech prioritize demonstrable technical execution over GPA. Build 3 deployed capstone projects on GitHub with live URLs and verifiable test suites.

3. **Focus on Core Subject Grades**
Ensure top grades in Data Structures & Algorithms, Database Systems, and Operating Systems—these matter most during technical screening!`;
    }

    return `That is an important milestone in your career journey. Here is the recommended plan:

1. **Sharpen Core Technical Competencies**
Ensure your Data Structures, Algorithms, and System Architecture knowledge are rock-solid.

2. **Develop End-to-End Capstones**
Build 2-3 production-grade applications with public GitHub repositories, clean README documentation, and live deployed links.

3. **Validate Your Progress**
Visit our **Skill Gap & Matches** tab to evaluate missing skills and explore your tailored **4-Month Roadmap**!`;
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          history: messages.map((m) => ({ role: m.sender, content: m.text })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const rawReply = data.reply || getIntelligentFallbackReply(textToSend);
        const cleanReply = sanitizeCoachText(rawReply);

        const coachMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'coach',
          text: cleanReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, coachMsg]);
      } else {
        const fallbackReply = sanitizeCoachText(getIntelligentFallbackReply(textToSend));
        const coachMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'coach',
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, coachMsg]);
      }
    } catch (err) {
      const fallbackReply = sanitizeCoachText(getIntelligentFallbackReply(textToSend));
      const coachMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, coachMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateVoiceInput = () => {
    setIsVoiceRecording(true);
    setTimeout(() => {
      setIsVoiceRecording(false);
      handleSendMessage('Should I choose AI or Web Development for a high salary in 2026?');
    }, 1600);
  };

  // Helper to render inline formatting (bold, italic, code)
  const renderInlineFormattedText = (text: string) => {
    // Regex for bold **text**, code `text`, italic *text*
    const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

    return tokens.map((token, index) => {
      if (token.startsWith('**') && token.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-white tracking-wide">
            {token.slice(2, -2)}
          </strong>
        );
      }
      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 mx-0.5 rounded-md bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-mono text-xs"
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith('*') && token.endsWith('*')) {
        return (
          <span key={index} className="text-emerald-300 font-medium">
            {token.slice(1, -1)}
          </span>
        );
      }
      return token;
    });
  };

  // Structured Message Renderer with Clean Typography
  const renderMessageContent = (msg: ChatMessage) => {
    if (msg.sender === 'user') {
      return <p className="leading-relaxed font-normal">{msg.text}</p>;
    }

    const cleanText = sanitizeCoachText(msg.text);
    const lines = cleanText.split('\n');

    // Detect actionable quick links from content
    const lowerText = cleanText.toLowerCase();
    const showRoadmapLink = lowerText.includes('roadmap') || lowerText.includes('curriculum');
    const showResumeLink = lowerText.includes('resume') || lowerText.includes('ats') || lowerText.includes('cv');
    const showPrepLink = lowerText.includes('interview') || lowerText.includes('prep') || lowerText.includes('quiz');
    const showSkillLink = lowerText.includes('skill gap') || lowerText.includes('skills');
    const showJobsLink = lowerText.includes('salary') || lowerText.includes('job opening') || lowerText.includes('market');

    return (
      <div className="space-y-3">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Numbered item: e.g. "1. Python (Highest AI...)"
          const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          if (numberedMatch) {
            const num = numberedMatch[1];
            const content = numberedMatch[2];
            return (
              <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-1">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {num}
                </span>
                <div className="text-xs md:text-sm text-white/90 leading-relaxed flex-1">
                  {renderInlineFormattedText(content)}
                </div>
              </div>
            );
          }

          // Bullet item: e.g. "• Artificial Intelligence" or "- Text"
          if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('* ')) {
            const bulletContent = trimmed.replace(/^[•\-*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2.5 my-1 pl-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-2" />
                <div className="text-xs md:text-sm text-white/90 leading-relaxed flex-1">
                  {renderInlineFormattedText(bulletContent)}
                </div>
              </div>
            );
          }

          // Pro-Tip or Key Strategy Callout Box
          if (
            trimmed.toLowerCase().startsWith('*pro-tip') ||
            trimmed.toLowerCase().startsWith('*key strategy') ||
            trimmed.toLowerCase().startsWith('*recommendation') ||
            trimmed.toLowerCase().startsWith('pro-tip:') ||
            trimmed.toLowerCase().startsWith('key takeaway:')
          ) {
            return (
              <div
                key={idx}
                className="my-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-teal-950/40 border border-emerald-500/40 text-emerald-200 text-xs md:text-sm leading-relaxed shadow-sm flex items-start gap-2.5"
              >
                <span className="material-symbols-outlined text-emerald-400 text-lg shrink-0 mt-0.5">
                  lightbulb
                </span>
                <div className="flex-1 font-medium">
                  {renderInlineFormattedText(trimmed.replace(/^\*|\*$/g, ''))}
                </div>
              </div>
            );
          }

          // Standard paragraph
          return (
            <p key={idx} className="text-xs md:text-sm text-white/90 leading-relaxed">
              {renderInlineFormattedText(trimmed)}
            </p>
          );
        })}

        {/* Contextual Interactive Shortcut Chips */}
        {(showRoadmapLink || showResumeLink || showPrepLink || showSkillLink || showJobsLink) && (
          <div className="pt-3 mt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono text-emerald-400/80 font-bold uppercase tracking-wider">
              Recommended Next Step:
            </span>
            {showRoadmapLink && (
              <button
                onClick={() => onNavigate('roadmap')}
                className="px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-semibold transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">alt_route</span>
                <span>Open 4-Month Roadmap</span>
              </button>
            )}
            {showResumeLink && (
              <button
                onClick={() => onNavigate('resume-analyzer')}
                className="px-3 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">description</span>
                <span>Run Resume Analyzer</span>
              </button>
            )}
            {showPrepLink && (
              <button
                onClick={() => onNavigate('prep')}
                className="px-3 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-300 text-xs font-mono font-semibold transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">quiz</span>
                <span>Practice Technical Prep</span>
              </button>
            )}
            {showSkillLink && (
              <button
                onClick={() => onNavigate('skill-gap')}
                className="px-3 py-1 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">analytics</span>
                <span>View Skill Gap</span>
              </button>
            )}
            {showJobsLink && (
              <button
                onClick={() => onNavigate('salary-market')}
                className="px-3 py-1 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold transition-all flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">payments</span>
                <span>Explore Salary Benchmarks</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`p-4 md:p-8 max-w-4xl mx-auto pb-24 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
      {/* Coach Header Card */}
      <div className="glass-card p-5 md:p-6 border border-white/10 rounded-3xl mb-6 shadow-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={coachAvatar}
              alt="Coach Sarah"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-md shadow-emerald-500/20"
            />
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 absolute -bottom-0.5 -right-0.5 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-extrabold text-lg md:text-xl text-white tracking-tight">
                Coach Sarah
              </h2>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                AI Career Architect
              </span>
            </div>
            <p className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 mt-0.5">
              <span>● Online • Clean Formatting & Active Guidance</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl glass-card border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all text-xs flex items-center gap-1"
            title="Reset Chat Session"
          >
            <span className="material-symbols-outlined text-base">restart_alt</span>
            <span className="hidden sm:inline font-mono">Reset</span>
          </button>

          <button
            onClick={() => onNavigate('prep')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono font-bold transition-all shadow-md shadow-emerald-600/25"
          >
            <span className="material-symbols-outlined text-sm">record_voice_over</span>
            <span>Interview Prep</span>
          </button>
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="glass-card p-5 md:p-7 border border-white/10 rounded-3xl h-[500px] overflow-y-auto flex flex-col space-y-4 mb-4 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[92%] md:max-w-[85%] p-4 md:p-5 rounded-3xl text-xs md:text-sm leading-relaxed relative group ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none shadow-md shadow-emerald-600/20'
                  : 'bg-white/5 text-white/95 border border-white/10 rounded-bl-none shadow-sm backdrop-blur-md'
              }`}
            >
              {renderMessageContent(msg)}

              {/* Message Footer Controls for Coach Responses */}
              {msg.sender === 'coach' && (
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10 text-[11px] font-mono text-white/40">
                  <span>{msg.timestamp}</span>

                  <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleToggleSpeech(msg.id, msg.text)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        speakingMsgId === msg.id
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                      }`}
                      title={speakingMsgId === msg.id ? 'Stop Speaking' : 'Read Aloud'}
                    >
                      <span className="material-symbols-outlined text-xs">
                        {speakingMsgId === msg.id ? 'stop_circle' : 'volume_up'}
                      </span>
                    </button>

                    <button
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all flex items-center gap-1"
                      title="Copy message"
                    >
                      <span className="material-symbols-outlined text-xs">
                        {copiedMsgId === msg.id ? 'done' : 'content_copy'}
                      </span>
                      {copiedMsgId === msg.id && <span className="text-[10px] text-emerald-300">Copied!</span>}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <span className="text-[10px] font-mono text-white/40 mt-1 px-1">
                {msg.timestamp}
              </span>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2.5 text-xs text-emerald-400 font-mono font-medium p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl w-fit animate-pulse">
            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
            <span>Coach Sarah is formulating clean structured advice...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        <button
          onClick={() => handleSendMessage('Which programming language should I learn?')}
          className="px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 font-semibold text-xs whitespace-nowrap hover:bg-emerald-500/20 transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>💻</span>
          <span>Which programming language should I learn?</span>
        </button>
        <button
          onClick={() => handleSendMessage('Should I choose AI or Web Development?')}
          className="px-3.5 py-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 font-semibold text-xs whitespace-nowrap hover:bg-indigo-500/20 transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>⚖️</span>
          <span>Should I choose AI or Web Development?</span>
        </button>
        <button
          onClick={() => handleSendMessage('How can I become a Data Scientist?')}
          className="px-3.5 py-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 font-semibold text-xs whitespace-nowrap hover:bg-cyan-500/20 transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>📊</span>
          <span>How can I become a Data Scientist?</span>
        </button>
        <button
          onClick={() => handleSendMessage('How do I optimize my resume for ATS parsers?')}
          className="px-3.5 py-2 rounded-xl border border-white/15 bg-white/5 text-white/70 font-semibold text-xs whitespace-nowrap hover:bg-white/10 hover:text-white transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>📄</span>
          <span>ATS Resume Optimization</span>
        </button>
        <button
          onClick={() => handleSendMessage('How to maximize career opportunities with my current CGPA?')}
          className="px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 font-semibold text-xs whitespace-nowrap hover:bg-amber-500/20 transition-all shrink-0 flex items-center gap-1.5"
        >
          <span>🎯</span>
          <span>CGPA & Portfolio Strategy</span>
        </button>
      </div>

      {/* Chat Input Bar */}
      <div className="relative flex items-center gap-2">
        <input
          type="text"
          placeholder={isVoiceRecording ? 'Listening to your voice input...' : 'Ask Coach Sarah anything (e.g. languages, AI vs Web, ATS resume)...'}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="w-full h-14 pl-5 pr-28 rounded-2xl bg-transparent/80 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-medium placeholder:text-white/40"
        />

        <div className="absolute right-2 flex items-center gap-1">
          <button
            type="button"
            onClick={handleSimulateVoiceInput}
            className={`p-2.5 rounded-xl transition-all ${
              isVoiceRecording
                ? 'bg-rose-600 text-white animate-pulse'
                : 'text-white/60 hover:bg-white/10 hover:text-white'
            }`}
            title="Simulate Voice Input"
          >
            <span className="material-symbols-outlined text-xl">mic</span>
          </button>

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || loading}
            className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40 transition-all shadow-md shadow-emerald-600/30"
          >
            <span className="material-symbols-outlined text-xl">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
