/* ISS MODA · modelo de prueba · piezas compartidas: carrito lateral, contador, favoritas
   En la tienda real el carrito es el de Tiendanube; esto muestra cómo se vería y se comportaría. */
(function(){
var ENVIO_GRATIS=100000;
var fmt=function(n){return "$"+Math.round(n).toLocaleString("es-AR")};
window.issFmt=fmt;
function leer(){try{return JSON.parse(localStorage.getItem("issCarrito")||"[]")}catch(e){return[]}}
function guardar(c){try{localStorage.setItem("issCarrito",JSON.stringify(c))}catch(e){}pintarContador();}
window.issCarrito=leer;

var css='\
.cr-fondo{position:fixed;inset:0;background:rgba(43,32,28,.45);z-index:95;opacity:0;pointer-events:none;transition:opacity .35s}\
.cr-fondo.ab{opacity:1;pointer-events:auto}\
.cr{position:fixed;top:0;right:0;bottom:0;width:min(400px,92vw);background:var(--crema) var(--grano);z-index:96;transform:translateX(102%);transition:transform .5s cubic-bezier(.2,1,.3,1);display:flex;flex-direction:column;box-shadow:-20px 0 40px rgba(43,32,28,.18)}\
.cr.ab{transform:none}\
.cr-cab{display:flex;align-items:center;justify-content:space-between;padding:18px 18px 12px}\
.cr-cab h3{font-family:var(--caps);font-size:30px;text-transform:uppercase;color:var(--bordo);line-height:1}\
.cr-cab h3 i{font-family:var(--serif);font-style:italic;text-transform:none;font-weight:400}\
.cr-cab button{font-size:30px;line-height:1;color:var(--bordo);padding:4px 8px}\
.cr-envio{margin:0 18px;padding:12px 14px;background:#fff;border:1.5px solid var(--beige2)}\
.cr-envio p{font-size:13px;color:var(--tinta)}\
.cr-envio p b{color:var(--bordo)}\
.cr-barra{position:relative;height:6px;background:var(--rosa);border-radius:3px;margin:14px 0 4px}\
.cr-barra i{position:absolute;left:0;top:0;bottom:0;background:var(--chicle);border-radius:3px;transition:width .8s cubic-bezier(.2,1,.3,1)}\
.cr-barra svg{position:absolute;top:-17px;width:34px;height:24px;margin-left:-17px;transition:left .8s cubic-bezier(.2,1,.3,1)}\
.cr-items{flex:1;overflow:auto;padding:12px 18px}\
.cr-it{display:flex;gap:12px;padding:12px 0;border-bottom:1px dashed var(--beige2);animation:msj .4s cubic-bezier(.2,1.3,.4,1)}\
.cr-it img{width:70px;height:92px;object-fit:cover;flex:none}\
.cr-it h4{font-family:var(--caps);font-weight:400;font-size:15px;text-transform:uppercase;line-height:1.1}\
.cr-it small{display:block;font-size:12px;color:var(--gris);margin-top:2px}\
.cr-it .pz{font-family:var(--caps);font-size:18px;color:var(--bordo);margin-top:4px}\
.cr-cant{display:inline-flex;align-items:center;border:1.5px solid var(--beige2);margin-top:6px}\
.cr-cant button{width:30px;height:28px;font-size:16px;color:var(--bordo)}\
.cr-cant span{min-width:22px;text-align:center;font-size:13px}\
.cr-quitar{font-size:11.5px;color:var(--gris);text-decoration:underline;margin-left:10px}\
.cr-suma{margin:6px 0 4px;padding:12px;border:1.5px dashed var(--chicle);display:flex;gap:10px;align-items:center;background:#fff}\
.cr-suma img{width:48px;height:60px;object-fit:cover}\
.cr-suma p{font-size:12.5px;flex:1;line-height:1.3}\
.cr-suma p b{display:block;font-family:var(--caps);font-weight:400;font-size:14px;text-transform:uppercase}\
.cr-suma button{font-family:var(--caps);font-size:14px;text-transform:uppercase;letter-spacing:.05em;background:var(--bordo);color:#fff;padding:8px 12px}\
.cr-pie{padding:14px 18px 20px;border-top:1px solid var(--beige2);background:#fff}\
.cr-fila{display:flex;justify-content:space-between;font-size:13.5px;padding:2px 0;color:var(--gris)}\
.cr-fila.ef{color:var(--bordo);font-weight:700;font-size:15px}\
.cr-fila.ef b{font-family:var(--caps);font-size:24px}\
.cr-ahorro{display:inline-block;margin:4px 0 10px;font-family:var(--mono);font-size:12px;font-weight:700;background:var(--rosa2);color:var(--bordo);padding:3px 8px}\
.cr-pie .cta{width:100%}\
.cr-nota{font-size:11px;color:var(--gris);text-align:center;margin-top:8px}\
.cr-vacio{text-align:center;padding:30px 10px}\
.cr-vacio p{font-family:var(--serif);font-style:italic;font-size:32px;color:var(--bordo)}\
.cr-vacio small{display:block;font-size:13px;color:var(--gris);margin:6px 0 16px}\
.cr-toast{position:fixed;left:50%;bottom:90px;transform:translate(-50%,30px);opacity:0;z-index:97;background:var(--bordo);color:#fff;font-size:13.5px;padding:11px 18px;border-radius:99px;transition:.4s cubic-bezier(.2,1.3,.4,1);white-space:nowrap}\
.cr-toast.ve{opacity:1;transform:translate(-50%,0)}\
';
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

var MOTO='<svg viewBox="0 0 52 36"><rect x="3" y="6" width="15" height="12" rx="2" fill="#E39AB0"/><circle cx="11" cy="28" r="6" fill="#fff" stroke="#3E2A22" stroke-width="2.6"/><circle cx="41" cy="28" r="6" fill="#fff" stroke="#3E2A22" stroke-width="2.6"/><path d="M11 28h15l7-13h6l2 13" fill="none" stroke="#3E2A22" stroke-width="2.6" stroke-linejoin="round"/><path d="M36 15l-2-7h-5" fill="none" stroke="#3E2A22" stroke-width="2.6" stroke-linecap="round"/></svg>';
document.addEventListener("DOMContentLoaded",function(){
  document.body.insertAdjacentHTML("beforeend",'<div class="cr-fondo" id="crFondo"></div><aside class="cr" id="cr" aria-label="Carrito"><div class="cr-cab"><h3>Tu <i>carrito</i></h3><button id="crCerrar" aria-label="Cerrar">×</button></div><div class="cr-envio" id="crEnvio"></div><div class="cr-items" id="crItems"></div><div class="cr-pie" id="crPie"></div></aside><div class="cr-toast" id="crToast"></div>');
  document.getElementById("crFondo").onclick=cerrar;document.getElementById("crCerrar").onclick=cerrar;
  document.querySelectorAll('[aria-label="Carrito"]').forEach(function(b){if(b.id!=="cr")b.addEventListener("click",function(e){e.preventDefault();abrir();});});
  pintarContador();
});
function pintarContador(){
  var n=leer().reduce(function(a,x){return a+x.cant},0);
  document.querySelectorAll('button[aria-label="Carrito"]').forEach(function(b){var em=b.querySelector("em.cc");if(!em){em=document.createElement("em");em.className="cc";b.appendChild(em);}em.textContent=n;em.style.display=n?"grid":"none";em.classList.remove("salta");void em.offsetWidth;em.classList.add("salta");});
}
function abrir(){render();document.getElementById("cr").classList.add("ab");document.getElementById("crFondo").classList.add("ab");document.body.style.overflow="hidden";}
function cerrar(){document.getElementById("cr").classList.remove("ab");document.getElementById("crFondo").classList.remove("ab");document.body.style.overflow="";}
window.issAbrirCarrito=abrir;
function toast(t){var x=document.getElementById("crToast");x.textContent=t;x.classList.add("ve");clearTimeout(x._t);x._t=setTimeout(function(){x.classList.remove("ve")},2200);}
window.issToast=toast;

window.issAgregar=function(it,abrirDespues){
  var c=leer(),k=c.find(function(x){return x.slug===it.slug&&x.talle===it.talle&&x.color===it.color});
  if(k)k.cant+=it.cant||1;else{it.cant=it.cant||1;c.push(it);}
  guardar(c);if(abrirDespues!==false)abrir();else toast("Agregado al carrito ✓");
};
function render(){
  var c=leer(),sub=c.reduce(function(a,x){return a+x.precio*x.cant},0),falta=Math.max(0,ENVIO_GRATIS-sub),pct=Math.min(100,sub/ENVIO_GRATIS*100);
  document.getElementById("crEnvio").innerHTML=(falta?'<p>Te faltan <b>'+fmt(falta)+'</b> para el <b>envío gratis</b></p>':'<p>¡Listo! Tenés <b>envío gratis</b> ✓</p>')+
    '<div class="cr-barra"><i style="width:'+pct+'%"></i><svg style="left:'+pct+'%" viewBox="0 0 52 36">'+MOTO.replace(/^<svg[^>]*>|<\/svg>$/g,"")+'</svg></div>';
  if(!c.length){
    document.getElementById("crItems").innerHTML='<div class="cr-vacio"><p>Está vacío…</p><small>Pero tenemos cosas lindas esperándote</small><a class="cta" href="index.html#nuevo" onclick="document.getElementById(\'crFondo\').click()">Ver lo nuevo</a></div>';
    document.getElementById("crPie").innerHTML='';return;}
  var h=c.map(function(x,i){return '<div class="cr-it"><img src="'+x.img+'" alt=""><div style="flex:1"><h4>'+x.n+'</h4><small>'+[x.talle&&("Talle "+x.talle),x.color].filter(Boolean).join(" · ")+'</small><p class="pz">'+fmt(x.precio*.8)+' <small style="display:inline;font-family:var(--txt)">efectivo</small></p><div class="cr-cant"><button data-a="-" data-i="'+i+'">−</button><span>'+x.cant+'</span><button data-a="+" data-i="'+i+'">+</button></div><button class="cr-quitar" data-a="x" data-i="'+i+'">Quitar</button></div></div>'}).join("");
  var S=window.issSugerencia&&window.issSugerencia(c);
  if(S)h+='<div class="cr-suma"><img src="'+S.img+'" alt=""><p><b>'+S.n+'</b>Combina con lo que elegiste · '+fmt(S.precio*.8)+' efectivo</p><button id="crSumar">Sumar</button></div>';
  document.getElementById("crItems").innerHTML=h;
  if(S)document.getElementById("crSumar").onclick=function(){window.issAgregar(S,true)};
  document.getElementById("crPie").innerHTML='<div class="cr-fila"><span>Subtotal</span><span>'+fmt(sub)+'</span></div><div class="cr-fila ef"><span>En efectivo o transferencia</span><b>'+fmt(sub*.8)+'</b></div><span class="cr-ahorro">Ahorrás '+fmt(sub*.2)+'</span><div class="cr-fila"><span>o 2 y 3 cuotas sin interés</span><span>3 x '+fmt(sub/3)+'</span></div><a class="cta" href="gracias.html" id="crComprar" style="margin-top:12px">Iniciar compra <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a><p class="cr-nota">Modelo: en la tienda real acá seguís al pago seguro de Tiendanube</p>';
  document.getElementById("crComprar").onclick=function(){try{localStorage.setItem("issUltimoPedido",JSON.stringify({items:c,sub:sub}));localStorage.removeItem("issCarrito")}catch(e){}};
}
document.addEventListener("click",function(e){var b=e.target.closest(".cr [data-a]");if(!b)return;var c=leer(),i=+b.dataset.i;
  if(b.dataset.a==="+")c[i].cant++;else if(b.dataset.a==="-")c[i].cant=Math.max(1,c[i].cant-1);else c.splice(i,1);guardar(c);render();});
})();

