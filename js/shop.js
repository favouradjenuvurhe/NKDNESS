/* Product page, cart, saved items, search helpers and checkout. */
// product page, cart, checkout
let cart=[];try{cart=JSON.parse(localStorage.getItem('nk-cart')||'[]')}catch(e){}
const save=()=>{try{localStorage.setItem('nk-cart',JSON.stringify(cart))}catch(e){}};
const wIdx=(k,c)=>W_.findIndex(w=>w[5]===k&&w[6]===c);
const count=()=>cart.reduce((a,l)=>a+l.q,0),total=()=>cart.reduce((a,l)=>a+l.q*PR[l.k].price,0);
function badge(){const n=count();$('cb').textContent=n;$('cb').style.display=n?'grid':'none'}badge();
cart=cart.filter(l=>PR[l.k]&&wIdx(l.k,l.c)>=0);
let curW=0,pick={k:'',s:0,q:1},drKind='';
let wish=[],lastMsg='',lf='all';try{wish=JSON.parse(localStorage.getItem('nk-wish')||'[]')}catch(e){}
const saveWish=()=>{try{localStorage.setItem('nk-wish',JSON.stringify(wish))}catch(e){}};
function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),1800)}
function toggleWish(wi){const w=W_[wi],key=w[5]+'|'+w[6],had=wish.includes(key);wish=had?wish.filter(x=>x!==key):wish.concat(key);saveWish();fill(wi);toast(had?'Removed from saved':'Saved')}
function share(){const w=W_[curW],d={title:w[0]+' – NKDNESS®',url:STORE.site};if(navigator.share)navigator.share(d).catch(()=>{});else{try{navigator.clipboard.writeText(d.url);toast('Link copied')}catch(e){toast(d.url)}}}
function openW(wi){drClose();if($('detail').classList.contains('open')){pick.k='';fill(wi);$('detail').scrollTop=0;return}setView(true);document.body.classList.remove('atHero');const i=SEQ.findIndex(o=>o.w===wi);target=i;pos=i;setTimeout(()=>openP(i),60)}
function rowHTML(i){const w=W_[i],p=PR[w[5]];return `<button data-open="${i}" class="row"><div class="w-14 shrink-0">${art(w[4])}</div><div class="text-left"><b class="cd font-semibold block">${w[0]}</b><span class="text-xs" style="color:var(--mute)">${w[1]}</span></div><div class="cd text-sm text-right">${p.was?`<s style="color:var(--mute)">${NG(p.was)}</s><br>`:''}${NG(p.price)}</div></button>`}
function srHTML(q){q=(q||'').trim().toLowerCase();const r=W_.map((w,i)=>i).filter(i=>!q||(W_[i][0]+' '+W_[i][1]).toLowerCase().includes(q));return r.length?r.map(rowHTML).join(''):'<p style="color:var(--mute)">Nothing found. Try “polo” or “cap”.</p>'}
function orderText(no,f){const e=f.elements;return 'Order '+no+'\n'+cart.map(l=>l.q+' x '+PR[l.k].name+' ('+l.c+', '+l.s+') - '+NG(PR[l.k].price*l.q)).join('\n')+'\nTotal: '+NG(total())+'\nName: '+e.name.value.trim()+'\nPhone: '+e.phone.value.trim()+'\nEmail: '+e.email.value.trim()+'\nAddress: '+e.address.value.trim()+', '+e.city.value.trim()+', '+e.state.value+'\nPayment: '+e.pay.value+(e.note.value.trim()?'\nNote: '+e.note.value.trim():'')}
function orderBtns(m){let h='';if(STORE.wa)h+=`<a class="btn w mt-8 block" target="_blank" rel="noopener" href="https://wa.me/${STORE.wa}?text=${encodeURIComponent(m)}">Send order on WhatsApp</a>`;if(STORE.email)h+=`<a class="btn w mt-3 block" href="mailto:${STORE.email}?subject=${encodeURIComponent('New order')}&body=${encodeURIComponent(m)}">Email order</a>`;return h+'<button class="btn w mt-3" data-copy>Copy order details</button>'}
document.addEventListener('click',e=>{if(e.target.closest('[data-copy]')){try{navigator.clipboard.writeText(lastMsg);toast('Order copied')}catch(x){toast('Copy not available')}}});
function addLine(k,c,s,q){const x=cart.find(l=>l.k===k&&l.c===c&&l.s===s);x?x.q=Math.min(10,x.q+q):cart.push({k,c,s,q});save();badge()}
function add(){const w=W_[curW],p=PR[w[5]];addLine(w[5],w[6],p.sizes[pick.s],pick.q)}
function fill(wi){curW=wi;const w=W_[wi],p=PR[w[5]];
 if(pick.k!==w[5]){pick.s=p.sizes.length>1?1:0;pick.q=1}pick.k=w[5];
 $('dArt').innerHTML=art(w[4]);$('dK').textContent=p.coll;$('dT').textContent=p.name;
 $('dP').textContent=NG(p.price);$('dW').textContent=p.was?NG(p.was):'';$('dS').textContent=p.was?'Save '+NG(p.was-p.price):'';$('dS').style.display=p.was?'inline-block':'none';
 $('dD').textContent=p.blurb;$('dL').innerHTML=p.points.map(t=>`<li>${t}</li>`).join('');
 $('oC').innerHTML=p.colors.map(c=>`<button class="sw" data-c="${c}" aria-pressed="${c===w[6]}" aria-label="${c}" style="background:${SW[c]}"></button>`).join('');$('dCn').textContent=w[6];
 $('oS').innerHTML=p.sizes.map((t,i)=>`<button class="opt" aria-pressed="${pick.s===i}" data-s="${i}">${t}</button>`).join('');
 $('qn').textContent=pick.q;$('wishT').textContent=wish.includes(w[5]+'|'+w[6])?'Saved':'Save';$('add').textContent='Add to cart · '+NG(p.price*pick.q);
 $('more').innerHTML=W_.map((x,i)=>i).filter(i=>W_[i][5]!==w[5]).slice(0,3).map(i=>`<button data-w="${i}" class="text-left">${art(W_[i][4])}<span class="cd text-xs block mt-1">${W_[i][6]} ${PR[W_[i][5]].name.replace('The Nothing ','')}</span><span class="text-xs" style="color:var(--mute)">${NG(PR[W_[i][5]].price)}</span></button>`).join('')}
