// api/contact.js — Serverless Function & Dev API Handler
// 1. Validates visitor message & spam protection
// 2. Inserts message into Supabase database (contact_messages)
// 3. Sends real-time email notification to portfolio owner via Resend API

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const config = {
  api: {
    bodyParser: false,
  },
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper to safely parse JSON body from stream or pre-parsed object
async function getParsedBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }

  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 25000) {
        resolve(null);
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve(null);
      }
    });
    req.on('error', () => resolve(null));
  });
}

// Generate the cinematic dark-and-red HTML email template
function buildEmailHtml({ name, email, subject, message, receivedAt }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Contact Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #050505; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #0c0c0c; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);">
          
          <!-- Header Bar with Red Accent -->
          <tr>
            <td style="background: linear-gradient(90deg, #ff1744 0%, #b30024 100%); padding: 4px 0;"></td>
          </tr>

          <!-- Header Content -->
          <tr>
            <td style="padding: 32px 32px 20px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #ff1744; margin-bottom: 8px;">
                // INCOMING TRANSMISSION
              </div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                New Contact Form Submission
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: rgba(255, 255, 255, 0.6);">
                A visitor just sent a message through your portfolio website.
              </p>
            </td>
          </tr>

          <!-- Visitor Details Section -->
          <tr>
            <td style="padding: 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                
                <!-- From / Name -->
                <tr>
                  <td style="padding-bottom: 14px;">
                    <div style="font-size: 10px; font-family: 'Courier New', Courier, monospace; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255, 255, 255, 0.4); margin-bottom: 4px;">
                      VISITOR NAME
                    </div>
                    <div style="font-size: 16px; font-weight: 600; color: #ffffff;">
                      ${safeName}
                    </div>
                  </td>
                </tr>

                <!-- Email Address -->
                <tr>
                  <td style="padding-bottom: 14px;">
                    <div style="font-size: 10px; font-family: 'Courier New', Courier, monospace; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255, 255, 255, 0.4); margin-bottom: 4px;">
                      EMAIL ADDRESS (CLICK TO REPLY)
                    </div>
                    <div>
                      <a href="mailto:${safeEmail}" style="font-size: 15px; font-weight: 500; color: #ff1744; text-decoration: none;">
                        ${safeEmail} &rarr;
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Subject -->
                <tr>
                  <td style="padding-bottom: 18px;">
                    <div style="font-size: 10px; font-family: 'Courier New', Courier, monospace; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255, 255, 255, 0.4); margin-bottom: 4px;">
                      SUBJECT
                    </div>
                    <div style="font-size: 15px; font-weight: 500; color: #ffffff;">
                      ${safeSubject}
                    </div>
                  </td>
                </tr>

                <!-- Message Box -->
                <tr>
                  <td style="padding-bottom: 24px;">
                    <div style="font-size: 10px; font-family: 'Courier New', Courier, monospace; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255, 255, 255, 0.4); margin-bottom: 8px;">
                      MESSAGE
                    </div>
                    <div style="background-color: #121212; border: 1px solid rgba(255, 255, 255, 0.1); border-left: 3px solid #ff1744; border-radius: 6px; padding: 18px; font-size: 14px; line-height: 1.6; color: rgba(255, 255, 255, 0.9);">
                      ${safeMessage}
                    </div>
                  </td>
                </tr>

                <!-- Direct Reply Button -->
                <tr>
                  <td align="center" style="padding-bottom: 8px;">
                    <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(subject)}" style="display: inline-block; background-color: #ffffff; color: #000000; font-size: 12px; font-weight: 700; font-family: 'Courier New', Courier, monospace; text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 28px; border-radius: 6px; text-decoration: none;">
                      Reply to ${safeName} &rarr;
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer Metadata -->
          <tr>
            <td style="background-color: #070707; padding: 18px 32px; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: rgba(255, 255, 255, 0.4); line-height: 1.6;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="left">
                    <strong>Portfolio:</strong> Mohammad Ejaz Mehendi<br/>
                    <strong>Received:</strong> ${receivedAt}
                  </td>
                  <td align="right" style="vertical-align: bottom;">
                    <span style="display: inline-block; width: 6px; height: 6px; background-color: #00c853; border-radius: 50%; margin-right: 4px;"></span>
                    <span style="font-family: 'Courier New', Courier, monospace; text-transform: uppercase;">Saved to Supabase</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export default async function handler(req, res) {
  // Polyfill status and json for raw http.ServerResponse (e.g. in Vite dev middleware)
  if (!res.status) {
    res.status = function (code) {
      this.statusCode = code;
      return this;
    };
  }
  if (!res.json) {
    res.json = function (data) {
      this.setHeader('Content-Type', 'application/json');
      this.end(JSON.stringify(data));
      return this;
    };
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Only POST is accepted.',
    });
  }

  // Parse body
  const body = await getParsedBody(req);
  if (!body) {
    return res.status(400).json({
      success: false,
      message: 'Invalid request body. JSON payload is required.',
    });
  }

  // Honeypot bot protection (field 'website' is invisible to genuine users)
  if (body.website && String(body.website).trim() !== '') {
    return res.status(200).json({
      success: true,
      message: 'Your message has been received successfully.',
    });
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const subject = (body.subject || '').trim();
  const message = (body.message || '').trim();

  // Validate fields
  const errors = [];
  if (!name) errors.push('Full name is required.');
  else if (name.length > 100) errors.push('Name must be under 100 characters.');

  if (!email) errors.push('Email address is required.');
  else if (!isValidEmail(email)) errors.push('Please enter a valid email address.');
  else if (email.length > 254) errors.push('Email must be under 254 characters.');

  if (!subject) errors.push('Subject is required.');
  else if (subject.length > 200) errors.push('Subject must be under 200 characters.');

  if (!message) errors.push('Message is required.');
  else if (message.length < 5) errors.push('Message must be at least 5 characters.');
  else if (message.length > 5000) errors.push('Message must be under 5000 characters.');

  if (errors.length > 0) {
    return res.status(422).json({
      success: false,
      message: errors[0],
      errors,
    });
  }

  let supabaseUrl = process.env.SUPABASE_URL;
  let supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let resendApiKey = process.env.RESEND_API_KEY;
  let contactEmail = process.env.CONTACT_EMAIL || 'ejazmehendi123@gmail.com';
  let resendFrom = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  // If missing from process.env, reload .env dynamically (for local development)
  if (!supabaseUrl || !supabaseKey || !resendApiKey) {
    try {
      const dotenv = await import('dotenv');
      dotenv.config();
      supabaseUrl = process.env.SUPABASE_URL || supabaseUrl;
      supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey;
      resendApiKey = process.env.RESEND_API_KEY || resendApiKey;
      contactEmail = process.env.CONTACT_EMAIL || contactEmail;
      resendFrom = process.env.RESEND_FROM_EMAIL || resendFrom;
    } catch (_) {}
  }

  if (!supabaseUrl || !supabaseKey) {
    console.error('[API /api/contact] Missing Supabase environment variables in process.env (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).');
    return res.status(500).json({
      success: false,
      message: 'Database connection is not configured yet. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file.',
    });
  }

  // ── Step 1: Save message into Supabase Database ───────────────────────────
  let insertedRecord = null;
  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name,
          email,
          subject,
          message,
          status: 'new',
        },
      ])
      .select('id, created_at')
      .single();

    if (error) {
      console.error('[API /api/contact] Supabase database error:', error.message || error);
      return res.status(500).json({
        success: false,
        message: 'Unable to save your message right now. Please try again later.',
        error: process.env.NODE_ENV !== 'production' ? error.message : undefined,
      });
    }

    insertedRecord = data;
  } catch (err) {
    console.error('[API /api/contact] Unexpected server exception during DB insert:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to send your message right now. Please try again later.',
      error: process.env.NODE_ENV !== 'production' ? err.message : undefined,
    });
  }

  // ── Step 2: Send Email Notification via Resend ───────────────────────────
  // Note: Only attempted if the database insertion succeeded!
  let emailDeliveryStatus = 'not_configured';

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);

      const receivedAt = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium',
      });

      const emailHtml = buildEmailHtml({
        name,
        email,
        subject,
        message,
        receivedAt: `${receivedAt} (IST)`,
      });

      const emailText = `
New Contact Form Submission
Portfolio: Mohammad Ejaz Mehendi
Received: ${receivedAt} (IST)

VISITOR DETAILS:
Name: ${name}
Email: ${email}
Subject: ${subject}

MESSAGE:
${message}

Reply directly to this email to respond to ${name} (${email}).
      `.trim();

      const { data: emailData, error: emailError } = await resend.emails.send({
        from: resendFrom,
        to: [contactEmail],
        replyTo: email, // Clicking "Reply" in Gmail replies directly to the visitor
        subject: `New Portfolio Contact Message – ${name}`,
        html: emailHtml,
        text: emailText,
      });

      if (emailError) {
        console.error('[API /api/contact] Resend email delivery failed:', emailError);
        emailDeliveryStatus = 'failed';
        // Note: We preserve the DB record so the visitor's message is NEVER lost.
      } else {
        console.log('[API /api/contact] Resend email sent successfully! Email ID:', emailData?.id);
        emailDeliveryStatus = 'sent';
      }
    } catch (err) {
      console.error('[API /api/contact] Unexpected exception during Resend send:', err);
      emailDeliveryStatus = 'failed';
    }
  } else {
    console.warn('[API /api/contact] RESEND_API_KEY is not configured. Message was saved in Supabase but no email notification was sent.');
  }

  // Always return success since message is safely secured in Supabase
  return res.status(200).json({
    success: true,
    message: "Thank you! Your message has been received successfully. I'll get back to you soon.",
    id: insertedRecord?.id,
    emailNotification: emailDeliveryStatus,
  });
}
