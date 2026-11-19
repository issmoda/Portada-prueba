/* ISS MODA · cargador de la portada nueva. Se sube UNA sola vez al Partner Portal de Tiendanube.
   El diseño vive en issmoda.github.io/Portada-prueba/app/ y se actualiza sin volver a subir este archivo. */
(function(){
  var LS=window.LS||{};
  if(LS.template!=="home")return;
  var oc=document.createElement("style");oc.id="iss-oculta";oc.textContent="#MainContent{opacity:0!important}";
  var q=location.search.indexOf("iss=nuevo")>-1,f=false;try{f=sessionStorage.getItem("issNuevo")==="1"}catch(e){}
  if(q||f)document.head.appendChild(oc);
  var listo=function(){var o=document.getElementById("iss-oculta");if(o)o.remove();};
  setTimeout(listo,2500);
  var s=document.createElement("script");
  s.src="https://issmoda.github.io/Portada-prueba/app/iss-portada.js?v="+Math.floor(Date.now()/600000);
  s.async=true;s.onload=listo;s.onerror=listo;
  document.head.appendChild(s);
})();
