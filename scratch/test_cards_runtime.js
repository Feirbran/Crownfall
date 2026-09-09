const fs = require('fs');
const vm = require('vm');

const alphaCode = fs.readFileSync('cards_alpha.js', 'utf8');
const betaCode = fs.readFileSync('cards_beta.js', 'utf8');
const html = fs.readFileSync('crownfall.html', 'utf8');
const scriptCode = html.match(/<script>([\s\S]*?)<\/script>/)[1];

const testCode = `
console.log('Barriera di Risonanza in CARDS_DB:', CARDS_DB['Barriera di Risonanza']);
console.log('Cost Pips for Barriera di Risonanza:', getCardCostPipsHtml(CARDS_DB['Barriera di Risonanza']));
console.log('Monolito di Granito Nero (Beta):', CARDS_DB['Monolito di Granito Nero']);
console.log('Cost Pips for Monolito di Granito Nero:', getCardCostPipsHtml(CARDS_DB['Monolito di Granito Nero']));
console.log('Spirito Vagante desc:', CARDS_DB['Spirito Vagante'].desc);
console.log('Ghoul Dissotterrato desc:', CARDS_DB['Ghoul Dissotterrato'].desc);
console.log('Segugio Randagio desc:', CARDS_DB['Segugio Randagio'].desc);
console.log('Larvone Infetto desc:', CARDS_DB['Larvone Infetto'].desc);
console.log('Pattugliatore Stellare desc:', CARDS_DB['Pattugliatore Stellare'].desc);
console.log('Picchiere di Presidio desc:', CARDS_DB['Picchiere di Presidio'].desc);
console.log('Cavaliere Corazzato desc:', CARDS_DB['Cavaliere Corazzato'].desc);
console.log('Total Alpha cards in CARDS_DB:', Object.values(CARDS_DB).filter(c => c.set === 'α').length);
console.log('Total Beta cards in CARDS_DB:', Object.values(CARDS_DB).filter(c => c.set === 'β').length);
`;

const fullCode = alphaCode + '\n' + betaCode + '\n' + scriptCode + '\n' + testCode;

const sandbox = {
  window: { addEventListener: () => {}, location: { hash: '' } },
  document: {
    getElementById: () => ({ innerHTML: '', textContent: '', appendChild: () => {}, classList: { add: () => {}, remove: () => {} }, style: {} }),
    querySelectorAll: () => [],
    createElement: () => ({ style: {}, classList: { add: () => {}, remove: () => {} } }),
    addEventListener: () => {}
  },
  console: console,
  setTimeout: () => {},
  localStorage: { getItem: () => null, setItem: () => {} },
  Math: Math,
  navigator: {}
};
vm.createContext(sandbox);
vm.runInContext(fullCode, sandbox);
