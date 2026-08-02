export interface Chapter {
  id: string;
  title: string;
  content: string;
  summary?: string;
  keyTakeaways?: string[];
  readingTimeMinutes?: number;
}

export interface Book {
  id: string;
  volumeNumber: number;
  title: string;
  subtitle: string;
  coverBadge?: string;
  color: string; // TailWind color theme for book badge
  description: string;
  chapters: Chapter[];
}

export interface Highlight {
  id: string;
  bookId: string;
  chapterId: string;
  chapterTitle: string;
  selectedText: string;
  color: 'yellow' | 'green' | 'blue' | 'purple' | 'pink';
  note?: string;
  createdAt: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  chapterId: string;
  bookTitle: string;
  chapterTitle: string;
  createdAt: string;
}

export interface ChapterNote {
  id: string;
  bookId: string;
  chapterId: string;
  content: string;
  updatedAt: string;
}

export type ThemeMode = 'light' | 'sepia' | 'dark' | 'oled';
export type FontFamily = 'serif' | 'sans' | 'mono';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';
export type LineHeight = 'tight' | 'normal' | 'relaxed' | 'loose';

export interface ReaderSettings {
  theme: ThemeMode;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineHeight: LineHeight;
  autoScrollSpeed: number; // 0 = off, 1 = slow, 2 = medium, 3 = fast
  justifyText: boolean;
}

export interface GlossaryTerm {
  term: string;
  termKo: string;
  category: 'System & Architecture' | 'Philosophy & Organic' | 'Economy & A2A' | 'Trading & B2B';
  definition: string;
  example: string;
  relatedChapterId?: string;
}

export interface DiagramItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  svgType: 'triangle' | 'inversion' | 'system1_2' | 'a2a_flow' | 'timeline';
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
