import React from 'react';

export default function FAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "How do I download TikTok videos without a watermark?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Using our free TikTok video downloader is simple. Copy the video link from the TikTok app, paste it into our search bar, and click download. Our tool instantly processes and saves the TikTok video without watermark directly to your device."
      }
    }, {
      "@type": "Question",
      "name": "Does this tool work as a YouTube video downloader and Instagram Reels saver?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Ghost Downloader is a universal video saver. You can easily download YouTube videos in high quality (MP4) or extract audio (MP3). It also fully supports downloading Instagram Reels and Facebook videos fast and entirely for free."
      }
    }, {
      "@type": "Question",
      "name": "Can I use this free video downloader on my iPhone or Android?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Our platform is completely browser-based. Whether you are using an iPhone (iOS), Android smartphone, iPad, or a desktop PC, you can save TikTok videos and download YouTube content globally without needing to install any third-party apps."
      }
    }, {
      "@type": "Question",
      "name": "Is it safe, and do I need to create an account?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is 100% safe and secure. You do not need to register, log in, or provide any personal information. We respect your privacy, and our system processes all downloads completely anonymously without tracking your history."
      }
    }, {
      "@type": "Question",
      "name": "Where are the downloaded files saved on my device?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once the download is complete, your files are typically saved in your device's default Downloads folder. On mobile devices, you can find the saved MP4 or MP3 files in your Gallery or Files app."
      }
    }]
  };

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Frequently Asked Questions</h2>
      <div className="space-y-6 text-slate-300 text-sm md:text-base">
        <div>
          <h3 className="font-bold text-white mb-2">How do I download TikTok videos without a watermark?</h3>
          <p className="text-slate-400">Using our free <strong>TikTok video downloader</strong> is simple. Copy the video link from the TikTok app, paste it into our search bar, and click download. Our tool instantly processes and saves the TikTok video <strong>without watermark</strong> directly to your device.</p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Does this tool work as a YouTube video downloader and Instagram Reels saver?</h3>
          <p className="text-slate-400">Yes! Ghost Downloader is a universal video saver. You can easily download <strong>YouTube videos</strong> in high quality (MP4) or extract audio (MP3). It also fully supports downloading <strong>Instagram Reels</strong> and <strong>Facebook videos</strong> fast and entirely for free.</p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Can I use this free video downloader on my iPhone or Android?</h3>
          <p className="text-slate-400">Absolutely. Our platform is completely browser-based. Whether you are using an iPhone (iOS), Android smartphone, iPad, or a desktop PC, you can save TikTok videos and download YouTube content globally without needing to install any third-party apps.</p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Is it safe, and do I need to create an account?</h3>
          <p className="text-slate-400">It is 100% safe and secure. You do not need to register, log in, or provide any personal information. We respect your privacy, and our system processes all downloads completely anonymously without tracking your history.</p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Where are the downloaded files saved on my device?</h3>
          <p className="text-slate-400">Once the download is complete, your files are typically saved in your device's default "Downloads" folder. On mobile devices, you can find the saved MP4 or MP3 files in your Gallery or Files app.</p>
        </div>
      </div>
    </div>
    </>
  );
}
