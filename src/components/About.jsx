import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function AuroraCard({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ borderColor: 'rgba(95,209,198,0.3)', y: -4 }}
      data-cursor=""
      style={{
        background: 'rgba(18,26,43,0.5)',
        border: '0.5px solid rgba(95,209,198,0.12)',
        borderRadius: 12,
        padding: '1.75rem',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'border-color 0.3s',
        cursor: 'none',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

function RevealLine({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

const skills = [
  'Python',
  'Java',
  'JavaScript',
  'React',
  'Linux',
  'Raspberry Pi',
  'Node.js',
  'HTML/CSS',
  'ML Basics',
  'AWS',
  'DynamoDB',
  'REST APIs',
  'Git'
]
export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const xL = useTransform(scrollYProgress, [0, 1], [-30, 30])
  const xR = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section id="about" ref={ref} className="section" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="section-label">02 — Pieces of me</div>

      <RevealLine style={{ marginBottom: '0.3rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.5rem,5.5vw,5rem)', lineHeight: 1.25, letterSpacing: '-0.03em', color: 'var(--white-heading)' }}>
          Not sure where I fit yet. 
        </h2>
      </RevealLine>
      <RevealLine delay={0.1} style={{ marginBottom: '3.5rem' }}>
        <h2 className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(2.5rem,5.5vw,5rem)', lineHeight: 1.25, letterSpacing: '-0.03em' }}>
          Still building anyway.
        </h2>
      </RevealLine>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <motion.div style={{ x: xL }}>
          <AuroraCard delay={0.1}>
  <div style={{ fontSize: '1rem', lineHeight: 1.9, fontWeight: 300 }}>

    <p style={{ color: 'rgba(139,227,216,0.75)', marginBottom: '1.6rem' }}>
      I’m drawn to uncertainty, but I don’t leave it that way.
    </p>

    <p style={{ color: 'rgba(139,227,216,0.65)', marginBottom: '1.6rem' }}>
      I’ve never really been drawn to things that already make sense.
      If something is too clear, there’s nothing to stay for.
    </p>

    <p style={{ color: 'rgba(139,227,216,0.65)', marginBottom: '1.6rem' }}>
      What interests me is that moment before things click.
      When something is almost understood, but not quite.
    </p>

    <p style={{ color: 'rgba(139,227,216,0.65)', marginBottom: '1.6rem' }}>
      That’s usually where I start.
      Not with a full plan, but with enough curiosity to keep going.
      Somewhere in the process of building, things begin to make sense.
    </p>

    <p style={{ color: 'rgba(139,227,216,0.85)', marginBottom: '1.6rem' }}>
      Not all at once.
      <br/>
      But piece by piece, things start to fit together.
    </p>

  </div>
</AuroraCard>
        </motion.div>

        <motion.div style={{ x: xR, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AuroraCard delay={0.2}>
            <blockquote style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(1.2rem,2.2vw,1.6rem)', color: 'var(--violet-light)',
              lineHeight: 1.45, paddingLeft: '1.25rem',
              borderLeft: '1px solid var(--violet-light)',
            }}>
              I’m not chasing a career. <br/>I’m following what keeps pulling me in.
            </blockquote>
          </AuroraCard>

          <AuroraCard delay={0.3}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', color: 'var(--teal)', marginBottom: '1rem', opacity: 0.7 }}>SKILLS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {skills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  whileHover={{ borderColor: 'rgba(95,209,198,0.5)', color: 'var(--teal)' }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    letterSpacing: '0.08em', padding: '5px 12px',
                    border: '0.5px solid rgba(95,209,198,0.15)',
                    borderRadius: 20, color: 'rgba(139,227,216,0.5)',
                    cursor: 'none',
                  }}
                  data-cursor=""
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </AuroraCard>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
            {[{ n: '10+', l: 'Projects' }, { n: '∞', l: 'Curiosity' }, { n: '0', l: 'Boring days' }].map(({ n, l }, i) => (
              <AuroraCard key={l} delay={0.35 + i * 0.08} style={{ textAlign: 'center', padding: '1.25rem 0.75rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.2rem', color: 'var(--violet-soft)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', color: 'var(--violet-light)', textTransform: 'uppercase', marginTop: 5 }}>{l}</div>
              </AuroraCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
