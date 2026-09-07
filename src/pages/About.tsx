import React from 'react';
import { Info, DownloadCloud, Zap, ShieldCheck, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">About Ghost Downloader</h1>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Your ultimate universal video saver and TikTok video downloader without watermark. We make it easy, fast, and secure to save media from your favorite social platforms directly to your device for free.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
           <div className="w-12 h-12 bg-pink-500/20 text-pink-500 rounded-xl flex items-center justify-center mb-6">
             <DownloadCloud size={24} />
           </div>
           <h3 className="text-xl font-bold text-white mb-3">Multi-Platform Support</h3>
           <p className="text-slate-400 text-sm leading-relaxed">
             Our downloader supports saving videos from TikTok (without watermark), YouTube, Instagram Reels, Facebook, and more. You don't need multiple apps—Ghost Downloader handles everything from a single search box.
           </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
           <div className="w-12 h-12 bg-purple-500/20 text-purple-500 rounded-xl flex items-center justify-center mb-6">
             <ShieldCheck size={24} />
           </div>
           <h3 className="text-xl font-bold text-white mb-3">100% Secure & Private</h3>
           <p className="text-slate-400 text-sm leading-relaxed">
             We respect your privacy. You don't need to log in, register, or provide any personal information to use our service. We process all downloads completely anonymously.
           </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
           <div className="w-12 h-12 bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center mb-6">
             <Zap size={24} />
           </div>
           <h3 className="text-xl font-bold text-white mb-3">Lightning Fast & HD</h3>
           <p className="text-slate-400 text-sm leading-relaxed">
             Get the highest available quality for every download. Whether it's a YouTube video in MP4 or a crisp HD TikTok, Ghost Downloader extracts the original source file at maximum speed using optimized global servers.
           </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
           <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-xl flex items-center justify-center mb-6">
             <Globe size={24} />
           </div>
           <h3 className="text-xl font-bold text-white mb-3">Free Forever</h3>
           <p className="text-slate-400 text-sm leading-relaxed">
             Our core downloading tools are completely free to use. We rely on unintrusive display ads to keep our servers running, ensuring you never have to pay a subscription fee to download your favorite content.
           </p>
        </div>
      </div>

      <section className="bg-gradient-to-tr from-[#f9ce34]/10 via-[#ee2a7b]/10 to-[#6228d7]/10 border border-white/10 p-8 md:p-12 rounded-3xl text-center">
         <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to start downloading?</h2>
         <p className="text-slate-300 mb-8 max-w-xl mx-auto">Head back to our homepage, paste any social media video link, and save it directly to your device.</p>
         <a href="/" className="inline-block bg-white text-black font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform">
           Try it Now
         </a>
      </section>

    </div>
  );
}
