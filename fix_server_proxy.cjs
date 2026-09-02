const fs = require('fs');
let serverCode = fs.readFileSync('server.ts', 'utf8');

if (!serverCode.includes('import { HttpsProxyAgent }')) {
    serverCode = serverCode.replace('import axios from "axios";', 'import axios from "axios";\nimport { HttpsProxyAgent } from "https-proxy-agent";');
}

fs.writeFileSync('server.ts', serverCode);
console.log("Added HttpsProxyAgent");
