// Collapse identical photo posts on the shared account, including saved older defaults.
function deduplicateCoupleInstagramPhotos(){
 const a=R.socialAccounts?.instagram?.accounts?.couple;if(!a)return;
 const original=a.items||[],seen=new Map(),items=[],targets=[];
 for(const post of original){
  const photos=(post.images?.length?post.images:[post.src]).filter(Boolean);
  const key=JSON.stringify(photos.map(src=>src.startsWith('assets/')||src.startsWith('./assets/')?src.replace(/^\.\//,'').split(/[?#]/)[0]:src));
  if(!photos.length){targets.push(items.length);items.push(post);continue}
  if(seen.has(key)){targets.push(seen.get(key));continue}
  const next=items.length;seen.set(key,next);targets.push(next);items.push(post);
 }
 if(items.length===original.length)return;
 a.state??={};
 for(const field of ['likes','saved','comments']){
  const before=a.state[field]||{},after={};
  for(const [key,value] of Object.entries(before)){
   let target=key;
   if(/^\d+$/.test(key)&&original[Number(key)])target=String(targets[Number(key)]);
   else if(key.startsWith('own:')){const i=original.findIndex(p=>'own:'+p.id===key);if(i>=0)target='own:'+items[targets[i]].id}
   if(field==='comments'&&Array.isArray(value))after[target]=[...(after[target]||[]),...value];
   else after[target]=after[target]||value;
  }
  a.state[field]=after;
 }
 a.items=items;
}
/* Decorative SVGs are never photographs. Preserve actual uploads and local JPEGs. */
function removeDecorativePhotos(){
 const fake=src=>typeof src==='string'&&(/\.svg(?:[?#]|$)/i.test(src)||/^data:image\/svg/i.test(src));
 data.petImage='assets/young-rainy-street.jpg';data.petTitle='비 오는 거리';data.petText='';
 data.explorePosts=(data.explorePosts||[]).filter(p=>{const images=p.images||[p.src];return images.length&&images.every(src=>src&&!fake(src))});
 for(const m of data.popHistory||[])if(fake(m.media))delete m.media;
 for(const store of [data.kakaoLocal,data.discordLocal])for(const rows of Object.values(store||{}))if(Array.isArray(rows))for(const m of rows){if(fake(m.src))delete m.src;if(fake(m.media))delete m.media}
 data.photoAlbums=(data.photoAlbums||[]).filter(p=>!fake(p.src));
 data.userPhotos=(data.userPhotos||[]).filter(p=>!fake(p.src));
 R.ownAlbums=data.photoAlbums;
 if(Array.isArray(data.photos))data.photos=data.photos.filter(p=>!fake(typeof p==='string'?p:p.src));
 for(const a of Object.values(R.socialAccounts?.instagram?.accounts||{})){
  a.stories=(a.stories||[]).filter(p=>!fake(p.media)&&!fake(p.src));
  for(const rows of Object.values(a.messages||{}))if(Array.isArray(rows))for(const m of rows)if(fake(m.media))delete m.media;
  const old=a.items||[],kept=[];
  old.forEach((post,i)=>{const images=(post.images||[post.src]).filter(s=>s&&!fake(s));if(images.length)kept.push({post:{...post,images,src:images[0]},old:i})});
  if(kept.length!==old.length&&a.state){
   for(const key of ['likes','saved','comments']){const prior=a.state[key]||{},next={};kept.forEach(({old:idx},i)=>{if(Object.hasOwn(prior,idx))next[i]=prior[idx];if(Object.hasOwn(prior,'own:'+old[idx].id))next['own:'+old[idx].id]=prior['own:'+old[idx].id]});a.state[key]=next}
  }
  a.items=kept.map(x=>x.post);
 }
 if(R.between){R.between.stories=(R.between.stories||[]).filter(p=>!fake(p.src));if(fake(R.between.home))R.between.home='assets/oner-forest-selfie.jpg'}
 if(!R.decorativeRemovedRevision){
  if(!data.wallImage||data.wallImage.startsWith('assets/night')){data.wallImage='';data.wall='#293a50'}
  R.decorativeRemovedRevision=1;
 }
 for(const platform of ['instagram','x'])for(const [id,a] of Object.entries(R.socialAccounts?.[platform]?.accounts||{})){if(fake(a.banner))a.banner='';if(fake(a.avatar))a.avatar=id==='personal'?'assets/young-cheek-selfie.jpg':'assets/oner-forest-selfie.jpg';}
 if(fake(igLocal.story)){igLocal.story='';igStoryAccount=''}
 deduplicateCoupleInstagramPhotos();
 socialIgApply();socialXApply();romanceSave();
}
removeDecorativePhotos();render();
