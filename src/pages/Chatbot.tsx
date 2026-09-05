import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { chatbotService, CHATBOT_SUGGESTIONS } from '../services/chatbotService';
import { ChatMessage } from '../types';
import { Button } from '../components/Button';
import { CAREER_TRACKS } from '../data/careers';
import { 
  Bot, Sparkles, Download, Trash2, 
  ArrowUpRight, Mic, MicOff, Volume2, 
  VolumeX, Copy, Check, Send, Search,
  Briefcase, BookOpen, User, LineChart
} from 'lucide-react';

export const Chatbot: React.FC = () => {
  const { user, selectedCareer } = useAuth();
  
  const [selectedDomain, setSelectedDomain] = useState<string>(
    selectedCareer?.name || 'Software Engineering'
  );

  const initialMessage = {
    id: 'welcome',
    sender: 'assistant',
    text: `Hello ${user?.name || 'there'}! 👋 I am your **IntelliPath AI Coach**.\n\nI provide personalized guidance across all educational fields — Technology & Software, Medicine & Health, Business & Finance, Engineering, and Arts & Design.\n\nI can help you with:\n• **Personalized Learning Roadmaps** & Next Steps\n• **85% Decision Rule** & Foundation Bridge Recommendations\n• **Course-Specific Resources** (YouTube, Docs & Practice)\n• **Assigned Projects & Capstone Deliverables** Guidance\n• What skills to learn and how to improve your aptitude score!\n\nWhat would you like to explore today?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestions: [
      'What should I learn next in my roadmap?',
      'How does the 85% score threshold rule work?',
      'What projects should I build for my resume?',
      'Kaise prepare karein interview ke liye?',
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage as ChatMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Speech recognition error:', err);
        setIsListening(false);
      }
    }
  };

  const handleSpeak = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_\`~•[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingId(null);

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputValue('');
    setIsTyping(true);

    const botReply = await chatbotService.generateResponse(
      text,
      {
        ...user,
        recommendedCareerId: selectedDomain.toLowerCase().replace(/\s+/g, '-'),
      } as any,
      newHistory
    );

    setIsTyping(false);
    setMessages((prev) => [...prev, botReply]);
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingId(null);
    setMessages([
      {
        id: 'cleared',
        sender: 'assistant',
        text: `Chat reset. I am ready to guide you in **${selectedDomain}**. What topic or question would you like to discuss?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: CHATBOT_SUGGESTIONS.slice(0, 4),
      },
    ]);
  };

  const handleExportChat = () => {
    const chatText = messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'user' ? 'You' : 'Coach'}:\n${m.text}\n`)
      .join('\n---\n\n');
    const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intellipath-chat-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className={line.trim() === '' ? 'h-2' : 'leading-relaxed'}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="text-white font-bold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
              const before = part.slice(0, linkMatch.index);
              const linkText = linkMatch[1];
              const linkUrl = linkMatch[2];
              const after = part.slice((linkMatch.index || 0) + linkMatch[0].length);
              return (
                <span key={pIdx}>
                  {before}
                  <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 font-semibold underline hover:text-sky-300 transition-colors inline-flex items-center gap-0.5"
                  >
                    {linkText}
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  {after}
                </span>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] bg-[#212121] -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 font-sans">
      
      {/* Top Header - Model/Domain Selector */}
      <header className="h-14 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 bg-[#212121]/95 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <span className="text-[#b4b4b4] text-sm font-medium">Domain:</span>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="bg-transparent text-[#ececec] text-sm font-semibold focus:outline-none cursor-pointer hover:bg-[#2f2f2f] px-2 py-1.5 rounded-lg transition-colors appearance-none"
            style={{ WebkitAppearance: 'none' }}
          >
            {CAREER_TRACKS.map((c) => (
              <option key={c.id} value={c.name} className="bg-[#2f2f2f] text-white">
                {c.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={handleExportChat}
            className="p-2 rounded-lg text-[#b4b4b4] hover:text-[#ececec] hover:bg-[#2f2f2f] transition-colors"
            title="Download conversation"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleClearChat}
            className="p-2 rounded-lg text-[#b4b4b4] hover:text-[#ececec] hover:bg-[#2f2f2f] transition-colors"
            title="New Chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-0 py-6 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSpeakingThis = speakingId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-full sm:max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-5 h-5 text-black" />
                    </div>
                  )}

                  {/* Message Content */}
                  <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}>
                    <div
                      className={`text-[15px] leading-7 px-5 py-3 ${
                        isUser
                          ? 'bg-[#2f2f2f] text-[#ececec] rounded-3xl'
                          : 'bg-transparent text-[#ececec]'
                      }`}
                    >
                      <div className="space-y-3 font-sans break-words whitespace-pre-wrap">
                        {renderFormattedText(msg.text)}
                      </div>
                    </div>

                    {/* Quick Reply Chips (Assistant only) */}
                    {!isUser && msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 ml-2">
                        {msg.suggestions.map((sug, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSendMessage(sug)}
                            className="px-4 py-2 rounded-2xl bg-transparent border border-[#565869] hover:bg-[#2f2f2f] text-sm text-[#ececec] transition-colors"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons (Assistant only) */}
                    {!isUser && (
                      <div className="flex items-center gap-1 mt-2 ml-2">
                        <button
                          type="button"
                          onClick={() => handleSpeak(msg.text, msg.id)}
                          className={`p-1.5 rounded-lg hover:bg-[#2f2f2f] transition-colors ${
                            isSpeakingThis ? 'text-white' : 'text-[#b4b4b4]'
                          }`}
                          title="Read aloud"
                        >
                          {isSpeakingThis ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.text, msg.id)}
                          className="p-1.5 rounded-lg hover:bg-[#2f2f2f] text-[#b4b4b4] hover:text-white transition-colors"
                          title="Copy"
                        >
                          {copiedId === msg.id ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {isTyping && (
            <div className="flex w-full justify-start">
              <div className="flex gap-4 max-w-[85%] flex-row">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
                  <Sparkles className="w-5 h-5 text-black animate-pulse" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="text-[15px] leading-7 px-2 py-3 bg-transparent text-[#b4b4b4] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#b4b4b4] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#b4b4b4] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#b4b4b4] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input Area */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-0 pb-6 pt-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative bg-[#2f2f2f] rounded-[26px] shadow-sm focus-within:ring-1 focus-within:ring-[#565869] transition-shadow overflow-hidden"
        >
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Message Coach..."
            className="w-full bg-transparent text-[15px] text-[#ececec] placeholder-[#b4b4b4] focus:outline-none px-5 py-4 pr-24 resize-none max-h-[200px] custom-scrollbar"
            rows={1}
            style={{ height: inputValue ? 'auto' : '56px', minHeight: '56px' }}
          />
          <div className="absolute right-3 bottom-2.5 flex items-center gap-1">
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2 rounded-full transition-colors ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'text-[#b4b4b4] hover:text-[#ececec] hover:bg-[#424242]'
              }`}
              title="Voice input"
            >
              {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`p-2 rounded-full flex items-center justify-center transition-colors ${
                !inputValue.trim() || isTyping
                  ? 'bg-[#424242] text-[#676767] cursor-not-allowed'
                  : 'bg-white hover:bg-gray-200 text-black'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          <span className="text-xs text-[#b4b4b4]">
            AI can make mistakes. Consider verifying important information.
          </span>
        </div>
      </div>
    </div>
  );
};
