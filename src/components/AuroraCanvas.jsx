import { useEffect, useRef } from 'react'

export default function AuroraCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let animationFrameId = 0
    let width = 0
    let height = 0
    
    const bands = [
      { baseY: 0.965, amp: 0.16, speed: 0.00012, freq: 2.2, color: [95, 209, 198], phase: 0 },
      {
  baseY: 0.965,
  amp: 0.12,          // slightly smaller wave
  speed: 0.00005,     // slower → feels farther away
  freq: 2.8,
  color: [100, 85, 220],
  phase: 1.5,
},
      { baseY: 0.965, amp: 0.1, speed: 0.00006, freq: 1.6, color: [167, 139, 250], phase: 3.2 },
    ]

    const stars = Array.from({ length: 260 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.2,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const traceBandPath = points => {
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 1; i < points.length; i += 1) {
        const previous = points[i - 1]
        const current = points[i]
        const midX = (previous.x + current.x) / 2
        const midY = (previous.y + current.y) / 2
        ctx.quadraticCurveTo(previous.x, previous.y, midX, midY)
      }

      const lastPoint = points[points.length - 1]
      ctx.lineTo(lastPoint.x, lastPoint.y)
    }

const drawBand = (band, time) => {
  const { baseY, amp, speed, freq, color, phase } = band
 const [r, g, b] = color

const isViolet = r === 124 && g === 108 && b === 255
  const points = []
  const steps = Math.max(120, Math.ceil(width / 8))

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width
    const nx = x / width

    const wave =
      Math.sin(nx * Math.PI * freq + time * speed + phase) * amp +
      Math.sin(nx * Math.PI * freq * 0.6 + time * speed * 0.7 + phase) * amp * 0.4

    const tilt = nx * 1.1
    const y = (baseY - tilt + wave) * height

    points.push({ x, y })
  }

// ================================
// 🌫️ LIGHT PER SEGMENT (REAL AURORA)
// ================================
ctx.save()
ctx.globalAlpha = 0.85

for (let i = 0; i < points.length - 1; i++) {
  const p1 = points[i]
  const p2 = points[i + 1]

  const midY = (p1.y + p2.y) / 2

  const grad = ctx.createLinearGradient(0, midY - 120, 0, midY)

  const alpha = isViolet ? 0.08 : 0.12

  grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`)
  grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${alpha})`)

  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.lineTo(p2.x, 0)
  ctx.lineTo(p1.x, 0)
  ctx.closePath()

  ctx.fillStyle = grad
  ctx.fill()
}

ctx.restore()

  // ================================
  // ✨ MAIN AURORA LINE (clean)
  // ================================
  ctx.save()

  traceBandPath(points)

ctx.strokeStyle = isViolet
  ? `rgba(${r}, ${g}, ${b}, 0.16)`   // 👈 reduced opacity
  : `rgba(${r}, ${g}, ${b}, 0.28)`
  ctx.lineWidth = 2.5
  ctx.shadowBlur = 0
  if (!isViolet) {
  ctx.lineWidth = 3
}
  ctx.stroke()

  ctx.restore()
}

    const drawStars = time => {
      stars.forEach(star => {
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.002 + star.x * 10)
        ctx.beginPath()
        ctx.arc(
          star.x * width,
          star.y * height,
          star.radius * (0.8 + twinkle * 0.6),
          0,
          Math.PI * 2,
        )
        ctx.fillStyle = `rgba(220, 240, 255, ${star.alpha * twinkle})`
        ctx.fill()
      })
    }

    const draw = time => {
      ctx.clearRect(0, 0, width, height)

      const background = ctx.createLinearGradient(0, 0, 0, height)
      background.addColorStop(0, '#05070c')
      background.addColorStop(1, '#121a2b')
      ctx.fillStyle = background
      ctx.fillRect(0, 0, width, height)

      drawStars(time)
      bands.forEach(band => drawBand(band, time))

      animationFrameId = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    animationFrameId = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}
