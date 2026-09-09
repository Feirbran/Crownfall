const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const fns = ['leaveMatch', 'cleanupNetwork', 'resetMatch', 'surrender', 'endGame'];
fns.forEach(fn => {
  const idx = s.indexOf(fn);
  console.log(fn, idx !== -1 ? 'found at ' + idx : 'not found');
});
