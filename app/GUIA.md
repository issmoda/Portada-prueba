# Portada nueva de ISS MODA en Tiendanube — guía

## Cómo funciona
- `iss-cargador.js` se sube UNA sola vez a una app privada del Partner Portal ("ISS Portada").
- Ese archivo carga el diseño desde https://issmoda.github.io/Portada-prueba/app/iss-portada.js
  (se actualiza con `python3 -I build.py prueba|todos` + git push en proyectos/portada-prueba).
- Solo actúa en la página de inicio. Modo "prueba": se ve entrando con `?iss=nuevo` (se apaga con `?iss=viejo`).
  Modo "todos": la ven todas las clientas (pasar a este modo SOLO con el "OK, publicá" de Luana, después de las 20 h).
- Si algo falla (GitHub caído, error), se quita sola y queda la portada del tema.

## Lo que lee en vivo de Tiendanube
- Fotos grandes: categoría `/portada/` (si no existe: las 3 más vendidas).
- Recién llegado: últimos productos cargados.
- MUST HAVE: categorías `/look-1/`, `/look-2/`, `/look-3/` (si no existen: las más vendidas).
- ¿Para qué ocasión? e Historias: categorías del menú (Tops, Sastrería, Vestidos, Remeras, Faldas, Accesorios).
- Stock, precios y precio en efectivo: los reales de cada producto.
