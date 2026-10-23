window.phoneBooting=true;
/* These are local simulator forms; none should navigate/reload the document. */
document.addEventListener('submit',event=>{if(event.target?.closest('.phone'))event.preventDefault()},true);
const phoneSessionKey='young-oner-view-v1';
let phoneSavedSession=null;
try{phoneSavedSession=JSON.parse(sessionStorage.getItem(phoneSessionKey)||'null')}catch{}
