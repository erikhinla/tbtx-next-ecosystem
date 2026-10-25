#!/usr/bin/env python3
"""Load the PROOF wave into Postiz as DRAFTS only (type=draft). Resume-safe. Paced for the 30 req/hour public API limit."""
import json, os, sys, time, mimetypes, uuid, urllib.request, urllib.error
from datetime import datetime, timedelta
BASE=os.environ.get('POSTIZ_BASE','https://postiz.transformby10x.ai/api/public/v1')
W='/root/tbtx-next-ecosystem/hermes/proof-wave-2026-10'
STATE=W+'/output/postiz_state.json'
KEY=[l.split('=',1)[1].strip().strip('"').strip("'") for l in open('/root/.hermes/.env') if l.startswith('POSTIZ_API_KEY=')][0]
INT={'linkedin-personal':('cmucu0oe30009oe7fcvbtabui','linkedin'),'linkedin-page':('cmuctmqgc0003oe7ffgfaejet','linkedin-page'),
     'facebook':('cmuktbrdw0003s37725b1ysvp','facebook'),'x-erikhbush':('cmukhdwft000boe7fxscn32o5','x'),
     'x-transformby10x':('cmuxokigo005is377f0ucreew','x'),'instagram':('cmukr21mu0001s3778drk6kdu','instagram-standalone'),
     'youtube':('cmukke4cr000doe7fsax5p1nv','youtube')}
st=json.load(open(STATE)) if os.path.exists(STATE) else {'uploads':{},'groups':{}}
def save(): json.dump(st,open(STATE,'w'),indent=1)
def log(*a): print(time.strftime('%H:%M:%S'),*a,flush=True)
def req(method,path,body=None,ctype='application/json'):
    for attempt in range(8):
        r=urllib.request.Request(BASE+path,data=body,method=method,headers={'Authorization':KEY,'Content-Type':ctype})
        try:
            with urllib.request.urlopen(r,timeout=300) as resp: return json.loads(resp.read() or b'null')
        except urllib.error.HTTPError as e:
            msg=e.read()[:300]
            if e.code==429: log('429, sleeping 320s'); time.sleep(320); continue
            log('HTTP',e.code,msg); raise
    raise RuntimeError('rate limited too long')
def upload(name):
    if name in st['uploads']: return st['uploads'][name]
    p=f"{W}/assets/{'video' if name.endswith('.mp4') else 'img'}/{name}"
    b=uuid.uuid4().hex; mt=mimetypes.guess_type(p)[0] or 'application/octet-stream'
    body=(f'--{b}\r\nContent-Disposition: form-data; name="file"; filename="{name}"\r\nContent-Type: {mt}\r\n\r\n').encode()+open(p,'rb').read()+f'\r\n--{b}--\r\n'.encode()
    res=req('POST','/upload',body,f'multipart/form-data; boundary={b}')
    st['uploads'][name]={'id':res['id'],'path':res['path']}; save(); log('uploaded',name,res['path']); time.sleep(int(os.environ.get('PACE','5')))
    return st['uploads'][name]
def settings(item,typ):
    if typ=='x': return {'__type':'x','who_can_reply_post':'everyone'}
    if typ=='linkedin': return {'__type':'linkedin','post_as_images_carousel':False}
    if typ=='linkedin-page': return {'__type':'linkedin-page','post_as_images_carousel':False}
    if typ=='facebook': return {'__type':'facebook'}
    if typ=='instagram-standalone': return {'__type':'instagram-standalone','post_type':'post','is_trial_reel':False,'collaborators':[]}
    if typ=='youtube': return {'__type':'youtube','title':item['title'][:100],'type':'public','selfDeclaredMadeForKids':'no','tags':[]}
items=json.load(open(W+'/output/final.json'))
only=set(sys.argv[1:])
groups={}
for it in items:
    if only and it['id'] not in only: continue
    groups.setdefault((it['date'],it['time_pt']),[]).append(it)
for (d,t),its in sorted(groups.items()):
    gk=f'{d} {t} '+','.join(i['id'] for i in its)
    if gk in st['groups']: log('skip existing',gk); continue
    utc=(datetime.strptime(f'{d} {t}','%Y-%m-%d %H:%M')+timedelta(hours=7)).strftime('%Y-%m-%dT%H:%M:00.000Z')  # PDT = UTC-7 through Oct 31
    posts=[]
    for it in its:
        iid,typ=INT[it['channel']]
        media=[upload(a) for a in it['assets']]
        posts.append({'integration':{'id':iid},'value':[{'content':it['caption'],'image':[{'id':m['id'],'path':m['path']} for m in media]}],'settings':settings(it,typ)})
    body={'type':'draft','date':utc,'shortLink':False,'tags':[],'posts':posts}
    res=req('POST','/posts',json.dumps(body).encode())
    st['groups'][gk]=res; save(); log('created draft group',gk,json.dumps(res)[:300]); time.sleep(int(os.environ.get('PACE','5')))
log('DONE')
