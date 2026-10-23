/* Shared life in the simulation: office routines, practice breaks and time together. */
function coupleClock(at=new Date()){const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Seoul',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(at);return Number(parts.find(p=>p.type==='hour').value)*60+Number(parts.find(p=>p.type==='minute').value)}
function coupleAvailability(at=new Date()){const date=at.toLocaleDateString('sv-SE',{timeZone:'Asia/Seoul'}),day=new Date(date+'T12:00:00+09:00').getUTCDay(),minute=coupleClock(at);if(day===3&&minute>=18*60&&minute<22*60)return 'date';if(day===6&&minute>=14*60&&minute<20*60)return 'date';if(minute<10*60+30)return minute<3*60?'late':'sleep';if(minute<12*60+30)return 'morning';if(minute<14*60)return 'lunch';if(minute<18*60)return 'practice';if(minute<19*60)return 'meal';if(minute<22*60+30)return 'practice';return 'late'}
const beforeCoupleReply=contextReply;
contextReply=function(text){const q=text.trim().replace(/\s/g,''),previous=R.dialog||{};R.coupleLife??={};const life=R.coupleLife;function say(topic,lines,ask=''){R.dialog={topic,ask,turn:(previous.turn||0)+1};return lines}function choose(key,options){R.replyCounts??={};const n=R.replyCounts['life:'+key]||0;R.replyCounts['life:'+key]=n+1;return options[n%options.length]}
 if(/경기.*(?:못봤|놓쳤)|회의.*경기|일.*경기.*못/.test(q))return say('watch',['영아 일하는 시간이랑 겹치면 어쩔 수 없지','결과 먼저 보기 싫으면 알림 잠깐 꺼 놔','집 가서 편하게 봐. 다 보면 나한테 얘기해 줘']);
 if(/(?:오늘|내일|주말|다음).*?(?:만나|보자|볼까)|회의끝나고.*(?:봐|보|만나)/.test(q))return say('date',['영아 몇 시쯤 끝날 것 같아?','나도 연습 시간 확인하고 맞춰 볼게','늦어지면 밖에서 기다리지 말고 먼저 연락해'],'date_time');
 if(previous.ask==='date_time'&&/(?:\d|한|두|세|네|다섯|여섯|일곱|여덟|아홉)시|퇴근후|끝나고/.test(q))return say('date',['응 영아 그 시간으로 맞춰 볼게','확인되면 다시 말해 줄게. 회사에서는 급하게 나오지 말고'],'date');
 if(/회의.*(?:들어|중|시작)|마감|검수|수정요청|자료.*(?:만들|고치|수정)|보고서/.test(q)&&!/끝|마쳤/.test(q)){life.work='busy';return say('work',choose('deadline',[['영아 아직 회사 일이 남았구나','급하게 답장 안 해도 돼. 나도 연습 들어갔다가 볼게','저녁은 거르지 말고'],['수정 또 들어왔어?','영아 파일 마무리하고 연락해. 오늘 끝나면 내가 얘기 들어줄게']]),'office_done')}
 if(/회의.*(?:끝났|끝나서|마쳤)|마감.*끝|검수.*끝|자료.*(?:끝|보냈|완료)|제출했|퇴근했|퇴근중|나퇴근|회사.*나왔/.test(q)||previous.ask==='office_done'&&/끝|다했|보냈|마쳤/.test(q)){life.work='done';return say('work',choose('offwork',[['고생했어 영아','이제 지하철 타러 가? 나는 잠깐 쉬는 중이야','영아 집 도착했다고 남겨 놓으면 끝나고 볼게'],['영아 오늘도 퇴근 성공했네 ㅋㅋ','나는 조금 더 남았어. 먼저 가서 씻고 쉬고 있어','끝나면 연락할게']]),'commute')}
 if(previous.ask==='commute'&&!/사랑|보고싶|밥|전화|연습/.test(q)){if(/도착|집이야|집왔/.test(q))return say('work',['잘 들어갔네 영아','가방 내려놓고 씻고 와. 오늘은 회사 얘기부터 들을게'],'office_story');if(/지하철|버스|환승|가는중|탔어/.test(q))return say('work',['응 영아. 환승할 때는 화면 잠깐 내려놓고 ㅋㅋ','앉았으면 조금 쉬어. 집 가는 동안은 내가 같이 얘기해 줄게'],'commute')}
 if(/출근|회사도착|자리앉/.test(q)){life.work='office';return say('work',choose('arrival',[['영아 벌써 회사네','나는 일어나서 영아 카톡부터 봤어 ㅋㅋ','오전 회의 있으면 끝나고 답장해'],['영아 잘 도착했어?','나는 밥 먹고 연습 준비하려고','점심시간에 잠깐 얘기하자 영아']]),'office_done')}
 if(/연습.*끝|스크림.*끝/.test(q)){const availability=coupleAvailability();if(['practice','meal'].includes(availability))return say('practice',['아직 조금 남았어 영아','지금 쉬는 시간이라 잠깐 봤어','영아는 먼저 밥 먹고 있어. 끝나면 연락할게'],'practice_wait');if(['sleep','morning','lunch'].includes(availability))return say('practice',['아직 시작 전이야 ㅋㅋ','영아는 벌써 회사에서 한참 있었겠다','나는 밥 먹고 준비하려고'],'practice_wait');return say('practice',choose('finished',[['응 오늘은 정리했어','영아 먼저 자는 줄 알고 조용히 폰 봤는데','아직 안 졸려?'],['응 이제 좀 쉴 수 있어','영아 오늘 회사에서 무슨 일 있었는지 들을 차례네 ㅋㅋ']]),'office_story')}
 if(/뭐해|머해|뭐하고있/.test(q)){const state=coupleAvailability();return say('now',state==='practice'?['지금 잠깐 쉬는 중','다음 연습 들어가기 전에 영아 카톡 보고 있었어','영아는 일 끝났어?']:state==='date'?['영아 만날 시간 다시 확인하고 있었어 ㅋㅋ','오늘 늦어지면 미리 말해 줘. 밖에서 기다리지 말고']:state==='morning'||state==='sleep'?['일어나서 영아 남겨 둔 톡 보는 중','영아는 벌써 회사겠네. 아침 챙겨 먹었어?']:state==='lunch'||state==='meal'?['밥 먹으려고','영아도 지금 먹어? 같이 메뉴 얘기하자']:['오늘 할 거 정리하고 쉬는 중','영아랑 얘기하려고 폰 켰어'],'work')}
 if(/웨이브|리셋|주도권|바텀|라인전|한타|용타이밍|용나오기|시야/.test(q)&&previous.ask!=='lol'&&previous.ask!=='lol_opinion'){
  if(/웨이브|리셋/.test(q))return say('lol',['응 영아 말한 그 타이밍','먼저 밀어야 같이 들어갔다가 다음 라인도 받을 수 있으니까','영아는 한 웨이브 더 보고 갔으면 좋았을 것 같아?'],'lol_opinion');
  if(/라인전|바텀|주도권/.test(q))return say('lol',['바텀 얘기지?','둘이 같이 움직이는 타이밍이 맞아야 편하더라','영아는 어느 쪽이 더 아쉬웠어? 라인에 있을 때, 합류할 때?'],'lol');
  return say('lol',['영아 그 장면 다시 봤구나','들어가는 타이밍이랑 뒤에 남는 쪽이랑 같이 봐야 돼서','나중에 만나면 영상 멈춰 놓고 같이 얘기하자. 영아 의견 궁금해'],'lol_opinion')
 }
 if(/경기.*(?:못봤|놓쳤)|회의.*경기|일.*경기.*못/.test(q))return say('watch',['영아 일하는 시간이랑 겹치면 어쩔 수 없지','결과 먼저 보기 싫으면 알림 잠깐 꺼 놔','집 가서 편하게 봐. 다 보면 나한테 얘기해 줘']);
 if(/직관|경기장.*갈|보러갈/.test(q)&&!/롯데|야구|사직/.test(q))return say('watch',['영아 회사 일정 먼저 보고 와','연차 아껴야 한다고 했잖아 ㅋㅋ','오게 되면 끝나고 어디서 볼지 먼저 얘기해 두자'],'date');
 if(/연습.*(?:어땠|힘들)|졌어|경기.*아쉽|잘안됐/.test(q))return say('practice',choose('review',[['아쉬운 건 정리하고 왔어','영아가 다 해결해 줄 필요는 없고 ㅋㅋ','그냥 오늘 뭐 했는지 얘기해 줘. 그거 들으면 좀 쉬는 느낌이야'],['조금 아쉬웠는데 계속 생각한다고 바로 되는 건 아니니까','영아랑 얘기하다가 쉬려고','영아는 오늘 어땠어?']]),'office_story');
 if(previous.ask==='office_story'&&q.length>3&&!/사랑|보고싶|전화|밥|데이트|연습|롤|잘자|잠/.test(q))return say('work',['영아 오늘 그런 일이 있었구나','회사에서는 괜찮은 척하고 있었어?','지금은 좀 편해졌으면 좋겠는데'],'done');
 if(/점심시간|점심먹으러|점심먹는중/.test(q))return say('food',['영아 지금 점심시간이구나','나도 밥 먹고 연습 들어가려고','우리 낮에 시간 맞는 게 이때네 ㅋㅋ 뭐 먹어?'],'menu');
 return beforeCoupleReply(text)
};
conversationalReply=contextReply;romancePickReply=contextReply;
if(!R.workingCoupleRevision){
 const notes=[{id:'work-after',title:'퇴근하고 현준이 보기',date:'2026. 10. 21.',text:'수요일은 퇴근 후, 토요일은 서로 일정 먼저 확인하기.\n회사 일이 밀리면 나오기 전에 연락하기. 현준이도 연습 정리되면 알려주기로 했다.\n매번 오래 못 봐도 밥 같이 먹고 걷는 시간은 챙기기.'},{id:'lol-scenes',title:'다음에 같이 볼 장면',date:'2026. 10. 20.',text:'용 앞 리셋 타이밍이랑 바텀 웨이브.\n지하철에서 보다가 환승 놓칠 뻔했으니까 집에서 이어 보기.\n데이트할 때 복기만 하다가 헤어지지 말기 ㅋㅋ'},{id:'ordinary-day',title:'평일의 작은 약속',date:'2026. 10. 19.',text:'아침에 내가 먼저 남기면 현준이는 일어나서 답장하기.\n점심시간이 겹치면 같이 밥 메뉴 얘기하기.\n회의·연습 중에는 재촉하지 않기. 끝나면 연락하기.\n잘 자라는 말은 짧게 해도 매일.'}];for(const n of notes)if(!data.notes.some(x=>x.id===n.id))data.notes.unshift(n);
 R.workingCoupleRevision=1;romanceSave()
}
// Future dates are ordinary plans, distinct from real tournament schedules.
for(let offset=0;offset<35;offset++){const at=new Date(Date.parse(dateKey()+'T12:00:00+09:00')+offset*86400000),date=at.toLocaleDateString('sv-SE',{timeZone:'Asia/Seoul'}),weekday=at.getUTCDay();if(![3,6].includes(weekday)||data.schedule.some(e=>e.date===date&&e.title.startsWith('현준이랑')))continue;data.schedule.push({date,title:weekday===3?'현준이랑 퇴근 후 저녁':'현준이랑 주말 데이트',detail:weekday===3?'19:10 · 퇴근·연습 마무리 후 만나기. 늦어지면 먼저 연락하기.':'15:00 · 연습 일정 먼저 확인하고 밥 먹고 천천히 걷기.',couplePlan:true})}
romanceSave();render();
