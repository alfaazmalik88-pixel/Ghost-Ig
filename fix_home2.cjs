const fs = require('fs');

let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');
let serverCode = fs.readFileSync('server.ts', 'utf8');

// I will just read the file, no changes, to prepare to reply.
