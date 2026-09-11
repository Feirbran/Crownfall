const fs = require('fs');

const s = fs.readFileSync('index.html', 'utf8');
const poolStart = s.indexOf('const COMMANDERS_POOL = {');
const poolEnd = s.indexOf('const COMMANDER_SET_MAPPING = {');
const poolStr = s.substring(poolStart, poolEnd);

const matches = [...poolStr.matchAll(/"([^"]+)":\s*\{/g)].map(m => m[1]);
console.log('Commanders in COMMANDERS_POOL:', matches);
