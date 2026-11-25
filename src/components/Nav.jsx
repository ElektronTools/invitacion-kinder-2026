import usePastHero from '../hooks/usePastHero.js'

// Barra de navegación que aparece al pasar la portada.
export default function Nav() {
  const show = usePastHero()
  const tab = show ? 0 : -1
  return (
    <nav className={`nav no-print${show ? ' show' : ''}`} aria-label="Secciones" aria-hidden={!show}>
      <a href="#detalles" tabIndex={tab}>Detalles</a>
      <a href="#graduandos" tabIndex={tab}>Graduados</a>
      <a href="#recuerdo" tabIndex={tab}>Recuerdo</a>
    </nav>
  )
}
