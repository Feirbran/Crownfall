// Master Verification Test Suite for Crownfall Card Effects & Mechanics
const fs = require('fs');
const vm = require('vm');

console.log('--- STARTING COMPREHENSIVE CARD MECHANICS VERIFICATION ---');

// 1. Verify byte-for-byte parity
const indexBuf = fs.readFileSync('index.html');
const crownfallBuf = fs.readFileSync('crownfall.html');
if (!indexBuf.equals(crownfallBuf)) {
  console.error('FATAL: index.html and crownfall.html are NOT identical!');
  process.exit(1);
}
console.log('✅ TEST 1: Parity check between index.html and crownfall.html PASSED (100% byte-for-byte identical).');

// 2. Extract and compile script from index.html
const html = indexBuf.toString('utf8');
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const jsCode = html.substring(scriptStart + '<script>'.length, scriptEnd);

console.log('Extracted JavaScript length:', jsCode.length, 'characters.');

// Setup a mock browser DOM environment
const domMock = {
  document: {
    querySelector: () => ({
      classList: {
        add: () => {},
        remove: () => {},
        contains: () => true
      },
      style: {},
      appendChild: () => {},
      innerHTML: ''
    }),
    querySelectorAll: () => [],
    getElementById: () => ({
      style: {},
      innerHTML: '',
      addEventListener: () => {},
      appendChild: () => {},
      classList: { add: () => {}, remove: () => {}, contains: () => true }
    }),
    createElement: () => ({
      classList: { add: () => {} },
      appendChild: () => {},
      innerHTML: '',
      style: {}
    })
  },
  window: { addEventListener: () => {}, location: { hash: '', search: '', href: '' } },
  location: { hash: '', search: '', href: '' },
  addEventListener: () => {},
  navigator: {},
  localStorage: { getItem: () => null, setItem: () => {} },
  setTimeout: (fn) => { fn(); },
  clearTimeout: () => {},
  console: console
};
domMock.window = domMock;
domMock.global = domMock;

const context = vm.createContext(domMock);

// Run cards_alpha and cards_beta in context first
let codeA = fs.readFileSync('cards_alpha.js', 'utf8').replace('const CARDS_ALPHA =', 'var CARDS_ALPHA =');
let codeB = fs.readFileSync('cards_beta.js', 'utf8').replace('const CARDS_BETA =', 'var CARDS_BETA =');
vm.runInContext(codeA, context);
vm.runInContext(codeB, context);
console.log('Loaded CARDS_ALPHA and CARDS_BETA into VM context.');

// Run index.html script in context
vm.runInContext(jsCode, context);
console.log('Successfully loaded and evaluated index.html in VM context!');

// Helper to init a clean battle state in context
vm.runInContext(`
  function resetTestBattle() {
    battleState = {
      isP2P: false,
      myRole: 'p1',
      phase: 'active',
      turn: 'p1',
      round: 1,
      p1: {
        name: 'P1 Valeria',
        commander: { hp: 20, name: 'Valeria', glyph: '👑' },
        hp: 20,
        mana: 10,
        maxMana: 5,
        blood: 10,
        actions: 2,
        altarDeployedThisTurn: false,
        deck: ['Fante Corazzato', 'Rito di Comunione', 'Giuramento Ancestrale'],
        hand: [],
        graveyard: []
      },
      p2: {
        name: 'P2 Garek',
        commander: { hp: 20, name: 'Garek', glyph: '⚔️' },
        hp: 20,
        mana: 10,
        maxMana: 5,
        blood: 6,
        actions: 2,
        altarDeployedThisTurn: false,
        deck: ['Balestriere della Guardia'],
        hand: [],
        graveyard: []
      },
      grid: Array(64).fill(null),
      selectedSquare: null,
      selectedHandIndex: 0,
      nextTurnManaDrainP1: 0,
      nextTurnManaDrainP2: 0,
      turnPhase: 1,
      isGameOver: false
    };
    battleState.grid[27] = { owner: 'p1', type: 'commander', name: 'Valeria', hp: 20, att: 3, range: 1, move: 'orth' };
    battleState.grid[35] = { owner: 'p2', type: 'commander', name: 'Garek', hp: 20, att: 3, range: 1, move: 'orth' };
  }
`, context);

