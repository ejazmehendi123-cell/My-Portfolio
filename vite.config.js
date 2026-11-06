import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load .env variables into process.env for local development
dotenv.config();

// Custom Vite plugin to serve the /api/contact endpoint directly during 'npm run dev'
function apiDevPlugin() {
  return {
    name: 'api-contact-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if (url === '/api/contact') {
          try {
            // Import the contact API handler dynamically
            const { default: handler } = await import('./api/contact.js');
            return await handler(req, res);
          } catch (err) {
            console.error('[Vite Dev Middleware] Error handling /api/contact:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: false,
                message: 'Local dev API execution failed: ' + (err.message || 'Unknown error'),
              })
            );
            return;
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDevPlugin()],
});
