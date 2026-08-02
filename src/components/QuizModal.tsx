import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { X, HelpCircle, CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: '제6권 『오가닉』에서 AI 에이전트로 인해 정밀한 실행(How)의 가치가 0원으로 폭락했을 때 비유된 19세기 역사적 사건은?',
    options: [
      '증기기관의 발명과 산업혁명',
      '카메라(사진기)의 발명과 사실주의 회화의 붕괴 및 인상파 부상',
      '인쇄술의 발명과 양피지 서적의 몰락',
      '전화기의 발명과 파편적 통신의 시작'
    ],
    correctAnswer: 1,
    explanation: '사진기가 찰칵 소리로 사실주의 회화를 0원으로 폭락시켰듯, AI 에이전트가 완벽한 정밀 실행을 0원으로 만들며 땀, 결함, 우연이라는 오가닉 자본이 등극했습니다.',
  },
  {
    id: 'q2',
    question: '제5권 『세계 모델』에서 O(N²) 트랜스포머의 연산 폭증 병목을 깨뜨리고 선형 O(L) 초저지연 상태 공간을 제공하는 핵심 아키텍처는?',
    options: [
      'BERT (Bidirectional Encoder)',
      'ResNet-50',
      'Mamba (선택적 상태 공간 모델 - SSM)',
      'LSTM'
    ],
    correctAnswer: 2,
    explanation: '맘바(Mamba) 아키텍처는 컨텍스트가 길어져도 O(L) 선형 복잡도를 유지하여 고빈도 매매 및 초저지연 실시간 제어를 가능하게 합니다.',
  },
  {
    id: 'q3',
    question: '주식회사 OAE (Organic Autonomous Entity)의 3각 편대에 해당하지 않는 사업 영역은?',
    options: [
      'OAE Quant (세계 모델 기반 무한 캐시카우 실리콘 트레이딩)',
      'OAE Bio (금산 300평 농장 100% 휴먼 땀 구증구포 재생 앰플)',
      'OAE Tech (Cogni-OS 폐쇄망 AI 어플라이언스 B2B 납품)',
      'OAE Meta (가상현실 메타버스 소셜 플랫폼)'
    ],
    correctAnswer: 3,
    explanation: 'OAE는 OAE Quant (실리콘/효율), OAE Bio (흙/오가닉/비효율), OAE Tech (폐쇄망 AI 어플라이언스 인프라)의 3각 편대로 구성됩니다.',
  },
  {
    id: 'q4',
    question: 'A2A (Agent-to-Agent) 기계들의 시장에서 화려한 인간용 웹 디자인(SEO) 대신 에이전트 RAG 파서에 최적화하는 마케팅 기술은?',
    options: [
      'AEO (Agent Engine Optimization)',
      'PPC (Pay-Per-Click)',
      'CTR (Click-Through-Rate)',
      'CPM (Cost-Per-Mille)'
    ],
    correctAnswer: 0,
    explanation: '에이전트 시대에는 llms.txt와 마크다운으로 데이터를 퍼주는 AEO (Agent Engine Optimization)가 최고의 마케팅 기법이 됩니다.',
  },
];

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = quizQuestions[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsSubmitted(false);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-100 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-scale-up">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HelpCircle size={18} className="text-amber-400" />
            <h3 className="font-bold text-sm text-white">OAE Masterpiece 이해도 퀴즈</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6">
          {!isFinished ? (
            <div>
              <div className="flex justify-between items-center text-xs text-slate-400 mb-4 font-medium">
                <span>문제 {currentIdx + 1} / {quizQuestions.length}</span>
                <span>현재 점수: {score}점</span>
              </div>

              <h4 className="text-base font-bold text-white mb-5 leading-snug">
                {currentQ.question}
              </h4>

              <div className="space-y-2.5 mb-6">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750';
                  if (selectedOption === idx) {
                    btnStyle = 'bg-indigo-600 border-indigo-500 text-white font-semibold';
                  }
                  if (isSubmitted) {
                    if (idx === currentQ.correctAnswer) {
                      btnStyle = 'bg-emerald-600 border-emerald-500 text-white font-bold';
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-rose-600 border-rose-500 text-white';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && idx === currentQ.correctAnswer && (
                        <CheckCircle2 size={16} className="text-white shrink-0 ml-2" />
                      )}
                      {isSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                        <XCircle size={16} className="text-white shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {isSubmitted && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 mb-6 leading-relaxed">
                  <span className="font-bold text-amber-400 block mb-1">💡 풀이 및 해설</span>
                  {currentQ.explanation}
                </div>
              )}

              {/* Action Button */}
              <div className="flex justify-end">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold disabled:opacity-40 transition-colors shadow-md shadow-amber-950/40"
                  >
                    정답 확인하기
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md"
                  >
                    {currentIdx + 1 < quizQuestions.length ? '다음 문제' : '결과 보기'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <Award size={48} className="mx-auto text-amber-400 animate-bounce" />
              <h3 className="text-xl font-black text-white">퀴즈 완료!</h3>
              <p className="text-sm text-slate-300">
                총 {quizQuestions.length}문제 중 <strong className="text-amber-400 text-lg">{score}</strong>문제를 맞추셨습니다.
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                {score === quizQuestions.length
                  ? '🎉 축하합니다! 박사님의 OAE 오가닉 자율 기업 및 AI 패러다임 철학을 완벽하게 이해하고 계십니다.'
                  : '👍 대단합니다! 계속해서 책의 본문을 통독하며 OAE의 미래 비전을 음미해 보세요.'}
              </div>

              <div className="pt-4 flex justify-center space-x-3">
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
                >
                  <RotateCcw size={14} />
                  <span>다시 풀기</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
