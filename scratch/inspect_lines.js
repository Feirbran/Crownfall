const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split(/\r?\n/);
console.log('Total lines:', lines.length);

for (let i = 5940; i <= 6120 && i < lines.length; i++) {
  console.log(`${i}: ${lines[i]}`);
}
