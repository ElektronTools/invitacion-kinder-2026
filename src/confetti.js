// Confeti ligero en canvas. Se carga con import() dinámico solo cuando alguien lo pide,
// así no pesa en la carga inicial.
const COLORES = ['#ffd166', '#ff6bb5', '#5ee7ff', '#b8f35e', '#ffffff', '#a78bfa']

export default function lanzarConfeti(x = innerWidth / 2, y = innerHeight / 3) {
  const canvas = document.createElement('canvas')
  const dpr = Math.min(devicePixelRatio || 1, 2)
  canvas.width = innerWidth * dpr
  canvas.height = innerHeight * dpr
  Object.assign(canvas.style, {
    position: 'fixed', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: 50,
  })
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)

  const piezas = Array.from({ length: 140 }, () => {
    const ang = Math.random() * Math.PI * 2
    const vel = 4 + Math.random() * 9
    return {
      x, y,
      vx: Math.cos(ang) * vel,
      vy: Math.sin(ang) * vel - 6,
      w: 6 + Math.random() * 7,
      h: 4 + Math.random() * 6,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      c: COLORES[(Math.random() * COLORES.length) | 0],
      estrella: Math.random() < 0.25,
    }
  })

  const inicio = performance.now()
  const dibujar = (t) => {
    const e = t - inicio
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    for (const p of piezas) {
      p.vy += 0.28
      p.vx *= 0.99
      p.x += p.vx
      p.y += p.vy
      p.r += p.vr
      ctx.save()
      ctx.globalAlpha = Math.max(0, 1 - e / 3200)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.r)
      ctx.fillStyle = p.c
      if (p.estrella) {
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const a = (i * 4 * Math.PI) / 5
          ctx.lineTo(Math.cos(a) * p.w * 0.7, Math.sin(a) * p.w * 0.7)
        }
        ctx.closePath()
        ctx.fill()
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      }
      ctx.restore()
    }
    if (e < 3200) requestAnimationFrame(dibujar)
    else canvas.remove()
  }
  requestAnimationFrame(dibujar)
}
