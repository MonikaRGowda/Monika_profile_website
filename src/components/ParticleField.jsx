import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, W, H

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const rings = []
    let lastSpawn = 0, isMoving = false, moveTimer = null

    const COLORS = [
      [95, 209, 198],   // teal
      [139, 227, 216],  // mist
      [124, 108, 255],  // violet (occasional)
      [167, 139, 250],  // violet-soft (rare)
    ]

    function spawnRipple(x, y, fromMouse = false) {
      const colorIdx = fromMouse
        ? (Math.random() < 0.75 ? (Math.random() < 0.6 ? 0 : 1) : (Math.random() < 0.5 ? 2 : 3))
        : (Math.random() < 0.8 ? 0 : 1)
      const col = COLORS[colorIdx]
      rings.push({
        x, y,
        vx: (Math.random() - 0.5) * (fromMouse ? 0.6 : 0.3),
        vy: (fromMouse ? -0.35 : -0.12) - Math.random() * 0.2,
        r: 0,
        maxR: fromMouse ? 60 + Math.random() * 40 : 30 + Math.random() * 45,
        col,
        fromMouse,
      })
    }

    // Seed ambient rings
    for (let i = 0; i < 8; i++) {
      setTimeout(() => spawnRipple(
        W * 0.1 + Math.random() * W * 0.8,
        H * 0.15 + Math.random() * H * 0.7, false
      ), i * 450)
    }

    const onMouseMove = e => {
      isMoving = true
      clearTimeout(moveTimer)
      moveTimer = setTimeout(() => { isMoving = false }, 200)
      const now = Date.now()
      if (now - lastSpawn > 90) {
        spawnRipple(e.clientX, e.clientY, true)
        lastSpawn = now
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      if (!isMoving && Math.random() < 0.018) {
        spawnRipple(W * 0.1 + Math.random() * W * 0.8, H * 0.1 + Math.random() * H * 0.8, false)
      }

      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i]
        rg.r += 0.6
        rg.x += rg.vx
        rg.y += rg.vy
        rg.vy *= 0.997

        const life = 1 - rg.r / rg.maxR
        if (life <= 0) { rings.splice(i, 1); continue }

        const ease = life * life
        const bright = rg.fromMouse ? 0.6 : 0.35
        const [r, g, b] = rg.col

        ctx.beginPath()
        ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r},${g},${b},${ease * bright})`
        ctx.lineWidth = rg.fromMouse ? 1 : 0.7
        ctx.stroke()

        if (rg.r > 14) {
          ctx.beginPath()
          ctx.arc(rg.x, rg.y, rg.r * 0.55, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${r},${g},${b},${ease * bright * 0.4})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        if (rg.r < 9) {
          ctx.beginPath()
          ctx.arc(rg.x, rg.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${ease * 0.85})`
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      clearTimeout(moveTimer)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 2,
      pointerEvents: 'none',
      mixBlendMode: 'screen',
    }} />
  )
}
