const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8').replace(/\r?\n/g, '\n');

const startStr = '// --- 5. NETWORKING MULTIPLAYER ROBUSTO (BROADCASTCHANNEL + WEBRTC PEERJS) ---';
const endStr = 'executeKaelenSwap(data.firstIdx, data.secondIdx, data.player, false);\n      } else if (data.type === \'SYNC_END_TURN\') {\n        startTurnFor(data.nextTurn);\n      }\n    }';

const sIdx = s.indexOf(startStr);
const eIdx = s.indexOf(endStr);
console.log('sIdx:', sIdx, 'eIdx:', eIdx);
if (sIdx !== -1 && eIdx !== -1) {
  const actualOld = s.substring(sIdx, eIdx + endStr.length);
  console.log('Length of actualOld:', actualOld.length);
  fs.writeFileSync('scratch/actual_old_net.txt', actualOld);
  console.log('Saved actual old net block to scratch/actual_old_net.txt');
}
