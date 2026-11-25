// Genera public/fotos.json a partir de las fotos de public/album/
// y (si "sharp" está instalado) miniaturas livianas en public/album/thumbs/.
// Se ejecuta solo antes de `npm run dev` y `npm run build`.
import { readdirSync, mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, extname } from 'node:path'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const ALBUM = join(ROOT, 'public', 'album')
const THUMBS = join(ALBUM, 'thumbs')
const OUT = join(ROOT, 'public', 'fotos.json')
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

mkdirSync(ALBUM, { recursive: true })

const archivos = readdirSync(ALBUM, { withFileTypes: true })
  .filter((d) => d.isFile() && EXT.has(extname(d.name).toLowerCase()))
  .map((d) => d.name)
  .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))

let sharp = null
try {
  sharp = (await import('sharp')).default
  mkdirSync(THUMBS, { recursive: true })
} catch {
  console.log('[album] "sharp" no está instalado: se usarán las fotos originales como miniaturas.')
}

const fotos = []
for (const [i, nombre] of archivos.entries()) {
  const entrada = { src: `album/${nombre}`, alt: `Recuerdo de la graduación, foto ${i + 1}` }
  if (sharp) {
    const origen = join(ALBUM, nombre)
    const thumbNombre = `${nombre}.webp`
    const destino = join(THUMBS, thumbNombre)
    try {
      if (!existsSync(destino) || statSync(destino).mtimeMs < statSync(origen).mtimeMs) {
        await sharp(origen)
          .rotate()
          .resize({ width: 560, height: 560, fit: 'cover' })
          .webp({ quality: 72 })
          .toFile(destino)
      }
      entrada.thumb = `album/thumbs/${thumbNombre}`
    } catch (e) {
      console.log(`[album] No se pudo crear la miniatura de ${nombre}: ${e.message}`)
    }
  }
  fotos.push(entrada)
}

writeFileSync(OUT, JSON.stringify(fotos))
console.log(`[album] ${fotos.length} foto(s) en el álbum.`)
