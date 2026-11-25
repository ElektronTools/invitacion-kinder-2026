import { useEffect, useMemo, useRef, useState } from 'react'
import { DECOR } from '../data.js'

// Imágenes de src/assets/decor/ (Vite las procesa, les pone hash y las cachea para siempre).
const locales = import.meta.glob('../assets/decor/*.{png,webp,avif,jpg,jpeg,gif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const IMAGENES = [
  ...Object.keys(locales)
    .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
    .map((k) => locales[k]),
  ...(DECOR.urls || []),
]

// Número pseudo-aleatorio estable (0..1): las imágenes quedan en el mismo lugar en cada visita.
const rnd = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Capa decorativa a lo largo de TODA la página. Cada imagen aparece (con un "pop") cuando
 * entra en pantalla al hacer scroll, flota suavemente y se mueve con un leve efecto parallax.
 * Costo: 1 IntersectionObserver + 1 listener de scroll pasivo con requestAnimationFrame.
 */
export default function Decor() {
  const capa = useRef(null)
  const total = IMAGENES.length
  const [cantidad, setCantidad] = useState(total)

  // Cuántas imágenes poner según el alto de la página (densidad constante en celular y escritorio).
  useEffect(() => {
    const pagina = capa.current?.parentElement
    if (!pagina || !total) return
    const calcular = () => {
      const sep = innerWidth < 700 ? DECOR.separacion * 0.85 : DECOR.separacion
      const n = Math.round(pagina.offsetHeight / sep)
      setCantidad(Math.min(Math.max(n, total), total * 3))
    }
    calcular()
    if (!('ResizeObserver' in window)) return
    const ro = new ResizeObserver(calcular)
    ro.observe(pagina)
    return () => ro.disconnect()
  }, [total])

  const items = useMemo(
    () =>
      Array.from({ length: cantidad }, (_, i) => ({
        src: IMAGENES[i % total],
        lado: i % 2 ? 'r' : 'l',
        y: Math.min(95, ((i + 0.3 + rnd(i + 9) * 0.4) / cantidad) * 100),
        x: rnd(i + 1).toFixed(2),
        rot: ((rnd(i + 5) - 0.5) * 10).toFixed(1),
        v: ((i % 3 === 0 ? -0.1 : 0.06 + rnd(i + 3) * 0.1)).toFixed(3), // velocidad parallax
        t: (6 + rnd(i + 7) * 4).toFixed(1),
        dl: (-rnd(i + 11) * 6).toFixed(1),
      })),
    [cantidad, total]
  )

  useEffect(() => {
    const el = capa.current
    if (!el || !items.length) return
    const nodos = [...el.children]
    const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches
    const visibles = new Set()
    const centros = new Map()
    let raf = 0

    const medir = () => nodos.forEach((n) => centros.set(n, n.offsetTop + n.offsetHeight / 2))
    const aplicar = () => {
      raf = 0
      if (reducir) return
      const medio = scrollY + innerHeight / 2
      visibles.forEach((n) => {
        n.style.setProperty('--py', `${((centros.get(n) - medio) * n._v).toFixed(1)}px`)
      })
    }
    const pedir = () => { if (!raf) raf = requestAnimationFrame(aplicar) }

    nodos.forEach((n) => { n._v = parseFloat(n.dataset.v) || 0 })
    medir()

    // Aparecer / pausar según estén o no en pantalla
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) {
            target.classList.add('in', 'vis')
            visibles.add(target)
          } else {
            target.classList.remove('vis')
            visibles.delete(target)
          }
        })
        pedir()
      },
      { rootMargin: '0px 0px -8% 0px' }
    )
    nodos.forEach((n) => io.observe(n))

    const alCambiar = () => { medir(); pedir() }
    addEventListener('scroll', pedir, { passive: true })
    addEventListener('resize', alCambiar)
    return () => {
      io.disconnect()
      removeEventListener('scroll', pedir)
      removeEventListener('resize', alCambiar)
      cancelAnimationFrame(raf)
    }
  }, [items])

  if (!total) return null

  return (
    <div className="decor no-print" aria-hidden="true" ref={capa}>
      {items.map((it, i) => (
        <div
          key={i}
          className={`dc dc-${it.lado}`}
          data-v={it.v}
          style={{
            top: `${it.y.toFixed(2)}%`,
            '--x': it.x,
            '--r': `${it.rot}deg`,
            '--d': `${(i % 2) * 120}ms`,
            '--t': `${it.t}s`,
            '--dl': `${it.dl}s`,
          }}
        >
          <div className="dc-pop">
            <img src={it.src} alt="" width="160" height="160" loading="lazy" decoding="async" draggable="false" />
          </div>
        </div>
      ))}
    </div>
  )
}
