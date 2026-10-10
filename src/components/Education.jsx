import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const focusAreas = [
  'Data Structures & Algorithms',
  'Full Stack Development',
  'Database Systems',
  'Cloud Computing',
  'Software Engineering',
  'Operating Systems',
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="education"
      style={{
        padding: '6rem 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
      }}
    >
      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
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
            Education
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
            // Academic Profile
          </motion.p>
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ maxWidth: '820px', margin: '0 auto' }}
        >
          <div
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(5,5,5,0.9)',
              backdropFilter: 'blur(12px)',
              borderRadius: '14px',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background accent */}
            <div style={{
              position: 'absolute',
              top: -80, right: -80,
              width: 220, height: 220,
              background: 'rgba(255,0,51,0.06)',
              filter: 'blur(80px)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />

            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: 48, height: 48,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  <GraduationCap size={22} />
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#ffffff',
                  }}>
                    Ramdeobaba University
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginTop: '0.2rem',
                  }}>
                    Nagpur, Maharashtra, India
                  </div>
                </div>
              </div>

              {/* CGPA Badge */}
              <div style={{
                background: 'rgba(255,0,51,0.12)',
                border: '1px solid rgba(255,0,51,0.3)',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                textAlign: 'center',
                flexShrink: 0,
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: 'var(--secondary)',
                }}>9.36</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'rgba(255,0,51,0.7)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>CGPA / 10</div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1.5rem' }} />

            {/* Degree info */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.35rem',
                color: '#ffffff',
                marginBottom: '0.5rem',
              }}>
                B.Tech in Computer Science and Engineering
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}>Period</span>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: '0.25rem',
                  }}>2024 – 2028</div>
                </div>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}>Status</span>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: '0.25rem',
                  }}>Third Year</div>
                </div>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}>Expected Graduation</span>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.6)',
                    marginTop: '0.25rem',
                  }}>2028</div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: '1.25rem' }} />

            {/* Focus areas */}
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '0.75rem',
              }}>Focus Areas</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {focusAreas.map((area) => (
                  <span key={area} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.55)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '4px',
                  }}>{area}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
