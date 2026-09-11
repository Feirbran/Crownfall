// Automated Test Suite for Crownfall Rules Engine
const fs = require('fs');

let codeA = fs.readFileSync('cards_alpha.js', 'utf8').replace('const CARDS_ALPHA =', 'global.CARDS_ALPHA =');
let codeB = fs.readFileSync('cards_beta.js', 'utf8').replace('const CARDS_BETA =', 'global.CARDS_BETA =');
eval(codeA);
eval(codeB);
const CARDS_DB = Object.assign({}, global.CARDS_ALPHA, global.CARDS_BETA);

function createTestState() {
  return {
    phase: 'active',
    turn: 'p1',
    round: 1,
    p1: {
      name: 'P1',
      commander: { hp: 20, name: 'Valeria' },
      hp: 20,
      mana: 10,
      maxMana: 5,
      blood: 10,
      actions: 2,
      altarDeployedThisTurn: false,
      deck: ['Fante Corazzato', 'Marcia Forzata', 'Rito di Comunione', 'Giuramento Ancestrale'],
      hand: [],
      graveyard: []
    },
    p2: {
      name: 'P2',
      commander: { hp: 20, name: 'Garek' },
      hp: 20,
      mana: 10,
      maxMana: 5,
      blood: 5,
      actions: 2,
      altarDeployedThisTurn: false,
      deck: ['Balestriere della Guardia'],
      hand: [],
      graveyard: []
    },
    grid: Array(64).fill(null),
    turnPhase: 1,
    isGameOver: false,
    logs: []
  };
}

let battleState = createTestState();

function addLog(msg, type) {
  battleState.logs.push(`[${type}] ${msg}`);
}
function showToast() {}
function showCollisionPopup() {}
function recalculatePlayerMaxMana(p) {
  const altars = battleState.grid.filter(piece => piece && piece.owner === p && piece.type === 'altar').length;
  battleState[p].maxMana = 1 + altars;
}
function drawCard(pl) {
  if (battleState[pl].deck.length > 0 && battleState[pl].hand.length < 6) {
    const card = battleState[pl].deck.shift();
    battleState[pl].hand.push(card);
    addLog(`${pl} pesca ${card}`, pl);
  }
}
function getAdjs(idx) {
  const r = Math.floor(idx / 8), c = idx % 8;
  const res = [];
  [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
    const nr = r + dr, nc = c + dc;
    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
  });
  return res;
}
function getOrthAdjs(idx) {
  const r = Math.floor(idx / 8), c = idx % 8;
  const res = [];
  [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dr, dc]) => {
    const nr = r + dr, nc = c + dc;
    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
  });
  return res;
}
function getDiagAdjs(idx) {
  const r = Math.floor(idx / 8), c = idx % 8;
  const res = [];
  [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
    const nr = r + dr, nc = c + dc;
    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
  });
  return res;
}

