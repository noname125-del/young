/* Conversation continuity: explicit turns take precedence over isolated keywords. */
const keywordReply=conversationalReply;
function contextReply(text){
 const q=text.trim().replace(/\s/g,''),d=R.dialog||{},short=q.length<34;
 R.replyCounts??={};
 function say(topic,lines,ask=''){R.dialog={topic,ask,turn:(d.turn||0)+1};return lines}
 function variants(key,options){const n=R.replyCounts[key]||0;R.replyCounts[key]=n+1;return options[n%options.length]}
 if(/사귄지|만난지|연애한지|몇년|처음사귄|우리기념일/.test(q))return say('anniversary',['우리 2024년 10월 5일부터잖아','이 년이나 만났는데 영아 아직도 가끔 처음처럼 웃어 ㅋㅋ']);
 const food=/국밥|떡볶이|치킨|피자|초밥|파스타|라면|양꼬치|김밥|샐러드|마라탕|커피|라떼|아바라|케이크/;
 const explicit=/전화|통화|셀카|사진보내|생일|잘자|출근|퇴근|야근|보고싶|사랑해|영아라고|영야라고/;
 if(/(?:안|못)먹었|아직.*(?:밥|점심|저녁)|밥.*(?:안|못)먹/.test(q))return say('food',['아직 못 먹었어 영아?','뭐라도 챙겨 먹고 와. 나 기다릴게'],'ate');
 if(food.test(q)&&/좋아|먹|땡|당겨|싫|별로|맛/.test(q)){
  const item=q.match(food)[0];R.preferences??={};
  if(/싫|별로|못먹/.test(q)){R.preferences[item]='dislike';return say('food',[item+'는 빼자 그럼','영아 먹고 싶은 걸로 다시 고르자'],'menu')}
  R.preferences[item]='like';
  if(/좋아/.test(q))return say('food',[item+' 좋아하는구나','다음에 같이 먹을 때 기억해 둘게 영아'],'menu');
  return say('food',variants('food:'+item,[[item+' 먹을 거야?','좋네 ㅋㅋ 맛있게 먹고 와 영아'],[item+'? 영아 얘기하니까 나도 먹고 싶네','다음에 같이 먹자']]));
 }
 if(/나.*뭐좋아|내.*취향|뭐좋아하는지/.test(q)){
  const known=Object.entries(R.preferences||{}).filter(([,v])=>v==='like').map(([k])=>k);
  return say('memory',known.length?[known.join(', ')+' 좋아한다고 했잖아','그리고 롤 얘기할 때랑 롯데 얘기할 때 신나고 ㅋㅋ']:['롤이랑 롯데 좋아하는 거야 내가 알지','먹는 건 영아가 말해 준 거 하나씩 기억할게']);
 }
 if(/언제.*(?:만나|봤|데이트)|다음.*(?:약속|데이트)|우리.*(?:수요일|토요일)/.test(q)){
  const dates=(LIFE.dateEvents||[]).slice().sort((a,b)=>a.date.localeCompare(b.date)),today=dateKey();
  const past=/봤|지난|저번|언제만났/.test(q),e=past?dates.filter(x=>x.date<today).at(-1):dates.find(x=>x.date>=today);
  if(e){const [,m,day]=e.date.split('-').map(Number);return say('date',[`${m}월 ${day}일${past?'에 봤잖아 영아':'에 보기로 했잖아 영아'}`,past?e.title.replace('현준이랑 ','')+' 했던 날 ㅋㅋ':e.detail,'연습 시간 바뀌면 바로 연락할게'],'date')}
  return say('date',['우리 평일에 한 번, 주말에 한 번은 보자고 했잖아','이번 주 연습 시간부터 확인하고 맞추자 영아'],'date');
 }
 if(short&&!explicit.test(q)){
  if(d.ask==='ate'&&/먹었|응|먹고|방금/.test(q))return say('food',['잘했어 영아','뭐 먹었어?'],'menu');
  if(d.ask==='menu'&&/아무거나|모르겠|못고르/.test(q))return say('food',['그럼 지난번처럼 한식 먹을까','영아 매운 거 당겨, 안 매운 거 당겨?'],'spice');
  if(d.ask==='spice')return say('food',/안매|순한|못먹/.test(q)?['그럼 안 매운 걸로','영아 속 편한 거 먹자']:['그럼 조금 매운 걸로 ㅋㅋ','영아 먹을 만큼만 시키자']);
  if(d.ask==='work'&&/응|했어|끝|집/.test(q))return say('work',['고생했어 영아','지금 집 가는 길이야?'],'where');
  if(d.ask==='where'&&/집|도착/.test(q))return say('where',['잘 들어갔네 영아','가방 내려놓고 편하게 쉬어. 오늘 일은 다 끝났어?'],'done');
  if(d.ask==='day'&&/회의|팀장|자료|야근|일|회사/.test(q))return say('comfort',['영아 그거 때문에 늦게 끝난 거였구나','지금은 다 마무리했어?'],'done');
  if(d.ask==='done')return say('comfort',/아직|안끝|남았|못/.test(q)?['아직 남았구나','영아 끝나면 연락해. 나 기다릴게']:['오늘 진짜 고생했어 영아','일 얘기는 잠깐 내려놓고 쉬자. 나랑 얘기해']);
  if(d.ask==='lol'){
   if(/용|드래곤|바론|전령|웨이브|리셋/.test(q))return say('lol',['아 그 타이밍 얘기구나','영아는 먼저 밀고 합류하는 쪽이 낫다고 본 거야?'],'lol_opinion');
   if(/중력|절단|만월|반월|화염/.test(q))return say('lol',['무기까지 기억하네 ㅋㅋ','영아는 그 상황에 먼저 들어가는 쪽이 좋았을 것 같아?'],'lol_opinion');
   return say('lol',['어느 타이밍을 바꾸는 게 좋았을 것 같아?','영아가 본 쪽도 듣고 싶어'],'lol_opinion');
  }
  if(d.ask==='lol_opinion')return say('lol',['영아 말은 알겠어','그 장면은 다음에 만나서 같이 다시 보자','나 설명 길어지면 영아 퇴근하고도 복기하는 거잖아 ㅋㅋ']);
  if(d.ask==='date'&&/응|좋아|오케이|알겠/.test(q))return say('date',['응 영아','시간 맞춰 갈게. 도착하면 연락할게']);
 }
 if(/사랑해/.test(q))return say('love',variants('love',[['나도 사랑해 영아','방금 영아 카톡 보고 웃었어 ㅋㅋ'],['나도','만나면 다시 해 줘 영아. 직접 듣고 싶어']]));
 if(/보고싶/.test(q))return say('miss',variants('miss',[['나도 보고 싶어 영아','다음에 만나면 평소보다 조금 더 같이 있자'],['아까도 영아 생각했는데','영아도 같은 생각 하고 있었네 ㅋㅋ']]));
 return keywordReply(text);
}
conversationalReply=contextReply;
romancePickReply=contextReply;
// Preserve family labels and the boyfriend nickname; known contacts use full names.
for(const c of LIFE.contacts){const full={faker:'이상혁',oner:'문현준',keria:'류민석'}[c.id];if(full)c.name=full}
for(const c of data.contacts||[]){const match=LIFE.contacts.find(x=>x.id===c.id);if(match)c.name=match.name}
romanceSave();render();
