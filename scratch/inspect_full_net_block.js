const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

const startIdx = s.indexOf('TURN_ICE_SERVERS =');
const endIdx = s.indexOf('function startBattleP2P');

console.log('Start:', startIdx, 'End:', endIdx);
console.log(s.substring(startIdx - 50, endIdx));
