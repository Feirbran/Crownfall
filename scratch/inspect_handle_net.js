const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split(/\r?\n/);

for (let i = 6115; i <= 6185 && i < lines.length; i++) {
  console.log(`${i}: ${lines[i]}`);
}
