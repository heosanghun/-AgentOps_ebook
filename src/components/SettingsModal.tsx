import React from 'react';
import { ReaderSettings, ThemeMode, FontFamily, FontSize, LineHeight } from '../types';
import { X, Type, Sun, Moon, AlignLeft, AlignJustify, Play, Eye } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReaderSettings;
  onUpdateSettings: (newSettings: Partial<ReaderSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const themeOptions: { key: ThemeMode; label: string; bg: string; text: string; border: string }[] = [
    { key: 'light', label: '화이트', bg: 'bg-white', text: 'text-slate-900', border: 'border-slate-300' },
    { key: 'sepia', label: '세피아', bg: 'bg-[#faf4e8]', text: 'text-[#2c221e]', border: 'border-[#e3d7bf]' },
    { key: 'dark', label: '다크', bg: 'bg-slate-900', text: 'text-slate-100', border: 'border-slate-700' },
    { key: 'oled', label: 'OLED 블랙', bg: 'bg-black', text: 'text-slate-100', border: 'border-slate-800' },
  ];

  const fontOptions: { key: FontFamily; label: string }[] = [
    { key: 'sans', label: '산세리프 (고딕)' },
    { key: 'serif', label: '세리프 (명조)' },
    { key: 'mono', label: '고정폭 (모노)' },
  ];

  const fontSizeOptions: { key: FontSize; label: string }[] = [
    { key: 'sm', label: '작게' },
    { key: 'base', label: '보통' },
    { key: 'lg', label: '크게' },
    { key: 'xl', label: '아주 크게' },
    { key: '2xl', label: '최대' },
  ];

  const lineHeightOptions: { key: LineHeight; label: string }[] = [
    { key: 'tight', label: '좁게' },
    { key: 'normal', label: '보통' },
    { key: 'relaxed', label: '널찍하게' },
    { key: 'loose', label: '최대 여백' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-100 rounded-2xl w-full max-w-md shadow-2xl border border-slate-800 overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Type size={18} className="text-indigo-400" />
            <h3 className="font-bold text-sm text-white">독서 환경 설정</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-5 space-y-5 text-xs sm:text-sm">
          
          {/* Theme Palette */}
          <div>
            <label className="block text-slate-400 font-semibold mb-2">배경 테마</label>
            <div className="grid grid-cols-4 gap-2">
              {themeOptions.map((t) => (
                <button
                  key={t.key}
                  onClick={() => onUpdateSettings({ theme: t.key })}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center font-semibold transition-all ${t.bg} ${t.text} ${
                    settings.theme === t.key ? 'ring-2 ring-indigo-500 scale-105 shadow-md' : t.border
                  }`}
                >
                  <Eye size={14} className="mb-1 opacity-70" />
                  <span className="text-[11px]">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-slate-400 font-semibold mb-2">서체 (글꼴)</label>
            <div className="grid grid-cols-3 gap-2">
              {fontOptions.map((f) => (
                <button
                  key={f.key}
                  onClick={() => onUpdateSettings({ fontFamily: f.key })}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    settings.fontFamily === f.key
                      ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-slate-400 font-semibold mb-2">글자 크기</label>
            <div className="flex space-x-1.5 overflow-x-auto no-scrollbar">
              {fontSizeOptions.map((s) => (
                <button
                  key={s.key}
                  onClick={() => onUpdateSettings({ fontSize: s.key })}
                  className={`flex-1 py-2 px-2 rounded-xl border text-xs font-medium transition-all ${
                    settings.fontSize === s.key
                      ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Line Height */}
          <div>
            <label className="block text-slate-400 font-semibold mb-2">줄 간격</label>
            <div className="grid grid-cols-4 gap-1.5">
              {lineHeightOptions.map((lh) => (
                <button
                  key={lh.key}
                  onClick={() => onUpdateSettings({ lineHeight: lh.key })}
                  className={`py-2 px-2 rounded-xl border text-xs font-medium transition-all text-center ${
                    settings.lineHeight === lh.key
                      ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {lh.label}
                </button>
              ))}
            </div>
          </div>

          {/* Auto Scroll */}
          <div>
            <label className="block text-slate-400 font-semibold mb-2">자동 스크롤 속도</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { speed: 0, label: '꺼짐' },
                { speed: 1, label: '느리게' },
                { speed: 2, label: '보통' },
                { speed: 3, label: '빠르게' },
              ].map((sp) => (
                <button
                  key={sp.speed}
                  onClick={() => onUpdateSettings({ autoScrollSpeed: sp.speed })}
                  className={`py-2 rounded-xl border text-xs font-medium transition-all ${
                    settings.autoScrollSpeed === sp.speed
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Alignment */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-slate-400 font-semibold">양쪽 정렬 (Justify)</span>
            <button
              onClick={() => onUpdateSettings({ justifyText: !settings.justifyText })}
              className={`p-2 rounded-xl border transition-colors ${
                settings.justifyText ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {settings.justifyText ? <AlignJustify size={16} /> : <AlignLeft size={16} />}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
