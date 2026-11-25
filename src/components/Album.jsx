import { useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL
const url = (ruta) => ruta.startsWith('http') ? ruta : `${BASE}${ruta}`

// El álbum permanece cerrado hasta después de la ceremonia.
// Cuando llegue el momento, agrega las fotografías a public/album/.
const FOTOS_SUPABASE = [
  {
    src: 'https://sspphvwsorumzbbgtyrr.supabase.co/storage/v1/object/public/album-graduacion/evento-2026/image1.jpg',
    alt: 'Foto de ejemplo del recuerdo digital',
  },
]

async function descargarFoto(src, nombre) {
  try {
    const respuesta = await fetch(src, { mode: 'cors' })
    if (!respuesta.ok) throw new Error('No se pudo obtener la imagen')
    const blob = await respuesta.blob()
    const temporal = URL.createObjectURL(blob)
    const enlace = document.createElement('a')
    enlace.href = temporal
    enlace.download = nombre
    document.body.appendChild(enlace)
    enlace.click()
    enlace.remove()
    setTimeout(() => URL.revokeObjectURL(temporal), 30000)
  } catch {
    window.open(src, '_blank', 'noopener,noreferrer')
  }
}

// Visor a pantalla completa usando <dialog> nativo (Esc cierra, el foco queda atrapado).
function Visor({ fotos, inicio, cerrar }) {
  const ref = useRef(null)
  const x0 = useRef(null)
  const [i, setI] = useState(inicio)

  useEffect(() => {
    ref.current?.showModal()
  }, [])

  const ir = (d) => setI((v) => (v + d + fotos.length) % fotos.length)
  const foto = fotos[i]

  return (
    <dialog
      ref={ref}
      className="visor"
      aria-label="Visor de fotos"
      onClose={cerrar}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') ir(1)
        else if (e.key === 'ArrowLeft') ir(-1)
      }}
      onTouchStart={(e) => { x0.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (x0.current == null) return
        const dx = e.changedTouches[0].clientX - x0.current
        if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1)
        x0.current = null
      }}
    >
      <button type="button" className="v-close" onClick={() => ref.current.close()} aria-label="Cerrar visor">
        ✕
      </button>
      <img src={url(foto.src)} alt={foto.alt} decoding="async" />
      <div className="v-bar">
        <button type="button" className="v-btn" onClick={() => ir(-1)} aria-label="Foto anterior">‹</button>
        <span className="v-count">{i + 1} / {fotos.length}</span>
        <button type="button" className="v-btn v-save" onClick={() => descargarFoto(url(foto.src), `recuerdo-graduacion-${i + 1}.jpg`)}>⬇ Descargar</button>
        <button type="button" className="v-btn" onClick={() => ir(1)} aria-label="Foto siguiente">›</button>
      </div>
    </dialog>
  )
}

export default function Album() {
  const [fotos, setFotos] = useState(FOTOS_SUPABASE)
  const [abierta, setAbierta] = useState(null)

  useEffect(() => {
    let cancelado = false
    fetch(url('fotos.json'))
      .then((r) => (r.ok && /json/.test(r.headers.get('content-type') || '') ? r.json() : []))
      .catch(() => [])
      .then((d) => {
        if (!cancelado && Array.isArray(d) && d.length) {
          const locales = d.filter((f) => f?.src).map((f) => ({ ...f, src: url(f.src), thumb: f.thumb ? url(f.thumb) : undefined }))
          setFotos([...FOTOS_SUPABASE, ...locales])
        }
      })
    return () => { cancelado = true }
  }, [])

  if (fotos.length === 0) {
    return (
      <div className="album-vacio">
        <ul className="album-grid ghost" aria-hidden="true">
          {Array.from({ length: 3 }, (_, i) => (
            <li key={i}><span className="thumb ghost-thumb"><i /></span></li>
          ))}
        </ul>
        <p className="album-msg">
          📸 El álbum se publicará después de la ceremonia.
          <br />
          ¡Vuelve pronto para descargar tus fotos favoritas!
        </p>
      </div>
    )
  }

  return (
    <>
      <ul className="album-grid">
        {fotos.map((f, i) => (
          <li key={f.src}>
            <button type="button" className="thumb" onClick={() => setAbierta(i)} aria-label={`Abrir foto ${i + 1}`}>
              <img
                src={url(f.thumb || f.src)}
                alt={f.alt}
                loading="lazy"
                decoding="async"
                width="280"
                height="280"
              />
            </button>
          </li>
        ))}
      </ul>
      <p className="album-msg">{fotos.length} fotos · toca una para verla en grande y guardarla</p>
      <p className="album-msg">
        &#128247; El &aacute;lbum se publicar&aacute; despu&eacute;s de la ceremonia.
        <br />
        &iexcl;Vuelve pronto para descargar tus fotos favoritas!
      </p>
      {abierta !== null && <Visor fotos={fotos} inicio={abierta} cerrar={() => setAbierta(null)} />}
    </>
  )
}
