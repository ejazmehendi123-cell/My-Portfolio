import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

export default function Hero() {
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    const el = scrollIndicatorRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      el.style.transform = 'translateY(0)';
      setTimeout(() => {
        el.style.transform = 'translateY(100%)';
        setTimeout(() => {
          el.style.transform = 'translateY(0)';
        }, 300);
      }, 700);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Particle background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <ParticleBackground />
      </div>

      {/* Radial fade overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 60%, #000 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="section-container" style={{ position: 'relative', zIndex: 2, width: '100%', padding: '6rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>

          {/* Status line */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#22c55e',
              display: 'inline-block',
              boxShadow: '0 0 10px #22c55e',
              animation: 'pulse 2s infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
            }}>
              System Online — Available for Software Engineering Opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                lineHeight: 1.0,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                marginBottom: '1.5rem',
              }}
            >
              <span className="text-glow" style={{ color: '#ffffff' }}>
                Building Intelligent
              </span>
              <br />
              <span className="text-glow" style={{ color: '#ffffff' }}>
                Systems
              </span>
              {' '}
              <span style={{ color: 'var(--secondary)' }} className="text-glow-red">
                &amp;
              </span>
              <br />
              <span style={{ color: 'var(--secondary)' }} className="text-glow-red">
                Scalable Experiences
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 2vw, 0.85rem)',
              color: 'rgba(255,255,255,0.45)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '3rem',
            }}
          >
            Full Stack Developer • React.js • Node.js • MongoDB
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
          >
            <a href="#work" onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#work');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }}>
              <button className="btn-primary">
                <span>View Projects</span>
                <span className="btn-fill" />
              </button>
            </a>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#contact');
              if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
            }}>
              <button className="btn-outline">Contact Me</button>
            </a>
            <a href="/resume.pdf" download="Mohammad_Ejaz_Mehendi_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={14} />
                Download Resume
              </button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.3)',
        }}>
          Scroll
        </span>
        <div style={{ width: 1, height: 48, background: 'rgba(255,255,255,0.15)', overflow: 'hidden', position: 'relative' }}>
          <div
            ref={scrollIndicatorRef}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '50%',
              background: 'var(--secondary)',
              transition: 'transform 0.4s ease',
            }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
