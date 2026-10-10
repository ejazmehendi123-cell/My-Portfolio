import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitBranch, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      style={{ position: 'relative' }}
    >
      <div
        className="project-card-outer"
        style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'transform 0.35s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        {/* Glow overlay on hover */}
        <div
          className="card-glow"
          style={{
            position: 'absolute',
            inset: -1,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(255,0,51,0.4), rgba(255,50,100,0.2))',
            opacity: 0,
            transition: 'opacity 0.5s ease',
            filter: 'blur(6px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            background: 'rgba(8,8,8,0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            zIndex: 1,
            transition: 'border-color 0.3s ease',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,0,51,0.3)';
            if (e.currentTarget.previousSibling) {
              e.currentTarget.previousSibling.style.opacity = '1';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            if (e.currentTarget.previousSibling) {
              e.currentTarget.previousSibling.style.opacity = '0';
            }
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              minHeight: '380px',
            }}
            className="project-grid"
          >
            {/* Image / Visual side */}
            <div
              style={{
                background: '#050505',
                position: 'relative',
                minHeight: '260px',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                overflow: 'hidden',
              }}
              className="project-img-col"
            >
              {project.image ? (
                <>
                  <img
                    src={project.image}
                    alt={project.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s',
                      opacity: 0.88,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  {/* Subtle dark vignette overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                </>
              ) : (
                /* Fallback visual if no image */
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(3rem, 10vw, 5rem)',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.04)',
                      letterSpacing: '-0.05em',
                    }}
                  >
                    {project.id}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', padding: '0 1rem' }}>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6rem',
                          color: 'rgba(255,0,51,0.6)',
                          border: '1px solid rgba(255,0,51,0.2)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '3px',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Content side */}
            <div
              style={{
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              className="project-content-col"
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  marginBottom: '0.75rem',
                }}
              >
                Featured Project {project.id}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.35rem, 3vw, 1.85rem)',
                  color: '#ffffff',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                {project.name}
              </h3>

              <p
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                }}
              >
                {project.description}
              </p>

              {/* Technologies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'rgba(255,255,255,0.6)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button className="btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <GitBranch size={13} />
                      SOURCE
                    </button>
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button className="btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ExternalLink size={13} />
                      <span>LIVE DEMO</span>
                      <span className="btn-fill" />
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .project-grid { grid-template-columns: 7fr 5fr !important; }
          .project-img-col { border-bottom: none !important; border-right: 1px solid rgba(255,255,255,0.07) !important; min-height: unset !important; }
        }
      `}</style>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" style={{ padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
            className="text-glow"
          >
            Work
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
            // Selected Projects
          </motion.p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
