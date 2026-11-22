/* The 3D curved gallery room: layout, scrolling, dragging, zoom into a piece. */
// world: items hang on a cylinder wall; camera sits just inside the front of it
const Rr=1300,C=1260,B=440;let Yb=850,Ht=686,Yf=1000,GAP=260,S=[0];
const stage=document.getElementById('stage'),ring=document.getElementById('ring'),$=id=>document.getElementById(id);
let W,H,f,cy,m=1;const els=[];
SEQ.forEach((o,i)=>{const b=document.createElement('button');b.className='item'+(o.c?' card'+(o.c[2]?' soon':''):'');
 if(o.c){b.innerHTML=`<b>${o.c[0]}</b><span>${o.c[1]}</span>`;b.tabIndex=-1;b.setAttribute('aria-label',o.c[0])}
 else{const w=W_[o.w];b.innerHTML=art(w[4],w[3],o.w);b.setAttribute('aria-label',w[0]+', '+w[1]);o.land=w[3]==1}
 ring.appendChild(b);els.push(b)});
const N=SEQ.length;
function size(){W=innerWidth;H=innerHeight;f=Math.max(W*.55,H*.45);cy=H*.45;m=W<700?2.3:W<1100?1:1.15;GAP=W<700?150:260;Yb=850+(m-1)*280;Ht=686+(m-1)*200;Yf=Yb+150;
 stage.style.perspective=f+'px';ring.style.top=(cy/H*100)+'%';S=[0];
 els.forEach((b,i)=>{const L=SEQ[i].land,w=(L?B*1.3:B)*m,h=(L?B*.98:B*1.333)*m;b.style.width=w+'px';b.style.height=h+'px';b.style.left=-w/2+'px';b.style.top=-h+'px';b._h=h;b._w=w;if(b.classList.contains('card'))b.style.fontSize=(w/390)+'px';if(i)S[i]=S[i-1]+(els[i-1]._w+w)/2+GAP});
 const sx=d=>0,pts=[];for(let a=-118;a<=118;a+=3){const r=a*Math.PI/180,d=C+Rr*Math.cos(r),x=Rr*Math.sin(r);pts.push([W/2+f*x/d,d])}
 const room=$('room');room.setAttribute('viewBox',`0 0 ${W} ${H}`);
 const top=pts.map(p=>`${p[0].toFixed(1)},${(cy-f*Ht/p[1]).toFixed(1)}`),bot=pts.map(p=>`${p[0].toFixed(1)},${(cy+f*Yf/p[1]).toFixed(1)}`);
 $('ceil').setAttribute('d',`M${pts[0][0]},0L${pts[pts.length-1][0]},0L`+top.slice().reverse().join('L')+'Z');
 $('floor').setAttribute('d',`M${pts[0][0]},${H}L${pts[pts.length-1][0]},${H}L`+bot.slice().reverse().join('L')+'Z')}
addEventListener('resize',size);size();

let pos=-1.5,target=-1.5,dolly=0,goal=0,sel=null,dragging=false,moved=0,lx=0,hov=null,idle;
const snap=()=>{if(!goal)target=clamp(Math.round(target),0,N-1)};
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
function Sof(p){const n=N-1;if(p<=0)return p*(S[1]-S[0]);if(p>=n)return S[n]+(p-n)*(S[n]-S[n-1]);const i=Math.floor(p);return S[i]+(p-i)*(S[i+1]-S[i])}
function layout(){const near=clamp(Math.round(pos),0,N-1),sp=Sof(pos);
 els.forEach((b,i)=>{const r=(S[i]-sp)/Rr,th=r*180/Math.PI,d=C+Rr*Math.cos(r),x=Rr*Math.sin(r);
  const isSel=sel===i;let op=1;if(dolly>0.02&&!isSel)op=Math.max(0,1-dolly*2);
  if(Math.abs(th)>118||d<250)op=0;
  b.style.opacity=op;b.style.visibility=op?'visible':'hidden';b.style.zIndex=Math.round(5000-d);
  b.style.pointerEvents=(op>.5&&dolly<.02)?'auto':'none';
  b.style.transform=`translate3d(${x}px,${Yb}px,${f-d}px) rotateY(${-th}deg)`});
 const hh=sel!==null?els[sel]._h:0,dz=hh?(C+Rr)-f/(H*.6/hh):0,dy=hh?Yb-hh/2:0;ring.style.transform=`translate3d(0,${-dolly*dy}px,${dolly*dz}px)`;
 const o=SEQ[near],pp=o.c?null:PR[W_[o.w][5]],t=o.c?o.c[0]:W_[o.w][0],s=o.c?o.c[1]:NG(pp.price)+(pp.was?'  (was '+NG(pp.was)+')':'');
 if($('capT').textContent!==t||$('capS').textContent!==s){$('capT').textContent=t;$('capS').textContent=s;$('openB').style.display=o.c?'none':'inline-block'}
 $('cap').style.opacity=1-dolly}
function tick(){pos+=(target-pos)*.08;if(Math.abs(target-pos)<.001)pos=target;
 if(sel!==null&&goal===1&&Math.abs(pos-sel)<.08){dolly+=(1-dolly)*.07;if(dolly>.985&&!$('detail').classList.contains('open'))showDetail()}
 if(goal===0&&dolly>0){dolly+=(0-dolly)*.12;if(dolly<.01){dolly=0;sel=null}}
 layout();requestAnimationFrame(tick)}tick();

stage.addEventListener('wheel',e=>{e.preventDefault();if(goal)return;target=clamp(target+(e.deltaY+e.deltaX)*.0033,-.6,N-.4);clearTimeout(idle);idle=setTimeout(snap,170)},{passive:false});
stage.addEventListener('pointerdown',e=>{dragging=true;moved=0;lx=e.clientX});
addEventListener('pointermove',e=>{$('cur').style.transform=$('pill').style.transform=`translate(${e.clientX}px,${e.clientY}px)`;$('pill').style.transform=`translate(${e.clientX+12}px,${e.clientY+10}px)`;
 if(dragging&&!goal){const dx=e.clientX-lx;lx=e.clientX;moved+=Math.abs(dx);target=clamp(target-dx/(innerWidth<700?170:230),-.6,N-.4)}});
addEventListener('pointerup',()=>{if(dragging){dragging=false;snap()}});
ring.addEventListener('pointerover',e=>{const b=e.target.closest('.item');const on=b&&!b.classList.contains('card');$('pill').style.opacity=on?1:0;$('cur').classList.toggle('on',!!on)});
ring.addEventListener('pointerleave',()=>{$('pill').style.opacity=0;$('cur').classList.remove('on')});
ring.addEventListener('click',e=>{const b=e.target.closest('.item');if(!b||moved>6)return;const i=els.indexOf(b);
 if(SEQ[i].c){target=i;return}openP(i)});
addEventListener('keydown',e=>{
 if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();drOpen('search');return}
 if(e.key==='Escape'){if($('co').classList.contains('open')){$('co').classList.remove('open');return}if(document.body.classList.contains('dr'))drClose();else closeP();return}
 if(document.activeElement.tagName==='INPUT'||goal)return;
 if(e.key==='ArrowRight')target=clamp(Math.round(target)+1,0,N-1);if(e.key==='ArrowLeft')target=clamp(Math.round(target)-1,0,N-1)});
