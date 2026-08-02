import React, { useState } from 'react';
import { glossaryData } from '../data/glossaryData';
import { X, Search, FileText, Sparkles, BookOpen } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTermForAI: (term: string) => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  onSelectTermForAI,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'System & Architecture', 'Philosophy & Organic', 'Economy & A2A', 'Trading & B2B'];

  const filteredTerms = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.termKo.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-100 rounded-2xl w-full max-w-3xl max-h-[85vh] shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-scale-up">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">OAE 학술 용어 사전 (Glossary)</h2>
              <p className="text-xs text-slate-400">AI 패러다임 6부작의 핵심 개념 및 기술 사양</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
            <input 
              type="text"
              placeholder="용어, 한글명, 정의 검색 (예: Mamba, A2A, Proof of Humanity)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-hidden focus:border-emerald-500 placeholder-slate-500"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'All' ? '전체 보기' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              검색 조건에 맞는 용어가 없습니다.
            </div>
          ) : (
            filteredTerms.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-base text-emerald-400">{item.term}</span>
                      <span className="text-xs text-slate-400 font-medium">({item.termKo})</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2">
                  {item.definition}
                </p>

                {item.example && (
                  <div className="text-xs text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/80 font-mono">
                    <span className="text-emerald-500 font-bold">예시: </span>
                    {item.example}
                  </div>
                )}

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex justify-end">
                  <button
                    onClick={() => {
                      onSelectTermForAI(`'${item.term}(${item.termKo})' 개념과 심층적 비즈니스 적용 사례를 알려줘.`);
                      onClose();
                    }}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 font-medium"
                  >
                    <Sparkles size={13} />
                    <span>AI 자문에게 심층 질문하기</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
