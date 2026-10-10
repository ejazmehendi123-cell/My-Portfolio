import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data/achievements';
import { certifications } from '../data/certifications';
import { Award, ExternalLink } from 'lucide-react';

const extras = [
  { label: 'HackerRank Problem Solving (Basic) Certification', org: 'HackerRank' },
  { label: 'Participation – Techfest IIT Bombay', org: 'IIT Bombay' },
  { label: 'Google Cloud Career Launchpad – Computing Foundations', org: 'Google Cloud' },
  { label: 'Co-Lead of Technical (Deep Learning)', org: 'NVIDIA Supercomputing Club' },
];

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section style={{ padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
            Achievements
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
            // Milestones &amp; Recognition
          </motion.p>
        </motion.div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1.25rem',
          marginBottom: '4rem',
        }}>
          {achievements.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              style={{
                padding: '1.75rem 1.5rem',
                background: 'rgba(8,8,8,0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px',
                textAlign: 'center',
                transition: 'border-color 0.3s, background 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,0,51,0.3)';
                e.currentTarget.style.background = 'rgba(255,0,51,0.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.background = 'rgba(8,8,8,0.8)';
              }}
            >
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '2rem',
                color: '#ffffff',
                marginBottom: '0.4rem',
              }}>{item.value}</div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '1.25rem',
          }}>
            Certifications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3rem' }}>
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.5rem',
                  background: 'rgba(8,8,8,0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px',
                  gap: '1rem',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Award size={14} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                    {cert.name}
                  </span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'rgba(255,255,255,0.3)',
                  whiteSpace: 'nowrap',
                }}>
                  {cert.issuer}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Extras */}
          <h3 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '1.25rem',
          }}>
            Other Highlights
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {extras.map((extra, i) => (
              <motion.div
                key={extra.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.5rem',
                  background: 'rgba(8,8,8,0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px',
                  gap: '1rem',
                  transition: 'border-color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--secondary)', fontSize: '0.7rem', flexShrink: 0 }}>▹</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                    {extra.label}
                  </span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'rgba(255,255,255,0.3)',
                  whiteSpace: 'nowrap',
                }}>
                  {extra.org}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