// Death Handler Implementation
function handlePieceDefeated(idx, killerOwner) {
  const piece = battleState.grid[idx];
  if (!piece) return;

  battleState.grid[idx] = null;
  const pOwner = piece.owner;
  const oppOwner = (killerOwner === 'p1') ? 'p2' : 'p1';
  const name = piece.name || piece.cardId || '';
  const desc = piece.desc ? piece.desc.toLowerCase() : '';

  // 1. Death triggers
  if (name === 'Guscio Esplosivo' || desc.includes('detonazione: alla morte infligge 2 danni a tutte le 4 caselle ortogonali')) {
    getOrthAdjs(idx).forEach(adj => {
      const p = battleState.grid[adj];
      if (p) {
        p.hp -= 2;
        addLog(`Guscio Esplosivo esplode colpendo ${p.name} (-2 PV)`, 'sys');
        if (p.hp <= 0) handlePieceDefeated(adj, killerOwner);
      }
    });
  } else if (name === 'Guscio di Morbida' || desc.includes('detonazione diagonale')) {
    getDiagAdjs(idx).forEach(adj => {
      const p = battleState.grid[adj];
      if (p) {
        p.hp -= 2;
        addLog(`Guscio di Morbida esplode colpendo ${p.name} (-2 PV)`, 'sys');
        if (p.hp <= 0) handlePieceDefeated(adj, killerOwner);
      }
    });
  } else if (name === 'Scoppio di Caldaia' || desc.includes('alla distruzione di un automa, infligge 3 danni ad area')) {
    getAdjs(idx).forEach(adj => {
      const p = battleState.grid[adj];
      if (p) {
        p.hp -= 3;
        addLog(`Scoppio di Caldaia devasta l'area colpendo ${p.name} (-3 PV)`, 'sys');
        if (p.hp <= 0) handlePieceDefeated(adj, killerOwner);
      }
    });
  } else if (name === 'Kamikaze di Braci' || desc.includes('scoppio frontale')) {
    const dir = (pOwner === 'p1') ? 1 : -1;
    const fr = Math.floor(idx / 8) + dir, fc = idx % 8;
    if (fr >= 0 && fr < 8) {
      const frontIdx = fr * 8 + fc;
      const p = battleState.grid[frontIdx];
      if (p) {
        p.hp -= 3;
        addLog(`Kamikaze di Braci detona frontalmente su ${p.name} (-3 PV)`, 'sys');
        if (p.hp <= 0) handlePieceDefeated(frontIdx, killerOwner);
      }
    }
  }

  // Card draw on death
  if (name === 'Monaco Mendicante' || desc.includes('fa pescare 1 carta al controllore quando viene distrutto')) {
    drawCard(pOwner);
    addLog(`Monaco Mendicante concede l'Elemosina: ${pOwner.toUpperCase()} pesca 1 carta!`, 'sys');
  } else if (name === 'Monaco Eremita') {
    drawCard(pOwner); drawCard(pOwner);
    addLog(`Monaco Eremita: ${pOwner.toUpperCase()} pesca 2 carte!`, 'sys');
  }

  // Healing on death
  if (name === 'Chierico Errante') {
    battleState[pOwner].hp = Math.min(20, battleState[pOwner].hp + 3);
    const commIdx = battleState.grid.findIndex(p => p && p.owner === pOwner && p.type === 'commander');
    if (commIdx !== -1) battleState.grid[commIdx].hp = Math.min(20, battleState.grid[commIdx].hp + 3);
    addLog(`Chierico Errante cura di 3 PV il Comandante ${pOwner.toUpperCase()}!`, 'sys');
  }

  // Tokens / Rubble on death
  if (name === 'Rottame Semovente' || desc.includes('alla morte lascia un blocco di scorie')) {
    battleState.grid[idx] = {
      owner: pOwner,
      type: 'wall',
      cardId: 'blocco_scorie',
      name: 'Blocco di Scorie',
      hp: 2,
      att: 0,
      move: 'none',
      range: 0,
      glyph: '🧱',
      desc: "Blocco di Scorie (0 ATT / 2 PV). Ostacolo solido.",
      rarity: 'common',
      exhausted: true
    };
    addLog(`Rottame Semovente collassa lasciando un Blocco di Scorie (2 PV)!`, 'sys');
  } else if (name === "Puntone d'Ossidiana") {
    battleState.grid[idx] = {
      owner: pOwner,
      type: 'wall',
      cardId: 'blocco_ossidiana',
      name: 'Blocco d\'Ossidiana',
      hp: 3,
      att: 0,
      move: 'none',
      range: 0,
      glyph: '🧱',
      desc: "Blocco d'Ossidiana (0 ATT / 3 PV).",
      rarity: 'common',
      exhausted: true
    };
  } else if (name === "Faglia d'Ossidiana" || name === 'Monolito della Frattura') {
    battleState.grid[idx] = {
      owner: 'neutral',
      type: 'wall',
      cardId: 'voragine',
      name: 'Voragine',
      hp: 999,
      att: 0,
      move: 'none',
      range: 0,
      glyph: '🕳️',
      desc: "Voragine permanente e impassabile.",
      rarity: 'common',
      exhausted: true,
      isVoragine: true
    };
    addLog(`Il crollo di ${name} apre una Voragine permanente!`, 'sys');
  }

  // Drawbacks
  if (name === 'Vena Tettorica Instabile' && killerOwner !== pOwner) {
    battleState[pOwner].hp -= 2;
    const cIdx = battleState.grid.findIndex(p => p && p.owner === pOwner && p.type === 'commander');
    if (cIdx !== -1) battleState.grid[cIdx].hp -= 2;
    addLog(`Vena Tettorica Instabile esplode infliggendo 2 danni al Comandante ${pOwner.toUpperCase()}!`, 'sys');
  }

  // Commander Ignis passive: +1 ATT per destroyed allied altar
  const commIdx = battleState.grid.findIndex(p => p && p.owner === pOwner && p.type === 'commander');
  if (commIdx !== -1) {
    const comm = battleState.grid[commIdx];
    if ((comm.name === 'Ignis' || comm.cardId === 'ignis') && piece.type === 'altar') {
      comm.att += 1;
      addLog(`Ignis assorbe il fuoco dell'Altare distrutto: +1 ATT permanente (ATT: ${comm.att})!`, pOwner);
    }
  }

  // Blood calculation
  let extraBlood = 0;
  if (name === 'Sepolcro delle Ceneri Calde') extraBlood += 2;
  if (name === 'Verme Sepolcrale') extraBlood += 1;
  if (name === 'Altare dei Sacrifici' && killerOwner === pOwner) extraBlood += 3;

  const isHeavy = piece.type === 'altar' || (piece.cost && piece.cost >= 3) || piece.type === 'commander';
  let killerBlood = isHeavy ? 2 : 1;
  let ownerBlood = 1 + extraBlood;

  if (piece.noBloodReward) killerBlood = 0;

  if (killerOwner) battleState[killerOwner].blood += killerBlood;
  if (pOwner && pOwner !== killerOwner) battleState[pOwner].blood += ownerBlood;

  // Graveyard
  if (pOwner && piece.type !== 'commander' && piece.type !== 'wall') {
    if (!battleState[pOwner].graveyard) battleState[pOwner].graveyard = [];
    battleState[pOwner].graveyard.push(piece.cardId || piece.name);
  }

  if (piece.type === 'altar') {
    recalculatePlayerMaxMana(pOwner);
    addLog(`Altare di ${pOwner.toUpperCase()} distrutto! Mana massimo: ${battleState[pOwner].maxMana}`, 'sys');
  }
}

