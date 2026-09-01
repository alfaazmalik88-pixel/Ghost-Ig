import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [region, setRegion] = useState('India');
  const [activeTab, setActiveTab] = useState<'profile' | 'stories' | 'posts'>('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const cleanUsername = (str: string) => {
    let u = str.trim();
    if (u.includes('instagram.com/')) {
      u = u.split('instagram.com/')[1];
    }
    return u.split('?')[0].replace(/\/$/, '').replace('@', '');
  };

  const handleFetch = async () => {
    const user = cleanUsername(input);
    if (!user) {
      setError('Kripya Instagram username enter karein');
      return;
    }

    setLoading(true);
    setError(null);
    setProfile(null);

    try {
      const igEndpoint = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(user)}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(igEndpoint)}`;

      const res = await fetch(proxyUrl);
      if (!res.ok) throw new Error('Proxy server se connect nahi ho paya.');

      const responseJson = await res.json();
      const rawText = responseJson.contents;

      if (!rawText || rawText.trim().startsWith('<') || !rawText.includes('data')) {
        throw new Error('Instagram ne request restrict ki hai ya account private hai.');
      }

      const parsedData = JSON.parse(rawText);
      const userData = parsedData.data?.user;

      if (!userData) {
        throw new Error('Profile nahi mili.');
      }

      setProfile(userData);
    } catch (err: any) {
      setError(err.message || 'Kuch dikkat aayi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', color: '#fff', padding: '24px 16px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>IG</div>
            <span style={{ fontWeight: '800', fontSize: '18px', letterSpacing: '0.5px' }}>GHOST<span style={{ color: '#ec4899' }}>IG</span></span>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#71717a' }}>
            <span style={{ cursor: 'pointer' }}>About</span>
            <span style={{ cursor: 'pointer' }}>Legal</span>
          </div>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px', lineHeight: '1.2' }}>Instant Story & Post Extraction</h1>
        <p style={{ color: '#a1a1aa', fontSize: '13px', lineHeight: '1.5', marginBottom: '28px' }}>Anonymously view and download high-resolution stories and posts without any login required.</p>

        {/* Search Card */}
        <div style={{ background: '#121217', padding: '16px', borderRadius: '20px', border: '1px solid #27272a' }}>
          <input
            type="text"
            placeholder="Username or profile link"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '1px solid #27272a',
              background: '#18181b',
              color: '#fff',
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
              fontSize: '14px',
              background: 'linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6)',
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 20px rgba(236, 72, 153, 0.25)'
            }}
          >
            {loading ? 'EXTRACTING...' : 'FETCH'}
          </button>
        </div>

        {/* Region Selector Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '16px' }}>
          {[
            { id: 'India', flag: 'IN', tag: 'OPT' },
            { id: 'Gulf', flag: 'UAE' },
            { id: 'Europe', flag: 'EU' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setRegion(item.id)}
              style={{
                position: 'relative',
                background: region === item.id ? '#1e1b4b' : '#121217',
                border: region === item.id ? '1px solid #6366f1' : '1px solid #27272a',
                padding: '12px 10px',
                borderRadius: '14px',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              {item.tag && (
                <span style={{ position: 'absolute', top: '8px', right: '8px', background: '#ec4899', color: '#fff', fontSize: '9px', fontWeight: 'bold', padding: '2px 5px', borderRadius: '4px' }}>
                  {item.tag}
                </span>
              )}
              <div style={{ fontSize: '11px', color: '#71717a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: region === item.id ? '#22c55e' : '#52525b' }}></span>
                {item.flag}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>{item.id}</div>
            </div>
          ))}
        </div>

        {/* Error Card */}
        {error && (
          <div style={{ marginTop: '20px', padding: '14px', background: '#270a0a', border: '1px solid #7f1d1d', borderRadius: '14px', color: '#f87171', fontSize: '13px', textAlign: 'left' }}>
            {error}
          </div>
        )}

        {/* Result Card */}
        {profile && (
          <div style={{ marginTop: '24px', background: '#121217', padding: '20px', borderRadius: '20px', textAlign: 'left', border: '1px solid #27272a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              {profile.profile_pic_url_hd && (
                <img
                  src={`https://images.weserv.nl/?url=${encodeURIComponent(profile.profile_pic_url_hd)}`}
                  alt="Avatar"
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ec4899' }}
                />
              )}
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{profile.full_name || profile.username}</h3>
                <p style={{ margin: '2px 0 0 0', color: '#a1a1aa', fontSize: '13px' }}>@{profile.username}</p>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#d4d4d8', lineHeight: '1.4', margin: '10px 0' }}>
              {profile.biography || 'No bio provided'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid #27272a', borderBottom: '1px solid #27272a', fontSize: '13px' }}>
              <span><b>{profile.edge_followed_by?.count?.toLocaleString() || 0}</b> <span style={{ color: '#71717a' }}>Followers</span></span>
              <span><b>{profile.edge_follow?.count?.toLocaleString() || 0}</b> <span style={{ color: '#71717a' }}>Following</span></span>
              <span><b>{profile.edge_owner_to_timeline_media?.count?.toLocaleString() || 0}</b> <span style={{ color: '#71717a' }}>Posts</span></span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
