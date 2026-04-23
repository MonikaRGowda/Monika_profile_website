import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const line = {
  text: 'Things I made because',
  gradient: true, // 👈 key
  color: 'var(--white)'
}

const projects = [
  {
    id: '01',
    name: 'Security Query System',
    type: 'System · Knowledge Graph + LLM',
    year: '2026',
    desc: "Security checks are usually buried in reports and tools. I built a system where you can ask questions instead — mapping them to a knowledge graph to surface vulnerabilities and recommendations.",
    learned: "How structured data, relationships, and language models can work together to make complex systems easier to navigate.",
    tags: ['Neo4j', 'Knowledge Graphs', 'LLM', 'Gemini API'],
    accent: [95, 209, 198], // teal (flagship)
    big: 'KG',
  },

  {
    id: '02',
    name: 'Recipes to Cook',
    type: 'Web App · API',
    year: '2024',
    desc: "Started as a simple idea — what can I cook with what I already have. Turned into figuring out how messy real-world data actually is.",
    learned: "APIs don’t just return data, they return assumptions. Learned how to work around both.",
    tags: ['React', 'JavaScript', 'REST API'],
    accent: [124, 108, 255], // violet
    big: 'API',
  },

  {
    id: '03',
    name: 'Raspberry Pi NAS',
    type: 'Hardware · Linux',
    year: '2025',
    desc: "I wanted my data to live somewhere I actually understood. Built a small NAS on a Raspberry Pi — not because it was easier, but because I wanted control.",
    learned: "How systems behave when you actually depend on them. Linux permissions, storage, and a bit of patience.",
    tags: ['Raspberry Pi', 'Linux', 'Networking'],
    accent: [95, 209, 198], // teal
    big: 'NAS',
  },

  {
    id: '04',
    name: 'Debate Arena',
    type: 'Real-time · System',
    year: '2026',
    desc: "I wanted to see how real-time interaction actually feels when multiple people are involved. Built a debate platform where conversations aren’t static — they evolve live.",
    learned: "How state, timing, and user interaction change when systems operate in real time.",
    tags: ['WebSockets', 'React', 'Node.js'],
    accent: [124, 108, 255], // violet
    big: 'RT',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const innerY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const [r, g, b] = project.accent

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      data-cursor="explore"
      style={{
        background: `rgba(18,26,43,0.6)`,
        border: `0.5px solid rgba(${r},${g},${b},${hovered ? 0.35 : 0.1})`,
        borderRadius: 14, overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        minHeight: 300, cursor: 'none',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'border-color 0.35s',
      }}
    >
{/* Left info */}
<div style={{
  padding: '2.25rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  zIndex: 2
}}>
  <div>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1.8rem'
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.18em',
        color: `rgba(${r},${g},${b},0.7)`,
        textTransform: 'uppercase'
      }}>
        {project.type}
      </span>

      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'rgba(255,255,255,0.25)'
      }}>
        {project.year}
      </span>
    </div>

    <h3 style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(1.6rem,2.8vw,2.2rem)',
      fontWeight: 700,
      color: 'var(--white)',
      lineHeight: 1.1,
      marginBottom: '1.1rem'
    }}>
      {project.name}
    </h3>

    <p style={{
      fontSize: '0.9rem',
      lineHeight: 1.8,
      color: 'rgba(255,255,255,0.55)',
      fontWeight: 300
    }}>
      {project.desc}
    </p>
  </div>

  <div>
    <div style={{
      paddingTop: '1.25rem',
      borderTop: `0.5px solid rgba(${r},${g},${b},0.12)`,
      marginBottom: '1rem'
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        color: `rgba(${r},${g},${b},0.8)`,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        display: 'block',
        marginBottom: 6
      }}>
        what stayed with me
      </span>

      <span style={{
        fontSize: '0.82rem',
        color: 'rgba(255,255,255,0.45)',
        lineHeight: 1.65
      }}>
        {project.learned}
      </span>
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {project.tags.map(t => (
        <span key={t} style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.08em',
          padding: '4px 10px',
          border: `0.5px solid rgba(${r},${g},${b},0.3)`,
          borderRadius: 20,
          color: `rgba(${r},${g},${b},0.75)`,
          textTransform: 'uppercase',
        }}>
          {t}
        </span>
      ))}
    </div>
  </div>
</div>

      {/* Right decorative panel */}
      <motion.div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(${r},${g},${b},0.04), rgba(${r},${g},${b},0.01))`,
        y: innerY,
      }}>
        <motion.span
          animate={{ opacity: hovered ? 0.22 : 0.06, scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900,
            fontSize: 'clamp(70px,11vw,140px)', color: `rgb(${r},${g},${b})`,
            userSelect: 'none', letterSpacing: '-0.05em',
          }}
        >
          {project.big}
        </motion.span>
        <span style={{
          position: 'absolute', bottom: '1.5rem', right: '1.5rem',
          fontFamily: 'var(--font-mono)', fontSize: '3.5rem', fontWeight: 700,
          color: 'rgba(255,255,255,0.03)', lineHeight: 1,
        }}>{project.id}</span>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse at center, rgba(${r},${g},${b},0.1) 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-label">04 — What I've been building</div>

      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
  initial={{ y: '100%' }}
  animate={{ y: '0%' }}
  transition={{
    duration: 0.95,
    ease: [0.16, 1, 0.3, 1],
  }}
  style={{
    fontFamily: 'var(--font-display)',
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: 'clamp(2.2rem,5.5vw,5.5rem)',
    letterSpacing: '-0.03em',

    ...(line.gradient
      ? {
          background: 'var(--white-heading)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }
      : {
          color: line.color,
        }),
  }}
>
  {line.text}
</motion.h2>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <motion.h2
  className="gradient-text"
  initial={{ y: '100%' }}
  whileInView={{ y: '0%' }}
  viewport={{ once: true }}
  transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
  style={{
    fontFamily: 'var(--font-display)',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: 'clamp(2.2rem,5vw,5rem)',
    letterSpacing: '-0.03em',
    lineHeight: 1.2,
    WebkitTextFillColor: 'transparent',
  }}
>
  they should exist.
</motion.h2>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  )
}
