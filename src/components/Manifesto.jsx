import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const lines = [
  { text: 'I start with', italic: false, color: 'rgba(232,244,242,0.25)' },
  { text: '"that\'s strange."', italic: true, color: 'gradient' },
  { text: 'I understand by', italic: false, color: 'rgba(232,244,242,0.2)' },
  { text: 'trying things.', italic: true, color: 'gradient' },
  { text: 'I stop when', italic: false, color: 'rgba(232,244,242,0.18)' },
  { text: 'it makes enough sense.', italic: true, color: 'gradient' },
]
const unfinished = [
  {
    num: '01',
    title: 'understanding systems deeply',
    desc: 'Not just enough to use them. Enough to take them apart and rebuild.',
  },
  {
    num: '02',
    title: 'building with intention',
    desc: 'Not just making things work, but making them feel right.',
  },
  {
    num: '03',
    title: 'just getting started',
    desc: 'There’s a lot I haven’t explored yet. I’m building my way into it.',
  },
  {
  num: '04',
  title: 'following ideas through',
  desc: 'Some don’t make sense at first. I keep going until they do.',
}
]

export default function Unfinished() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="unfinished" ref={ref} className="section">
      
      {/* Section label */}
      <div className="section-label">03 — Unfinished</div>

      {/* Typographic cascade */}
      <div style={{ marginBottom: '5rem' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ overflow: 'hidden', lineHeight: 1.2 }}>
            <motion.div
              initial={{ y: '115%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.09,
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: line.italic ? 'italic' : 'normal',
                fontWeight: line.italic ? 400 : 900,
                fontSize: 'clamp(2.2rem,5.5vw,5.5rem)',
                color: line.color.includes('gradient') ? undefined : line.color,
                letterSpacing: '-0.03em',
              }}
              className={line.color.includes('gradient') ? 'gradient-text' : ''}
            >
              {line.text}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Ghost initials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.8 }}
        style={{
          position: 'absolute',
          right: '-3%',
          top: '37%',
          transform: 'translateY(-54%)',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 900,
          fontSize: 'clamp(200px, 32vw, 420px)',
          color: 'transparent',
          WebkitTextStroke: '1px var(--violet-mr,opacity:20)',
          textStroke: '1px var(--violet-mr,opacity:0.14)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.06em',
        }}
      >
        MR
      </motion.div>

      {/* Unfinished grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          borderTop: '0.5px solid rgba(95,209,198,0.1)',
        }}
      >
        {unfinished.map((item, i) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.1,
            }}
            whileHover={{ background: 'rgba(18,26,43,0.5)' }}
            data-cursor="read"
            style={{
              padding: '2.25rem 1.75rem',
              borderRight:
                i < unfinished.length - 1
                  ? '0.5px solid rgba(95,209,198,0.1)'
                  : 'none',
              cursor: 'none',
              transition: 'background 0.3s',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--teal)',
                letterSpacing: '0.2em',
                marginBottom: '1.25rem',
                opacity: 0.8,
              }}
            >
              {item.num}
            </div>

            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                color: 'var(--white)',
                marginBottom: '0.6rem',
                lineHeight: 1.2,
              }}
            >
              {item.title}
            </div>

            <div
              style={{
                fontSize: '0.87rem',
                color: 'rgba(139,227,216,0.45)',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              {item.desc}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}
