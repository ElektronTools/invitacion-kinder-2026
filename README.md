# Invitación de graduación · Inicial 2026

Tarjeta web interactiva hecha con **React + Vite**, lista para publicar en **Vercel** (o cualquier hosting estático).
Solo usa `react` y `react-dom`.

## Qué incluye
- Portada animada, cuenta regresiva, fecha / hora / lugar, botón de mapa y WhatsApp.
- **Imágenes flotantes** que aparecen al hacer scroll (ver sección más abajo).
- Botón “Subir arriba” que aparece solo después de salir de la portada.
- **Video teaser** (hecho en Canva) incrustado en la página.
- Lista de graduación con filtro por curso y buscador.
- **Recuerdo digital**
  - **Álbum de fotos** conectado a imágenes públicas de Supabase, con visor a pantalla completa y botón “Guardar”.
- Diseño responsivo (celular, tablet y computadora).
- Emblema institucional circular con fondo exterior transparente (sin placa blanca).
- Música ambiental local desde `public/song.mp3`, en repetición y sin controles visibles. Se intenta iniciar silenciada al cargar y se activa el sonido con el primer toque/clic/tecla, por las restricciones de autoplay de Android, Chrome y Safari. La música se pausa al cambiar a otra pestaña y se reanuda al volver.

## 1) Archivos que tú agregas (carpeta `public/`)
| Archivo | Para qué |
|---|---|
| `public/logo-colegio-pro.png` | Logo de la institución (portada) |
| `public/song.mp3` | Canción ambiental local. El nombre debe ser exactamente `song.mp3` y debe estar dentro de `public/` (no en la raíz del proyecto). |
| `public/teaser.mp4` | Video teaser exportado de Canva (opcional) |
| `public/teaser-poster.jpg` | Imagen de portada del video (opcional) |
| `public/album/*.jpg` | Fotos del álbum (después del evento) |

- Si falta el video, la sección del teaser no aparece. Si el álbum está vacío, se muestran tres espacios de ejemplo y debajo el mensaje: “📸 El álbum se publicará después de la ceremonia. ¡Vuelve pronto para descargar tus fotos favoritas!”.
- **Canva → MP4:** Compartir → Descargar → MP4, 1080p. Procura que pese **menos de 10 MB** (15 segundos suele pesar ~3–8 MB) para que cargue rápido en celular.
- **Álbum:** copia las fotos (JPG, PNG o WebP) en `public/album/`. Al ejecutar `npm run build` (o `npm run dev`) se crea solo `public/fotos.json` y miniaturas livianas en `public/album/thumbs/`. Recomendado: fotos de máximo ~1600 px de ancho.

## Fotos del Inicial “B”

Las fotos individuales se asignan en `src/components/Graduandos.jsx`, dentro del objeto `FOTOS_ALUMNOS`, usando el nombre completo de cada estudiante como clave y la URL pública de Supabase como valor. En esta entrega está configurada la foto `start1.jpg` para **BAUTISTA POMA JHANDI NICOLETH** (alumno 01). Los demás espacios muestran un marcador de foto pendiente hasta que se agreguen sus respectivas URLs; no se reutiliza la foto de un niño para otro.

## Imágenes flotantes (aparecen al hacer scroll)
Los niños con birrete que decoran los costados aparecen con un efecto “pop” a medida que se baja por la página, flotan suavemente y se mueven con un leve parallax.

**Cómo agregarlas**
1. Copia tus imágenes (PNG con fondo transparente, JPG, WebP o AVIF) en la carpeta **`decor-src/`**.
2. Ejecuta `npm run dev` o `npm run build`: se optimizan solas a WebP de ~420 px (de ~1 MB a ~30 KB) y quedan en `src/assets/decor/`.
3. Listo. Si ya tienes imágenes optimizadas, puedes ponerlas directo en `src/assets/decor/`.

