const fs = require('fs');

let homeCode = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const startStr = '{/* Search Section */}';
const endStr = '{/* Results Section */}';
const startIndex = homeCode.indexOf(startStr);
const endIndex = homeCode.indexOf(endStr);

const replacement = `{/* Search Section */}
      <section className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-3xl md:text-[40px] font-extrabold mb-4 md:mb-5 tracking-tight text-white leading-tight">
          Instant Story & Post <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#8b5cf6]">Extraction</span>
        </h1>
        <p className="text-[#888] max-w-sm mx-auto mb-8 text-sm md:text-[15px] font-medium px-4">
          Anonymously view and download high-resolution stories and posts without any login required.
        </p>
        
        <form onSubmit={handleSearch} className="w-full max-w-[420px] mx-auto relative group">
          <div className="bg-[#121212] border border-white/5 p-4 md:p-5 rounded-[32px] flex flex-col mb-8 shadow-2xl">
            <input
              type="text"
              placeholder="Username ya profile link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-[#1a1a1a] px-5 py-4 rounded-2xl outline-none text-base placeholder:text-[#666] text-slate-100 mb-4"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-r from-[#f59e0b] via-[#ec4899] to-[#8b5cf6] hover:opacity-90 w-full py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-70 tracking-wide text-[15px]"
            >
              {isLoading ? <Loader2 size={24} className="animate-spin" /> : 'FETCH →'}
            </button>
          </div>
          
          {/* Server Grid */}
          <div className="grid grid-cols-3 gap-3 w-full">
            <div 
              onClick={() => setServer('server1')}
              className={\`cursor-pointer p-4 rounded-2xl flex flex-col items-start transition-all relative \${server === 'server1' ? 'bg-[#1a1825] border border-[#8b5cf6]/50' : 'bg-[#121212] border border-white/5 hover:bg-[#1a1a1a]'}\`}
            >
              {server === 'server1' && <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#ec4899] text-[9px] font-bold rounded text-white tracking-wider">OPT</div>}
              <div className="flex items-center gap-1.5 mb-2">
                <div className={\`w-2 h-2 rounded-full \${server === 'server1' ? 'bg-green-500' : 'bg-gray-600'}\`}></div>
                <span className="text-xs font-bold text-[#888] tracking-wider uppercase">IN</span>
              </div>
              <div className="text-sm font-bold text-white tracking-wide">India</div>
            </div>

            <div 
              onClick={() => setServer('server2')}
              className={\`cursor-pointer p-4 rounded-2xl flex flex-col items-start transition-all relative \${server === 'server2' ? 'bg-[#1a1825] border border-[#8b5cf6]/50' : 'bg-[#121212] border border-white/5 hover:bg-[#1a1a1a]'}\`}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className={\`w-2 h-2 rounded-full \${server === 'server2' ? 'bg-green-500' : 'bg-gray-600'}\`}></div>
                <span className="text-xs font-bold text-[#888] tracking-wider uppercase">UAE</span>
              </div>
              <div className="text-sm font-bold text-white tracking-wide">Gulf</div>
            </div>

            <div 
              onClick={() => setServer('server3')}
              className={\`cursor-pointer p-4 rounded-2xl flex flex-col items-start transition-all relative \${server === 'server3' ? 'bg-[#1a1825] border border-[#8b5cf6]/50' : 'bg-[#121212] border border-white/5 hover:bg-[#1a1a1a]'}\`}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className={\`w-2 h-2 rounded-full \${server === 'server3' ? 'bg-green-500' : 'bg-gray-600'}\`}></div>
                <span className="text-xs font-bold text-[#888] tracking-wider uppercase">EU</span>
              </div>
              <div className="text-sm font-bold text-white tracking-wide">Europe</div>
            </div>
          </div>
        </form>
      </section>

      {/* Error Fallback */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center mb-8 mx-auto max-w-[420px] text-sm md:text-base">
          {error}
        </div>
      )}

      {/* Placeholder / Empty State */}
      {!result && !isLoading && !error && (
        <div className="hidden"></div>
      )}

      `;

homeCode = homeCode.substring(0, startIndex) + replacement + homeCode.substring(endIndex);
fs.writeFileSync('src/pages/Home.tsx', homeCode);
console.log("Home UI fixed");
