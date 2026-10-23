/* This phone does not use Between. Leave other apps and their records untouched. */
const homeWithBetween=homeScreenApps;
homeScreenApps=function(){return homeWithBetween().filter(app=>app&&app[0]!=='between')};
for(let i=icons.length-1;i>=0;i--)if(icons[i]?.[0]==='between')icons.splice(i,1);
for(const group of libraryGroups)if(Array.isArray(group[1]))group[1]=group[1].filter(id=>id!=='between');
if(state.app==='between'){state.app=null;state.sub=null}
const appWithBetween=appView;
appView=function(){if(state.app==='between'){state.app=null;state.sub=null}return appWithBetween()};
render();
