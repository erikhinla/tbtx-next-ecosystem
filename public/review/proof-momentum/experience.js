(() => {
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const local=location.protocol==='file:'||['localhost','127.0.0.1','[::1]'].includes(location.hostname);
const media=name=>window.REVIEW_MEDIA?.[name]||('assets/'+name);

function mountInfra(){
 if($('.infra'))return;
 const onBiz=document.body.dataset.page==='business';
 const home=onBiz?'/':'#arrival';
 const life=onBiz?'/#daily':'#daily';
 const proof='#proof';
 const mark=document.createElement('a');
 mark.className='mark';mark.href=home;mark.textContent='TBTX';
 const box=document.createElement('details');
 box.className='infra';
 box.innerHTML=`<summary class="infra-trace" aria-label="INFRA"><span></span></summary><nav aria-label="INFRA"><p class="infra-word">INFRA</p><a class="infra-lane" data-lane="life" href="${life}">Life</a><a class="infra-child" data-lane="life" href="${life}">De-Fog</a><a class="infra-lane" data-lane="biz" href="/bbai">Business</a><a class="infra-child" data-lane="biz" href="${proof}">PROOF</a><a class="infra-me" href="/story">Me</a></nav>`;
 document.body.append(mark,box);
 box.querySelectorAll('nav a').forEach(el=>el.addEventListener('click',()=>box.removeAttribute('open')));
 markInfra();
}
function markInfra(){
 const life=document.body.classList.contains('lane-life');
 const biz=document.body.classList.contains('lane-biz');
 document.querySelectorAll('.infra [data-lane]').forEach(el=>{
  el.classList.toggle('is-dim',(life&&el.dataset.lane==='biz')||(biz&&el.dataset.lane==='life'));
 });
}

const SOUND_FILM={
  'b2b-task-1-world.mp4':'b2b-task-1.mp4',
  'b2b-task-2-world.mp4':'b2b-task-2.mp4',
  'b2b-task-4-world.mp4':'b2b-task-4.mp4',
  'b2b-task-5-world.mp4':'b2b-task-5.mp4',
  'b2b-task-6-world.mp4':'b2b-task-6.mp4',
  'proof-world.mp4':'proof-mood-3.mp4'
};
const videos=[$('#world-a'),$('#world-b')].filter(Boolean);videos.forEach(v=>{v.autoplay=!reduced;v.muted=true;v.playsInline=true;});let version=0,wanted='',activeScene=null,modalFilm=null,soundOn=false,bed=null;
try{soundOn=sessionStorage.getItem('tbtx-sound')==='on';}catch{}
function ensureBed(){
  if(bed)return bed;
  bed=document.createElement('video');
  bed.id='world-bed';
  bed.loop=true;
  bed.playsInline=true;
  bed.setAttribute('playsinline','');
  bed.muted=true;
  bed.setAttribute('aria-hidden','true');
  bed.style.cssText='position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;left:-99px;top:-99px';
  document.body.appendChild(bed);
  return bed;
}
function stopBed(){
  if(!bed)return;
  bed.pause();
  bed.muted=true;
}
function liveWorld(){return videos.find(v=>v.classList.contains('visible')&&v.dataset.file)||videos.find(v=>v.dataset.file)||videos[0];}
function syncBed(name){
  const live=liveWorld();
  videos.forEach(v=>{v.muted=true;});
  if(!soundOn||!name||name==='off'){stopBed();return;}
  const mapped=SOUND_FILM[name];
  if(!mapped){
    stopBed();
    if(live){live.muted=false;live.volume=1;live.play().catch(()=>{});}
    return;
  }
  const b=ensureBed();
  const url=media(mapped);
  if(b.dataset.file!==mapped){
    b.dataset.file=mapped;
    b.src=url;
    b.load();
  }
  b.muted=false;
  b.volume=1;
  b.play().catch(()=>{});
}
function applySound(){
  const scene=wanted||activeScene?.dataset.world||'';
  syncBed(scene);
  const gal=$('#gallery-film');
  if(gal)gal.muted=!soundOn;
  $$('.route-lane video,.fog-stack video').forEach(v=>{v.muted=true;});
  const b=$('#sound-toggle');if(!b)return;
  b.setAttribute('aria-pressed',String(soundOn));
  b.setAttribute('aria-label',soundOn?'Sound on':'Sound off');
}
function setSound(on){
  soundOn=!!on;
  try{sessionStorage.setItem('tbtx-sound',soundOn?'on':'');}catch{}
  applySound();
}
function changeWorld(name,light=.8,crop){
 const world=$('#world');if(!world)return;
 const level=Number.isFinite(Number(light))?Number(light):.8;
 world.style.setProperty('--light',String(level));
 world.dataset.scene=name||'off';
 if(crop)world.style.setProperty('--crop',crop);else world.style.removeProperty('--crop');
 const hide=v=>{v.classList.remove('visible');v.style.opacity='0';v.pause();};
 const show=v=>{v.classList.add('visible');v.style.opacity=String(level);};
 if(!name||name==='off'){
  wanted='off';
  videos.forEach(hide);
  stopBed();
  return;
 }
 const holding=videos.find(v=>v.dataset.file===name);
 if(holding){
  wanted=name;
  videos.forEach(v=>{if(v!==holding)hide(v);});
  show(holding);
  holding.muted=true;
  if(!reduced&&!document.hidden)holding.play().catch(()=>{});
  syncBed(name);
  return;
 }
 wanted=name;
 const token=++version;
 const outgoing=videos.find(v=>v.classList.contains('visible'))||null;
 const next=outgoing===videos[0]?videos[1]:videos[0];
 next.dataset.file=name;
 next.preload='auto';
 next.setAttribute('preload','auto');
 next.muted=true;
 next.loop=true;
 next.playsInline=true;
 next.poster='assets/'+(name==='proof-world.mp4'?'proof-mood-3':name.replace('.mp4',''))+'.jpg';
 next.src=media(name);
 const reveal=()=>{
  if(token!==version)return;
  videos.forEach(v=>{if(v!==next)hide(v);});
  show(next);
  if(!reduced&&!document.hidden)next.play().catch(()=>{});
  syncBed(name);
  if(outgoing&&outgoing!==next) setTimeout(()=>{if(outgoing.dataset.file!==wanted){outgoing.pause();outgoing.removeAttribute('src');outgoing.removeAttribute('poster');delete outgoing.dataset.file;outgoing.load();}},900);
 };
 next.addEventListener('canplay',reveal,{once:true});
 next.addEventListener('error',reveal,{once:true});
 next.play().then(reveal).catch(()=>{});
 reveal();
}
const acts=$$('[data-world]');let framePending=false;
function syncChrome(best){
 const chrome=$('.chrome');if(!chrome)return;
 const id=best?.id||(document.body.dataset.page==='business'?'proof':'arrival');
 const nudesOpen=!!$('#gallery')?.open;
 const atHome=id==='arrival'&&!nudesOpen&&document.body.dataset.page!=='business';
 const label=nudesOpen?'THE HANG':({arrival:'',recognition:'',gate:'',routes:'',proof:'PROOF',build:'BBAI',daily:'DDD',founder:'TBTX','how-i-build':'BBAI','business-close':'BBAI'}[id]||'');
 chrome.classList.toggle('is-away',!atHome);
 chrome.dataset.chapter=nudesOpen?'hang':(label||id||'');
 const now=$('.brand-now');if(now) now.textContent=atHome?'':label;
 const nav=nudesOpen?'hang':id==='proof'?'proof':id==='daily'?'daily':id==='build'?'build':'';
 $$('[data-nav]').forEach(el=>el.setAttribute('aria-current',String(el.dataset.nav===nav)));
}
function updateWorld(){
 framePending=false;if(!acts.length)return;
 const mid=innerHeight*.45;let best=acts[0],bestScore=-Infinity;
 for(const act of acts){
  const r=act.getBoundingClientRect();if(r.height<=0)continue;
  const vis=Math.min(r.bottom,innerHeight)-Math.max(r.top,0);if(vis<=0)continue;
  const score=vis-Math.abs((r.top+r.bottom)/2-mid)*.25;
  if(score>bestScore){bestScore=score;best=act;}
 }
 activeScene=best;if(!modalFilm)changeWorld(best.dataset.world,Number(best.dataset.light),best.dataset.crop);
 syncChrome(best);
 document.body.classList.toggle('on-arrival',best?.id==='arrival');
 const arrival=$('#arrival');
 if(arrival){const r=arrival.getBoundingClientRect();arrival.classList.toggle('is-past',r.bottom<innerHeight*.5);}
}
function queueWorld(){if(!framePending){framePending=true;requestAnimationFrame(updateWorld);}}
function bindWorldScroll(){
 const seen=new Set();
 const add=el=>{if(!el||seen.has(el))return;seen.add(el);el.addEventListener('scroll',queueWorld,{passive:true});};
 add(window);add(document);add(document.scrollingElement);add(document.documentElement);add(document.body);add($('#experience'));
 addEventListener('resize',queueWorld);
 if('IntersectionObserver' in window){const io=new IntersectionObserver(()=>queueWorld(),{threshold:[0,.2,.4,.6,.8,1]});acts.forEach(a=>io.observe(a));}
 queueWorld();
}
if(reduced)$$('[data-sc-act]').forEach(a=>a.setAttribute('data-sc-act','flow'));
try{if(window.ScrollCraft&&$('#experience'))window.reviewScrollcraft=window.ScrollCraft.mount($('#experience'));}catch(err){}
bindWorldScroll();
const modalVideos={'method-dialog':'proof-mood-2.mp4','map-intro':'b2b-task-6-world.mp4','ddd-intro':'ddd-r5-picture-sfx.mp4','ddd':'ddd-r5-picture-sfx.mp4','ddd-method':'ddd-r5-picture-sfx.mp4','funding':'ddd-r5-picture-sfx.mp4','recognize':'b2b-task-2-world.mp4','stand-on':'b2b-task-6-world.mp4','fog-def':'b2b-task-2-world.mp4','trace':'b2b-task-1-world.mp4','blueprint':'proof-world.mp4','growth':'b2b-task-5-world.mp4','philosophy':'b2b-task-1-world.mp4','flow-engine':'b2b-task-1-world.mp4','about':'erik-portrait.mp4','gallery':'off'};
let lastTrigger=null,modalStack=[];
let lastScroll=0;
function coverPage(on){
 if(on){
  if(!document.documentElement.classList.contains('is-sheet')) lastScroll=window.scrollY||document.documentElement.scrollTop||0;
 }else if(state.gate) document.body.classList.add('stood');
 document.documentElement.classList.toggle('is-sheet',on);
 document.body.classList.toggle('is-sheet',on);
 ['#experience','.chrome','.mark','.infra','.site-menu'].forEach(sel=>{
  const el=$(sel); if(!el) return;
  if(on){el.setAttribute('hidden','');el.setAttribute('inert','');el.style.setProperty('display','none','important');el.style.setProperty('visibility','hidden','important');}
  else{el.removeAttribute('hidden');el.removeAttribute('inert');el.style.removeProperty('display');el.style.removeProperty('visibility');}
 });
 if(!on) requestAnimationFrame(()=>{window.scrollTo(0,lastScroll);requestAnimationFrame(()=>window.scrollTo(0,lastScroll));});
}
function modalWorld(){const opened=$$('dialog[open]'),topId=modalStack.at(-1)?.id,d=opened.find(x=>x.id===topId)||opened.at(-1);opened.forEach(x=>x.classList.toggle('behind-dialog',x!==d));if(!d){modalFilm=null;updateWorld();return;}const film=modalVideos[d.id];if(film==='off'){modalFilm='off';changeWorld('off',0);return;}modalFilm=film||activeScene?.dataset.world||null;if(!modalFilm){updateWorld();return;}const bright=['map-intro','ddd-intro'].includes(d.id)?.88:.58;const crop=(d.id==='recognize'||d.id==='fog-def')?'32% 42%':d.id==='about'?'50% 18%':undefined;changeWorld(modalFilm,bright,crop);}
function open(id,trigger=document.activeElement){if(!document.documentElement.classList.contains('is-sheet')) lastScroll=window.scrollY||document.documentElement.scrollTop||0;if(id==='gallery')buildHang();const d=$('#'+id);if(!d)return;lastTrigger=trigger;if(!d.open){modalStack.push({id,trigger});d.classList.remove('behind-dialog');try{d.showModal();}catch{d.setAttribute('open','');}}coverPage(true);document.documentElement.style.overflow='hidden';modalWorld();d.scrollTop=0;requestAnimationFrame(()=>d.querySelector('h2')?.focus({preventScroll:true}));}
function close(d){(typeof d==='string'?$('#'+d):d)?.close();}
function closeAll(){for(const d of $$('dialog[open]'))d.close();modalStack=[];}
function bindDialog(d){if(!d||d.dataset.bound)return;d.dataset.bound='1';d.addEventListener('close',()=>{d.querySelectorAll('video').forEach(v=>v.pause());const entry=modalStack.findLast(x=>x.id===d.id);modalStack=modalStack.filter(x=>x.id!==d.id);if(!$$('dialog[open]').length){document.documentElement.style.overflow='';coverPage(false);entry?.trigger?.focus?.({preventScroll:true});}modalWorld();syncChrome(activeScene);});d.addEventListener('click',e=>{if(e.target.closest('[data-close]'))close(d);});}$$('dialog').forEach(bindDialog);
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b){open(b.dataset.open,b);}});
document.addEventListener('click',e=>{const jump=e.target.closest('[data-close-go]');if(!jump)return;e.preventDefault();const target=jump.getAttribute('data-close-go')||jump.getAttribute('href');closeAll();if(target)go(target.startsWith('#')?target:'#'+target);});
function go(id){const el=$(id);if(!el)return;el.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});}
const state={gate:false,lane:null,step:0,selections:[],personalSelections:null};
try{state.gate=sessionStorage.getItem('tbtx-entry')==='up';const p=JSON.parse(localStorage.getItem('tbtx-scan-v3'));if(p?.version==='site-20260914'&&score('personal',p.answers))state.personalSelections=p.answers;}catch{}
function setStood(on){state.gate=!!on;document.body.classList.toggle('stood',state.gate);if(on)$$('[data-sc-in]').forEach(el=>el.classList.add('sc-in'));try{sessionStorage.setItem('tbtx-entry',state.gate?'up':'');}catch{}}
if(state.gate){document.body.classList.add('stood');$$('[data-sc-in]').forEach(el=>el.classList.add('sc-in'));}
const gateCopy={out:'Consume and be consumed by AI tools without learning them and get passed by those who did.',back:'Continue Managing Digital Fog as AI\'s assistant, always busy but not building something scalable that moves you.',up:'Prepare your life & business for leverage in the AI-Era. Stand up from the ground up.'};
$$('[data-choice]').forEach(b=>b.onclick=()=>{const choice=b.dataset.choice,gateEl=$('#gate .gate')||$('#gate');$$('[data-choice]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));const copy=$('#gate-copy');if(copy){copy.hidden=false;copy.textContent=gateCopy[choice]||'';}gateEl.classList.add('is-answered');setStood(choice==='up');document.body.classList.toggle('held',choice!=='up');if(choice==='up'){document.body.classList.remove('held');const next=$('#carry')?'#carry':($('#routes')?'#routes':'#build');setTimeout(()=>go(next),1600);}});
function score(lane,selections){const qs=window.REVIEW_QUESTIONS[lane];if(!qs||!Array.isArray(selections)||selections.length!==qs.length||qs.some((q,i)=>!Number.isInteger(selections[i])||!q.options[selections[i]]))return null;const values=qs.map((q,i)=>q.options[selections[i]].value),raw=values.reduce((a,b)=>a+b,0),max=qs.length*2,result=Math.round(100*raw/max);const band=lane==='personal'?(result<50?'Carrying it':'Clear enough'):result<25?'Fragmented':result<50?'Stalled':result<75?'Scaling':'Compounding';return{raw,max,result,band,values};}
function setLane(lane){document.body.classList.toggle('lane-life',lane==='personal');document.body.classList.toggle('lane-biz',lane==='business');try{if(lane)sessionStorage.setItem('tbtx-lane',lane);}catch{}markInfra();}
try{const lane=sessionStorage.getItem('tbtx-lane');if(lane==='personal'||lane==='business')setLane(lane);}catch{}
if(document.body.dataset.page==='business') setLane('business');
try{
 const path=location.pathname.replace(/\/$/,'')||'/';
 if(path==='/scan'||/\bstart=scan\b/.test(location.search)){setStood(true);setTimeout(()=>start('personal'),280);}
 if(path==='/map'||path==='/bbai/map'||/\bstart=map\b/.test(location.search)){setStood(true);setLane('business');setTimeout(()=>start('business'),280);}
}catch{}
function start(lane){closeAll();const onBiz=document.body.dataset.page==='business';if(!state.gate&&!onBiz){if($('#gate'))go('#gate');return;}if(!state.gate)setStood(true);setLane(lane);state.lane=lane;state.step=0;const qs=window.REVIEW_QUESTIONS?.[lane];if(!qs){if(lane==='business')open('map-intro');return;}state.selections=Array(qs.length).fill(null);if(lane==='business')open('map-intro');else{renderQuestion();open('questionnaire');}}
document.addEventListener('click',e=>{const a=e.target.closest('a[href="#proof"],a[href="#daily"]');if(!a)return;if(!state.gate){e.preventDefault();go('#gate');return;}setLane(a.getAttribute('href')==='#proof'?'business':'personal');},true);
document.addEventListener('click',e=>{const b=e.target.closest('[data-start]');if(!b)return;e.preventDefault();e.stopPropagation();start(b.dataset.start);});
const beginMap=$('#begin-map');if(beginMap)beginMap.onclick=()=>{close('map-intro');renderQuestion();open('questionnaire');};
function focusQuestion(){$('#question-title').focus({preventScroll:true});$('#questionnaire').scrollTop=0;}
function renderQuestion(){const qs=window.REVIEW_QUESTIONS[state.lane],q=qs[state.step],selected=state.selections[state.step];$('#question-lane').textContent=(state.lane==='business'?'PROOF / Momentum Map':'Digital Fog Scan')+' · '+(state.step+1)+' / '+qs.length;
 $('#question-body').innerHTML=`<div class="question-progress" aria-hidden="true"><span style="width:${100*state.step/qs.length}%"></span></div><h2 id="question-title" tabindex="-1">${escape(q.text)}</h2><div class="answer-options" role="radiogroup" aria-labelledby="question-title">${q.options.map((o,i)=>`<label class="answer-option"><input type="radio" name="answer" value="${i}" ${i===selected?'checked':''}><span>${escape(o.text)}</span></label>`).join('')}</div><details class="question-insight"><summary aria-label="Why this question?">Y?</summary><p>${escape(window.QUESTION_NOTES[state.lane][q.id])}</p></details><div class="q-nav"><button id="previous" ${state.step===0?'disabled':''}>Back</button><button id="next" class="action" ${selected===null?'disabled':''}>${state.step===qs.length-1?'See the starting point':'Next'} <span class="arr" aria-hidden="true"></span></button></div>`;
 $$('input[name=answer]').forEach(el=>el.onchange=()=>{state.selections[state.step]=Number(el.value);$('#next').disabled=false;});$('#previous').onclick=()=>{if(state.step>0){state.step--;renderQuestion();focusQuestion();}};$('#next').onclick=()=>{if(state.selections[state.step]===null)return;if(state.step<qs.length-1){state.step++;renderQuestion();focusQuestion();}else renderResult();};}
function pointLabel(n){return n===1?'1 point':n+' points';}
function renderResult(){const r=score(state.lane,state.selections);if(!r)return;const qs=window.REVIEW_QUESTIONS[state.lane];if(state.lane==='personal'){state.personalSelections=[...state.selections];try{localStorage.setItem('tbtx-scan-v3',JSON.stringify({version:'site-20260914',answers:state.personalSelections}));}catch{}}
 $('#question-lane').textContent=state.lane==='business'?'PROOF / Starting point':'Digital Fog Scan / Starting point';$('#question-body').innerHTML=`<h2 id="question-title" tabindex="-1">${r.band}.</h2><p class="result-reass">${state.lane==='business'?'The answers point to a pattern. Then a task to follow.':'Nothing else needs sorting today.'}</p><div class="result-ctas"><button class="action" id="result-next">${state.lane==='business'?'Follow Trace':'Start DDD'} <span class="arr" aria-hidden="true"></span></button></div><details class="result-math"><summary>Show the math</summary><div class="score-number">${r.result}<small>/100</small></div><p class="result-formula">round(100 × ${r.raw} ÷ ${r.max}) = ${r.result}</p><p>${state.lane==='business'?'Fragmented 0-24 · Stalled 25-49 · Scaling 50-74 · Compounding 75-100.':'Carrying it 0-49 · Clear enough 50-100.'}</p><p>This reflects the answers given. It isn't measured productivity, hours saved or a diagnosis.</p><details><summary>The answers, one by one</summary>${qs.map((q,i)=>`<div class="answer-record"><strong>${q.id}. ${escape(q.text)}</strong><p>${escape(q.options[state.selections[i]].text)}</p><small>${pointLabel(r.values[i])}</small></div>`).join('')}</details></details><button class="text-action" id="review-answers">Review answers <i class="arr" aria-hidden="true"></i></button>`;
 $('#result-next').onclick=()=>{close('questionnaire');open(state.lane==='business'?'trace':'ddd-intro');};$('#review-answers').onclick=()=>{state.step=0;renderQuestion();focusQuestion();};focusQuestion();}
function startDDD(){closeAll();if(window.DDD?.hasDraft()){window.DDD.open();}else open('ddd-intro');}
if($('#open-ddd'))$('#open-ddd').onclick=startDDD;if($('#ddd-method-start'))$('#ddd-method-start').onclick=startDDD;if($('#begin-ddd'))$('#begin-ddd').onclick=()=>{close('ddd-intro');window.DDD.open();};
const studioLead=[
 {when:'Process',claim:'What two AI agents disagreeing looks like',title:'Conflicting outputs',cover:'assets/b2b-task-3.jpg',href:'/hang/conflict'},
 {when:'Process',claim:'Picking a logo without a design team',title:'Choosing a logo',cover:'assets/b2b-task-4.jpg',href:'/hang/logo'},
 {when:'Process',claim:'Where the context actually drops',title:'The handoff',cover:'assets/proof-mood-3.jpg',href:'/hang/handoff'},
 {when:'Process',claim:'Auditing code nobody on staff wrote',title:'Checking the code',cover:'assets/b2b-task-1.jpg',href:'/hang/code'}
];
const studioMore=[
 {when:'Campaign',claim:'AI created a job. Nobody wanted it.',title:'The origin lockup',cover:'assets/ai-created-a-job.jpg',href:'/hang/created'},
 {when:'Process',claim:'The leftover job, looping',title:'Desk fog',cover:'assets/desk-fog-loop.jpg',href:'/hang/desk'},
 {when:'PROOF',claim:'From fog to architecture',title:'Fog and friction, then a spine',cover:'assets/proof-to-architecture.jpg',href:'/hang/spine'},
 {when:'PROOF',claim:'The repair load nobody named',title:'Hidden human repair',cover:'assets/hidden-repair-load.jpg',href:'/hang/repair'},
 {when:'BizBuilders',claim:'Where the fix lives',title:'BBAI momentum',cover:'assets/bbai-momentum-loop.jpg',href:'/hang/bbai'},
 {when:'Campaign',claim:'A kit that lifts the fog',title:'Fog Lift Kit',cover:'assets/fog-lift-kit.jpg',href:'/hang/kit'},
 {when:'Process',claim:'What happens when the glue snaps',title:'Computer explodes',cover:'assets/computer-explodes.jpg',href:'/hang/explodes'},
 {when:'Satire',claim:'The fog, with the joke left in',title:'Digital Fog satire',cover:'assets/satire-digital-fog.jpg',href:'/hang/satire'}
];
const hangRooms=[
 {q:'Why is everything harder than it should be?',works:[{when:'Sept 2026',claim:'What people carry',title:'Governing AI Shadow Work',cover:'assets/studio/3/cover.jpg',href:'/hang/shadow'},{when:'PROOF',claim:'Most AI programs fail in the handoff.',title:'The Forensic Instrument',cover:'assets/studio/9/cover.jpg',href:'/hang/forensic'}]},
 {q:'What is actually missing?',works:[{when:'Sept 2026',claim:'Where work gets a spine',title:'Architecting AI Momentum',cover:'assets/studio/0/cover.jpg',href:'/hang/momentum'},{when:'Canon v2026.07',claim:'From fog to governed execution',title:'The Architecture of AI-Native Operations',cover:'assets/studio/4/cover.jpg',href:'/hang/architecture'},{when:'Overview',claim:'PROOF, in three pages',title:'Proof Overview',cover:'assets/studio/6/cover.jpg',href:'/hang/overview'},{when:'Thesis',claim:'Your tools didn’t remove the work.',title:'Architecting Digital Order',cover:'assets/studio/8/cover.jpg',href:'/hang/order'},{when:'Architecture',claim:'Most systems generate. Few govern what happens next.',title:'AI Operational Architecture',cover:'assets/studio/7/cover.jpg',href:'/hang/ops'}]},
 {q:'How does the work actually get done?',works:[{when:'July 2026',claim:'The path to done',title:'Governed Execution',cover:'assets/studio/2/cover.jpg',href:'/hang/governed'},{when:'Process',claim:'How the work keeps moving',title:'The operator archive',cover:'assets/studio/1/cover.jpg',href:'/hang/operator'},{when:'Engineering',claim:'The path the work takes',title:'Engineering Operational Flow',cover:'assets/studio/10/cover.jpg',href:'/hang/flow'},{when:'Backbone',claim:'The spine under the work',title:'The Operating Backbone',cover:'assets/studio/11/cover.jpg',href:'/hang/backbone'}]}
];
function hangCard(n){return `<a class="nudes-work is-flip" href="${n.href}"><span class="frame"><img src="${n.cover}" alt="${n.claim}" loading="lazy" decoding="async" width="600" height="336"></span><span class="when">${n.when}</span><b>${n.claim}</b><small>${n.title}</small></a>`;}
let hangBuilt=false;
function buildHang(){
 if(hangBuilt)return;hangBuilt=true;
 if($('#hang-studio')) $('#hang-studio').innerHTML=studioLead.map(hangCard).join('');
 if($('#hang-studio-more')) $('#hang-studio-more').innerHTML=studioMore.map(hangCard).join('');
 if($('#hang-rooms')) $('#hang-rooms').innerHTML=hangRooms.map(r=>`<section class="hang-room"><h3>${r.q}</h3><div class="nudes-hall">${r.works.map(hangCard).join('')}</div></section>`).join('');
 if($('#hang-more-line')) $('#hang-more-line').onclick=()=>{const more=$('#hang-studio-more');if(!more)return;more.hidden=!more.hidden;$('#hang-more-line').textContent=more.hidden?'Eight more, each with its own claim and its own page.':'The rest of the studio.';};
}
const galleryItems=[['The handoff','proof-mood-3.mp4','Where the context actually drops.'],['How PROOF finds the fog','proof-mood-2.mp4','The leftover job, on film.'],['PROOF / First cut','proof-mood-1.mp4','Before the method had a name.'],['Checking the code','b2b-task-1.mp4','Auditing code nobody on staff wrote.'],['Content strategy','b2b-task-2.mp4','Holding the story still.'],['Conflicting outputs','b2b-task-3.mp4','What two AI agents disagreeing looks like.'],['Choosing a logo','b2b-task-4.mp4','Picking a logo without a design team.'],['The final summary','b2b-task-5.mp4','What the work actually said.'],['Keeping strategy in view','b2b-task-6.mp4','The plan that has to stay in the room.'],['The Map','defog-daily-hero.mp4','Where the work comes back.'],['Digital De-Fog Daily','ddd-r5-picture-sfx.mp4','One surface. Twenty minutes.'],['The concept artwork',null,'Some labels predate Finder.'],['The origin lockup','ai-created-a-job.mp4','AI created a job. Nobody wanted it.'],['Desk fog','desk-fog-loop.mp4','The leftover job, looping.'],['Fog to architecture','proof-to-architecture.mp4','From fog to architecture.'],['Hidden repair','hidden-repair-load.mp4','The repair load nobody named.'],['BBAI momentum','bbai-momentum-loop.mp4','Where the fix lives.'],['Fog Lift Kit','fog-lift-kit.mp4','A kit that lifts the fog.'],['Computer explodes','computer-explodes.mp4','What happens when the glue snaps.'],['Digital Fog satire','satire-digital-fog.mp4','The fog, with the joke left in.']];
$('#gallery-nav') && ($('#gallery-nav').innerHTML=galleryItems.map((a,i)=>`<button data-gallery="${i}">${a[0]}</button>`).join(''));function chooseGallery(i){const item=galleryItems[i],v=$('#gallery-film');if(!v)return;v.pause();$$('[data-gallery]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.gallery)===i)));v.hidden=!item[1];const art=$('#gallery-art');if(art)art.hidden=!!item[1];if(item[1])v.src=media(item[1]);else v.removeAttribute('src');const cap=$('#gallery-caption');if(cap)cap.textContent=item[2];}
$$('[data-gallery]').forEach(b=>b.onclick=()=>chooseGallery(Number(b.dataset.gallery)));$('#gallery-film').addEventListener('play',()=>videos.forEach(v=>v.pause()));$('#gallery-film').addEventListener('pause',()=>{if($('#gallery').open&&!document.hidden&&!reduced)liveWorld()?.play().catch(()=>{});});
document.addEventListener('visibilitychange',()=>{if(document.hidden)$$('video').forEach(v=>v.pause());else if(!reduced){if($('#world').dataset.scene!=='off'&&!($('#gallery').open&&!$('#gallery-film').paused))liveWorld()?.play().catch(()=>{});$$('.fog-stack video,.route-lane video').forEach(v=>v.play().catch(()=>{}));syncBed(wanted||activeScene?.dataset.world);}});
if(reduced)$$('.fog-stack video,.route-lane video').forEach(v=>{v.pause();v.removeAttribute('autoplay');});
$$('.route-lane video[data-film]').forEach(v=>{
 const arm=()=>{if(v.dataset.armed)return;v.dataset.armed='1';v.src=media(v.dataset.film);if(!reduced)v.play().catch(()=>{});};
 if('IntersectionObserver' in window){
  const io=new IntersectionObserver(ents=>{if(ents.some(en=>en.isIntersecting)){arm();io.disconnect();}},{rootMargin:'240px'});
  io.observe(v);
 }else arm();
});
applySound();
$('#sound-toggle')?.addEventListener('click',e=>{e.stopPropagation();setSound(!soundOn);});
let tapX=0,tapY=0;
document.addEventListener('pointerdown',e=>{tapX=e.clientX;tapY=e.clientY;},{passive:true});
document.addEventListener('pointerup',e=>{
 if(document.body.classList.contains('is-sheet'))return;
 if(Math.hypot(e.clientX-tapX,e.clientY-tapY)>14)return;
 const hit=e.target.closest('a,button,input,textarea,select,summary,label,dialog,.route-lane,.gate-board,.chrome,.site-menu,.sheet,.action,.text-action,.read-link,.family-line,.daily-pay,.method-launch,.mark');
 if(hit)return;
 setSound(!soundOn);
});
// Direction and color move with intent; pointer movement never shifts a click target.

document.querySelectorAll('.site-menu nav a,.site-menu nav button').forEach(el=>el.addEventListener('click',()=>{const m=el.closest('.site-menu');if(m)m.removeAttribute('open');}));
$$('.action,.route,.route-lane,.gate-choices button,.method-launch').forEach(b=>{b.addEventListener('pointermove',e=>{if(reduced||e.pointerType==='touch')return;const r=b.getBoundingClientRect();b.style.setProperty('--pointer',(e.clientX-r.left)/r.width);});b.addEventListener('pointerleave',()=>b.style.removeProperty('--pointer'));});
mountInfra();
window.TBTX={open,close,closeAll,startDDD,state,escape,media,score,chooseGallery,bindDialog};window.reviewScore=score;window.reviewState=state;
})();
