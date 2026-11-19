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
