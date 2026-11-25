import { useEffect, useMemo, useState } from 'react'
import { EVENTO } from '../data.js'

export default function Countdown() {
  const meta = useMemo(() => new Date(EVENTO.inicioISO).getTime(), [])
  const [ahora, setAhora] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setAhora(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = meta - ahora
  if (diff <= 0) {
    const fin = meta + EVENTO.duracionHoras * 3600 * 1000
    return (
      <p className="count-done">
        {ahora < fin ? '🎉 ¡Hoy es el gran día! 🎉' : '🎓 ¡Felicitaciones, graduados! 🎓'}
      </p>
    )
  }

  const s = Math.floor(diff / 1000)
  const items = [
    ['Días', Math.floor(s / 86400)],
    ['Horas', Math.floor((s % 86400) / 3600)],
    ['Min', Math.floor((s % 3600) / 60)],
    ['Seg', s % 60],
  ]
  return (
    <div className="count" role="timer" aria-label="Cuenta regresiva para la graduación">
      {items.map(([etq, val]) => (
        <div className="count-box" key={etq}>
          <b>{String(val).padStart(2, '0')}</b>
          <span>{etq}</span>
        </div>
      ))}
    </div>
  )
}
