import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Resilient Google Drive audio stream proxy
  app.get('/api/proxy-audio', async (req, res) => {
    const fileId = req.query.id as string;
    if (!fileId) {
      return res.status(400).send('Missing file id');
    }

    let gdriveUrl = `https://docs.google.com/uc?export=download&id=${fileId}`;

    try {
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      };

      // 1. First fetch attempt
      let response = await fetch(gdriveUrl, { headers });

      // Handle cookies and confirm prompts for larger files
      const contentTypeHeader = response.headers.get('content-type') || '';

      if (contentTypeHeader.includes('text/html')) {
        const html = await response.text();
        // Look for confirm token in the HTML (e.g. name="confirm" value="XXXX") or within a href
        const confirmMatch = html.match(/confirm=([a-zA-Z0-9_&-]+)/) || html.match(/name="confirm"\s+value="([a-zA-Z0-9_&-]+)"/);

        if (confirmMatch) {
          const confirmToken = confirmMatch[1];
          gdriveUrl = `https://docs.google.com/uc?export=download&id=${fileId}&confirm=${confirmToken}`;

          // Re-fetch with the confirmation token
          response = await fetch(gdriveUrl, { headers });
        }
      }

      if (!response.ok) {
        return res.status(response.status).send(`Google Drive responded with status ${response.status}: ${response.statusText}`);
      }

      // Copy headers from response to keep browser audio controls happy (Seeking, MIME type, etc.)
      const contentType = response.headers.get('content-type') || 'audio/mpeg';
      const contentLength = response.headers.get('content-length');

      res.setHeader('Content-Type', contentType);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Accept-Ranges', 'bytes');

      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }

      if (!response.body) {
        return res.status(500).send('No response body received from Google Drive');
      }

      // Stream the response body directly to Express
      const reader = response.body.getReader();

      req.on('close', () => {
        reader.cancel().catch(() => {});
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        res.write(value);
      }
      res.end();
    } catch (error: any) {
      console.error('Proxy audio error:', error);
      if (!res.headersSent) {
        res.status(500).send(`Internal server error during audio proxy: ${error.message}`);
      }
    }
  });

  // Sitemap endpoint
  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    res.header('Content-Type', 'application/xml');
    res.sendFile(sitemapPath);
  });

  // Serve static assets or use Vite dev server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    app.use(vite.middlewares);
    app.get(/^\/(?!api\/).*/, async (req, res, next) => {
      try {
        const indexHtml = await fs.readFile(path.join(process.cwd(), 'index.html'), 'utf8');
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(indexHtml);
      } catch (error) {
        next(error);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get(/^\/(?!api\/).*/, (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
