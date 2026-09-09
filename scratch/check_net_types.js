const fs = require('fs');
const s = fs.readFileSync('index.html', 'utf8');
const regex = /data\.type\s*===\s*['"]([^'"]+)['"]/g;
let match;
const types = [];
while ((match = regex.exec(s)) !== null) {
  types.push(match[1]);
}
console.log('Handled message types:', types);
