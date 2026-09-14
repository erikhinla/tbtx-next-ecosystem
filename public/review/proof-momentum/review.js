(function () {
'use strict';
const $ = (s) => document.querySelector(s);
const root = $('#experience');
const localMedia = location.protocol === 'file:' || ['localhost','127.0.0.1','[::1]'].includes(location.hostname);
function mediaAddress(value){const filename=value.split('/').pop();return localMedia?value:(window.REVIEW_MEDIA?.[filename]||value);}
document.querySelectorAll('[data-film-src]').forEach(v=>{v.src=mediaAddress(v.dataset.filmSrc);});
root.querySelectorAll('[data-sc-src]').forEach(v=>{v.dataset.scSrc=mediaAddress(v.dataset.scSrc);});
const params = new URLSearchParams(location.search);
const manualReduce = params.get('motion') === 'reduced';
const reduced = manualReduce || matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduced) {
 document.documentElement.classList.add('manual-reduce');
 root.querySelectorAll('video[data-sc-scrub]').forEach(v => v.remove());
 root.querySelectorAll('[data-sc-parallax]').forEach(el => el.removeAttribute('data-sc-parallax'));
}
// Short screens use ordinary flow so the artwork and invitation remain readable.
if (matchMedia('(max-width: 800px), (max-height: 700px)').matches) $('#proof').setAttribute('data-sc-act','flow');
if (reduced) root.querySelectorAll('[data-sc-act=pin], [data-sc-act=pan], [data-sc-act=scrub]').forEach(el=>el.setAttribute('data-sc-act','flow'));
// This is the repository's actual Scrollcraft runtime, mounted on authored HTML.
window.reviewScrollcraft = window.ScrollCraft.mount(root);
$('#motion-toggle').textContent = reduced ? 'Motion reduced' : 'Reduce motion';
$('#motion-toggle').setAttribute('aria-pressed',String(reduced));
$('#motion-toggle').onclick = () => { const u = new URL(location.href); if(manualReduce)u.searchParams.delete('motion');else u.searchParams.set('motion','reduced');location.href=u.href; };
const state = { gate:false, lane:null, step:0, selections:[], personalComplete:false, businessSelections:Array(15).fill(null) };
function go(id) { $(id).scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'}); }
function setGate(choice){
 state.gate=choice==='up';
 document.querySelectorAll('[data-choice]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.choice===choice)));
 document.querySelectorAll('.door').forEach(el=>el.disabled=!state.gate);
 $('#gate-status').textContent=state.gate?'I’m in. I can choose my day or my business.':choice==='out'?'I can leave here. Entry remains closed.':'I can stay with the story. Entry remains closed.';
 $('#route-status').textContent=state.gate?'My day and my business use separate questions and calculations.':'Choose Stand up to enter either path.';
 if(state.gate)go('#routes');
}
document.querySelectorAll('[data-choice]').forEach(el=>el.onclick=()=>setGate(el.dataset.choice));
function closeDialog(id){$('#'+id).querySelectorAll('video').forEach(v=>v.pause());$('#'+id).close();}
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('close',()=>d.querySelectorAll('video').forEach(v=>v.pause())));
document.querySelectorAll('[data-close]').forEach(el=>el.onclick=()=>closeDialog(el.dataset.close));
function escapeText(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function score(lane,selections){
 const qs=window.REVIEW_QUESTIONS[lane];
 if(!qs || selections.length!==qs.length || qs.some((q,i)=>!Number.isInteger(selections[i])||!q.options[selections[i]])) return null;
 const values=selections.map((index,i)=>qs[i].options[index].value);
 const raw=values.reduce((a,b)=>a+b,0);const max=qs.length*2;const result=Math.round(100*raw/max);
 const band=lane==='personal'?(result<50?'Carrying it':'Clear enough'):result<25?'Fragmented':result<50?'Stalled':result<75?'Scaling':'Compounding';
 return {raw,max,result,band,values};
}
window.reviewScore=score;
function start(lane){if($('#proof-film-dialog').open)closeDialog('proof-film-dialog');if(!state.gate){$('#gate-status').textContent='Choose Stand up to enter the '+(lane==='business'?'Map.':'Scan.');go('#gate');return;}
 state.lane=lane;state.step=0;state.selections=Array(window.REVIEW_QUESTIONS[lane].length).fill(null);if(lane==='business'){state.businessSelections=Array(15).fill(null);updateAnswerRecord();$('#map-intro').showModal();return;}renderQuestion();$('#questionnaire').showModal();}
$('#begin-map').onclick=()=>{closeDialog('map-intro');renderQuestion();$('#questionnaire').showModal();};
document.querySelectorAll('[data-start]').forEach(el=>el.onclick=()=>start(el.dataset.start));
function renderQuestion(){
 const qs=window.REVIEW_QUESTIONS[state.lane],q=qs[state.step],selected=state.selections[state.step];
 $('#question-lane').textContent=(state.lane==='business'?'PROOF / Momentum Map':'Personal / Digital Fog Scan')+' · '+(state.step+1)+' of '+qs.length;
 $('#question-body').innerHTML='<h2 id="question-title">'+escapeText(q.text)+'</h2><p>Choose the answer closest to how things are today.</p><div class="answer-options" role="radiogroup" aria-labelledby="question-title">'+q.options.map((o,i)=>'<label class="answer-option"><input type="radio" name="answer" value="'+i+'" '+(i===selected?'checked':'')+'><span>'+escapeText(o.text)+'</span></label>').join('')+'</div><details><summary>Show the math</summary><p>Each answer has 0, 1 or 2 points. This '+(state.lane==='business'?'15-question Map':'8-question Scan')+' has a maximum of '+(qs.length*2)+'. I add the points, divide by '+(qs.length*2)+', multiply by 100 and round to the nearest whole number.</p><p>My selected answer: <span id="selected-points">'+(selected===null?'Choose an answer to see its points.':q.options[selected].value+' points')+'</span></p><p>All selected answers and values appear beside the result. This is an answer pattern, not measured health or productivity.</p></details><div class="q-nav"><button id="previous" '+(state.step===0?'disabled':'')+'>Back</button><button id="next" class="action" '+(selected===null?'disabled':'')+'>'+(state.step===qs.length-1?'See my starting point':'Next')+'</button></div>';
 document.querySelectorAll('input[name=answer]').forEach(el=>el.onchange=()=>{state.selections[state.step]=Number(el.value);if(state.lane==='business'){state.businessSelections=[...state.selections];updateAnswerRecord();}$('#next').disabled=false;$('#selected-points').textContent=q.options[Number(el.value)].value+' points';});
 $('#previous').onclick=()=>{if(state.step>0){state.step--;renderQuestion();focusQuestion();}};
 $('#next').onclick=()=>{if(state.selections[state.step]===null)return;if(state.step<qs.length-1){state.step++;renderQuestion();focusQuestion();}else renderResult();};
}
function focusQuestion(){const title=$('#question-title');title.tabIndex=-1;title.focus();$('#questionnaire').scrollTop=0;}
function renderResult(){const r=score(state.lane,state.selections);if(!r)return;if(state.lane==='personal'){state.personalComplete=true;$('#open-daily').textContent='Open my introduction ↗';}const qs=window.REVIEW_QUESTIONS[state.lane];
 $('#question-lane').textContent=state.lane==='business'?'PROOF / Initial Momentum Map':'Personal / Digital Fog Scan';
 $('#question-body').innerHTML='<span class="evidence-label">From my answers</span><h2 id="question-title">'+r.band+'</h2><p class="result-lead">'+(state.lane==='business'?'This is my overall answer pattern. A trace examines one recurring task before a cause or impact is called observed.':'This is a starting point for reflection. I can give one loose end a useful next step.')+'</p><details><summary>Show the math</summary><p class="calculation">round(100 × '+r.raw+' ÷ '+r.max+') = '+r.result+'</p><p>'+r.raw+' out of '+r.max+' points. '+(state.lane==='business'?'Fragmented: 0 to 24. Stalled: 25 to 49. Scaling: 50 to 74. Compounding: 75 to 100.':'Carrying it: 0 to 49. Clear enough: 50 to 100.')+'</p><p>Each question contributes at most 2 points. This score does not measure business health, productivity, hours lost or recovered momentum.</p><table class="math-table"><thead><tr><th scope="col">Question</th><th scope="col">My answer</th><th scope="col">Points</th></tr></thead><tbody>'+qs.map((q,i)=>'<tr><td>'+q.id+'. '+escapeText(q.text)+'</td><td>'+escapeText(q.options[state.selections[i]].text)+'</td><td>'+r.values[i]+'</td></tr>').join('')+'</tbody></table></details><p class="review-boundary">Question wording and values come from the existing website. This review calculates the answer score. It does not implement the PROOF pressure engine, accounts or live evidence collection.</p><div class="result-actions"><button class="action" id="result-next">'+(state.lane==='business'?'Explore PROOF Trace':'Explore Digital De-Fog Daily')+' ↗</button><button id="review-answers">Review my answers</button></div>';
 $('#result-next').onclick=()=>{closeDialog('questionnaire');if(state.lane==='business')go('#method');else $('#intro-dialog').showModal();};$('#review-answers').onclick=()=>{state.step=0;renderQuestion();focusQuestion();};focusQuestion();
}
$('#open-daily').onclick=()=>{if(!state.gate||!state.personalComplete){start('personal');return;}$('#intro-dialog').showModal();};
$('#intro-continue').onclick=()=>{closeDialog('intro-dialog');$('#daily-dialog').showModal();};
$('#clear-daily').onclick=()=>{$('#daily-form').reset();$('#daily-feedback').textContent='Entry cleared.';};
$('#daily-form').onsubmit=e=>{e.preventDefault();$('#daily-feedback').textContent='My next step in this preview:\n'+$('#next-step').value.trim();};
// Pause decoding while the page is not visible. Scrollcraft resumes its existing playhead on return.
document.addEventListener('visibilitychange',()=>{if(document.hidden)document.querySelectorAll('video').forEach(v=>v.pause());});
function updateAnswerRecord(){const qs=window.REVIEW_QUESTIONS.business;const answered=state.businessSelections.filter(v=>Number.isInteger(v)).length;const points=state.businessSelections.reduce((total,v,i)=>total+(Number.isInteger(v)?qs[i].options[v].value:0),0);$('#answer-record-status').textContent=answered+' of 15 answers recorded';$('#answer-marks').innerHTML=state.businessSelections.map((v,i)=>'<span class="'+(Number.isInteger(v)?'recorded':'')+'" data-question="'+qs[i].id+'"></span>').join('');$('#answer-record-points').textContent=answered?points+' points from '+answered+' answers. '+(answered===15?'All 15 answers are available in Show the math.':'The score waits for all 15.'):'The Map starts with my answers.';}
updateAnswerRecord();
document.querySelectorAll('[data-approved-film]').forEach(v=>v.addEventListener('error',()=>{v.nextElementSibling.hidden=false;}));
document.querySelectorAll('[data-recognize]').forEach(el=>el.onclick=()=>{state.recognizedTask=Number(el.dataset.recognize);start('business');});
document.querySelectorAll('.task-film, .approved-film').forEach(video=>video.addEventListener('play',()=>{document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();});}));
const taskVisibility=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)entry.target.pause();}),{threshold:0});document.querySelectorAll('.task-film').forEach(v=>taskVisibility.observe(v));
$('#play-proof-film').onclick=()=>{$('#proof-film-dialog').showModal();$('#proof-lead-film').play().catch(()=>{});};
window.reviewState=state;
})();
