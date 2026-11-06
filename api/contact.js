// api/contact.js — Serverless Function & Dev API Handler
// Handles visitor messages and saves them directly to Supabase via @supabase/supabase-js

import { createClient } from '@supabase/supabase-js';

export const config = {
  api: {
    bodyParser: false,
  },
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

export default async function handler(req, res) {
  // Polyfill status and json for raw http.ServerResponse (e.g., in Vite dev middleware)
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

  // If missing from process.env, reload .env dynamically (helps in dev if .env was just created/edited)
  if (!supabaseUrl || !supabaseKey) {
    try {
      const dotenv = await import('dotenv');
      dotenv.config();
      supabaseUrl = process.env.SUPABASE_URL;
      supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    } catch (_) {}
  }

  if (!supabaseUrl || !supabaseKey) {
    console.error('[API /api/contact] Missing Supabase environment variables in process.env (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).');
    return res.status(500).json({
      success: false,
      message: 'Database connection is not configured yet. Please configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file.',
    });
  }

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
      .select('id')
      .single();

    if (error) {
      console.error('[API /api/contact] Supabase database error:', error.message || error);
      return res.status(500).json({
        success: false,
        message: 'Unable to save your message right now. Please try again later.',
        error: process.env.NODE_ENV !== 'production' ? error.message : undefined,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been received successfully.',
      id: data?.id,
    });
  } catch (err) {
    console.error('[API /api/contact] Unexpected server exception:', err);
    return res.status(500).json({
      success: false,
      message: 'Unable to send your message right now. Please try again later.',
      error: process.env.NODE_ENV !== 'production' ? err.message : undefined,
    });
  }
}
