"""Authored daily situations with monthly progress; timestamps are US Eastern instants."""
import datetime as dt, json, random, zoneinfo
from pathlib import Path
P=Path(__file__).resolve().parents[1]/'dist/jiu-life-data.js'
s=P.read_text();life=json.loads(s[s.index('{'):s.rindex('}')+1]);rng=random.Random(1224)
start=dt.date(2024,10,5);end=dt.datetime.now(zoneinfo.ZoneInfo('America/New_York')).date()-dt.timedelta(days=1)
projects=[('읽기 자료 정리','자료에 표시한 부분','읽은 내용'),('조별 발표','발표 도입 부분','발표 순서'),('에세이 초안','첫 문단','문장 흐름'),('수업 노트 정리','빠뜨린 필기','지난 수업 내용'),('도서관 자료 찾기','찾아 둔 자료','자료 목록'),('발표 연습','발음 자꾸 꼬이는 문장','발표 속도'),('기말 준비','헷갈리는 부분','복습할 내용'),('새 학기 준비','시간표','수업 동선'),('에세이 수정','지적받은 부분','문단 순서'),('조별 과제','내가 맡은 부분','자료 출처'),('리딩 요약','중요한 문단','읽기 자료'),('중간 발표','마지막 슬라이드','질문 대비'),('수업 과제','비교하는 부분','제출 형식'),('자료 조사','표시해 둔 자료','참고 목록'),('발표 자료','그림 넣은 부분','발표 구성'),('학기 정리','밀린 필기','과목별 노트'),('새 수업 적응','첫 과제','강의실 위치'),('에세이 마무리','결론 부분','제출할 파일'),('읽기 과제','요약해 둔 부분','토론할 내용'),('조별 발표 준비','서로 겹치는 내용','질문 목록'),('시험 복습','틀리기 쉬운 부분','오답 노트'),('노트 정리','지난번 빠뜨린 부분','필기 순서'),('팀 발표','각자 맡은 슬라이드','발표 시간'),('학기 과제','수정해 둔 부분','마지막 확인'),('발표 정리','질문받았던 부분','다음 과제')]
# Every monthly arc advances: plan -> work -> problem -> repair -> submit -> rest.
weekday=['월','화','수','목','금','토','일']
scenes_seen=set();day_signatures=set();hist={k:[] for k in life['histories']}
def add(id,date,time,lines,speaker=None):
 rows=hist[id];rows.append({'divider':True,'date':date.isoformat(),'text':f'{date.year}년 {date.month}월 {date.day}일'})
 minute=time
 for side,text in lines:
  minute+=rng.choice([0,1,1,2,3,5,9])
  actual=dt.datetime.combine(date,dt.time(minute//60,minute%60),tzinfo=zoneinfo.ZoneInfo('America/New_York'))
  row={'side':side,'text':text,'date':date.isoformat(),'time':actual.strftime('%H:%M'),'timestamp':int(actual.timestamp()*1000)}
  if speaker and side=='them':row['speaker']=speaker
  rows.append(row)
def daily_main(d,n):
 a,b,c=projects[min((d.year-2024)*12+d.month-10,len(projects)-1)];stage=(d.day-1)//5;part=(d.day-1)%5
 if stage>=6:
  return [('me',f'이번 달 {a} 파일들 폴더에 다 넣음'),('them','정리까지 끝냈네'),('me','책상도 치웠다 칭찬해'),('them','영이 수고했음ㅋㅋ'),('me','다음 달에도 과제는 있겠지'),('them','그건 다음 달의 영이가 생각해ㅋㅋ')]
 if stage==0:
  choices=[
   [('me',f'이번에 {a} 해야 됨'),('them','얼마나 남았는데'),('me',f'오늘은 {b}부터 보려고'),('them','ㅇㅋ 그거 끝나고 불러'),('me','끝나면 증바람'),('them','일단 끝내고 와ㅋㅋ')],
   [('them','영아 수업 끝났냐'),('me',f'응 근데 {a} 아직 남음'),('them','오늘 다 해야 돼?'),('me',f'{c}만 정하면 됨'),('them','그럼 그것만 해'),('me','다하고 벨튀하러 옴')],
   [('me',f'{b} 봤는데 뭔 소린지 모르겠음'),('them','교수님이 설명 안 해 줬어?'),('me','들었는데 돌아오니까 사라짐'),('them','ㅋㅋ 일단 적어 둔 거 다시 봐'),('me',f'{a} 하는 중이라고 게임부터 켜지 마'),('them','난 아직 연습임ㅋㅋ')],
   [('me',f'오늘 목표는 {c} 정리'),('them','끝나면 몇 시인데'),('me','모름 일단 시작함'),('them','ㅇㅋ 나도 하고 올게'),('me','누가 먼저 끝나나 내기?'),('them','그걸 왜 내기해ㅋㅋ 천천히 해')],
   [('them','머함'),('me',f'{a} 할 자리 잡는 중'),('them','도서관?'),('me',f'ㅇㅇ {b} 다시 보려고'),('them','충전기 챙겼지'),('me','오늘은 챙겼음ㅋㅋ')]
  ]
 elif stage==1:
  choices=[
   [('me',f'{b} 겨우 정리했는데'),('them','응'),('me','파일 저장을 다른 데 했네'),('them','날아간 건 아니지?'),('me','아니 찾음ㅋㅋ'),('them',f'영아 {a}보다 파일찾기가 더 오래 걸리겠다')],
   [('me',f'{a} 하다 커피 다 식었음'),('them','한 모금도 안 마심?'),('me',f'{c} 보느라 까먹음'),('them','너 원래 식어도 마시잖아ㅋㅋ'),('me','커피값 내놔'),('them','그럼 딜량으로 벌어ㅋㅋ')],
   [('them','영이 아직 안 끝났어?'),('me',f'{b} 고치는 중'),('them','많이 남았어?'),('me',f'{c}까지 보면 됨'),('them','아직 할 게 있네'),('me','너 먼저 끝내고 와')],
   [('me',f'{a} 조금 했다'),('them','조금이 얼마ㅋㅋ'),('me',f'{b}는 끝남'),('them','그럼 조금 아니네'),('me','칭찬 더 해'),('them','끝까지 하면 더 해 드림ㅋㅋ')],
   [('me',f'{c} 내가 생각한 거랑 다르네'),('them','다시 해야 돼?'),('me',f'{b}만 바꾸면 될 듯'),('them','다 갈아엎는 건 아니구나'),('me','ㅇㅇ 다행'),('them','그거 마무리하고 밥 먹어')]
  ]
 elif stage==2:
  choices=[
   [('me',f'{a} 중간 확인하고 옴'),('them','어땠어'),('me',f'{b} 괜찮대'),('them','오ㅋㅋ'),('me','잘했지'),('them','ㅇㅇ 영이 잘했네'),('me','상으로 커피'),('them','칭찬에 유료옵션 붙이지 마ㅋㅋ')],
   [('me',f'{c} 수정 들어옴'),('them','많이?'),('me','생각보다 조금'),('them','그럼 오늘 끝낼 수 있겠다'),('me',f'{a} 끝내면 나 부를 거임?'),('them','야 영아'),('me','아직 안 끝남ㅋㅋ')],
   [('them','야'),('me',f'{b} 보는 중'),('them','방해 안 함'),('me','이미 불렀는데?'),('them','ㅋㅋ 끝나면 말해'),('me',f'{a} 지겨워지면 너 괴롭힘'),('them','받아 줌ㅋㅋ')],
   [('me',f'오늘 {a} 얘기만 했더니 목 아픔'),('them','물 마셔'),('me','넵'),('them',f'{c}는 정했어?'),('me','그건 됐음'),('them','그럼 오늘은 좀 쉬어도 되겠네')],
   [('me',f'{b} 드디어 이해함'),('them','표정 보이네ㅋㅋ'),('me','다시 설명하라면 못함'),('them','그럼 나한테 연습해 봐'),('me',f'{a} 얘기 길어짐'),('them','들으면서 쉬려고ㅋㅋ')]
  ]
 elif stage==3:
  choices=[
   [('me',f'{a} 거의 끝남'),('them','거의가 제일 오래 걸리던데'),('me',f'{c} 마지막 확인만'),('them','그럼 나도 기다려 봄'),('me','증바람 켜놓지 말고'),('them','아직 안 켰는데ㅋㅋ')],
   [('me',f'{b} 또 봐야 됨'),('them','졸린데 억지로 보는 건 아니지?'),('me','마지막으로 한 번만'),('them','시간 정해 두고 해'),('me','끝나면 전화'),('them','ㅇㅋ 내가 연습 끝나면 남길게')],
   [('them','발표는 준비됐냐'),('me',f'{a} 마무리 중'),('them','안 떨려?'),('me',f'{b}에서 버벅일까 봐'),('them','한 번 더 읽고 가'),('me','너도 중요할 때 떨림?'),('them','떨리지ㅋㅋ 그래도 함')],
   [('me',f'{a} 제출 전 저장함'),('them','이번엔 어디 저장했는지 기억하지ㅋㅋ'),('me','두 군데 해놨음'),('them','영이 성장했네'),('me',f'{c}만 확인하고 보낼 거야'),('them','다 보내고 쉬자')],
   [('me',f'{c} 확인까지 끝'),('them','진짜 끝?'),('me','ㅇㅇ 제출 버튼만'),('them','눌러ㅋㅋ'),('me','누름'),('them',f'{a} 탈출 축하한다ㅋㅋ')]
  ]
 elif stage==4:
  choices=[
   [('me',f'{a} 끝내니까 뭐 할지 모르겠음'),('them','쉬어ㅋㅋ'),('me','쉬는 것도 계획 있어야 됨'),('them','영아 나랑 한 판 하면 됨'),('me','커피빵'),('them','끝나자마자 내기네ㅋㅋ')],
   [('them',f'{a} 이제 안 해도 돼?'),('me','ㅇㅇ 당분간'),('them','그럼 오늘 좀 편하겠네'),('me','다음 거 나오기 전까지ㅋㅋ'),('them','미리 힘들어하지 마'),('me','ㅇㅋ 지금 쉼')],
   [('me',f'{b} 보던 메모 치움'),('them','안 버리고 모아 둬?'),('me','다음에 쓸 수도 있잖아'),('them','ㅇㅋ 잘 모아 둬'),('me','너한테 이긴 전적도 모음'),('them','그건 안 모아도 되는데ㅋㅋ')],
   [('me',f'{a} 끝났다고 친구랑 밥 먹음'),('them','뭐 먹었는데'),('me','피자'),('them','좋네ㅋㅋ'),('me','다음엔 너랑'),('them','응 한국 오면 같이 먹자')],
   [('me',f'{a} 하느라 밀린 잠 자려고'),('them','좋아 알람도 늦춰'),('me','너 톡하면 깰 수도'),('them','깨우진 않을게'),('me','일어나면 내가 야 하고 보냄'),('them','ㅇㅋ 기다림ㅋㅋ')]
  ]
 else:
  choices=[
   [('me',f'{a} 제출한 파일 다시 열어 봄'),('them','왜 또 열어ㅋㅋ'),('me','오타 있나 봄'),('them','끝났으면 그만 봐'),('me','그럼 너 볼래'),('them','영상통화 켜ㅋㅋ')],
   [('me','마트 갔는데 우유를 안 샀네'),('them','다시 가야 돼?'),('me',f'{a} 끝났으니 산책 겸 가지 뭐'),('them','어두워지기 전에 가'),('me','아직 낮임ㅋㅋ'),('them','아 맞다ㅋㅋ')],
   [('me',f'{c} 정리했던 노트 어디 뒀더라'),('them','가방 봐'),('me','책상에 없음'),('them','어제 도서관에 안 두고 왔지?'),('me','가방 안쪽에 있음'),('them','내 말부터 듣지ㅋㅋ')],
   [('them','영이 오늘은 좀 여유 있어?'),('me',f'ㅇㅇ {a} 끝나서 빨래 돌림'),('them','기다리는 동안 한 판?'),('me','끝나면 널어야 됨'),('them','그럼 다 널고 와'),('me','내기 먼저 걸어놓고 감ㅋㅋ')],
   [('me',f'{a} 끝내고 처음으로 일찍 누움'),('them','잘했어'),('me','안 졸리면 억울한데'),('them','눈만 감고 쉬어'),('me','너도 연습 끝내고 쉬어'),('them','응 끝나면 남길게')]
  ]
 return choices[part]
small=[
 [('them','야'),('me','왜 ㅡㅡ'),('them','그냥ㅋㅋ')],
 [('me','야'),('them','뭐하는데'),('me','불러놓고 되묻네'),('them','너도 맨날 그러잖아ㅋㅋ')],
 [('them','영아 오늘 아침 먹었어?'),('me','베이글'),('them','ㅇㅋ 수업 잘 듣고 와')],
 [('me','증바람 하실'),('them','얼마 걸 건데'),('me','지는 사람 커피'),('them','좋아 연습 끝나면')],
 [('me','아레나 ㄱ'),('them','협곡 아니면 됨'),('me','협곡은 나도 안 감ㅋㅋ')],
 [('them','수업중?'),('me','응'),('them','끝나고 봐'),('me','톡을ㅋㅋ'),('them','ㅋㅋ 톡 보라고')],
 [('me','너 오늘도 늦게 끝남?'),('them','조금 더 하고'),('me','ㅇㅋ 끝나면 남겨'),('them','영이도 먼저 잘 거면 자')],
 [('me','오늘 커피는 직접 샀다'),('them','잘했음ㅋㅋ'),('me','네가 사야 더 맛있는데'),('them','이겨 와ㅋㅋ')],
 [('them','나 이제 정리하고 들어감'),('me','고생했음'),('them','영이도 오늘 수업 잘 다녀와')],
 [('me','야 영이 출석'),('them','확인ㅋㅋ'),('me','너도 생존신고'),('them','살아 있음')],
 [('them','뭐해'),('me','밥'),('them','다 먹고 와'),('me','다먹으면 또 불러'),('them','ㅇㅋ')],
 [('me','너 자는 시간이라 톡만 남김'),('me','일어나면 야라고 보내'),('them','야'),('me','ㅋㅋ 일어났냐')]
]
for n in range((end-start).days+1):
 d=start+dt.timedelta(days=n)
 # Nearby topics persist over days; daily sessions span US mornings and evenings, not hourly.
 main=daily_main(d,n)
 # Monthly context lives in the work exchange; weekend errands are separate scenes.
 slot=rng.choice([7*60+10,8*60+5,9*60+20,10*60+15,21*60+10,22*60+5]) + rng.randrange(0,34)
 extras=small[(n*7+n//9)%len(small)]
 other=(22*60 if slot<12*60 else 8*60)+rng.randrange(0,50)
 sessions=sorted([(slot,main),(other,extras)])
 if d.day in [7,19] and d.weekday() in [5,6]:
  sessions.append((12*60+rng.randrange(0,30),[('me','장 봤는데 봉투가 찢어짐'),('them','다 쏟았어?'),('me','아니 잡았음 손이 빠른 여자'),('them','그 손으로 딜을 더 넣어ㅋㅋ')]))
 for t,lines in sorted(sessions):add('suhwan',d,t,lines)
 # Parent/friend chats use distinct subjects and ordinary response gaps.
 if n%2==0:
  friend=[('me',f'{projects[min((d.year-2024)*12+d.month-10,len(projects)-1)][0]} 하는 중'),('them','너도 아직 안 끝났어?'),('me','ㅇㅇ 끝나면 밥'),('them','내가 먼저 끝나면 자리 잡아 둘게')]
  add('friend',d,11*60+rng.randrange(0,40),friend)
 if d.weekday() in [1,4,6]:
  fam=[('them',rng.choice(['오늘 밥은 챙겨 먹었어?','수업은 잘 듣고 있지?','거기 날씨는 어때?','주말에는 좀 쉬어','늦게까지 혼자 다니지 말고'])) ,('me',rng.choice(['응 잘 지내고 있어','밥 챙겨 먹었어 걱정 마','과제하고 이제 쉬어','친구랑 같이 다녀서 괜찮아']))]
  add('family',d,8*60+rng.randrange(0,50),fam,'엄마')
 if d.weekday() in [0,3]:
  add('work',d,14*60+rng.randrange(0,45),[('them',rng.choice(['공유 문서에 내 부분 정리해 뒀어','내일 수업 끝나고 잠깐 맞춰 볼래?','자료 출처도 같이 적어 두자','발표 순서 다시 확인할게'])) ,('me',rng.choice(['응 저녁에 읽어 보고 남길게','확인했어 내 부분도 추가할게','좋아 수업 끝나고 보자']))])
 if d.weekday()==5:
  add('lolmates',d,10*60+rng.randrange(0,40),[('me',rng.choice(['증바람 자리 남음?','아레나 한 판 할 사람','협곡 말고 증바람으로 와'])) ,('them',rng.choice(['나 밥 먹고 접속','좋아 초대해 줘','과제 마무리하고 들어갈게']))])
 if n%5==0:add('mom',d,7*60+rng.randrange(0,40),[('them',rng.choice(['주말에 시간 될 때 전화해','사진 보냈으니까 일어나서 봐','밥 거르지 말고 잘 챙겨 먹어'])) ,('me',rng.choice(['응 나 수업 끝나고 전화할게','일어나서 봤어ㅋㅋ','엄마도 잘 챙겨 먹어']))])
 if n%7==0:add('dad',d,9*60+rng.randrange(0,30),[('them',rng.choice(['잘 지내고 있지?','필요한 거 있으면 말해','날씨 추워지면 겉옷 잘 챙겨'])) ,('me',rng.choice(['응 잘 지내고 있어','알겠어 아빠도 건강 챙겨','응 옷 챙겨 입고 다녀']))])
 if n%4==0:add('friends',d,18*60+rng.randrange(0,50),[('them',rng.choice(['영이 오늘도 생존?','이번 주 사진 좀 올려 봐','시차 때문에 이제야 톡 본다'])) ,('me',rng.choice(['살아 있음ㅋㅋ','학교랑 집만 다녀서 사진이 없음','나도 이제 봤네ㅋㅋ']))])
 if n%6==0:add('sora',d,15*60+rng.randrange(0,50),[('them',rng.choice(['도서관 자리 있어?','오늘 수업 자료 공유해 줄게','밥 먹으러 나갈래?'])) ,('me',rng.choice(['응 나 지금 나갈게','확인하고 답할게','나 과제 조금만 마무리하고']))])
# Handwritten anchor episodes take priority and remain searchable.
anchors={
 '2026-10-20':(3*60,[('them','야'),('them','자겠지ㅋㅋ'),('me','왜'),('them','뭐야 안 자?'),('me','잤는데'),('them','아 내가 깨웠어?'),('me','너만 알림 켜놔서'),('them','영아'),('them','미안 다시 자'),('me','이미 깼음 뭐하는데'),('them','나 쉬는 중'),('me','그럼 조금만 얘기해'),('them','응 조금만'),('them','졸리면 그냥 자 답장 안 해도 돼')]),
 '2026-10-18':(22*60,[('me','오빠'),('them','응 영아'),('me','오늘은 좀 힘들다'),('them','전화 켜 놓을까'),('me','말 안 해도 돼?'),('them','응'),('them','그냥 같이 있자'),('me','옆에 있으면 좋겠어'),('them','나도'),('them','만나면 먼저 안아줄게')]),
 '2026-10-16':(9*60,[('me','증바람 딜량 내기'),('them','ㅇㅋ 뭐 걸어'),('me','설거지'),('them','미국 설거지를 원격으로 하라는 건 아니지ㅋㅋ'),('me','귀국하면 적립된 거 다 해'),('them','영아 그 장부 무섭네ㅋㅋ'),('me','지면 오빠라고 부르겠음'),('them','미리 밝혀도 안 봐줌ㅋㅋ')]),
 '2026-10-14':(8*60,[('me','문현준'),('them','응 영아'),('me','연습 들어가면 한마디는 해'),('them','기다리게 해서 미안해'),('them','들어간다고 먼저 남겼어야 했어'),('me','나도 자야 돼서 기다렸잖아'),('them','응 다음엔 늦어지면 미리 말할게'),('me','알겠어'),('them','영아 오늘은 푹 자')])
}
for day,(t,lines) in anchors.items():
 if dt.date.fromisoformat(day)<=end:add('suhwan',dt.date.fromisoformat(day),t,lines)
for key,rows in hist.items():
 messages=sorted((m for m in rows if not m.get('divider')),key=lambda m:m['timestamp'])
 out=[];date=''
 for m in messages:
  if m['date']!=date:
   date=m['date'];d=dt.date.fromisoformat(date);out.append({'divider':True,'date':date,'text':f'{d.year}년 {d.month}월 {d.day}일'})
  out.append(m)
 hist[key]=out
life['histories']=hist;life['dateEvents']=[]
P.write_text('window.JIU_LIFE='+json.dumps(life,ensure_ascii=False,separators=(',',':'))+';',encoding='utf-8')
print(f'Rebuilt {len(hist["suhwan"])} rows across {(end-start).days+1} days; no hourly transcript replay.')
