async function test() {
  const ytUrl = "https://www.youtube.com/watch?v=W2iLN00zYlc";
  
  const apis = [
    "https://api.siputzx.my.id/api/d/ytmp4?url=",
    "https://aemt.me/download/ytdl?url=",
    "https://bk9.fun/download/ytmp4?url=",
    "https://api.dreaded.site/api/ytdl/video?url=",
    "https://api.fgmods.xyz/api/downloader/ytmp4?url="
  ];
  
  for (const api of apis) {
    try {
      console.log("Testing:", api);
      const res = await fetch(api + ytUrl);
      console.log("Status:", res.status);
      if(res.ok) {
        const text = await res.text();
        console.log("Response:", text.substring(0, 150));
      }
    } catch(e) {
      console.log("Error:", e.message);
    }
  }
}
test();
