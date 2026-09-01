const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const startStr = 'app.post("/api/fetch-instagram", async (req, res) => {';
const startIndex = code.indexOf(startStr);
if (startIndex === -1) throw new Error("Could not find start");

const endStr = '  // Vite middleware for development';
const endIndex = code.indexOf(endStr);
if (endIndex === -1) throw new Error("Could not find end");

const replacement = `  // Proxy & Instagram Handler
  app.post('/api/fetch', async (req, res) => {
    try {
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      // Clean username
      const cleanUsername = username
        .trim()
        .replace(/^https?:\\/\\/(www\\.)?instagram\\.com\\//, '')
        .split('/')[0]
        .split('?')[0]
        .replace(/^@/, '');

      const targetUrl = \`https://www.instagram.com/api/v1/users/web_profile_info/?username=\${cleanUsername}\`;

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

`;

code = code.slice(0, startIndex) + replacement + code.slice(endIndex);
fs.writeFileSync('server.ts', code);
console.log("Done");
