import React from 'react';
import { ChevronRight, AlertCircle, Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-pink-500/20">
           <Shield size={32} className="text-white" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">Privacy Policy & Terms</h1>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">Last updated: August 2024. Please read our policies carefully regarding the use of our All-in-One Downloader for TikTok, Instagram, YouTube, Facebook, and Pinterest.</p>
      </div>

      <div className="bg-[#ee2a7b]/10 border border-[#ee2a7b]/20 p-5 md:p-6 rounded-xl md:rounded-2xl mb-12 flex flex-col sm:flex-row gap-4 items-start">
        <div className="bg-[#ee2a7b]/20 p-2.5 md:p-3 rounded-full shrink-0">
          <AlertCircle className="text-[#ee2a7b] w-6 h-6 md:w-7 md:h-7" />
        </div>
        <div>
          <h3 className="text-white font-bold text-base md:text-lg mb-2">Disclaimer / Fair Use</h3>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            Ghost Downloader is an independent, third-party web tool. We are <strong>strictly not affiliated with, authorized, maintained, sponsored, or endorsed by TikTok, ByteDance, YouTube, Google, Instagram, Facebook, Meta Platforms, Inc., Pinterest,</strong> or any of their affiliates. All logos and trademarks displayed on this application are the property of their respective owners. This tool is designed for educational purposes and personal use only to view and download publicly available data. Users must respect the copyright of the content creators.
          </p>
        </div>
      </div>

      <section className="bg-white/5 border border-white/10 p-5 md:p-10 rounded-2xl md:rounded-3xl mb-12">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 border-b border-white/10 pb-4 text-white">Comprehensive Policy Details</h2>
        <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-8 text-xs md:text-sm text-slate-400 leading-relaxed">
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-pink-500 mt-0.5 shrink-0"/> 
              <span>1. Introduction to Ghost Downloader</span>
            </h4>
            <p>Ghost Downloader is a free online web utility designed to allow users to view and download public media from platforms like TikTok, YouTube, Instagram, Facebook, and Pinterest without requiring authentication.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-pink-500 mt-0.5 shrink-0"/> 
              <span>2. No Content Hosted</span>
            </h4>
            <p>We do not host, store, or cache any user media, photos, videos, or stories on our servers. All content is fetched directly in real-time from the respective platform's CDNs via secure APIs.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-pink-500 mt-0.5 shrink-0"/> 
              <span>3. User Anonymity</span>
            </h4>
            <p>Your privacy is our priority. We do not require you to log in with your social media credentials. When you use Ghost Downloader to view a story or download a video, the content creator is not notified.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-pink-500 mt-0.5 shrink-0"/> 
              <span>4. Log Files & Analytics</span>
            </h4>
            <p>Like many standard websites, Ghost Downloader uses log files. These files merely log visitors to the site—usually a standard procedure for hosting companies. The information includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-pink-500 mt-0.5 shrink-0"/> 
              <span>5. Google DoubleClick DART Cookie</span>
            </h4>
            <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-pink-500 mt-0.5 shrink-0"/> 
              <span>6. Copyright Infringement</span>
            </h4>
            <p>Ghost Downloader does not support or promote the unauthorized downloading of copyrighted materials. Users are strictly advised to download content for which they have explicit permission from the creator.</p>
          </div>

        </div>
      </section>

      {/* Google AdSense Placeholder (Simulated) */}
      <div className="w-full h-[250px] bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center text-slate-500 text-sm tracking-widest uppercase mb-12">
          <span className="mb-2">Google AdSense Space</span>
          <span className="text-[10px] text-slate-600 normal-case">(Ready for script injection)</span>
      </div>
      
    </div>
  );
}
