import { GlossaryTerm } from '../types';

export const glossaryData: GlossaryTerm[] = [
  {
    term: 'OAE',
    termKo: '오가닉 자율 기업 (Organic Autonomous Entity)',
    category: 'Philosophy & Organic',
    definition: '완벽한 기계적 지능(실리콘)으로 캐시카우를 지휘하고, 기계가 대체할 수 없는 인간의 땀과 오가닉 자본(흙)으로 하이엔드 럭셔리를 창출하며, 이 인프라(Tech)를 방산·금융 기업에 납품하는 3각 편대 자율 기업 구조.',
    example: 'OAE는 OAE Quant, OAE Bio, OAE Tech로 구성된 융합 기업이다.',
  },
  {
    term: 'World Model',
    termKo: '세계 모델',
    category: 'System & Architecture',
    definition: '과거 데이터의 확률적 패턴만을 기억하는 LLM을 넘어, 비즈니스 환경의 물리 법칙과 인과 구조를 이해하여 미래의 수백만 시나리오를 미리 시뮬레이션하는 AI 지능.',
    example: '세계 모델은 글로벌 항만 파업 위기를 0.1초 만에 감지하고 우회 경로를 수립했다.',
  },
  {
    term: 'Mamba (SSM)',
    termKo: '맘바 (선택적 상태 공간 모델)',
    category: 'System & Architecture',
    definition: '입력 길이가 길어질수록 O(N²)로 연산량이 폭증하는 트랜스포머의 한계를 극복하기 위해, O(L) 선형 복잡도를 갖도록 설계된 초저지연 상태 공간 모델.',
    example: '맘바 아키텍처는 고빈도 트레이딩에서 밀리초 단위 반응을 가능하게 한다.',
  },
  {
    term: 'FiLM',
    termKo: 'FiLM (Feature-wise Linear Modulation)',
    category: 'System & Architecture',
    definition: '느린 뇌(System 2 LLM/MCTS)의 고차원 결정을 빠른 실행망(System 1 CNN)의 선형 파라미터로 즉시 주입하여, 재학습(Fine-tuning) 없이 1밀리초 만에 태세를 전환하는 기술.',
    example: 'FiLM 기술을 통해 위기 감지 시 1ms 만에 트레이딩 포지션을 방어 모드로 전환한다.',
  },
  {
    term: 'Hypergraph',
    termKo: '하이퍼그래프',
    category: 'System & Architecture',
    definition: '두 노드 간 1:1 연결을 넘어, 복수의 변수와 이벤트가 동시다발적으로 상호작용하는 N:N 다차원 인과 관계를 위상학적으로 표현하는 수학적 구조.',
    example: '기준금리 변동이 환율, 증시, 원자재에 미치는 N:N 파급 효과를 하이퍼그래프로 모델링한다.',
  },
  {
    term: 'A2A',
    termKo: 'Agent-to-Agent (기계 간 거래)',
    category: 'Economy & A2A',
    definition: '인간의 UI 인터페이스 거침 없이, 인공지능 에이전트들이 직접 API를 통해 N:N 협상을 벌이고 마이크로 결제를 수행하는 자율 경제 패러다임.',
    example: '조달 에이전트가 14개 공급사 에이전트와 A2A 협상을 진행했다.',
  },
  {
    term: 'AEO',
    termKo: 'Agent Engine Optimization (에이전트 엔진 최적화)',
    category: 'Economy & A2A',
    definition: '화려한 인간용 웹 디자인(SEO)을 넘어, 에이전트의 RAG 파서가 정보를 빠르고 정확하게 수집하도록 llms.txt, 마크다운 등의 데이터 구조를 최적화하는 마케팅 기술.',
    example: 'AEO 시대를 맞아 웹사이트에 llms.txt 문서를 배치하여 에이전트 노출도를 높였다.',
  },
  {
    term: 'Proof of Humanity',
    termKo: '휴먼 보증마크 (인간성 증명)',
    category: 'Philosophy & Organic',
    definition: '기계가 오차 0%로 무한 복제하는 시대에, 인간 장인의 붓 자국, 흙 가마의 불 얼룩, 실수, 땀과 같은 결함과 수고로움이 정품임을 증명하는 프리미엄 인증.',
    example: '미세한 물레 비대칭은 기계산이 아닌 인간 장인의 Proof of Humanity가 된다.',
  },
  {
    term: 'Tech-Audit',
    termKo: 'Tech-Audit (기술 감사 및 판단 궤적 봉인)',
    category: 'Trading & B2B',
    definition: '에이전트가 수행한 자율 판단 및 A2A 결제 내역을 암호화 해시로 봉인하여, 분쟁 시 사법적/법적 영수증 역할을 수행하는 무결성 검증 인프라.',
    example: 'OAE-OS의 Tech-Audit 모듈이 에이전트 간 120억 원 거래의 무결성을 입증했다.',
  },
  {
    term: 'Machine Wallet',
    termKo: '머신 월렛 (기계 지갑)',
    category: 'Economy & A2A',
    definition: '에이전트에 정해진 예산 캡(Cap)과 재무적 킬 스위치를 부여하여, A2A 거래 시 0.001원 단위로 실시간 마이크로 결제를 실행하는 디지털 암호 지갑.',
    example: '영업 에이전트는 머신 월렛을 사용하여 필요한 데이터셋 API 호출비를 즉시 정산했다.',
  },
];
