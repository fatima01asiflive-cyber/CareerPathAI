import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { chatbotService, CHATBOT_SUGGESTIONS, ChatLanguage } from '../../services/chatbotService';
import { ChatMessage } from '../../types';
import { addActivityTime, formatActivityTime, getActivityTime } from '../../utils/activityTimeTracker';
import {
  Bot, Send, X, Sparkles, Trash2, Copy, Check, Maximize2, Minimize2,
  Mic, Volume2, VolumeX
} from 'lucide-react';

export const FloatingCareerCoach: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [language, setLanguage] = useState<ChatLanguage>('English');
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const [activitySeconds, setActivitySeconds] = useState(() => getActivityTime().chatbot);

  useEffect(() => {
    if (!messages.length) {
      setMessages([{
        id: 'welcome',
        sender: 'assistant',
        text: `Hello ${user?.name || 'there'}! 👋 I am your **CareerPath AI Coach**. Ask me anything. I answer Computer Science and technical-career questions, and can guide you through your roadmap, academics, assessments and resources.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: CHATBOT_SUGGESTIONS.slice(0, 4),
      }]);
    }
  }, [user?.name]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        addActivityTime('chatbot', 1);
        setActivitySeconds((v) => v + 1);
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) return;
    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript;
      if (transcript) setInput((prev) => prev ? `${prev} ${transcript}` : transcript);
    };
    recognition.onend = () => {};
    recognitionRef.current = recognition;
  }, []);

  const send = async (value?: string) => {
    const text = (value ?? input).trim();
    if (!text || typing) return;
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInput('');
    setTyping(true);
    const reply = await chatbotService.generateResponse(text, user, nextHistory, {
      pageContext: location.pathname,
      language,
    });
    setTyping(false);
    setMessages((prev) => [...prev, reply]);
  };

  const speak = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[*#_`~•[\]()]/g, ''));
    utterance.onend = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const startVoice = () => {
    if (!recognitionRef.current) return;
    try { recognitionRef.current.start(); } catch {}
  };

  const copy = async (text: string, id: string) => {
    try { await navigator.clipboard.writeText(text); } catch {}
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1500);
  };

  if (!user) return null;

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open CareerPath AI Coach"
          title="CareerPath AI Coach"
          className="fixed right-5 bottom-5 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-violet-600 text-white shadow-2xl shadow-sky-500/30 flex items-center justify-center hover:scale-110 transition-transform border border-white/20"
        >
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          <div className={`pointer-events-auto absolute right-4 bottom-4 sm:right-6 sm:bottom-6 h-[min(760px,calc(100vh-2rem))] ${
            expanded ? 'w-[min(900px,calc(100vw-2rem))]' : 'w-[min(460px,calc(100vw-2rem))]'
          } bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col`}>
            <header className="p-4 border-b border-slate-800 bg-slate-950/95 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-white truncate">CareerPath AI Coach</h2>
                  <p className="text-[10px] text-slate-500 truncate">Context: {location.pathname}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[9px] font-bold text-sky-300">ENG</span>
                  <span className="text-[8px] text-slate-600">•</span>
                  <span className="text-[8px] text-slate-500">Roman/Urdu coming soon</span>
                </div>
                <button onClick={() => setExpanded((v) => !v)} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-900" title="Resize">
                  {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setMessages([])} className="p-2 rounded-lg text-slate-500 hover:text-rose-300 hover:bg-slate-900" title="Clear chat">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-900" title="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-10">
                  <Sparkles className="w-8 h-8 text-sky-400 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white">Chat cleared</p>
                  <button onClick={() => setMessages([{
                    id: 'welcome-reset',
                    sender: 'assistant',
                    text: 'I am ready. What would you like to work on?',
                    timestamp: 'Now',
                    suggestions: CHATBOT_SUGGESTIONS.slice(0, 4),
                  }])} className="mt-3 text-xs text-sky-400">Start again</button>
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${m.sender === 'user' ? 'bg-sky-600 text-white rounded-tr-sm' : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-sm'}`}>
                    <div className="whitespace-pre-wrap">{m.text}</div>
                    {m.sender !== 'user' && (
                      <div className="mt-3 flex items-center gap-1 border-t border-slate-800 pt-2">
                        <button onClick={() => speak(m.text, m.id)} className="p-1.5 text-slate-500 hover:text-sky-400" title="Read aloud">
                          {speakingId === m.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => copy(m.text, m.id)} className="p-1.5 text-slate-500 hover:text-white" title="Copy">
                          {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                    {m.suggestions && m.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {m.suggestions.slice(0, 4).map((s) => (
                          <button key={s} onClick={() => send(s)} className="px-2.5 py-1.5 rounded-lg bg-slate-950/70 border border-slate-700 text-[10px] text-sky-300 hover:border-sky-500/40">
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && <div className="text-xs text-sky-400">CareerPath AI is thinking…</div>}
              <div ref={endRef} />
            </div>

            <div className="px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
              <span>Chat time: {formatActivityTime(activitySeconds)}</span>
              <span>Context-aware assistance</span>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t border-slate-800 flex gap-2">
              <div className="relative flex-1">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-3 pr-11 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500"
                />
                <button type="button" onClick={startVoice} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-sky-400" title="Voice input">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              <button type="submit" disabled={!input.trim() || typing} className="px-4 rounded-xl bg-sky-500 text-slate-950 font-bold disabled:opacity-40">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
