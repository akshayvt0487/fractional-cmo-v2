const urls = [
  'http://localhost:3000/services/digital-marketing/bricklayers',
  'http://localhost:3000/services/lead-generation/bricklayers'
];

(async () => {
  for (const url of urls) {
    try {
      console.log('\n=== ' + url + ' ===');
      const res = await fetch(url);
      const text = await res.text();
      const lines = text.split('\n').filter(l => /<title>|<meta\s+(property|name)|og:/.test(l));
      if (lines.length === 0) {
        console.log('No matching head lines found.');
      } else {
        lines.forEach(l => console.log(l.trim()));
      }
    } catch (err) {
      console.error('Error fetching', url, err.message || err);
    }
  }
})();
