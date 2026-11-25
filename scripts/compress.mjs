// Genera versiones .gz y .br de los archivos de texto del build (sin dependencias extra).
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs'
import { join, extname } from 'node:path'
import { gzipSync, brotliCompressSync, constants } from 'node:zlib'

import { fileURLToPath } from 'node:url'

// fileURLToPath (y no .pathname) para que funcione también en Windows y con espacios en la ruta
const DIST = fileURLToPath(new URL('../dist', import.meta.url))
const EXT = new Set(['.html', '.js', '.css', '.svg', '.json', '.txt'])

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })

let total = { raw: 0, gz: 0, br: 0 }
for (const file of walk(DIST)) {
  if (!EXT.has(extname(file))) continue
  const buf = readFileSync(file)
  const gz = gzipSync(buf, { level: 9 })
  const br = brotliCompressSync(buf, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  })
  writeFileSync(file + '.gz', gz)
  writeFileSync(file + '.br', br)
  total.raw += buf.length
  total.gz += gz.length
  total.br += br.length
  console.log(
    `${file.replace(DIST, 'dist')}  ${(buf.length / 1024).toFixed(1)} KB → gz ${(gz.length / 1024).toFixed(1)} KB · br ${(br.length / 1024).toFixed(1)} KB`
  )
}
console.log(
  `\nTotal texto: ${(total.raw / 1024).toFixed(1)} KB → gzip ${(total.gz / 1024).toFixed(1)} KB · brotli ${(total.br / 1024).toFixed(1)} KB`
)
