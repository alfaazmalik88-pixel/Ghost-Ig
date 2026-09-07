async function test() {
  const target = 'https://pipedapi.kavin.rocks/streams/W2iLN00zYlc';
  const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`;
  const res = await fetch(proxy);
  const text = await res.text();
  console.log(text.substring(0, 200));
}
test();
