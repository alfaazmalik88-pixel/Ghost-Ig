import React, { useEffect, useRef, useState } from 'react';

export default function LeaderboardAd() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate initial scale to prevent layout jump on mobile
  const [scale, setScale] = useState(() => {
    if (typeof window !== 'undefined') {
      return Math.min(1, (window.innerWidth - 32) / 728);
    }
    return 1;
  });

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.offsetWidth - 16; // minus padding
        setScale(Math.min(1, availableWidth / 728));
      }
    };

    window.addEventListener('resize', updateScale);
    updateScale(); // Initial check
    
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const [shouldLoadAd, setShouldLoadAd] = useState(false);

  useEffect(() => {
    // Non-blocking deferral: Wait for the main page to load, then wait an extra 1.5s 
    // before triggering the ad network to ensure zero UI lag.
    let timer: number;
    const triggerAdLoad = () => {
      timer = window.setTimeout(() => setShouldLoadAd(true), 1500);
    };

    if (document.readyState === 'complete') {
      triggerAdLoad();
    } else {
      window.addEventListener('load', triggerAdLoad);
    }

    return () => {
      window.removeEventListener('load', triggerAdLoad);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadAd) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    // Use iframe document to safely execute document.write from Adsterra
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body, html { 
                margin: 0; 
                padding: 0; 
                overflow: hidden; 
                background: transparent; 
                width: 100%; 
                height: 100%; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
              }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key' : '74b7c37c49dc4c4bb1f84560da246829',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="https://www.highrevenueformat.com/74b7c37c49dc4c4bb1f84560da246829/invoke.js"></script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full flex justify-center my-6 md:my-8 px-2 md:px-4 overflow-hidden">
      <div 
        className="bg-white/5 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300"
        style={{ 
          width: `${728 * scale + 16}px`, 
          height: `${90 * scale + 16}px` 
        }}
      >
        <div 
          style={{ 
            transform: `scale(${scale})`, 
            transformOrigin: 'center', 
            width: '728px', 
            height: '90px' 
          }}
        >
          {shouldLoadAd ? (
            <iframe
              ref={iframeRef}
              width="728"
              height="90"
              frameBorder="0"
              scrolling="no"
              title="Advertisement"
              style={{ border: 'none', overflow: 'hidden', display: 'block' }}
            />
          ) : (
            <div className="w-full h-full bg-white/5 animate-pulse rounded" />
          )}
        </div>
      </div>
    </div>
  );
}
