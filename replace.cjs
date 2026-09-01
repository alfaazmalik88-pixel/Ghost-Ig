const fs = require('fs');

let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const startStr = '  const handleSearch = async (e: React.FormEvent) => {';
const endStr = '  const downloadFile = async (fileUrl: string) => {';
const startIndex = homeCode.indexOf(startStr);
const endIndex = homeCode.indexOf(endStr);

const replacement = `  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleFetch(url);
  };

  const handleFetch = async (inputVal: string) => {
    try {
      setError('');
      setIsLoading(true);
      setResult(null);
      setActiveStoryIndex(0);

      // Clean username
      let username = inputVal.trim();
      if (username.includes('instagram.com/')) {
        username = username.split('instagram.com/')[1];
      }
      username = username.split('?')[0].replace(/\\/$/, '').replace('@', '');

      if (!username) throw new Error("Please enter a valid username");

      const res = await fetch(\`/api/fetch?username=\${username}\`);
      const text = await res.text();

      if (!text || text.trim() === "") {
        throw new Error("Instagram API blocked this request. Try another username or proxy.");
      }

      const rawData = JSON.parse(text);
      if (!res.ok) {
        throw new Error(rawData.error || "Failed to fetch data");
      }

      // Map raw Instagram data to UI result format
      const user = rawData.data?.user || rawData.graphql?.user || rawData.user;
      if (!user) {
        throw new Error("User profile not found in response.");
      }
      
      const profile = {
        username: user.username,
        name: user.full_name || user.username || "Unknown",
        avatar: user.profile_pic_url_hd || user.profile_pic_url,
        bio: user.biography || "",
        stats: {
            posts: user.edge_owner_to_timeline_media?.count || 0,
            followers: user.edge_followed_by?.count || 0,
            following: user.edge_follow?.count || 0
        }
      };

      const posts: any[] = [];
      const reels: any[] = [];
      const edges = user.edge_owner_to_timeline_media?.edges || [];
      for (const edge of edges) {
          if (edge.node) {
              const postData = {
                  id: edge.node.id,
                  type: edge.node.is_video ? 'video' : (edge.node.edge_sidecar_to_children ? 'carousel' : 'image'),
                  url: edge.node.video_url || edge.node.display_url,
                  thumbnail: edge.node.display_url,
                  code: edge.node.shortcode
              };
              posts.push(postData);
              if (edge.node.is_video) reels.push(postData);
          }
      }

      const stories: any[] = [];
      const storyEdges = rawData.graphql?.user?.edge_story?.edges || rawData.reels_media?.[0]?.items || user.stories || [];
      for (const item of storyEdges) {
          const node = item.node || item;
          stories.push({
              id: node.id || node.pk,
              type: node.is_video || node.media_type === 2 ? 'video' : 'image',
              url: node.video_url || node.display_url || node.image_versions2?.candidates?.[0]?.url,
              thumbnail: node.display_url || node.image_versions2?.candidates?.[0]?.url,
              timestamp: node.taken_at_timestamp ? new Date(node.taken_at_timestamp * 1000).toLocaleString() : "Just now"
          });
      }

      const highlights: any[] = [];
      const highlightEdges = user.edge_highlight_reels?.edges || rawData.graphql?.user?.edge_highlight_reels?.edges || [];
      for (const item of highlightEdges) {
          const node = item.node || item;
          highlights.push({
              id: node.id,
              type: 'image',
              url: node.cover_media?.cropped_image_version?.url || node.cover_media_dict?.cropped_image_version?.url,
              thumbnail: node.cover_media?.cropped_image_version?.url || node.cover_media_dict?.cropped_image_version?.url,
              code: node.id
          });
      }

      const data = {
        success: true,
        profile,
        posts,
        reels,
        stories,
        highlights
      };

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

`;
homeCode = homeCode.slice(0, startIndex) + replacement + homeCode.slice(endIndex);
fs.writeFileSync('src/pages/Home.tsx', homeCode);

let serverCode = fs.readFileSync('server.ts', 'utf8');
serverCode = serverCode.replace("app.post('/api/fetch'", "app.get('/api/fetch'");
serverCode = serverCode.replace("const { username } = req.body;", "const username = req.query.username || req.body.username;");
fs.writeFileSync('server.ts', serverCode);
console.log("Replaced");
