export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const username = url.searchParams.get("username");

    if (!username) {
      return new Response(JSON.stringify({ error: "Username is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    try {
      const igUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`;
      const proxyGateway = `https://api.allorigins.win/raw?url=${encodeURIComponent(igUrl)}`;

      const res = await fetch(proxyGateway, {
        headers: {
          "x-ig-app-id": "936619743392459",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        }
      });

      const text = await res.text();

      // Agar response HTML page hai ya blocked hai
      if (text.trim().startsWith("<") || !text.includes("data")) {
        return new Response(JSON.stringify({ 
          error: "Instagram ne request block kar di. Kripya thodi der baad try karein." 
        }), {
          status: 403,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }

      return new Response(text, {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });

    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message || "Failed to reach server" }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
  }
};
