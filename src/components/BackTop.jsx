import usePastHero from '../hooks/usePastHero.js'

// Botón "Subir arriba": solo aparece cuando ya se bajó de la portada.
export default function BackTop() {
  const show = usePastHero()
  return (
    <button
      type="button"
      className={`back-top no-print${show ? ' show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Subir al inicio"
      title="Subir arriba"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
    </button>
  )
}