// Combat Execution Implementation
function executeAttackAction(from, to, player = 'p1') {
  const att = battleState.grid[from];
  const def = battleState.grid[to];
  if (!att || !def) return;

  const opp = (player === 'p1') ? 'p2' : 'p1';
  let damage = att.att;
  const defDesc = (def.desc || '').toLowerCase();

  // 1. Anti-Structure / Sfondamento
  const isStructure = def.type === 'altar' || def.type === 'wall' || (def.desc && def.desc.includes('Muro'));
  const attDesc = (att.desc || '').toLowerCase();
  if (isStructure) {
    if (att.name === 'Ariete da Breccia') {
      damage = 6;
      addLog(`Ariete da Breccia applica Sfondamento: 6 danni a struttura!`, player);
    } else if (att.name === 'Ariete Cataclismatico') {
      damage = 8;
      addLog(`Ariete Cataclismatico applica Sfondamento: 8 danni ad Altare!`, player);
    } else if (attDesc.includes('sfondamento') || attDesc.includes('muri e altari')) {
      damage *= 2;
      addLog(`Sfondamento: danni raddoppiati contro struttura (${damage} danni)!`, player);
    }
  }

  // 2. Flanking / Aggiramento
  const hasFlankingKeyword = attDesc.includes('flanking') || attDesc.includes('aggiramento') || battleState[player].fendentiIncrociati;
  if (hasFlankingKeyword && !isStructure) {
    const defAdjs = getAdjs(to);
    const hasOtherAlly = defAdjs.some(adj => {
      if (adj === from) return false;
      const p = battleState.grid[adj];
      return p && p.owner === player && p.type !== 'wall';
    });
    if (hasOtherAlly) {
      let flankingBonus = 2;
      if (battleState[player].fendentiIncrociati) flankingBonus += 2;
      damage += flankingBonus;
      addLog(`⚔️ FLANKING! Accerchiamento riuscito: +${flankingBonus} danni a ${def.name}!`, player);
    }
  }

  // 3. Defender Total Shield / Immunity
  if (def.hasTotalShield) {
    damage = 0;
    def.hasTotalShield = false;
    addLog(`🛡️ SCUDO TOTALE ha assorbito completamente il colpo su ${def.name}!`, 'sys');
  } else if (def.immunePhysical) {
    damage = 0;
    addLog(`✨ BOLLA SFASANTE rende ${def.name} immune al danno fisico!`, 'sys');
  } else {
    // 4. Armor Mitigation
    let armor = 0;
    if (def.armor) armor += def.armor;
    if (def.tempArmor) armor += def.tempArmor;
    if (battleState[def.owner].muragliaScudiActive) armor += 1;
    const defDesc = (def.desc || '').toLowerCase();
    if (defDesc.includes('armatura') && !def.armor) armor += 1;

    // Iron Altar cover
    const hasIronAltar = getAdjs(to).some(adj => {
      const p = battleState.grid[adj];
      return p && p.owner === def.owner && p.type === 'altar' && (p.cardId === 'altar_iron' || p.name === 'Altare di Ferro' || p.name === 'Altare della Fortezza');
    });
    if (hasIronAltar) armor += 1;

    // Check if attacker ignores armor
    if (attDesc.includes('ignora l\'armatura') || attDesc.includes('trapassano qualsiasi') || attDesc.includes('ignora la riduzione')) {
      addLog(`${att.name} trapassa l'armatura nemica ignorando ogni riduzione!`, player);
      armor = 0;
    }

    if (armor > 0) {
      const absorbed = Math.min(damage - 1, armor);
      if (absorbed > 0) {
        damage -= absorbed;
        addLog(`Armatura protegge ${def.name}: -${absorbed} danno assorbito!`, 'sys');
      }
    }
  }

  addLog(`${att.name} infligge ${damage} danni a ${def.name}`, player);
  def.hp -= damage;

  if (def.hp <= 0) {
    handlePieceDefeated(to, player);
  } else {
    // 5. Counterattack
    const dist = Math.max(Math.abs(Math.floor(from/8) - Math.floor(to/8)), Math.abs((from%8) - (to%8)));
    const isRangedAttacker = (att.range && att.range > 1) && dist > 1;
    const defCannotCounter = defDesc.includes('non può contrattaccare') || defDesc.includes('non contrattacca');

    if (!defCannotCounter && (!isRangedAttacker || def.range >= dist || defDesc.includes('contrattacca a distanza'))) {
      let counterDmg = def.att;
      // Presidio check: 0 ATT actively, but 2 ATT in counterattack
      if (defDesc.includes('presidio') && counterDmg === 0) {
        counterDmg = 2;
      }
      // Specialized counterattackers
      if (def.name === 'Campione del Bastione' && def.hp <= 2) counterDmg = 4;
      if (def.name === 'Guardiano della Fucina' && getAdjs(to).some(adj => battleState.grid[adj]?.type === 'altar')) counterDmg = 4;
      if (def.name === 'Duellante Sfregiato' && def.hp <= 2) counterDmg = 4;

      // Fortress altar bonus
      if (getAdjs(to).some(adj => battleState.grid[adj]?.name === 'Altare della Fortezza')) counterDmg += 1;

      // Attacker armor vs counterattack
      let attArmor = (att.armor || 0) + (att.tempArmor || 0);
      if (battleState[att.owner].muragliaScudiActive) attArmor += 1;
      if (attDesc.includes('armatura') && !att.armor) attArmor += 1;
      if (attArmor > 0) counterDmg = Math.max(0, counterDmg - attArmor);

      att.hp -= counterDmg;
      addLog(`${def.name} contrattacca infliggendo ${counterDmg} danni a ${att.name}`, 'sys');
      if (att.hp <= 0) handlePieceDefeated(from, def.owner);
    }
  }

  att.exhausted = true;
  battleState[player].actions--;
}

