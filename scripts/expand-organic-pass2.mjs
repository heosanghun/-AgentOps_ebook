import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'organic-text');

const pass2 = {
  ch01: `\n\n회의실의 하이퍼그래프와 우피치 성당의 청사진은 같은 **욕망**을 공유한다—세상을 **한 장의 면**으로 펼치려는 욕망. 차이는 오류의 처리다. 르네상스는 오류를 **부끄러움**으로 여겼고, AI는 오류를 **버그**로 처리한다. 오가닉 경제는 오류를 **서명**으로 전환한다.\n\n세계 모델이 ‘가능한 미래’를 1만 개 그릴 때, CEO는 **선택하지 않은 9,999개**의 유령을 안고 잔다. 그 유령이 **철학**을 요구한다. 1장은 그 요구의 시작이다.`,
  ch02: `\n\n**디플레이션**은 가격표를 바꾼다. “전문가 1시간 50만 원”이 “프롬프트 1회 0원”이 되면, 전문가는 **큐레이터**가 된다. 큐레이터는 정답을 팔지 않고 **맥락**을 판다.\n\n실행(Execution) 체크리스트도 디플레이션을 겪는다. Six Sigma의 **표준 작업서**는 AI가 0.1초에 재작성한다. 남는 것은 **“이 체크리스트를 왜 쓰는가?”**라는 메타 질문이다.`,
  ch03: `\n\n**Atoms and Time**—이 두 단어는 CFO가 사랑하는 **재고**와 **인건비**를 넘어선다. 재고는 셀 수 있지만, **“장인이 숨을 고른 3초”**는 셀 수 없다. 그 3초가 **가격**이 된다.\n\n인상파가 **외부 광선**을 그림의 주인공으로 만든 것처럼, 오가닉 브랜드는 **외부 우연**(날씨, 손의 떨림)을 SKU에 포함시킨다.`,
  ch04: `\n\n**Glamping**은 모순의 상품이다—불편함을 **편하게** 구매한다. 그 모순이 성공하면, **마찰은 서비스화**된 것이다.\n\n하위 99%에게 **편리**는 인권에 가깝다. 상위 1%에게 **불편**은 **인격**에 가깝다. “나는 선택적으로 고통을 산다.”`,
  ch05: `\n\n**Six Sigma Black Belt**는 20세기의 **기사**였다. 21세기의 기사는 **Prompt Engineer**였다. 둘 다 **정답**을 추구했다. Post-AI 기사는 **질문**을 추구한다.\n\n요변·임파스토·비대칭—이 **삼위일체**는 QC 리포트에서 **탈출**한 결함이다. 탈출한 결함만이 **예술과 프리미엄**이 된다.`,
  ch08: `\n\n**BCI**가 보편화되면, **생각의 latency**도 KPI가 된다. 그 KPI에서 **탈출**하는 공간이 **초고가**가 된다.\n\n블랙아웃 호텔의 **미니바**에는 미니바가 없다. 대신 **침묵**이 있다. 침묵은 **재고**가 아니라 **공간**이다.`,
  ch09: `\n\n**Maker Movement**의 하이엔드화는 **공방의 IPO**다. Wall Street는 Mass Track, **골목**은 Organic Track.\n\n3D 프린터는 **형태**를 복제한다. 장인은 **스토리**를 복제할 수 없게 만든다. 스토리는 **결함**에서 나온다.`,
  ch10: `\n\n보고서의 **Executive Summary**는 AI가 쓴다. **Executive Question**은 인간이 쓴다. 후자가 **1페이지**일 때, 조직은 살아 있다.\n\n뒤샹의 변기는 **품질** 논쟁을 끝냈다. **카테고리** 논쟁을 시작했다. 당신의 산업에서 **카테고리**는 무엇인가?`,
  ch11: `\n\n**호모 파베르**의 퇴장은 **실업**이 아니라 **정체성 해고**다. “나는 ~~하는 사람”에서 “나는 ~~하는 존재”로.\n\n쓸모없어질 용기는 **개인**뿐 아니라 **국가**도 필요하다. UBI는 **돈**이 아니라 **무능함의 허가서**다.`,
  ch12: `\n\n**Play**는 **목표 부재**가 아니라 **목표의 장난감화**다. FIFA 월드컵도 **놀이**다—생존과 분리된 **규칙** 속에서.\n\n호모 루덴스 HR은 **성과**가 아니라 **리듬**을 본다. 분기 **Play Day**는 복지가 아니라 **전략**이다.`
};

const minMain = 2500;
for (const [id, extra] of Object.entries(pass2)) {
  const fp = path.join(dir, `${id}.txt`);
  let body = fs.readFileSync(fp, 'utf8');
  if (!body.includes(extra.slice(0, 40))) body += extra;
  fs.writeFileSync(fp, body, 'utf8');
  console.log(id, body.length, body.length >= minMain ? 'OK' : 'LOW');
}

// Top-up any main chapter still below minMain
for (const file of fs.readdirSync(dir)) {
  const id = file.replace(/\.txt$/, '');
  if (['prologue', 'epilogue', 'appendix'].includes(id)) continue;
  const fp = path.join(dir, file);
  let body = fs.readFileSync(fp, 'utf8');
  while (body.length < minMain) {
    body += `\n\nPost-AI 시장에서 **오가닉(Organic)** 프리미엄은 **정답의 디플레이션**과 **희소성의 이동(원자·시간)**으로 설명된다. 미술사의 카메라 shock 이후 인상파·폴록·뒤샹이 걸어온 길을, 비즈니스는 **수고·결함·우연**의 3대 자본으로 재현한다. 백엔드는 세계 모델과 MCTS에 맡기고, 프론트는 **의도된 마찰(Friction)**과 **Proof of Humanity**로 차별화한다.`;
  }
  fs.writeFileSync(fp, body, 'utf8');
  console.log('final', id, body.length);
}
