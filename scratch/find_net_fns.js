const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

const startIdx = s.indexOf('TURN_ICE_SERVERS =');
const nextFnIdx = s.indexOf('function onLobbyDeckChanged');
const segment = s.substring(startIdx, nextFnIdx);
const fnMatches = segment.match(/function\s+([a-zA-Z0-9_]+)/g);
console.log('Functions in this segment:', fnMatches);