- Si usas muchas fotos hospedadas fuera (p. ej. Supabase), pega sus URLs en `DECOR.urls` dentro de `src/data.js`.
- La cantidad se ajusta sola al largo de la página (más imágenes en celular, que es más largo). Se reparten alternando izquierda y derecha y se repiten en ciclo. Para tener más o menos, cambia `DECOR.separacion` en `src/data.js`.
- En celulares y pantallas angostas asoman por el borde, detrás del contenido, para no tapar los textos.
- Si el usuario tiene activada la opción “reducir movimiento”, se muestran quietas.
- Sin imágenes, la capa simplemente no se dibuja.

## 2) Cambiar textos, fecha o lista
Todo está en `src/data.js` (lema, fecha, lugar, lista de alumnos y configuración de las imágenes flotantes).

## 3) Comandos
```bash
npm install        # una sola vez
npm run dev        # ver la página mientras editas → http://localhost:5173
npm run build      # genera dist/ (optimizada + .gz + .br)
npm run preview    # probar el build final
```

## 4) Publicar en Vercel
**Opción A – con GitHub (recomendada)**
1. Sube esta carpeta a un repositorio de GitHub.
2. En vercel.com → *Add New… → Project* → elige el repositorio. Vercel detecta Vite solo (`vercel.json` ya viene configurado).
3. *Deploy*. Para publicar el álbum después del evento: agrega las fotos a `public/album/`, haz *commit* y Vercel se actualiza solo.

**Opción B – con la terminal**
```bash
npm i -g vercel
vercel --prod
```

## Optimizaciones incluidas
- Sin fuentes web, sin imágenes de fondo y sin librerías de animación (CSS puro + SVG).
- El confeti y el generador de diploma se cargan **solo cuando se usan** (`import()` dinámico).
- El diploma en pantalla escala con unidades `cqw`; el PNG se dibuja en un `<canvas>` con las mismas medidas.
- El video usa `preload` ligero y las fotos `loading="lazy"` con miniaturas WebP.
- CSS crítico inline, minificación, archivos `.gz` / `.br` y cabeceras de caché (`vercel.json` y `_headers`).
- Respeta `prefers-reduced-motion`, soporta pantallas con notch y tiene estilos de impresión A4 horizontal.


## Música de fondo
La música se carga desde `public/song.mp3` y se reproduce en bucle mediante el elemento HTML audio, sin controles visibles. Debes copiar tu archivo MP3 a esa ruta antes de publicar. Chrome, Safari y los navegadores móviles pueden bloquear el autoplay con sonido; el código intenta reproducirlo y, si el navegador lo bloquea, espera la primera interacción del visitante para activar el audio.


Copia tu archivo llamado `song.mp3` directamente dentro de la carpeta `public/` (la ruta final debe ser `invitacion/public/song.mp3`, no junto a `package.json`). Vite lo publica como `/song.mp3`. El sitio intenta iniciar la música automáticamente; Chrome, Safari y los navegadores móviles pueden bloquear el autoplay con sonido, por lo que el audio comienza al primer toque/clic si el navegador lo exige. El reproductor no muestra controles y repite la canción en bucle.

## Audio: solución y prueba
- Guarda la canción en `public/song.mp3` (no basta con que Windows muestre `song`: activa **Ver → Mostrar → Extensiones de nombre de archivo** y confirma que el nombre real sea `song.mp3`).
- Prueba localmente abriendo `http://localhost:5173/song.mp3`; debe reproducirse/descargarse el MP3 y no mostrar 404.
- En la invitación, el botón **¡Celebremos!** intenta iniciar el audio con sonido directamente durante el clic. El audio se repite en bucle y se pausa cuando la pestaña deja de estar visible.
- Los navegadores pueden bloquear el autoplay con sonido antes de una interacción. Si el usuario pulsa el botón y aún no suena, revisa que el archivo no esté vacío/dañado y que la ruta responda con HTTP 200.

## Ventana de invitación
Al pulsar **¡Celebremos!** se abre una invitación emergente dirigida a papás, familiares, profesores y amigos, con los datos del evento y accesos a WhatsApp y Google Maps.
