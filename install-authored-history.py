from pathlib import Path
import datetime as dt,json,zoneinfo,collections,re
root=Path(__file__).resolve().parents[1];p=root/'dist/jiu-life-data.js';s=p.read_text();life=json.loads(s[s.index('{'):s.rindex('}')+1])
life['histories']={k:[] for k in life['histories']};room=None;counter=0
for raw in (root/'authoring/young-authored-chats.txt').read_text().splitlines():
 line=raw.strip()
 if not line:continue
 if line.startswith('@'):
  room,date,time=line[1:].split('|');base=dt.datetime.fromisoformat(date+'T'+time).replace(tzinfo=zoneinfo.ZoneInfo('America/New_York'));counter=0
  life['histories'].setdefault(room,[]);continue
 if line.startswith('<'):side='me';text=line[1:].strip();speaker=None
 else:
  who,text=line.split('>',1);side='them';speaker=who or None
 at=base+dt.timedelta(minutes=counter);counter+=1
 row={'side':side,'text':text.strip(),'date':at.date().isoformat(),'time':at.strftime('%H:%M'),'timestamp':int(at.timestamp()*1000),'seedId':room+'-'+date+'-'+str(counter),'origin':'authored-v3'}
 if speaker:row['speaker']=speaker
 life['histories'][room].append(row)
# A true friend, not a renamed generic classmate.
for c in [{'id':'jiwoo_friend','name':'늘','realName':'지우','nickname':'늘','olderThanYoung':True,'number':'010-0000-1023'},{'id':'peyz_friend','name':'김수환','number':'010-0000-1224'}]:
 existing=next((x for x in life['contacts'] if x['id']==c['id']),None)
 if existing:existing.update(c)
 else:life['contacts'].append(c)
life['rooms']['doublecouple']={'id':'doublecouple','name':'넷이 밥부터','kind':'group','members':['영','문현준','늘','김수환']}
for key,rows in life['histories'].items():
 rows.sort(key=lambda m:m['timestamp']);out=[];date=''
 for m in rows:
  if m['date']!=date:
   date=m['date'];d=dt.date.fromisoformat(date);out.append({'divider':True,'date':date,'text':f'{d.year}년 {d.month}월 {d.day}일'})
  out.append(m)
 life['histories'][key]=out
p.write_text('window.JIU_LIFE='+json.dumps(life,ensure_ascii=False,separators=(',',':'))+';')
# Meaningful dialogue windows, not only entire-day uniqueness.
for key,rows in life['histories'].items():
 messages=[m['text'] for m in rows if not m.get('divider') and len(re.sub(r'\s','',m['text']))>=12]
 dup={x:n for x,n in collections.Counter(messages).items() if n>1}
 print(key,len(rows),'repeated meaningful lines',dup)
 assert not dup,(key,dup)
print('Replaced loop-generated default histories with individually authored scenes. Browser-local conversations are not modified.')
