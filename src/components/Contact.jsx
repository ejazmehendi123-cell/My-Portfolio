import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ejazmehendi123@gmail.com',
    href: 'mailto:ejazmehendi123@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9021712237',
    href: 'tel:+919021712237',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Nagpur, Maharashtra, India',
    href: null,
  },
];

const socialLinks = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    href: 'https://github.com/ejazmehendi123-cell',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohammad-ejaz-mehendi-752584365/',
  },
  {
    icon: Code2,
    label: 'LeetCode',
    href: 'https://leetcode.com/u/Mohammad_Ejaz_Mehendi/',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.querySelector('#name').value;
    const message = form.querySelector('#message').value;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:ejazmehendi123@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" style={{ padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
            Contact
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
            // Establish Connection
          </motion.p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }} className="contact-grid">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              lineHeight: 1.15,
              color: '#ffffff',
              marginBottom: '1.5rem',
            }}>
              Let's Build<br />
              <span style={{ color: 'var(--secondary)' }}>Something</span>{' '}
              Together.
            </h3>

            <p style={{
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.8,
              fontSize: '0.9rem',
              marginBottom: '2.5rem',
            }}>
              Have a project idea, internship opportunity, or something interesting to build? Let's connect and create something great.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {contactLinks.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <div style={{
                      width: 36, height: 36,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'border-color 0.3s, background 0.3s',
                    }}>
                      <Icon size={14} style={{ color: 'var(--secondary)' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.15rem' }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    style={{
                      width: 42, height: 42,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.5)',
                      transition: 'border-color 0.3s, color 0.3s, background 0.3s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--secondary)';
                      e.currentTarget.style.color = 'var(--secondary)';
                      e.currentTarget.style.background = 'rgba(255,0,51,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Right side — contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <form
              onSubmit={handleSend}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                padding: '2rem',
                background: 'rgba(8,8,8,0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
              }}
            >
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Internship / Project / Hello' },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    marginBottom: '0.5rem',
                  }}>{field.label}</label>
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '6px',
                      color: '#ffffff',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,0,51,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'rgba(255,255,255,0.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: '0.5rem',
                }}>Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.875rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,0,51,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Send Message</span>
                <span className="btn-fill" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </section>
  );
}
