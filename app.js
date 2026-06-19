document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('keydown',e=>{if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&e.key==='I'))e.preventDefault()});
if('serviceWorker'in navigator){navigator.serviceWorker.register('./sw.js')}
const aud={clk:new Audio('https://actions.google.com/sounds/v1/ui/button_click.ogg'),pop:new Audio('https://actions.google.com/sounds/v1/ui/pop.ogg')};
const emj={like:"👍",love:"❤️",haha:"😆",wow:"😮",sad:"😢",angry:"😡"};
let db,myPr={id:"me",n:"User",b:"",w:"",r:"Single",a:"",c:""},memPosts=[],hdPsts=JSON.parse(localStorage.getItem('ny_hdn')||'[]'),actPrf='me',curTab=0;
const rq=indexedDB.open("NyDB",2);
rq.onupgradeneeded=e=>{db=e.target.result;['ps','pr','sys'].forEach(s=>{if(!db.objectStoreNames.contains(s))db.createObjectStore(s,{keyPath:"id"})})};
rq.onsuccess=e=>{db=e.target.result;init()};
function vb(){if(navigator.vibrate)navigator.vibrate([15])}
function ts(m){const t=document.getElementById('tst');t.innerText=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2000)}
async function dbP(s,d){return new Promise(r=>{const tx=db.transaction(s,"readwrite");tx.objectStore(s).put(d);tx.oncomplete=()=>r()})}
async function dbG(s){return new Promise(r=>{const tx=db.transaction(s,"readonly");const rq=tx.objectStore(s).getAll();rq.onsuccess=()=>r(rq.result)})}
async function init(){
const pr=await dbG("pr");if(pr.length){const m=pr.find(x=>x.id==="me");if(m)myPr=m}
const p=await dbG("ps");memPosts=p.sort((a,b)=>b.ts-a.ts);
if(!memPosts.length){
const sysP={id:"sys1",authorId:"sys",authorName:"Nyttory",authorAvatar:"N",text:"ยินดีต้อนรับสู่ Nyttory เวอร์ชั่นอัปเกรดที่เร็วและลื่นไหลกว่าเดิม!",ts:Date.now(),reactions:{like:0,love:0,haha:0,wow:0,sad:0,angry:0},comments:[]};
memPosts.push(sysP);await dbP("ps",sysP);
}
uPr();rF();
}
function sT(t){
document.querySelectorAll('.view').forEach(x=>x.classList.remove('on'));
document.querySelectorAll('.ni').forEach(x=>x.classList.remove('on'));
document.getElementById('v'+t).classList.add('on');
document.getElementById('t'+t).classList.add('on');
actPrf='me';if(t==='F')rF();
}
function vwPrf(id){
actPrf=id;sT('P');
document.getElementById('prN').value=myPr.n;
document.getElementById('prB').value=myPr.b;
document.getElementById('prW').value=myPr.w;
document.getElementById('prR').value=myPr.r;
rUFeed(id);
}
document.getElementById('sPrBtn').onclick=async()=>{
vb();aud.clk.play();
myPr.n=document.getElementById('prN').value||"User";
myPr.b=document.getElementById('prB').value;
myPr.w=document.getElementById('prW').value;
myPr.r=document.getElementById('prR').value;
await dbP("pr",myPr);uPr();rF();rUFeed(actPrf);ts("บันทึกโปรไฟล์เรียบร้อย!");
};
function uPr(){document.getElementById('fAv').innerText=myPr.n.charAt(0).toUpperCase()}
document.getElementById('pBtn').onclick=async()=>{
const v=document.getElementById('pInp').value.trim();if(!v)return;
vb();aud.clk.play();
const np={id:"p_"+Date.now(),authorId:"me",authorName:myPr.n,authorAvatar:myPr.n.charAt(0).toUpperCase(),text:v,ts:Date.now(),reactions:{like:0,love:0,haha:0,wow:0,sad:0,angry:0},comments:[]};
memPosts.unshift(np);await dbP("ps",np);
document.getElementById('pInp').value="";
rF();if(actPrf==='me')rUFeed('me');
};
window.tgO=id=>{
const m=document.getElementById('opt_'+id);
const isO=m.classList.contains('show');
document.querySelectorAll('.opt-menu').forEach(x=>x.classList.remove('show'));
if(!isO)m.classList.add('show');
};
window.hP=id=>{
if(confirm("โพสต์นี้จะถูกซ่อนและคุณจะไม่เห็นมันอีกเลย ยืนยันหรือไม่?")){
hdPsts.push(id);localStorage.setItem('ny_hdn',JSON.stringify(hdPsts));
const d=document.getElementById('dom_'+id);if(d)d.style.display='none';
}
};
window.dP=async id=>{
if(confirm("ลบโพสต์นี้หรือไม่?")){
memPosts=memPosts.filter(x=>x.id!==id);
db.transaction("ps","readwrite").objectStore("ps").delete(id);
const d=document.getElementById('dom_'+id);if(d)d.style.display='none';
}
};
window.eP=async id=>{
const p=memPosts.find(x=>x.id===id);
const nt=prompt("แก้ไขโพสต์:",p.text);
if(nt&&nt!==p.text){p.text=nt;await dbP("ps",p);rF();if(actPrf==='me')rUFeed('me');}
};
window.tgR=id=>{
const m=document.getElementById('rx_'+id);
const isO=m.classList.contains('show');
document.querySelectorAll('.r-box').forEach(x=>x.classList.remove('show'));
if(!isO)m.classList.add('show');
};
window.sR=async(id,k)=>{
vb();aud.pop.play();
const p=memPosts.find(x=>x.id===id);if(!p)return;
p.reactions[k]++;await dbP("ps",p);
document.getElementById('rx_'+id).classList.remove('show');
updD(id,p);
};
window.tgC=id=>{
const c=document.getElementById('cs_'+id);
c.classList.toggle('show');
};
window.aC=async id=>{
const i=document.getElementById('ci_'+id),v=i.value.trim();if(!v)return;
vb();aud.clk.play();
const p=memPosts.find(x=>x.id===id);if(!p)return;
p.comments.push({id:"c_"+Date.now(),authorName:myPr.n,text:v,ts:Date.now()});
i.value="";await dbP("ps",p);
updD(id,p);
};
function updD(id,p){
const d=document.getElementById('dom_'+id);if(!d)return;
const tr=Object.values(p.reactions).reduce((a,b)=>a+b,0);
d.querySelector('.rcnt').innerText=`${tr} รีแอคชัน`;
d.querySelector('.ccnt').innerText=`${p.comments.length} คอมเมนต์`;
const cl=d.querySelector('.c-list');
cl.innerHTML=p.comments.map(c=>`<div class="c-item"><div class="av" style="width:30px;height:30px;font-size:12px">${c.authorName.charAt(0)}</div><div class="c-box"><b>${c.authorName}</b><br>${c.text}</div></div>`).join('');
}
function gPH(p){
if(hdPsts.includes(p.id))return'';
const isM=p.authorId===myPr.id;
const tr=Object.values(p.reactions).reduce((a,b)=>a+b,0);
const svgD=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>`;
const svgL=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>`;
const svgC=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
return`
<div class="card" id="dom_${p.id}">
<div class="p-hdr">
<div class="av">${p.authorAvatar}</div>
<div class="p-info"><b>${p.authorName}</b><br><span>${new Date(p.ts).toLocaleString()}</span></div>
<div class="p-opts" onclick="tgO('${p.id}')">${svgD}</div>
<div class="opt-menu" id="opt_${p.id}">
${isM?`<div class="opt-i" onclick="eP('${p.id}')">แก้ไขโพสต์</div><div class="opt-i" onclick="dP('${p.id}')">ลบโพสต์</div>`:`<div class="opt-i" onclick="hP('${p.id}')">ซ่อนโพสต์นี้</div>`}
</div>
</div>
<div class="p-txt">${p.text}</div>
<div style="font-size:12px;color:var(--sub);margin-bottom:10px"><span class="rcnt">${tr} รีแอคชัน</span> • <span class="ccnt">${p.comments.length} คอมเมนต์</span></div>
<div class="react-bar">
<div class="r-btn" onclick="tgR('${p.id}')">${svgL} ถูกใจ</div>
<div class="r-btn" onclick="tgC('${p.id}')">${svgC} คอมเมนต์</div>
<div class="r-box" id="rx_${p.id}">
${Object.keys(emj).map(k=>`<div class="r-emoji" onclick="sR('${p.id}','${k}')">${emj[k]}</div>`).join('')}
</div>
</div>
<div class="c-sec" id="cs_${p.id}">
<div class="c-list">
${p.comments.map(c=>`<div class="c-item"><div class="av" style="width:30px;height:30px;font-size:12px">${c.authorName.charAt(0)}</div><div class="c-box"><b>${c.authorName}</b><br>${c.text}</div></div>`).join('')}
</div>
<div style="display:flex;gap:10px;margin-top:10px">
<input type="text" class="inp" id="ci_${p.id}" placeholder="เขียนคอมเมนต์...">
<button class="btn" style="width:auto" onclick="aC('${p.id}')">ส่ง</button>
</div>
</div>
</div>
`;
}
function rF(){
const c=document.getElementById('fCon');
const v=document.getElementById('shInp').value.toLowerCase();
const d=memPosts.filter(x=>x.text.toLowerCase().includes(v));
c.innerHTML=d.map(gPH).join('');
}
function rUFeed(id){
const c=document.getElementById('uFCon');
const d=memPosts.filter(x=>x.authorId===id);
c.innerHTML=d.length?d.map(gPH).join(''):'<div style="text-align:center;color:var(--sub);padding:20px">ไม่มีโพสต์</div>';
}
document.getElementById('shInp').addEventListener('input',rF);
document.addEventListener('click',e=>{
if(!e.target.closest('.p-opts')&&!e.target.closest('.opt-menu'))document.querySelectorAll('.opt-menu').forEach(x=>x.classList.remove('show'));
if(!e.target.closest('.r-btn')&&!e.target.closest('.r-box'))document.querySelectorAll('.r-box').forEach(x=>x.classList.remove('show'));
});