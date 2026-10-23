const YOUNG_ONER_ADDED_PHOTOS=[{"id":"provided-20261023-oner-red-selfie","src":"assets/oner-red-selfie.jpg","title":"현준이 셀카","album":"boyfriend","shared":true,"caption":"천장 반 얼굴 반ㅋㅋ"},{"id":"provided-20261023-oner-white-cap","src":"assets/oner-white-cap.jpg","title":"모자 쓴 현준이","album":"boyfriend","shared":true,"caption":"야 폰 그만 보고 앞에 봐ㅋㅋ"},{"id":"provided-20261023-oner-snack","src":"assets/oner-snack.jpg","title":"간식 먹는 현준이","album":"boyfriend","shared":true,"caption":"먹을 때도 찍히는 사람"},{"id":"provided-20261023-oner-forest-selfie","src":"assets/oner-forest-selfie.jpg","title":"나무 아래 셀카","album":"boyfriend","shared":true,"caption":"각도 좀 봐ㅋㅋ"},{"id":"provided-20261023-oner-training","src":"assets/oner-training.jpg","title":"운동하는 현준이","album":"boyfriend","shared":true,"caption":"이 사진은 저장해야 됨"},{"id":"provided-20261023-young-blurry-selfie","src":"assets/young-blurry-selfie.jpg","title":"영이 셀카","album":"young","shared":true,"caption":"말하다가 찍힘ㅋㅋ"},{"id":"provided-20261023-young-beanie","src":"assets/young-beanie.jpg","title":"비니 쓴 영이","album":"young","shared":true,"caption":"브이부터 하고 보는 편"},{"id":"provided-20261023-young-rainy-street","src":"assets/young-rainy-street.jpg","title":"비 오는 거리","album":"young","shared":true,"caption":"비 오는 날도 기록"},{"id":"provided-20261023-young-cheek-selfie","src":"assets/young-cheek-selfie.jpg","title":"볼 빵빵 영이","album":"young","shared":true,"caption":"왜 ㅡㅡ 하고 보낼 사진ㅋㅋ"}];
function applyYoungOnerPhotos(){
 if(R.providedPhotos20261023)return;
 const incoming=YOUNG_ONER_ADDED_PHOTOS.map(p=>({...p}));
 const seen=new Set((data.photoAlbums||[]).map(p=>p.src));
 data.photoAlbums=[...incoming.filter(p=>!seen.has(p.src)),...(data.photoAlbums||[])];
 R.ownAlbums=data.photoAlbums;
 const account=R.socialAccounts.instagram.accounts.couple;
 account.items??=[];R.between.stories??=[];
 for(const p of incoming){
  if(!account.items.some(x=>x.id===p.id||(x.images||[x.src]).includes(p.src)))account.items.unshift({id:p.id,src:p.src,images:[p.src],caption:p.caption,date:today(),likes:0});
  if(!R.between.stories.some(x=>x.id===p.id))R.between.stories.unshift({id:p.id,date:dateKey(),title:p.title,src:p.src,comments:[]});
 }
 R.providedPhotos20261023=1;romanceSave();
}
applyYoungOnerPhotos();render();
