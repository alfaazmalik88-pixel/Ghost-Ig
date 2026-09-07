import youtubedl from 'youtube-dl-exec';

youtubedl('https://www.youtube.com/watch?v=aqz-KE-bpKQ', {
  dumpJson: true,
  noWarnings: true,
  noCallHome: true,
  noCheckCertificate: true,
  preferFreeFormats: true,
  youtubeSkipDashManifest: true,
  referer: 'https://www.youtube.com/'
}).then(output => {
  console.log('Success:', Object.keys(output));
}).catch(err => {
  console.error('Error:', err);
});
