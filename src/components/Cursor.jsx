import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function TrailDot({ x, y }) {
  return (
    <motion.div
      initial={{ opacity: 0.8, scale: 1 }}
      animate={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        left: x, top: y,
        width: 4, height: 4,
        borderRadius: '50%',
        background: `rgba(95,209,198,0.6)`,
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none',
        zIndex: 9997,
        filter: 'blur(1px)',
      }}
    />
  )
}

export default function Cursor() {
  const [label, setLabel] = useState('')
  const [hovered, setHovered] = useState(false)
  const [trail, setTrail] = useState([])
  const trailId = useRef(0)
  const lastTrail = useRef(0)

  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  // Tight spring for dot
  const dx = useSpring(mx, { stiffness: 600, damping: 38 })
  const dy = useSpring(my, { stiffness: 600, damping: 38 })

  // Laggy spring for ring
  const rx = useSpring(mx, { stiffness: 90, damping: 22 })
  const ry = useSpring(my, { stiffness: 90, damping: 22 })

  useEffect(() => {
    const onMove = e => {
      mx.set(e.clientX)
      my.set(e.clientY)

      const now = Date.now()
      if (now - lastTrail.current > 55) {
        lastTrail.current = now
        const id = trailId.current++
        setTrail(prev => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }])
      }
    }

    const setup = () => {
      document.querySelectorAll('[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setHovered(true)
          setLabel(el.dataset.cursor || '')
        })
        el.addEventListener('mouseleave', () => {
          setHovered(false)
          setLabel('')
        })
      })
    }

    window.addEventListener('mousemove', onMove)
    // Re-run after mount to catch dynamically rendered elements
    const t = setTimeout(setup, 800)

    return () => {
      window.removeEventListener('mousemove', onMove)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      {/* Trail */}
      {trail.map(pt => (
        <TrailDot key={pt.id} x={pt.x} y={pt.y} />
      ))}

      {/* Ring / halo */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9998,
          x: rx, y: ry,
          translateX: '-50%', translateY: '-50%',
          borderRadius: '50%',
          border: '1px solid rgba(95,209,198,0.35)',
          pointerEvents: 'none',
        }}
        animate={{
          width:  hovered ? 68 : 38,
          height: hovered ? 68 : 38,
          opacity: hovered ? 0.9 : 0.55,
          borderColor: hovered ? 'rgba(167,139,250,0.7)' : 'rgba(95,209,198,0.35)',
          boxShadow: hovered
            ? '0 0 20px rgba(167,139,250,0.3), 0 0 40px rgba(167,139,250,0.1)'
            : '0 0 10px rgba(95,209,198,0.15)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {label && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 8, letterSpacing: '0.1em',
              color: 'var(--violet-soft)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Core orb */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 9999,
          x: dx, y: dy,
          translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none',
          borderRadius: '50%',
        }}
        animate={{
          width:  hovered ? 12 : 7,
          height: hovered ? 12 : 7,
          background: hovered
            ? 'radial-gradient(circle, rgba(167,139,250,1) 0%, rgba(124,108,255,0.6) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(139,227,216,1) 0%, rgba(95,209,198,0.5) 60%, transparent 100%)',
          boxShadow: hovered
            ? '0 0 12px rgba(167,139,250,0.9), 0 0 24px rgba(124,108,255,0.4)'
            : '0 0 8px rgba(95,209,198,0.8), 0 0 16px rgba(95,209,198,0.3)',
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  )
}
