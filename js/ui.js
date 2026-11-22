/* Views (gallery / list), side drawers, navigation, hero and logo. */
// views and drawer
function setView(g){$('list').style.display=g?'none':'block';$('stage').style.visibility=$('cap').style.visibility=g?'visible':'hidden';$('vG').setAttribute('aria-pressed',g);$('vL').setAttribute('aria-pressed',!g)}
$('vG').onclick=()=>setView(true);$('vL').onclick=()=>setView(false);
function renderList(){const items=W_.map((w,i)=>i).filter(i=>lf==='all'||PR[W_[i][5]].coll===lf);
 $('list').innerHTML='<div class="chips !mt-0 mb-4">'+[['all','All'],['Collection 001','Collection 001'],['Collection 002','Collection 002']].map(([k,t])=>`<button data-f="${k}" aria-pressed="${lf===k}">${t}</button>`).join('')+'</div>'+items.map(rowHTML).join('')}
renderList();
$('list').onclick=e=>{const c=e.target.closest('[data-f]');if(c){lf=c.dataset.f;renderList();return}const o=e.target.closest('[data-open]');if(o)openW(+o.dataset.open)};
const DR={menu:['Menu','<div class="grid gap-4">'+[['index','Index'],['work','Collection'],['info','Story'],['services','Philosophy'],['contact','Contact']].map(([k,t])=>`<button class="cd text-4xl font-semibold text-left" data-go="${k}">${t}</button>`).join('')+'</div>'],
 info:['NKDNESS®','<p class="cd text-lg font-semibold">Nothing but yourself.</p><p class="mt-3">NKDNESS is a contemporary fashion label built around individuality, simplicity and self-expression.</p><p class="mt-3">Inspired by the idea of being unapologetically yourself, we believe fashion doesn’t always need to be loud to make a statement.</p><p class="mt-3">Our approach is simple: clean aesthetics, everyday essentials and clothing that allows personal identity to speak for itself.</p><p class="mt-3">We are not here to follow every trend. We are here to create our own expression of style.</p><p class="lbl">Releases</p><p>Collection 001: The Nothing Polo Series<br>Collection 002: The Nothing Truck Cap</p>'],
 services:['Philosophy','<p class="lbl !mt-0">Our philosophy</p><p>Be yourself. Wear what represents you. Nothing extra.</p><p class="lbl">Our identity</p><p>Minimal. Confident. Unfiltered.</p><p class="lbl">Our first release</p><p>Collection 001: The Nothing Polo Series.</p>'],
 contact:['Contact','<p class="cd text-lg font-semibold">NKDNESS®</p><p class="mt-2"><a class="underline" href="https://wearnkdness.store" target="_blank" rel="noopener">wearnkdness.store</a></p><p class="lbl">How it works</p><details class="acc"><summary>How do I order?</summary><p class="mt-2" style="color:var(--mute)">Add a piece to your cart, then check out. We confirm delivery and payment with you after you order.</p></details><details class="acc"><summary>Which sizes are there?</summary><p class="mt-2" style="color:var(--mute)">The polo comes in S to XXL. The truck cap is one size with an adjustable snap back.</p></details><details class="acc"><summary>What is coming next?</summary><p class="mt-2" style="color:var(--mute)">Collection 003 and accessories are on the way.</p></details>'],
 size:['Size guide','<p>The polo runs S to XXL in a relaxed, boxy cut. If you are between sizes, go up for a roomier fit.</p><p class="mt-3">The Nothing Truck Cap is one size with an adjustable snap back.</p>'],
 search:['Search','<input id="srQ" class="fld" placeholder="Search polo, cap, black, red" aria-label="Search" autocomplete="off"><div id="srR" class="mt-3">'+'</div>'],
 saved:()=>['Saved ('+wish.length+')',wish.length?wish.map(key=>{const[k,c]=key.split('|'),i=wIdx(k,c);return i<0?'':rowHTML(i)+`<button class="text-xs underline pb-3" data-unsave="${key}">Remove</button>`}).join(''):'<p style="color:var(--mute)">Nothing saved yet. Tap Save on any product.</p>'],
 cart:()=>['Cart ('+count()+')',cartHTML()]};
function drOpen(k){drKind=k;const d=typeof DR[k]==='function'?DR[k]():DR[k];$('drT').textContent=d[0];$('drB').innerHTML=d[1];document.body.classList.add('dr');if(k==='search'){$('srR').innerHTML=srHTML('');setTimeout(()=>$('srQ').focus(),350)}}
function drClose(){document.body.classList.remove('dr')}
$('drX').onclick=$('scrim').onclick=drClose;
document.addEventListener('click',e=>{const a=e.target.closest('[data-go]');if(!a)return;e.preventDefault();const k=a.dataset.go;
 const go=i=>{drClose();$('co').classList.remove('open');closeP();setView(true);document.body.classList.remove('atHero');target=i};
 if(k==='index'){drClose();$('co').classList.remove('open');closeP();setView(true);enter()}
 else if(k==='work'){drClose();closeP();setView(false);document.body.classList.remove('atHero')}
 else if(k==='shop')go(3);else if(k==='cap')go(6);else if(k==='checkout')openCO();else drOpen(k)});
function enter(){const was=document.body.classList.contains('atHero');document.body.classList.remove('atHero');if(was){target=2;const h=$('hint');h.classList.add('on');setTimeout(()=>h.classList.remove('on'),6500)}}
$('hp').innerHTML=[0,1,3].map(i=>art(W_[i][4])).join('');
$('enter').onclick=enter;
$('back').onclick=closeP;
$('openB').onclick=()=>{const i=clamp(Math.round(pos),0,N-1);if(!SEQ[i].c)openP(i)};
$('hero').addEventListener('wheel',e=>{if(e.deltaY>10)enter()},{passive:true});
let hy=null;$('hero').addEventListener('pointerdown',e=>hy=e.clientY);$('hero').addEventListener('pointerup',e=>{if(hy!==null&&hy-e.clientY>40)enter();hy=null});
addEventListener('keydown',e=>{if(document.body.classList.contains('atHero')&&['ArrowDown','ArrowRight'].includes(e.key)&&document.activeElement.tagName!=='INPUT')enter()});
$('logo').onclick=()=>{drClose();closeP();setView(true);document.body.classList.add('atHero');target=-1.5};
