import React from 'react';
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
