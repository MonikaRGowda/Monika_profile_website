import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const PHRASES = [
  "I like problems that don’t come with clean answers.",
  "Half my ideas start at midnight. The better half survive till morning.",
  "Some things don’t need solving, they need exploring.",
  "Shaping ideas into things that feel a little more alive, one experiment at a time.",
  "Debugging life and code with equal confusion.",
  "I build. I break. I build again, but cooler.",
]

function useTypewriter(phrases) {
  const [text, setText] = useState('')
  const [pi, setPi] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    const target = phrases[pi]
    clearTimeout(timer.current)
    if (!deleting && text.length < target.length) {
      timer.current = setTimeout(() => setText(target.slice(0, text.length + 1)), 40)
    } else if (!deleting && text.length === target.length) {
      timer.current = setTimeout(() => setDeleting(true), 2600)
    } else if (deleting && text.length > 0) {
      timer.current = setTimeout(() => setText(target.slice(0, text.length - 1)), 18)
    } else {
      setDeleting(false)
      setPi(p => (p + 1) % phrases.length)
    }
    return () => clearTimeout(timer.current)
  }, [text, deleting, pi])

  return text
}

function WordReveal({ text, delay = 0, italic = false, color, className = '' }) {
  return (
    <span className={className} style={{ display: 'inline', fontStyle: italic ? 'italic' : 'normal', color }}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '115%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.08 }}
          >
            {word}{i < text.split(' ').length - 1 ? '\u00a0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Badge({ children, x, y, delay, rotate = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        position: 'absolute', left: x, top: y, rotate,
        background: 'rgba(18,26,43,0.75)',
        border: '0.5px solid rgba(95,209,198,0.25)',
        borderRadius: 100, padding: '8px 18px',
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--teal)', letterSpacing: '0.1em',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 3, whiteSpace: 'nowrap',
      }}
    >
      <motion.span
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, delay }}
        style={{
          display: 'inline-block', width: 6, height: 6,
          borderRadius: '50%', background: 'var(--teal)',
          marginRight: 8, verticalAlign: 'middle',
        }}
      />
      {children}
    </motion.div>
  )
}

export default function Hero() {
  const typed = useTypewriter(PHRASES)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const [now, setNow] = useState('')
  useEffect(() => {
    const tick = () => setNow(
      new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section ref={ref} style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '0 4rem', position: 'relative', overflow: 'hidden',
      zIndex: 3,
    }}>

      {/* Ghost initials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.8 }}
        style={{
          position: 'absolute', right: '-3%', top: '50%',
          transform: 'translateY(-54%)',
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontWeight: 900, fontSize: 'clamp(200px, 32vw, 420px)',
          color: 'transparent',
          WebkitTextStroke: '1px var(--violet-mr)', textStroke: '1px var(--violet-mr,opacity:0.14)',
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '-0.06em',
        }}
      >MR</motion.div>

      {/* Floating badges */}
      <Badge x="58%" y="14%" delay={1.5} rotate={-2}>B.Tech AIML</Badge>
      <Badge x="64%" y="68%" delay={1.7} rotate={1.5}>Bengaluru · {now}</Badge>
      <Badge x="55%" y="44%" delay={1.9} rotate={-1}>If it’s interesting, I’m in.</Badge>

      {/* Thin horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', left: 0, right: 0, top: '50%',
          height: '0.5px',
          background: 'linear-gradient(90deg, transparent, rgba(95,209,198,0.07), transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* Main content */}
      <motion.div style={{ position: 'relative', zIndex: 4, y, opacity, maxWidth: 640 }}>

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'var(--teal)', marginBottom: '2rem',
            display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.85,
          }}
        >
          <motion.span
            animate={{ width: ['16px', '36px', '16px'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: '0.5px', background: 'var(--teal)', display: 'inline-block', flexShrink: 0 }}
          />
          Start · then figure out
        </motion.div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4.2rem, 9.5vw, 9rem)',
          fontWeight: 900, lineHeight: 0.9,
          letterSpacing: '-0.03em', marginBottom: '1.8rem',
        }}>
          <div style={{ overflow: 'hidden' }}>
            <WordReveal text="Monika" delay={0.35} />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <WordReveal text="R." delay={0.55} italic className="gradient-text" />
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', lineHeight: 1.8,
            color: 'rgba(139,227,216,0.6)', maxWidth: 460,
            fontWeight: 300, marginBottom: '2.8rem', minHeight: '3.2rem',
          }}
        >
          {typed}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
            style={{
              display: 'inline-block', width: 1.5, height: '0.85em',
              background: 'var(--teal)', marginLeft: 2, verticalAlign: 'middle',
            }}
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <motion.a
            href="#projects" data-cursor="view"
            whileHover={{ scale: 1.03, boxShadow: '0 0 28px var(--violet-light)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '13px 30px',
              background: 'var(--violet-dark)',
              border: '0.5px solid var(--violet-light)',
              borderRadius: 4, color: 'var(--violet-light)', display: 'inline-block',
            }}
          >
            see my work
          </motion.a>
          <motion.a
            href="#contact" data-cursor="hi"
            whileHover={{ color: 'var(--violet-light)', x: 4 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(139,227,216,0.4)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}
          >
            say hello
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>→</motion.span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', translateX: '-50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 4,
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.25em', color: 'rgba(95,209,198,0.3)', textTransform: 'uppercase' }}>scroll</span>
        <div style={{ width: 1, height: 44, background: 'rgba(95,209,198,0.1)', position: 'relative', overflow: 'hidden', borderRadius: 1 }}>
          <motion.div
            style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'rgba(95,209,198,0.5)', borderRadius: 1 }}
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
