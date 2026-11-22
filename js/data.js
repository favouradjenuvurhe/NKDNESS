/* Products, prices, gallery order and the artwork helper.
   Prices are in Naira. was = the crossed-out price (use 0 for none). */
const IMG={'polo-white':'assets/images/polo-white.webp','polo-black':'assets/images/polo-black.webp','polo-red':'assets/images/polo-red.webp','cap-black':'assets/images/cap-black.webp','cap-red':'assets/images/cap-red.webp'};
const NG=n=>'₦'+n.toLocaleString('en-NG');
const SW={White:'#f4f4f1',Black:'#121212',Red:'#cf1a28'};
const PR={
 polo:{name:'The Nothing Polo',coll:'Collection 001',price:13000,was:15000,sizes:['S','M','L','XL','XXL'],colors:['White','Black','Red'],
  blurb:'The first piece in Collection 001. Plain, minimal and made for everyday wear, with nothing extra and nothing to prove.',
  points:['Clean, plain front with no prints','Relaxed, boxy fit','Available in white, black and red']},
 cap:{name:'The Nothing Truck Cap',coll:'Collection 002',price:8000,was:10000,sizes:['One size'],colors:['Red','Black'],
  blurb:'The first piece in Collection 002. A five-panel truck cap with a mesh back, kept plain so you are the only statement.',
  points:['Five panels with a breathable mesh back','Plain white front panel with a curved brim','One size with an adjustable snap back','Available in red and black']}
};
const W_=[];Object.keys(PR).forEach(k=>PR[k].colors.forEach(c=>W_.push([PR[k].name+', '+c,PR[k].coll,PR[k].blurb,0,['#e9e9e6',k+'-'+c.toLowerCase(),c],k,c])));
const SEQ=[{c:['NKDNESS®','Nothing but yourself.']},{c:['Collection 001','The Nothing Polo Series']},{w:0},{w:1},{w:2},{c:['Collection 002','The Nothing Truck Cap']},{w:3},{w:4},{c:['Coming soon','Collection 003',1]},{c:['Coming soon','Accessories',1]}];
function art(p){const c=p[1].startsWith('cap');return `<svg viewBox="0 0 300 400" role="img" aria-label="${p[2]} piece"><rect width="300" height="400" fill="${p[0]}"/><image href="${IMG[p[1]]}" x="${c?14:12}" y="${c?98:58}" width="${c?272:276}" height="${c?206:272}" preserveAspectRatio="xMidYMid meet"/></svg>`}
