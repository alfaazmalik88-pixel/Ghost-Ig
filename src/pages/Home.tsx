import React, { useState, useEffect } from 'react';
import { Download, Loader2, Clipboard, Video, Music, AlertCircle, Youtube, Twitter, Facebook, Link2, MonitorPlay, Film, Image as ImageIcon, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FAQ from '../components/FAQ';

export default function Home() {
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('1080p');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [activePlatform, setActivePlatform] = useState<string>('');

  const detectPlatform = (input: string) => {
    const lower = input.toLowerCase();
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'youtube';
    if (lower.includes('twitter.com') || lower.includes('x.com')) return 'twitter';
    if (lower.includes('reddit.com')) return 'reddit';
    if (lower.includes('tiktok.com')) return 'tiktok';
    if (lower.includes('facebook.com') || lower.includes('fb.watch') || lower.includes('fb.com')) return 'facebook';
    if (lower.includes('pinterest.com') || lower.includes('pin.it')) return 'pinterest';
    if (lower.includes('instagram.com')) return 'instagram';
    return '';
  };

  useEffect(() => {
    setActivePlatform(detectPlatform(url));
  }, [url]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Clipboard paste failed:', err);
    }
  };

  const resolveMedia = async (targetUrl: string, targetQuality: string) => {
    const isAudio = targetQuality === 'audio';
    const platform = detectPlatform(targetUrl);

    // ENGINE 1: TIKTOK (TikWM API) - Watermark-free MP4 & MP3
    if (platform === 'tiktok') {
        const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(targetUrl)}`);
        const json = await res.json();
        if (json.code === 0) {
            return {
                url: isAudio ? json.data.music : (json.data.hdplay || json.data.play),
                title: json.data.title || 'TikTok Video',
                thumbnail: json.data.cover
            };
        }
        throw new Error(json.msg || 'TikWM Engine: Failed to resolve TikTok video.');
    }

    // ENGINE 2: FACEBOOK (Siputzx API)
    if (platform === 'facebook') {
        try {
            const res = await fetch(`https://api.siputzx.my.id/api/d/facebook?url=${encodeURIComponent(targetUrl)}`);
            const json = await res.json();
            if (json.status && json.data) {
                const targetRes = targetQuality === '1080p' ? '1080p' : '720p';
                let videoUrl = json.data.downloads?.find((d: any) => d.quality?.includes(targetRes))?.url;
                if (!videoUrl && json.data.downloads?.length > 0) {
                    videoUrl = json.data.downloads[0].url; // Fallback to first available
                }
                
                if (videoUrl) {
                    return {
                        url: videoUrl,
                        title: json.data.title || 'Facebook Video',
                        thumbnail: json.data.thumbnail
                    };
                }
            }
        } catch (e) {
            console.warn('Siputzx Facebook Engine failed', e);
        }
    }

    // ENGINE 3: YOUTUBE (Piped API + Fallback)
    // First try Piped API instances. If they recover from 522/Cloudflare blocks later, they will automatically work.
    if (platform === 'youtube') {
        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
        const match = targetUrl.match(ytRegex);
        if (match && match[1]) {
            const vid = match[1];
            
            // 1. Attempt Piped Instances first
            const instances = [
              "https://api.piped.private.coffee",
              "https://pipedapi.tokhmi.xyz",
              "https://piped-api.lunar.icu",
              "https://pipedapi.rivo.cc",
              "https://pipedapi.kavin.rocks"
            ];

            for (const baseUrl of instances) {
                try {
                    const targetStreamUrl = `${baseUrl}/streams/${vid}`;
                    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetStreamUrl)}`;
                    
                    // Add timeout to not block UI forever if instances are hanging
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5 sec timeout
                    
                    const res = await fetch(proxyUrl, { signal: controller.signal });
                    clearTimeout(timeoutId);
                    
                    if (!res.ok) continue;

                    const data = await res.json();
                    
                    let directDownloadUrl = null;
                    if (isAudio) {
                        const stream = data.audioStreams?.find((a: any) => a.format === "M4A") || data.audioStreams?.[0];
                        directDownloadUrl = stream?.url;
                    } else {
                        const stream = data.videoStreams?.find((v: any) => v.format === "MPEG_4" && !v.videoOnly) || data.videoStreams?.[0];
                        directDownloadUrl = stream?.url;
                    }

                    if (directDownloadUrl) {
                        return { 
                            url: directDownloadUrl, 
                            title: data.title || 'YouTube Media',
                            thumbnail: data.thumbnailUrl || `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`,
                            isExternal: false
                        };
                    }
                } catch (err) {
                    continue; // Move to next instance if error (e.g., 522, parse error, timeout)
                }
            }

            // 2. Fallback if all Piped instances fail (Current situation)
            try {
                // Fetch public metadata using YouTube oEmbed
                const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vid}&format=json`);
                const oembedJson = await oembedRes.json();
                
                // Fallback to SSYouTube or 10downloader for external download
                const downloadLink = `https://ssyoutube.com/watch?v=${vid}`;
                
                return { 
                    url: downloadLink, 
                    title: oembedJson.title || 'YouTube Media',
                    thumbnail: oembedJson.thumbnail_url,
                    isExternal: true
                };
            } catch (e) {
                // Ignore oembed error and fallback blindly
                return {
                    url: `https://ssyoutube.com/watch?v=${vid}`,
                    title: 'YouTube Video',
                    isExternal: true
                };
            }
        }
        throw new Error('YouTube Engine: Invalid YouTube URL format.');
    }

    // ENGINE 4: OPEN GRAPH / OEMBED EXTRACTOR (Pinterest, Instagram, Twitter)
    try {
        let fetchUrl = targetUrl;
        
        // Use vxtwitter for Twitter OpenGraph as it provides raw meta tags
        if (platform === 'twitter') {
            fetchUrl = fetchUrl.replace(/twitter\.com|x\.com/, 'vxtwitter.com');
        } else if (platform === 'instagram') {
            // Instagram block workaround attempt using ddinstagram
            fetchUrl = fetchUrl.replace(/instagram\.com/, 'ddinstagram.com');
        }

        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(fetchUrl)}`;
        const res = await fetch(proxyUrl);
        const json = await res.json();
        
        if (json.contents) {
            const html = json.contents;

            // Parse meta tags for video CDNs
            const ogVideoMatch = html.match(/<meta\s+property=["']og:video["']\s+content=["']([^"']+)["']/i) ||
                                 html.match(/<meta\s+property=["']og:video:secure_url["']\s+content=["']([^"']+)["']/i) ||
                                 html.match(/<meta\s+property=["']og:video:url["']\s+content=["']([^"']+)["']/i) ||
                                 html.match(/<meta\s+property=["']twitter:player:stream["']\s+content=["']([^"']+)["']/i);
            
            const titleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                               html.match(/<title>([^<]+)<\/title>/i);
                               
            const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                               html.match(/<meta\s+property=["']twitter:image["']\s+content=["']([^"']+)["']/i);

            if (ogVideoMatch && ogVideoMatch[1]) {
                const decodedUrl = ogVideoMatch[1].replace(/&amp;/g, '&');
                return {
                    url: decodedUrl,
                    title: titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : 'Extracted Media',
                    thumbnail: imageMatch ? imageMatch[1].replace(/&amp;/g, '&') : undefined
                };
            }
        }
    } catch(e) {
        console.warn('OpenGraph Extractor Engine failed', e);
    }

    // ENGINE 5: Cobalt UI Fallback (Instagram, Twitter, etc)
    // If we reach here for Instagram/Twitter and it failed, fallback to Cobalt UI which still supports them
    if (platform === 'instagram' || platform === 'twitter' || platform === 'pinterest' || platform === 'reddit') {
        return {
            url: `https://cobalt.tools/?u=${encodeURIComponent(targetUrl)}`,
            title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Video`,
            isExternal: true
        };
    }

    // FALLBACK ERROR
    throw new Error('Media extraction failed. The link might be private, unsupported, or the platform requires authentication.');
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawUrl = url.trim();
    if (!rawUrl) {
      setError('Please enter a valid URL.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await resolveMedia(rawUrl, quality);
      setResult({
        url: data.url,
        title: data.title,
        thumbnail: data.thumbnail,
        isExternal: data.isExternal,
        status: 'success'
      });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching media.');
    } finally {
      setIsLoading(false);
    }
  };

  const forceDownload = async (fileUrl: string, filename: string) => {
    try {
      // Direct client-side file saving via Blob
      const res = await fetch(fileUrl);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      // Fallback for strict CORS CDNs
      const a = document.createElement('a');
      a.href = fileUrl;
      a.target = '_blank';
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const getPlatformIcon = (platform: string, size = 20) => {
    switch (platform) {
      case 'youtube': return <Youtube size={size} className="text-red-500" />;
      case 'twitter': return <Twitter size={size} className="text-blue-400" />;
      case 'facebook': return <Facebook size={size} className="text-blue-600" />;
      case 'tiktok': return <Smartphone size={size} className="text-pink-500" />;
      case 'reddit': return <MonitorPlay size={size} className="text-orange-500" />;
      case 'pinterest': return <ImageIcon size={size} className="text-red-600" />;
      case 'instagram': return <Film size={size} className="text-pink-600" />;
      default: return <Link2 size={size} className="text-zinc-500" />;
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="text-center mb-12 flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
          All Video Downloader
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto mb-8 md:mb-10 text-base md:text-lg">
          Ghost Downloader — Your universal tool to save videos from YouTube, Instagram, Facebook, TikTok, and more.
        </p>
        
        <form onSubmit={handleDownload} className="w-full max-w-2xl mx-auto relative group">
          <div className="bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl flex flex-col mb-6 shadow-2xl focus-within:border-[#ee2a7b]/50 transition-colors">
            
            <div className="flex flex-col sm:flex-row items-center w-full relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
                 {getPlatformIcon(activePlatform, 24)}
              </div>
              <input
                type="text"
                placeholder="Paste Video Link here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 w-full bg-transparent px-4 sm:pl-14 md:px-14 py-4 outline-none text-base md:text-lg placeholder:text-slate-500 text-slate-100"
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 w-full sm:w-auto px-6 md:px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-pink-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2 sm:mt-0"
              >
                {isLoading ? <Loader2 size={24} className="animate-spin" /> : 'DOWNLOAD'}
              </button>
            </div>

            {/* Quality Options */}
            <div className="flex flex-col sm:flex-row gap-4 px-4 pb-4 pt-2 border-t border-white/5 mt-2">
              <div className="flex items-center gap-3 bg-black/20 rounded-xl px-4 py-3 w-full justify-between">
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
                   <Video size={16}/> Resolution
                </span>
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="bg-transparent text-white outline-none font-semibold text-sm cursor-pointer ml-auto"
                >
                  <option value="1080p" className="bg-[#05050a]">1080p HD Video</option>
                  <option value="720p" className="bg-[#05050a]">720p SD Video</option>
                  <option value="audio" className="bg-[#05050a]">MP3 Audio Only</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Supported Platforms */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-70 mb-8">
             <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-pink-500 transition cursor-pointer">
                <Film size={28} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Instagram</span>
             </div>
             <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition cursor-pointer">
                <Smartphone size={28} />
                <span className="text-[10px] font-bold uppercase tracking-wider">TikTok</span>
             </div>
             <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-500 transition cursor-pointer">
                <Facebook size={28} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Facebook</span>
             </div>
             <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-red-500 transition cursor-pointer">
                <Youtube size={28} />
                <span className="text-[10px] font-bold uppercase tracking-wider">YouTube</span>
             </div>
             <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-red-600 transition cursor-pointer">
                <ImageIcon size={28} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Pinterest</span>
             </div>
          </div>
        </form>
      </section>

      {/* Loading Skeleton */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="max-w-2xl mx-auto mb-8 overflow-hidden"
          >
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="animate-pulse flex flex-col items-center">
                   <div className="w-16 h-16 bg-white/10 rounded-full mb-4"></div>
                   <div className="h-4 bg-white/10 rounded w-1/2 mb-3"></div>
                   <div className="h-3 bg-white/10 rounded w-1/3 mb-6"></div>
                   <div className="w-40 h-12 bg-white/10 rounded-xl"></div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center mb-8 mx-auto max-w-2xl text-sm md:text-base flex items-center justify-center gap-2"
          >
            <AlertCircle size={18} /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-md text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee2a7b]/10 blur-[50px] pointer-events-none rounded-full"></div>
            
            {result.thumbnail && (
              <img src={result.thumbnail} alt="Thumbnail" className="w-full max-w-sm mx-auto rounded-xl mb-6 shadow-lg border border-white/10 object-cover aspect-video" />
            )}
            
            <h3 className="text-xl font-bold text-white mb-2 truncate px-4">
              {result.title}
            </h3>
            
            <p className="text-slate-400 text-sm mb-6">
              Your {quality === 'audio' ? 'audio' : 'video'} file is ready.
            </p>

            {result.isExternal ? (
              <div className="flex flex-col items-center gap-4">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/25 mx-auto inline-flex"
                >
                  <Download size={20} /> {result.url.includes('ssyoutube') ? 'Download via ssyoutube' : 'Download via Cobalt'}
                </a>
                <p className="text-xs text-yellow-500 max-w-md bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                  <AlertCircle size={14} className="inline mr-1 -mt-0.5" />
                  <strong>Note:</strong> Some of our primary backend servers are experiencing high traffic or blocks. We have safely redirected you to our trusted backup server. You can safely download your file there, or try again later!
                </p>
              </div>
            ) : (
              <button
                onClick={() => forceDownload(result.url, `ghost-dl-${Date.now()}.${quality === 'audio' ? 'mp3' : 'mp4'}`)}
                className="w-full sm:w-auto bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-500/25 mx-auto"
              >
                <Download size={20} /> Save to Device
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* About & SEO Section */}
      <section id="about" className="mt-16 md:mt-24 text-left max-w-4xl mx-auto space-y-12 pb-12 px-4 md:px-0 opacity-80">
        
        <div className="text-center mb-2 border-b border-white/10 pb-8">
          <h2 className="text-3xl font-bold text-white mb-4">About Ghost Downloader</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Your ultimate universal video saver and <strong>TikTok video downloader without watermark</strong>. We make it easy, fast, and secure to save media from your favorite social platforms directly to your device for free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
              <Smartphone size={24} className="text-pink-500" />
              TikTok Video Downloader No Watermark
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Ghost Downloader is the fastest and most reliable <strong>TikTok Video Downloader without watermark</strong>. Save your favorite TikTok clips in ultra-high quality (HD) directly to your iPhone, Android, or PC. Our tool is 100% free and does not require you to install any apps or log into your TikTok account. Just paste the link and download instantly!
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-3 text-white flex items-center gap-2">
              <Youtube size={24} className="text-red-500" />
              Free YouTube Downloader
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Looking to save YouTube videos or shorts? Our <strong>YouTube video downloader</strong> provides a fast, ad-free experience. Easily convert YouTube links to high-quality MP4 or MP3 files. It works on all devices globally, making it your go-to universal saver.
            </p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Why Choose Ghost Downloader?</h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4">
            Ghost Downloader isn't just a <strong>TikTok video downloader</strong>; it's a completely universal tool designed for creators and viewers alike. Whether you want to grab an inspiring <strong>Instagram Reel</strong>, save a funny <strong>Facebook video</strong>, or archive a thread from <strong>Twitter (X)</strong>, our platform handles it all without compromising your privacy.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300 mt-6">
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              <span><strong>No Watermark:</strong> Get original TikTok videos clean and clear.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              <span><strong>No Registration:</strong> We don't ask for your personal data or login.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              <span><strong>Universal Support:</strong> YouTube, Instagram, Facebook, TikTok, Reddit & more.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">✓</span>
              <span><strong>Fast & Free:</strong> Powered by premium CDNs ensuring top speed globally.</span>
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <FAQ />
      </section>
      
    </div>
  );
}
