async function test() {
  const ytUrl = "https://www.youtube.com/watch?v=W2iLN00zYlc";
  const igUrl = "https://www.instagram.com/reel/C0123456789/";

  // Test YouTube
  console.log("--- YOUTUBE ---");
  try {
    const res = await fetch(`https://api.ryzendesu.vip/api/downloader/ytmp4?url=${ytUrl}`);
    console.log("Ryzen YT Status:", res.status);
    if(res.ok) console.log((await res.text()).substring(0, 100));
  } catch(e) { console.log(e.message); }

  try {
    const res = await fetch(`https://api.vreden.web.id/api/ytmp4?url=${ytUrl}`);
    console.log("Vreden YT Status:", res.status);
    if(res.ok) console.log((await res.text()).substring(0, 100));
  } catch(e) { console.log(e.message); }

  // Test Instagram
  console.log("--- INSTAGRAM ---");
  try {
    const res = await fetch(`https://api.ryzendesu.vip/api/downloader/igdl?url=${igUrl}`);
    console.log("Ryzen IG Status:", res.status);
    if(res.ok) console.log((await res.text()).substring(0, 100));
  } catch(e) { console.log(e.message); }
  
  try {
    const res = await fetch(`https://api.vreden.web.id/api/igdl?url=${igUrl}`);
    console.log("Vreden IG Status:", res.status);
    if(res.ok) console.log((await res.text()).substring(0, 100));
  } catch(e) { console.log(e.message); }
}
test();
