import React, { useState, useEffect, useRef } from 'react';
import { Book, Chapter, ReaderSettings, Highlight } from '../types';
import { 
  ChevronLeft, ChevronRight, Bookmark, Sparkles, Highlighting, 
  Copy, Check, Share2, Clock, FileText, CheckCircle2, MessageSquare, Plus, Lightbulb
} from 'lucide-react';

interface ReaderViewProps {
  currentBook: Book;
  currentChapter: Chapter;
  settings: ReaderSettings;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  hasPrevChapter: boolean;
  hasNextChapter: boolean;
  onAddHighlight: (highlight: Omit<Highlight, 'id' | 'createdAt'>) => void;
  onAskAIWithSelection: (selectedText: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isChapterCompleted: boolean;
  onToggleCompleted: () => void;
  onOpenNoteModal: () => void;
  chapterNote?: string;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  currentBook,
  currentChapter,
  settings,
  onPrevChapter,
  onNextChapter,
  hasPrevChapter,
  hasNextChapter,
  onAddHighlight,
  onAskAIWithSelection,
  isBookmarked,
  onToggleBookmark,
  isChapterCompleted,
  onToggleCompleted,
  onOpenNoteModal,
  chapterNote,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedText, setSelectedText] = useState('');
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto scroll feature
  useEffect(() => {
    if (!settings.autoScrollSpeed || settings.autoScrollSpeed <= 0) return;

    const speedMs = settings.autoScrollSpeed === 1 ? 50 : settings.autoScrollSpeed === 2 ? 30 : 15;
    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop += 1;
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [settings.autoScrollSpeed]);

  // Handle scroll progress
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll > 0) {
      setScrollProgress(Math.round((scrollTop / totalScroll) * 100));
    }
  };

  // Text selection popover for highlighting and asking AI
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setPopoverPos(null);
      setSelectedText('');
      return;
    }

    const text = selection.toString().trim();
    if (text.length > 2) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text);
      setPopoverPos({
        top: rect.top - 50,
        left: rect.left + rect.width / 2 - 120,
      });
    } else {
      setPopoverPos(null);
      setSelectedText('');
    }
  };

  const handleHighlight = (color: Highlight['color']) => {
    if (!selectedText) return;
    onAddHighlight({
      bookId: currentBook.id,
      chapterId: currentChapter.id,
      chapterTitle: currentChapter.title,
      selectedText,
      color,
    });
    setPopoverPos(null);
    window.getSelection()?.removeAllRanges();
  };

  const handleAskAI = () => {
    if (!selectedText) return;
    onAskAIWithSelection(selectedText);
    setPopoverPos(null);
    window.getSelection()?.removeAllRanges();
  };

  const handleCopyText = () => {
    if (!selectedText) return;
    navigator.clipboard.writeText(selectedText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setPopoverPos(null);
      window.getSelection()?.removeAllRanges();
    }, 1200);
  };

  // Compute theme styles
  const getThemeContainerStyles = () => {
    switch (settings.theme) {
      case 'dark':
        return 'bg-[#111111] text-slate-200';
      case 'oled':
        return 'bg-black text-slate-200';
      case 'sepia':
        return 'bg-[#FAF4E8] text-[#2C221E]';
      case 'light':
      default:
        return 'bg-[#FDFCF9] text-[#1A1A1A]';
    }
  };

  const getFontFamilyClass = () => {
    switch (settings.fontFamily) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'sm':
        return 'text-sm leading-normal';
      case 'lg':
        return 'text-lg leading-relaxed';
      case 'xl':
        return 'text-xl leading-relaxed';
      case '2xl':
        return 'text-2xl leading-loose';
      case 'base':
      default:
        return 'text-base leading-relaxed';
    }
  };

  const getLineHeightClass = () => {
    switch (settings.lineHeight) {
      case 'tight':
        return 'leading-snug';
      case 'relaxed':
        return 'leading-relaxed';
      case 'loose':
        return 'leading-loose';
      case 'normal':
      default:
        return 'leading-normal';
    }
  };

  // Word count & reading time
  const wordCount = currentChapter.content.split(/\s+/).filter(Boolean).length;
  const estMinutes = currentChapter.readingTimeMinutes || Math.max(1, Math.ceil(wordCount / 180));

  return (
    <div className={`relative flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden transition-colors duration-200 ${getThemeContainerStyles()}`}>
      
      {/* Top Scroll Indicator Bar */}
      <div className="w-full bg-slate-200/40 dark:bg-slate-800/40 h-1 overflow-hidden sticky top-0 z-10">
        <div 
          className="bg-indigo-600 dark:text-indigo-400 h-full transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Reader Scroll Container */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        onMouseUp={handleMouseUp}
        className="flex-1 overflow-y-auto px-6 py-10 md:px-16 lg:px-32 xl:px-44 custom-scrollbar scroll-smooth"
      >
        <div className="max-w-3xl mx-auto pb-24">
          
          {/* Header Badge & Title */}
          <div className="mb-12 text-center border-b border-black/10 dark:border-white/10 pb-8">
            <div className="inline-block py-1 px-3 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4 border border-indigo-100 dark:border-indigo-800/50">
              <span>{currentBook.title}</span>
              {currentBook.coverBadge && (
                <>
                  <span className="mx-1">•</span>
                  <span>{currentBook.coverBadge}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] my-4 break-keep">
              {currentChapter.title}
            </h1>

            {/* Reading metadata */}
            <div className="flex items-center justify-center space-x-4 text-xs opacity-60 mt-4 font-medium">
              <span className="flex items-center space-x-1">
                <Clock size={13} />
                <span>약 {estMinutes}분 소요</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <FileText size={13} />
                <span>{wordCount} 단어</span>
              </span>
            </div>
          </div>

          {/* Key Takeaways Box (Editorial Pullquote style) */}
          {currentChapter.keyTakeaways && currentChapter.keyTakeaways.length > 0 && (
            <div className="my-8 p-6 bg-gray-50/80 dark:bg-indigo-950/30 border-l-[6px] border-indigo-500 rounded-r-lg shadow-2xs">
              <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm mb-3 uppercase tracking-wider">
                <Lightbulb size={18} className="text-amber-500" />
                <span>핵심 요약 (Key Insights)</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-indigo-100 font-medium">
                {currentChapter.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-indigo-500 font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* User Note Box (if exists for this chapter) */}
          {chapterNote && (
            <div className="mb-8 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100 text-xs sm:text-sm">
              <div className="flex justify-between items-center font-bold mb-1">
                <span className="flex items-center space-x-1.5 text-amber-700 dark:text-amber-300">
                  <MessageSquare size={14} />
                  <span>내 챕터 메모</span>
                </span>
                <button 
                  onClick={onOpenNoteModal} 
                  className="text-amber-600 dark:text-amber-400 hover:underline text-xs"
                >
                  수정
                </button>
              </div>
              <p className="whitespace-pre-wrap">{chapterNote}</p>
            </div>
          )}

          {/* Article Main Text Content */}
          <article className={`prose dark:prose-invert max-w-none ${getFontFamilyClass()} ${getFontSizeClass()} ${getLineHeightClass()} ${settings.justifyText ? 'text-justify' : ''}`}>
            {currentChapter.content.split('\n\n').map((paragraph, idx) => {
              // Highlight markdown style headers or section titles
              if (paragraph.startsWith('[')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-indigo-950 dark:text-indigo-200 mt-8 mb-4 border-l-4 border-indigo-600 pl-3">
                    {paragraph.replace(/^\[|\]$/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('*')) {
                return (
                  <p key={idx} className="italic opacity-80 mb-6 bg-black/5 dark:bg-white/5 p-4 rounded-xl border-l-4 border-amber-500">
                    {paragraph.replace(/^\*|\*$/g, '')}
                  </p>
                );
              }

              // Parse bolding within text
              const parts = paragraph.split('**');
              return (
                <p key={idx} className="mb-6 tracking-normal">
                  {parts.map((part, i) => 
                    i % 2 === 1 ? (
                      <strong key={i} className="font-bold text-indigo-700 dark:text-indigo-300">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            })}
          </article>

          {/* Chapter Bottom Utilities & Completion */}
          <div className="mt-14 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={onToggleCompleted}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isChapterCompleted
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20'
                }`}
              >
                <CheckCircle2 size={16} />
                <span>{isChapterCompleted ? '완독 완료' : '완독으로 표시'}</span>
              </button>

              <button
                onClick={onOpenNoteModal}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all"
              >
                <Plus size={16} />
                <span>{chapterNote ? '메모 수정' : '메모 작성'}</span>
              </button>
            </div>

            <button
              onClick={onToggleBookmark}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isBookmarked
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20'
              }`}
            >
              <Bookmark size={16} className={isBookmarked ? 'fill-white' : ''} />
              <span>{isBookmarked ? '북마크 저장됨' : '북마크 하기'}</span>
            </button>
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={onPrevChapter}
              disabled={!hasPrevChapter}
              className={`p-4 rounded-2xl border text-left flex items-center space-x-3 transition-all ${
                hasPrevChapter
                  ? 'border-black/10 dark:border-white/10 hover:border-indigo-500 bg-black/5 dark:bg-white/5 cursor-pointer'
                  : 'opacity-40 cursor-not-allowed border-transparent'
              }`}
            >
              <ChevronLeft size={20} className="shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] opacity-60 font-medium">이전 챕터</div>
                <div className="text-xs font-bold truncate">이전으로 이동</div>
              </div>
            </button>

            <button
              onClick={onNextChapter}
              disabled={!hasNextChapter}
              className={`p-4 rounded-2xl border text-right flex items-center justify-end space-x-3 transition-all ${
                hasNextChapter
                  ? 'border-black/10 dark:border-white/10 hover:border-indigo-500 bg-indigo-600 text-white cursor-pointer shadow-lg shadow-indigo-950/20'
                  : 'opacity-40 cursor-not-allowed border-transparent'
              }`}
            >
              <div className="min-w-0">
                <div className="text-[10px] text-indigo-200 font-medium">다음 챕터</div>
                <div className="text-xs font-bold truncate">다음으로 이동</div>
              </div>
              <ChevronRight size={20} className="shrink-0" />
            </button>
          </div>

        </div>
      </div>

      {/* Floating Text Selection Popover Menu */}
      {popoverPos && (
        <div 
          className="fixed z-50 bg-slate-900 text-white px-2 py-1.5 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-1 animate-fade-in"
          style={{ top: `${popoverPos.top}px`, left: `${popoverPos.left}px` }}
        >
          {/* Highlight Colors */}
          <button 
            onClick={() => handleHighlight('yellow')}
            className="w-5 h-5 rounded-full bg-amber-400 hover:scale-110 transition-transform" 
            title="노란색 형광펜"
          />
          <button 
            onClick={() => handleHighlight('green')}
            className="w-5 h-5 rounded-full bg-emerald-400 hover:scale-110 transition-transform" 
            title="초록색 형광펜"
          />
          <button 
            onClick={() => handleHighlight('purple')}
            className="w-5 h-5 rounded-full bg-purple-400 hover:scale-110 transition-transform" 
            title="보라색 형광펜"
          />

          <div className="w-px h-4 bg-slate-700 mx-1" />

          {/* Ask AI Button */}
          <button
            onClick={handleAskAI}
            className="p-1.5 rounded-lg hover:bg-indigo-600 transition-colors flex items-center space-x-1 text-xs font-medium text-indigo-300 hover:text-white"
            title="선택 문구로 AI 질문하기"
          >
            <Sparkles size={14} />
            <span>AI 질문</span>
          </button>

          {/* Copy Text */}
          <button
            onClick={handleCopyText}
            className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-300"
            title="문구 복사"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      )}
    </div>
  );
};
