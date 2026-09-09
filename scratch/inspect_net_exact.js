const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

const startIdx = s.indexOf('function copyHostRoomCode');
const endIdx = s.indexOf('function startBattleP2P');

console.log(s.substring(startIdx, endIdx));
