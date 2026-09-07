const instances = [
  "https://api.piped.private.coffee",
  "https://pipedapi.tokhmi.xyz",
  "https://piped-api.lunar.icu",
  "https://pipedapi.rivo.cc",
  "https://pipedapi.kavin.rocks"
];
const vid = 'W2iLN00zYlc';
async function test() {
  for (const url of instances) {
    try {
      const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(`${url}/streams/${vid}`)}`;
      const res = await fetch(proxy);
      const text = await res.text();
      console.log(url, res.status, text.substring(0, 50).replace(/\n/g, ' '));
    } catch(e) {
      console.log(url, e.message);
    }
  }
}
test();
