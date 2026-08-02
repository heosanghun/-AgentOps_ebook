import React, { useState } from 'react';
import { Book } from '../types';
import { 
  BookOpen, ChevronRight, ChevronDown, Search, X, 
  Bookmark, Sparkles, Layers, HelpCircle, FileText, CheckCircle2
} from 'lucide-react';

interface SidebarProps {
  books: Book[];
  activeBookId: string;
  activeChapterId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (bookId: string, chapterId: string) => void;
  onOpenGlossary: () => void;
  onOpenDiagrams: () => void;
  onOpenAIAssistant: () => void;
  onOpenBookmarks: () => void;
  onOpenQuiz: () => void;
  completedChapters: string[]; // List of 'bookId:chapterId'
  bookmarksCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  books,
  activeBookId,
  activeChapterId,
  isOpen,
  onClose,
  onSelectChapter,
  onOpenGlossary,
  onOpenDiagrams,
  onOpenAIAssistant,
  onOpenBookmarks,
  onOpenQuiz,
  completedChapters,
  bookmarksCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBooks, setExpandedBooks] = useState<Record<string, boolean>>({
    organic: true,
    world_model: true,
    machine_economy: false,
    cognitive: false,
    autonomous_exec: false,
    platform_paradox: false,
    appendix: true,
  });

  const toggleBook = (bookId: string) => {
    setExpandedBooks(prev => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  // Filter books/chapters by search
  const filteredBooks = books.map(book => {
    if (!searchQuery.trim()) return book;

    const query = searchQuery.toLowerCase();
    const matchesBookTitle = book.title.toLowerCase().includes(query) || book.subtitle.toLowerCase().includes(query);
    const matchingChapters = book.chapters.filter(
      ch => ch.title.toLowerCase().includes(query) || ch.content.toLowerCase().includes(query)
    );

    if (matchesBookTitle || matchingChapters.length > 0) {
      return {
        ...book,
        chapters: matchingChapters.length > 0 ? matchingChapters : book.chapters,
      };
    }
    return null;
  }).filter(Boolean) as Book[];

  // Total reading progress calculation
  const totalChaptersCount = books.reduce((acc, b) => acc + b.chapters.length, 0);
  const readChaptersCount = completedChapters.length;
  const progressPercent = Math.min(100, Math.round((readChaptersCount / Math.max(1, totalChaptersCount)) * 100));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-xs" 
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-80 bg-[#111111] text-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl md:shadow-none border-r border-white/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <BookOpen size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-bold text-white text-base tracking-tight leading-none">OAE Reader</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-1">Organic Autonomous Entity</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Global Reading Progress */}
        <div className="px-5 py-3 border-b border-slate-800/60 bg-slate-900/80">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-medium">
            <span>전체 완독률</span>
            <span className="text-amber-400 font-semibold">{progressPercent}% ({readChaptersCount}/{totalChaptersCount} 챕터)</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Quick Tools Bar */}
        <div className="grid grid-cols-4 gap-1 p-2 bg-slate-950/40 border-b border-slate-800 text-[11px] font-medium">
          <button
            onClick={onOpenAIAssistant}
            className="flex flex-col items-center justify-center p-2 rounded-lg text-indigo-300 hover:bg-indigo-950/50 hover:text-indigo-200 transition-colors"
            title="AI 자문 박사 Q&A"
          >
            <Sparkles size={16} className="mb-1 text-indigo-400" />
            <span>AI 자문</span>
          </button>
          <button
            onClick={onOpenGlossary}
            className="flex flex-col items-center justify-center p-2 rounded-lg text-emerald-300 hover:bg-emerald-950/50 hover:text-emerald-200 transition-colors"
            title="학술 사전"
          >
            <FileText size={16} className="mb-1 text-emerald-400" />
            <span>사전</span>
          </button>
          <button
            onClick={onOpenDiagrams}
            className="flex flex-col items-center justify-center p-2 rounded-lg text-amber-300 hover:bg-amber-950/50 hover:text-amber-200 transition-colors"
            title="인포그래픽 도해"
          >
            <Layers size={16} className="mb-1 text-amber-400" />
            <span>도해</span>
          </button>
          <button
            onClick={onOpenBookmarks}
            className="flex flex-col items-center justify-center p-2 rounded-lg text-rose-300 hover:bg-rose-950/50 hover:text-rose-200 transition-colors relative"
            title="북마크 & 형광펜 노트"
          >
            <Bookmark size={16} className="mb-1 text-rose-400" />
            <span>노트</span>
            {bookmarksCount > 0 && (
              <span className="absolute top-1 right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {bookmarksCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 border-b border-slate-800">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-2.5 text-slate-500" />
            <input 
              type="text"
              placeholder="권/챕터/본문 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 text-xs pl-9 pr-8 py-2 rounded-lg border border-slate-800 focus:outline-hidden focus:border-indigo-500 placeholder-slate-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Books & Chapters List */}
        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar space-y-1">
          {filteredBooks.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            filteredBooks.map((book) => {
              const isBookExpanded = expandedBooks[book.id] || !!searchQuery;
              const isCurrentBook = activeBookId === book.id;

              return (
                <div key={book.id} className="px-2">
                  <button 
                    onClick={() => toggleBook(book.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all group ${
                      isCurrentBook ? 'bg-slate-800/80 text-white' : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md shrink-0 ${
                        book.color === 'emerald' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50' :
                        book.color === 'indigo' ? 'bg-indigo-950/80 text-indigo-400 border border-indigo-800/50' :
                        book.color === 'amber' ? 'bg-amber-950/80 text-amber-400 border border-amber-800/50' :
                        book.color === 'purple' ? 'bg-purple-950/80 text-purple-400 border border-purple-800/50' :
                        book.color === 'blue' ? 'bg-blue-950/80 text-blue-400 border border-blue-800/50' :
                        book.color === 'rose' ? 'bg-rose-950/80 text-rose-400 border border-rose-800/50' :
                        'bg-sky-950/80 text-sky-400 border border-sky-800/50'
                      }`}>
                        {book.volumeNumber === 0 ? '부록' : `${book.volumeNumber}권`}
                      </span>
                      <span className="font-semibold text-xs tracking-tight truncate">
                        {book.title.replace(/^제\d+권:\s*/, '')}
                      </span>
                    </div>
                    {isBookExpanded ? (
                      <ChevronDown size={15} className="text-slate-500 shrink-0" />
                    ) : (
                      <ChevronRight size={15} className="text-slate-500 shrink-0 group-hover:text-slate-300" />
                    )}
                  </button>

                  {/* Chapters Subtree */}
                  {isBookExpanded && (
                    <div className="mt-1 ml-3 pl-2 border-l border-slate-800 space-y-0.5">
                      {book.chapters.map((chapter) => {
                        const isChapterActive = isCurrentBook && activeChapterId === chapter.id;
                        const isRead = completedChapters.includes(`${book.id}:${chapter.id}`);

                        return (
                          <button
                            key={chapter.id}
                            onClick={() => onSelectChapter(book.id, chapter.id)}
                            className={`w-full text-left px-3 py-2 text-xs transition-all flex items-center justify-between group ${
                              isChapterActive 
                                ? 'bg-indigo-600/20 text-indigo-200 font-semibold border-l-2 border-indigo-500 pl-3' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5 rounded-md'
                            }`}
                          >
                            <span className="truncate pr-2">{chapter.title}</span>
                            {isRead && (
                              <CheckCircle2 size={13} className={isChapterActive ? 'text-indigo-400' : 'text-emerald-500'} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Credit */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-500">
          <span>OAE Master Edition</span>
          <button 
            onClick={onOpenQuiz}
            className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 font-medium"
          >
            <HelpCircle size={13} />
            <span>이해도 퀴즈</span>
          </button>
        </div>
      </aside>
    </>
  );
};
