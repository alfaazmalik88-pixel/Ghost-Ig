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
  app.post("/api/fetch-instagram", async (req, res) => {
    const { url, server } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
        console.log(`[API] Returning mock data for: ${url}`);
        
        let username = url;
        if (url.includes("instagram.com")) {
            const parts = url.split("/");
            const userPart = parts.find(p => p && p !== "www.instagram.com" && p !== "instagram.com" && p !== "http:" && p !== "https:");
            if (userPart) {
                username = userPart.split("?")[0];
            }
        }
        
        // Return mock data since the API was removed
        res.json({
          success: true,
          serverUsed: server,
          profile: {
            username: username || "anonymous_user",
            name: "Demo Account",
            avatar: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80",
            bio: "This is a demo profile since the API was removed.\n#photography #travel",
            stats: {
              posts: 42,
              followers: 1337,
              following: 404
            }
          },
          stories: [
            {
              id: "s1",
              type: "image",
              url: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1080&q=80",
              thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&q=80",
              timestamp: "2 hours ago"
            },
            {
              id: "s2",
              type: "video",
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
              thumbnail: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=400&q=80",
              timestamp: "5 hours ago"
            }
          ],
          posts: [
            {
              id: "p1",
              type: "image",
              url: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=1080&q=80",
              thumbnail: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&q=80",
              code: "ABC"
            },
            {
              id: "p2",
              type: "video",
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
              thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=80",
              code: "DEF"
            },
            {
              id: "p3",
              type: "image",
              url: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=1080&q=80",
              thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&q=80",
              code: "GHI"
            }
          ]
        });

    } catch (error: any) {
        console.error("[API] Error fetching data:", error);
        return res.status(500).json({ error: error.message || "An unexpected error occurred." });
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
