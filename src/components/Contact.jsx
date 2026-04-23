import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

function GlowInput({ label, type = 'text', multi = false, name }) {
  const [focused, setFocused] = useState(false)
  const Tag = multi ? 'textarea' : 'input'

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <motion.label
        animate={{ color: focused ? 'var(--violet-soft)' : 'rgba(167,139,250,0.5)' }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
          display: 'block',
        }}
      >
        {label}
      </motion.label>

      <motion.div
        animate={{
          borderColor: focused ? 'rgba(167,139,250,0.5)' : 'rgba(167,139,250,0.15)',
          boxShadow: focused
            ? '0 0 20px rgba(167,139,250,0.15), inset 0 0 20px rgba(167,139,250,0.05)'
            : 'none',
        }}
        style={{
          border: '0.5px solid rgba(167,139,250,0.15)',
          borderRadius: 6,
        }}
      >
        <Tag
          name={name}
          type={type}
          rows={multi ? 5 : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            background: 'rgba(18,26,43,0.6)',
            border: 'none',
            outline: 'none',
            padding: '0.85rem 1rem',
            color: 'var(--white)',
          }}
        />
      </motion.div>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true })
  
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    emailjs.sendForm(
      'service_hckmlog',
      'template_8e1myb6',
      formRef.current,
      'BXPS6g7OkK7MZG0vX'
    )
    .then(() => {
      setStatus('sent')
    })
    .catch(() => {
      setStatus('error')
    })
  }

  return (
    <section id="contact" ref={ref} className="section" style={{ paddingBottom: '10rem' }}>
      <div className="section-label">06 — Let's connect</div>
      <div
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '5rem',
    alignItems: 'start',
    width: '100%',
  }}
>  {/* Left — big text */}
        <div>
          <div style={{ overflow: 'hidden', marginBottom: '0.3rem' }}>
            <motion.h2
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,5.5rem)', lineHeight: 1.2, letterSpacing: '-0.03em', color: 'var(--white-heading)' }}
            >
              Got something 
            </motion.h2>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
            <motion.h2
              className="gradient-text"
              initial={{ y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(2.5rem,5vw,5.5rem)', lineHeight: 1.3, letterSpacing: '-0.03em' }}
            >
              cool in mind?
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontSize: '1rem', color: 'rgba(139,227,216,0.5)', lineHeight: 1.9, fontWeight: 300, marginBottom: '2.5rem' }}
          >
          If it’s been on your mind,
          <br></br>it’s worth saying.
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
          >
            {[
              { label: 'Email', value: 'monikargowda7@gmail.com', href: 'mailto:monikargowda7@gmail.com' },
              { label: 'LinkedIn', value: 'linkedin.com/in/monika-r', href: 'https://www.linkedin.com/in/monika-r-33a0192b9/' },
              { label: 'GitHub', value: 'github.com/MonikaRGowda', href: 'https://github.com/MonikaRGowda' },
            ].map(({ label, value, href }) => (
              <motion.a
                key={label} href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                data-cursor="visit"
                whileHover={{ x: 6, color: 'var(--teal)' }}
                style={{
                  display: 'flex', gap: '1.5rem', alignItems: 'center',
                  fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'rgba(139,227,216,0.45)', letterSpacing: '0.08em',
                  cursor: 'none',
                }}
              >
                <span style={{ color: 'rgba(95,209,198,0.35)', minWidth: 60, textTransform: 'uppercase', fontSize: 9, letterSpacing: '0.2em' }}>{label}</span>
                {value}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <div>
          {status !== 'sent' ? (
            <form ref={formRef} onSubmit={handleSubmit}
              style={{
                background: 'var(--violet-dark)',
                border: '0.5px solid var(--violet-light)',
                padding: '2rem',
                borderRadius: 12,
              }}
            >
              <GlowInput label="Name" name="name" />
              <GlowInput label="Email" name="email" type="email" />
              <GlowInput label="Message" name="message" multi />

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '0.5px solid var(--violet-light)',
                  background: 'transparent',
                  color: 'var(--violet-soft)',
                  marginTop: '1rem',
                  cursor: 'pointer',
                }}
              >
                {status === 'sending' ? 'Sending…' : 'Send message →'}
              </motion.button>

              {status === 'error' && (
                <p style={{ color: 'red', marginTop: '1rem' }}>
                  Something went wrong. Try again.
                </p>
              )}
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ fontSize: '1.3rem', color: 'white' }}>
                Message sent!
              </p>
            </div>
          )}
        </div>
</div>
    </section>
  )
}
