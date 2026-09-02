const fs = require('fs');

const layoutCode = `import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-pink-500 selection:text-white flex flex-col">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-5 md:px-8 bg-[#050505] sticky top-0 z-50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-[10px] flex items-center justify-center text-white font-bold text-[13px] tracking-tight shadow-lg shadow-pink-500/20">
              IG
            </div>
            <span className="font-extrabold text-xl tracking-tight uppercase text-white">GHOST<span className="text-[#ee2a7b]">IG</span></span>
          </Link>
          
          <nav className="flex items-center gap-5 text-[15px] text-slate-400">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Legal</Link>
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full mx-auto px-4 py-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-8 flex justify-center pb-8 border-t border-white/5">
          <p className="text-sm text-slate-600 font-medium">GhostIG — Anonymous & Secure Viewer</p>
        </footer>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Layout.tsx', layoutCode);
console.log("Layout fixed");
