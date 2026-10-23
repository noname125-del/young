/* Replies belong to a contact and a room. Closing acknowledgements need no reply. */
function youngRoomReply(app,id,input){
 if(id==='suhwan'){const lines=contextReply(input);return lines.length?{side:'them',text:lines.join('\n')}:null}
 const c=app==='kakaotalk'?kakaoContact(id):smsContactById(id);
 if(!c||c.kind==='channel'||c.system||id==='self')return null;
 const text=String(input).trim(),q=text.replace(/\s/g,'');
 R.roomMemory??={};const key=app+':'+id,m=R.roomMemory[key]??={turn:0,recent:[],used:{},topic:'',pending:'',speaker:'엄마'};
 const old={topic:m.topic,pending:m.pending};m.turn++;
 const family=['family','mom','dad'].includes(id),group=id==='family';
 if(id==='dad')m.speaker='아빠';else if(id==='mom')m.speaker='엄마';
 else if(group){if(/^아빠|아빠는|아빠도/.test(q))m.speaker='아빠';else if(/^엄마|엄마는|엄마도/.test(q))m.speaker='엄마'}
 const pick=(k,rows)=>{const used=m.used[k]??=[];const x=rows.map((s,i)=>({s,i})).find(x=>!used[x.i]);if(!x)return '';used[x.i]=m.turn;m.used[k]=used;return x.s};
 const say=(topic,reply,pending='')=>{if(!reply)return null;m.topic=topic;m.pending=pending;m.recent.push(reply);m.recent=m.recent.slice(-20);m.lastInput=text;return {side:'them',text:reply,...(group?{speaker:m.speaker}:id==='work'?{speaker:'서연'}:{})}};
 const yes=/^(응|ㅇㅇ|웅|ㅇㅋ|알겠어|알겠음|알았어|그래|넵|네|오케이|좋아)[.!ㅋㅎ]*$/;
 const no=/^(아니|아직|아직이야|못했어|안했어|ㄴㄴ)[.!ㅋㅎ]*$/;
 const done=/끝|제출|다했|마쳤|냈어/.test(q);
 const foods=['파스타','피자','김밥','라면','베이글','샌드위치','치킨','초밥','햄버거','국밥','샐러드','떡볶이','한식'];
 const food=foods.find(x=>q.includes(x));
 if(/힘들|속상|울었|외롭|지쳤|불안|우울|아파|몸살|감기/.test(q)){
  m.quiet=true;
  if(/아파|감기|몸살/.test(q))return say('care',family?pick('ill',['어디가 어떻게 아파? 혼자 참지 말고 얘기해.','지금 열도 나는 거야? 수업보다 몸부터 챙겨.','영아 지금 쉬고 있어? 필요한 거 있으면 말해.','아플 때 혼자 있으니 더 신경 쓰이네. 밥은 먹을 수 있어?']):pick('ill',['어디 아픈데? 지금 혼자 있어?','오늘은 과제보다 몸부터 챙겨.','필요한 거 있으면 말해. 연락 보고 있을게.']),'care-detail');
  return say('care',family?pick('care',['영아 오늘 무슨 일 있었어? 엄마한테 얘기해.','혼자 다 참으려고 하지 마. 지금 얘기할 수 있어?','많이 힘들었구나. 조언보다 그냥 들어 줬으면 하는 거지?','오늘은 좀 쉬어도 돼. 무슨 일인지 천천히 얘기해.','아빠도 듣고 있어. 필요한 게 있으면 말해.'].filter(s=>m.speaker==='아빠'?!s.includes('엄마'):!s.includes('아빠'))):pick('care',['무슨 일인데? 나 지금 들을 수 있어.','혼자 버티지 말고 얘기해.','지금 전화보다 톡이 편해?','오늘 많이 지쳤구나. 지금은 좀 쉬어.']),'care-detail');
 }
 if(/이제괜찮|나아졌|기분풀렸/.test(q)){m.quiet=false;return say('care',family?'조금 나아졌다니 다행이다. 오늘은 무리하지 마.':'다행이다. 쉬면서 천천히 해.')}
 if(m.quiet){
  if(/과제|시험|발표|수업|교수|친구/.test(q))return say('care',family?pick('care-school',['그것 때문에 그랬구나. 지금 당장 마저 해야 하는 거야?','학교에서 괜찮은 척하느라 더 힘들었겠다.','다 잘하려고 애쓰지 않아도 돼. 오늘은 어디까지 해야 해?','응, 그 얘기부터 해. 듣고 있어.']):pick('care-school',['그 일 때문에 그랬구나. 지금은 마무리됐어?','혼자 다 할 필요는 없잖아. 어디까지 남았는데?','응, 중간에 안 끊을게. 얘기해.']),'care-detail');
  if(/고마|알겠|응|ㅇㅇ/.test(q)){m.quiet=false;return say('care',family?'언제든 연락해. 오늘은 푹 쉬어.':'응. 필요하면 다시 불러.')}
  return say('care',pick('care-follow',['응, 계속 얘기해.','그랬구나. 그래서 어떻게 됐어?','지금은 조금 쉴 수 있어?','말하기 힘들면 나중에 해도 괜찮아.','들으면서 같이 생각해 볼게.']),'care-detail');
 }
 if(/사랑|보고싶/.test(q))return say('love',family?pick('love',['우리도 영이 많이 보고 싶어. 시간 맞으면 얼굴 보면서 통화하자.','사랑해. 멀리 있어도 언제든 연락해.','영아 우리도 보고 싶지. 목소리 들으면 좋겠다.','우리도 많이 사랑해. 잘 지내는 게 제일 좋다.']):pick('love',['나도 보고 싶다ㅠ 방학 때 보면 한참 얘기하자.','갑자기 왜 그래ㅋㅋ 나도 반갑지.','시차 맞춰서 통화 한번 하자.']));
 if(/엄마.*아빠|아빠.*엄마/.test(q)&&/잘지내|뭐해|어때/.test(q))return say('home',pick('both',['우린 잘 지내. 아빠랑 집에서 쉬고 있어. 영이는 뭐 해?','집은 별일 없어. 오늘 수업은 잘 다녀왔어?','둘 다 잘 지내니까 걱정 마. 영이 얘기나 해 줘.']),'your-day');
 if(/뭐해|뭐하|머해|머함|잘지내|요즘어때/.test(q)){
  const kr=phoneParts(new Date(),'Asia/Seoul'),h=+kr.hour;
  const activity=h<6?'자기 전에 잠깐 폰 보고 있어':h<10?'아침 챙기고 있어':h<15?'할 일 정리하고 잠깐 쉬고 있어':h<20?'저녁 챙기고 있어':'집에서 쉬고 있어';
  return say('day',family?pick('what:'+Math.floor(h/6),[`${activity}. 영이는 수업 끝났어?`,`우린 별일 없어. 영이는 오늘 어떻게 보냈어?`,`${activity}. 무슨 일 있어서 불렀어?`,'영이 연락 보고 있었지. 오늘은 무슨 일정이야?']):pick('what',['난 과제 정리하고 있었어. 너는?','지금 잠깐 쉬는 중. 왜 불렀어ㅋㅋ','오늘 할 거 거의 끝났어. 너 아직 바빠?','너 톡 보고 있지ㅋㅋ 뭐 해?','일단 앉아서 좀 쉬는 중. 수업 끝났어?']),'your-day');
 }
 if(food){m.food=food;return say('food',family?pick('meal:'+food,[`${food} 먹었구나. 든든하게 먹었으면 됐지.`,`${food}는 거기서 사 먹은 거야?`,`맛있었어? ${food} 얘기하니까 먹고 싶네.`,`${food} 먹었으면 오늘 끼니는 챙긴 거네. 잘했어.`]):pick('meal:'+food,[`${food} 좋다ㅋㅋ 어디서 먹었어?`,`${food}? 나도 그거 먹을걸.`,`오 ${food}. 맛있었어?`,`${food} 먹으러 나간 거였구나.`]),'meal-detail')}
 if(/밥|먹었|먹음|배고|점심|저녁|아침/.test(q)){
  if(/안먹|못먹|아직/.test(q))return say('food',family?pick('not-eaten',['수업 때문에 못 먹은 거야? 간단한 거라도 먼저 먹어.','그럼 밥부터 챙겨. 연락은 나중에 해도 돼.','영아 끼니는 건너뛰지 마. 지금 먹을 수 있어?','냉장고에 먹을 거는 있어? 없으면 나가서 챙겨 먹어.']):pick('not-eaten',['아직 안 먹었어? 뭐라도 먹고 해.','그럼 밥부터. 나도 메뉴 정하는 중.','수업 끝나고 같이 먹을래?']),'meal-plan');
  if(/[?？]|엄마.*먹|아빠.*먹|^밥먹었어$|^밥먹었냐$/.test(q))return say('food',family?pick('parent-ate',['응, 우리는 챙겨 먹었어. 영이는 뭐 먹었어?','밥은 먹었지. 거기는 지금 식사 시간이야?','아까 먹고 정리했어. 영이도 챙겨 먹었지?','우린 걱정 마. 오늘 영이는 뭘 먹었나 궁금하네.']):pick('friend-ate',['응 먹었어. 너는?','아직 메뉴 정하는 중ㅋㅋ 뭐 먹었어?','수업 끝나고 먹으려고. 추천 있어?']),'meal-menu');
  return say('food',family?pick('ate',['잘했어. 오늘은 뭐 먹었어?','끼니 챙겼다니 됐다. 맛있게 먹었어?','응, 밥은 잘 챙겨 먹어. 오늘 메뉴는 뭐였어?','먹고 좀 쉬어. 오늘 수업은 다 끝났어?']):pick('ate',['뭐 먹었는데?','잘했네ㅋㅋ 이제 과제?','맛있었어? 나도 메뉴 좀 골라 줘.','ㅇㅋ 밥 먹고 뭐 할 건데?']),'meal-menu');
 }
 if(/과제|발표|수업|학교|공부|시험|도서관|제출/.test(q)){
  m.school=/과제/.test(q)?'과제':/발표/.test(q)?'발표':/시험/.test(q)?'시험':/도서관/.test(q)?'도서관':'수업';
  if(done)return say('school',family?pick('school-done',[`${m.school} 끝냈구나. 수고했어! 이제 좀 쉬어.`,'영이 오늘도 잘 해냈네. 어땠어?','끝났다니 후련하겠다. 이제 어디 가?','고생 많았어. 오늘 남은 일정은 없어?']):pick('school-done',[`${m.school} 탈출했네ㅋㅋ 어땠어?`,'드디어 끝ㅋㅋ 이제 쉬자.','제출했으면 잠깐 머리 식혀.','잘했음. 우리 이제 밥 정하자ㅋㅋ']),'school-story');
  return say('school',family?pick('school-busy',[`${m.school} 하는 중이었구나. 오늘 언제쯤 끝나?`,'연락 급한 건 아니니까 하던 거 마무리하고 와.','학교에서 하루 종일 있었어? 잠깐씩 쉬면서 해.','지금은 집중하고 끝나면 얘기해 줘.','혼자 하는 과제야, 조별 과제야?']):id==='work'?pick('group-work',['공유 문서에 정리해 두면 읽어 볼게.','어느 부분까지 했어? 겹치는 내용부터 맞춰 보자.','자료 출처도 같이 적어 두자.','발표 순서는 마지막에 한 번 더 확인하자.']):pick('school-busy',['너도 과제 중이구나. 어디까지 했어?','도서관이면 자리 하나 맡아 줄 수 있어?','나도 마무리 중. 끝나고 뭐 먹자.','그거 언제까지 제출이야?','끝나면 톡해. 나도 먼저 내 부분 할게.']),'school-detail');
 }
 if(/도착|집왔|집이야|들어왔|왔어/.test(q))return say('arrival',family?pick('arrive',['잘 들어갔구나. 가방 내려놓고 좀 쉬어.','늦지는 않았어? 문 잘 잠그고 쉬어.','도착했다니 안심이다. 오늘 밖에서 오래 있었어?','알려 줘서 고마워. 이제 편하게 쉬어.']):pick('arrive',['잘 들어갔네ㅋㅋ','ㅇㅋ 씻고 쉬어.','집 도착했어? 오늘 수고했음.','살아 돌아왔네ㅋㅋ 이제 뭐 해?']),'arrival-rest');
 if(/잘자|잘게|자러|졸려/.test(q))return say('sleep',family?pick('sleep',['영아 푹 자. 일어나서 연락해.','거긴 잘 시간이구나. 오늘도 수고했어.','응, 폰 내려놓고 자. 잘 자.','내일 수업 늦지 않게 알람 켜 두고. 푹 쉬어.','오늘 피곤했겠다. 잘 자고 내일 얘기하자.']):pick('sleep',['잘 자ㅋㅋ 내일 보자.','ㅇㅋ 나도 마무리하고 잘게.','굿밤. 내일 톡 봐.','응 푹 자.','내일 일어나면 살아 있다고 해ㅋㅋ']));
 if(/전화|통화/.test(q))return say('call',family?pick('call',['지금은 카톡 보고 있어. 통화 가능한 시간 알려 줘.','영이 수업 끝나고 시간 될 때 전화해.','우리 시차 있으니까 몇 시가 편한지 맞춰 보자.','영상통화로 얼굴도 보면 좋겠다. 언제 시간 나?']):pick('call',['몇 시가 편해? 시간 맞춰 보자.','수업 끝나고 잠깐 얘기할까?','지금은 톡이 편한데, 조금 있다가 괜찮아?']),'call-time');
 if(old.pending==='call-time'&&/시|지금|이따|내일|주말/.test(q))return say('call',family?`${text.replace(/[<>]/g,'')} 정도로 생각하면 되는 거지? 시간 되면 먼저 톡해.`:'ㅇㅋ 그때 맞춰 볼게. 시간 바뀌면 알려 줘.');
 if(/게임|칼바람|증바람|아레나|롤|접속/.test(q))return say('game',family?pick('game',['수업 끝나고 쉬는 거면 괜찮지. 너무 늦게까진 하지 말고.','친구랑 하는 거야? 끝나고 눈 좀 쉬게 해.','재미있게 하고, 잘 시간은 챙겨.','오늘 할 일 끝냈으면 잠깐 놀아도 되지.']):pick('game',['증바람이면 가능ㅋㅋ 초대해.','나 마무리하고 들어갈게. 얼마나 할 건데?','아레나도 좋고. 협곡 말고ㅋㅋ','접속하면 톡할게. 먼저 방 파 둬.','한 판만 하자. 내일 수업 있음ㅋㅋ']),'game-time');
 if(/고마|감사/.test(q))return say('thanks',family?pick('thanks',['별말을 다 하네. 필요한 거 있으면 또 말해.','영이가 편하면 됐지.','고마워할 거 없어. 잘 챙겨 지내.','알았어. 마음 써 줘서 우리도 고마워.']):pick('thanks',['괜찮아ㅋㅋ','별거 아닌데 뭐.','다음엔 네가 커피ㅋㅋ','ㅇㅋ 잘 해결됐으면 됐어.']));
 if(yes.test(q)){
  if(old.pending==='meal-menu')return say('food',family?'먹었다니 됐다. 뭐 먹었는지 얘기해 줘.':'메뉴를 알려 줘ㅋㅋ 나도 참고하게.','meal-menu');
  if(old.pending==='school-detail')return say('school',family?'오늘 학교에서 어떤 일 있었는지 듣고 싶어서. 무슨 과제야?':'어느 부분 하고 있는 건데?','school-story');
  if(old.pending==='your-day')return say('day',family?'오늘 하루는 어땠어?':'그래서 오늘 뭐 했는데ㅋㅋ','day-story');
  m.pending='';return null;
 }
 if(no.test(q)&&old.pending)return say(old.topic,family?pick('notyet',['아직이구나. 급하게 하지 말고 천천히 해.','알겠어. 준비되면 다시 얘기해.','그럼 지금은 어디까지 된 거야?']):pick('notyet',['아직이었냐ㅋㅋ 얼마나 남았어?','ㅇㅋ 마무리하고 와.','그럼 지금은 뭐 하는 중?']),'detail');
 if(/^(ㅋㅋ+|ㅎㅎ+|ㅋ|ㅎ|ㅇ|[😊😂❤️♥]+)$/.test(q)){m.pending='';return null}
 if(old.pending==='meal-menu'||old.pending==='meal-detail')return say('food',family?pick('meal-follow',['거기서 먹는 음식은 입에 맞아?','직접 해 먹은 거야, 사 먹은 거야?','그랬구나. 다음엔 사진도 보여 줘.','맛있게 먹었으면 됐다.']):pick('meal-follow',['그 메뉴 기억해 둬야겠다ㅋㅋ','어디서 산 건데?','맛있었으면 다음에 같이 가자.']),'meal-story');
 if(old.pending==='school-story'||old.pending==='school-detail')return say('school',family?pick('school-follow',['그 부분 때문에 시간이 걸렸구나. 지금은 마무리됐어?','알겠어. 설명 들으니까 무슨 과제인지 알겠다.','혼자 맡은 부분이 많아? 부담되면 미리 얘기하고.','그다음에는 뭘 해야 돼?']):pick('school-follow',['그 부분부터 맞추면 되겠다.','ㅇㅋ 그럼 나는 남은 자료 확인할게.','그 내용 공유 문서에도 남겨 줘.','하다가 막히면 톡해.']),'school-story');
 return say('day',family?pick('continue',['영아 그건 오늘 있었던 일이야?','무슨 얘긴지 한 번만 더 말해 줘.','그랬구나. 그래서 어떻게 됐어?','지금 얘기할 시간은 있어. 천천히 말해.','그건 어디에서 있었던 일인데?','영이는 어떻게 생각했어?','그 뒤에는 어떻게 했어?','그 일 때문에 연락한 거야?']):pick('continue',['뭔데ㅋㅋ 무슨 일 있었어?','그다음은?','오늘 있었던 얘기야?','어떻게 된 건데 좀 더 얘기해 봐.','그래서 너는 뭐라고 했어?','응 보고 있어. 계속해.','그건 무슨 뜻이야ㅋㅋ','어느 얘기인지 한번만 더ㅋㅋ']),'day-story');
}
localReplyFor=youngRoomReply;
romanceSave();render();
