import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

// El MP3 debe existir en public/song.mp3. El botón ¡Celebremos! también
// inicia el audio directamente dentro del gesto del usuario (política autoplay).
const Music = forwardRef(function Music(_, forwardedRef) {
  const audioRef = useRef(null)
  const activatedRef = useRef(false)

  useImperativeHandle(forwardedRef, () => ({
    playWithSound() {
      const audio = audioRef.current
      if (!audio) return Promise.resolve(false)
      audio.muted = false
      audio.volume = 0.42
      activatedRef.current = true
      const result = audio.play()
      return result.then(() => true).catch((error) => {
        console.warn('No se pudo reproducir /song.mp3. Verifica que el archivo exista en public/song.mp3.', error)
        return false
      })
    },
  }), [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.42
    audio.muted = true

    // Algunos navegadores permiten autoplay silenciado; el sonido se habilita
    // en el primer gesto real, especialmente al pulsar ¡Celebremos!.
    audio.play().catch(() => {})

    const unlock = () => {
      if (!activatedRef.current) {
        audio.muted = false
        audio.volume = 0.42
        audio.play().then(() => { activatedRef.current = true }).catch((error) => {
          console.warn('El navegador no permitió iniciar la música todavía.', error)
        })
      }
    }
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        if (activatedRef.current) audio.play().catch(() => {})
        else audio.play().catch(() => {})
      } else {
        audio.pause()
      }
    }
    const onError = () => console.error('No se pudo cargar /song.mp3. La ruta debe ser public/song.mp3 y el archivo debe llamarse exactamente song.mp3.')

    audio.addEventListener('error', onError)
    window.addEventListener('pointerdown', unlock, { once: true, capture: true })
    window.addEventListener('keydown', unlock, { once: true, capture: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      audio.pause()
      audio.removeEventListener('error', onError)
      window.removeEventListener('pointerdown', unlock, true)
      window.removeEventListener('keydown', unlock, true)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <audio ref={audioRef} src={`${import.meta.env.BASE_URL}song.mp3`} loop preload="auto" playsInline aria-hidden="true" />
})

export default Music
