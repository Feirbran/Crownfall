const fs = require('fs');

const alpha = fs.readFileSync('cards_alpha.js', 'utf8');
const beta = fs.readFileSync('cards_beta.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');

// Evaluate in local context
eval(alpha);
eval(beta);

const setupCode = html.substring(
  html.indexOf('const COMMANDERS_POOL = {'),
  html.indexOf('// Helper per renderizzare pips')
);

eval(setupCode.replace(/\bconst\s+/g, 'var '));

console.log('Segugio Randagio:');
console.log(CARDS_DB['Segugio Randagio'].desc);

console.log('\nGhoul Dissotterrato:');
console.log(CARDS_DB['Ghoul Dissotterrato'].desc);

console.log('\nPicchiere Mercenario:');
console.log(CARDS_DB['Picchiere Mercenario'].desc);

console.log('\nSentinella delle Mura:');
console.log(CARDS_DB['Sentinella delle Mura'].desc);

console.log('\nDuellante di Rovina:');
console.log(CARDS_DB['Duellante di Rovina'].desc);

console.log('\nFante con Scudo a Torre:');
console.log(CARDS_DB['Fante con Scudo a Torre'].desc);

console.log('\nTitano di Basalto:');
console.log(CARDS_DB['Titano di Basalto'].desc);

console.log('\nJuggernaut di Rifiuti:');
console.log(CARDS_DB['Juggernaut di Rifiuti'].desc);

console.log('\nValeria:');
console.log(COMMANDERS['valeria'].desc);
