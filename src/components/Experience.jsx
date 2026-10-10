import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { experience } from '../data/experience';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" style={{ padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }} className="text-glow">
            Experience
          </h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              marginTop: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}
          >
            // Professional Journey
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '0',
            top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                style={{ position: 'relative', paddingLeft: '2.5rem' }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: -5,
                  top: '1.5rem',
                  width: 11, height: 11,
                  borderRadius: '50%',
                  background: 'var(--secondary)',
                  boxShadow: '0 0 15px rgba(255,0,51,0.7)',
                  animation: 'pulse 2s infinite',
                  zIndex: 1,
                }} />

                {/* Card */}
                <div
                  style={{
                    padding: '2rem',
                    background: 'rgba(8,8,8,0.8)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    transition: 'border-color 0.3s, transform 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,0,51,0.25)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}>
                    {item.period}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    color: '#ffffff',
                    marginBottom: '0.25rem',
                  }}>{item.role}</h3>
                  <h4 style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: '1.25rem',
                  }}>{item.organization}</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {item.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                        <span style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '0.1rem' }}>▹</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 15px rgba(255,0,51,0.7); }
          50% { opacity: 0.6; box-shadow: 0 0 25px rgba(255,0,51,0.4); }
        }
      `}</style>
    </section>
  );
}
