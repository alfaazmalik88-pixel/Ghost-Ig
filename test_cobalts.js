const instances = [
  "https://co.wuk.sh/api/json",
  "https://api.cobalt.best/api/json",
  "https://cobalt.q0.is/api/json",
  "https://api.cobalt.canine.tools", // maybe?
  "https://api.cobalt.tools/api/json"
];

async function test() {
  for (const url of instances) {
    try {
      console.log('Trying:', url);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': 'https://cobalt.tools' // spoof origin?
        },
        body: JSON.stringify({ url: "https://www.youtube.com/watch?v=W2iLN00zYlc" })
      });
      console.log(url, 'status:', res.status);
      if (res.ok) {
        const data = await res.json();
        console.log('Success!', url, data);
        break;
      } else {
        console.log(await res.text());
      }
    } catch(e) {
      console.log('Error:', e.message);
    }
  }
}
test();
