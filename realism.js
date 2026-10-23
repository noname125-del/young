/* Native phone behavior and account ownership layer. */
const LIFE=window.JIU_LIFE;
const realKakaoRows=kakaoRows;
function boyfriendAddress(text){return String(text||'').replace(/(?<![가-힣])너한테/g,'영아한테').replace(/(?<![가-힣])너에게/g,'영아에게').replace(/(?<![가-힣])너랑/g,'영아랑').replace(/(?<![가-힣])너는/g,'영아는').replace(/(?<![가-힣])너도/g,'영아도').replace(/(?<![가-힣])너를/g,'영아를').replace(/(?<![가-힣])(?:네가|너가)/g,'영아가').replace(/(?<![가-힣])네 (?=것|손|얘기|의견|퇴근|생각)/g,'영아 ').replace(/(?<![가-힣])넌(?![가-힣])/g,'영아는').replace(/(?<![가-힣])너(?![가-힣])/g,'영아')}
kakaoRows=function(id){const days=new Map();let day='';const add=(entry,fallback)=>{const m=typeof entry==='string'?{side:'me',text:entry}:{...entry};m.date=m.date||fallback||dateKey();if(id==='suhwan'&&m.side==='them')m.text=boyfriendAddress(m.text);if(!days.has(m.date))days.set(m.date,[]);days.get(m.date).push(m)};for(const m of LIFE.histories[id]||[]){if(m.divider)day=m.date;else add(m,day||'2026-10-21')}for(const m of data.kakaoLocal?.[id]||[])add(m,dateKey());return [...days.entries()].sort(([a],[b])=>a.localeCompare(b)).flatMap(([date,rows])=>{const [y,mo,d]=date.split('-').map(Number);return [{divider:true,text:`${y}년 ${mo}월 ${d}일`,date},...rows.sort((a,b)=>(a.time||'').localeCompare(b.time||''))]})};
romanceSuggestions=()=>'';
kakaotalkApp=function(){let html=originalKakaoView();html=html.replace('kk-room">','kk-room" data-conversation="'+esc(state.kakaoChat||'')+'">');return html};
// No scripted time jump or suggested answers in an ordinary messenger.
clearTimeout(romanceTimer);romanceScheduleNext=()=>{};romanceAdvance=()=>{};
const preRealismAdd=romanceAdd;
romanceAdd=function(side,text,extra={}){const who=side==='them'?boyfriendAddress(text):text;preRealismAdd(side,who,{date:dateKey(),...extra})};
function conversationalReply(text){const clean=text.trim(),q=clean.replace(/\s/g,'');R.dialog??={topic:'',turn:0};const d=R.dialog;d.turn++;R.inputHistory??=[];R.inputHistory.push({text:clean,time:now()});if(R.inputHistory.length>100)R.inputHistory.shift();
function answer(topic,lines,ask){d.topic=topic;d.ask=ask||'';return lines}
if(/언제.*(만나|봤|데이트)|데이트|주말.*(뭐|만나)|수요일|토요일/.test(q))return answer('date',['우리 수요일 퇴근하고 보고 토요일에도 보기로 했잖아','평일엔 영아 퇴근 시간 맞춰 갈게','연습 시간 바뀌면 미리 연락할게 영아'],'date');
if(/웨이브|주도권|리셋|사이드|시야|바텀|라인전|한타|아펠|구마|서폿/.test(q)){if(/아펠/.test(q))return answer('lol',['영아 또 아펠 얘기하네 ㅋㅋ','어느 장면? 무기 뭐 들고 있었는지 기억나?'],'lol');if(/한타/.test(q))return answer('lol',['응 그 한타','영아는 내가 언제 들어가는 게 좋았을 것 같아?','영아 의견도 듣고 싶어서'],'lol');return answer('lol',['영아 그 장면까지 봤네','어느 타이밍 얘기야? 용 나오기 전?'],'lol')}
if(/1224|12월.?24일|생일/.test(q)){return answer('birthday',['내 생일은 12월 24일이야','영아 날짜 기억했네ㅋㅋ','그날 같이 케이크 먹자'],'cake')}
if(/영야.*불러|이름.*불러/.test(q))return answer('name',['영야','ㅋㅋㅋㅋ','영아가 시켰잖아']);
if(/영아.*불러|호칭/.test(q))return answer('name',['영아','왜 ㅋㅋ','내가 맨날 부르는데']);
if(/내가.*누구|내이름/.test(q))return answer('name',['영 영아','이걸 내가 틀리겠어 ㅋㅋ']);
if(/전화|통화|목소리/.test(q)){d.topic='call';romanceLater(()=>nativeStartCall('incoming'),4500);return ['응 전화할게','영아 지금 받을 수 있지?']}
if(/싫|아니|말고|그게아니|다른소리|무슨소리/.test(q)&&q.length<35){const old=d.topic;d.ask='';return answer(old,['아 내가 잘못 알아들었네','어느 얘기였어 영아?'])}
if(/어디.*(있|야|갔)|지금어디/.test(q))return answer('where',['지금 숙소에 있어','영아는 어디야?'],'where')
if(/밥.*먹었|저녁.*먹었|점심.*먹었|아침.*먹었/.test(q))return answer('food',['응 먹었어','영아도 먹었어?'],'ate')
if(/뭐먹|메뉴|점메추|저메추|추천.*먹|배달/.test(q))return answer('food',['한식 먹고 싶은데','국밥 어때','영아는 뭐 당겨?'],'menu')
if(/국밥/.test(q))return answer('food',['국밥 시켜 먹어도 괜찮나','영아 먹어 봤어?','데이터가 없넹'],'taste')
if(/양꼬치/.test(q))return answer('food',['양꼬치는 못 참지...','영아랑 같이 먹으러 가야겠다']);
if(/유자리카노/.test(q))return answer('drink',['그거 지점마다 맛이 좀 다른가 봐','영아 먹은 데는 어땠어?'],'taste')
if(/아바라|바닐라라떼/.test(q))return answer('drink',['하루의 시작은 아바라로','영아는 우유 없는 걸로 골라','메뉴 같이 봐 줄게']);
if(/사랑|좋아해/.test(q))return answer('love',['나도 좋아해 영아','갑자기 그러니까','나 혼자 웃었네 ㅋㅋ']);
if(/보고싶|만나고싶/.test(q))return answer('miss',['나도 보고 싶어','영아 언제 시간 돼?'],'date')
if(/뭐해|머해|뭐하고/.test(q))return answer('now',['잠깐 쉬는 중','영아 카톡 보고 있었어','영아는?'],'now')
if(/잘자|자러|잘게|굿나잇/.test(q))return answer('sleep',['잘 자 영아','오늘도 고생했어','일어나면 연락할게']);
if(/안자|못자|잠안|불면/.test(q))return answer('sleep',['영아 왜 안 자요 근데','내가 깨웠나...','조금만 얘기하다 자자'],'sleep')
if(/굿모닝|좋은아침|일어났|기상|안녕/.test(q))return answer('morning',['굿모닝~','영아 잘 잤어?'],'sleep')
if(/연습.*끝|스크림.*끝/.test(q))return answer('practice',['오늘 연습은 끝났어','영아 퇴근했어?'],'work')
if(/오늘.*어땠|연습.*어땠|잘했어\?/.test(q))return answer('practice',['괜찮았어','잘된 것도 있고 더 해야 되는 것도 있고','영아는 오늘 어땠어?'],'day')
if(/퇴근/.test(q))return answer('work',['수고했습니다','영아 오늘도 고생했어','지금 집 가는 중?'],'where')
if(/출근/.test(q))return answer('work',['영아 오늘도 파이팅','점심 거르지 말고','바쁘면 나중에 봐도 돼']);
if(/야근|회의|자료|회사|팀장|상사/.test(q))return answer('work',['오늘 일이 좀 많았나 보네','무슨 일 있었어?'],'day')
if(/힘들|속상|피곤|지쳤|기분안/.test(q))return answer('comfort',['영아 오늘 많이 힘들었어?','말해 봐','듣고 있어'],'day')
if(/고생했|수고했|잘했|멋있|잘생|귀여/.test(q))return answer('praise',['감사합니다당 (_ _)','영아한테 들으니까 좀 좋네','영아도 오늘 고생했어']);
if(/살쪘|다이어트|체중/.test(q))return answer('weight',['고독한 다이어터 문현준','영아는 밥은 잘 챙겨 먹고','나도 운동하고 와야겠다']);
if(/셀카|네사진|너사진|현준.*사진/.test(q)){romanceLater(()=>{romanceAdd('them','영아한테만 보냄',{src:'assets/oner-official.png'});romanceNotify('사진');},2500);return answer('photo',['셀카?','잠깐 찾아볼게 ㅋㅋ']);}
if(/뿌꾸|코코|유미|뿌유코|고양이|강아지/.test(q))return answer('pets',['코코가 요즘 코알라미가 좀 있어','느릿느릿 뒤뚱뒤뚱한 게','영아도 보면 알걸 ㅋㅋ']);
if(/모니터|자세|허리|목건강|눈건강/.test(q))return answer('posture',['좀 더 의자에 기대서 하고 있어','밝기랑 명암도 낮췄고','오래 해야지...']);
if(/아펠|카이사|이즈리얼|원딜|챔피언/.test(q))return answer('game',['영아 원딜 할 거야?','그럼 내가 서폿 해 줄게','나 믿어 ㅋㅋ'],'champ')
if(/칼바람|듀오|디코|디스코드|게임.*같이|같이.*게임|롤.*할/.test(q))return answer('game',['할래?','영아 들어오면 초대할게','디코도 들어와'],'game')
if(/전적|오피지지|opgg|연패|연승/.test(q))return answer('rank',['ㅋㅋㅋㅋ 영아 또 보고 왔어?','잘한 판도 봐 줘','그 판만 보지 말고']);
if(/노래|음악|오노추|플레이리스트/.test(q))return answer('music',['오늘은 기대','영아도 같이 들을래?'],'song')
if(/스타워킨|STAR.?WALKIN/i.test(q))return answer('music',['그 노래 좋지','들으면 잘하는 장면 생각나서','자신감 올라가더라']);
if(/일정|약속|주말|언제.*만나|데이트/.test(q))return answer('date',['영아 시간 되는 날 알려 줘','연습 일정 확인해 보고 맞춰 볼게','밥 먹고 산책할까?'],'date')
if(/엄마|아빠|동생|가족/.test(q))return answer('family',['영아네 가족 얘기야?','동생은 잘 지내?'],'sibling')
if(/술|주량|소주|한잔/.test(q))return answer('drink',['주량은 그냥 딱 평균 정도?','아 평균이 다 다르긴 하지','영아 너무 무리해서 먹지는 마']);
// Follow the last actual question before switching to any new subject.
if(d.ask==='where')return answer('where',/집|도착/.test(q)?['잘 도착했네','영아 이제 좀 쉬어']:['그렇구나','이동할 땐 앞도 보고 다녀 영아']);
if(d.ask==='ate')return answer('food',/아직|못먹|안먹/.test(q)?['아직 안 먹었어?','영아 밥부터 먹자','다 먹고 연락해']:['잘했어','뭐 먹었는데?'],'menu');
if(d.ask==='menu')return answer('food',['그거 좋네','맛잘알이네 영아 ㅋㅋ','그걸로 먹자']);
if(d.ask==='taste')return answer('food',['아 그런 느낌이구나','영아 말 들으니까 먹어 보고 싶네']);
if(d.ask==='day')return answer('comfort',['아 그랬구나','그럼 좀 힘 빠졌겠다','지금은 다 끝난 거야?'],'done');
if(d.ask==='done')return answer('comfort',/아직|안끝/.test(q)?['응 영아 마무리 잘하고','나는 여기 있을게']:['고생했어 영아','이제 그 얘기는 잠깐 내려놓자','나랑 얘기해']);
if(d.ask==='date')return answer('date',['좋아 그때 되는지 확인해 볼게','영아도 무리 없는 시간으로','일단 메모해 둬야겠다']);
if(d.ask==='game'||d.ask==='champ')return answer('game',['오케이','영아 하고 싶은 걸로 해','나 옆에서 맞춰 줄게']);
if(d.ask==='song')return answer('music',['좋아','영아 틀면 말해','나도 같이 누를게']);
if(d.ask==='now')return answer('now',['영아 그거 하고 있었구나','난 조금 더 영아랑 얘기할래','시간 괜찮아?'],'time');
if(d.ask==='sleep')return answer('sleep',['그랬구나','오늘은 조금 더 잘 자야겠다','자기 전에 나한테 인사하고']);
if(/고마|감사/.test(q))return answer('thanks',['뭘 ㅋㅋ','영아니까 챙기는 거지']);
if(/ㅋㅋ|ㅎㅎ|웃/.test(q))return answer(d.topic,['ㅋㅋㅋㅋㅋ','영아 지금 웃는 거 보고 싶은데']);
if(/응|넵|ㅇㅇ|오케이|알겠|좋아/.test(q))return answer(d.topic,['응 ㅎㅎ','영아 얘기 계속 해','듣고 있어']);
return answer(d.topic,['영아 그건 어떤 얘기야?','내가 좀 더 알아야겠다']);}
romancePickReply=conversationalReply;
romanceSend=function(text){text=text.trim();if(!text)return;if(romanceBusy){R.buffer??=[];R.buffer.push(text);romanceAdd('me',text);const f=document.querySelector('#kakaoText');if(f)f.value='';return}const field=document.querySelector('#kakaoText');if(field)field.value='';if(data.kakaoDrafts)delete data.kakaoDrafts.suhwan;romanceAdd('me',text);romanceQueue(conversationalReply(text),'casual')};
// Both outgoing and incoming calls have real call states. A call never sends a chat message.
let NC=null,nativeCallTimer=null,nativeCallEpoch=0;
const callIcon={mic:'♩',speaker:'◖))',video:'▣',keypad:'⠿',add:'＋',person:'♙'};
function nativeStartCall(direction='outgoing'){if(NC)return;clearTimeout(romanceTimer);NC={direction,state:direction==='incoming'?'ringing':'dialing',started:0,muted:false,speaker:false,caption:'',line:0,epoch:++nativeCallEpoch};R.calls.unshift({time:now(),type:direction==='incoming'?'수신 전화':'발신 전화'});romanceSave();nativePaintCall();if(direction==='outgoing'){let epoch=NC.epoch;romanceLater(()=>{if(NC?.epoch===epoch)nativeConnectCall()},2300)}}
function nativePaintCall(){document.querySelector('#romanceCall')?.remove();if(!NC)return;const s=document.querySelector('.screen');if(!s)return;let connected=NC.state==='connected';s.insertAdjacentHTML('beforeend',`<section id="romanceCall" class="romance-call native-real-call"><div class="romance-call-avatar"></div><h1>현준 🐯</h1><small id="nativeCallStatus">${connected?nativeDuration():NC.state==='dialing'?'연결 중…':'휴대전화'}</small>${connected?`<div class="native-call-grid">${[['mic','음소거'],['keypad','키패드'],['speaker','스피커'],['add','통화 추가'],['video','FaceTime'],['person','연락처']].map(([k,label])=>`<button data-native-call="${k}" class="${NC[k]?'active':''}" aria-label="${label}"><span>${callIcon[k]}</span><small>${label}</small></button>`).join('')}</div><p class="native-call-caption">${esc(NC.caption)}</p>`:''}<div class="romance-call-actions">${NC.state==='ringing'?'<div><button class="end" data-native-call="end" aria-label="전화 거절">☎</button><p>거절</p></div><div><button data-native-call="accept" aria-label="전화 받기">☎</button><p>응답</p></div>':'<button class="end" data-native-call="end" aria-label="통화 종료">☎</button>'}</div></section>`);document.querySelectorAll('[data-native-call]').forEach(b=>b.onclick=()=>{const action=b.dataset.nativeCall;if(action==='end')nativeEndCall();else if(action==='accept')nativeConnectCall();else if(action==='mic'){NC.mic=!NC.mic;nativePaintCall()}else if(action==='speaker'){NC.speaker=!NC.speaker;nativePaintCall()}else if(action==='keypad')nativeCallKeypad();else if(action==='person'){nativeEndCall();state.app='telephone';state.phoneTab='contacts';state.contactID='suhwan';render()}else toast(action==='video'?'FaceTime을 사용할 수 없습니다':'추가할 통화가 없습니다')})}
function nativeDuration(){let t=NC?.started?Math.floor((Date.now()-NC.started)/1000):0;return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`}
function nativeConnectCall(){if(!NC)return;NC.state='connected';NC.started=Date.now();NC.caption='영아 들려요?';nativePaintCall();const epoch=NC.epoch;const lines=['아 영아 목소리 잘 들린다','오늘 뭐 했어?','나 연습 끝나고 쉬는 중이었어','영아는 집이야?','ㅋㅋㅋㅋ 아니 그냥 궁금해서','오늘도 고생했어 영아'];lines.forEach((line,i)=>romanceLater(()=>{if(NC?.epoch!==epoch)return;NC.caption=line;nativePaintCall()},4500+i*6500));clearInterval(nativeCallTimer);nativeCallTimer=setInterval(()=>{const n=document.querySelector('#nativeCallStatus');if(n&&NC?.state==='connected')n.textContent=nativeDuration()},1000)}
function nativeCallKeypad(){const el=document.querySelector('.native-call-grid');if(!el)return;el.innerHTML=`<div class="native-dtmf">${'123456789*0#'.split('').map(k=>`<button data-dtmf="${k}">${k}</button>`).join('')}</div>`;document.querySelectorAll('[data-dtmf]').forEach(b=>b.onclick=()=>{if(NC){NC.caption=(NC.caption||'')+b.dataset.dtmf;const n=document.querySelector('.native-call-caption');if(n)n.textContent=NC.caption}})}
function nativeEndCall(){if(!NC)return;const last=R.calls[0];if(last){last.type=NC.state==='connected'?(NC.direction==='outgoing'?'발신 통화':'수신 통화'):'부재중 전화';last.duration=nativeDuration()}NC=null;clearInterval(nativeCallTimer);document.querySelector('#romanceCall')?.remove();romanceCallOpen=false;romanceSave();render()}
romanceCallOut=()=>nativeStartCall('outgoing');romanceIncoming=()=>nativeStartCall('incoming');romanceCallUI=()=>{};romanceEndCall=()=>nativeEndCall();
const beforeRealRender=render;
render=function(){beforeRealRender();if(!romanceBusy&&R.buffer?.length){const waiting=R.buffer.splice(0).join(' ');romanceLater(()=>{if(!romanceBusy)romanceQueue(conversationalReply(waiting),'casual')},350)}if(NC)nativePaintCall();if(state.app==='instagram'&&!state.igPeer){document.querySelectorAll('#igMore').forEach(n=>{});}bindRealism()};
function bindRealism(){const bubbles=document.querySelector('#kkBubbles');if(bubbles){bubbles.querySelectorAll('.kk-message').forEach(n=>{if(n.textContent.startsWith('20')&&n.textContent.includes('년'))n.classList.add('romance-date')})}if(state.app==='instagram'&&state.igExplore){const scroll=document.querySelector('.native-scroll');if(scroll&&!document.querySelector('#peyzIgResult'))scroll.insertAdjacentHTML('afterbegin','<button id="peyzIgResult" class="kk-friend-row"><span class="kk-avatar romance-avatar"></span><b>oner · 문현준</b></button>');document.querySelector('#peyzIgResult')?.addEventListener('click',()=>{state.igExplore=false;state.igPeer=true;state.igScreen='profile';render()})}if(state.app==='xapp'&&state.xScreen==='search'){const scroll=document.querySelector('.x-layout-scroll');if(scroll&&!document.querySelector('#peyzXResult'))scroll.insertAdjacentHTML('afterbegin','<button id="peyzXResult" class="kk-friend-row"><span class="kk-avatar romance-avatar"></span><b>Oner · @_T1Oner</b></button>');document.querySelector('#peyzXResult')?.addEventListener('click',()=>{state.xPeer=true;state.xScreen='profile';render()})}document.querySelectorAll('[data-ig-screen="profile"]').forEach(b=>b.addEventListener('click',()=>{state.igPeer=false;render()}));document.querySelectorAll('[data-x-screen="profile"]').forEach(b=>b.addEventListener('click',()=>{state.xPeer=false;render()}))}
instagramProfile=function(){if(!state.igPeer)return nativeInstagram();const own=data.instagram;data.instagram=window.ONER_REFERENCE.instagram;try{return nativeInstagram().replace(/프로필 편집/g,'팔로잉').replace(/프로필 공유/g,'메시지')}finally{data.instagram=own}};
xProfileScreen=function(){if(!state.xPeer)return nativeX();const own=data.xProfile,posts=data.xPosts;data.xProfile=window.ONER_REFERENCE.xProfile;data.xPosts=window.ONER_REFERENCE.xPosts;try{return nativeX().replace(/프로필 수정/g,'팔로잉')}finally{data.xProfile=own;data.xPosts=posts}};
if(R.realismRevision!==2){data.discordName='young';data.riotId='jiu#1205';data.contacts=LIFE.contacts;data.kakaoRooms=LIFE.rooms;R.pending=null;R.buffer=[];romanceBusy=false;R.realismRevision=2;romanceSave()}
// The 1205 memory is hidden in the ordinary calendar, not advertised in the UI.
for(const year of [new Date().getFullYear(),new Date().getFullYear()+1]){const date=year+'-12-24';if(!data.schedule.some(s=>s.date===date&&s.title==='현준이 생일 🎂'))data.schedule.push({date,title:'현준이 생일 🎂',detail:'문현준 · 12월 24일'})}
romanceSave();render();
