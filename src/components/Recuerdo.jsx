import Reveal from './Reveal.jsx'
import Album from './Album.jsx'

export default function Recuerdo() {
  return (
    <section className="section" id="recuerdo" aria-labelledby="t-rec">
      <Reveal as="header" className="section-head">
        <p className="eyebrow">Para guardar en el corazón</p>
        <h2 id="t-rec">Recuerdo digital</h2>
        <p className="muted">Revive los mejores momentos en nuestro álbum de fotos</p>
      </Reveal>
      <Reveal delay={80}>
        <Album />
      </Reveal>
    </section>
  )
}
