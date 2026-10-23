// Riot Mobile friend identity and persisted per-friend messages.
data.riotFriends=SOCIAL_PEERS.map(p=>p.riot);
function riotStatusText(index){const s=data.friendPresence?.[index];return s==='playing'?'리그 오브 레전드 · 게임 중':presenceText(s)}
function applySocialPresence(at=Date.now()){data.friendPresence=SOCIAL_PEERS.map(peer=>simulatedPresence(peer,at));return data.friendPresence}
applySocialPresence();
R.riotLocal??={};state.riotMessages=R.riotLocal;
const riotSeeds={
 suhwan:[['them','영아 들어왔어?'],['me','응 오늘은 내가 원딜 할래'],['them','그럼 내가 서폿 해 줄게'],['me','나 따라오다가 같이 죽어도 내 탓 금지 ㅋㅋ'],['them','일단 해 보자 영아 ㅋㅋ'],['them','디코도 들어와']],
 doran:[['them','영 칼바람 할 거야?'],['me','네 오빠 현준이랑 같이 들어왔어요'],['them','그럼 초대 보낼게'],['me','로비 들어왔어요 바로 준비할게요'],['them','나는 괜찮아. 영 하고 싶은 거 골라']],
 untara:[['me','오빠 아직 자리 있어요?'],['them','응 하나 남아. 현준이도 와?'],['me','현준이 끝나면 들어온대요'],['them','그럼 같이 기다리자 ㅋㅋ'],['me','오빠 이번엔 앞라인 해 주세요'],['them','아직 시작도 안 했는데 정했네 ㅋㅋ']],
 oner:[['them','영아 같이 해요?'],['me','응 잠깐만 디코 켜고'],['them','현준이도 초대할게요'],['me','오케이 근데 나 한 판만 해 내일 수업'],['them','네 영아 딱 한 판 ㅋㅋ']],
 faker:[['me','오빠 지금 같이 한 판 해도 돼요?'],['them','응. 초대할게'],['me','저 지금 로비에 있어요'],['them','하고 싶은 챔피언 있어?'],['me','일단 보고 고를게요']],
 keria:[['them','영아 원딜 하고 싶으면 이거 가져가요'],['me','나 이즈 해도 돼?'],['them','네 저는 다른 거 할게요'],['me','고마워 오늘 꼭 안 죽고 해 볼게 ㅋㅋ'],['them','ㅋㅋㅋ 편하게 해요 영아']],
 friend:[['them','접속했어?'],['me','응 현준이 끝날 때까지 한 판 할래?'],['them','좋아 디코 와'],['me','마이크 켜고 갈게']],
 naeun:[['them','오늘 몇 시까지 해?'],['me','한 판만! 내일 발표야'],['them','그 말 기억한다 ㅋㅋ']],
 subin:[['me','지금 한 명 더 와도 돼?'],['them','응 초대해'],['me','현준이도 들어온대']],
 sora:[['them','칼바람 막차 출발합니다'],['me','나도 타요 ㅋㅋ'],['them','디코부터 켜']],
 hyejin:[['me','한 판 같이 하자'],['them','잠깐만 물 좀 가져오고'],['me','응 로비에서 기다릴게']]
};
data.riotChat=[];data.riotThreads={};
for(const [i,p] of SOCIAL_PEERS.entries())data.riotThreads[i]=[{date:'2026년 10월 20일',rows:riotSeeds[p.id]||[]}];
const riotBeforeSocial=riot;
riot=function(){applySocialPresence();return riotBeforeSocial()};
function bindRiotSocial(){if(state.app!=='riot')return;document.querySelectorAll('[data-riot-friend]').forEach(b=>{const p=SOCIAL_PEERS[Number(b.dataset.riotFriend)];if(p)b.dataset.search=(p.name+' '+p.nick+' '+p.riot).toLowerCase()});document.querySelector('#riotComposer')?.addEventListener('submit',e=>{e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();const f=document.querySelector('#riotMessage'),text=f.value.trim();if(!text)return;const i=state.riotFriend||0,peer=SOCIAL_PEERS[i];R.riotLocal[i]??=[];R.riotLocal[i].push({side:'me',text,time:now(),date:dateKey()});state.riotMessages=R.riotLocal;romanceSave();render();setTimeout(()=>{const reply=peerReply(peer.id,text);if(reply){R.riotLocal[i].push({side:'them',text:reply.text,time:now(),date:dateKey()});romanceSave();if(state.app==='riot'&&state.riotFriend===i)render()}},1200)},true)}
const riotSocialRender=render;render=function(){riotSocialRender();bindRiotSocial()};
let lastPresenceHour=Math.floor(Date.now()/3600000);
setInterval(()=>{const hour=Math.floor(Date.now()/3600000);if(hour===lastPresenceHour)return;lastPresenceHour=hour;applySocialPresence();if(['riot','discord'].includes(state.app)&&!state.locked&&!document.activeElement?.matches('input,textarea'))render()},60000);
romanceSave();render();

const routeBeforeFriends=routeKey;
routeKey=function(){if(state.app==='discord')return JSON.stringify({app:'discord',sub:state.sub,peer:state.discordFriend||0,server:!!state.dcServer,channel:state.dcChannel||'',own:!!state.dcOwnProfile,friends:dcFriendsOpen});if(state.app==='riot')return JSON.stringify({app:'riot',page:state.riotPage||'community',tab:state.riotTab||'friends',sub:state.sub,peer:state.riotFriend||0});return routeBeforeFriends()};
let renderedDiscordPeer=-1;
const followDiscordRender=render;
render=function(){const old=document.querySelector('.dc-social-chat .discord-chat'),peer=state.discordFriend||0,follow=!old||renderedDiscordPeer!==peer||old.scrollHeight-old.scrollTop-old.clientHeight<80;followDiscordRender();if(state.app==='discord'&&state.sub==='discordChat'){renderedDiscordPeer=peer;if(follow)requestAnimationFrame(()=>{const area=document.querySelector('.dc-social-chat .discord-chat');if(area)area.scrollTop=area.scrollHeight})}};
