const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(/import fetch from "node-fetch";\n/g, '');
code = code.replace(/import { HttpsProxyAgent } from "https-proxy-agent";\n/g, '');

fs.writeFileSync('server.ts', code);