console.log('Running tests...');

// TEST 1: Combat - Armatura & Flanking & Presidio
battleState = createTestState();
battleState.grid[10] = { owner: 'p1', name: 'Alabardiere da Trincea', att: 2, hp: 4, range: 1, desc: 'Flanking: +2 danni con aggiramento.' };
battleState.grid[11] = { owner: 'p1', name: 'Fante Alleato', att: 1, hp: 4, range: 1, desc: '' };
battleState.grid[18] = { owner: 'p2', name: 'Sentinella del Bastione', att: 0, hp: 5, range: 1, desc: 'Presidio: contrattacca a 2 ATT solo se ingaggiata in mischia. Armatura: -1 danno.' };

// P1 attacks Sentinella:
// Base ATT = 2. Flanking bonus (since Fante Alleato is adjacent to 18) = +2 -> damage = 4.
// Sentinella has Armatura: -1 -> damage = 3.
// Sentinella HP becomes 5 - 3 = 2.
// Sentinella Presidio counterattack: 2 ATT vs Alabardiere (no armor) -> Alabardiere takes 2 damage -> HP becomes 4 - 2 = 2.
executeAttackAction(10, 18, 'p1');

console.log('TEST 1 - Sentinella HP:', battleState.grid[18]?.hp, '(Expected: 2)');
console.log('TEST 1 - Alabardiere HP:', battleState.grid[10]?.hp, '(Expected: 2)');
console.assert(battleState.grid[18]?.hp === 2, 'Sentinella HP should be 2');
console.assert(battleState.grid[10]?.hp === 2, 'Alabardiere HP should be 2');

