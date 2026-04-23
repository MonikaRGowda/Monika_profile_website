import './index.css'
import AuroraCanvas from './components/AuroraCanvas'
import ParticleField from './components/ParticleField'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import About from './components/About'
import Manifesto from './components/Manifesto'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Unfinished from './components/Manifesto'

export default function App() {
  return (
    <>
      {/* Layer 1: Aurora canvas (fixed, behind everything) */}
      <AuroraCanvas />

      {/* Layer 2: Particle / ripple field */}
      <ParticleField />

      {/* Layer 3: UI content */}
      <div style={{ position: 'relative', zIndex: 3 }}>

        {/* Minimal floating nav */}
        <nav style={{
          position: 'fixed', top: 28, left: '50%', transform: 'translateX(-50%)',
          zIndex: 50, display: 'flex', alignItems: 'center', gap: '0.25rem',
          padding: '10px 18px',
          background: 'rgba(5,7,12,0.7)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '0.5px solid rgba(95,209,198,0.12)',
          borderRadius: 100,
        }}>
          <a href="#" data-cursor="home" style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--teal)', letterSpacing: '0.12em',
            marginRight: '0.75rem', paddingRight: '0.75rem',
            borderRight: '0.5px solid rgba(95,209,198,0.18)',
            cursor: 'none',
          }}>MR</a>
          {['about','unfinished','projects','contact'].map(id => (
            <a key={id} href={`#${id}`} data-cursor="" style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '6px 14px', borderRadius: 100,
              color: 'rgba(139,227,216,0.45)', cursor: 'none',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--teal)'}
            onMouseLeave={e => e.target.style.color = 'rgba(139,227,216,0.45)'}
            >{id}</a>
          ))}
        </nav>

        <main>
          <Hero />
          <div className="divider" />
          <About />
          <div className="divider" />
          <Manifesto />
          <div className="divider" />
          <Projects />
          <div className="divider" />
          <Contact />
        </main>

        <footer style={{
          padding: '2rem 4rem',
          borderTop: '0.5px solid rgba(95,209,198,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(95,209,198,0.3)', letterSpacing: '0.1em' }}>
            Monika R. · B.Tech AIML · 2026
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(95,209,198,0.3)', letterSpacing: '0.12em' }}>
            Designed, not generated.
          </span>
        </footer>
      </div>

      {/* Layer 4: Cursor (top) */}
      <Cursor />
    </>
  )
}