// 3. Test Spell Target Archetype Classifier
const archResults = vm.runInContext(`
  (() => {
    const tests = [
      { id: 'Barricata Improvvisata', exp: 'free_cell' },
      { id: 'Genio del Geniere', exp: 'ally_altar' },
      { id: 'Offerta Funebre', exp: 'sacrifice_ally' },
      { id: 'Marcia Forzata', exp: 'ally_unit' },
      { id: 'Frantumare la Pietra', exp: 'enemy_altar' },
      { id: 'Trazione Forzata', exp: 'enemy_unit' },
      { id: 'Rito di Comunione', exp: 'commander' },
      { id: 'Giuramento Ancestrale', exp: 'commander' },
      { id: 'Salasso Crudele', exp: 'enemy_any' }
    ];
    return tests.map(t => {
      const card = CARDS_DB[t.id];
      const actual = getSpellTargetArchetype(card);
      return { id: t.id, exp: t.exp, actual, pass: actual === t.exp };
    });
  })()
`, context);

console.log('✅ TEST 2: Spell Target Archetypes verification:');
archResults.forEach(r => {
  console.log(`   - ${r.id}: Archetype '${r.actual}' (Expected: '${r.exp}') -> ${r.pass ? 'PASS ✅' : 'FAIL ❌'}`);
  if (!r.pass) process.exit(1);
});

// 4. Test Spell Execution (Healing, Draw, Terrain, Removals)
const spellExecTests = vm.runInContext(`
  (() => {
    const results = [];
    resetTestBattle();

    // Rito di Comunione (HP < 10 -> 3 cards drawn)
    battleState.p1.hp = 8;
    battleState.p1.hand = ['Rito di Comunione'];
    battleState.selectedHandIndex = 0;
    executeSpellAction(27, 'Rito di Comunione', 'p1', false);
    results.push({ name: 'Rito di Comunione (Draw 3 when wounded)', pass: battleState.p1.hand.length === 3 });

    // Giuramento Ancestrale (draw 3 + heal 4)
    resetTestBattle();
    battleState.p1.hp = 10;
    battleState.p1.hand = ['Giuramento Ancestrale'];
    battleState.selectedHandIndex = 0;
    executeSpellAction(27, 'Giuramento Ancestrale', 'p1', false);
    results.push({ name: 'Giuramento Ancestrale (+4 HP, +3 Cards)', pass: battleState.p1.hp === 14 && battleState.p1.hand.length === 3 });

    // Barricata Improvvisata
    resetTestBattle();
    executeSpellAction(19, 'Barricata Improvvisata', 'p1', false);
    results.push({ name: 'Barricata Improvvisata (Muro 3 PV)', pass: battleState.grid[19] && battleState.grid[19].name === 'Muro di Detriti' && battleState.grid[19].hp === 3 });

    // Spaccatura Terrestre
    resetTestBattle();
    executeSpellAction(20, 'Spaccatura Terrestre', 'p1', false);
    results.push({ name: 'Spaccatura Terrestre (Voragine)', pass: battleState.grid[20] && battleState.grid[20].name === 'Voragine' && battleState.grid[20].isVoragine === true });

    // Frantumare la Pietra
    resetTestBattle();
    battleState.grid[28] = { owner: 'p2', type: 'altar', name: 'Altare del Sangue', hp: 8 };
    executeSpellAction(28, 'Frantumare la Pietra', 'p1', false);
    results.push({ name: 'Frantumare la Pietra (Destroy Altar)', pass: battleState.grid[28] === null });

    // Confisca Totale
    resetTestBattle();
    battleState.p1.hp = 12;
    battleState.p2.blood = 4;
    executeSpellAction(27, 'Confisca Totale', 'p1', false);
    results.push({ name: 'Confisca Totale (Drain 4 blood -> heal 8 PV)', pass: battleState.p2.blood === 0 && battleState.p1.hp === 20 });

    // Bastione Spezzato (Sacrifice wall -> 2 cards)
    resetTestBattle();
    battleState.grid[18] = { owner: 'p1', type: 'wall', name: 'Muro di Detriti', hp: 3 };
    executeSpellAction(18, 'Bastione Spezzato', 'p1', false);
    results.push({ name: 'Bastione Spezzato (Sacrifice wall -> draw 2)', pass: battleState.grid[18] === null && battleState.p1.hand.length === 2 });

    return results;
  })()
`, context);

