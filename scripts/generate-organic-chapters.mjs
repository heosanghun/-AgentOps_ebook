import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const textDir = path.join(root, 'scripts/organic-text');
const outFile = path.join(root, 'src/data/organicChapters.ts');

const chaptersMeta = [
  {
    id: 'prologue',
    title: '프롤로그 | 0.1초의 알고리즘과 3시간의 모닥불',
    readingTimeMinutes: 14,
    summary:
      '세계 모델이 0.1초에 공급망을 방어한 금요일, 나는 3시간 부채질로 불을 피운다. 이성의 극치와 의도적 비효율의 역설.',
    keyTakeaways: [
      '완벽한 백엔드 덕에 인간은 의도적 비효율을 산다.',
      '기계는 결점을 없애고, 인간은 결점을 누린다.',
      '럭셔리는 Seamless가 아니라 Friction에 있다.'
    ]
  },
  {
    id: 'ch01',
    title: '1장. 르네상스 원근법과 세계 모델의 완성',
    readingTimeMinutes: 20,
    summary:
      '15세기 원근법·해부학과 21세기 세계 모델—비즈니스계 르네상스. 오차율 0%로 세상을 재현하려는 이성의 승리.',
    keyTakeaways: [
      '르네상스 원근법 = 세계 모델과 하이퍼그래프.',
      'Representation(사실적 재현)에 일생을 바치던 시대.',
      'AI 시대의 가치 척도가 뒤집히는 거시적 배경.'
    ]
  },
  {
    id: 'ch02',
    title: "2장. 카메라의 발명과 '실행(Execution)'의 디플레이션",
    readingTimeMinutes: 19,
    summary:
      '사진기가 사실주의 회화를 0.1초에 복제했듯, AI가 How(실행)를 수돗물처럼 공짜 Utility로 만든다.',
    keyTakeaways: [
      '카메라 = AI 에이전트, 사실적 재현 가치 0원.',
      '정답의 디플레이션—100점이 공짜면 차별화는 사라진다.',
      '완벽한 마케팅·코드·분석은 인프라가 된다.'
    ]
  },
  {
    id: 'ch03',
    title: '3장. 인상파·다다이즘과 희소성의 이동',
    readingTimeMinutes: 21,
    summary:
      '카메라가 정확함을 독점하자 화가들은 불완전함·감성·우연으로 도망쳤다. 자본주의는 인상파적 비즈니스로 회귀한다.',
    keyTakeaways: [
      '인상파·추상·다다이즘 = What/Why로 가치 이동.',
      '카메라가 흉내 못 하는 신체적 행위와 우연.',
      'AI 최적화 다음은 오가닉(Organic) 럭셔리.'
    ]
  },
  {
    id: 'ch04',
    title: '4장. [수고로움의 자본] 모닥불과 텐트의 경제학',
    readingTimeMinutes: 18,
    summary:
      '스마트 호텔보다 비싼 텐트. Physical Effort와 마찰 속에서 유기체임을 확인한다. 상위 1%는 불편할 권리를 산다.',
    keyTakeaways: [
      '육체의 땀은 기계가 대신하면 의미가 사라진다.',
      '잭슨 폴록처럼 몸을 던지는 행위가 프리미엄.',
      '하위 99%는 편리, 상위 1%는 수고 과시.'
    ]
  },
  {
    id: 'ch05',
    title: '5장. [결함의 자본] 붓 자국과 흙구운 가마의 르네상스',
    readingTimeMinutes: 20,
    summary:
      '0.001mm 무결점 도자기는 공산품. 비대칭·요변·임파스토가 Proof of Humanity. 결함이 진품 보증서.',
    keyTakeaways: [
      'Six Sigma 0% 완벽함은 기계 싸구려 상징.',
      '장인의 미세 불규칙성이 에르메스급 프리미엄.',
      '3D 프린트 가구보다 대패 실수가 남은 원목 의자.'
    ]
  },
  {
    id: 'ch06',
    title: '6장. [우연의 자본] 잭슨 폴록과 길을 잃을 권리',
    readingTimeMinutes: 22,
    summary:
      'MCTS Happy Path는 권태. 폴록의 흩뿌림처럼 Serendipity를 쇼핑한다. 1·2부 핵심 요약과 실행 체크리스트.',
    keyTakeaways: [
      '완벽한 리스크 제거는 Boredom.',
      '블라인드 투어·숲 버섯 오마카세가 최고가 자산.',
      '미술사→AI→오가닉 진화 한 줄 요약.'
    ]
  },
  {
    id: 'ch07',
    title: '7장. 매끄러움(Seamless)은 하청의 조건, 마찰(Friction)은 본청의 특권',
    readingTimeMinutes: 19,
    summary:
      '러다이트가 아닌 투트랙: 백엔드 100% AI, 프론트는 Intentional Friction·Ritual. 3만 원 칵테일은 10분 의식.',
    keyTakeaways: [
      '백엔드 한계비용 0, A2A·MCTS 포함.',
      'Seamless는 Mass, 마찰은 Luxury 권력.',
      '미술이 붓 터치로 도망친 것처럼 브랜드는 마찰 설계.'
    ]
  },
  {
    id: 'ch08',
    title: '8장. 언플러그드(Unplugged)와 블랙아웃(Blackout) 비즈니스',
    readingTimeMinutes: 18,
    summary:
      '24h 세계 모델 연결 시대, 가장 비싼 상품은 단절. Faraday Cage·Blackout 의식.',
    keyTakeaways: [
      '생존을 위해 24h 접속 vs 부의 단절 구매.',
      '“에이전트가 작동하지 않습니다”가 도발적 카피.',
      '절대 고요·육감만의 공간이 거대 산업.'
    ]
  },
  {
    id: 'ch09',
    title: '9장. 메이커 무브먼트(Maker Movement)의 하이엔드화',
    readingTimeMinutes: 20,
    summary:
      'AI Mass Track(99%) + Organic High-end Track(1%). 잉여 자본을 Maker·장인에 재투자.',
    keyTakeaways: [
      '듀얼 트랙: 무결점 대량 vs 수제 한정.',
      '아날로그 기계식 시계급 천문학적 프리미엄.',
      '남은 인간은 AI 관리자가 아니라 Maker.'
    ]
  },
  {
    id: 'ch10',
    title: "10장. 'How(어떻게)'의 종말과 뒤샹의 변기",
    readingTimeMinutes: 21,
    summary:
      '실행 장인 시대 종말. 뒤샹처럼 What/Why를 던지는 호모 아키텍투스가 최고의 리더.',
    keyTakeaways: [
      '세계 모델이 How를 0.1초에 1만 개 제시.',
      '뒤샹의 Fountain = 개념·질문이 예술.',
      'Original Question을 던지는 설계자 리더십.'
    ]
  },
  {
    id: 'ch11',
    title: '11장. 호모 파베르의 은퇴와 쓸모없어질 용기',
    readingTimeMinutes: 18,
    summary:
      '생산성=도덕의 종교 붕괴. 노동 해방 후 Utility 강박을 버릴 용기.',
    keyTakeaways: [
      '호모 파베르 시대 종말, 노동은 취미·해방.',
      '“기여하지 않으면 나는 누구인가?” 극복.',
      '유능함 과시 불필요.'
    ]
  },
  {
    id: 'ch12',
    title: '12장. 호모 루덴스(Homo Ludens), 놀이하는 인간의 귀환',
    readingTimeMinutes: 20,
    summary:
      'ROI 0의 모래성·캠핑·도자기—무의미의 아름다움. AI 발명 목적은 유희의 시간.',
    keyTakeaways: [
      '목표·성과는 기계, 인간에게는 Play.',
      '요한 하위징아의 호모 루덴스 부활.',
      '생존 짐을 기계에 넘기고 사랑·예술·별.'
    ]
  },
  {
    id: 'epilogue',
    title: '에필로그 | 완벽한 신이 사랑한 흠집투성이의 세계',
    readingTimeMinutes: 14,
    summary:
      '6부작 여정 후—백엔드는 통제하되 인간을 기계로 만들지 말라. Organic의 시간이 목적.',
    keyTakeaways: [
      '물감을 엎지르는 우연 속 예술—Organic의 아름다움.',
      '효율화의 목적은 오가닉한 낭비의 시간.',
      '기계는 연산, 인간은 비효율 속에서 승리.'
    ]
  },
  {
    id: 'appendix',
    title: '부록 | AX·Organic 밸런스, 호모 루덴스 HR, 6부작 Master Map',
    readingTimeMinutes: 16,
    summary:
      '좌뇌/우뇌 진단표, Original Question 중심 HR, 이주환 6부작 궤적.',
    keyTakeaways: [
      'AI 백엔드 vs Human 프론트 분리.',
      '생산성 KPI에서 철학·놀이로.',
      '6부작 마지막: 본성으로의 회귀.'
    ]
  }
];

function escapeTemplateLiteral(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function formatKeyTakeaways(items) {
  return items.map((t) => `      '${t.replace(/'/g, "\\'")}'`).join(',\n');
}

const parts = [`import { Chapter } from '../types';\n\nexport const organicChapters: Chapter[] = [`];

for (const ch of chaptersMeta) {
  const bodyPath = path.join(textDir, `${ch.id}.txt`);
  if (!fs.existsSync(bodyPath)) {
    throw new Error(`Missing body file: ${bodyPath}`);
  }
  const content = fs.readFileSync(bodyPath, 'utf8').trimEnd();
  const title = ch.title.includes("'") ? `"${ch.title.replace(/"/g, '\\"')}"` : `'${ch.title}'`;
  parts.push(`  {
    id: '${ch.id}',
    title: ${title},
    readingTimeMinutes: ${ch.readingTimeMinutes},
    summary:
      '${ch.summary.replace(/'/g, "\\'")}',
    keyTakeaways: [
${formatKeyTakeaways(ch.keyTakeaways)}
    ],
    content: \`${escapeTemplateLiteral(content)}\`
  },`);
}

parts.push('];\n');
fs.writeFileSync(outFile, parts.join('\n'), 'utf8');
console.log('Wrote', outFile);
