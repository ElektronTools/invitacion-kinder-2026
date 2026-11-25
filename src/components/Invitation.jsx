import { useEffect, useRef } from 'react'
import { EVENTO, NIVEL, PROMOCION, LEMA } from '../data.js'
import { mapsUrl, whatsappUrl } from '../utils.js'
import { Birrete } from './Icons.jsx'

export default function Invitation({ open, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog ref={dialogRef} className="invite-dialog" aria-labelledby="invite-title" onClose={onClose}>
      <div className="invite-card">
        <button className="invite-close" type="button" onClick={onClose} aria-label="Cerrar invitación">×</button>
        <div className="invite-spark invite-spark-one">✦</div>
        <div className="invite-spark invite-spark-two">✧</div>
        <div className="invite-seal"><Birrete size={54} /></div>
        <p className="invite-kicker">Una invitación especial</p>
        <h2 id="invite-title">¡Nos encantaría contar contigo!</h2>
        <div className="invite-rule"><span>✦</span></div>
        <p className="invite-greeting">A nuestros queridos papás, familiares, profesores y amigos:</p>
        <p className="invite-copy">
          Con mucha alegría y emoción queremos invitarles a compartir con nosotros
          un momento muy especial: la graduación de <strong>{NIVEL} · {PROMOCION}</strong>.
          Su cariño, enseñanzas y compañía han sido parte de este hermoso camino.
          ¡Será una felicidad celebrar este gran logro junto a ustedes!
        </p>
        <p className="invite-quote">“{LEMA}”</p>
        <div className="invite-details">
          <div><span>FECHA</span><strong>{EVENTO.diaSemana}, {EVENTO.fechaTexto}</strong></div>
          <div><span>HORA</span><strong>{EVENTO.horaTexto} hrs.</strong></div>
          <div><span>LUGAR</span><strong>{EVENTO.lugar}</strong><small>{EVENTO.referencia} · {EVENTO.zona}</small></div>
        </div>
        <p className="invite-end">¡Los esperamos para celebrar juntos! 💛</p>
        <button className="invite-back" type="button" onClick={onClose}>Continuar viendo la invitación..</button>
      </div>
    </dialog>
  )
}