console.log('✅ TEST 3: Spell Execution verification:');
spellExecTests.forEach(r => {
  console.log(`   - ${r.name}: ${r.pass ? 'PASS ✅' : 'FAIL ❌'}`);
  if (!r.pass) process.exit(1);
});

// 5. Test Combat Keywords (Armatura, Presidio, Flanking, Sfondamento, Scudo Totale)
const combatTests = vm.runInContext(`
  (() => {
    const results = [];
    
    // Test Armatura & Presidio:
    resetTestBattle();
    battleState.grid[10] = { owner: 'p1', type: 'unit', name: 'Alabardiere da Trincea', att: 2, hp: 4, range: 1, desc: 'Flanking: +2 danni con aggiramento.' };
    battleState.grid[11] = { owner: 'p1', type: 'unit', name: 'Fante Alleato', att: 1, hp: 4, range: 1, desc: '' };
    battleState.grid[18] = { owner: 'p2', type: 'unit', name: 'Sentinella del Bastione', att: 0, hp: 5, range: 1, desc: 'Presidio: contrattacca a 2 ATT. Armatura: -1 danno.' };
    // Attack 10 -> 18. Flanking (+2) -> Base 2 + 2 = 4 dmg. Armatura (-1) -> 3 dmg. Sentinella HP 5 - 3 = 2.
    // Sentinella Presidio counterattack -> 2 dmg to Alabardiere. Alabardiere HP 4 - 2 = 2.
    executeAttackAction(10, 18, 'p1', false);
    results.push({
      name: 'Flanking (+2) vs Armatura (-1) and Presidio (2 Counterattack)',
      pass: battleState.grid[18]?.hp === 2 && battleState.grid[10]?.hp === 2
    });

    // Test Sfondamento against Structure:
    resetTestBattle();
    battleState.grid[20] = { owner: 'p1', type: 'unit', name: 'Ariete da Breccia', att: 2, hp: 7, range: 1, desc: 'Sfondamento: 6 danni ad Altari e muri.' };
    battleState.grid[21] = { owner: 'p2', type: 'altar', name: 'Altare della Fortezza', att: 0, hp: 8, range: 0, desc: '' };
    executeAttackAction(20, 21, 'p1', false);
    results.push({
      name: 'Ariete da Breccia Sfondamento (6 dmg to altar)',
      pass: battleState.grid[21]?.hp === 2
    });

    // Test Scudo Totale:
    resetTestBattle();
    battleState.grid[30] = { owner: 'p1', type: 'unit', name: 'Attaccante 3 ATT', att: 3, hp: 4, range: 1, desc: '' };
    battleState.grid[31] = { owner: 'p2', type: 'unit', name: 'Difensore Protetto', att: 1, hp: 5, range: 1, hasTotalShield: true, desc: '' };
    executeAttackAction(30, 31, 'p1', false);
    results.push({
      name: 'Scudo Totale (100% damage absorption)',
      pass: battleState.grid[31]?.hp === 5 && battleState.grid[31]?.hasTotalShield === false
    });

    return results;
  })()
`, context);

console.log('✅ TEST 4: Combat Mechanics verification:');
combatTests.forEach(r => {
  console.log(`   - ${r.name}: ${r.pass ? 'PASS ✅' : 'FAIL ❌'}`);
  if (!r.pass) process.exit(1);
});