$('detail').addEventListener('click',e=>{const t=e.target;let b;
 if(b=t.closest('.sw'))fill(wIdx(pick.k,b.dataset.c));
 else if(b=t.closest('.opt')){pick.s=+b.dataset.s;fill(curW)}
 else if(t.closest('#qm')){pick.q=Math.max(1,pick.q-1);fill(curW)}
 else if(t.closest('#qp')){pick.q=Math.min(10,pick.q+1);fill(curW)}
 else if(t.closest('#add')){add();drOpen('cart')}
 else if(t.closest('#buy')){add();openCO()}
 else if(t.closest('#wish'))toggleWish(curW);
 else if(t.closest('#share'))share();
 else if(t.closest('#sg'))drOpen('size');
 else if(b=t.closest('[data-w]')){pick.k='';fill(+b.dataset.w);$('detail').scrollTop=0}});
function openP(i){const o=SEQ[i];sel=i;goal=1;target=i;moved=0;$('pill').style.opacity=0;pick.k='';fill(o.w)}
function totalsHTML(){const sv=cart.reduce((a,l)=>a+l.q*((PR[l.k].was||PR[l.k].price)-PR[l.k].price),0);
 return `<div class="text-sm mt-4 space-y-2"><div class="flex justify-between"><span>Subtotal</span><span>${NG(total())}</span></div>${sv?`<div class="flex justify-between" style="color:var(--mute)"><span>You saved</span><span>${NG(sv)}</span></div>`:''}<div class="flex justify-between"><span>Delivery</span><span style="color:var(--mute)">Confirmed after you order</span></div><div class="flex justify-between cd text-lg font-semibold pt-2"><span>Total</span><span>${NG(total())}</span></div></div>`}
function cartHTML(){if(!cart.length)return '<p style="color:var(--mute)">Your cart is empty.</p><button class="btn k mt-6 w" data-go="shop">Shop Collection 001</button>';
 return cart.map((l,i)=>{const p=PR[l.k],wi=wIdx(l.k,l.c);return `<div class="flex gap-3 py-4 border-b" style="border-color:var(--line)"><div class="w-20 shrink-0">${art(W_[wi][4])}</div><div class="flex-1"><b class="cd font-semibold">${p.name}</b><div class="text-xs" style="color:var(--mute)">${l.c} · ${l.s}</div><div class="flex items-center gap-3 mt-3"><div class="qty sm"><button data-l="${i}" data-d="-1" aria-label="Decrease">−</button><span>${l.q}</span><button data-l="${i}" data-d="1" aria-label="Increase">+</button></div><button class="text-xs underline" data-l="${i}" data-d="x">Remove</button></div></div><div class="cd text-sm text-right">${p.was?`<s style="color:var(--mute)">${NG(p.was*l.q)}</s><br>`:''}${NG(p.price*l.q)}</div></div>`}).join('')+totalsHTML()+'<button class="btn k mt-5 w" data-go="checkout">Checkout</button><button class="btn mt-3 w" data-go="index">Continue shopping</button>'}
