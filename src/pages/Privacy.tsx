import React from 'react';
import { ChevronRight, AlertCircle } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy & Terms</h1>
        <p className="text-slate-400 text-sm md:text-base">Please read our terms of service carefully before using GhostIG.</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#ee2a7b]/10 border border-[#ee2a7b]/20 p-5 md:p-6 rounded-xl md:rounded-2xl mb-12 flex flex-col sm:flex-row gap-4 items-start">
        <div className="bg-[#ee2a7b]/20 p-2.5 md:p-3 rounded-full shrink-0">
          <AlertCircle className="text-[#ee2a7b] w-6 h-6 md:w-7 md:h-7" />
        </div>
        <div>
          <h3 className="text-white font-bold text-base md:text-lg mb-2">Disclaimer / Fair Use</h3>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            GhostIG is an independent, third-party web tool. We are <strong>strictly not affiliated with, authorized, maintained, sponsored, or endorsed by Instagram, Facebook, Meta Platforms, Inc.,</strong> or any of their affiliates. All Instagram logos and trademarks displayed on this application are the property of Meta Platforms, Inc. This tool is designed for educational purposes and personal use only to view publicly available data.
          </p>
        </div>
      </div>

      {/* AdSense Approval / Privacy & Terms text (15 sections) */}
      <section className="bg-white/5 border border-white/10 p-5 md:p-10 rounded-2xl md:rounded-3xl mb-12">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 border-b border-white/10 pb-4">Comprehensive Policy Details</h2>
        <div className="grid md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-8 text-xs md:text-sm text-slate-400 leading-relaxed">
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>1. Introduction to GhostIG</span>
            </h4>
            <p>GhostIG is a free online web utility designed to allow users to view public Instagram profiles, stories, and posts without requiring any authentication or account login.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>2. Anonymous Viewing Commitment</span>
            </h4>
            <p>We are committed to ensuring user privacy. When you use GhostIG to view a story or post, your IP address and personal details are never forwarded to the target account's viewer list.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>3. No Registration Required</span>
            </h4>
            <p>To protect your identity and streamline the experience, GhostIG does not ask for your email, password, or any sign-up process. The service is accessible instantly.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>4. Data Collection & Usage</span>
            </h4>
            <p>We do not collect Personally Identifiable Information (PII). We only process the Instagram username you input to fetch public data dynamically via secure APIs.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>5. Media Storage Policy</span>
            </h4>
            <p>GhostIG acts strictly as a proxy and viewer. We do not host, store, or cache any Instagram photos, videos, or stories on our own servers. Media is delivered directly from origin servers.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>6. Public Data Only</span>
            </h4>
            <p>Our tool only interacts with public Instagram accounts. GhostIG cannot bypass privacy settings and does not support viewing stories or posts from private profiles.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>7. Copyright & Fair Use</span>
            </h4>
            <p>Users are expected to respect the intellectual property rights of original creators. Media downloaded through GhostIG should be for personal use and not redistributed commercially.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>8. Use of Cookies</span>
            </h4>
            <p>We use standard web cookies to improve user experience, remember basic preferences, and analyze site traffic to keep our servers running smoothly and efficiently.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>9. Third-Party Advertising</span>
            </h4>
            <p>We may partner with third-party ad networks (such as Google AdSense) which use cookies to serve personalized ads based on your prior visits to this and other websites.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>10. Server Log Files</span>
            </h4>
            <p>Like most standard websites, we maintain log files containing non-identifying info like browser type, referring pages, and timestamp to monitor security and prevent abuse.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>11. Children's Information</span>
            </h4>
            <p>GhostIG does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe such data exists on our site, please contact us immediately.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>12. External Links Liability</span>
            </h4>
            <p>Our website may contain links to external sites that are not operated by us. We have no control over and assume no responsibility for the content or privacy policies of third-party sites.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>13. Service Modifications</span>
            </h4>
            <p>We reserve the right to modify, suspend, or discontinue the GhostIG service temporarily or suspended without prior notice, as we rely on external API availability.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>14. Policy Updates</span>
            </h4>
            <p>This privacy policy and terms of service may be updated periodically. Users are encouraged to review this page frequently for any changes to our data handling practices.</p>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-1.5 md:mb-2 text-sm md:text-base flex items-start gap-2">
              <ChevronRight size={16} className="text-[#ee2a7b] mt-0.5 shrink-0"/> 
              <span>15. DMCA & Contact</span>
            </h4>
            <p>If you have any questions about this Privacy Policy, or if you need to submit a DMCA takedown request regarding indexed public links, please contact our support team via email at kamarpathan0786@gmail.com.</p>
          </div>

        </div>
      </section>
    </div>
  );
}
