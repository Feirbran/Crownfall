const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('has hcp-footer in HTML?', html.includes('hcp-footer'));
console.log('has hcp-set-badge in HTML?', html.includes('id="hcp-set-badge"'));
console.log('has filter-set-beta in HTML?', html.includes('id="filter-set-beta"'));
console.log('has setSetFilter in JS?', html.includes('function setSetFilter'));
console.log('has hcp-cost-wrap in JS?', html.includes('hcp-cost-wrap'));
console.log('has hand card set in JS?', html.includes("c.set || 'α'"));
