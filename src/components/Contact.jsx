import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Code2, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

// ── My contact details (left-side display only — NOT form defaults) ────────
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

// ── Empty form state — always starts blank ────────────────────────────────
const EMPTY_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '', // honeypot — hidden from real users
};

// ── Input field style helpers ──────────────────────────────────────────────
const inputStyle = {
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
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Form state — controlled React inputs
  const [form, setForm] = useState(EMPTY_FORM);

  // UI states
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // ── Field change handler ────────────────────────────────────────────────
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear individual field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }, [fieldErrors]);

  // ── Client-side validation ──────────────────────────────────────────────
  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Full name is required.';
    if (!form.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim()) errors.subject = 'Subject is required.';
    if (!form.message.trim()) errors.message = 'Message is required.';
    else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
    return errors;
  };

  // ── Submit handler ──────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (status === 'sending') return;

    // Clear previous feedback
    setFieldErrors({});
    setErrorMessage('');

    // Client-side validation first
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          website: form.website, // honeypot
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus('success');
        setForm(EMPTY_FORM); // Clear form only on confirmed success
      } else {
        setStatus('error');
        setErrorMessage(
          data?.message ||
          'Your message could not be sent. Please try again later.'
        );
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err?.message || 'Your message could not be sent. Please try again later.'
      );
    }
  };

  // ── Focus / blur border helpers ─────────────────────────────────────────
  const onFocus = (e) => (e.target.style.borderColor = 'rgba(255,0,51,0.4)');
  const onBlur  = (e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)');

  const isSending = status === 'sending';
  const isSuccess = status === 'success';

  return (
    <section id="contact" style={{ padding: '6rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="section-container">
        {/* Section heading */}
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

          {/* ── Left: My contact details ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              LET'S BUILD<br />
              <span style={{ color: 'var(--secondary)' }}>SOMETHING</span>{' '}
              TOGETHER.
            </h3>

            <p
              style={{
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.8,
                fontSize: '0.9rem',
                marginBottom: '2.5rem',
              }}
            >
              Have a project idea, internship opportunity, or something interesting to build?
              Let's connect and create something great.
            </p>

            {/* Contact detail rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {contactLinks.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                    <div
                      style={{
                        width: 36, height: 36,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'border-color 0.3s, background 0.3s',
                      }}
                    >
                      <Icon size={14} style={{ color: 'var(--secondary)' }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.55rem',
                          color: 'rgba(255,255,255,0.3)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          marginBottom: '0.15rem',
                        }}
                      >
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--secondary)';
                      e.currentTarget.style.color = 'var(--secondary)';
                      e.currentTarget.style.background = 'rgba(255,0,51,0.08)';
                    }}
                    onMouseLeave={(e) => {
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

          {/* ── Right: Contact form ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Success banner */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  background: 'rgba(0, 200, 100, 0.08)',
                  border: '1px solid rgba(0, 200, 100, 0.25)',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                }}
              >
                <CheckCircle size={18} style={{ color: '#00c864', flexShrink: 0, marginTop: '0.1rem' }} />
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                  Thank you! Your message has been received successfully. I'll get back to you soon.
                </p>
              </motion.div>
            )}

            {/* Error banner */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  background: 'rgba(255,0,51,0.08)',
                  border: '1px solid rgba(255,0,51,0.25)',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                }}
              >
                <AlertCircle size={18} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '0.1rem' }} />
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                  {errorMessage || 'Your message could not be sent. Please try again later.'}
                </p>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
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
              {/* Honeypot — hidden from real users, traps bots */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
              />

              {/* Full Name */}
              <div>
                <label htmlFor="name" style={labelStyle}>Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  disabled={isSending}
                  autoComplete="name"
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors.name ? 'rgba(255,0,51,0.5)' : 'rgba(255,255,255,0.08)',
                  }}
                />
                {fieldErrors.name && <span style={errorTextStyle}>{fieldErrors.name}</span>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" style={labelStyle}>Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  disabled={isSending}
                  autoComplete="email"
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors.email ? 'rgba(255,0,51,0.5)' : 'rgba(255,255,255,0.08)',
                  }}
                />
                {fieldErrors.email && <span style={errorTextStyle}>{fieldErrors.email}</span>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" style={labelStyle}>Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Enter your subject"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  disabled={isSending}
                  style={{
                    ...inputStyle,
                    borderColor: fieldErrors.subject ? 'rgba(255,0,51,0.5)' : 'rgba(255,255,255,0.08)',
                  }}
                />
                {fieldErrors.subject && <span style={errorTextStyle}>{fieldErrors.subject}</span>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  disabled={isSending}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    borderColor: fieldErrors.message ? 'rgba(255,0,51,0.5)' : 'rgba(255,255,255,0.08)',
                  }}
                />
                {fieldErrors.message && <span style={errorTextStyle}>{fieldErrors.message}</span>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSending}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 2rem',
                  background: isSending ? 'rgba(255,255,255,0.1)' : '#ffffff',
                  color: isSending ? 'rgba(255,255,255,0.5)' : '#000000',
                  border: isSending ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  cursor: isSending ? 'not-allowed' : 'none',
                  transition: 'background 0.3s, color 0.3s, border-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  if (!isSending) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSending) {
                    e.currentTarget.style.background = '#ffffff';
                    e.currentTarget.style.color = '#000000';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {isSending ? (
                  <>
                    <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    SEND MESSAGE
                  </>
                )}
              </button>

              {/* Try again hint after success */}
              {isSuccess && (
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    textAlign: 'center',
                    textDecoration: 'underline',
                  }}
                >
                  Send another message
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
        }
        input::placeholder,
        textarea::placeholder { color: rgba(255,255,255,0.2); }
        input:disabled,
        textarea:disabled { opacity: 0.6; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}

// ── Shared style objects ───────────────────────────────────────────────────
const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.6rem',
  color: 'rgba(255,255,255,0.35)',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  marginBottom: '0.5rem',
};

const errorTextStyle = {
  display: 'block',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.6rem',
  color: 'var(--secondary)',
  marginTop: '0.35rem',
  letterSpacing: '0.05em',
};
