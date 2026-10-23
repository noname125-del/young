/* Verbatim supplied captures plus short publicly indexed POP quotations. */
const ONER_POP_SOURCES={capture1:'IMG_4232.jpeg',capture2:'IMG_4233.jpeg',twitter:'https://x.com/doryy47/status/2056669866741121270',fanWeather:'https://theqoo.net/leagueoflegends/3568206027',wallpaper:'Reconstructed from supplied captures; not an original downloaded wallpaper.'};
const ONER_POP_RECORDS=[
 {text:'시차 맞추느라 팝을 못왔네',time:'오전 8:20',source:'capture1'},
 {text:'자도자도 피곤하구마잉',time:'오전 8:20',source:'capture1'},
 {text:'아 맞다 거기는 아침8시지;;',source:'capture1'},
 {text:'여긴',source:'capture1'},
 {text:'저녁6시20분',source:'capture1'},
 {text:'밥 먹으니 배가 부르고 눈이 감기는구나,,',source:'capture1'},
 {type:'date',text:'2026년 10월 22일 목요일'},
 {text:'즈미난',time:'오전 5:01',source:'capture1'},
 {type:'media',media:'oner-pop-poncho',source:'capture1'},
 {text:'촬영중',source:'capture1'},
 {quote:'현준씨 천천히 좀 보내주세요~ 해외 팬이라 번역하느라 숨차요 ㅠㅠ 흐름을 못 따라가겠어요 ㅎㅎ',text:'hey im sry',source:'capture2'},
 {quote:'아너랑 채팅하면서 길가다가 치일뻔함 근데 민첩해서 안',text:'핸드폰 끄고 앞 보고 간다 실시.',time:'오전 3:09',source:'capture2'},
 {quote:'자러간거야? 세상에\n중대장은 실망했다.',text:'너가 왜 중대장이야',source:'capture2'},
 {quote:'하... 오너때매 키 안 크겠다',text:'키 몇인데',source:'capture2'},
 {quote:'신라면과 안성탕면 중 하나를 선택해 주세요.',text:'신라면이지',time:'오전 3:10',source:'capture2'},
 {quote:'역시 문현준 눈에 내 글은 안보임\n난 내일 출근이니까 자야징 쳇',text:'잘자',time:'오전 3:10',source:'capture2'},
 {text:'내가 어떻게 키가',source:'capture2'},
 {text:'컸냐몬',source:'capture2'},
 {text:'어릴때 텐텐만 먹음',source:'capture2'},
 {text:'웃었으면 만족',source:'twitter'},
 {text:'그렇게 매일매일 웃도록',source:'twitter'}
].map((r,i)=>({...r,id:'oner-pop-record-'+i,side:'out',origin:'oner-pop-verified-v1'}));
// A secondary fan recollection, not a screenshot-verified transcript. No invented timestamps.
const ONER_POP_FAN_RECORDS=[
 {text:'와 날씨 뭐냐'},
 {text:'나가지마세요'},
 {subscriber:true,text:'선수님 저는 이미 도서관인데요 구조 가능한가요'},
 {text:'근데 밥뭐먹지'},
 {text:'추천좀'},
 {subscriber:true,text:'날씨 답장 쓰는 사이에 식사 시간이 됐네요'},
 {text:'티밥먹을까'},
 {subscriber:true,text:'저는 과제 먹고 있어요 맛은 없네요'},
 {text:'후 넷플추천좀'},
 {subscriber:true,text:'잠시만요 아직 메뉴 추천 중입니다ㅋㅋ'}
].map((r,i)=>({...r,id:'oner-pop-fan-weather-'+i,side:'out',source:r.subscriber?'young-fiction':'fanWeather',origin:r.subscriber?'young-pop-fiction-v1':'oner-pop-verified-v1',evidence:r.subscriber?'fiction':'fan-recollection'}));
const ONER_POP_YOUNG_REPLIES={
 '아 맞다 거기는 아침8시지;;':'해외 팬 시차까지 챙겨주시는 오너 선수님 감동이에요^^',
 '밥 먹으니 배가 부르고 눈이 감기는구나,,':'저는 수업 듣는데 눈이 감겨요 혹시 같은 증상인가요',
 '촬영중':'선수님 비옷 입으니까 토마토 같으세요',
 '키 몇인데':'오빠 저 2미터인데 가능성 있나요',
 '신라면이지':'신라면파 발언 잘 들었습니다 다음 커피 내기는 제가 이길게요',
 '어릴때 텐텐만 먹음':'저 지금 먹으면 늦었나요 과제 대신 텐텐 먹고 싶어요',
 '그렇게 매일매일 웃도록':'일단 선수님이 증바람 딜량 져 주시면 웃을 수 있을 것 같아요'
};
const ONER_POP_COMBINED=[...ONER_POP_FAN_RECORDS,{type:'date',text:'보관한 POP',id:'oner-pop-capture-section',side:'out'},...ONER_POP_RECORDS.flatMap(r=>ONER_POP_YOUNG_REPLIES[r.text]?[r,{id:r.id+'-young-reply',side:'out',subscriber:true,text:ONER_POP_YOUNG_REPLIES[r.text],origin:'young-pop-fiction-v1',source:'young-fiction',evidence:'fiction'}]:[r])];
window.ONER_REFERENCE.popHistory=ONER_POP_COMBINED;
data.popHistory=ONER_POP_COMBINED;
if(!R.onerPopBackdropRevision){data.popWallpaper='assets/oner-pop-moon-restored.png';R.onerPopBackdropRevision=1}
const popMediaBeforeOner=popMediaImage;
popMediaImage=function(media,cls=''){return media==='oner-pop-poncho'?imageRegion('assets/oner-pop-capture-oct22.jpeg',90,880,298,396,'oner-pop-poncho '+cls,'오너 POP 촬영 중 사진'):popMediaBeforeOner(media,cls)};
const popMessageBeforeOner=popMessage;
popMessage=function(row){
 if(row.origin==='young-pop-fiction-v1')return `<div class="pop-message subscriber-message young-pop-fiction" data-pop-evidence="fiction"><div class="pop-bubble"><p>${esc(row.text)}</p></div></div>`;
 if(row.origin!=='oner-pop-verified-v1'||row.type==='date')return popMessageBeforeOner(row);
 const header=(row.time||row.id==='oner-pop-fan-weather-0')?`<header class="oner-pop-author"><b>Oner <span aria-label="인증">✿</span></b><time>${esc(row.time||'팬 기록 기반')}</time></header>`:'';
 return `<article data-pop-evidence="${row.evidence||'verified'}" class="pop-artist-line oner-pop-record ${row.time?'with-author':'continued'}">${(row.time||row.id==='oner-pop-fan-weather-0')?identityPicture(POP_PICTURE,'Oner','pop-artist-avatar'):'<span class="pop-avatar-space"></span>'}<div>${header}<div class="pop-message artist-message">${row.type==='media'?`<button class="pop-media" data-pop-media="${esc(row.media)}" aria-label="사진 확대">${popMediaImage(row.media)}</button>`:`<div class="pop-bubble">${row.quote?`<blockquote><b>Oner님의 답장</b><p>${esc(row.quote).replaceAll('\n','<br>')}</p></blockquote>`:''}<p>${row.quote?'↳ ':''}${esc(row.text||'')}</p></div>`}</div></div></article>`;
};
const bstageBeforeOner=bstage;
bstage=function(){
 let html=bstageBeforeOner();if(state.sub!=='popChat')return html;
 html=html.replace('<div><h2>Oner <span>⌄</span></h2><small>구독 중 · Oner</small></div>',`<div><button type="button" id="onerPopMenu" aria-label="대화방 메뉴" aria-expanded="${!!state.onerPopMenu}"><h2>Oner <span>⌄</span></h2></button><small>함께하는 POP</small></div>`);
 html=html.replace('<button id="popSearchToggle" aria-label="대화 검색">⌕</button>','<button type="button" id="onerPopTranslate" aria-label="번역 설정"><svg viewBox="0 0 28 28" aria-hidden="true"><rect x="2" y="2" width="14" height="18" rx="3"/><path d="M5 15 9 6l4 9M6 12h6"/><rect x="13" y="10" width="13" height="16" rx="3"/><path d="M15 15h9m-4-3v3m-3 2 6 6m0-7c-1 4-4 6-7 7"/></svg></button>');
 html=html.replace('</header>',`</header>${state.onerPopMenu?'<div class="oner-pop-menu"><button type="button" id="popSearchToggle">대화 검색</button><button type="button" id="popPhoto">사진 보내기</button><button type="button" id="onerPopAdded">추가된 대화로 이동</button><button type="button" id="onerPopSources">대화 출처</button></div>':''}${state.onerPopTranslation?'<div class="oner-pop-translation">번역 언어: 한국어 · 원문 표시 중</div>':''}`);
 html=html.replace(/<form id="popComposer"[\s\S]*?<\/form>/,`<form id="popComposer" class="pop-composer oner-pop-composer"><div class="oner-pop-input"><textarea id="popMessage" rows="1" placeholder="메시지 보내기" maxlength="1000">${esc(data.popDraft||'')}</textarea><button type="button" id="popSticker" aria-label="스티커"><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M23 13a10 10 0 1 1-9-9M8 16c2 4 7 4 10 0M9 11h.1M16 11h.1M22 2v8m-4-4h8"/></svg></button><button class="oner-pop-send" aria-label="메시지 보내기" ${data.popDraft?.trim()?'':'hidden'}>↑</button></div></form>`);
 if(state.onerPopSources)html=html.replace('<div class="native-scroll pop-thread">',`<aside class="oner-pop-provenance"><button type="button" id="onerPopSourcesClose" aria-label="출처 닫기">×</button><b>대화 출처</b><p>오너의 기존 대사: 제공된 POP 캡처와 공개 트위터 발췌.</p><p>날씨·식사·넷플릭스 6개 문구: 팬의 회상 기록이며 원문 캡처는 확인하지 못했습니다. 기록에 없는 시간은 붙이지 않았습니다.</p><p>오른쪽 영이 답장 11개는 팬인 척 장난치는 시뮬레이터 창작입니다. 실제 팬 답장이나 오너와의 실제 대화가 아닙니다.</p><a href="${ONER_POP_SOURCES.fanWeather}" target="_blank" rel="noopener noreferrer">팬 기록 보기</a><a href="${ONER_POP_SOURCES.twitter}" target="_blank" rel="noopener noreferrer">트위터 발췌 보기</a></aside><div class="native-scroll pop-thread">`);
 return html;
};
const onerPopRender=render;
function showAddedPopMessages(){const first=document.querySelector('[data-pop-evidence="fan-recollection"]');if(first){const thread=first.closest('.pop-thread');if(thread)thread.scrollTop=Math.max(0,first.offsetTop-thread.offsetTop)}}
render=function(){onerPopRender();
 if(state.app==='pop'&&state.sub==='popChat'&&!R.popExpansionSeen20261024){showAddedPopMessages();R.popExpansionSeen20261024=true;romanceSave()}
 document.querySelector('#onerPopAdded')?.addEventListener('click',()=>{state.onerPopMenu=false;render();showAddedPopMessages()});
 document.querySelector('#onerPopSources')?.addEventListener('click',()=>{state.onerPopSources=true;state.onerPopMenu=false;render()});
 document.querySelector('#onerPopSourcesClose')?.addEventListener('click',()=>{state.onerPopSources=false;render()});
 document.querySelector('#onerPopMenu')?.addEventListener('click',()=>{state.onerPopMenu=!state.onerPopMenu;render()});
 document.querySelector('#onerPopTranslate')?.addEventListener('click',()=>{state.onerPopTranslation=!state.onerPopTranslation;render()});
 document.querySelector('#popMessage')?.addEventListener('input',e=>{const b=document.querySelector('.oner-pop-send');if(b)b.hidden=!e.target.value.trim()});
 document.querySelector('#popMessage')?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();document.querySelector('#popComposer').requestSubmit()}});
};
// Repair legacy metadata already saved on existing phones, not only new defaults.
function repairOnerMetadata(value,seen=new WeakSet()){
 if(!value||typeof value!=='object'||seen.has(value))return;seen.add(value);
 if(value.src==='assets/oner-official.png'){
  if('title' in value)value.title='문현준 공식 프로필 사진';
  if('caption' in value)value.caption='문현준 공식 프로필 사진';
 }
 for(const [k,v] of Object.entries(value)){if(typeof v==='string'&&v.includes('oner-local#0000'))value[k]=v.replaceAll('oner-local#0000','오 너#111');else if(v&&typeof v==='object')repairOnerMetadata(v,seen)}
}
repairOnerMetadata(R);repairOnerMetadata(data);
romanceSave();render();
