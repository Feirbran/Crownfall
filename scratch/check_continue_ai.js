const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

const idx = s.indexOf('function continueAIActions');
console.log(s.substring(idx, idx + 3500));
