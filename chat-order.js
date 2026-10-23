// Kakao ordering and unread state live with the saved conversation, independent of notifications.
R.chatMeta??={};
// Seeded history cannot appear before its KST send time. Locally sent rows keep their actual timestamp.
function kakaoRowStamp(m,fallback=''){if(Number.isFinite(m.timestamp))return m.timestamp;const date=m.date||fallback;if(!/^\d{4}-\d{2}-\d{2}$/.test(date||'')||!/^\d{2}:\d{2}$/.test(m.time||''))return 0;return phoneInstant(date,m.time)}
const timedKakaoRows=kakaoRows;
kakaoRows=function(id){const visible=[];let pending=null;for(const row of timedKakaoRows(id)){if(row.divider){pending=row;continue}if(kakaoRowStamp(row,pending?.date)>Date.now())continue;if(pending){visible.push(pending);pending=null}visible.push(row)}return visible};

// Older versions stored outgoing messages as bare strings; freeze their date once.
if(!R.chatTimestampRevision){for(const [id,rows] of Object.entries(data.kakaoLocal||{})){const anchor=Math.min(R.chatMeta[id]?.lastSent||Date.now(),Date.now());data.kakaoLocal[id]=rows.map((row,i)=>{const m=typeof row==='string'?{side:'me',text:row}:row;if(m.date)return m;const stamp=m.timestamp||anchor-(rows.length-1-i);return {...m,date:new Date(stamp).toLocaleDateString('sv-SE',{timeZone:'America/New_York'}),time:m.time||new Date(stamp).toLocaleTimeString('en-GB',{timeZone:'America/New_York',hour:'2-digit',minute:'2-digit'}),timestamp:stamp}})}R.chatTimestampRevision=1}
function chatStamp(id){return kakaoRows(id).reduce((latest,m)=>m.divider?latest:Math.max(latest,kakaoRowStamp(m)),0)}
const unorderedThreadIds=kakaoThreadIds;
kakaoThreadIds=function(){const pins=['suhwan','family'];return unorderedThreadIds().sort((a,b)=>{const ai=pins.indexOf(a),bi=pins.indexOf(b);if(ai>=0||bi>=0)return (ai<0?99:ai)-(bi<0?99:bi);return chatStamp(b)-chatStamp(a)||a.localeCompare(b)})};
if(!R.chatListRevision){for(const [id,unread] of [['friend',2],['work',1],['friends',3],['parcel',1],['doran',1]])R.chatMeta[id]={...(R.chatMeta[id]||{}),unread};R.chatListRevision=1}
kakaoUnreadCount=function(id){const count=key=>Math.max(R.chatMeta[key]?.unread||0,(data.notifications||[]).filter(n=>n.app==='kakaotalk'&&n.contact===key).length);return id?count(id):kakaoThreadIds().reduce((n,key)=>n+count(key),0)};
const previousMarkRead=markConversationRead;
markConversationRead=function(app,id){previousMarkRead(app,id);if(app==='kakaotalk'){R.chatMeta[id]??={};R.chatMeta[id].unread=0;romanceSave()}};
function chatListTime(id){const stamp=chatStamp(id);if(!stamp)return '';const date=new Date(stamp),key=date.toLocaleDateString('sv-SE',{timeZone:'America/New_York'}),today=dateKey();if(key===today)return date.toLocaleTimeString('ko-KR',{hour:'numeric',minute:'2-digit',timeZone:'America/New_York'});const yesterday=new Date(phoneInstant(today,'12:00')-86400000).toLocaleDateString('sv-SE',{timeZone:'America/New_York'});return key===yesterday?'어제':key.slice(5).replace('-','. ')}
const pinSvg='<svg class="kk-pinned" viewBox="0 0 16 16" aria-label="상단 고정"><path d="m6 1 7 7-2 1-3-1-4 4-1-1 4-4-1-3Z" fill="currentColor"/><path d="m4 12-3 3" stroke="currentColor"/></svg>';
kakaoChatList=function(ids){if(state.kkCalls)return '<p class="system-empty">통화 내역이 없습니다.</p>';const visible=ids.filter(id=>!state.kkUnread||kakaoUnreadCount(id));if(!visible.length)return '<p class="system-empty">안 읽은 메시지가 없습니다.</p>';return '<div class="kk-ad-strip"><small>AD</small><b>오늘의 쇼핑 혜택</b><span>›</span><button data-kakao-chat="olive" aria-label="채널 보기"></button></div>'+visible.map(id=>{const c=kakaoContact(id),rows=kakaoRows(id),last=rows.filter(m=>!m.divider).at(-1),count=kakaoUnreadCount(id);if(!last)return '';return `<button class="kk-chat-row" data-kakao-chat="${id}" data-kakao-name="${esc((c.name+' '+rows.map(m=>m.text||'사진').join(' ')).toLowerCase())}">${kakaoAvatar(c)}<div><b>${esc(c.name)}${c.kind==='group'?` <em>${c.members.length}</em>`:''}${['suhwan','family'].includes(id)?pinSvg:''}</b><p>${esc(last.src?'사진':last.text)}</p></div><aside><time>${esc(chatListTime(id))}</time>${count?`<i>${count}</i>`:''}</aside></button>`}).join('')||(state.kkUnread?'<p class="system-empty">안 읽은 메시지가 없습니다.</p>':'')};
const timestampRomanceAdd=romanceAdd;romanceAdd=function(side,text,extra={}){timestampRomanceAdd(side,text,{timestamp:Date.now(),...extra});if(side==='them'&&(state.locked||state.app!=='kakaotalk'||state.kakaoChat!=='suhwan')){R.chatMeta.suhwan??={};R.chatMeta.suhwan.unread=(R.chatMeta.suhwan.unread||0)+1}romanceSave()};
// Attach send timestamps in a capture listener before the ordinary composer handler executes.
const chatOrderRender=render;
render=function(){chatOrderRender();document.querySelector('#kakaoComposer')?.addEventListener('submit',()=>{const id=state.kakaoChat;if(id==='suhwan')return;R.chatMeta[id]??={};R.chatMeta[id].lastSent=Date.now();romanceSave()},true)};
// lastSent also orders a newly sent local message whose legacy handler stores only HH:mm.
const sourceChatStamp=chatStamp;chatStamp=function(id){return Math.max(sourceChatStamp(id),R.chatMeta[id]?.lastSent||0)};
romanceSave();render();
