const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

// Check LEGACY_CARDS_MAP
const lIdx = s.indexOf('LEGACY_CARDS_MAP');
console.log(s.substring(lIdx, lIdx + 600));

// Check executeSpellAction
const eIdx = s.indexOf('function executeSpellAction');
console.log(s.substring(eIdx, eIdx + 2000));
