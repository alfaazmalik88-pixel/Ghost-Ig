import React, { useState } from 'react';
import { Search, Download, Loader2, Play, Maximize, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FetchResult as InstagramData } from '../types';

export default function Home() {
  const [url, setUrl] = useState('');
  const [server, setServer] = useState('server1');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<InstagramData | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'POSTS' | 'STORIES' | 'HIGHLIGHTS' | 'REELS'>('STORIES');
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setError('');
    setResult(null);
    setActiveStoryIndex(0);

    try {
      const response = await fetch('/api/fetch-instagram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, server }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch data');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the data.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFile = async (fileUrl: string) => {
    try {
      const response = await fetch(`/api/download?url=${encodeURIComponent(fileUrl)}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const contentType = response.headers.get("content-type");
      const ext = contentType?.includes("video") ? "mp4" : "jpg";
      link.download = `ig-story-${Date.now()}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
      alert("Failed to download file.");
    }
  };

  return (
    <>
      {/* Search Section */}
      <section className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          Instant Story &amp; Post Extraction
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto mb-8 md:mb-10 text-base md:text-lg">
          Anonymously view and download high-resolution stories and posts without any login required.
        </p>
        
        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto relative group">
          <div className="bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center mb-8 md:mb-12 shadow-2xl focus-within:border-[#ee2a7b]/50 transition-colors">
            <input
              type="text"
              placeholder="Paste Profile URL or Username..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 w-full bg-transparent px-4 md:px-6 py-4 outline-none text-base md:text-lg placeholder:text-slate-500 text-slate-100"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 w-full sm:w-auto px-6 md:px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-pink-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2 sm:mt-0"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : 'FETCH'}
            </button>
          </div>
          
          {/* Server Grid */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-4xl mx-auto text-left">
            <div 
              onClick={() => setServer('server1')}
              className={`cursor-pointer border p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md flex flex-col items-start transition-all relative overflow-hidden ${server === 'server1' ? 'bg-white/10 border-[#ee2a7b]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              {server === 'server1' && <div className="absolute top-0 right-0 px-2 py-0.5 md:px-3 md:py-1 bg-[#ee2a7b] text-[8px] md:text-[10px] font-bold rounded-bl-lg">OPT</div>}
              <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${server === 'server1' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline-block">Mumbai Node</span>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest sm:hidden">IN</span>
              </div>
              <div className="text-sm md:text-xl font-bold mb-1">India</div>
              <div className="text-[9px] md:text-xs text-slate-500 hidden md:block">Fastest for South Asia</div>
            </div>

            <div 
              onClick={() => setServer('server2')}
              className={`cursor-pointer border p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md flex flex-col items-start transition-all relative overflow-hidden ${server === 'server2' ? 'bg-white/10 border-[#ee2a7b]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              {server === 'server2' && <div className="absolute top-0 right-0 px-2 py-0.5 md:px-3 md:py-1 bg-[#ee2a7b] text-[8px] md:text-[10px] font-bold rounded-bl-lg">OPT</div>}
              <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${server === 'server2' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline-block">Dubai Node</span>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest sm:hidden">UAE</span>
              </div>
              <div className="text-sm md:text-xl font-bold mb-1">Gulf</div>
              <div className="text-[9px] md:text-xs text-slate-500 hidden md:block">Optimized for Middle East</div>
            </div>

            <div 
              onClick={() => setServer('server3')}
              className={`cursor-pointer border p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md flex flex-col items-start transition-all relative overflow-hidden ${server === 'server3' ? 'bg-white/10 border-[#ee2a7b]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              {server === 'server3' && <div className="absolute top-0 right-0 px-2 py-0.5 md:px-3 md:py-1 bg-[#ee2a7b] text-[8px] md:text-[10px] font-bold rounded-bl-lg">OPT</div>}
              <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${server === 'server3' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline-block">Frankfurt Node</span>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest sm:hidden">EU</span>
              </div>
              <div className="text-sm md:text-xl font-bold mb-1">Europe</div>
              <div className="text-[9px] md:text-xs text-slate-500 hidden md:block">Best for EU / Global</div>
            </div>
          </div>
        </form>
      </section>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg text-center mb-8 mx-auto max-w-2xl text-sm md:text-base">
          {error}
        </div>
      )}

      {/* Placeholder / Empty State */}
      {!result && !isLoading && !error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto text-center py-12 px-4 border border-white/5 bg-white/5 rounded-2xl backdrop-blur-sm"
        >
          <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full flex items-center justify-center mb-6 opacity-80">
            <Search size={28} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-3">Ready to explore anonymously?</h2>
          <p className="text-slate-400 text-sm md:text-base mb-6">
            Enter any public Instagram username or profile link above to instantly view and download their stories, reels, and posts in HD without logging in.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold tracking-wider text-slate-500 uppercase">
            <span className="bg-black/30 px-3 py-1.5 rounded-full border border-white/5">No Login</span>
            <span className="bg-black/30 px-3 py-1.5 rounded-full border border-white/5">100% Anonymous</span>
            <span className="bg-black/30 px-3 py-1.5 rounded-full border border-white/5">Fast Servers</span>
          </div>
        </motion.div>
      )}

      {/* Results Section */}
      {result && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="p-6 text-center border-b border-white/10">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-[#ee2a7b]">@{result.profile.username}</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              <div className="relative shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                  <img 
                    src={result.profile.avatar} 
                    alt={result.profile.username} 
                    className="w-full h-full rounded-full object-cover border-4 border-[#05050a]"
                  />
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex gap-4 md:gap-6 mb-4">
                  <div>
                    <div className="font-bold text-lg md:text-2xl">{result.profile.stats.posts}</div>
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">posts</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg md:text-2xl">{result.profile.stats.followers}</div>
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">followers</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg md:text-2xl">{result.profile.stats.following}</div>
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">following</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="font-bold text-base md:text-lg mb-1">{result.profile.name}</div>
                  <div className="whitespace-pre-wrap text-slate-400 leading-relaxed text-xs md:text-sm max-w-sm">{result.profile.bio}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center border-b border-white/10 text-xs md:text-sm font-bold tracking-wider uppercase overflow-x-auto no-scrollbar">
            {(['POSTS', 'STORIES', 'HIGHLIGHTS', 'REELS'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-3 md:py-4 transition-colors relative whitespace-nowrap ${activeTab === tab ? 'text-[#ee2a7b]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ee2a7b]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Media Content */}
          <div className="p-3 md:p-8 bg-black/20">
            {activeTab === 'STORIES' ? (
              result.stories && result.stories.length > 0 ? (
                <div className="max-w-[400px] mx-auto w-full">
                  {/* Story Indicators */}
                  <div className="flex gap-1.5 md:gap-2 mb-4 justify-center flex-wrap">
                    {result.stories.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveStoryIndex(idx)}
                        className={`h-1 md:h-1.5 rounded-full transition-all ${idx === activeStoryIndex ? 'w-4 md:w-6 bg-[#ee2a7b]' : 'w-1.5 md:w-2 bg-white/20'}`}
                        aria-label={`Go to story ${idx + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Active Story Viewer */}
                  <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-black mx-auto max-h-[60vh] md:max-h-[70vh] aspect-[9/16] shadow-2xl group border border-white/5 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStoryIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        {result.stories[activeStoryIndex].type === 'video' ? (
                          <video 
                            src={result.stories[activeStoryIndex].url}
                            className="w-full h-full object-contain"
                            controls
                            playsInline
                            autoPlay
                            muted
                            loop
                          />
                        ) : (
                          <img 
                            src={result.stories[activeStoryIndex].url} 
                            alt="Instagram Story" 
                            className="w-full h-full object-contain"
                          />
                        )}
                        
                        <div className="absolute top-2 right-2 md:top-4 md:right-4 flex gap-2">
                          <button className="bg-black/50 border border-white/10 backdrop-blur-md p-1.5 md:p-2 rounded-full text-white hover:bg-white/10 transition hidden md:block">
                            <Play size={16} />
                          </button>
                        </div>
                        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-[10px] md:text-xs font-bold tracking-wider bg-black/60 border border-white/10 backdrop-blur-md px-2 md:px-3 py-1 md:py-1.5 rounded-full text-white">
                          {result.stories[activeStoryIndex].timestamp}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <button 
                    onClick={() => downloadFile(result.stories[activeStoryIndex].url)}
                    className="w-full mt-4 md:mt-6 bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 text-white font-bold py-3 md:py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-lg shadow-lg shadow-pink-500/40 active:scale-[0.98]"
                  >
                    DOWNLOAD STORY <Download size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 md:py-20 text-slate-500 font-medium">
                  <p className="text-base md:text-xl text-center">No active stories found.</p>
                </div>
              )
            ) : (
              // Shared grid view for POSTS, REELS, and HIGHLIGHTS
              (() => {
                const mediaArray = activeTab === 'POSTS' 
                  ? result.posts 
                  : activeTab === 'REELS' 
                    ? result.reels 
                    : result.highlights;
                    
                const emptyMessage = activeTab === 'POSTS' 
                  ? "No posts found for this user." 
                  : activeTab === 'REELS' 
                    ? "No reels found for this user." 
                    : "No highlights found for this user.";

                return mediaArray && mediaArray.length > 0 ? (
                  <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 max-w-4xl mx-auto">
                    {mediaArray.map((media) => (
                      <div 
                        key={media.id} 
                        className="relative aspect-square group bg-black/40 rounded-md sm:rounded-lg md:rounded-xl overflow-hidden cursor-pointer"
                        onClick={() => setSelectedPost(media)}
                      >
                        <img 
                          src={media.thumbnail} 
                          alt={`Instagram ${activeTab.toLowerCase()}`} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {media.type === 'video' && (
                          <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-black/60 p-1 md:p-1.5 rounded-full">
                            <Play size={12} className="text-white md:w-3.5 md:h-3.5" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                           <div className="bg-[#6228d7] text-white p-2 md:p-3 rounded-full shadow-lg shadow-purple-500/40">
                             <Eye size={16} className="md:w-5 md:h-5" />
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 md:py-20 text-slate-500 font-medium text-center">
                    <p className="text-base md:text-xl">{emptyMessage}</p>
                  </div>
                );
              })()
            )}
          </div>
        </motion.section>
      )}

      {/* Media Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-2 sm:p-4 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-md w-full bg-[#05050a] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[90vh] md:max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 md:top-4 md:right-4 z-50 bg-black/50 text-white p-1.5 md:p-2 rounded-full hover:bg-white/20 transition-colors border border-white/10"
                onClick={() => setSelectedPost(null)}
              >
                <X size={16} className="md:w-5 md:h-5" />
              </button>
              
              <div className="w-full bg-black flex-1 flex items-center justify-center overflow-hidden relative">
                {selectedPost.type === 'video' ? (
                  <video 
                    src={selectedPost.url} 
                    className="w-full h-full object-contain max-h-[60vh] md:max-h-[70vh]" 
                    controls 
                    autoPlay 
                    loop 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={selectedPost.url} 
                    className="w-full h-full object-contain max-h-[60vh] md:max-h-[70vh]" 
                    alt="Instagram Post" 
                  />
                )}
              </div>
              
              <div className="p-4 md:p-6 border-t border-white/10 bg-[#05050a]/90 backdrop-blur-md">
                <button
                  onClick={() => downloadFile(selectedPost.url)}
                  className="w-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:opacity-90 text-white font-bold py-3 md:py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm md:text-lg shadow-lg shadow-pink-500/40 active:scale-[0.98]"
                >
                  <Download size={18} className="md:w-5 md:h-5" /> DOWNLOAD MEDIA
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