// TEST 2: Anti-Structure Sfondamento (Ariete da Breccia)
battleState = createTestState();
battleState.grid[20] = { owner: 'p1', name: 'Ariete da Breccia', att: 2, hp: 7, range: 1, desc: 'Sfondamento: 6 danni ad Altari e muri.' };
battleState.grid[21] = { owner: 'p2', type: 'altar', name: 'Altare della Fortezza', att: 0, hp: 8, range: 0, desc: '' };

executeAttackAction(20, 21, 'p1');
console.log('TEST 2 - Altar HP after Ariete:', battleState.grid[21]?.hp, '(Expected: 2)');
console.assert(battleState.grid[21]?.hp === 2, 'Altar HP should be 2 after 6 damage');

// TEST 3: Death Triggers - Guscio Esplosivo
battleState = createTestState();
battleState.grid[30] = { owner: 'p2', name: 'Guscio Esplosivo', att: 1, hp: 2, desc: 'Detonazione: alla morte infligge 2 danni a tutte le 4 caselle ortogonali adiacenti.' };
battleState.grid[22] = { owner: 'p1', name: 'Fante Nord', att: 1, hp: 4, desc: '' }; // orthogonal north (30-8 = 22)
battleState.grid[31] = { owner: 'p1', name: 'Fante Est', att: 1, hp: 1, desc: '' };  // orthogonal east (30+1 = 31)

// Defeat Guscio Esplosivo
handlePieceDefeated(30, 'p1');
console.log('TEST 3 - Fante Nord HP:', battleState.grid[22]?.hp, '(Expected: 2)');
console.log('TEST 3 - Fante Est should be defeated:', battleState.grid[31] === null, '(Expected: true)');
console.assert(battleState.grid[22]?.hp === 2, 'Fante Nord should take 2 damage');
console.assert(battleState.grid[31] === null, 'Fante Est should be defeated');

// TEST 4: Death Triggers - Monaco Mendicante & Sepolcro
battleState = createTestState();
battleState.grid[40] = { owner: 'p1', name: 'Monaco Mendicante', att: 0, hp: 1, desc: 'Elemosina: fa pescare 1 carta al controllore quando viene distrutto.' };
const p1HandBefore = battleState.p1.hand.length;
handlePieceDefeated(40, 'p2');
console.log('TEST 4 - P1 Hand after Monaco death:', battleState.p1.hand.length, `(Expected: ${p1HandBefore + 1})`);
console.assert(battleState.p1.hand.length === p1HandBefore + 1, 'P1 should have drawn 1 card');

// TEST 5: Rottame Semovente leaving Blocco di Scorie
battleState = createTestState();
battleState.grid[50] = { owner: 'p1', name: 'Rottame Semovente', att: 1, hp: 2, desc: 'Macerie: alla morte lascia un Blocco di Scorie (0 ATT / 2 PV) sulla casella.' };
handlePieceDefeated(50, 'p2');
console.log('TEST 5 - Rubble spawned:', battleState.grid[50]?.name, '(Expected: Blocco di Scorie)');
console.assert(battleState.grid[50]?.name === 'Blocco di Scorie', 'Should spawn Blocco di Scorie');

console.log('ALL TESTS PASSED SUCCESSFULLY! 🎉');
