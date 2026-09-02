const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

if (!serverCode.includes('import axios')) {
    serverCode = serverCode.replace('import fs from "fs";', 'import fs from "fs";\nimport axios from "axios";');
}

const newPostEndpoint = `

  // --- API Route to fetch and download via Proxy (POST) ---
  app.post("/api/download", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      console.log(\`[API] Fetching media via mobile residential proxy for: \${url}\`);

      // 1. Proxy Configuration
      const proxyUrl = "http://100.87.200.96:8080";
      const httpsAgent = new HttpsProxyAgent(proxyUrl);

      // 3. Headers: Include realistic mobile browser user-agent
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
      };

      // Execute request
      const response = await axios.get(url, {
        httpsAgent,
        headers,
        timeout: 15000,
        validateStatus: () => true // Handle errors manually
      });

      const html = response.data;

      // 5. Error Handling
      if (response.status !== 200) {
        console.error(\`[API Download POST] Proxy or target returned status: \${response.status}\`);
        return res.status(response.status).json({ error: "Failed to connect to Instagram or blocked by proxy." });
      }

      // 4. Output: Extract CDN media URL
      let mediaUrl = null;
      let isVideo = false;

      const videoMatch = html.match(/<meta property="og:video" content="(.*?)"/);
      if (videoMatch && videoMatch[1]) {
        mediaUrl = videoMatch[1];
        isVideo = true;
      } else {
        const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/);
        if (imageMatch && imageMatch[1]) {
          mediaUrl = imageMatch[1];
        }
      }

      if (mediaUrl) {
        mediaUrl = mediaUrl.replace(/\\\\u0026/g, "&").replace(/&amp;/g, "&");
        console.log(\`[API Download POST] Successfully extracted \${isVideo ? 'Video' : 'Image'} CDN URL.\`);
        return res.json({ success: true, mediaUrl, isVideo });
      } else {
        console.error("[API Download POST] Media URL not found in page HTML (Instagram might have served a challenge/login page).");
        return res.status(404).json({ error: "Media URL not found. The proxy might have hit a login wall." });
      }

    } catch (error: any) {
      console.error("[API Download POST] Connection error:", error.message);
      return res.status(500).json({ error: "Proxy connection failed or processing error." });
    }
  });

`;

// Insert before Vite middleware
serverCode = serverCode.replace('  // Vite middleware for development', newPostEndpoint + '  // Vite middleware for development');

fs.writeFileSync('server.ts', serverCode);
console.log("Server updated with POST /api/download");
