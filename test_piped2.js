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
      console.log('Trying:', url);
      const res = await fetch(`${url}/streams/${vid}`);
      console.log(url, 'status:', res.status);
      if (res.ok) {
        const data = await res.json();
        console.log('Success!', url, 'videoStreams count:', data.videoStreams?.length);
        const stream = data.videoStreams?.find(v => v.format === "MPEG_4" && !v.videoOnly) || data.videoStreams?.[0];
        console.log('Found stream:', stream?.url?.substring(0, 50));
        break;
      }
    } catch(e) {
      console.log('Error:', e.message);
    }
  }
}
test();
