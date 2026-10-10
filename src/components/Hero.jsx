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

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      {/* 3D Rotating Particle Sphere Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <ParticleBackground />
      </div>

      {/* Radial overlay glow behind text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 70%, #000000 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Hero Container */}
      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          padding: '6rem 1.5rem 6rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        {/* Hero Central Content */}
        <div style={{ maxWidth: '1050px', margin: '0 auto', textAlign: 'center', width: '100%' }}>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(2.8rem, 7.5vw, 6.2rem)',
                lineHeight: 1.05,
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                marginBottom: '2rem',
                color: '#ffffff',
              }}
            >
              <div style={{ display: 'block' }} className="text-glow">
                BUILDING INTELLIGENT
              </div>
              <div style={{ display: 'block' }} className="text-glow">
                SYSTEMS
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3em', flexWrap: 'wrap' }}>
                <span style={{ color: '#ffffff' }} className="text-glow">
                  &amp; SCALABLE
                </span>
                <span
                  style={{
                    color: 'var(--secondary)',
                    textShadow: '0 0 35px rgba(255,0,51,0.9), 0 0 70px rgba(255,0,51,0.5)',
                  }}
                >
                  EXPERIENCES
                </span>
              </div>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
              color: 'rgba(255,255,255,0.55)',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              marginBottom: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <span>FULL STACK DEVELOPER</span>
            <span style={{ color: 'var(--secondary)' }}>•</span>
            <span>COMPUTER VISION ENTHUSIAST</span>
          </motion.div>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
            }}
          >
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#work');
              }}
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  padding: '0.85rem 2.25rem',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
                }}
              >
                VIEW PROJECTS
              </button>
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  padding: '0.85rem 2.25rem',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--secondary)';
                  e.currentTarget.style.background = 'rgba(255,0,51,0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                CONTACT ME
              </button>
            </a>

            <a
              href="/resume.pdf"
              download="Mohammad_Ejaz_Mehendi_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  padding: '0.85rem 1.75rem',
                  background: 'rgba(255,0,51,0.1)',
                  color: 'var(--secondary)',
                  border: '1px solid rgba(255,0,51,0.3)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,0,51,0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,0,51,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Download size={14} />
                RESUME
              </button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: 'rgba(255,255,255,0.15)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            ref={scrollIndicatorRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'var(--secondary)',
              boxShadow: '0 0 10px var(--secondary)',
              transition: 'transform 0.4s ease',
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
