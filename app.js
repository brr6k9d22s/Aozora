fetch('data/grammar.json').then(r=>r.json()).then(data=>{
const g=data[0];
document.getElementById('grammar').innerHTML=
`<span class="badge">${g.purpose}</span>
<h3>${g.grammar}</h3>
<p><b>接続</b><br>${g.connection.join("<br>")}</p>
<p><b>意味</b><br>${g.meaning.map(x=>x.pattern+"："+x.text).join("<br>")}</p>
<p><b>例文</b><br>${g.example.jp}<br><small>${g.example.cn}</small></p>
<p><b>💡 Why</b><br>${g.why}</p>`;});