const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Check script blocks
let idx = 0;
while (true) {
  const s = html.indexOf('<script>', idx);
  if (s === -1) break;
  const e = html.indexOf('</script>', s);
  if (e === -1) throw new Error('Unclosed script tag');
  const code = html.substring(s + 8, e);
  try {
    new Function(code);
  } catch (err) {
    console.error('Script syntax error:', err.message);
    process.exit(1);
  }
  idx = e + 9;
}
console.log('All script blocks are 100% syntactically valid!');

// Check ID uniqueness
const ids = {};
const idRegex = /id=["']([^"']+)["']/g;
let match;
while ((match = idRegex.exec(html)) !== null) {
  const id = match[1];
  ids[id] = (ids[id] || 0) + 1;
}
const duplicates = Object.entries(ids).filter(([id, count]) => count > 1);
console.log('Duplicate IDs (if any):', duplicates);
