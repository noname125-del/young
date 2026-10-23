// Subscriber ownership, account-local avatars and native navigation state.
const FULL_NAMES={friend:'김서연',sora:'이소라',hyejin:'정혜진',naeun:'박나은',subin:'최수빈',jiyeon:'윤지연',yujin:'한유진',minji:'김민지 선배님',teamlead:'박지현 팀장님',faker:'이상혁',oner:'문현준',keria:'류민석'};
const oldNames={};for(const c of LIFE.contacts){if(FULL_NAMES[c.id]){oldNames[c.name]=FULL_NAMES[c.id];c.name=FULL_NAMES[c.id]}}
data.contacts=LIFE.contacts;
for(const room of Object.values(LIFE.rooms)){if(room.members)room.members=room.members.map(n=>oldNames[n]||({유진:'한유진',이수빈:'이수빈',서연:'김서연',소라:'이소라',혜진:'정혜진',나은:'박나은',수빈:'최수빈'}[n]||n))}
for(const rows of Object.values(LIFE.histories))for(const m of rows)if(m.speaker)m.speaker=oldNames[m.speaker]||m.speaker;
const JIU_PICTURE='assets/young-cheek-selfie.jpg',POP_PICTURE='assets/oner-white-cap.jpg',SUHWAN_PICTURE='assets/oner-red-selfie.jpg';
function identityPicture(src,label,classes=''){return `<span class="identity-picture ${classes}"><img src="${src}" alt="${esc(label)}" draggable="false"></span>`}
profileAvatar=function(size=''){if(state.app==='pop'||(state.app==='xapp'&&state.xPeer))return identityPicture(POP_PICTURE,'Oner 프로필','profile-avatar '+size);return identityPicture(JIU_PICTURE,'영 프로필','profile-avatar '+size)};
const repairKakaoAvatar=kakaoAvatar;
kakaoAvatar=function(c){const src=(c?.id==='self'||c?.name===data.name)?JIU_PICTURE:c?.id==='suhwan'?SUHWAN_PICTURE:null;if(src)return `<span class="kk-avatar kk-photo-avatar" role="img" aria-label="${esc(c?.id==='suhwan'?'현준':'영')} 프로필" style="background-image:url('${src}')"></span>`;return repairKakaoAvatar(c)};
// Source uses out for the artist and in for fans. Keep source data intact.
popRows=function(){return [...(window.ONER_REFERENCE.popHistory||[]),...(data.popMessages||[]).filter(x=>x.side!=='in'),...(data.popItems||[]).map(m=>({...m,subscriber:true}))]};
const artistPopMessage=popMessage;
popMessage=function(row){if(row.type==='date')return artistPopMessage(row);if(row.subscriber){return `<div class="pop-message subscriber-message"><div class="pop-bubble">${row.type==='media'?`<button class="pop-media" data-pop-media="${esc(row.media)}">${popMediaImage(row.media)}</button>`:`<p>${esc(row.text||'')}</p>`}</div><time>${esc(row.time||'')}</time></div>`}const html=artistPopMessage(row).replaceAll('pop-outgoing','artist-message');return `<div class="pop-artist-line">${identityPicture(POP_PICTURE,'Oner','pop-artist-avatar')}<div><small class="pop-artist-name">Oner ✓</small>${html}</div></div>`};
const subscriptionStage=bstage;
bstage=function(){return subscriptionStage().replace('나의 POP','구독 중 · Oner')};
// A single search screen owns its input and results. No injected account card.
bindRealism=function(){if(state.app==='xapp'&&state.xScreen==='search'){document.querySelector('#peyzXResult')?.remove()}};
function igAccountRows(query){const q=query.trim().toLowerCase();const accounts=[['peyz','oner','문현준',POP_PICTURE],['young','young','영',JIU_PICTURE],['friend','seoyeon','김서연',JIU_PICTURE]];return accounts.filter(a=>q&&a.slice(0,3).join(' ').toLowerCase().includes(q)).map(([id,handle,name,src])=>`<button class="ig-account-result" data-account="${id}">${identityPicture(src,name)}<span><b>${handle}</b><small>${name}</small></span></button>`).join('')||'<p class="social-empty">검색 결과가 없습니다.</p>'}
curatedExplore=function(){const q=state.igQuery||'';return `<section class="appview native instagram-native jiu-instagram"><div class="ig-search-top"><label>${phoneUiIcon('search')}<input id="igNativeQuery" aria-label="Instagram 검색" placeholder="검색" value="${esc(q)}" autocomplete="off"></label><button id="igSearchCancel">취소</button></div><div class="native-scroll"><div id="igAccountResults" ${q?'':'hidden'}>${igAccountRows(q)}</div><div class="explore-grid" id="igNativeGrid" ${q?'hidden':''}>${(data.explorePosts||[]).map((p,i)=>`<button data-rec-post="${i}"><img src="${p.images[0]}" alt="${esc(p.tags||'추천 게시물')}" loading="lazy"></button>`).join('')}</div></div>${igPhoneNav()}${recommendedOverlay()}</section>`};
const repairInstagram=instagram;
instagram=function(){let html=repairInstagram();if(state.igPeer){html=html.replace('<button id="igCompose" aria-label="새 게시물">＋</button>','<button id="igPeerBack" aria-label="검색으로 돌아가기">‹</button>')}if(!state.igPeer){html=html.replace(/<span class="ig-default-avatar"[^>]*><i><\/i><\/span>/g,identityPicture(JIU_PICTURE,'영 프로필','ig-profile-picture')).replace(/<span class="jiu-default-avatar">◉(?:<i>＋<\/i>)?<\/span>/g,identityPicture(JIU_PICTURE,'영 프로필','jiu-default-avatar'));}return html};
function bindAccountRepair(){
 document.querySelector('#igPeerBack')?.addEventListener('click',()=>{state.igPeer=false;state.igExplore=true;state.igScreen='search';render()});
 const query=document.querySelector('#igNativeQuery');function bindAccounts(){document.querySelectorAll('[data-account]').forEach(b=>b.onclick=()=>{state.igPeer=b.dataset.account==='peyz';state.igExplore=false;state.igScreen='profile';render()})}
 query?.addEventListener('input',e=>{state.igQuery=e.target.value;document.querySelector('#igAccountResults').hidden=!state.igQuery;document.querySelector('#igNativeGrid').hidden=!!state.igQuery;document.querySelector('#igAccountResults').innerHTML=igAccountRows(state.igQuery);bindAccounts()});bindAccounts();
 document.querySelector('#igSearchCancel')?.addEventListener('click',()=>{state.igQuery='';state.igExplore=false;state.igScreen='home';render()});
 document.querySelectorAll('[data-ig-screen]').forEach(b=>b.onclick=()=>{state.igPeer=false;state.igScreen=b.dataset.igScreen;state.igExplore=state.igScreen==='search';igLocal.dm='';render()});
 const ownImage=document.querySelector('.ig-glass-tabs [data-ig-screen="profile"]');if(ownImage)ownImage.innerHTML=identityPicture(JIU_PICTURE,'내 프로필');
 // Persist actual opened URLs in Safari's tab collection, including bookmark navigation.
 function trackUrl(url,title){R.browserTabs??=[];if(!R.browserTabs.some(t=>t.url===url))R.browserTabs.push({url,title:title||new URL(url).hostname,kind:'web'});romanceSave()}
 if(state.app==='safari'){
  document.querySelectorAll('.safari-bookmark-list a').forEach(a=>a.addEventListener('click',()=>trackUrl(a.href,a.querySelector('strong')?.textContent)));
  document.querySelectorAll('[data-safari-url]').forEach(b=>b.onclick=()=>{const url=b.dataset.safariUrl;trackUrl(url,b.textContent.trim());window.open(url,'_blank','noopener')});
  document.querySelector('#safariSearch')?.addEventListener('submit',()=>{const q=document.querySelector('#safariAddress').value.trim();if(q)trackUrl(/^https?:\/\//i.test(q)?q:/^[a-z0-9.-]+\.[a-z]{2,}/i.test(q)?'https://'+q:'https://www.google.com/search?q='+encodeURIComponent(q),q)});
  document.querySelector('#safariStart')?.addEventListener('click',()=>{state.safariTabs=false;extras.safariFolder=null;render()});
 }
}
const accountRender=render;render=function(){accountRender();bindAccountRepair()};
romanceSave();render();
