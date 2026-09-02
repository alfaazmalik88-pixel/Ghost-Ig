const fs = require('fs');

const layoutCode = `import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#05050a] text-slate-100 font-sans selection:bg-pink-500 selection:text-white relative overflow-x-hidden flex flex-col" style={{ backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(249, 206, 52, 0.1) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(238, 42, 123, 0.15) 0%, transparent 50%)' }}>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-4 md:p-6 md:px-8 border-b border-white/5 sticky top-0 z-50 backdrop-blur-md bg-[#05050a]/80">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
              <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white rounded-md"></div>
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight uppercase">GHOST<span className="text-[#ee2a7b]">IG</span></span>
          </Link>
          
          <nav className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
              <Link to="/" className="hover:text-white transition-colors cursor-pointer">Downloader</Link>
              <Link to="/about" className="hover:text-white transition-colors cursor-pointer">How to Use</Link>
              <Link to="/privacy" className="hover:text-white transition-colors cursor-pointer">Privacy & Terms</Link>
            </div>
            
            {/* Mobile Nav Links */}
            <div className="flex md:hidden gap-3 text-xs font-medium text-slate-400">
              <Link to="/about" className="hover:text-white">About</Link>
              <Link to="/privacy" className="hover:text-white">Legal</Link>
            </div>
            
            <button className="hidden md:block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm backdrop-blur-md hover:bg-white/10 transition-colors">
              Premium
            </button>
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-16 border-t border-white/5 flex flex-col bg-transparent text-slate-400 pb-12 relative z-10">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white rounded-md"></div>
                </div>
                <span className="font-bold tracking-tight text-white">GHOST<span className="text-[#ee2a7b]">IG</span></span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                The ultimate anonymous Instagram story viewer and downloader. No footprints, no login required.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-4">INSTAGRAM TOOLS</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/" className="hover:text-white transition">Instagram Story Viewer</Link></li>
                <li><Link to="/" className="hover:text-white transition">GhostIG</Link></li>
                <li><Link to="/" className="hover:text-white transition">Instagram Viewer</Link></li>
                <li><Link to="/" className="hover:text-white transition">Instagram Profile Viewer</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-4">COMPANY</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><a href="mailto:kamarpathan0786@gmail.com" className="hover:text-white transition flex items-center gap-2"><Mail size={14} className="text-slate-500" /> Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 w-full mt-16 pt-8 border-t border-white/5 text-xs text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2024 GhostIG Pro. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-white transition">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Layout.tsx', layoutCode);
console.log("Restored Layout");

let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const startStr = '{/* Search Section */}';
const endStr = '{/* Results Section */}';
const startIndex = homeCode.indexOf(startStr);
const endIndex = homeCode.indexOf(endStr);

const replacement = `{/* Search Section */}
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
              className={\`cursor-pointer border p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md flex flex-col items-start transition-all relative overflow-hidden \${server === 'server1' ? 'bg-white/10 border-[#ee2a7b]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}\`}
            >
              {server === 'server1' && <div className="absolute top-0 right-0 px-2 py-0.5 md:px-3 md:py-1 bg-[#ee2a7b] text-[8px] md:text-[10px] font-bold rounded-bl-lg">OPT</div>}
              <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                <div className={\`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full \${server === 'server1' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}\`}></div>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline-block">Mumbai Node</span>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest sm:hidden">IN</span>
              </div>
              <div className="text-sm md:text-xl font-bold mb-1">India</div>
              <div className="text-[9px] md:text-xs text-slate-500 hidden md:block">Fastest for South Asia</div>
            </div>

            <div 
              onClick={() => setServer('server2')}
              className={\`cursor-pointer border p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md flex flex-col items-start transition-all relative overflow-hidden \${server === 'server2' ? 'bg-white/10 border-[#ee2a7b]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}\`}
            >
              {server === 'server2' && <div className="absolute top-0 right-0 px-2 py-0.5 md:px-3 md:py-1 bg-[#ee2a7b] text-[8px] md:text-[10px] font-bold rounded-bl-lg">OPT</div>}
              <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                <div className={\`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full \${server === 'server2' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}\`}></div>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline-block">Dubai Node</span>
                <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest sm:hidden">UAE</span>
              </div>
              <div className="text-sm md:text-xl font-bold mb-1">Gulf</div>
              <div className="text-[9px] md:text-xs text-slate-500 hidden md:block">Optimized for Middle East</div>
            </div>

            <div 
              onClick={() => setServer('server3')}
              className={\`cursor-pointer border p-3 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-md flex flex-col items-start transition-all relative overflow-hidden \${server === 'server3' ? 'bg-white/10 border-[#ee2a7b]/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}\`}
            >
              {server === 'server3' && <div className="absolute top-0 right-0 px-2 py-0.5 md:px-3 md:py-1 bg-[#ee2a7b] text-[8px] md:text-[10px] font-bold rounded-bl-lg">OPT</div>}
              <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                <div className={\`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full \${server === 'server3' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}\`}></div>
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

      `;

homeCode = homeCode.substring(0, startIndex) + replacement + homeCode.substring(endIndex);
fs.writeFileSync('src/pages/Home.tsx', homeCode);
console.log("Restored Home UI");
