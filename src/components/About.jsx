import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download } from 'lucide-react';

const stats = [
  { value: '4+', label: 'Projects Built' },
  { value: '15+', label: 'Technologies' },
  { value: '200+', label: 'LeetCode Problems' },
  { value: '5+', label: 'Hackathons' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" style={{ padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="section-container" ref={ref}>
        {/* Section heading */}
        <motion.div
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
            About
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
            // Developer Profile
          </motion.p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }} className="about-grid">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center' }}
            className="about-img-col"
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '300px', aspectRatio: '1' }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(255,0,51,0.15)',
                filter: 'blur(60px)',
                borderRadius: '50%',
              }} />
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src="/images/profile.jpg"
                  alt="Mohammad Ejaz Mehendi"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    opacity: 0.9,
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)';
                    e.target.parentElement.innerHTML += `<span style="font-family:var(--font-heading);font-size:4rem;color:rgba(255,255,255,0.1)">ME</span>`;
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                }} />
                <div style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  width: 8, height: 8,
                  borderRadius: '50%', background: 'var(--secondary)',
                  animation: 'pulse 2s infinite',
                }} />
                <div style={{
                  position: 'absolute', bottom: '1rem', right: '1rem',
                  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                  color: 'rgba(255,255,255,0.4)',
                }}>SYS.ON</div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="about-text-col"
          >
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.85)',
              marginBottom: '1.25rem',
            }}>
              I am a{' '}
              <span style={{ color: '#ffffff', fontWeight: 500 }}>Computer Science and Engineering</span>{' '}
              student at Ramdeobaba University with a strong interest in full-stack development, scalable web applications, and intelligent software systems.
            </p>
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '2rem',
            }}>
              I work with React.js, Node.js, databases, REST APIs, and authentication systems, while continuously strengthening my problem-solving skills through Data Structures and Algorithms in Java. My interest extends to computer vision, deep learning, and cloud computing.
            </p>

            <a href="/resume.pdf" download="Mohammad_Ejaz_Mehendi_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
              <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={15} />
                Download Resume
              </button>
            </a>

            {/* Stats grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginTop: '2.5rem',
            }} className="stats-grid">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="stat-card"
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '8px',
                    textAlign: 'center',
                    transition: 'border-color 0.3s, background 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,0,51,0.3)';
                    e.currentTarget.style.background = 'rgba(255,0,51,0.05)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1.75rem',
                    color: '#ffffff',
                    marginBottom: '0.25rem',
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid { grid-template-columns: 5fr 7fr !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (min-width: 640px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
