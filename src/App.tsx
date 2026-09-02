import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [region, setRegion] = useState('India');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const sanitizeUsername = (raw: string) => {
    let clean = raw.trim();
    clean = clean.split('?')[0];
    if (clean.includes('/')) {
      const parts = clean.split('/').filter(Boolean);
      clean = parts[parts.length - 1] || '';
    }
    clean = clean.replace(/[@\\\/]/g, '').trim();
    return clean;
  };

  const handleFetch = async () => {
    const user = sanitizeUsername(input);
    if (!user) {
      setError('Kripya valid username enter karein');
      return;
    }

    setLoading(true);
    setError(null);
    setProfile(null);

    const igTarget = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(user)}`;
    const endpoints = [
      `https://api.allorigins.win/get?url=${encodeURIComponent(igTarget)}`,
      `https://corsproxy.io/?url=${encodeURIComponent(igTarget)}`,
      `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(igTarget)}`
    ];

    let foundData: any = null;

    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          headers: {
            'x-ig-app-id': '936619743392459',
            'Accept-Language': 'en-US,en;q=0.9'
          }
        });

        if (!res.ok) continue;

        const text = await res.text();
        if (!text || text.trim().length === 0) continue;

        let parsed: any;
        try {
          parsed = JSON.parse(text);
          if (parsed.contents) {
            if (typeof parsed.contents === 'string') {
              if (parsed.contents.trim().startsWith('<')) continue;
              parsed = JSON.parse(parsed.contents);
            } else {
              parsed = parsed.contents;
            }
          }
        } catch {
          continue;
        }

        const userData = parsed?.data?.user;
        if (userData) {
          foundData = userData;
          break;
        }
      } catch {
        continue;
      }
    }

    setLoading(false);

    if (foundData) {
      setProfile(foundData);
    } else {
      setError('Profile load nahi ho saki ya Instagram ne block kiya hai. Thodi der baad try karein.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#070709',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px',
      boxSizing: 'border-box'
    }}>
      
      {/* Top Header */}
      <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: '12px'
          }}>IG</div>
          <span style={{ fontWeight: '800', fontSize: '18px', letterSpacing: '-0.5px' }}>
            GHOST<span style={{ color: '#ec4899' }}>IG</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#71717a' }}>
          <span style={{ cursor: 'pointer' }}>About</span>
          <span style={{ cursor: 'pointer' }}>Legal</span>
        </div>
      </div>

      {/* Center Body */}
      <div style={{ width: '100%', maxWidth: '420px', margin: '30px auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', lineHeight: '1.2', margin: '0 0 10px 0' }}>
          Instant Story & Post<br />
          <span style={{
            background: 'linear-gradient(90deg, #f59e0b, #ec4899, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Extraction</span>
        </h1>
        <p style={{ color: '#82828e', fontSize: '13px', lineHeight: '1.5', margin: '0 auto 24px auto', maxWidth: '320px' }}>
          Anonymously view and download high-resolution stories and posts without any login required.
        </p>

        {/* Input Card */}
        <div style={{
          backgroundColor: '#121217',
          border: '1px solid #23232a',
          borderRadius: '20px',
          padding: '14px',
          boxSizing: 'border-box'
        }}>
          <input
            type="text"
            placeholder="Username ya profile link"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#18181f',
              border: '1px solid #2e2e38',
              borderRadius: '12px',
              padding: '14px 16px',
              color: '#ffffff',
              fontSize: '14px',
              marginBottom: '12px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          <button
            onClick={handleFetch}
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '700',
              fontSize: '15px',
              background: 'linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6)',
              color: '#ffffff',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {loading ? 'FETCHING...' : 'FETCH →'}
          </button>
        </div>

        {/* Region Selector Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '16px' }}>
          {[
            { id: 'India', flag: 'IN', label: 'India', opt: true },
            { id: 'Gulf', flag: 'UAE', label: 'Gulf', opt: false },
            { id: 'Europe', flag: 'EU', label: 'Europe', opt: false }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setRegion(item.id)}
              style={{
                position: 'relative',
                backgroundColor: region === item.id ? '#1e1b4b' : '#121217',
                border: region === item.id ? '1px solid #6366f1' : '1px solid #23232a',
                borderRadius: '14px',
                padding: '12px',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              {item.opt && (
                <span style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: '#ec4899',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: '800',
                  padding: '2px 5px',
                  borderRadius: '4px'
                }}>OPT</span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#71717a', marginBottom: '4px' }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: region === item.id ? '#22c55e' : '#52525b'
                }}></span>
                {item.flag}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Error Box */}
        {error && (
          <div style={{
            marginTop: '16px',
            backgroundColor: '#270a0a',
            border: '1px solid #7f1d1d',
            borderRadius: '14px',
            padding: '12px 14px',
            color: '#f87171',
            fontSize: '13px',
            textAlign: 'left'
          }}>
            {error}
          </div>
        )}

        {/* Profile Card Output */}
        {profile && (
          <div style={{
            marginTop: '20px',
            backgroundColor: '#121217',
            border: '1px solid #23232a',
            borderRadius: '18px',
            padding: '16px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              {profile.profile_pic_url_hd && (
                <img
                  src={`https://images.weserv.nl/?url=${encodeURIComponent(profile.profile_pic_url_hd)}`}
                  alt=""
                  style={{ width: '54px', height: '54px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ec4899' }}
                />
              )}
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700' }}>{profile.full_name || profile.username}</h3>
                <p style={{ margin: '2px 0 0 0', color: '#82828e', fontSize: '12px' }}>@{profile.username}</p>
              </div>
            </div>

            {profile.biography && (
              <p style={{ fontSize: '13px', color: '#d4d4d8', lineHeight: '1.4', margin: '8px 0' }}>
                {profile.biography}
              </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #23232a', fontSize: '12px' }}>
              <span><b>{profile.edge_followed_by?.count?.toLocaleString() || 0}</b> <span style={{ color: '#71717a' }}>Followers</span></span>
              <span><b>{profile.edge_follow?.count?.toLocaleString() || 0}</b> <span style={{ color: '#71717a' }}>Following</span></span>
              <span><b>{profile.edge_owner_to_timeline_media?.count?.toLocaleString() || 0}</b> <span style={{ color: '#71717a' }}>Posts</span></span>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', fontSize: '11px', color: '#52525b', padding: '12px 0' }}>
        GhostIG — Anonymous & Secure Viewer
      </div>

    </div>
  );
}