function refreshCart(){if(drKind==='cart'&&document.body.classList.contains('dr'))drOpen('cart')}
$('drB').addEventListener('input',e=>{if(e.target.id==='srQ')$('srR').innerHTML=srHTML(e.target.value)});
$('drB').addEventListener('click',e=>{let o=e.target.closest('[data-open]');if(o){openW(+o.dataset.open);return}o=e.target.closest('[data-unsave]');if(o){wish=wish.filter(x=>x!==o.dataset.unsave);saveWish();drOpen('saved');return}const b=e.target.closest('[data-l]');if(!b)return;const i=+b.dataset.l,l=cart[i];if(!l)return;
 if(b.dataset.d==='x')cart.splice(i,1);else l.q=Math.max(1,Math.min(10,l.q+ +b.dataset.d));save();badge();refreshCart()});
// checkout
const STATES=['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT Abuja','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];
$('coState').innerHTML='<option value="">Select state</option>'+STATES.map(x=>`<option>${x}</option>`).join('');
function sumHTML(){return cart.map(l=>{const p=PR[l.k],wi=wIdx(l.k,l.c);return `<div class="flex gap-3 items-center py-3 border-b" style="border-color:var(--line)"><div class="relative w-14 shrink-0">${art(W_[wi][4])}<span class="qb">${l.q}</span></div><div class="flex-1 text-sm"><b class="cd font-semibold">${p.name}</b><br><span style="color:var(--mute)">${l.c} · ${l.s}</span></div><div class="cd text-sm">${NG(p.price*l.q)}</div></div>`}).join('')+totalsHTML()}
function openCO(){if(!cart.length){drOpen('cart');return}drClose();$('coSum').innerHTML=sumHTML();$('place').textContent='Place order · '+NG(total());$('coGrid').hidden=false;$('coDone').hidden=true;$('co').classList.add('open');$('co').scrollTop=0}
$('coBack').onclick=()=>{$('co').classList.remove('open');drOpen('cart')};
$('coForm').addEventListener('submit',e=>{e.preventDefault();const f=e.target;let bad=null;
 ['email','phone','name','address','city','state'].forEach(n=>{const el=f.elements[n],v=el.value.trim();let m='';
  if(!v)m='Required';else if(n==='email'&&!/^\S+@\S+\.\S+$/.test(v))m='Enter a valid email';else if(n==='phone'&&v.replace(/\D/g,'').length<10)m='Enter a valid phone number';
  el.setAttribute('aria-invalid',!!m);el.parentElement.querySelector('.er').textContent=m;if(m&&!bad)bad=el});
 if(bad){bad.focus();return}
 const no='NK-'+Date.now().toString().slice(-6),sum=sumHTML(),ph=f.elements.phone.value.trim(),msg=orderText(no,f);lastMsg=msg;
 $('coDone').innerHTML=`<p class="cd text-xs" style="color:var(--mute)">Order ${no}</p><h2 class="cd font-semibold leading-none mt-2" style="font-size:clamp(44px,12vw,84px)">Order placed</h2><p class="mt-4 text-lg">Thank you, ${f.elements.name.value.trim().split(' ')[0]}. We will contact you on ${ph} to confirm delivery and ${f.elements.pay.value.toLowerCase()} details.</p><div class="mt-8">${sum}</div>${orderBtns(msg)}<button class="btn k w mt-4" data-go="index">Continue shopping</button>`;
 $('coGrid').hidden=true;$('coDone').hidden=false;$('co').scrollTop=0;cart=[];save();badge();f.reset()});
function showDetail(){$('detail').classList.add('open');$('detail').setAttribute('aria-hidden','false');document.title=W_[SEQ[sel].w][0]+' – NKDNESS®';document.body.classList.add('dOpen')}
function closeP(){if(!goal)return;$('detail').classList.remove('open');$('detail').setAttribute('aria-hidden','true');goal=0;document.body.classList.remove('dOpen');document.title='NKDNESS® – Nothing but yourself.'}
