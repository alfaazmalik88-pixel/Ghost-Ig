 import React, { useState } from 'react';
import { Sparkles, Shield, Zap, Globe, ArrowRight, Instagram, Lock, RefreshCw } from 'lucide-react';

export default function App() {
  const [input, setInput] = useState('');
  const [region, setRegion] = useState('India');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const sanitizeUsername = (raw: string) => {
    let clean = raw.trim();
    if (clean.includes('instagram.com/')) {
      clean = clean.split('instagram.com/')[1];
    }
    return clean.split('?')[0].replace(/[\\\/]/g, '').replace('@', '').trim();
  };

  const handleFetch = async () => {
    const user = sanitizeUsername(input);
    if (!user) {
      setError('Please enter a valid Instagram username');
      return;
    }

    setLoading(true);
    setError(null);
    setProfile(null);

    try {
      const target = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(user)}`;
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(target)}`);
      
      if (!res.ok) throw new Error('Network timeout. Please try again.');
      
      const jsonWrapper = await res.json();
      const raw = jsonWrapper.contents;

      if (!raw || raw.trim().startsWith('<') || !raw.includes('data')) {
        throw new Error('Account is private or restricted by Instagram.');
      }

      const parsed = JSON.parse(raw);
      if (!parsed.data?.user) {
        throw new Error('Profile not found.');
      }

      setProfile(parsed.data.user);
    } catch (err: any) {
      setError(err.message || 'Failed to extract profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col items-center justify-between p-4 sm:p-6 font-sans">
      
      {/* Top Navbar */}
      <header className="w-full max-w-lg flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Instagram className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-lg tracking-tight">GHOST<span className="text-rose-500">IG</span></span>
        </div>
        <div className="flex gap-4 text-xs font-medium text-zinc-400">
          <button className="hover:text-white transition">About</button>
          <button className="hover:text-white transition">Legal</button>
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-lg my-auto py-8 text-center flex flex-col items-center">
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
          Instant Story & Post <br />
          <span className="bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 bg-clip-text text-transparent">
            Extraction
          </span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
          Anonymously view and download high-resolution stories and posts without any login required.
        </p>

        {/* Input Card */}
        <div className="w-full bg-[#111115] border border-zinc-800/80 rounded-2xl p-3 shadow-2xl backdrop-blur-sm">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Username or profile link"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-[#17171c] text-white text-sm px-4 py-3.5 rounded-xl border border-zinc-700/50 focus:border-rose-500 focus:outline-none transition placeholder:text-zinc-500"
            />
          </div>

          <button
            onClick={handleFetch}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 active:scale-[0.99] transition shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>EXTRACTING...</span>
              </>
            ) : (
              <>
                <span>FETCH</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Region Pills */}
        <div className="w-full grid grid-cols-3 gap-2.5 mt-4">
          {[
            { id: 'India', flag: 'IN', label: 'India', opt: true },
            { id: 'Gulf', flag: 'UAE', label: 'Gulf' },
            { id: 'Europe', flag: 'EU', label: 'Europe' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setRegion(item.id)}
              className={`relative flex flex-col items-start p-3 rounded-xl border text-left transition ${
                region === item.id 
                  ? 'bg-purple-950/30 border-purple-500/80 shadow-inner' 
                  : 'bg-[#111115] border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {item.opt && (
                <span className="absolute top-2 right-2 bg-rose-500 text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white uppercase tracking-wider">
                  OPT
                </span>
              )}
              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${region === item.id ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                <span>{item.flag}</span>
              </div>
              <span className="text-xs font-semibold text-zinc-200">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Error Box */}
        {error && (
          <div className="w-full mt-4 p-3.5 bg-red-950/40 border border-red-800/60 rounded-xl text-red-400 text-xs text-left">
            {error}
          </div>
        )}

        {/* Result Profile Card */}
        {profile && (
          <div className="w-full mt-5 bg-[#111115] border border-zinc-800/80 rounded-2xl p-4 text-left shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3.5 mb-3">
              {profile.profile_pic_url_hd && (
                <img
                  src={`https://images.weserv.nl/?url=${encodeURIComponent(profile.profile_pic_url_hd)}`}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover border-2 border-rose-500"
                />
              )}
              <div>
                <h3 className="font-bold text-sm text-zinc-100">{profile.full_name || profile.username}</h3>
                <p className="text-xs text-zinc-400">@{profile.username}</p>
              </div>
            </div>

            {profile.biography && (
              <p className="text-xs text-zinc-300 mb-3 leading-relaxed">
                {profile.biography}
              </p>
            )}

            <div className="flex justify-between pt-3 border-t border-zinc-800/80 text-xs">
              <div>
                <span className="font-bold text-white">{profile.edge_followed_by?.count?.toLocaleString() || 0}</span>
                <span className="text-zinc-500 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-bold text-white">{profile.edge_follow?.count?.toLocaleString() || 0}</span>
                <span className="text-zinc-500 ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold text-white">{profile.edge_owner_to_timeline_media?.count?.toLocaleString() || 0}</span>
                <span className="text-zinc-500 ml-1">Posts</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full max-w-lg text-center py-4 border-t border-zinc-900 text-[11px] text-zinc-600">
        GhostIG — Anonymous & Secure Viewer
      </footer>

    </div>
  );
}
