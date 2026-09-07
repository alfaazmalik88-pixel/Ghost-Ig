async function test() {
  try {
    const res = await fetch("https://api.cobalt.tools", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'https://cobalt.tools',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify({ url: "https://www.instagram.com/p/C-vT6H4S8qJ/" })
    });
    console.log("Status:", res.status);
    console.log(await res.text());
  } catch(e) {
    console.log(e.message);
  }
}
test();
