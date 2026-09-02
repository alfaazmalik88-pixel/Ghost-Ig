const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

const oldRoute = `  app.get('/api/fetch', async (req, res) => {
    try {
      const username = req.query.username || req.body.username;
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }`;

const newRoute = `  app.get('/api/fetch', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const username = req.query.username || req.body.username;
      if (!username) {
        return res.status(400).json({ success: false, error: "Username is required" });
      }`;

serverCode = serverCode.replace(oldRoute, newRoute);

const oldCatch = `      try {
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
    }`;

const newCatch = `      try {
        const data = JSON.parse(text);
        return res.json(data);
      } catch {
        return res.status(200).json({ 
          success: false, 
          error: "Instagram rate-limited or blocked this request." 
        });
      }
    } catch (err: any) {
      return res.status(200).json({ 
        success: false, 
        error: "Instagram rate-limited or blocked this request." 
      });
    }`;

serverCode = serverCode.replace(oldCatch, newCatch);
fs.writeFileSync('server.ts', serverCode);
console.log("Server fixed");
