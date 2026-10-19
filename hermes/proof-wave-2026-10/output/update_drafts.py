#!/usr/bin/env python3
"""Fix 3 PROOF wave drafts in place (same post ids, stay DRAFT): drop app screenshots that show 'Trace' wording and the wrong-logo brand card."""
import json, os, sys, time, urllib.request
sys.argv=[sys.argv[0]]
W='/root/tbtx-next-ecosystem/hermes/proof-wave-2026-10'
BASE=os.environ.get('POSTIZ_BASE','http://127.0.0.1:4007/api/public/v1')
KEY=[l.split('=',1)[1].strip().strip('"').strip("'") for l in open('/root/.hermes/.env') if l.startswith('POSTIZ_API_KEY=')][0]
st=json.load(open(W+'/output/postiz_state.json'))
items={i['id']:i for i in json.load(open(W+'/output/final.json'))}
NEW={'P39':['28_show-the-math_1080x1350.jpg'],'P40':[],'P44':['30_feed-approval_1080x1350.jpg','28_show-the-math_1080x1350.jpg']}
INT={'linkedin-personal':('cmucu0oe30009oe7fcvbtabui','linkedin'),'linkedin-page':('cmuctmqgc0003oe7ffgfaejet','linkedin-page'),'instagram':('cmukr21mu0001s3778drk6kdu','instagram-standalone')}
SET={'linkedin':{'__type':'linkedin','post_as_images_carousel':False},'linkedin-page':{'__type':'linkedin-page','post_as_images_carousel':False},
     'instagram-standalone':{'__type':'instagram-standalone','post_type':'post','is_trial_reel':False,'collaborators':[]}}
pid={}
for gk,res in st['groups'].items():
    d,t,ids=gk.split(' '); 
    for i,r in zip(ids.split(','),res): pid[i]=(r['postId'],d,t)
from datetime import datetime, timedelta
for k,assets in NEW.items():
    it=items[k]; postId,d,t=pid[k]; iid,typ=INT[it['channel']]
    utc=(datetime.strptime(f'{d} {t}','%Y-%m-%d %H:%M')+timedelta(hours=7)).strftime('%Y-%m-%dT%H:%M:00.000Z')
    img=[{'id':st['uploads'][a]['id'],'path':st['uploads'][a]['path']} for a in assets]
    body={'type':'draft','date':utc,'shortLink':False,'tags':[],'posts':[{'integration':{'id':iid},'value':[{'id':postId,'content':it['caption'],'image':img}],'settings':SET[typ]}]}
    r=urllib.request.Request(BASE+'/posts',data=json.dumps(body).encode(),method='POST',headers={'Authorization':KEY,'Content-Type':'application/json'})
    with urllib.request.urlopen(r,timeout=120) as resp: print(k,postId,resp.status,resp.read()[:200])
    it['assets']=assets; time.sleep(5)
json.dump(list(items.values()),open(W+'/output/final.json','w'),indent=1,ensure_ascii=False)
print('final.json updated')
