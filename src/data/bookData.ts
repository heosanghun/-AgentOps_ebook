import { Book } from '../types';
import { machineEconomyChapters } from './machineEconomyChapters';
import { worldModelChapters } from './worldModelChapters';
import { homoArchitectusChapters } from './homoArchitectusChapters';
import { organicChapters } from './organicChapters';

export const bookData: Book[] = [
  {
    id: 'homo_architectus',
    volumeNumber: 7,
    title: '제7권: 호모 아키텍투스 (Homo Architectus)',
    subtitle: '신(神)을 설계하는 인간 — 아톰, 자율 경제, 그리고 인류의 마지막 리더십',
    coverBadge: 'Final Leadership',
    color: 'purple',
    description:
      'Embodied AI·RoboOps, 자율 주권 기업과 자본주의 3.0, 인지 자본, Reward Function 헌법, Alignment와 Kill Switch—6부작 AI 패러다임의 대단원.',
    chapters: homoArchitectusChapters
  },
  {
    id: 'organic',
    volumeNumber: 6,
    title: '제6권: 오가닉 (The Organic)',
    subtitle: '완벽한 기계들의 세계, 비효율은 어떻게 최고의 럭셔리가 되는가',
    coverBadge: 'Masterpiece',
    color: 'emerald',
    description:
      '미술사 평행이론·3대 자본·의도된 마찰·뒤샹과 호모 아키텍투스—6부작 종착지.',
    chapters: organicChapters
  },
  {
    id: 'world_model',
    volumeNumber: 5,
    title: '제5권: 세계 모델 (The World Model)',
    subtitle: '일어날 수 있는 모든 미래를 계산하는 기업',
    coverBadge: 'Core Intelligence',
    color: 'indigo',
    description:
      '백테스트의 종말, 펄의 인과 사다리, 하이퍼그래프·Mamba·MCTS, FiLM Zero-shot 태세 전환, 금융·공급망·전략 실전과 세계의 건축가까지—3세대 지능의 완전한 청사진.',
    chapters: worldModelChapters
  },
  {
    id: 'machine_economy',
    volumeNumber: 4,
    title: '제4권: 기계들의 시장 (The Machine Economy)',
    subtitle: '에이전트가 에이전트와 거래하는 시대의 비즈니스와 경제학',
    coverBadge: 'A2A Protocol',
    color: 'amber',
    description:
      'B2A 전환, AEO, 머신 월렛·마이크로 페이먼트, A2A 협상과 자율 공급망, 플래시 크래시·서킷 브레이커, 에이전틱 컴퍼니까지—기계 고객 시장의 완전한 실전 매뉴얼.',
    chapters: machineEconomyChapters
  },
  {
    id: 'cognitive',
    volumeNumber: 3,
    title: '제3권: 인지 아키텍처 (Cognitive Architecture)',
    subtitle: '기억하고 통찰하는 지능의 설계도',
    coverBadge: 'Memory & Context',
    color: 'purple',
    description: '단기 프롬프트 창을 넘어서 장기 가상 메모리(LVM), 벡터 데이터베이스, 그래프 지식 맵을 융합하는 차세대 AI 인지 아키텍처.',
    chapters: [
      {
        id: 'ch1',
        title: '프롤로그 | 망각하는 AI와 장기 기억의 필요성',
        readingTimeMinutes: 5,
        summary: '컨텍스트 윈도우가 아무리 커져도 연산비용과 유실(Lost in the Middle) 현상은 피할 수 없다. 에이전트에게 인간 수준의 장기 기억을 부여하는 법.',
        keyTakeaways: [
          '대용량 컨텍스트 윈도우는 참된 인지 기억을 대체하지 못한다.',
          '작업 기억(Working Memory)과 에피소드 기억(Episodic Memory)의 분리.',
          '기업 고유의 도메인 지식 그래프가 가장 강력한 해자(Moat)가 된다.'
        ],
        content: `우리는 AI에게 더 긴 글을 읽힐 수만 있다면 인공지능이 똑똑해질 것이라는 착각에 빠져 있었다. 그러나 컨텍스트 윈도우가 100만 토큰으로 늘어나도, 중앙에 있는 정보를 놓치는 'Lost in the Middle' 현상과 기하급수적인 비용 폭증은 막을 수 없었다.

인간의 뇌는 평생 보고 들은 모든 것을 머릿속에 상시 띄워놓고 살지 않는다. 필요할 때 신경 회로를 재가동하여 필요한 장기 기억을 인출(Retrieval)해 낸다. 인지 아키텍처의 혁신은 바로 이 '작업 기억(Working Memory)'과 '에피소드 기억(Episodic Memory)'의 이원화 구조에서 시작된다.`
      },
      {
        id: 'ch2',
        title: '아키텍처 | 벡터DB와 그래프-RAG의 융합',
        readingTimeMinutes: 6,
        summary: '단순한 파편적 유사도 검색을 넘어, 관계적 인과성 구조를 엮어내는 Graph-RAG 아키텍처.',
        keyTakeaways: [
          'Vector Search: 단어와 의미의 유사성 탐색 (1차원적)',
          'Graph-RAG: 노드와 엣지로 엔티티 간의 인과 및 맥락 연결 (3차원적)',
          '하이브리드 기억 엔진이 환각(Hallucination)을 제어로 변환한다.'
        ],
        content: `단순한 벡터 검색(Vector Search)은 "A와 비슷한 단어"를 찾을 수는 있지만, "A가 B에 미친 영향 때문에 C가 어떤 결정을 내렸는가"라는 복잡한 관계망을 재구성하지 못한다.

해답은 지식 그래프(Knowledge Graph)와 벡터 RAG의 융합이다. 엔티티 간의 인과 관계를 관계형 그래프로 고정하고, 각 노드의 세부 의미를 벡터 임베딩으로 감싸 안는다. 이렇게 구축된 하이브리드 기억 엔진은 기업의 지난 10년 치 회의록, 계약서, 고객 상담 기록에서 완벽한 문맥과 인과 관계를 추려낸다.`
      }
    ]
  },
  {
    id: 'autonomous_exec',
    volumeNumber: 2,
    title: '제2권: 자율 실행 (Autonomous Execution)',
    subtitle: '챗봇을 넘어 행동하는 에이전트 체계',
    coverBadge: 'Action & Control',
    color: 'blue',
    description: '텍스트 생성기에 불과했던 LLM이 브라우저, Terminal, API를 직접 조작하며 복잡한 다단계 비즈니스 프로세스를 완수하는 기술.',
    chapters: [
      {
        id: 'ch1',
        title: '프롤로그 | 대화형 인터페이스의 종말',
        readingTimeMinutes: 5,
        summary: '물어보면 대답만 하는 챗봇은 자율 기업의 구성원이 될 수 없다. 스스로 계획을 수립하고 검증하며 도구를 사용하는 자율 실행 체계.',
        keyTakeaways: [
          'Prompt-In Text-Out의 수동적 챗봇 패러다임은 한계에 다달았다.',
          'ReAct (Reasoning + Acting) 루프와 자율 도구 사용.',
          '실패를 스스로 감지하고 재시도(Self-Correction)하는 내구성.'
        ],
        content: `상사에게 "올해 3분기 마케팅 보고서를 작성해"라고 요청했을 때, 상사가 원하는 것은 보고서에 들어갈 목차 아이디어를 몇 줄 읊어주는 챗봇이 아니다. 실제로 데이터를 수집하고, 차트를 그리고, 문서를 작성하여 이메일로 발송하는 '완성된 결과물'이다.

자율 실행 에이전트(Autonomous Execution Agent)는 사용자의 고차원적 목표(Goal)를 수신하면, 이를 실행 가능한 하위 과제(Sub-tasks)로 분해하고, 브라우저와 Terminal API를 가동하여 목표가 달성될 때까지 끊임없이 행동-검증 루프를 돌린다.`
      }
    ]
  },
  {
    id: 'platform_paradox',
    volumeNumber: 1,
    title: '제1권: 플랫폼 패러다임의 종말 (Platform Paradox)',
    subtitle: '모바일App에서 에이전트 자율 생태계로',
    coverBadge: 'Genesis',
    color: 'rose',
    description: '아이폰 출범 이후 15년간 자본주의를 지배했던 App-Store와 화면 기반 플랫폼의 종말, 그리고 에이전트 중심 인터페이스로의 서막.',
    chapters: [
      {
        id: 'ch1',
        title: '프롤로그 | 앱의 사멸과 에이전트의 부상',
        readingTimeMinutes: 5,
        summary: '배달의민족, 카카오톡, 토스 앱을 일일이 켜서 터치하던 시대가 가고, 개인 에이전트 하나가 모든 플랫폼 서비스를 대리하는 시대.',
        keyTakeaways: [
          'App Store 중심의 모바일 생태계 해체',
          '사용자는 개별 앱 UI를 방문하지 않고 개인 에이전트와만 대화한다.',
          '플랫폼의 주도권이 서비스 제공자에서 개인 에이전트로 이동한다.'
        ],
        content: `지난 15년 동안 우리는 음식을 시키려면 배달 앱을 열고, 택시를 부르려면 호출 앱을 열고, 송금을 하려면 금융 앱을 열었다. 그러나 이 모든 '앱'이라는 격리된 섬들은 인간의 주의력(Attention)을 갈아 넣는 최악의 인터페이스였다.

이제 소비자는 앱을 직접 실행하지 않는다. 나를 가장 잘 아는 개인 에이전트에게 "오늘 저녁에 친구 3명과 어울릴 만한 장소 예약하고 택시 불러줘"라고 말하면, 에이전트가 각 플랫폼의 API를 직접 가동해 상황을 종료시킨다. 플랫폼의 브랜드 가치는 해체되고 에이전트 접점이 생태계의 중심이 된다.`
      }
    ]
  },
  {
    id: 'appendix',
    volumeNumber: 0,
    title: '부록: OAE 자율 기업 창업 및 B2B 전략',
    subtitle: '이론을 실전 비즈니스로 바꾸는 청사진',
    coverBadge: 'Business Blueprint',
    color: 'sky',
    description: 'OAE Tech 사업계획서, OAE 3각 편대(Quant, Bio, Tech), 그리고 에이전트 결제 프로토콜 분석 보고서.',
    chapters: [
      {
        id: 'business_plan',
        title: 'OAE Tech 사업계획서 (모두의 창업 2라운드)',
        readingTimeMinutes: 6,
        summary: '클라우드에 의존하지 않고 기업의 비밀을 지키는 내 책상 위 폐쇄망 AI 운영체제 Cogni-OS와 어플라이언스 수익 모델.',
        keyTakeaways: [
          '문제의식: 클라우드 AI 연동 시 기업의 핵심 데이터 및 기술 IP 유출 위험',
          '해법: Mamba & 1D-CNN 기반으로 1대 PC에서 작동하는 폐쇄망(Air-Gapped) AI-OS',
          '비즈니스 모델: Appliance 1.1억 원 초기 납품 + 특화 플러그인 월 구독 MRR'
        ],
        content: `[Executive Summary]
"클라우드에 의존하는 거대 AI의 시대는 끝났습니다. 이제 기업의 비밀을 지키는 '내 책상 위의 완벽한 지능'이 세상을 지배합니다."
당사는 Mamba & 1D-CNN 기반으로 메모리 폭발을 억제하고 단 1대의 PC에서 무한 추론이 가능한 폐쇄망(Air-Gapped) AI 운영체제 'Cogni-OS'를 납품합니다.

[경쟁력: 극강의 Dogfooding]
당사는 자체 보유한 수천억 원 규모의 퀀트 트레이딩 알고리즘(OAE Quant)과 재생 앰플 바이오 IP(OAE Bio)를 보호하기 위해 본 시스템을 직접 구축하여 12ms의 초저지연 속도와 무결성을 입증했습니다. 

[비즈니스 모델: 면도기와 면도날]
Step 1: OAE-OS Appliance (하드웨어+OS) 1.1억 원 초기 납품 (Lock-in)
Step 2: 금융, 바이오, 방산 도메인 특화 플러그인 구독 (월 150만 원 MRR 창출)`
      },
      {
        id: 'organic_company',
        title: 'OAE (Organic Autonomous Entity)의 3각 편대',
        readingTimeMinutes: 7,
        summary: '세계 모델 퀀트 트레이딩(Quant), 금산 오가닉 재생 앰플(Bio), 폐쇄망 AI 인프라(Tech)로 이루어진 궁극의 자율 기업 구도.',
        keyTakeaways: [
          '1. OAE Quant (실리콘/효율): 세계 모델과 MCTS가 생성하는 무한 캐시카우',
          '2. OAE Bio (흙/비효율): 100% 휴먼 땀으로 완성하는 구증구포 하이엔드 럭셔리',
          '3. OAE Tech (인프라/B2B): 두 비즈니스의 심장인 폐쇄망 AI 어플라이언스 B2B 판매'
        ],
        content: `주식회사 OAE는 AI 기술의 정점과 인간 본성의 정점을 융합한 궁극의 자율 기업입니다.

1. OAE Quant (효율의 끝 - 실리콘): 세계 모델과 MCTS가 0.1초 단위로 글로벌 시장의 리스크를 방어하며 회사의 무한한 현금 흐름을 창출하는 캐시카우.
2. OAE Bio (비효율의 끝 - 흙): 금산 300평 농장에서 인간의 땀으로 구증구포 인삼과 병풀을 길러내어, 기계가 흉내 낼 수 없는 100% 오가닉 재생 앰플 하이엔드 럭셔리 브랜드를 전개.
3. OAE Tech (인프라 B2B): 위 두 비즈니스의 심장인 '폐쇄망 AI + 보안 감사(Tech-Audit) 시스템' 자체를 방산/금융/반도체 기업에 수억 원대 어플라이언스로 납품.`
      },
      {
        id: 'payment_protocol',
        title: '[분석] 에이전트 결제 프로토콜의 의미',
        readingTimeMinutes: 6,
        summary: 'Agentic AI Alliance(AAIA) 결제 프로토콜의 등장과 소프트웨어 생태계의 MaaS 전환, 그리고 OAE Tech-Audit의 법적 알리바이 역할.',
        keyTakeaways: [
          'A2A 실시간 자동 결제: 인간의 OTP나 카드입력 없는 에이전트 간 정산',
          'SaaS -> MaaS: API 호출 단위 초미세 스트리밍 결제로 과금 체계 변경',
          'Tech-Audit: 해시 기반 판단 궤적 봉인 기술로 기계 간 분쟁 시 디지털 알리바이 제공'
        ],
        content: `Agentic AI Alliance(AAIA)에서 논의되는 '에이전트 결제 프로토콜'은 기계들의 시장(Machine Economy)이 현실화되었음을 알리는 가장 강력한 신호입니다.
인간의 개입(OTP, 신용카드) 없이 에이전트 간(A2A) 실시간 정산이 가능해짐에 따라, 글로벌 소프트웨어 시장은 SaaS에서 MaaS(Model-as-a-Service, 종량제)로 완전히 재편됩니다.
OAE-OS의 'Tech-Audit(해시 기반 판단 궤적 봉인)' 기술은 에이전트 간 결제 분쟁 시 완벽한 '법적 영수증(디지털 알리바이)' 역할을 수행하며 이 생태계의 핵심 인프라로 자리 잡을 것입니다.`
      }
    ]
  }
];
