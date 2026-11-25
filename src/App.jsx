import { INSTITUCION, NIVEL, PROMOCION, LEMA, EVENTO } from './data.js'
import { useRef, useState } from 'react'
import { mapsUrl, whatsappUrl } from './utils.js'
import { Birrete, IcoCalendario, IcoReloj, IcoPin } from './components/Icons.jsx'
import Reveal from './components/Reveal.jsx'
import Logo from './components/Logo.jsx'
import Nav from './components/Nav.jsx'
import BackTop from './components/BackTop.jsx'
import Decor from './components/Decor.jsx'
import Countdown from './components/Countdown.jsx'
import Teaser from './components/Teaser.jsx'
import Graduandos from './components/Graduandos.jsx'
import Recuerdo from './components/Recuerdo.jsx'
import Music from './components/Music.jsx'
import Invitation from './components/Invitation.jsx'

export default function App() {
  const musicRef = useRef(null)
  const [invitacionAbierta, setInvitacionAbierta] = useState(false)

  // El confeti se descarga solo al pulsar el botón (carga diferida)
  const celebrar = async (e) => {
    // Importante: iniciar el audio antes de cualquier await conserva el gesto de clic.
    musicRef.current?.playWithSound()
    setInvitacionAbierta(true)
    const r = e.currentTarget.getBoundingClientRect()
    const { default: confeti } = await import('./confetti.js')
    confeti(r.left + r.width / 2, r.top + r.height / 2)
  }

  return (
    <>
      <Music ref={musicRef} />
      <Invitation open={invitacionAbierta} onClose={() => setInvitacionAbierta(false)} />
      <div className="sky no-print" aria-hidden="true" />
      <Nav />

      <div className="page">
      <Decor />
      <main>
        {/* PORTADA */}
        <header className="hero">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} className={`fl fl${i}`} aria-hidden="true" />
          ))}
          <Logo />
          {INSTITUCION && <p className="inst">{INSTITUCION}</p>}
          <p className="badge">{PROMOCION}</p>
          <h1>
            <span className="h1-small">Invitación de</span>
            Graduación
          </h1>
          <p className="nivel">{NIVEL}</p>
          <p className="lema"><span>“{LEMA}”</span></p>
          <button type="button" className="btn btn-gold" onClick={celebrar}>
            <Birrete size={26} /> ¡Celebremos!
          </button>
          <a className="scroll" href="#detalles" aria-label="Ir a los detalles"><span /></a>
        </header>

        {/* DETALLES */}
        <section className="section" id="detalles" aria-labelledby="t-det">
          <Reveal as="header" className="section-head">
            <p className="eyebrow">Te esperamos</p>
            <h2 id="t-det">Un día para recordar</h2>
          </Reveal>

          <Reveal delay={60}><Countdown /></Reveal>

          <div className="cards">
            <Reveal className="card c1">
              <IcoCalendario />
              <h3>Fecha</h3>
              <p className="big">{EVENTO.fechaTexto}</p>
              <p className="muted">{EVENTO.diaSemana}</p>
            </Reveal>
            <Reveal className="card c2" delay={120}>
              <IcoReloj />
              <h3>Hora</h3>
              <p className="big">{EVENTO.horaTexto} hrs.</p>
              <p className="muted">¡Sé puntual, empieza la magia!</p>
            </Reveal>
            <Reveal className="card c3" delay={240}>
              <IcoPin />
              <h3>Lugar</h3>
              <p className="big sm">{EVENTO.lugar}</p>
              <p className="muted">{EVENTO.referencia}<br />{EVENTO.zona}</p>
            </Reveal>
          </div>

          <Reveal className="actions" delay={80}>
            <a className="btn btn-pink" href={mapsUrl()} target="_blank" rel="noopener noreferrer">📍 Cómo llegar</a>
            <a className="btn btn-lime" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">💬 Compartir por WhatsApp</a>
          </Reveal>

          <Teaser />
        </section>

        <Graduandos />
        <Recuerdo />

        {/* CIERRE */}
        <footer className="footer no-print">
          <Reveal>
            <Birrete size={72} />
            <p className="lema small"><span>“{LEMA}”</span></p>
            <p className="muted">{NIVEL} · {PROMOCION}</p>
            <p className="gracias">¡Gracias por acompañarnos en este gran paso! 💛</p>
          </Reveal>
        </footer>
      </main>
      </div>
      <BackTop />
    </>
  )
}
