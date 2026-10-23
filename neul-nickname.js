/* Stable contact IDs preserve every existing conversation and friendship. */
function neulNameText(value){
 return String(value).replace(/지우랑/g,'늘이랑').replace(/지우와/g,'늘과').replace(/지우가/g,'늘이가').replace(/지우는/g,'늘은').replace(/지우를/g,'늘을').replace(/지우야/g,'늘아').replace(/지우(?=\s|[아은이가을를의도만거한]|$|[!?.,ㅋㅎ])/g,'늘');
}
const neulContact=LIFE.contacts.find(c=>c.id==='jiwoo_friend');
if(neulContact)Object.assign(neulContact,{name:'늘',realName:'지우',nickname:'늘',olderThanYoung:true});
for(const p of SOCIAL_PEERS)if(p.id==='jiwoo_friend')Object.assign(p,{name:'늘',nick:'늘',olderThanYoung:true});
for(const room of Object.values(LIFE.rooms))if(room.members)room.members=room.members.map(neulNameText);
if(!R.neulNicknameRevision){
 const rewrite=value=>{
  if(Array.isArray(value)){for(const [i,row] of value.entries())if(typeof row==='string')value[i]=neulNameText(row);else rewrite(row)}
  else if(value&&typeof value==='object')for(const key of Object.keys(value))if(['text','speaker','title','caption','bio'].includes(key)&&typeof value[key]==='string')value[key]=neulNameText(value[key]);else if(key==='name'&&value[key]==='지우')value[key]='늘';else if(typeof value[key]==='object')rewrite(value[key]);
 };
 for(const rows of [data.kakaoLocal,data.smsThreads,data.smsLocal,data.discordLocal,data.kakaoThreads,data.notes,R.riotLocal,R.socialAccounts])rewrite(rows);
 R.neulNicknameRevision=1;
}
data.contacts=LIFE.contacts;data.kakaoRooms=LIFE.rooms;
romanceSave();render();
