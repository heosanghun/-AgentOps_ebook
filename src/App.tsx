import React, { useState, useEffect } from 'react';
import { bookData } from './data/bookData';
import { Book, Chapter, ReaderSettings, Bookmark, Highlight, ChapterNote } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ReaderView } from './components/ReaderView';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { GlossaryModal } from './components/GlossaryModal';
import { DiagramsModal } from './components/DiagramsModal';
import { BookmarksNotesDrawer } from './components/BookmarksNotesDrawer';
import { SettingsModal } from './components/SettingsModal';
import { QuizModal } from './components/QuizModal';
import { X, MessageSquare, Save } from 'lucide-react';

function readJsonStorage<T>(key: string, fallback: T): T {
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;
  try {
    return JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  // Navigation State
  const [activeBookId, setActiveBookId] = useState<string>(() => {
    return localStorage.getItem('oae_active_book') || 'organic';
  });
  const [activeChapterId, setActiveChapterId] = useState<string>(() => {
    return localStorage.getItem('oae_active_chapter') || 'prologue';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Reader Customization Settings
  const [settings, setSettings] = useState<ReaderSettings>(() => {
    const saved = localStorage.getItem('oae_reader_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      theme: 'light',
      fontFamily: 'sans',
      fontSize: 'base',
      lineHeight: 'relaxed',
      autoScrollSpeed: 0,
      justifyText: true,
    };
  });

  // User Persistence Data
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() =>
    readJsonStorage<Bookmark[]>('oae_bookmarks', [])
  );
  const [highlights, setHighlights] = useState<Highlight[]>(() =>
    readJsonStorage<Highlight[]>('oae_highlights', [])
  );
  const [notes, setNotes] = useState<ChapterNote[]>(() =>
    readJsonStorage<ChapterNote[]>('oae_notes', [])
  );
  const [completedChapters, setCompletedChapters] = useState<string[]>(() =>
    readJsonStorage<string[]>('oae_completed', ['organic:prologue'])
  );

  // Drawer & Modal States
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [aiInitialQuery, setAiInitialQuery] = useState<string | undefined>(undefined);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isDiagramsOpen, setIsDiagramsOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Chapter Note Modal State
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteInput, setNoteInput] = useState('');

  // Web Speech API (TTS) State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const speechUtteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);

  // Save active book & chapter to localStorage
  useEffect(() => {
    localStorage.setItem('oae_active_book', activeBookId);
    localStorage.setItem('oae_active_chapter', activeChapterId);
  }, [activeBookId, activeChapterId]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('oae_reader_settings', JSON.stringify(settings));
  }, [settings]);

  // Save user items to localStorage
  useEffect(() => {
    localStorage.setItem('oae_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  useEffect(() => {
    localStorage.setItem('oae_highlights', JSON.stringify(highlights));
  }, [highlights]);
  useEffect(() => {
    localStorage.setItem('oae_notes', JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    localStorage.setItem('oae_completed', JSON.stringify(completedChapters));
  }, [completedChapters]);

  // Stop speech when changing chapters
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [activeBookId, activeChapterId]);

  // Keyboard navigation (Left/Right arrow)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowLeft') {
        handlePrevChapter();
      } else if (e.key === 'ArrowRight') {
        handleNextChapter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeBookId, activeChapterId]);

  // Active book and chapter lookup
  const currentBook = bookData.find(b => b.id === activeBookId) || bookData[0];
  const currentChapter = currentBook.chapters.find(c => c.id === activeChapterId) || currentBook.chapters[0];

  // Flattened chapters array for seamless pagination
  const allChaptersList = bookData.flatMap(b =>
    b.chapters.map(c => ({ bookId: b.id, chapterId: c.id, title: c.title }))
  );
  const currentChapterIndex = allChaptersList.findIndex(
    ch => ch.bookId === activeBookId && ch.chapterId === activeChapterId
  );

  const hasPrevChapter = currentChapterIndex > 0;
  const hasNextChapter = currentChapterIndex < allChaptersList.length - 1;

  const handleSelectChapter = (bookId: string, chapterId: string) => {
    setActiveBookId(bookId);
    setActiveChapterId(chapterId);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handlePrevChapter = () => {
    if (hasPrevChapter) {
      const prev = allChaptersList[currentChapterIndex - 1];
      handleSelectChapter(prev.bookId, prev.chapterId);
    }
  };

  const handleNextChapter = () => {
    if (hasNextChapter) {
      const next = allChaptersList[currentChapterIndex + 1];
      handleSelectChapter(next.bookId, next.chapterId);
    }
  };

  // Bookmark handlers
  const chapterKey = `${currentBook.id}:${currentChapter.id}`;
  const isCurrentBookmarked = bookmarks.some(
    b => b.bookId === currentBook.id && b.chapterId === currentChapter.id
  );

  const handleToggleBookmark = () => {
    if (isCurrentBookmarked) {
      setBookmarks(prev => prev.filter(b => !(b.bookId === currentBook.id && b.chapterId === currentChapter.id)));
    } else {
      const newBm: Bookmark = {
        id: Date.now().toString(),
        bookId: currentBook.id,
        chapterId: currentChapter.id,
        bookTitle: currentBook.title,
        chapterTitle: currentChapter.title,
        createdAt: new Date().toLocaleDateString(),
      };
      setBookmarks(prev => [newBm, ...prev]);
    }
  };

  // Completed chapters toggle
  const isCurrentCompleted = completedChapters.includes(chapterKey);
  const handleToggleCompleted = () => {
    if (isCurrentCompleted) {
      setCompletedChapters(prev => prev.filter(k => k !== chapterKey));
    } else {
      setCompletedChapters(prev => [...prev, chapterKey]);
    }
  };

  // Highlight add
  const handleAddHighlight = (h: Omit<Highlight, 'id' | 'createdAt'>) => {
    const newHighlight: Highlight = {
      ...h,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString(),
    };
    setHighlights(prev => [newHighlight, ...prev]);
  };

  // Note Modal Save
  const currentChapterNote = notes.find(
    n => n.bookId === currentBook.id && n.chapterId === currentChapter.id
  )?.content;

  const handleOpenNoteModal = () => {
    setNoteInput(currentChapterNote || '');
    setIsNoteModalOpen(true);
  };

  const handleSaveNote = () => {
    if (!noteInput.trim()) {
      setNotes(prev => prev.filter(n => !(n.bookId === currentBook.id && n.chapterId === currentChapter.id)));
    } else {
      const existingIdx = notes.findIndex(n => n.bookId === currentBook.id && n.chapterId === currentChapter.id);
      if (existingIdx >= 0) {
        const updated = [...notes];
        updated[existingIdx] = {
          ...updated[existingIdx],
          content: noteInput.trim(),
          updatedAt: new Date().toLocaleDateString(),
        };
        setNotes(updated);
      } else {
        const newNote: ChapterNote = {
          id: Date.now().toString(),
          bookId: currentBook.id,
          chapterId: currentChapter.id,
          content: noteInput.trim(),
          updatedAt: new Date().toLocaleDateString(),
        };
        setNotes(prev => [newNote, ...prev]);
      }
    }
    setIsNoteModalOpen(false);
  };

  // AI Assistant with prefilled query
  const handleAskAI = (query: string) => {
    setAiInitialQuery(query);
    setIsAIAssistantOpen(true);
  };

  // Web Speech Synthesis (TTS)
  const hasSpeechSupport = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const handleStartTTS = () => {
    if (!hasSpeechSupport || !currentChapter) return;
    window.speechSynthesis.cancel();

    const textToRead = `${currentBook.title}. ${currentChapter.title}. ${currentChapter.content.replace(/[*#\[\]]/g, '')}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'ko-KR';
    utterance.rate = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePauseTTS = () => {
    if (hasSpeechSupport && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleResumeTTS = () => {
    if (hasSpeechSupport && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleStopTTS = () => {
    if (hasSpeechSupport) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar
        books={bookData}
        activeBookId={activeBookId}
        activeChapterId={activeChapterId}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSelectChapter={handleSelectChapter}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenDiagrams={() => setIsDiagramsOpen(true)}
        onOpenAIAssistant={() => { setAiInitialQuery(undefined); setIsAIAssistantOpen(true); }}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        completedChapters={completedChapters}
        bookmarksCount={bookmarks.length + highlights.length + notes.length}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white dark:bg-slate-900">
        
        {/* Top Header Controls */}
        <Header
          currentBook={currentBook}
          currentChapter={currentChapter}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAIAssistant={() => { setAiInitialQuery(undefined); setIsAIAssistantOpen(true); }}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
          onOpenQuiz={() => setIsQuizOpen(true)}
          isBookmarked={isCurrentBookmarked}
          onToggleBookmark={handleToggleBookmark}
          isSpeaking={isSpeaking}
          isPaused={isPaused}
          onStartTTS={handleStartTTS}
          onPauseTTS={handlePauseTTS}
          onResumeTTS={handleResumeTTS}
          onStopTTS={handleStopTTS}
          hasSpeechSupport={hasSpeechSupport}
          settings={settings}
        />

        {/* E-Book Chapter Text Reader View */}
        <ReaderView
          currentBook={currentBook}
          currentChapter={currentChapter}
          settings={settings}
          onPrevChapter={handlePrevChapter}
          onNextChapter={handleNextChapter}
          hasPrevChapter={hasPrevChapter}
          hasNextChapter={hasNextChapter}
          onAddHighlight={handleAddHighlight}
          onAskAIWithSelection={handleAskAI}
          isBookmarked={isCurrentBookmarked}
          onToggleBookmark={handleToggleBookmark}
          isChapterCompleted={isCurrentCompleted}
          onToggleCompleted={handleToggleCompleted}
          onOpenNoteModal={handleOpenNoteModal}
          chapterNote={currentChapterNote}
        />
      </div>

      {/* AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        currentBook={currentBook}
        currentChapter={currentChapter}
        initialQuery={aiInitialQuery}
      />

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        onSelectTermForAI={handleAskAI}
      />

      {/* Visual Diagrams Modal */}
      <DiagramsModal
        isOpen={isDiagramsOpen}
        onClose={() => setIsDiagramsOpen(false)}
        onAskAIWithDiagram={handleAskAI}
      />

      {/* Bookmarks, Highlights & Notes Drawer */}
      <BookmarksNotesDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        highlights={highlights}
        notes={notes}
        books={bookData}
        onSelectChapter={handleSelectChapter}
        onDeleteBookmark={(id) => setBookmarks(prev => prev.filter(b => b.id !== id))}
        onDeleteHighlight={(id) => setHighlights(prev => prev.filter(h => h.id !== id))}
        onDeleteNote={(id) => setNotes(prev => prev.filter(n => n.id !== id))}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(newSet) => setSettings(prev => ({ ...prev, ...newSet }))}
      />

      {/* Comprehension Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      {/* Chapter Note Edit Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-slate-100 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-800 p-5 space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <MessageSquare size={18} className="text-amber-400" />
                <h3 className="font-bold text-sm text-white">챕터 메모 작성/수정</h3>
              </div>
              <button 
                onClick={() => setIsNoteModalOpen(false)} 
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              <strong>{currentChapter.title}</strong>에 대한 개인 인사이트나 기록을 자유롭게 메모하세요.
            </p>

            <textarea
              rows={5}
              placeholder="이 챕터를 읽고 느낀 점이나 자율기업 전략 구상을 기록해 보세요..."
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 text-xs sm:text-sm p-3 rounded-xl border border-slate-800 focus:outline-hidden focus:border-amber-500 placeholder-slate-600"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                취소
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 shadow-md"
              >
                <Save size={14} />
                <span>저장하기</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
