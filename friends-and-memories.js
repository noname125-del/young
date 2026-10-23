/* Friends and sourced memories; local messages are never overwritten. */
for(const p of [{id:'jiwoo_friend',name:'늘',nick:'늘',riot:'jiwoo-local#0000',pro:false},{id:'peyz_friend',name:'김수환',nick:'Peyz',riot:'peyz-local#0000',pro:true}])if(!SOCIAL_PEERS.some(x=>x.id===p.id))SOCIAL_PEERS.push(p);
applySocialPresence();
const ONER_MEMORIES=[
 {trigger:/피지컬/,quote:'피지컬로 내가 더 잘하면 되겠다고 생각한다.',url:'https://www.xportsnews.com/article/1529022',title:'2022년 현준이 인터뷰'},
 {trigger:/5등|다섯등/,quote:'10팀 중 5등 안에는 드는 것 같다.',url:'https://www.xportsnews.com/article/1529022',title:'2022년 현준이 인터뷰'},
 {trigger:/주오더/,quote:'주 오더는 케리아다.',url:'https://www.xportsnews.com/article/1529022',title:'2022년 현준이 인터뷰'},
 {trigger:/우여곡절|피는꽃/,quote:'많은 우여곡절을 겪고 피는 게 가장 좋다고 생각을 한다.',url:'https://www.e-focus.co.kr/news/articleView.html?idxno=2945449',title:'현준이 꽃 인터뷰'}
];
for(const x of [ONER_MEMORIES[0],ONER_MEMORIES[3],{title:'롤챗 있던 방송 다시 보기',url:'https://vod.sooplive.com/player/209838111'}])if(!safariFolders.롤.some(b=>b.url===x.url))safariFolders.롤.push({title:x.title,url:x.url});
function friendScene(id,input){
 const q=String(input).replace(/\s/g,'');
 if(!['jiwoo_friend','peyz_friend','doublecouple'].includes(id))return undefined;
 R.friendScenes??={};const m=R.friendScenes[id]??={seen:[],topic:''};
 const group=id==='doublecouple',jiwoo=id==='jiwoo_friend';
 let key,rows,speaker=group?'늘':undefined;
 if(/수환|남친|연애|페이즈|솬늘/.test(q)){key='couple';rows=jiwoo?['수환이? 오늘 끝나고 연락한대ㅋㅋ 너 현준이랑 통화했어?','우리 둘 얘기를 왜 너네 내기 판정에 끼워 넣냐ㅋㅋ','다음에 네 명 만나면 수환이랑 현준이 자리 붙여 놓자']:['늘이랑 얘기해 보고 시간 보낼게요. 현준이 형도 같이 오죠?','지난번에 넷이 만났을 때 재밌었어요ㅋㅋ 다음엔 메뉴 미리 정해요']}
 else if(/현준|오너/.test(q)){key='oner';rows=['너네 또 커피 내기했냐ㅋㅋ 현준이 이번엔 이김?','현준이한테도 물어봐. 한국 오면 수환이랑 나도 같이 시간 비울게','지난번 넷이 밥 먹을 때도 둘이 계산 걸고 싸웠잖아ㅋㅋ']}
 else if(/넷이|만나|한국|방학|더블|밥|카페/.test(q)){key='outing';rows=['한국 오는 날짜부터 보내ㅋㅋ 나 수환이한테도 물어볼게','지난번처럼 밥 먹고 카페? 이번엔 너네가 메뉴 골라','나랑 수환이는 시간 맞춰 볼게. 현준이는 연습 끝나는 시간 확인해 줘']}
 else if(/힘들|속상|외로|울었/.test(q)){key='care';rows=['지금 얘기할 수 있어. 무슨 일 있었어?','미국에서 혼자 버티느라 더 힘들었겠다. 나 듣고 있어','오늘은 장난 안 칠게. 전화가 편하면 걸어']}
 else if(/게임|아레나|증바람|칼바람/.test(q)){key='game';rows=['넷이 증바람 하면 커플끼리 팀 나누는 거 금지ㅋㅋ','수환이까지 부르면 딜량 내기 판정은 누가 함ㅋㅋ','너네 또 커피 걸 거면 결과 캡처부터 남겨']}
 else if(/잘자|잘게|고마|^응$|^ㅇㅋ$/.test(q))return null;
 else {key='day';rows=jiwoo?['야 미국은 지금 수업 끝났냐','나 수환이 연락 기다리면서 너 톡 보는 중ㅋㅋ 무슨 일','너 한국 오면 할 얘기 쌓임. 일단 오늘 얘기부터 해 봐']:['늘한테 영이 연락 왔다고 들었어요ㅋㅋ 잘 지내요?','미국은 지금 몇 시예요? 과제는 끝났어요?','다음에 네 명 시간 맞춰서 같이 봐요']}
 if(group&&/현준|오너/.test(q)){speaker='문현준';rows=['영아 귀국 날짜 정해지면 먼저 보내','넷이 먹을 건 늘이랑 수환이가 고르고 커피는 우리 내기로 하자ㅋㅋ']}
 const text=rows.find(t=>!m.seen.includes(t));if(!text)return null;m.seen.push(text);m.topic=key;
 return {side:'them',text,...(speaker?{speaker}:{})};
}
const friendsBaseReply=youngReply;
youngReply=function(input,at){
 const q=String(input).replace(/\s/g,'');R.onerMemorySeen??=[];
 const memory=ONER_MEMORIES.find(x=>x.trigger.test(q)&&!R.onerMemorySeen.includes(x.quote));
 if(memory){R.onerMemorySeen.push(memory.quote);return [memory.quote]}
 if(/지우|솬늘|늘아|늘언니|(?<![가-힣])늘(?=이랑|한테|도|은|이가|을|과|$)|수환|더블데이트|넷이/.test(q)){
  R.onerFriendsSeen??=[];const rows=/수환/.test(q)?['솬늘도 시간 되는지 물어봐','넷이 밥 먹고 너랑 나랑은 커피 딜량빵ㅋㅋ']:['늘한테 귀국 날짜 얘기했어?','한국 오면 솬늘이랑 넷이 보자'];const r=rows.find(x=>!R.onerFriendsSeen.includes(x));if(r){R.onerFriendsSeen.push(r);return [r]}return [];
 }
 return friendsBaseReply(input,at);
};
contextReply=youngReply;conversationalReply=youngReply;romancePickReply=youngReply;
const friendsRoomBase=localReplyFor;
localReplyFor=function(app,id,text){const r=friendScene(id,text);return r!==undefined?r:friendsRoomBase(app,id,text)};
const friendsPeerBase=peerReply;
peerReply=function(id,text){const r=friendScene(id,text);if(r!==undefined)return r;if(id==='suhwan'){const lines=contextReply(text);return lines.length?{side:'them',text:lines.join('\n')}:null}if(['family','mom','dad'].includes(id))return youngRoomReply('kakaotalk',id,text);const reply=friendsPeerBase(id,text);if(!reply)return null;R.peerReplySeen??={};const seen=R.peerReplySeen[id]??=[];if(seen.includes(reply.text))return null;seen.push(reply.text);return reply};
romanceSave();render();
