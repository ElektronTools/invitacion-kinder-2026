import { useEffect, useMemo, useRef, useState } from 'react'
import { GRUPOS } from '../data.js'
import { normalizar } from '../utils.js'
import Reveal from './Reveal.jsx'

const FOTOS_ALUMNOS = {
  // Foto proporcionada para el alumno 01 del Inicial B.
  'BAUTISTA POMA JHANDI NICOLETH': 'https://sspphvwsorumzbbgtyrr.supabase.co/storage/v1/object/public/album-graduacion/evento-2026/start1.jpg',
}

function FotoZoom({ src, nombre, cerrar }) {
  const ref = useRef(null)
  useEffect(() => { ref.current?.showModal() }, [])
  return (
    <dialog ref={ref} className="foto-zoom" onClose={cerrar} onClick={(e) => { if (e.target === ref.current) ref.current.close() }}>
      <button type="button" className="v-close" onClick={() => ref.current.close()} aria-label="Cerrar foto">✕</button>
      <img src={src} alt={`Foto de ${nombre}`} />
      <p>{nombre}</p>
    </dialog>
  )
}

export default function Graduandos() {
  const [grupo, setGrupo] = useState('todos')
  const [q, setQ] = useState('')
  const [fotoActiva, setFotoActiva] = useState(null)


  const total = useMemo(() => GRUPOS.reduce((n, g) => n + g.alumnos.length, 0), [])
  const indexados = useMemo(
    () => GRUPOS.map((g) => ({ ...g, alumnos: g.alumnos.map((n) => ({ n, k: normalizar(n) })) })),
    []
  )
  const filtros = useMemo(
    () => [{ id: 'todos', titulo: 'Todos', c: total }, ...GRUPOS.map((g) => ({ id: g.id, titulo: g.titulo, c: g.alumnos.length }))],
    [total]
  )

  const term = normalizar(q.trim())
  const visibles = indexados
    .filter((g) => grupo === 'todos' || g.id === grupo)
    .map((g) => ({ ...g, alumnos: term ? g.alumnos.filter((a) => a.k.includes(term)) : g.alumnos }))
    .filter((g) => g.alumnos.length)

  return (
    <section className="section" id="graduandos" aria-labelledby="t-grad">
      <Reveal as="header" className="section-head">
        <p className="eyebrow">Nuestros pequeños héroes</p>
        <h2 id="t-grad">Lista de graduación</h2>
        <p className="muted">{total} estrellitas listas para brillar</p>
      </Reveal>

      <Reveal className="tools" delay={80}>
        <div className="tabs" role="group" aria-label="Filtrar por curso">
          {filtros.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={grupo === t.id}
              className={grupo === t.id ? 'tab on' : 'tab'}
              onClick={() => setGrupo(t.id)}
            >
              {t.titulo} <small>{t.c}</small>
            </button>
          ))}
        </div>
        <label className="search">
          <span className="sr">Buscar graduando</span>
          <input
            type="search"
            placeholder="Buscar por nombre o apellido…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
          />
        </label>
      </Reveal>

      <p className="sr" aria-live="polite">
        {term ? `${visibles.reduce((n, g) => n + g.alumnos.length, 0)} resultados` : ''}
      </p>
      {visibles.length === 0 && <p className="empty">No encontramos a nadie con “{q}” 🔍</p>}

      {visibles.map((g) => (
        <div className="grupo" key={g.id}>
          <h3>
            <span className="chip">{g.id}</span> {g.titulo}
          </h3>
          <ol className="grid">
            {g.alumnos.map((a, i) => (
              <li className={`alumno${g.id === 'B' ? ' alumno-con-foto' : ''}`} key={a.n} style={{ '--h': (i * 47 + (g.id === 'B' ? 140 : 0)) % 360 }}>
                {g.id === 'B' && (FOTOS_ALUMNOS[a.n]
                  ? <button type="button" className="alumno-foto-btn" onClick={() => setFotoActiva({ src: FOTOS_ALUMNOS[a.n], nombre: a.n })} aria-label={`Ampliar foto de ${a.n}`}><img className="alumno-foto" src={FOTOS_ALUMNOS[a.n]} alt={`Foto de ${a.n}`} loading="lazy" /></button>
                  : <span className="alumno-foto alumno-foto-vacia" aria-label="Foto pendiente">📷</span>)}
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="nombre">{a.n}</span>
                <span className="estrella" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      ))}
      {fotoActiva && <FotoZoom src={fotoActiva.src} nombre={fotoActiva.nombre} cerrar={() => setFotoActiva(null)} />}
    </section>
  )
}
