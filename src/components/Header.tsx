import React from 'react';
import { Book, Chapter, ReaderSettings } from '../types';
import { 
  Menu, ChevronRight, Settings, Volume2, VolumeX, Pause, Play, 
  Bookmark, Sparkles, HelpCircle, Share2, Check
} from 'lucide-react';

interface HeaderProps {
  currentBook?: Book;
  currentChapter?: Chapter;
  onToggleSidebar: () => void;
  onOpenSettings: () => void;
  onOpenAIAssistant: () => void;
  onOpenBookmarks: () => void;
  onOpenQuiz: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  // TTS State
  isSpeaking: boolean;
  isPaused: boolean;
  onStartTTS: () => void;
  onPauseTTS: () => void;
  onResumeTTS: () => void;
  onStopTTS: () => void;
  hasSpeechSupport: boolean;
  settings: ReaderSettings;
}

export const Header: React.FC<HeaderProps> = ({
  currentBook,
  currentChapter,
  onToggleSidebar,
  onOpenSettings,
  onOpenAIAssistant,
  onOpenBookmarks,
  onOpenQuiz,
  isBookmarked,
  onToggleBookmark,
  isSpeaking,
  isPaused,
  onStartTTS,
  onPauseTTS,
  onResumeTTS,
  onStopTTS,
  hasSpeechSupport,
  settings,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Determine top bar dark/light classes based on active theme
  const getHeaderThemeClasses = () => {
    switch (settings.theme) {
      case 'dark':
      case 'oled':
        return 'bg-[#111111]/90 text-slate-100 border-white/10';
      case 'sepia':
        return 'bg-[#F4ECD8]/90 text-amber-950 border-[#E3D7BF]';
      case 'light':
      default:
        return 'bg-[#FDFCF9]/90 text-[#1A1A1A] border-gray-200/80';
    }
  };

  return (
    <header className={`sticky top-0 z-20 h-14 border-b backdrop-blur-md px-4 flex items-center justify-between transition-colors duration-200 ${getHeaderThemeClasses()}`}>
      {/* Left Section: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center space-x-3 min-w-0 pr-2">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
          title="목차 토글"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-xs font-medium truncate space-x-1.5">
          <span className="opacity-75 truncate max-w-[120px] sm:max-w-[180px]">
            {currentBook?.title}
          </span>
          <ChevronRight size={13} className="opacity-40 shrink-0" />
          <span className="font-semibold text-indigo-600 dark:text-indigo-400 truncate max-w-[150px] sm:max-w-[260px]">
            {currentChapter?.title}
          </span>
        </div>
      </div>

      {/* Right Section: Action Controls */}
      <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
        {/* Audio TTS Speech Reader Controls */}
        {hasSpeechSupport && (
          <div className="flex items-center space-x-1 bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5 dark:border-white/10">
            {!isSpeaking ? (
              <button
                onClick={onStartTTS}
                className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-indigo-600 dark:text-indigo-400 flex items-center space-x-1 px-2 text-xs font-medium"
                title="음성으로 오디오북 듣기"
              >
                <Volume2 size={16} />
                <span className="hidden sm:inline">오디오북</span>
              </button>
            ) : (
              <>
                {isPaused ? (
                  <button
                    onClick={onResumeTTS}
                    className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-emerald-600 dark:text-emerald-400"
                    title="재생 재개"
                  >
                    <Play size={16} />
                  </button>
                ) : (
                  <button
                    onClick={onPauseTTS}
                    className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-amber-600 dark:text-amber-400"
                    title="일시 정지"
                  >
                    <Pause size={16} />
                  </button>
                )}
                <button
                  onClick={onStopTTS}
                  className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-rose-600 dark:text-rose-400"
                  title="음성 재생 정지"
                >
                  <VolumeX size={16} />
                </button>
              </>
            )}
          </div>
        )}

        {/* AI Assistant Button */}
        <button
          onClick={onOpenAIAssistant}
          className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all flex items-center space-x-1.5 text-xs font-semibold shadow-xs shadow-indigo-900/30"
          title="AI 자문 박사에게 질문하기"
        >
          <Sparkles size={15} />
          <span className="hidden md:inline">AI 자문</span>
        </button>

        {/* Bookmark Chapter Toggle */}
        <button
          onClick={onToggleBookmark}
          className={`p-1.5 rounded-lg transition-colors ${
            isBookmarked 
              ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' 
              : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-70 hover:opacity-100'
          }`}
          title={isBookmarked ? "북마크 해제" : "현재 챕터 북마크 추가"}
        >
          <Bookmark size={18} className={isBookmarked ? 'fill-rose-500' : ''} />
        </button>

        {/* Reader Typography Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-80 hover:opacity-100"
          title="보기 설정 (폰트, 테마, 글자 크기)"
        >
          <Settings size={18} />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-80 hover:opacity-100 relative"
          title="링크 복사"
        >
          {copied ? <Check size={18} className="text-emerald-500" /> : <Share2 size={18} />}
        </button>
      </div>
    </header>
  );
};
