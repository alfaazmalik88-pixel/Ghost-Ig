import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const HIKER_API_KEY = process.env.HIKER_API_KEY || "v3vckohto7xfanc3qcgifpyiqi6jn5w5";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Route to download media ---
  app.get("/api/download", async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== "string") {
        return res.status(400).send("URL is required");
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch media");
      }
      
      const contentType = response.headers.get("content-type") || "application/octet-stream";
      res.setHeader("Content-Type", contentType);
      
      let ext = "jpg";
      if (contentType.includes("video")) ext = "mp4";
      else if (contentType.includes("png")) ext = "png";
      
      res.setHeader("Content-Disposition", `attachment; filename="story_${Date.now()}.${ext}"`);
      
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error("[API] Error downloading file:", error);
      res.status(500).send("Error downloading file");
    }
  });

  // --- API Route to fetch Instagram data via HikerAPI ---
    // Proxy & Instagram Handler
  app.post('/api/fetch', async (req, res) => {
    try {
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      // Clean username
      const cleanUsername = username
        .trim()
        .replace(/^https?:\/\/(www\.)?instagram\.com\//, '')
        .split('/')[0]
        .split('?')[0]
        .replace(/^@/, '');

      const targetUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${cleanUsername}`;

      // Cloudflare native fetch
      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'x-ig-app-id': '936619743392459',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept': '*/*',
          'Sec-Fetch-Site': 'same-origin'
        }
      });

      const text = await response.text();

      try {
        const data = JSON.parse(text);
        return res.json(data);
      } catch {
        return res.status(502).json({
          error: "Instagram rate limit ya block response",
          raw: text.slice(0, 150)
        });
      }
    } catch (err: any) {
      return res.status(500).json({ error: err.message || "Internal server error" });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

// fresh build

