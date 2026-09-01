export default {
  async fetch(request: Request) {
    const url = new URL(request.url);

    // API Route Handler
    if (url.pathname.startsWith("/api/fetch")) {
      const username = url.searchParams.get("username");

      if (!username) {
        return new Response(JSON.stringify({ error: "Username daalna zaroori hai" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }

      try {
        const cleanUser = encodeURIComponent(
          username.replace("@", "").trim().split("?")[0]
        );
        const targetUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${cleanUser}`;
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;

        const igRes = await fetch(proxyUrl, {
          headers: {
            "x-ig-app-id": "936619743392459",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9"
          }
        });

        const rawText = await igRes.text();

        // Agar response HTML ya blocked hai
        if (rawText.trim().startsWith("<") || !rawText.includes("data")) {
          return new Response(
            JSON.stringify({
              error: "Instagram ne request block kar di ya account private hai."
            }),
            {
              status: 403,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
              }
            }
          );
        }

        return new Response(rawText, {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: err.message || "Proxy connection failed" }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        );
      }
    }

    // Default static assets fallback
    return new Response("Not Found", { status: 404 });
  }
};
