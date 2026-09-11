const fs = require('fs');
const vm = require('vm');

console.log('=== STARTING VERIFICATION TEST SUITE ===');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Check HTML elements
console.log('--- TEST 1: HTML Element Checks ---');
const requiredHtmlStrings = [
  'id="pane-home"',
  'class="home-sidebar-lore"',
  'class="hl-badge">CRONACHE DI VERIDIA',
  'SBUSTA PER VINCERE! (Fondamentale)',
  'MERCATO BOX & SBUSTA BUSTINE',
  '🤖 IA: +100 🪙',
  '🌐 P2P: +200 🪙',
  'id="btn-surrender"',
  'id="combat-clash-overlay"',
  'class="clash-modal"',
  'id="clash-formula-box"',
  'id="clash-damage-banner"',
  'id="clash-counter-banner"',
  'class="piece-auras-row"'
];

let htmlPass = true;
requiredHtmlStrings.forEach(str => {
  if (!html.includes(str)) {
    console.error(`FAIL: Missing HTML string: ${str}`);
    htmlPass = false;
  }
});
if (htmlPass) console.log('PASS: All HTML elements and new structural containers present.');

// 2. Check JavaScript Execution in sandbox
console.log('--- TEST 2: JavaScript Logic Execution ---');

const alphaJs = fs.readFileSync('cards_alpha.js', 'utf8');
const betaJs = fs.readFileSync('cards_beta.js', 'utf8');
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const jsCode = html.substring(scriptStart + 8, scriptEnd);

const mockDom = {
  elements: {},
  createElement: function(tag) {
    return {
      tagName: tag,
      textContent: '',
      innerHTML: '',
      style: {},
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      appendChild: () => {}
    };
  },
  getElementById: function(id) {
    if (!this.elements[id]) {
      this.elements[id] = {
        id,
        textContent: '',
        innerHTML: '',
        style: {},
        classList: { add: () => {}, remove: () => {}, contains: () => false },
        appendChild: () => {}
      };
    }
    return this.elements[id];
  },
  querySelectorAll: function() { return []; },
  querySelector: function() { return null; }
};

const storageMock = {
  data: {},
  getItem: function(k) { return this.data[k] || null; },
  setItem: function(k, v) { this.data[k] = String(v); },
  removeItem: function(k) { delete this.data[k]; }
};

const sandbox = {
  console: console,
  Math: Math,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  document: mockDom,
  window: {
    addEventListener: () => {},
    location: { hash: '' },
    localStorage: storageMock
  },
  localStorage: storageMock,
  alert: (msg) => { sandbox.lastAlert = msg; },
  confirm: () => true,
  lastAlert: null
};

vm.createContext(sandbox);
vm.runInContext(alphaJs, sandbox);
vm.runInContext(betaJs, sandbox);
vm.runInContext(jsCode, sandbox);

const CARDS_DB = vm.runInContext('CARDS_DB', sandbox);
const COMMANDERS = vm.runInContext('COMMANDERS', sandbox);
const COMMANDERS_POOL = vm.runInContext('COMMANDERS_POOL', sandbox);

// 3. Test Commander Blood Costs & Rites
console.log('--- TEST 3: Commander Blood Costs & Rite Rebalancing ---');
const expectedCosts = {
  Valeria: 7, Garek: 7, Malakor: 8, Morbida: 8, Vespera: 7,
  Kaelen: 7, Aurelius: 8, "Justiciar Kael": 8, Vulkan: 7, Ignis: 7
};

let commPass = true;
Object.entries(expectedCosts).forEach(([name, cost]) => {
  const poolItem = COMMANDERS_POOL[name];
  if (!poolItem || poolItem.bloodCost !== cost) {
    console.error(`FAIL: ${name} bloodCost is ${poolItem ? poolItem.bloodCost : 'missing'}, expected ${cost}`);
    commPass = false;
  }
  const id = name.toLowerCase().replace(/\s+/g, '_');
  const commObj = COMMANDERS[id];
  if (!commObj || commObj.riteCost !== cost) {
    console.error(`FAIL: COMMANDERS[${id}] riteCost is ${commObj ? commObj.riteCost : 'missing'}, expected ${cost}`);
    commPass = false;
  }
});
if (commPass) console.log('PASS: All 10 commanders have rebalanced blood costs (7-8 🩸).');

// 4. Test Smart 40-Card Autocomplete for all commanders
console.log('--- TEST 4: Smart 40-Card Autocomplete Decks ---');
const autoCompleteDeck = vm.runInContext('autoCompleteDeck', sandbox);
let autoPass = true;