// 6. Test On-Death Triggers
const deathTests = vm.runInContext(`
  (() => {
    const results = [];

    // Guscio Esplosivo explosion
    resetTestBattle();
    battleState.grid[30] = { owner: 'p2', type: 'unit', name: 'Guscio Esplosivo', att: 1, hp: 2, desc: 'Detonazione: alla morte infligge 2 danni a tutte le 4 caselle ortogonali adiacenti.' };
    battleState.grid[22] = { owner: 'p1', type: 'unit', name: 'Fante Nord', att: 1, hp: 4, desc: '' }; // orthogonal north (22)
    battleState.grid[31] = { owner: 'p1', type: 'unit', name: 'Fante Est', att: 1, hp: 2, desc: '' };  // orthogonal east (31)
    handlePieceDefeated(30, 'p1');
    results.push({
      name: 'Guscio Esplosivo Death Explosion (2 dmg orthogonal)',
      pass: battleState.grid[22]?.hp === 2 && battleState.grid[31] === null
    });

    // Monaco Mendicante card draw
    resetTestBattle();
    battleState.grid[40] = { owner: 'p1', type: 'unit', name: 'Monaco Mendicante', att: 0, hp: 1, desc: 'Elemosina: fa pescare 1 carta al controllore quando viene distrutto.' };
    const hLen = battleState.p1.hand.length;
    handlePieceDefeated(40, 'p2');
    results.push({
      name: 'Monaco Mendicante On-Death Card Draw',
      pass: battleState.p1.hand.length === hLen + 1
    });

    // Rottame Semovente rubble spawn
    resetTestBattle();
    battleState.grid[50] = { owner: 'p1', type: 'unit', name: 'Rottame Semovente', att: 1, hp: 2, desc: 'Macerie: alla morte lascia un Blocco di Scorie (0 ATT / 2 PV) sulla casella.' };
    handlePieceDefeated(50, 'p2');
    results.push({
      name: 'Rottame Semovente Spawns Blocco di Scorie (0/2 PV)',
      pass: battleState.grid[50]?.name === 'Blocco di Scorie' && battleState.grid[50]?.hp === 2
    });

    // Ignis passive (+1 ATT when allied altar destroyed)
    resetTestBattle();
    battleState.grid[27] = { owner: 'p1', type: 'commander', name: 'Ignis', hp: 20, att: 3 };
    battleState.grid[19] = { owner: 'p1', type: 'altar', name: 'Altare del Fuoco', hp: 5 };
    handlePieceDefeated(19, 'p2');
    results.push({
      name: 'Ignis Commander Passive (+1 ATT on allied altar destruction)',
      pass: battleState.grid[27]?.att === 4
    });

    return results;
  })()
`, context);

console.log('✅ TEST 5: On-Death Triggers verification:');
deathTests.forEach(r => {
  console.log(`   - ${r.name}: ${r.pass ? 'PASS ✅' : 'FAIL ❌'}`);
  if (!r.pass) process.exit(1);
});

// 7. Test Turn Start and End Triggers
const turnTests = vm.runInContext(`
  (() => {
    const results = [];

    // Turn Start: Altare del Patto di Sangue (-1 HP commander) & Cuore della Griglia (+1 blood)
    resetTestBattle();
    battleState.grid[15] = { owner: 'p2', type: 'altar', name: 'Altare del Patto di Sangue', hp: 6, desc: 'Subisci 1 danno a inizio turno.' };
    battleState.grid[16] = { owner: 'p2', type: 'altar', name: 'Il Cuore della Griglia', hp: 6, desc: 'Genera +1 Sangue a inizio turno.' };
    const p2BloodBefore = battleState.p2.blood;
    const p2HpBefore = battleState.p2.hp;
    startTurnFor('p2');
    results.push({
      name: 'Turn Start: Altare del Patto di Sangue (-1 HP) and Cuore della Griglia (+1 Blood)',
      pass: battleState.p2.hp === p2HpBefore - 1 && battleState.p2.blood === p2BloodBefore + 1
    });

    // Turn End: Chierico del Crepuscolo heals adjacent commander
    resetTestBattle();
    battleState.p1.hp = 15;
    battleState.grid[27] = { owner: 'p1', type: 'commander', name: 'Valeria', hp: 15 };
    battleState.grid[28] = { owner: 'p1', type: 'unit', name: 'Chierico del Crepuscolo', cardId: 'cleric', hp: 3 };
    handleTurnEndFor('p1');
    results.push({
      name: 'Turn End: Chierico del Crepuscolo heals adjacent commander (+2 PV)',
      pass: battleState.grid[27]?.hp === 17
    });

    return results;
  })()
`, context);

console.log('✅ TEST 6: Turn Hooks verification:');
turnTests.forEach(r => {
  console.log(`   - ${r.name}: ${r.pass ? 'PASS ✅' : 'FAIL ❌'}`);
  if (!r.pass) process.exit(1);
});

console.log('\n======================================================');
console.log('🎉 ALL TESTS PASSED WITH 100% SUCCESS ACROSS ALL MODULES!');
console.log('======================================================');
