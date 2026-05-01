import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import gplay from "google-play-scraper";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/apps", async (req, res) => {
    try {
      const collection = req.query.collection as any || gplay.collection.TOP_FREE;
      const category = req.query.category as any;
      const num = parseInt(req.query.num as string) || 30;

      const results = await gplay.list({
        collection,
        category,
        num
      });
      res.json(results);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: String(e) });
    }
  });

  app.get("/api/search", async (req, res) => {
    try {
      const term = req.query.q as string;
      const num = parseInt(req.query.num as string) || 30;
      if (!term) return res.json([]);
      const results = await gplay.search({ term, num });
      res.json(results);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: String(e) });
    }
  });

  app.get("/api/app", async (req, res) => {
    try {
      const appId = req.query.id as string;
      if (!appId) throw new Error("Missing appId");
      const result = await gplay.app({ appId });
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: String(e) });
    }
  });
  
  app.get("/api/similar", async (req, res) => {
    try {
      const appId = req.query.id as string;
      if (!appId) throw new Error("Missing appId");
      const result = await gplay.similar({ appId });
      res.json(result);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: String(e) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    // Express 4 uses * for fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
