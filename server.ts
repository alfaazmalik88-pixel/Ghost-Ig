import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import fs from "fs";
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";

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
        console.log(`[API] Fetching data via Webshare proxy for: ${url}`);
        
        let username = url;
        if (url.includes("instagram.com")) {
            const parts = url.split("/");
            const userPart = parts.find(p => p && p !== "www.instagram.com" && p !== "instagram.com" && p !== "http:" && p !== "https:");
            if (userPart) {
                username = userPart.split("?")[0];
            }
        }
        
        const cleanUsername = username.trim().replace(/^@/, '').split('/')[0].split('?')[0];
        
        // Setup Webshare Proxy as requested
        const proxyUrl = "http://wwgobxyk:nokqkt8kfvts@p.webshare.io:80";
        const agent = new HttpsProxyAgent(proxyUrl);
        
        // URL for fetching Instagram profile data
        const instagramUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${cleanUsername}`;
        
        const response = await fetch(instagramUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'x-ig-app-id': '936619743392459',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept': '*/*',
                'Sec-Fetch-Site': 'same-origin'
            },
            agent
        });
        
        let proxyData = null;
        
        const text = await response.text();
        
        try {
            const data = JSON.parse(text);
            
            const user = data.data?.user || data.graphql?.user || data.user;
            
            if (!user) {
                return res.status(500).json({ error: "User profile not found in Instagram response." });
            }
            
            // Map Profile Data
            const profile = {
                username: user.username || username,
                name: user.full_name || user.username || "Unknown",
                avatar: user.profile_pic_url_hd || user.profile_pic_url || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80",
                bio: user.biography || "",
                stats: {
                    posts: user.edge_owner_to_timeline_media?.count || 0,
                    followers: user.edge_followed_by?.count || 0,
                    following: user.edge_follow?.count || 0
                }
            };
            
            // Map Posts Data
            const posts = [];
            const reels = [];
            const edges = user.edge_owner_to_timeline_media?.edges || [];
            for (const edge of edges) {
                if (edge.node) {
                    const postData = {
                        id: edge.node.id,
                        type: edge.node.is_video ? 'video' : (edge.node.edge_sidecar_to_children ? 'carousel' : 'image'),
                        url: edge.node.video_url || edge.node.display_url,
                        thumbnail: edge.node.display_url,
                        code: edge.node.shortcode
                    };
                    posts.push(postData);
                    // If it's a video, add to reels as well
                    if (edge.node.is_video) {
                        reels.push(postData);
                    }
                }
            }
            
            // Map Stories (if Cloudflare worker provides it via reels_media or edge_story)
            const stories = [];
            const storyEdges = data.graphql?.user?.edge_story?.edges || data.reels_media?.[0]?.items || user.stories || [];
            for (const item of storyEdges) {
                const node = item.node || item;
                stories.push({
                    id: node.id || node.pk,
                    type: node.is_video || node.media_type === 2 ? 'video' : 'image',
                    url: node.video_url || node.display_url || node.image_versions2?.candidates?.[0]?.url,
                    thumbnail: node.display_url || node.image_versions2?.candidates?.[0]?.url,
                    timestamp: node.taken_at_timestamp ? new Date(node.taken_at_timestamp * 1000).toLocaleString() : "Just now"
                });
            }

            // Map Highlights (if Cloudflare worker provides it via edge_highlight_reels)
            const highlights = [];
            const highlightEdges = user.edge_highlight_reels?.edges || data.graphql?.user?.edge_highlight_reels?.edges || [];
            for (const item of highlightEdges) {
                const node = item.node || item;
                highlights.push({
                    id: node.id,
                    type: 'image', // highlights cover is typically an image
                    url: node.cover_media?.cropped_image_version?.url || node.cover_media_dict?.cropped_image_version?.url,
                    thumbnail: node.cover_media?.cropped_image_version?.url || node.cover_media_dict?.cropped_image_version?.url,
                    code: node.id
                });
            }
            
            return res.json({
              success: true,
              serverUsed: server,
              profile,
              stories, 
              posts,
              reels,
              highlights
            });

        } catch (parseError) {
            return res.status(502).json({ 
                error: "Instagram blocked the request or returned non-JSON data", 
                raw: text.slice(0, 200) 
            });
        }

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
