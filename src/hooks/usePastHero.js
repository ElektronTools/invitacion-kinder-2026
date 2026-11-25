import { useEffect, useState } from 'react'

// true cuando el usuario ya pasó la portada (la usan la barra de navegación y el botón "Subir arriba").
export default function usePastHero() {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.hero')
    if (!hero || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting), {
      rootMargin: '-70px 0px 0px 0px',
    })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  return past
}
