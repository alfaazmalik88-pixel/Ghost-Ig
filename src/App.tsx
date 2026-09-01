import React, { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

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
    setData(null);

    try {
      const res = await fetch(`/api/fetch?username=${user}`);
      const text = await res.text();

      // Check for HTML response crash
      if (text.trim().startsWith('<') || text.includes('<!DOCTYPE html>')) {
        throw new Error('Server se invalid HTML response mila. Rate limited.');
      }

      const json = JSON.parse(text);

      if (!res.ok) {
        throw new Error(json.error || 'Fetch karne me dikkat aayi');
      }

      setData(json.data?.user || json);
    } catch (err: any) {
      setError(err.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0c', color: '#fff', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>GHOST IG</h1>
        <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>Instant Story & Post Extraction</p>

        <div style={{ background: '#16161a', padding: '16px', borderRadius: '16px', border: '1px solid #26262b' }}>
          <input
            type="text"
            placeholder="Enter username or profile link"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #333',
              background: '#0e0e11',
              color: '#fff',
              marginBottom: '12px',
              boxSizing: 'border-box'
            }}
          />

          <button
            onClick={handleFetch}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6)',
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'FETCHING...' : 'FETCH'}
          </button>
        </div>

        {error && (
          <div style={{ marginTop: '16px', padding: '12px', background: '#2d0606', border: '1px solid #7f1d1d', borderRadius: '10px', color: '#f87171', fontSize: '13px' }}>
            {error}
          </div>
        )}

        {data && (
          <div style={{ marginTop: '20px', background: '#16161a', padding: '16px', borderRadius: '16px', textAlign: 'left', border: '1px solid #26262b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              {data.profile_pic_url_hd && (
                <img src={data.profile_pic_url_hd} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              )}
              <div>
                <h3 style={{ margin: 0, fontSize: '16px' }}>{data.full_name || data.username}</h3>
                <p style={{ margin: 0, color: '#888', fontSize: '12px' }}>@{data.username}</p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#ccc' }}>{data.biography}</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '12px', fontSize: '13px' }}>
              <span><b>{data.edge_followed_by?.count || 0}</b> Followers</span>
              <span><b>{data.edge_follow?.count || 0}</b> Following</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
