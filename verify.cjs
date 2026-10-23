const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const node={innerHTML:'',textContent:'',style:{setProperty(){}},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false}},addEventListener(){},setAttribute(){},querySelector(){return null},querySelectorAll(){return []},getBoundingClientRect(){return {top:0,bottom:0}},insertAdjacentHTML(){},appendChild(){},remove(){},focus(){}};
const store={};let c={console,Date,Intl,URL,Blob,Map,Set,Math,JSON,setTimeout:()=>0,clearTimeout(){},setInterval:()=>0,clearInterval(){},requestAnimationFrame(){},__render(){},location:{href:'http://localhost/',search:'',hash:''},navigator:{},localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v},document:{getElementById:()=>node,querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({...node}),addEventListener(){},documentElement:node,body:node},confirm:()=>false,matchMedia:()=>({matches:false,addEventListener(){}})};c.window=c;c.window.addEventListener=()=>{};c.window.innerWidth=400;for(const k of ['exportBtn','importInput','pageTitle','phoneMount','editor','scrim','lockQuote','riotId','discordName','customNote','wallColor','wallImage','removeImage','saveEditor','editBtn','closeEditor'])c[k]={...node};vm.createContext(c);
const files=[...fs.readFileSync('dist/index.html','utf8').matchAll(/<script(?: defer)? src="([^"?]+)/g)].map(m=>m[1]);
for(const name of files){console.log('LOAD',name);let code=fs.readFileSync('dist/'+name,'utf8').replace(/(?<!function )\brender\(\)/g,'__render()');try{vm.runInContext(code,c,{filename:name,timeout:4000})}catch(e){console.error('LOAD FAILED',name,e.stack);process.exit(1)}}
const ev=code=>vm.runInContext(code,c,{timeout:4000});
assert.equal(ev('data.name'),'영');assert.equal(ev('storageKey'),'young-oner-us-v1');
assert.equal(ev("phoneParts(new Date('2026-10-20T07:00:00Z')).hour"),'03');
assert.equal(ev("phoneParts(new Date('2026-10-20T07:00:00Z'),'Asia/Seoul').hour"),'16');
assert.equal(ev("phoneInstant('2026-10-20','03:00')"),Date.parse('2026-10-20T07:00:00Z'));
assert.equal(ev("phoneInstant('2026-12-20','03:00')"),Date.parse('2026-12-20T08:00:00Z'));
assert.equal(ev("kakaoRowStamp({date:'2026-12-20',time:'03:00'})"),Date.parse('2026-12-20T08:00:00Z'));
ev('R.dialog={};R.youngMemory=null');assert.equal(ev("youngReply('왜 ㅡㅡ').join(' ')"),'그냥ㅋㅋ');
ev('R.dialog={};R.youngMemory=null');assert(ev("youngReply('문현준').join(' ')").includes('응 영아'));
ev('R.dialog={};R.youngMemory=null');assert(!ev("youngReply('오늘 너무 힘들어').join(' ')").includes('ㅋㅋ'));
ev('R.dialog={};R.youngMemory=null');assert(ev("youngReply('증바람 딜량 내기 하자').join(' ')").includes('커피'));
ev("youngReply('설거지빵으로 하자')");assert.equal(ev('R.youngBet.stake'),'설거지');
assert(ev("youngReply('협곡 가자').join(' ')").includes('안 감'));
assert(ev("youngReply('너만 알림 켜놔서 깼어').join(' ')").includes('미안'));
for(const q of ['야','왜ㅡㅡ','오빠ㅎㅎ','문현준','보고 싶어','힘들어','증바람','아레나','잘 자','수업 끝남','너 힘들어?']){ev('R.dialog={};R.youngMemory=null');assert(!/누나|지우|수환|영야/.test(ev(`youngReply(${JSON.stringify(q)}).join(' ')`)))}
assert(!ev("JSON.stringify(LIFE.histories.suhwan)").replaceAll("늘 누나", "늘").match(/누나|출근|퇴근/));
ev("socialSwitch('instagram','couple')");assert.equal(ev("socialCurrent('instagram').handle"),'On0');ev("socialSwitch('instagram','personal')");assert.equal(ev("socialCurrent('instagram').handle"),'young');
// Render each app function to a string; this is not a browser layout or interaction check.
for(const [app,fn] of Object.entries({kakaotalk:'kakaotalkApp',clock:'clockApp',notes:'notes',calendar:'calendar',photos:'photos',instagram:'instagram',xapp:'xProfileScreen',between:'betweenApp',telephone:'phoneApp',chatgpt:'gptApp',safari:'safariApp',riot:'riot',discord:'discord'})){
 ev(`state.app=${JSON.stringify(app)};state.kakaoChat=null;state.sub=null;`);try{assert.equal(typeof ev(fn+'()'),'string')}catch(e){console.error('VIEW FAILED',app,e.stack);process.exit(1)}}
