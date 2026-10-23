// Shared identities across Kakao, Riot Mobile and Discord.
const SOCIAL_PEERS=[
 {id:'suhwan',name:'문현준',nick:'Oner',riot:'오 너#111',pro:true},
 {id:'doran',name:'최현준',nick:'Doran',riot:'어리고싶다#KR1',pro:true},
 {id:'faker',name:'이상혁',nick:'Faker',riot:'Hide on bush#KR1',pro:true},
 {id:'keria',name:'류민석',nick:'Keria',riot:'Ciro#KR10',pro:true},
 {id:'untara',name:'박의진',nick:'Untara',riot:'96년생 티모장인#9202',pro:false},
 {id:'friend',name:'김서연',nick:'김서연',riot:'막차타는룰루#KR1',pro:false},
 {id:'naeun',name:'박나은',nick:'박나은',riot:'한판만하고퇴근#KR2',pro:false},
 {id:'subin',name:'최수빈',nick:'최수빈',riot:'봇가는고양이#KR1',pro:false},
 {id:'sora',name:'이소라',nick:'이소라',riot:'집가서한판#KR1',pro:false},
 {id:'hyejin',name:'정혜진',nick:'정혜진',riot:'칼바람산책#KR1',pro:false}
];
data.contacts=LIFE.contacts;data.kakaoRooms=LIFE.rooms;
for(const [id,rows] of Object.entries(LIFE.histories))data.kakaoThreads[id]=rows.filter(m=>!m.divider).map(m=>[m.side,m.text,m.speaker]);
function peerReply(id,text){const q=text.replace(/\s/g,''),older=['doran','faker','untara'].includes(id),call=older?'영':'영아';R.peerTopics??={};
 if(id==='suhwan')return {side:'them',text:contextReply(text).join('\n')};
 if(id==='family')return {side:'them',speaker:/동생/.test(q)?'동생':'엄마',text:/퇴근|도착|집/.test(q)?'고생했어. 집에 오면 밥 먹자':/먹|밥/.test(q)?'밥 챙겨 먹었으면 됐지. 늦게 다니지 말고':'응, 오늘도 잘 보내고 저녁에 연락해'};
 if(id==='dinner'){const choices=[['박의진','좋지 ㅋㅋ 시간 되는 날 정해 보자'],['최현준','나는 괜찮아. 현준이한테도 물어봐'],['문현준','영아 날짜 정하면 저도 시간 볼게요']];const n=R.peerTopics.dinner||0;R.peerTopics.dinner=n+1;return {side:'them',speaker:choices[n%3][0],text:choices[n%3][1]}}
 if(!SOCIAL_PEERS.some(p=>p.id===id))return null;
 if(/밥|먹|메뉴|식당|예약/.test(q)){R.peerTopics[id]='food';return {side:'them',text:id==='faker'?'좋아. 현준이랑 시간 맞춰서 단톡에 얘기해 줘':id==='doran'?'좋아. 지난번처럼 같이 먹자. 메뉴는 영가 정해 ㅋㅋ':id==='untara'?'좋지 ㅋㅋ 둘이 데이트하는 날만 아니면 불러':call+' 뭐 먹고 싶어요? 저도 같이 메뉴 볼게요'}}
 if(/롤|칼바람|듀오|게임|접속|초대/.test(q)){R.peerTopics[id]='game';return {side:'them',text:id==='untara'?'ㅋㅋ 끝나면 불러. 이번엔 나도 뒷라인 좀 해 보자':id==='doran'?'영 들어오면 한 판 같이 하자. 현준이도 와?':older?'끝나고 시간 되면 같이 하자':call+' 들어와요? 끝나면 초대할게요'}}
 if(/현준|오너|남친/.test(q))return {side:'them',text:id==='doran'?'현준이 영 오는 날은 먼저 시간 확인하던데 ㅋㅋ':id==='untara'?'ㅋㅋㅋ 너희 둘 얘기는 둘이 있을 때 해. 다음엔 밥 같이 먹고':older?'응. 현준이한테도 얘기해 둘게':call+' 그건 현준이한테 직접 물어봐요 ㅋㅋ'};
 if(/사진|영상/.test(q))return {side:'them',text:older?'응 ㅋㅋ 다음에 다 같이 만날 때 또 찍자':call+' 지난번 것도 아직 있어요. 찾아서 보내 줄게요'};
 if(/고마|감사/.test(q))return {side:'them',text:older?'괜찮아 ㅋㅋ 다음에 같이 밥 먹자':'아니에요 영아 ㅋㅋ 다음에 또 같이 가요'};
 if(/잘자|잘자요/.test(q))return {side:'them',text:older?'영도 잘 자. 내일 출근 잘하고':'영아도 잘 자요. 내일 출근 파이팅'};
 if(/출근|퇴근|일|회사|회의/.test(q))return {side:'them',text:older?'영 오늘도 고생했네. 쉬는 날에 같이 밥 먹자':'영아 오늘도 고생했어요. 집 조심히 가요'};
 if(R.peerTopics[id]==='food')return {side:'them',text:older?'응 그쪽으로 알아볼게. 시간 정해지면 단톡에 올려 줘':'좋아요 영아. 그날 시간 맞춰서 갈게요'};
 if(R.peerTopics[id]==='game')return {side:'them',text:older?'응 ㅋㅋ 들어오면 불러':'네 영아. 들어오면 알려 주세요'};
 return {side:'them',text:older?'ㅋㅋㅋ 다음에 만나면 얘기 더 해 줘':'ㅋㅋㅋㅋ 영아 다음에 같이 만날 때 그 얘기 해요'};
}
const originalPeerReply=localReplyFor;
localReplyFor=function(app,id,text){if(app==='kakaotalk'){const reply=peerReply(id,text);if(reply)return reply}return originalPeerReply(app,id,text)};
const previousQueue=queueLocalReply;
queueLocalReply=function(app,id,text){if(app!=='kakaotalk')return previousQueue(app,id,text);const reply=localReplyFor(app,id,text);if(!reply)return;setTimeout(()=>{if((data.blockedKakao||[]).includes(id))return;const active=!state.locked&&state.app==='kakaotalk'&&state.kakaoChat===id;data.kakaoLocal??={};data.kakaoLocal[id]??=[];data.kakaoLocal[id].push({...reply,time:now(),date:dateKey(),timestamp:Date.now()});R.chatMeta[id]??={};if(!active)R.chatMeta[id].unread=(R.chatMeta[id].unread||0)+1;romanceSave();render()},1100+Math.min(text.length*12,700))};
romanceSave();render();
