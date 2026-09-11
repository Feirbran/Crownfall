const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const regex = /onclick=(["'])(.*?)\1/gs;
let match;
let count = 0;
while ((match = regex.exec(html)) !== null) {
  const code = match[2];
  try {
    new Function(code);
  } catch (e) {
    console.log('Syntax error in onclick:\n', code, '\n-->', e.message);
    count++;
  }
}

// Also check template literals with onclick
const tplRegex = /onclick=\\?["']([^"'\\]*?)\${([^}]+)}([^"'\\]*?)\\?["']/g;
console.log('Static onclick errors:', count);
