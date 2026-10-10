import { Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '3rem 0',
      background: '#000000',
    }}>
      <div className="section-container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          {/* Left */}
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.12em',
              color: '#ffffff',
              marginBottom: '0.25rem',
            }}>
              MOHAMMAD<span style={{ color: 'var(--secondary)' }}> •</span> EJAZ<span style={{ color: 'var(--secondary)' }}> •</span> MEHENDI
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
            }}>
              Full Stack Developer
            </div>
          </div>

          {/* Center */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            textAlign: 'center',
          }}>
            Designed &amp; Built With Purpose.<br />
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>© {year} Mohammad Ejaz Mehendi. Nagpur, Maharashtra, India.</span>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { icon: GithubIcon, href: 'https://github.com/ejazmehendi123-cell', label: 'GitHub' },
              { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/mohammad-ejaz-mehendi-752584365/', label: 'LinkedIn' },
              { icon: Code2, href: 'https://leetcode.com/u/Mohammad_Ejaz_Mehendi/', label: 'LeetCode' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                aria-label={label}
                style={{
                  width: 36, height: 36,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.35)',
                  transition: 'border-color 0.3s, color 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,0,51,0.4)';
                  e.currentTarget.style.color = 'var(--secondary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