/* ===================== v2: menú, buscador, datos y piezas comunes ===================== */
(function(){
var fmt=window.issFmt,LOGO="https://dcdn-us.mitiendanube.com/stores/977/287/themes/common/logo-3332211776209483737-1788557379-481d02f61b91cc59278f19dbdee0c7291788557379-320-0.webp";
window.ISS_LOGO=LOGO;
var num=function(s){return parseInt(String(s).replace(/\D/g,""))||0};
var nombre=function(p){return p.n.replace(/\s*\/\/\s*/g," ")};
window.issNum=num;window.issNombre=nombre;
var datos=null;
window.issDatos=function(){return datos||(datos=fetch("productos.json").then(function(r){return r.json()}));};
var CATS=[["Vestidos","Vestidos y monos","Reina"],["Tops y bodys","Tops y Bodys","Amura"],["Camisas y blusas","Camisas y Blusas","Anna"],["Faldas y shorts","Faldas, shorts y minis","kira"],["Sastrería","Sastreria","Amanda"],["Remeras","Remeras","mil rayas"],["Pantalones","Jeans y Pantalones","HADA"],["Accesorios","Accesorios","Heart"]];
window.ISS_CATS=CATS;
var POCAS=3;
window.issTarjeta=function(p){
  var v=num(p.p),stock=(p.vars||[]).reduce(function(a,x){return a+(x.ok?x.stock:0)},0),agot=p.vars&&p.vars.length&&!stock;
  return '<a class="pr" href="producto.html?p='+p.slug+'" data-n="'+p.n+'"><div class="ft"><img loading="lazy" src="'+p.img+'" alt="'+nombre(p)+'">'+
   (agot?'<span class="ult" style="background:var(--gris)">Sin stock</span>':(stock&&stock<=POCAS?'<span class="ult">'+(stock===1?'Última unidad':'Últimas '+stock)+'</span>':''))+'</div>'+
   '<h3>'+nombre(p)+'</h3><div class="pz"><span class="ef">'+fmt(v*.8)+'<small>efectivo</small></span><del>'+fmt(v)+'</del></div><p class="cu">o 3 cuotas sin interés de '+fmt(v/3)+'</p></a>';
};

var css='\
.mn{position:fixed;top:0;left:0;bottom:0;width:min(360px,88vw);background:var(--crema) var(--grano);z-index:96;transform:translateX(-102%);transition:transform .5s cubic-bezier(.2,1,.3,1);overflow:auto;padding:18px 18px 30px}\
.mn.ab{transform:none}\
.mn-cab{display:flex;justify-content:space-between;align-items:center}\
.mn-cab img{height:44px}.mn-cab button{font-size:30px;color:var(--bordo);padding:4px 8px}\
.mn-cats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}\
.mn-cats a{position:relative;aspect-ratio:1;overflow:hidden;display:block}\
.mn-cats img{width:100%;height:100%;object-fit:cover;transition:transform .5s}\
.mn-cats a:active img{transform:scale(1.06)}\
.mn-cats span{position:absolute;left:0;right:0;bottom:0;padding:22px 8px 8px;background:linear-gradient(transparent,rgba(43,32,28,.7));color:#fff;font-family:var(--caps);font-size:17px;text-transform:uppercase}\
.mn-cats a{opacity:0;transform:translateY(14px)}\
.mn.ab .mn-cats a{animation:mnEntra .5s cubic-bezier(.2,1.4,.45,1) forwards}\
@keyframes mnEntra{to{opacity:1;transform:none}}\
.mn-links{margin-top:22px;border-top:1px solid var(--beige2)}\
.mn-links a{display:flex;justify-content:space-between;padding:15px 2px;border-bottom:1px solid var(--beige2);font-family:var(--caps);font-size:19px;text-transform:uppercase;color:var(--bordo)}\
.mn-links a:after{content:"→";color:var(--chicle)}\
.mn-fondo{position:fixed;inset:0;background:rgba(43,32,28,.45);z-index:95;opacity:0;pointer-events:none;transition:opacity .35s}\
.mn-fondo.ab{opacity:1;pointer-events:auto}\
.bq{position:fixed;inset:0;z-index:97;background:var(--crema) var(--grano);display:none;overflow:auto}\
.bq.ab{display:block;animation:abre .3s}\
.bq-cab{position:sticky;top:0;background:var(--crema);display:flex;gap:10px;align-items:center;padding:14px 14px 10px}\
.bq-cab .buscador{flex:1;margin:0}\
.bq-cab input{flex:1;border:0;outline:none;background:none;font:inherit;font-size:15px;color:var(--tinta);min-width:0}\
.bq-cab button{font-family:var(--caps);font-size:15px;text-transform:uppercase;color:var(--bordo)}\
.bq-sug{padding:8px 16px}\
.bq-sug p{font-size:12px;color:var(--gris);margin:10px 0 8px}\
.bq-sug .chips{padding:0}\
.bq-res a{display:flex;gap:12px;align-items:center;padding:10px 16px;border-bottom:1px dashed var(--beige2);animation:msj .35s both}\
.bq-res img{width:52px;height:66px;object-fit:cover}\
.bq-res b{display:block;font-family:var(--caps);font-weight:400;font-size:16px;text-transform:uppercase;line-height:1.1}\
.bq-res mark{background:var(--rosa2);color:inherit}\
.bq-res small{font-size:13px;color:var(--bordo);font-weight:700}\
.bq-todo{display:block;margin:16px;text-align:center}\
.bq-nada{padding:30px 16px;text-align:center}\
.bq-nada p{font-family:var(--serif);font-style:italic;font-size:30px;color:var(--bordo)}\
';
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* cabecera y pie estándar para las páginas nuevas */
window.issCabecera=function(nota){
  var c=document.getElementById("cabecera");if(!c)return;
  c.outerHTML='<div class="progreso" id="progreso"></div>'+(nota?'<div class="nota-modelo">'+nota+'</div>':'')+
  '<div class="aviso"><div class="aviso-in">'+Array(2).fill('<span>Envío en moto en 48 h · CABA y AMBA desde $4.500</span><i>★</i><span>20% off en efectivo o transferencia</span><i>★</i><span>2 y 3 cuotas sin interés</span><i>★</i><span>Envío gratis desde $100.000</span><i>★</i>').join("")+'</div></div>'+
  '<header><div class="cab"><button class="ico" aria-label="Menú"><svg viewBox="0 0 24 24"><path d="M3 7h18M3 12h12M3 17h18"/></svg></button><a href="index.html"><img class="logo" src="'+LOGO+'" alt="ISS MODA"></a><div style="display:flex"><button class="ico" aria-label="Buscar"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></button><button class="ico" aria-label="Carrito"><svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 016 0"/></svg></button></div></div></header>';
  var f=document.getElementById("pie");
  if(f)f.outerHTML='<footer style="margin-top:50px"><img class="logo" src="'+LOGO+'" alt="ISS MODA"><p style="margin:6px 0 14px"><a href="quienes.html">Quiénes somos</a> · <a href="ayuda.html">Ayuda</a> · <a href="cuenta.html">Mi cuenta</a></p>Constitución 429, San Fernando · WhatsApp 11 4420-8788<br>© 2026 ISS MODA · +30 años</footer><a class="wa" href="https://wa.me/5491144208788" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z"/></svg></a>';
  addEventListener("scroll",function(){var p=document.getElementById("progreso");if(!p)return;var H=document.documentElement.scrollHeight-innerHeight;p.style.transform="scaleX("+(H>0?scrollY/H:0)+")";},{passive:true});
};

document.addEventListener("DOMContentLoaded",function(){
  window.issDatos().then(function(P){
    document.body.insertAdjacentHTML("beforeend",'<div class="mn-fondo" id="mnF"></div><nav class="mn" id="mn"><div class="mn-cab"><img src="'+LOGO+'" alt="ISS MODA"><button id="mnX" aria-label="Cerrar">×</button></div><div class="mn-cats">'+
      CATS.map(function(c,i){var p=P.find(function(x){return x.n.toLowerCase().indexOf(c[2].toLowerCase())>-1})||P[0];return '<a href="categoria.html?c='+encodeURIComponent(c[1])+'" style="animation-delay:'+(i*.05+.15)+'s"><img src="'+p.img+'" alt=""><span>'+c[0]+'</span></a>'}).join("")+
      '</div><div class="mn-links"><a href="categoria.html">Ver todo</a><a href="quienes.html">Quiénes somos</a><a href="ayuda.html">Envíos, cambios y pagos</a><a href="cuenta.html">Mi cuenta</a></div></nav>'+
      '<div class="bq" id="bq"><div class="bq-cab"><div class="buscador"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input id="bqIn" placeholder="¿Qué estás buscando?" autocomplete="off"></div><button id="bqX">Cerrar</button></div><div class="bq-sug" id="bqSug"><p>Lo más buscado</p><div class="chips">'+["vestido","encaje","top","sastrero","falda","remera"].map(function(t){return '<button>'+t+'</button>'}).join("")+'</div></div><div class="bq-res" id="bqRes"></div></div>');
    function menu(a){document.getElementById("mn").classList.toggle("ab",a);document.getElementById("mnF").classList.toggle("ab",a);document.body.style.overflow=a?"hidden":"";}
    document.getElementById("mnF").onclick=function(){menu(false)};document.getElementById("mnX").onclick=function(){menu(false)};
    document.querySelectorAll('button[aria-label="Menú"]').forEach(function(b){b.onclick=function(e){e.preventDefault();menu(true)}});
    function sinTilde(s){return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")}
    function buscar(t){var r=document.getElementById("bqRes"),k=sinTilde(t.trim());document.getElementById("bqSug").style.display=k?"none":"block";
      if(!k){r.innerHTML="";return;}
      var R=P.filter(function(p){return sinTilde(p.n+" "+(p.cat||"")).indexOf(k)>-1});
      if(!R.length){r.innerHTML='<div class="bq-nada"><p>No encontramos “'+t+'”</p><small style="color:var(--gris)">Probá con otra palabra, o mirá lo nuevo:</small></div>'+P.slice(0,3).map(fila).join("");return;}
      r.innerHTML=R.slice(0,6).map(function(p,i){return fila(p,i,k)}).join("")+'<a class="cta bq-todo" href="categoria.html?q='+encodeURIComponent(t)+'">Ver los '+R.length+' resultados</a>';}
    function fila(p,i,k){var n=nombre(p);if(k){var j=sinTilde(n).indexOf(k);if(j>-1)n=n.slice(0,j)+"<mark>"+n.slice(j,j+k.length)+"</mark>"+n.slice(j+k.length);}
      return '<a href="producto.html?p='+p.slug+'" style="animation-delay:'+((i||0)*.04)+'s"><img src="'+p.img+'" alt=""><div><b>'+n+'</b><small>'+fmt(num(p.p)*.8)+' efectivo</small></div></a>';}
    function abrirBq(){var b=document.getElementById("bq");b.classList.add("ab");document.body.style.overflow="hidden";setTimeout(function(){document.getElementById("bqIn").focus()},50);}
    document.getElementById("bqIn").oninput=function(){buscar(this.value)};
    document.getElementById("bqIn").onkeydown=function(e){if(e.key==="Enter"&&this.value.trim())location.href="categoria.html?q="+encodeURIComponent(this.value.trim());};
    document.getElementById("bqX").onclick=function(){document.getElementById("bq").classList.remove("ab");document.body.style.overflow="";};
    document.getElementById("bqSug").onclick=function(e){var b=e.target.closest("button");if(b){document.getElementById("bqIn").value=b.textContent;buscar(b.textContent);}};
    document.querySelectorAll('button[aria-label="Buscar"],.buscador[role="search"]').forEach(function(b){b.addEventListener("click",function(e){e.preventDefault();abrirBq();})});
    window.issBuscar=abrirBq;
    if(!window.issSugerencia)window.issSugerencia=function(c){var en=c.map(function(x){return x.slug});var s=["Heart","Killian","Amanda"].map(function(n){return P.find(function(p){return p.n.indexOf(n)>-1})}).find(function(p){return p&&en.indexOf(p.slug)<0});if(!s)return null;var V=s.vars&&s.vars.find(function(v){return v.ok&&v.stock>0});return{slug:s.slug,n:nombre(s),img:s.img,talle:V&&V.o[0],color:V&&V.o[1],precio:num(s.p),cant:1};};
  });
});
})();
