const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const jsCode = html.substring(scriptStart + '<script>'.length, scriptEnd);

const domMock = {
  document: {
    querySelector: () => ({ classList: { add: ()=>{}, remove: ()=>{}, contains: ()=>false }, style: {} }),
    querySelectorAll: () => [],
    getElementById: (id) => ({
      classList: { add: ()=>{}, remove: ()=>{}, contains: ()=>false },
      style: {},
      innerHTML: '',
      addEventListener: ()=>{},
      appendChild: ()=>{}
    }),
    createElement: () => ({ classList: { add: ()=>{} }, appendChild: ()=>{}, innerHTML: '', style: {} })
  },
  window: { addEventListener: () => {}, location: { hash: '', search: '', href: '' } },
  location: { hash: '', search: '', href: '' },
  addEventListener: () => {},
  navigator: {},
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: (fn) => fn(),
  clearTimeout: () => {},
  console: console
};
domMock.window = domMock;
domMock.global = domMock;

const ctx = vm.createContext(domMock);
let codeA = fs.readFileSync('cards_alpha.js', 'utf8').replace('const CARDS_ALPHA =', 'var CARDS_ALPHA =');
let codeB = fs.readFileSync('cards_beta.js', 'utf8').replace('const CARDS_BETA =', 'var CARDS_BETA =');
vm.runInContext(codeA, ctx);
vm.runInContext(codeB, ctx);
vm.runInContext(jsCode, ctx);

vm.runInContext(`
  battleState = {
    isP2P: false,
    myRole: 'p1',
    phase: 'active',
    turn: 'p1',
    round: 1,
    p1: {
      name: 'P1 Valeria',
      commander: { hp: 20, name: 'Valeria', glyph: '👑' },
      hp: 8,
      mana: 10,
      maxMana: 5,
      blood: 10,
      actions: 2,
      deck: ['Fante Corazzato', 'Rito di Comunione', 'Giuramento Ancestrale'],
      hand: ['Rito di Comunione'],
      graveyard: []
    },
    p2: { name: 'P2', hp: 20, deck: [], hand: [] },
    grid: Array(64).fill(null),
    selectedSquare: null,
    selectedHandIndex: 0
  };
  battleState.grid[27] = { owner: 'p1', type: 'commander', name: 'Valeria', hp: 8 };

  console.log('CARDS_DB Rito di Comunione:', CARDS_DB['Rito di Comunione']);
  const origAnimate = animateCardPlayed;
  animateCardPlayed = function(card, cb) {
    console.log('animateCardPlayed called for:', card ? card.name : null);
    try {
      cb();
    } catch(err) {
      console.error('ERROR IN ANIMATE CALLBACK:', err);
    }
  };
  executeSpellAction(27, 'Rito di Comunione', 'p1', false);
  console.log('After spell: deck length =', battleState.p1.deck.length, 'hand =', battleState.p1.hand);
`, ctx);
