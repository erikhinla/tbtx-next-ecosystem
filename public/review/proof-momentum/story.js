(() => {
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,portrait=$('#portrait');
const scenes=[
 ['The promise','AI created a job.','Nobody wanted it.'],
 ['The part between','Move the context. Chase the answer.','Check the output. Find the version. Reconnect the conversation.'],
 ['The person doing it','Part air traffic controller. Part librarian.','Occasionally, therapist for software.'],
 ['The lived experience','I’ve spent 20+ years getting work shipped.','Marketing operations. Project management. The people and handoffs in between.'],
 ['The turn','Now I’m building underneath it.','Three years learning and applying AI tools and systems. One year building this work.'],
 ['The foundation','Give the context somewhere to stay.','Give the next action an owner. Check what happened. Keep what helps.'],
 ['The reason','More room for what matters.','That’s what I’m here to build.']
];
let chapter=0,playing=false,timer=null,trigger=null,readMode=false,audio=null,master=null,soundOn=false;
const decks=[
 {title:'Architecting AI Momentum',count:15,file:'Architecting_AI_Momentum.pdf',note:'Working concept deck. Its model, pricing and outcome illustrations are not measured client results or a live offer.',notes:{5:'This slide shows a source-deck model. It is not the current Map scoring rule or a calibrated operational measurement.',11:'These are source-deck pricing concepts, not current offers or checkout prices.',13:'The supplied Google screenshot records program membership, not professional certification or endorsement.'}},
 {title:'FLOW Agent AS 2.0 · Operator Manual',count:13,file:'FLOW_AS_2.0_Operator_Manual.pdf',note:'Architecture archive. Agent assignments, model names and claims of live or autonomous operation are source-deck descriptions, not runtime verification.',notes:{}},
 {title:'Governed Execution',count:15,file:'Governed_Execution.pdf',note:'Working architecture deck. Original wording is preserved; current site copy uses PROOF Finder and Digital De-Fog Daily.',notes:{}},
 {title:'Governing AI Shadow Work',count:15,file:'Governing_AI_Shadow_Work.pdf',note:'Concept and research framing. Illustrations and diagnostic language are not a clinical diagnosis or measured client results.',notes:{12:'This slide records design principles from the deck; it does not describe a verified client result.'}}
];
let deck=0,page=0;
function background(){if(document.hidden||$$('dialog[open]').length||reduced)portrait.pause();else portrait.play().catch(()=>{});}
function show(id,source){trigger=source||document.activeElement;const d=$('#'+id);d.showModal();background();if(id==='manifesto'){chapter=0;readMode=false;$('#film-track').hidden=false;$('#film-prev').hidden=false;$('#film-next').hidden=false;$('#film-play').disabled=false;$('#transcript').hidden=true;$('#projection').hidden=false;$('#read-mode').textContent='Read instead';$('#read-mode').setAttribute('aria-pressed','false');renderScene();setPlaying(!reduced);}else d.querySelector('h2')?.focus({preventScroll:true});}
$$('[data-open]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.open,b)));
$$('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>d.addEventListener('close',()=>{if(d.id==='manifesto'){setPlaying(false);setSound(false);}background();trigger?.focus({preventScroll:true});}));
function tone(index){if(!soundOn||!audio||audio.state!=='running')return;const start=audio.currentTime;[110,164.81,220].forEach((hz,i)=>{const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=hz*Math.pow(2,(index%3)/12);g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(.035/(i+1),start+.25);g.gain.exponentialRampToValueAtTime(.0001,start+2.6);o.connect(g);g.connect(master);o.start(start);o.stop(start+2.7);o.onended=()=>{o.disconnect();g.disconnect();};});}
async function setSound(on){soundOn=on;$('#sound').setAttribute('aria-pressed',String(on));$('#sound').textContent=on?'Sound on':'Sound off';try{if(on){if(!audio){audio=new (window.AudioContext||window.webkitAudioContext)();master=audio.createGain();master.gain.value=.7;master.connect(audio.destination);}await audio.resume();tone(chapter);}else if(audio)await audio.suspend();}catch{soundOn=false;$('#sound').textContent='Sound unavailable';$('#sound').setAttribute('aria-pressed','false');}}
function setPlaying(on){playing=on&&!readMode;clearTimeout(timer);$('#film-play').textContent=playing?'Pause':chapter===scenes.length-1?'Replay':'Play';if(playing){if(soundOn&&audio?.state==='suspended')audio.resume().catch(()=>{});timer=setTimeout(()=>{if(chapter<scenes.length-1){chapter++;renderScene();setPlaying(true);}else{setPlaying(false);if(audio)audio.suspend().catch(()=>{});}},6500);}else if(audio)audio.suspend().catch(()=>{});}
function renderScene(){const [label,line,sub]=scenes[chapter];$('#scene-label').textContent=String(chapter+1).padStart(2,'0')+' / '+label;$('#scene-line').textContent=line;$('#scene-sub').textContent=sub;$('#film-prev').disabled=chapter===0;$('#film-next').disabled=chapter===scenes.length-1;$$('[data-chapter]').forEach(b=>b.setAttribute('aria-current',String(+b.dataset.chapter===chapter)));const projection=$('#projection');projection.classList.remove('arriving');void projection.offsetWidth;projection.classList.add('arriving');tone(chapter);}
function seek(n){chapter=Math.max(0,Math.min(scenes.length-1,n));renderScene();setPlaying(playing);}
$('#film-track').innerHTML=scenes.map((s,i)=>`<button data-chapter="${i}" aria-label="Chapter ${i+1}: ${s[0]}" aria-current="false"></button>`).join('');
$$('[data-chapter]').forEach(b=>b.onclick=()=>seek(+b.dataset.chapter));$('#film-prev').onclick=()=>seek(chapter-1);$('#film-next').onclick=()=>seek(chapter+1);$('#film-play').onclick=()=>{if(chapter===scenes.length-1&&!playing){chapter=0;renderScene();}setPlaying(!playing);};$('#sound').onclick=()=>setSound(!soundOn);
$('#transcript').insertAdjacentHTML('beforeend',scenes.map(s=>`<p><strong>${s[1]}</strong> ${s[2]}</p>`).join(''));
$('#read-mode').onclick=()=>{readMode=!readMode;setPlaying(false);$('#projection').hidden=readMode;$('#transcript').hidden=!readMode;$('#film-track').hidden=readMode;$('#film-play').disabled=readMode;$('#film-prev').hidden=readMode;$('#film-next').hidden=readMode;$('#read-mode').textContent=readMode?'Back to film':'Read instead';$('#read-mode').setAttribute('aria-pressed',String(readMode));};
function renderPage(){const d=decks[deck];const im=$('#deck-page');$('#page-error').hidden=true;im.src=`assets/studio/${deck}/page-${String(page+1).padStart(2,'0')}.jpg`;im.alt=`${d.title}, page ${page+1} of ${d.count}`;$('#page-select').value=String(page);$('#deck-prev').disabled=page===0;$('#deck-next').disabled=page===d.count-1;$('#deck-note').textContent=d.notes[page]||d.note;$('#reader-stage').scrollTo(0,0);}
$$('[data-deck]').forEach(b=>b.onclick=()=>{deck=+b.dataset.deck;page=0;const d=decks[deck];$('#reader-title').textContent=d.title;$('#page-select').innerHTML=Array.from({length:d.count},(_,i)=>`<option value="${i}">${i+1}</option>`).join('');$('#page-total').textContent='/ '+d.count;$('#deck-download').href='assets/studio/'+d.file;$('#reader-stage').classList.remove('zoomed');$('#zoom').setAttribute('aria-pressed','false');$('#zoom').textContent='Zoom in';renderPage();show('reader',b);});
$('#deck-page').onerror=()=>{$('#page-error').hidden=false;};$('#deck-prev').onclick=()=>{if(page>0){page--;renderPage();}};$('#deck-next').onclick=()=>{if(page<decks[deck].count-1){page++;renderPage();}};$('#page-select').onchange=e=>{page=+e.target.value;renderPage();};$('#zoom').onclick=()=>{const zoomed=$('#reader-stage').classList.toggle('zoomed');$('#zoom').setAttribute('aria-pressed',String(zoomed));$('#zoom').textContent=zoomed?'Fit page':'Zoom in';};
document.addEventListener('keydown',e=>{if(e.target.matches('select,input,textarea'))return;if($('#reader').open){if(e.key==='ArrowRight')$('#deck-next').click();if(e.key==='ArrowLeft')$('#deck-prev').click();}else if($('#manifesto').open&&!readMode){if(e.key==='ArrowRight')seek(chapter+1);if(e.key==='ArrowLeft')seek(chapter-1);}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){setPlaying(false);if(audio)audio.suspend().catch(()=>{});}background();});
if(!reduced){const wall=$('#wall');wall.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=wall.getBoundingClientRect();wall.style.setProperty('--light-x',100*(e.clientX-r.left)/r.width+'%');wall.style.setProperty('--light-y',100*(e.clientY-r.top)/r.height+'%');});}
background();
// Expose only compact playback state for local verification; no personal session data.
window.STUDIO={state:()=>({chapter,playing,soundOn,audioState:audio?.state||'not-created',deck,page,reduced})};
})();