console.log('All loaded scripts, US Eastern clock/DST, timestamp ordering, persona, dialogue, account isolation and app template checks passed.');
// Validate every literal local asset reference and all scripts/styles.
for(const name of files){const txt=fs.readFileSync('dist/'+name,'utf8');for(const m of txt.matchAll(/["'`](assets\/[\w.-]+\.(?:png|jpg|jpeg|webp|svg))["'`]/g))assert(fs.existsSync('dist/'+m[1]),name+': '+m[1])}
console.log('All literal local asset paths exist.');
function resetMemory(){ev('R.youngMemory=null;R.dialog={}');}
const fixed="new Date('2026-10-22T15:30:00Z')"; // Korea 00:30 / New York 11:30.
const reply=t=>ev(`youngReply(${JSON.stringify(t)},${fixed}).join(' ')`);
resetMemory();assert(reply('증바람 딜량 내기 하자').includes('커피'));
reply('설거지빵으로 하자');assert.equal(ev('R.youngMemory.bet.stake'),'설거지');
assert(reply('내가 이겼어').includes('설거지 내가 해'));assert.equal(ev('R.youngMemory.dishes.young'),1);
reply('내가 이겼어');assert.equal(ev('R.youngMemory.dishes.young'),1,'Same round must not be credited twice');
reply('한 판 더');reply('내가 졌어');assert.equal(ev('R.youngMemory.dishes.oner'),1);
assert(reply('오빠ㅎㅎ').includes('내기')||ev('R.youngMemory.topic')==='bet');
resetMemory();assert(!reply('오늘 과제 때문에 너무 힘들어').includes('ㅋㅋ'));
assert(!reply('오빠').includes('ㅋㅋ'));assert(!reply('응').includes('ㅋㅋ'));
reply('이제 괜찮아졌어');assert.equal(ev('R.youngMemory.mood'),'normal');
resetMemory();reply('문현준');assert(!reply('답장 기다렸잖아').includes('ㅋㅋ'));
resetMemory();reply('오늘 힘들어');assert.equal(ev('R.youngMemory.pending'),'call-offer');
reply('응');assert.equal(ev('R.youngMemory.topic'),'call');
resetMemory();reply('너만 알림 켜놔서 깼어');assert(reply('이미 깼으니까 조금만 얘기해').includes('조금'));
resetMemory();const pokes=Array.from({length:12},()=>reply('야'));assert.equal(new Set(pokes).size,12,'Do not loop three greetings');
resetMemory();const doings=Array.from({length:8},()=>reply('뭐해'));assert.equal(new Set(doings).size,8,'Do not loop three activity replies');
assert(doings.every(x=>!x.includes('연습 중')),'Same clock context must not jump to a different practice phase');
resetMemory();assert(ev("youngReply('뭐해',new Date('2026-10-22T06:00:00Z')).join(' ')").includes('연습'));
const dayTexts=ev("Object.values(LIFE.histories.suhwan.filter(x=>!x.divider).reduce((a,x)=>{(a[x.date]??=[]).push(x.side+':'+x.text);return a},{})).map(a=>a.join('|'))");
assert.equal(new Set(dayTexts).size,dayTexts.length,'No repeated full-day transcript');
const clockTimes=ev("new Set(LIFE.histories.suhwan.filter(x=>!x.divider).map(x=>x.time)).size");assert(clockTimes>100,'Authored historical conversations must span varied clock times');
const before=ev("JSON.stringify(data.kakaoLocal||{})");reply('야');assert.equal(ev("JSON.stringify(data.kakaoLocal||{})"),before,'Reply selection must not erase or rewrite sent history');
console.log('Passed wager continuity and idempotence, quiet emotional follow-ups, call acceptance, time consistency, nonrepeating greetings, varied historical days/times and local-history preservation.');
ev('R.roomMemory={}');
let row=ev("localReplyFor('kakaotalk','family','엄마 밥 먹었어?')");assert.equal(row.speaker,'엄마');assert(row.text.includes('먹었')||row.text.includes('먹고')||row.text.includes('밥'));
row=ev("localReplyFor('kakaotalk','family','나 파스타 먹었어')");assert(row.text.includes('파스타'));
row=ev("localReplyFor('kakaotalk','family','아빠 뭐해')");assert.equal(row.speaker,'아빠');assert(!row.text.includes('엄마'));
ev("localReplyFor('kakaotalk','family','나 이제 잘게')");assert.equal(ev("localReplyFor('kakaotalk','family','응')"),null);
ev('R.roomMemory={}');const familyReplies=Array.from({length:8},(_,i)=>ev(`localReplyFor('kakaotalk','family',${JSON.stringify('오늘 있었던 일 얘기해 줄게')}).text`));assert.equal(new Set(familyReplies).size,8);
assert(!familyReplies.some(x=>/동생|형|집에오면밥/.test(x)));
ev("localReplyFor('kakaotalk','friend','나 발표 끝났어')");assert.equal(ev("R.roomMemory['kakaotalk:friend'].topic"),'school');
assert.equal(ev("R.roomMemory['kakaotalk:family'].topic"),'day','Room topics must not leak');
assert(!ev('nativeWidgets()').includes('시차'));
assert(ev("kakaoAvatar({id:'suhwan',name:'문현준'})").includes('oner-red-selfie.jpg'));
console.log('Family speaker/food continuity, closing without forced replies, varied replies, per-room state, removed home widgets and casual Kakao portrait passed.');

// Uploaded photos and a repeatable upgrade preserve the user's own history.
assert.equal(ev("YOUNG_ONER_ADDED_PHOTOS.length"),9);
assert(ev("YOUNG_ONER_ADDED_PHOTOS.every(p=>data.photoAlbums.some(a=>a.src===p.src))"));
assert(!ev("JSON.stringify(data.photoAlbums)").includes('.svg'));
assert(!ev("JSON.stringify(R.between.stories)").includes('.svg'));
assert(ev("Object.values(R.socialAccounts.instagram.accounts).every(a=>a.items.every(p=>!(p.images||[p.src]).some(s=>s.endsWith('.svg'))))"));
const photoCount=ev('data.photoAlbums.length');ev('applyYoungOnerPhotos();removeDecorativePhotos()');assert.equal(ev('data.photoAlbums.length'),photoCount);
assert(ev("LIFE.contacts.some(c=>c.id==='jiwoo_friend'&&c.name==='늘')"));
assert(ev("LIFE.rooms.doublecouple.members.includes('김수환')"));
assert(ev("localReplyFor('kakaotalk','jiwoo_friend','수환이 뭐해').text").includes('수환'));
resetMemory();const varied=Array.from({length:30},()=>reply('뭐해')).filter(Boolean);assert.equal(new Set(varied).size,varied.length,'Exhausted banks must not cycle old replies');
ev('R.roomMemory={}');const family30=Array.from({length:30},()=>ev("localReplyFor('kakaotalk','family','오늘 있었던 일 얘기해 줄게')")).filter(Boolean).map(x=>x.text);assert.equal(new Set(family30).size,family30.length);
for(const room of ev('Object.keys(LIFE.histories)')){const texts=ev(`LIFE.histories[${JSON.stringify(room)}].filter(x=>!x.divider).map(x=>x.text.replace(/\s/g,'' )).filter(x=>x.length>=12)`);assert.equal(new Set(texts).size,texts.length,room+': repeated substantial default line')}
assert(ev("ONER_MEMORIES.every(x=>x.url.startsWith('https://'))"));
console.log('Photo cleanup, nine real additions, idempotence, friend/couple identity and extended no-cycle checks passed.');

assert.equal(ev("igStoryMedia('oner')"),'assets/oner-snack.jpg');
assert.equal(ev("igStoryMedia('seoyeon')"),'');assert.equal(ev("igStoryMedia('sora')"),'');
const dcTexts=ev("Object.values(DISCORD_AUTHORED_SEEDS).flat().map(r=>r[1])");assert.equal(new Set(dcTexts).size,dcTexts.length,'Discord defaults must differ by person');
const dark=fs.readFileSync('dist/discord-dark.css','utf8');assert(dark.includes('.native-scroll.discord-chat'));assert(dark.includes('color:#f2f3f5!important'));
console.log('Distinct Discord defaults, explicit dark chat styles and real story media passed.');
assert(ev("LIFE.contacts.some(c=>c.id==='maya') && LIFE.contacts.some(c=>c.id==='alex')"));
assert(ev("LIFE.histories.maya.some(m=>m.text.includes('slides'))"));
assert(ev("LIFE.histories.alex.some(m=>m.text.includes('hockey'))"));
assert(ev("localReplyFor('messages','maya','I need help with my assignment').text").includes('rubric'));
assert(ev("peerReply('alex','hockey tickets?').text").includes('offside'));
assert(ev("youngReply('농구 직관 갈 거야').join(' ')").includes('과제'));
assert(ev("data.notes.some(n=>n.id==='campus-readings')"));
assert(ev("data.schedule.some(e=>e.title.includes('발표 리허설'))"));
console.log('English classmates, coursework, sports conversations and campus notes/calendar passed.');

assert(!ev("homeScreenApps().some(a=>a[0]==='between')"));
assert(!ev("icons.some(a=>a[0]==='between')"));
assert(!ev("libraryGroups.some(g=>Array.isArray(g[1])&&g[1].includes('between'))"));
console.log('Between removed from home, app icons and app library.');

ev("state.app='safari';state.safariTabs=false;extras.safariFolder=null;safariPanel=null");
assert(!/롯데|사직|우유 없는|퇴근 후|GIANTS/.test(ev('safariApp()')));
assert(ev('safariApp()').includes('hockey icing'));
ev('state.safariTabs=true');assert(!/롯데|사직|GIANTS/.test(ev('safariApp()')));assert(ev('safariApp()').includes('NHL'));
assert(ev("safariSavedRows('NHL').some(r=>r.url==='https://www.nhl.com/')"));
console.log('Safari start page, tabs and saved searches use Young university/sports context.');
ev("R.youngSafariRevision=0;R.browserTabs=[{title:'롯데자이언츠',url:'https://www.giantsclub.com/'},{title:'My class document',url:'https://docs.google.com/document/d/my-own-notes'}];R.closedTabs=[{title:'사직야구장 가는 길',url:'https://example.com/old'}]");
vm.runInContext(fs.readFileSync('dist/young-safari.js','utf8').replace(/(?<!function )\brender\(\)/g,'__render()'),c);
assert.equal(ev('R.browserTabs.length'),1);assert.equal(ev('R.browserTabs[0].title'),'My class document');assert.equal(ev('R.closedTabs.length'),0);
console.log('Existing Safari defaults migrate without deleting a custom class tab.');
// Audit rendered app entry screens plus account-specific and editing variants.
const decorativeMedia=/assets\/(?:campus|coffee|night(?:-clean)?|together|oner-avatar|young-avatar|jiu-wallpaper)\.svg/;
for(const id of ev('icons.map(a=>a[0])')){
 ev(`state.app=${JSON.stringify(id)};state.sub=null;state.xPeer=false;state.xEditing=false;state.safariTabs=false;extras.safariFolder=null;igLocal.story='';igPanel=null`);
 assert(!decorativeMedia.test(ev('appView()')),id+': decorative photo in rendered app');
}
for(const id of ['personal','couple']){
 ev(`state.app='xapp';state.xPeer=false;socialSwitch('x',${JSON.stringify(id)})`);
 assert(!decorativeMedia.test(ev('xProfileScreen()')));assert(ev('profileAvatar()').includes(ev("socialCurrent('x').avatar")));
 ev('state.xEditDraft=null');assert(!decorativeMedia.test(ev('xProfileEditor()')));assert(!ev('xProfileEditor()').includes('2001-12-05'));
 assert(!decorativeMedia.test(ev('socialXDrawer()')));assert(!decorativeMedia.test(ev("socialSwitcher('x')")));
 ev(`state.app='instagram';socialSwitch('instagram',${JSON.stringify(id)})`);assert(!decorativeMedia.test(ev('socialIgProfile()')));
}
ev("state.app='xapp';state.xPeer=true");assert(ev('profileAvatar()').includes('oner-white-cap.jpg'));
ev("state.app='kakaotalk';state.xPeer=false");assert(ev("kakaoAvatar({id:'self',name:'영'})").includes('young-cheek-selfie.jpg'));
assert.equal(ev('data.xProfile.birthday'),'');assert(!ev('data.interview').includes('peyz'));
assert(ev("YOUNG_ONER_ADDED_PHOTOS.every(p=>data.photoAlbums.some(x=>x.src===p.src))"));
console.log('AUDIT PASSED: all app entry screens, both X/Instagram accounts, X drawer/editor, own/partner avatars, birthday, interview and all nine uploads.');

assert.equal(ev("R.socialAccounts.instagram.accounts.couple.name"),'오n영');
assert.equal(ev("R.socialAccounts.instagram.accounts.couple.handle"),'On0');

assert.equal(ev("LIFE.contacts.find(c=>c.id==='jiwoo_friend').nickname"),'늘');
assert.equal(ev("LIFE.contacts.find(c=>c.id==='jiwoo_friend').olderThanYoung"),true);
assert.equal(ev("SOCIAL_PEERS.find(c=>c.id==='jiwoo_friend').nick"),'늘');
assert(ev("LIFE.histories.jiwoo_friend.some(m=>m.text?.includes('늘아'))"));
assert(ev("JSON.stringify(LIFE.histories).includes('솬늘')"));
assert.equal(ev("neulNameText('지우야 지우랑 가고 지우기 버튼은 그대로')"),'늘아 늘이랑 가고 지우기 버튼은 그대로');
assert(ev("ONER_POP_RECORDS.filter(m=>m.quote).length>=6"));
assert(ev("popRows().some(m=>m.text==='신라면이지')"));
assert(ev("popRows().some(m=>m.text==='웃었으면 만족')"));
assert.equal(ev('data.popWallpaper'),'assets/oner-pop-moon-restored.png');
assert(ev("userFields.includes('popWallpaper')"));
console.log('Nickname/age/couple alias, supplied POP replies and persisted POP wallpaper passed.');

const couplePhotos=ev('R.socialAccounts.instagram.accounts.couple.items.map(p=>JSON.stringify(p.images))');assert.equal(new Set(couplePhotos).size,couplePhotos.length);
ev(`R.socialAccounts.instagram.accounts.couple.items.push({id:'duplicate-regression',images:['assets/oner-red-selfie.jpg'],caption:'duplicate'});R.socialAccounts.instagram.accounts.couple.state.saved['own:duplicate-regression']=true;deduplicateCoupleInstagramPhotos()`);
assert.equal(ev("R.socialAccounts.instagram.accounts.couple.items.filter(p=>p.images.includes('assets/oner-red-selfie.jpg')).length"),1);
assert(ev("R.socialAccounts.instagram.accounts.couple.state.saved['own:'+R.socialAccounts.instagram.accounts.couple.items.find(p=>p.images.includes('assets/oner-red-selfie.jpg')).id]"));
const afterDedupe=ev('JSON.stringify(R.socialAccounts.instagram.accounts.couple.items)');ev('deduplicateCoupleInstagramPhotos();removeDecorativePhotos()');assert.equal(ev('JSON.stringify(R.socialAccounts.instagram.accounts.couple.items)'),afterDedupe);
console.log('Shared Instagram photos are unique; saved old duplicates migrate without losing saved status.');

assert.equal(ev('data.spotifyPlaylist'),'37i9dQZF1DX5JSmsKlXzUQ');assert.equal(ev('data.songs.length'),31);assert.equal(ev('data.favoriteTrack.title'),'거북이');assert(ev('data.songs.every(t=>t.id&&t.artist&&t.duration>0)'));
assert.equal(ev('R.youngPreferences.favoriteChampion'),'사미라');ev('R.youngMemory=null');assert(ev("youngReply('사미라 떴다').join(' ')").includes('최애'));
ev("R.youngMemory=null");assert(!ev("youngReply('생일 언제야').join(' ')").includes('우리'));
ev("R.birthdayRegression={title:'우리 생일 🎂',date:'2026-12-05',detail:'영 + 현준 · 초는 같이 불기'};cleanYoungBirthday(R.birthdayRegression)");assert.equal(ev('R.birthdayRegression.date'),'2026-12-24');assert.equal(ev('R.birthdayRegression.title'),'현준이 생일 🎂');ev('delete R.birthdayRegression');
assert.equal(ev('data.birthday'),'');assert(!ev('R.flags.sharedBirthday'));console.log('Oner Spotify source/31 tracks, Young Samira preference and unknown Young birthday passed.');