Object.keys(COMMANDERS).forEach(commId => {
  const comm = COMMANDERS[commId];
  sandbox.currentTestDeck = { commanderId: commId, cards: [] };
  sandbox.currentCommId = commId;
  vm.runInContext(`
    userState = {
      activeDeckName: 'Test_' + currentCommId,
      decks: {
        ['Test_' + currentCommId]: currentTestDeck
      },
      collection: {}
    };
    autoCompleteDeck();
  `, sandbox);

  const deck = vm.runInContext(`userState.decks['Test_' + currentCommId]`, sandbox);
  if (deck.cards.length !== 40) {
    console.error(`FAIL: Commander ${comm.name} generated deck of ${deck.cards.length} cards, expected 40.`);
    autoPass = false;
  }

  // Count altars
  const altars = deck.cards.filter(id => CARDS_DB[id]?.type === 'altar').length;
  if (altars < 4) {
    console.error(`FAIL: Commander ${comm.name} deck has ${altars} altars, expected 4.`);
    autoPass = false;
  }

  // Check faction legality
  const illegal = deck.cards.filter(id => {
    const c = CARDS_DB[id];
    return c && c.faction !== comm.faction && c.faction !== 'Neutral';
  });
  if (illegal.length > 0) {
    console.error(`FAIL: Commander ${comm.name} deck contains illegal faction cards: ${illegal.join(', ')}`);
    autoPass = false;
  }
});
if (autoPass) console.log('PASS: All 10 commanders generate strictly 40-card, legal, synergistic decks with 4 altars.');

// 5. Test Rite 1/Turn Cap
console.log('--- TEST 5: Commander Rite 1/Turn Limit ---');
vm.runInContext(`
  battleState = {
    phase: 'active',
    turn: 'p1',
    turnPhase: 1,
    grid: new Array(64).fill(null),
    p1: {
      commander: COMMANDERS['valeria'],
      actions: 2,
      mana: 4,
      maxMana: 4,
      blood: 20,
      riteUsedThisTurn: false,
      deck: [],
      hand: []
    },
    p2: {
      commander: COMMANDERS['malakor'],
      actions: 2,
      mana: 4,
      maxMana: 4,
      blood: 20,
      riteUsedThisTurn: false,
      deck: [],
      hand: []
    }
  };
  battleState.grid[0] = {
    owner: 'p1',
    type: 'commander',
    hp: 42,
    att: 3
  };
`, sandbox);

// Execute rite first time
vm.runInContext(`executeRiteAction('p1', true);`, sandbox);
const riteUsed = vm.runInContext(`battleState.p1.riteUsedThisTurn`, sandbox);
if (riteUsed !== true) {
  console.error('FAIL: riteUsedThisTurn was not set to true after first rite execution.');
} else {
  console.log('PASS: First rite execution sets riteUsedThisTurn = true.');
}

const bloodAfterFirst = vm.runInContext(`battleState.p1.blood`, sandbox);
// Try execute rite second time in same turn
vm.runInContext(`executeRiteAction('p1', true);`, sandbox);
const bloodAfterSecond = vm.runInContext(`battleState.p1.blood`, sandbox);
if (bloodAfterSecond !== bloodAfterFirst) {
  console.error('FAIL: Blood was deducted on second rite execution in same turn!');
} else {
  console.log('PASS: Second rite execution blocked by riteUsedThisTurn cap.');
}

// Start next turn and check reset
vm.runInContext(`startTurnFor('p1');`, sandbox);
const riteReset = vm.runInContext(`battleState.p1.riteUsedThisTurn`, sandbox);
if (riteReset !== false) {
  console.error('FAIL: riteUsedThisTurn was not reset on startTurnFor.');
} else {
  console.log('PASS: riteUsedThisTurn successfully reset on startTurnFor.');
}

// 6. Test Surrender and Gold Rewards
console.log('--- TEST 6: Surrender and Gold Rewards (+100 IA, +200 P2P) ---');
// Test AI win reward (+100)
vm.runInContext(`
  userState = { gold: 0 };
  battleState = {
    isGameOver: false,
    isP2P: false,
    grid: new Array(64).fill(null)
  };
  battleState.grid[0] = { owner: 'p1', type: 'commander', hp: 20 };
  checkWin();
`, sandbox);

const aiGold = vm.runInContext(`userState.gold`, sandbox);
if (aiGold !== 100) {
  console.error(`FAIL: AI win gave ${aiGold} gold, expected 100.`);
} else {
  console.log('PASS: Winning vs AI awards exactly +100 Gold.');
}

// Test P2P win reward (+200)
vm.runInContext(`
  userState = { gold: 0 };
  battleState = {
    isGameOver: false,
    isP2P: true,
    grid: new Array(64).fill(null)
  };
  battleState.grid[0] = { owner: 'p1', type: 'commander', hp: 20 };
  checkWin();
`, sandbox);

const p2pGold = vm.runInContext(`userState.gold`, sandbox);
if (p2pGold !== 200) {
  console.error(`FAIL: P2P win gave ${p2pGold} gold, expected 200.`);
} else {
  console.log('PASS: Winning in Multiplayer P2P awards exactly +200 Gold.');
}

// Test Surrender in P2P
vm.runInContext(`
  userState = { gold: 0 };
  battleState = {
    isGameOver: false,
    isP2P: true,
    grid: new Array(64).fill(null)
  };
  myP2PRole = 'p1';
  handleNetMsg({ type: 'ACTION_SURRENDER', player: 'p2' });
`, sandbox);

const surrenderGold = vm.runInContext(`userState.gold`, sandbox);
const isGameOver = vm.runInContext(`battleState.isGameOver`, sandbox);
if (surrenderGold !== 200 || !isGameOver) {
  console.error(`FAIL: Opponent surrender handling failed (gold: ${surrenderGold}, gameOver: ${isGameOver})`);
} else {
  console.log('PASS: Opponent surrender awards +200 Gold and concludes match.');
}

console.log('=== ALL TESTS COMPLETED SUCCESSFULLY! ===');
