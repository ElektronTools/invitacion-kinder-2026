import { useEffect, useState } from 'react'
import { TEASER } from '../data.js'
import Reveal from './Reveal.jsx'

const resolver = (ruta) => (/^https?:\/\//.test(ruta) ? ruta : `${import.meta.env.BASE_URL}${ruta}`)

// Video teaser (Canva). Solo se muestra si el archivo existe.
export default function Teaser() {
  const [disponible, setDisponible] = useState(false)
  const [vertical, setVertical] = useState(false)

  useEffect(() => {
    if (!TEASER?.src) return
    let cancelado = false
    fetch(resolver(TEASER.src), { method: 'HEAD' })
      .then((r) => {
        const tipo = r.headers.get('content-type') || ''
        // El servidor de desarrollo devuelve index.html si el archivo no existe: lo descartamos.
        if (!cancelado && r.ok && !/text\/html/.test(tipo)) setDisponible(true)
      })
      .catch(() => {})
    return () => { cancelado = true }
  }, [])

  if (!disponible) return null

  return (
    <Reveal className={`teaser${vertical ? ' vertical' : ''}`} aria-labelledby="t-teaser" as="section">
      <div className="section-head">
        <p className="eyebrow">Mira el anuncio</p>
        <h3 id="t-teaser" className="h-sub">Teaser de la graduación</h3>
      </div>
      <div className="video-frame">
        <video
          controls
          playsInline
          preload={TEASER.poster ? 'none' : 'metadata'}
          poster={TEASER.poster ? resolver(TEASER.poster) : undefined}
          onLoadedMetadata={(e) => setVertical(e.currentTarget.videoHeight > e.currentTarget.videoWidth)}
        >
          <source src={resolver(TEASER.src)} type="video/mp4" />
          Tu navegador no puede reproducir este video.
        </video>
      </div>
    </Reveal>
  )
}
