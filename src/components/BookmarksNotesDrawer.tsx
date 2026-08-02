import React, { useState } from 'react';
import { Bookmark, Highlight, ChapterNote, Book } from '../types';
import { X, Bookmark as BookmarkIcon, Highlighting, MessageSquare, Trash2, Copy, Download, Check, ExternalLink } from 'lucide-react';

interface BookmarksNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  highlights: Highlight[];
  notes: ChapterNote[];
  books: Book[];
  onSelectChapter: (bookId: string, chapterId: string) => void;
  onDeleteBookmark: (id: string) => void;
  onDeleteHighlight: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export const BookmarksNotesDrawer: React.FC<BookmarksNotesDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  highlights,
  notes,
  books,
  onSelectChapter,
  onDeleteBookmark,
  onDeleteHighlight,
  onDeleteNote,
}) => {
  const [activeTab, setActiveTab] = useState<'highlights' | 'bookmarks' | 'notes'>('highlights');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const exportAllData = () => {
    let md = `# OAE Masterpiece 독서 노트 및 형광펜 모음\n\n`;

    if (bookmarks.length > 0) {
      md += `## 📌 북마크목록\n`;
      bookmarks.forEach(b => {
        md += `- **${b.bookTitle}** - ${b.chapterTitle} (${b.createdAt})\n`;
      });
      md += `\n`;
    }

    if (highlights.length > 0) {
      md += `## 🖍️ 형광펜 수집 문구\n`;
      highlights.forEach(h => {
        md += `> "${h.selectedText}"\n*— [${h.chapterTitle}] (${h.createdAt})*\n\n`;
      });
    }

    if (notes.length > 0) {
      md += `## 📝 챕터 개인 메모\n`;
      notes.forEach(n => {
        const book = books.find(b => b.id === n.bookId);
        const chapter = book?.chapters.find(c => c.id === n.chapterId);
        md += `### ${chapter?.title || n.chapterId}\n${n.content}\n\n`;
      });
    }

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OAE_Reading_Notes_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-slate-900 text-slate-100 shadow-2xl border-l border-slate-800 flex flex-col animate-slide-left">
      
      {/* Drawer Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-rose-950 text-rose-400 border border-rose-800/60 flex items-center justify-center">
            <BookmarkIcon size={18} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">서재 보관함 & 독서 노트</h3>
            <p className="text-[11px] text-slate-400">형광펜, 북마크, 챕터 메모 통합 관리</p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={exportAllData}
            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
            title="Markdown으로 내보내기"
          >
            <Download size={18} />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 bg-slate-950 border-b border-slate-800 text-xs font-medium">
        <button
          onClick={() => setActiveTab('highlights')}
          className={`py-3 text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
            activeTab === 'highlights'
              ? 'border-amber-500 text-amber-400 bg-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>형광펜</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800">{highlights.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`py-3 text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
            activeTab === 'bookmarks'
              ? 'border-rose-500 text-rose-400 bg-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>북마크</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800">{bookmarks.length}</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`py-3 text-center border-b-2 transition-colors flex items-center justify-center space-x-1.5 ${
            activeTab === 'notes'
              ? 'border-indigo-500 text-indigo-400 bg-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>내 메모</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800">{notes.length}</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        
        {/* HIGHLIGHTS TAB */}
        {activeTab === 'highlights' && (
          highlights.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              본문에서 텍스트를 드래그하여 형광펜을 추가해 보세요.
            </div>
          ) : (
            highlights.map((h) => (
              <div 
                key={h.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 relative space-y-2 group"
              >
                <div className="flex justify-between items-center text-[11px] text-slate-400">
                  <span className="font-semibold text-amber-400 truncate pr-2">{h.chapterTitle}</span>
                  <span>{h.createdAt}</span>
                </div>

                <blockquote className="text-xs text-slate-200 italic border-l-2 border-amber-400 pl-2.5 py-0.5">
                  "{h.selectedText}"
                </blockquote>

                <div className="flex justify-end items-center space-x-2 pt-1 border-t border-slate-800/60 text-xs">
                  <button
                    onClick={() => {
                      onSelectChapter(h.bookId, h.chapterId);
                      onClose();
                    }}
                    className="text-slate-400 hover:text-indigo-400 flex items-center space-x-1 text-[11px]"
                  >
                    <ExternalLink size={12} />
                    <span>이동</span>
                  </button>
                  <button
                    onClick={() => handleCopy(h.id, h.selectedText)}
                    className="text-slate-400 hover:text-white flex items-center space-x-1 text-[11px]"
                  >
                    {copiedId === h.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>복사</span>
                  </button>
                  <button
                    onClick={() => onDeleteHighlight(h.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )
        )}

        {/* BOOKMARKS TAB */}
        {activeTab === 'bookmarks' && (
          bookmarks.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              북마크한 챕터가 없습니다.
            </div>
          ) : (
            bookmarks.map((b) => (
              <div 
                key={b.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between"
              >
                <button
                  onClick={() => {
                    onSelectChapter(b.bookId, b.chapterId);
                    onClose();
                  }}
                  className="text-left min-w-0 pr-3"
                >
                  <div className="text-[10px] text-rose-400 font-medium truncate">{b.bookTitle}</div>
                  <div className="text-xs font-bold text-white truncate">{b.chapterTitle}</div>
                </button>
                <button
                  onClick={() => onDeleteBookmark(b.id)}
                  className="p-1 text-slate-500 hover:text-rose-400 transition-colors shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )
        )}

        {/* NOTES TAB */}
        {activeTab === 'notes' && (
          notes.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              작성된 챕터 메모가 없습니다.
            </div>
          ) : (
            notes.map((n) => {
              const book = books.find(b => b.id === n.bookId);
              const chapter = book?.chapters.find(c => c.id === n.chapterId);

              return (
                <div 
                  key={n.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-indigo-400 truncate">{chapter?.title}</span>
                    <button
                      onClick={() => onDeleteNote(n.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 whitespace-pre-wrap bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    {n.content}
                  </p>
                </div>
              );
            })
          )
        )}

      </div>
    </div>
  );
};
