const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');

const terms = ['executeAI', 'aiTurn', 'handleAI', 'aiMove', 'aiAction', 'bot', 'IA Avversaria', 'startTurnFor'];
terms.forEach(t => {
  let count = 0;
  let idx = 0;
  while ((idx = s.indexOf(t, idx)) !== -1) {
    count++;
    if (count === 1) {
      console.log('First occurrence of ' + t + ' at ' + idx + ':');
      console.log(s.substring(idx - 50, idx + 250));
    }
    idx += t.length;
  }
  console.log(t + ' total count:', count);
});
