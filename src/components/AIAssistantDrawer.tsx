import React, { useState, useRef, useEffect } from 'react';
import { Book, Chapter, ChatMessage } from '../types';
import { X, Send, Sparkles, Bot, User, RefreshCw, Copy, Check, MessageSquare } from 'lucide-react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentBook?: Book;
  currentChapter?: Chapter;
  initialQuery?: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  currentBook,
  currentChapter,
  initialQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `반갑습니다. **OAE AI 자문 박사**입니다.\n\n『오가닉 자율 기업(OAE)』과 **AI 패러다임 6부작**의 학술적 철학, 세계 모델, A2A 기계 경제, 또는 현재 읽고 계신 **[${currentChapter?.title || '본문'}]**에 대해 무엇이든 물어보십시오.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested prompt chips
  const promptChips = [
    '이 챕터 핵심 3줄 요약해줘',
    'OAE의 3각 편대(Quant, Bio, Tech) 구도란?',
    'Mamba와 FiLM의 결합 원리는?',
    '왜 비효율(오가닉)이 최고의 럭셔리가 되나요?',
  ];

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          bookTitle: currentBook?.title,
          chapterTitle: currentChapter?.title,
          chapterContext: currentChapter?.content,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || '답변을 가져오지 못했습니다.');
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: `⚠️ 오류가 발생했습니다: ${err.message || 'Gemini API 호출 실패'}. 관리자 설정의 Secrets에 GEMINI_API_KEY가 등록되어 있는지 확인해 주세요.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-slate-900 text-slate-100 shadow-2xl border-l border-slate-800 flex flex-col animate-slide-left">
      {/* Drawer Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center space-x-1.5">
              <span>OAE AI 자문 박사</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 font-semibold">Gemini 3.6</span>
            </h3>
            <p className="text-[11px] text-slate-400">학술 철학 & 전략 자문 AI</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Chapter Context Banner */}
      {currentChapter && (
        <div className="px-4 py-2 bg-indigo-950/40 border-b border-indigo-900/50 text-xs text-indigo-200 flex items-center space-x-2">
          <MessageSquare size={13} className="text-indigo-400 shrink-0" />
          <span className="truncate">참조 중: <strong className="text-white">{currentChapter.title}</strong></span>
        </div>
      )}

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-br-none'
                : 'bg-slate-800/90 text-slate-100 border border-slate-700/80 rounded-bl-none shadow-md'
            }`}>
              <div className="flex justify-between items-center mb-1.5 text-[10px] opacity-70">
                <span className="font-semibold">{msg.sender === 'user' ? '나' : 'OAE AI Doctor'}</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Render formatting */}
              <div className="whitespace-pre-wrap space-y-2">
                {msg.text.split('\n\n').map((para, i) => (
                  <p key={i}>
                    {para.split('**').map((part, j) => 
                      j % 2 === 1 ? <strong key={j} className="font-bold text-amber-300">{part}</strong> : part
                    )}
                  </p>
                ))}
              </div>

              {msg.sender === 'assistant' && (
                <div className="mt-3 pt-2 border-t border-slate-700/60 flex justify-end">
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="text-[10px] text-slate-400 hover:text-white flex items-center space-x-1"
                  >
                    {copiedId === msg.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>복사</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 text-xs text-slate-300 flex items-center space-x-2">
              <RefreshCw size={14} className="animate-spin text-indigo-400" />
              <span>세계 모델 및 OAE 백과 지식을 분석 중입니다...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Prompt Chips */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 overflow-x-auto flex space-x-2 no-scrollbar">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-indigo-950 hover:text-indigo-200 text-[11px] text-slate-300 border border-slate-700/60 transition-all shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
        <input 
          type="text"
          placeholder="OAE 철학, 기술 구조 질문을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 bg-slate-900 text-slate-100 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-hidden focus:border-indigo-500 placeholder-slate-500"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-md shadow-indigo-950"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
