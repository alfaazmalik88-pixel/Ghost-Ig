import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import youtubedl from "youtube-dl-exec";
import { randomUUID } from "crypto";

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure temp directory exists
const tempDir = path.join(process.cwd(), "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Helper to get video info
app.post("/api/info", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const info = await youtubedl(url, {
      dumpJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
    });

    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration_string || info.duration,
      extractor: info.extractor,
    });
  } catch (error: any) {
    console.error("Error fetching info:", error.message);
    res.status(500).json({ error: "Failed to fetch video info. It may be restricted or unsupported." });
  }
});

// Download endpoint
app.get("/api/download", async (req, res) => {
  const url = req.query.url as string;
  const quality = (req.query.quality as string) || '1080';

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Determine format string based on requested quality
  let formatStr = "bestvideo[height<=1080]+bestaudio/best[height<=1080]";
  if (quality === '720') {
    formatStr = "bestvideo[height<=720]+bestaudio/best[height<=720]";
  } else if (quality === 'best') {
    formatStr = "bestvideo+bestaudio/best";
  }

  const filename = `${randomUUID()}.mp4`;
  const outputPath = path.join(tempDir, filename);

  try {
    console.log(`Starting download for ${url} (Quality: ${quality})`);
    
    // Download and merge video and audio
    await youtubedl(url, {
      format: formatStr,
      mergeOutputFormat: "mp4",
      output: outputPath,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      youtubeSkipDashManifest: true,
    });

    console.log(`Download complete: ${outputPath}`);

    // Set headers for download
    res.setHeader("Content-Disposition", `attachment; filename="video-${quality}p.mp4"`);
    res.setHeader("Content-Type", "video/mp4");

    // Stream the file to the response
    const fileStream = fs.createReadStream(outputPath);
    fileStream.pipe(res);

    // Clean up file after streaming is done
    fileStream.on("end", () => {
      fs.unlink(outputPath, (err) => {
        if (err) console.error(`Failed to delete temp file ${outputPath}:`, err);
        else console.log(`Cleaned up temp file ${outputPath}`);
      });
    });

    // Handle stream errors
    fileStream.on("error", (err) => {
      console.error("Error streaming file:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "Error streaming the downloaded file." });
      }
    });

    req.on("close", () => {
      // If client disconnects early, try to clean up
      if (fs.existsSync(outputPath)) {
         fs.unlink(outputPath, () => {});
      }
    });

  } catch (error: any) {
    console.error("Download error:", error.message);
    if (fs.existsSync(outputPath)) {
      fs.unlink(outputPath, () => {});
    }
    res.status(500).json({ error: "Failed to download and process the video." });
  }
});

async function startServer() {
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
