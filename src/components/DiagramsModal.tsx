import React, { useState } from 'react';
import { diagramsData } from '../data/diagramsData';
import { X, Layers, Cpu, Compass, DollarSign, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface DiagramsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAIWithDiagram: (topic: string) => void;
}

export const DiagramsModal: React.FC<DiagramsModalProps> = ({
  isOpen,
  onClose,
  onAskAIWithDiagram,
}) => {
  const [activeDiagramId, setActiveDiagramId] = useState('oae_triangle');

  if (!isOpen) return null;

  const activeDiagram = diagramsData.find(d => d.id === activeDiagramId) || diagramsData[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-100 rounded-2xl w-full max-w-4xl max-h-[90vh] shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-scale-up">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/60 flex items-center justify-center">
              <Layers size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">OAE 시각적 다이어그램 & 아키텍처 도해</h2>
              <p className="text-xs text-slate-400">자율기업 및 AI 패러다임 메커니즘 인포그래픽</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex space-x-2 overflow-x-auto no-scrollbar">
          {diagramsData.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveDiagramId(d.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                activeDiagramId === d.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {d.title.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Diagram Interactive Display Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-extrabold text-white">{activeDiagram.title}</h3>
            <p className="text-xs text-amber-400 mt-1 font-medium">{activeDiagram.subtitle}</p>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">{activeDiagram.description}</p>
          </div>

          {/* SVG Visual Graphic Container */}
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800/80 flex items-center justify-center min-h-[300px]">
            
            {/* 1. OAE Triangle Diagram */}
            {activeDiagram.svgType === 'triangle' && (
              <div className="w-full max-w-lg space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  
                  <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-700/80 text-indigo-200">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                      <Cpu size={18} />
                    </div>
                    <div className="font-bold text-sm text-white">1. OAE Quant</div>
                    <div className="text-[11px] text-indigo-300 font-medium">실리콘 (효율의 끝)</div>
                    <p className="text-[10px] text-slate-400 mt-2">세계 모델 & MCTS가 0.1초 단위 리스크를 방어하는 무한 캐시카우</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/80 text-emerald-200">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <Compass size={18} />
                    </div>
                    <div className="font-bold text-sm text-white">2. OAE Bio</div>
                    <div className="text-[11px] text-emerald-300 font-medium">흙 (비효율의 끝)</div>
                    <p className="text-[10px] text-slate-400 mt-2">금산 300평 농장 100% 휴먼 땀으로 완성하는 구증구포 오가닉 앰플</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-950/60 border border-sky-700/80 text-sky-200">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold">
                      <ShieldCheck size={18} />
                    </div>
                    <div className="font-bold text-sm text-white">3. OAE Tech</div>
                    <div className="text-[11px] text-sky-300 font-medium">인프라 (폐쇄망 AI)</div>
                    <p className="text-[10px] text-slate-400 mt-2">Cogni-OS 어플라이언스를 방산·금융 기업에 B2B 납품 (1.1억/대)</p>
                  </div>

                </div>

                <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/40 text-center text-xs text-amber-200">
                  ⚡ <strong>3각 선순환 구조:</strong> Quant의 자금력 ➔ Bio 오가닉 IP 창출 ➔ Tech 보안 검증 시스템 B2B 확산
                </div>
              </div>
            )}

            {/* 2. Value Inversion Diagram */}
            {activeDiagram.svgType === 'inversion' && (
              <div className="w-full max-w-lg space-y-4 text-xs">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="w-1/2 pr-3 border-r border-slate-800">
                    <div className="font-bold text-rose-400 mb-1">📷 19세기 카메라 발명</div>
                    <p className="text-[11px] text-slate-400">초상화 사실주의 화가의 노동 가치가 0원으로 폭락 ➔ 인상파/추상화로 감성 가치 이동</p>
                  </div>
                  <div className="w-1/2 pl-3">
                    <div className="font-bold text-emerald-400 mb-1">🤖 21세기 AI 혁명</div>
                    <p className="text-[11px] text-slate-400">정밀 실행(How)의 가치가 0원으로 폭락 ➔ 땀, 결함, 우연(Organic)이 최고가 럭셔리로 등극</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/50 border border-indigo-800/50 text-indigo-200 text-center">
                  💡 <strong>Proof of Humanity (휴먼 보증마크):</strong> 기계가 0.1초 만에 0% 오차로 생성하는 세상에서, 인간의 땀과 오차는 프리미엄 인증서가 됩니다.
                </div>
              </div>
            )}

            {/* 3. System 1 & System 2 Diagram */}
            {activeDiagram.svgType === 'system1_2' && (
              <div className="w-full max-w-lg space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-700">
                    <div className="font-bold text-purple-300 mb-1">System 2 (느린 뇌)</div>
                    <div className="text-[11px] text-slate-300">LLM + MCTS + 하이퍼그래프</div>
                    <p className="text-[10px] text-slate-400 mt-2">수백만 가지 시나리오와 미래 위기를 깊이 있게 통찰·탐색</p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-700">
                    <div className="font-bold text-blue-300 mb-1">System 1 (빠른 손)</div>
                    <div className="text-[11px] text-slate-300">Mamba SSM + 1D-CNN + C++</div>
                    <p className="text-[10px] text-slate-400 mt-2">1밀리초 초저지연으로 트레이딩/실행 파라미터 제어</p>
                  </div>
                </div>

                <div className="flex items-center justify-center p-3 rounded-xl bg-amber-950/50 border border-amber-800 text-amber-200 text-center">
                  <Zap size={16} className="mr-2 text-amber-400 shrink-0" />
                  <span><strong>FiLM 모듈:</strong> System 2의 결정을 재학습 없이 1ms 이내에 System 1 가중치로 이식.</span>
                </div>
              </div>
            )}

            {/* 4. A2A Flow Diagram */}
            {activeDiagram.svgType === 'a2a_flow' && (
              <div className="w-full max-w-lg space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                  <div className="p-2 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-300 font-bold">
                    조달 에이전트
                  </div>
                  <ArrowRight size={16} className="text-amber-400" />
                  <div className="p-2 rounded-lg bg-amber-950 border border-amber-800 text-amber-300 font-bold">
                    0.001원 마이크로 결제
                  </div>
                  <ArrowRight size={16} className="text-amber-400" />
                  <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
                    영업 에이전트
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-300">
                  🔒 <strong>Tech-Audit 봉인:</strong> 판단 궤적과 거래 암호 해시를 봉인하여 분쟁 발생 시 완벽한 법적 영수증 역할을 수행합니다.
                </div>
              </div>
            )}

          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                onAskAIWithDiagram(`'${activeDiagram.title}' 다이어그램의 상세 메커니즘과 OAE 사업 전략 적용법을 설명해줘.`);
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md"
            >
              <Sparkles size={14} />
              <span>이 도해로 AI 자문 박사에게 심층 질의하기</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
