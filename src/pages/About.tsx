import React from 'react';
import { UserX, Shield, MonitorPlay } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      {/* Key Features */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About GhostIG</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            GhostIG is a free, anonymous tool that allows you to view Instagram stories and download posts without any login or trace.
          </p>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Key Features</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#ee2a7b]/20 border border-[#ee2a7b]/30 text-[#ee2a7b] rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <UserX size={24} className="md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">100% Anonymous</h3>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              The account owner will never know you viewed their story. We route everything through our secure servers to ensure your identity remains hidden.
            </p>
          </div>

          <div className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#f9ce34]/20 border border-[#f9ce34]/30 text-[#f9ce34] rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <Shield size={24} className="md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">No Login Required</h3>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              You don't need an Instagram account, password, or any app installation to use our service. Simply search and view instantly.
            </p>
          </div>

          <div className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl hover:bg-white/10 transition-colors sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#6228d7]/20 border border-[#6228d7]/30 text-[#6228d7] rounded-xl flex items-center justify-center mb-4 md:mb-6">
              <MonitorPlay size={24} className="md:w-7 md:h-7" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">HD Quality</h3>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Save stories, photos, and videos in their original high-resolution quality directly to your device with a single click.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">How to Use GhostIG</h2>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#f9ce34]/20 via-[#ee2a7b]/20 to-[#6228d7]/20 -translate-y-1/2 z-0"></div>
          
          <div className="flex-1 bg-[#05050a] border border-white/10 p-5 md:p-6 rounded-2xl relative z-10 text-center flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0">
            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-gradient-to-tr from-[#f9ce34] to-[#ee2a7b] rounded-full flex items-center justify-center md:mx-auto md:mb-4 text-white font-bold text-lg md:text-xl shadow-lg">1</div>
            <div>
              <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-white">Enter Username</h3>
              <p className="text-xs md:text-sm text-slate-400">Type the exact Instagram username (e.g., @cristiano) in the search box.</p>
            </div>
          </div>
          
          <div className="flex-1 bg-[#05050a] border border-white/10 p-5 md:p-6 rounded-2xl relative z-10 text-center flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0">
            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-gradient-to-tr from-[#ee2a7b] to-[#6228d7] rounded-full flex items-center justify-center md:mx-auto md:mb-4 text-white font-bold text-lg md:text-xl shadow-lg">2</div>
            <div>
              <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-white">Fetch Data</h3>
              <p className="text-xs md:text-sm text-slate-400">Click the fetch button. Our tool securely connects to fetch media.</p>
            </div>
          </div>
          
          <div className="flex-1 bg-[#05050a] border border-white/10 p-5 md:p-6 rounded-2xl relative z-10 text-center flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 md:gap-0">
            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-gradient-to-tr from-[#6228d7] to-blue-500 rounded-full flex items-center justify-center md:mx-auto md:mb-4 text-white font-bold text-lg md:text-xl shadow-lg">3</div>
            <div>
              <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 text-white">View & Download</h3>
              <p className="text-xs md:text-sm text-slate-400">Browse stories and posts anonymously. Click download to save in HD.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
