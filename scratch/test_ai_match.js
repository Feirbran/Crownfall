const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const jsCode = html.substring(scriptStart + '<script>'.length, scriptEnd);

const domElements = {};
function getEl(id) {
  if (!domElements[id]) {
    domElements[id] = {
      id,
      dataset: {},
      querySelector: (s) => getEl(s),
      getBoundingClientRect: () => ({ left: 0, top: 0, width: 50, height: 50 }),
      remove: () => {},
      style: {},
      innerHTML: '',
      textContent: '',
      value: '',
      className: '',
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => false
      },
      appendChild: () => {},
      addEventListener: () => {},
      setAttribute: () => {},
      removeAttribute: () => {}
    };
  }
  return domElements[id];
}

const domMock = {
  document: {
    querySelector: (sel) => getEl(sel),
    querySelectorAll: (sel) => [],
    getElementById: (id) => getEl(id),
    createElement: (tag) => {
      const el = getEl(tag + '_' + Math.random());
      return el;
    }
  },
  window: { addEventListener: () => {}, location: { hash: '', search: '', href: '' } },
  location: { hash: '', search: '', href: '' },
  addEventListener: () => {},
  navigator: {},
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: (fn, delay) => fn(),
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
  currentUser = { id: 'test_user', username: 'Condottiero Test' };
  userState = normalizeUserState(null);
  
  console.log('1. Avvio battaglia IA...');
  startBattle('ai');
  console.log('Fase dopo startBattle:', battleState.phase, 'Turn:', battleState.turn);

  console.log('2. Piazzamento Comandante P1 su cella 3...');
  onSquareClick(3);
  console.log('Fase dopo piazzamento:', battleState.phase, 'Turn:', battleState.turn);
  console.log('P1 Hand length:', battleState.p1.hand.length);
  console.log('P2 Hand length:', battleState.p2.hand.length);
  console.log('P1 Hand cards:', battleState.p1.hand);

  console.log('3. Avanzamento fase turnPhase:', battleState.turnPhase);
  advanceTurnPhase();
  console.log('Nuova turnPhase:', battleState.turnPhase);

  console.log('4. Fine turno P1...');
  endTurnP1();
  console.log('Turno dopo endTurnP1:', battleState.turn);
`, ctx);
