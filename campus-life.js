/* Young's university life. Events are fictional personal plans, not league fixtures. */
const CAMPUS_FRIENDS=[{id:'maya',name:'Maya',nick:'Maya',number:'+1 (555) 010-0142',riot:'maya-local#0000',pro:false},{id:'alex',name:'Alex',nick:'Alex',number:'+1 (555) 010-0186',riot:'alex-local#0000',pro:false}];
const CAMPUS_CHATS={
 maya:[['2026-10-14','14:08','them','Did you get the feedback on our draft?'],['2026-10-14','14:11','me','Yes 😭 we need a clearer argument in the second section.'],['2026-10-14','14:13','them',"Library after class? I'll bring my notes."],['2026-10-14','14:15','me',"Please. I have three tabs open and zero thoughts."],['2026-10-20','17:20','them',"Are you still coming to the basketball game with us?"],['2026-10-20','17:24','me',"If I finish this reading response first. Don't let me buy another hoodie."],['2026-10-20','17:26','them',"No promises about the hoodie. I'll save you a seat."],['2026-10-22','11:32','me',"I uploaded my slides. Can you check the citations?"],['2026-10-22','11:40','them',"On it. You left one source off the last slide."],['2026-10-22','11:43','me','Fixed it! Coffee after we rehearse?']],
 alex:[['2026-10-16','18:14','me',"Wait, why was that icing? I thought they could send it down the ice."],['2026-10-16','18:17','them',"I'll explain at intermission. Watch where the puck starts."],['2026-10-16','18:20','me','Okay but everyone around us knew before the whistle 😭'],['2026-10-16','18:22','them',"You'll get there. Want to borrow my extra scarf?"],['2026-10-21','16:05','them',"Thinking of going to another hockey game. Want me to check seats?"],['2026-10-21','16:12','me',"Yes, but cheap seats. I spent my fun budget at the last game."],['2026-10-21','16:16','them',"I'll send a few options before buying anything."],['2026-10-22','20:14','me',"Made it back. My voice is gone from cheering."],['2026-10-22','20:18','them',"Worth it. Send me the pictures when you're done with your assignment."]]
};
for(const friend of CAMPUS_FRIENDS){
 if(!LIFE.contacts.some(c=>c.id===friend.id))LIFE.contacts.push({...friend});
 if(!SOCIAL_PEERS.some(c=>c.id===friend.id))SOCIAL_PEERS.push({...friend});
 LIFE.histories[friend.id]=CAMPUS_CHATS[friend.id].map(([date,time,side,text],i)=>({date,time,side,text,timestamp:phoneInstant(date,time),seedId:'campus-'+friend.id+i,origin:'campus-v1'}));
 data.kakaoThreads[friend.id]=LIFE.histories[friend.id].map(m=>[m.side,m.text]);
 data.smsThreads??={};if(!data.smsThreads[friend.id]?.length)data.smsThreads[friend.id]=LIFE.histories[friend.id].slice(-3).map(m=>[m.side,m.text]);
 const idx=SOCIAL_PEERS.findIndex(p=>p.id===friend.id);data.discordLocal??={};
 if(!data.discordLocal[idx]?.length)data.discordLocal[idx]=(friend.id==='maya'?[['them','Can you hear me? I can share the presentation.'],['me','Yes! Let me open my speaker notes.']]:[['me','You left your mic muted during that entire round 😂'],['them',"I was explaining the offside rule to myself, apparently."]]).map(([side,text])=>({side,text,time:'',origin:'campus-v1',reactions:[]}));
}
data.contacts=LIFE.contacts;data.kakaoRooms=LIFE.rooms;applySocialPresence();
if(!R.campusLifeRevision){
 const notes=[{id:'campus-readings',title:'이번 주 과제',text:'Reading response: 주장 먼저 쓰고 근거 연결하기\n팀플: Maya랑 슬라이드 인용 출처 확인\n발표 전에 시간 재면서 리허설\n도서관에서 자료 읽고 참고문헌 정리\n마감 직전까지 미루지 말기… 진짜로'},{id:'campus-sports',title:'하키 / 농구 보러 갈 때',text:'Alex한테 좌석 가격 먼저 물어보기. 결제 전에 확인!\n하키장 추우니까 목도리 챙기기\n아이싱이랑 오프사이드 아직 헷갈림\n농구 보러 갈 땐 과제부터 제출\n응원하다 목 쉬면 현준이한테 또 놀림받음\n사진 정리해서 늘한테 보내기'}];
 for(const n of notes)if(!data.notes.some(x=>x.id===n.id))data.notes.push({...n,date:dateKey()});
 for(const e of [{date:'2026-10-26',title:'도서관 · 팀플 자료 정리',detail:'Maya와 참고문헌 확인 / 발표 역할 나누기'},{date:'2026-10-27',title:'Reading response 초안',detail:'수업 읽기 자료 정리하고 논지 작성'},{date:'2026-10-28',title:'발표 리허설',detail:'슬라이드 넘기면서 시간 재기'},{date:'2026-10-30',title:'Alex랑 하키 좌석 알아보기',detail:'가격 비교만 먼저 · 경기 날짜와 이동 시간 확인'},{date:'2026-10-31',title:'친구들이랑 농구 관람 계획',detail:'Maya한테 가능한 날짜 물어보기 · 과제 일정부터 확인'}])if(!data.schedule.some(x=>x.title===e.title&&x.date===e.date))data.schedule.push(e);
 R.campusLifeRevision=1;
}
function campusReply(id,input){
 if(!CAMPUS_FRIENDS.some(c=>c.id===id))return undefined;
 const q=String(input).toLowerCase();R.campusMemory??={};const m=R.campusMemory[id]??={seen:[]};
 let rows;
 if(/assignment|essay|draft|class|read|slide|study|과제|팀플|발표/.test(q))rows=id==='maya'?["Let's check the rubric before we change anything else.","I can review your references. Have you finished the conclusion?","Send me the doc link and highlight the bit you're stuck on."]:['Want to grab a library table before it gets crowded?',"Finish the draft first. We can look at tickets afterward."];
 else if(/hockey|icing|offside|하키/.test(q))rows=id==='alex'?["Are we talking about the offside call or the icing call?","Let's check the ticket price before we commit.","Bring something warm this time. You were freezing at intermission."]:["Ask Alex about the rules. I'm still learning too.","I'm in if it doesn't clash with our presentation."];
 else if(/basketball|game|ticket|농구|직관/.test(q))rows=id==='maya'?["Want to go together? Let's compare our deadlines first.","I'll ask the others which day works. No buying tickets yet.","You can cheer as loud as you want after we submit this paper."]:["Send me the seats you're looking at. What's your budget?","I'm free after class, but we should check how we're getting home."];
 else if(/tired|stressed|sad|힘들/.test(q))rows=["Do you want company, or do you need some quiet?","We can take a break. You don't have to finish everything at once."];
 else if(/^(ok|okay|thanks|thank you|bye|good night)[.! ]*$/.test(q))return null;
 else rows=id==='maya'?["Hey! Just got out of class. What's up?","I'm at the library. Want to sit with me?","Tell me what happened. I've got a minute."]:["Hey Young, what's going on?","I'm heading back from campus. How was your day?","Tell me more. Was that today?"];
 const text=rows.find(x=>!m.seen.includes(x));if(!text)return null;m.seen.push(text);return {side:'them',text};
}
const campusRoomBase=localReplyFor;localReplyFor=function(app,id,text){const r=campusReply(id,text);return r===undefined?campusRoomBase(app,id,text):r};
const campusPeerBase=peerReply;peerReply=function(id,text){const r=campusReply(id,text);return r===undefined?campusPeerBase(id,text):r};
const campusOnerBase=youngReply;
youngReply=function(input,at){const q=String(input).replace(/\s/g,'');let rows;
 if(/하키|아이싱|오프사이드/.test(q))rows=['영아 이번에도 목 쉬어서 오는 거 아님?ㅋㅋ','규칙 또 헷갈렸어? 어느 장면인데','끝나고 집 갈 땐 친구들이랑 같이 가. 도착하면 연락하고'];
 else if(/농구|직관|경기장/.test(q))rows=['과제는 제출하고 가는 거지ㅋㅋ','친구들이랑 보는 거야? 재밌겠다','영이 요즘 나보다 경기 더 많이 보네ㅋㅋ'];
 else return campusOnerBase(input,at);
 R.campusOnerSeen??=[];const r=rows.find(x=>!R.campusOnerSeen.includes(x));if(!r)return [];R.campusOnerSeen.push(r);return [r]};
contextReply=youngReply;conversationalReply=youngReply;romancePickReply=youngReply;
romanceSave();render();
