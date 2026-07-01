let grammar=[],vocab=[];
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

Promise.all([fetch('data/grammar.json').then(r=>r.json()),fetch('data/vocabulary.json').then(r=>r.json())]).then(([g,v])=>{
 grammar=g; vocab=v; renderHome(); renderGrammar();
});

function renderHome(){
 $('#recentGrammar').innerHTML=grammar.map(g=>`<article class="miniCard" data-id="${g.id}"><div class="reading">${g.reading}</div><h3>${g.title}</h3><p class="meaning">${g.purpose}</p><span class="tag">${g.category.jp}（${g.category.kana}）</span></article>`).join('');
 $('#vocab').innerHTML=vocab.map(w=>`<article class="word"><h3>${w.kanji}</h3><div class="reading">${w.kana}</div><p>${w.cn}</p><p class="meaning">${w.example}</p></article>`).join('');
}

function renderGrammar(){
 $('#grammarList').innerHTML=grammar.map(g=>`<article class="glass grammarCard" data-id="${g.id}">
 <div class="reading">${g.reading}</div><h2>${g.title}</h2><p class="meaning">${g.purpose}</p>
 <span class="tag">${g.category.jp}（${g.category.kana}） · ${g.jlpt}</span>
 <div class="sectionTitle">接続（せつぞく）</div>
 ${g.patterns.map(p=>`<div class="pattern"><b>${p.form}</b><div class="reading">${p.reading}</div><p>${p.meaning}</p></div>`).join('')}
 </article>`).join('');
}

document.addEventListener('click',e=>{
 const nav=e.target.closest('.nav'); if(nav){$$('.nav').forEach(x=>x.classList.remove('active'));nav.classList.add('active');$$('.view').forEach(v=>v.classList.remove('active'));$('#'+nav.dataset.view).classList.add('active');scrollTo(0,0)}
 const open=e.target.closest('[data-open]'); if(open){document.querySelector(`.nav[data-view="${open.dataset.open}"]`).click()}
 const card=e.target.closest('[data-id]'); if(card){openCard(card.dataset.id)}
 const sp=e.target.closest('.speak'); if(sp){speak(sp.dataset.text)}
});
$('#close').onclick=()=>$('#modal').classList.remove('show');
$('#modal').onclick=e=>{if(e.target.id==='modal')$('#modal').classList.remove('show')};

function openCard(id){
 const g=grammar.find(x=>x.id===id); if(!g)return;
 $('#modalBody').innerHTML=`<div class="reading">${g.reading}</div><h1>${g.title}</h1><p class="meaning">${g.purpose}</p><span class="tag">${g.category.jp}（${g.category.kana}） · ${g.jlpt}</span>
 <div class="sectionTitle">接続（せつぞく）</div>${g.patterns.map(p=>`<div class="pattern"><b>${p.form}</b><div class="reading">${p.reading}</div><p>${p.meaning}</p><p><b>例文：</b>${p.example}</p><p class="meaning">${p.cn}</p><button class="speak" data-text="${stripRuby(p.example)}">▶ 聞く</button></div>`).join('')}
 <div class="sectionTitle">💡 どうして？</div><p>${g.why}</p>
 <div class="sectionTitle">ニュアンス</div><p>${g.nuance}</p>
 <div class="sectionTitle">よくある間違い</div><ul>${g.mistakes.map(m=>`<li>${m}</li>`).join('')}</ul>
 <div class="sectionTitle">今日のOutput</div><p>${g.output}</p>
 <div class="sectionTitle">Knowledge Graph</div><div class="graph">${g.connections.map(c=>`<div class="node"><b>${c.type}</b>${c.label}<div class="reading">${c.kana}</div><p class="meaning">${c.note}</p></div>`).join('')}</div>`;
 $('#modal').classList.add('show');
}
function stripRuby(t){return t.replace(/（.*?）/g,'')}
function speak(t){ if(!('speechSynthesis' in window)) return; speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(t); u.lang='ja-JP'; u.rate=.86; speechSynthesis.speak(u)}
