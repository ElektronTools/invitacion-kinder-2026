// Optimiza las imágenes flotantes: toma las originales de decor-src/ (PNG, JPG, WebP, AVIF)
// y deja versiones WebP livianas (con transparencia) en src/assets/decor/.
// Una imagen de 1 MB pasa a pesar ~20-40 KB. Se ejecuta sola antes de `npm run dev` y `npm run build`.
import { readdirSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, extname, basename } from 'node:path'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const ORIGEN = join(ROOT, 'decor-src')
const DESTINO = join(ROOT, 'src', 'assets', 'decor')
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif'])
const ANCHO = 420 // se muestran a ~170 px como máximo; 420 cubre pantallas retina

if (!existsSync(ORIGEN)) process.exit(0)
const archivos = readdirSync(ORIGEN)
  .filter((f) => EXT.has(extname(f).toLowerCase()))
  .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
if (!archivos.length) process.exit(0)

let sharp
try {
  sharp = (await import('sharp')).default
} catch {
  console.log('[decor] "sharp" no está instalado: copia las imágenes ya optimizadas a src/assets/decor/.')
  process.exit(0)
}

mkdirSync(DESTINO, { recursive: true })
let n = 0
for (const [i, f] of archivos.entries()) {
  const nombre = basename(f, extname(f)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const salida = join(DESTINO, `${String(i + 1).padStart(2, '0')}-${nombre}.webp`)
  const entrada = join(ORIGEN, f)
  if (existsSync(salida) && statSync(salida).mtimeMs >= statSync(entrada).mtimeMs) continue
  try {
    await sharp(entrada)
      .rotate()
      .resize({ width: ANCHO, height: ANCHO, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, alphaQuality: 90 })
      .toFile(salida)
    n++
  } catch (e) {
    console.log(`[decor] No se pudo optimizar ${f}: ${e.message}`)
  }
}
console.log(`[decor] ${archivos.length} imagen(es) en decor-src/ · ${n} optimizada(s) → src/assets/decor/`)
