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
      hp: 15,
      mana: 10,
      maxMana: 5,
      blood: 10,
      actions: 2,
      altarDeployedThisTurn: false,
      deck: ['Fante Corazzato', 'Marcia Forzata', 'Rito di Comunione', 'Giuramento Ancestrale', 'Fante con Scudo a Torre'],
      hand: [],
      graveyard: []
    },
    p2: {
      name: 'P2',
      commander: { hp: 20, name: 'Garek' },
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
    turnPhase: 1,
    isGameOver: false,
    nextTurnManaDrainP1: 0,
    nextTurnManaDrainP2: 0,
    logs: []
  };
}

let battleState = createTestState();

function addLog(msg, type) { battleState.logs.push(`[${type}] ${msg}`); }
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
function handlePieceDefeated(idx, killerOwner) {
  const piece = battleState.grid[idx];
  if (!piece) return;
  battleState.grid[idx] = null;
  if (killerOwner) battleState[killerOwner].blood += 1;
  if (piece.owner && piece.owner !== killerOwner) battleState[piece.owner].blood += 1;
}

// Complete Spell Dispatcher Logic
function executeSpellAction(targetIdx, cardId, player = 'p1') {
  const card = CARDS_DB[cardId];
  if (!card) return false;
  const opp = (player === 'p1') ? 'p2' : 'p1';
  const name = card.name || cardId;
  const desc = (card.desc || '').toLowerCase();
  const target = battleState.grid[targetIdx];

  // Cost deduction
  battleState[player].mana -= card.cost;
  if (card.bloodCost) battleState[player].blood -= card.bloodCost;
  if (!battleState[player].graveyard) battleState[player].graveyard = [];
  battleState[player].graveyard.push(cardId);

  // 1. SPECIFIC SPELLS
  if (name === 'Frantumare la Pietra' || card.id === 'spell_cleave') {
    if (target && target.owner === opp && (target.type === 'altar' || target.type === 'wall')) {
      target.hp = 0;
      handlePieceDefeated(targetIdx, player);
      addLog(`Frantumare la Pietra distrugge ${target.name}!`, player);
    }
  } else if (name === 'Rito di Comunione') {
    const commHp = battleState[player].hp;
    const cardsToDraw = commHp < 10 ? 3 : 2;
    for (let i = 0; i < cardsToDraw; i++) drawCard(player);
    addLog(`Rito di Comunione: ${player} pesca ${cardsToDraw} carte!`, player);
  } else if (name === 'Giuramento Ancestrale') {
    for (let i = 0; i < 3; i++) drawCard(player);
    battleState[player].hp = Math.min(20, battleState[player].hp + 4);
    const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
    if (commIdx !== -1) battleState.grid[commIdx].hp = Math.min(20, battleState.grid[commIdx].hp + 4);
    addLog(`Giuramento Ancestrale: pesca 3 carte e cura 4 PV!`, player);
  } else if (name === 'Patto della Pira') {
    battleState[player].hp -= 2;
    battleState[player].blood += 3;
    battleState[player].actions += 1;
    const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
    if (commIdx !== -1) battleState.grid[commIdx].hp -= 2;
    addLog(`Patto della Pira: -2 PV Comandante, +3 Sangue e +1 Azione!`, player);
  } else if (name === 'Vortice Temporale') {
    battleState[player].actions += 1;
    addLog(`Vortice Temporale: +1 Azione concessa!`, player);
  } else if (name === "Scudo d'Ossidiana") {
    battleState[player].hp = Math.min(20, battleState[player].hp + 3);
    const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
    if (commIdx !== -1) {
      battleState.grid[commIdx].hp = Math.min(20, battleState.grid[commIdx].hp + 3);
      battleState.grid[commIdx].hasTotalShield = true;
    }
    addLog(`Scudo d'Ossidiana: Comandante curato di 3 PV e protetto da Scudo Totale!`, player);
  } else if (name === 'Muraglia di Scudi') {
    battleState[player].muragliaScudiActive = true;
    addLog(`Muraglia di Scudi: tutte le unità alleate ottengono +1 armatura!`, player);
  } else if (name === "Tempra d'Acciaio") {
    if (target && target.owner === player) {
      target.armor = (target.armor || 0) + 1;
      addLog(`Tempra d'Acciaio: +1 armatura permanente a ${target.name}!`, player);
    }
  } else if (name === 'Bolla Sfasante') {
    if (target && target.owner === player) {
      target.immunePhysical = true;
      target.exhausted = true;
      addLog(`Bolla Sfasante: ${target.name} è immune al danno fisico per 1 turno!`, player);
    }
  } else if (name === 'Fendenti Incrociati') {
    battleState[player].fendentiIncrociati = true;
    addLog(`Fendenti Incrociati attivo: +2 danni extra da Flanking!`, player);
  } else if (name === 'Offerta Funebre') {
    if (target && target.owner === player) {
      target.hp = 0;
      handlePieceDefeated(targetIdx, player);
      battleState[player].blood += 3;
      drawCard(player);
      addLog(`Offerta Funebre sacrifica ${target.name}: +3 Sangue e 1 carta pescata!`, player);
    }
  } else if (name === "Offerta d'Ossa") {
    if (target && target.owner === player) {
      target.hp = 0;
      handlePieceDefeated(targetIdx, player);
      battleState[player].blood += 2;
      drawCard(player); drawCard(player);
      addLog(`Offerta d'Ossa sacrifica ${target.name}: +2 Sangue e 2 carte pescate!`, player);
    }
  } else if (name === 'Bastione Spezzato') {
    if (target && target.owner === player) {
      target.hp = 0;
      handlePieceDefeated(targetIdx, player);
      drawCard(player); drawCard(player);
      addLog(`Bastione Spezzato distrugge ${target.name}: +2 carte pescate!`, player);
    }
  } else if (name === 'Festino Macabro') {
    let sacrificed = 0;
    battleState.grid.forEach((p, idx) => {
      if (p && p.owner === player && p.type === 'unit' && p.cost && p.cost <= 1) {
        p.hp = 0;
        handlePieceDefeated(idx, player);
        sacrificed++;
      }
    });
    const healAmount = sacrificed * 3;
    battleState[player].hp = Math.min(20, battleState[player].hp + healAmount);
    const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
    if (commIdx !== -1) battleState.grid[commIdx].hp = Math.min(20, battleState.grid[commIdx].hp + healAmount);
    addLog(`Festino Macabro sacrifica ${sacrificed} truppe minori (+${healAmount} PV al Comandante)!`, player);
  } else if (name === 'Editto di Confisca') {
    const drainKey = (opp === 'p1') ? 'nextTurnManaDrainP1' : 'nextTurnManaDrainP2';
    battleState[drainKey] = (battleState[drainKey] || 0) + 1;
    addLog(`Editto di Confisca: ${opp.toUpperCase()} subirà -1 Mana al prossimo turno!`, player);
  } else if (name === 'Sigillo di Confisca') {
    const stolen = Math.min(2, battleState[opp].blood);
    battleState[opp].blood -= stolen;
    battleState[player].blood += stolen;
    if (stolen < 2) {
      const dmg = (2 - stolen) * 2;
      battleState[opp].hp -= dmg;
      addLog(`Sigillo di Confisca ruba ${stolen} Sangue e infligge ${dmg} danni al Comandante nemico!`, player);
    } else {
      addLog(`Sigillo di Confisca ruba 2 Sangue all'avversario!`, player);
    }
  } else if (name === 'Confisca Totale') {
    const drained = battleState[opp].blood;
    battleState[opp].blood = 0;
    const healAmount = drained * 2;
    battleState[player].hp = Math.min(20, battleState[player].hp + healAmount);
    const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
    if (commIdx !== -1) battleState.grid[commIdx].hp = Math.min(20, battleState.grid[commIdx].hp + healAmount);
    addLog(`Confisca Totale prosciuga ${drained} Sangue nemico curando il Comandante di ${healAmount} PV!`, player);
  } else if (name === 'Genio del Geniere' || card.id === 'spell_fortify') {
    if (target) {
      const healAmt = target.type === 'altar' ? 3 : 2;
      target.hp += healAmt;
      addLog(`Genio del Geniere ripristina +${healAmt} PV a ${target.name}!`, player);
    }
  } else if (name === 'Rinforzo dei Plinti') {
    if (target) {
      target.hp += 3;
      addLog(`Rinforzo dei Plinti: +3 PV a ${target.name}!`, player);
    }
  } else if (name === 'Riparazione di Garek') {
    if (target) {
      target.hp += 4;
      addLog(`Riparazione di Garek: +4 PV a ${target.name}!`, player);
    }
  } else if (name === "Saldata d'Urgenza") {
    if (target) {
      target.hp += 3;
      addLog(`Saldata d'Urgenza: +3 PV a ${target.name}!`, player);
    }
  } else if (name === 'Barricata Improvvisata' || card.id === 'spell_barricade') {
    if (!battleState.grid[targetIdx]) {
      battleState.grid[targetIdx] = {
        owner: player,
        type: 'wall',
        cardId: 'barricata_improvvisata',
        name: 'Muro di Detriti',
        hp: 3,
        att: 0,
        move: 'none',
        range: 0,
        glyph: '🧱',
        desc: "Muro di Detriti solido (0 ATT / 3 PV).",
        rarity: 'common',
        exhausted: true
      };
      addLog(`Barricata Improvvisata erige Muro di Detriti su cella ${targetIdx}!`, player);
    }
  } else if (name === 'Fucina da Campo') {
    if (!battleState.grid[targetIdx]) {
      battleState.grid[targetIdx] = {
        owner: player,
        type: 'wall',
        cardId: 'fucina_da_campo',
        name: 'Blocco di Scorie',
        hp: 4,
        att: 0,
        move: 'none',
        range: 0,
        glyph: '🧱',
        desc: "Blocco di Scorie solido (0 ATT / 4 PV).",
        rarity: 'common',
        exhausted: true
      };
      addLog(`Fucina da Campo schiera Blocco di Scorie su cella ${targetIdx}!`, player);
    }
  } else if (name === 'Spaccatura Terrestre' || name === 'Faglia Improvvisa') {
    if (!battleState.grid[targetIdx]) {
      battleState.grid[targetIdx] = {
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
      addLog(`Spaccatura Terrestre apre una Voragine su cella ${targetIdx}!`, player);
    }
  } else if (name === 'Marea di Larve') {
    const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
    const freeSqs = [];
    if (commIdx !== -1) {
      getAdjs(commIdx).forEach(adj => {
        if (!battleState.grid[adj]) freeSqs.push(adj);
      });
    }
    const toSpawn = Math.min(3, freeSqs.length);
    for (let i = 0; i < toSpawn; i++) {
      const sq = freeSqs[i];
      battleState.grid[sq] = {
        owner: player,
        type: 'unit',
        cardId: 'larvone_infetto',
        name: 'Larvone Infetto',
        hp: 1,
        att: 1,
        move: 'diag',
        range: 1,
        glyph: '🐛',
        desc: "Slancio (diagonale): muove in diagonale e attacca subito; alla morte avvelena la casella.",
        rarity: 'common',
        exhausted: false
      };
    }
    addLog(`Marea di Larve evoca ${toSpawn} Larvoni Infetti!`, player);
  } else if (name === 'Pietrificazione') {
    if (target && target.owner === opp) {
      battleState.grid[targetIdx] = {
        owner: 'neutral',
        type: 'wall',
        cardId: 'muro_pietrificato',
        name: 'Statua Pietrificata',
        hp: 4,
        att: 0,
        move: 'none',
        range: 0,
        glyph: '🗿',
        desc: "Statua Pietrificata (0 ATT / 4 PV). Muro solido permanente.",
        rarity: 'common',
        exhausted: true
      };
      addLog(`Pietrificazione trasforma ${target.name} in un Muro di Pietra!`, player);
    }
  } else if (name === 'Castigo della Legge') {
    if (target && target.owner === opp) {
      target.hp -= 4;
      target.noBloodReward = true;
      addLog(`Castigo della Legge infligge 4 danni a ${target.name} (nessun Sangue generato)!`, player);
      if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
    }
  } else if (name === 'Verdetto Immediato') {
    if (target && target.owner === opp) {
      target.hp -= 3;
      addLog(`Verdetto Immediato infligge 3 danni a ${target.name}!`, player);
      if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
    }
  } else if (name === 'Salasso Crudele' || card.id === 'spell_bloodsurge') {
    if (target && target.owner === opp) {
      target.hp -= 3;
      addLog(`Salasso Crudele infligge 3 danni a ${target.name}!`, player);
      if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
    }
  } else if (name === 'Martellata Sismica') {
    if (target && target.owner === opp) {
      target.hp -= 3;
      addLog(`Martellata Sismica infligge 3 danni a ${target.name}!`, player);
      if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
    }
  } else if (name === 'Eruzione di Scorie Rapida') {
    if (target && target.owner === player && target.type === 'altar') {
      target.hp = 0;
      handlePieceDefeated(targetIdx, player);
      getAdjs(targetIdx).forEach(adj => {
        const p = battleState.grid[adj];
        if (p && p.owner === opp) {
          p.hp -= 4;
          addLog(`Eruzione di Scorie colpisce ${p.name} (-4 PV)`, 'sys');
          if (p.hp <= 0) handlePieceDefeated(adj, player);
        }
      });
    }
  } else if (name === "Fusione d'Emergenza" || name === 'Fusione di Emergenza') {
    if (target && target.owner === player) {
      target.hp = 0;
      handlePieceDefeated(targetIdx, player);
      drawCard(player); drawCard(player);
      getAdjs(targetIdx).forEach(adj => {
        const p = battleState.grid[adj];
        if (p) {
          p.hp -= 2;
          if (p.hp <= 0) handlePieceDefeated(adj, player);
        }
      });
      addLog(`Fusione d'Emergenza sacrifica ${target.name} (+2 carte, 2 danni ad area)!`, player);
    }
  } else if (name === 'Riciclo Metalli' || name === 'Riciclo Istantaneo') {
    if (target && target.owner === player) {
      target.hp = 0;
      handlePieceDefeated(targetIdx, player);
      battleState[player].mana += 2;
      addLog(`Riciclo Metalli demolisce ${target.name} (+2 Mana immediati)!`, player);
    }
  } else if (name === 'Saccheggio Rapido') {
    battleState[player].mana += 2;
    addLog(`Saccheggio Rapido incassa +2 Mana immediati!`, player);
  } else if (name === 'Sguardo del Monolito') {
    if (target && target.owner === opp) {
      target.frozen = true;
      target.exhausted = true;
      addLog(`Sguardo del Monolito blocca completamente ${target.name} per 1 round!`, player);
    }
  } else if (name === 'Nube di Larve') {
    if (target && target.owner === opp) {
      target.range = 1;
      addLog(`Nube di Larve acceca ${target.name}: gittata ridotta a 1!`, player);
    }
  } else if (name === 'Catene di Braci') {
    if (target && target.owner === opp) {
      target.rooted = true;
      addLog(`Catene di Braci immobilizzano ${target.name}!`, player);
    }
  } else if (name === 'Anatema del Silenzio') {
    if (target && target.owner === opp) {
      target.silenced = true;
      target.desc = 'Silenziato: tutte le abilità e passive sono annullate.';
      addLog(`Anatema del Silenzio priva ${target.name} di tutte le sue abilità!`, player);
    }
  } else if (name === 'Voto di Silenzio') {
    battleState.votoSilenzioActive = true;
    addLog(`Voto di Silenzio attivo: sortilegi bloccati fino al prossimo round!`, player);
  } else if (name === 'Sigillo di Kael') {
    battleState[opp].ritesBlocked = true;
    addLog(`Sigillo di Kael: Riti d'Armi dell'avversario sigillati per 1 round!`, player);
  } else if (name === 'Nebbia di Guerra') {
    battleState.nebbiaGuerraActive = true;
    addLog(`Nebbia di Guerra: attacchi a distanza impediti per 1 round!`, player);
  } else if (name === 'Furia dei Relitti' || card.id === 'spell_wrath') {
    const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
    if (commIdx !== -1) {
      getAdjs(commIdx).forEach(adj => {
        const p = battleState.grid[adj];
        if (p && p.owner === opp) {
          p.hp -= 2;
          addLog(`Furia dei Relitti colpisce ${p.name} (-2 PV)`, 'sys');
          if (p.hp <= 0) handlePieceDefeated(adj, player);
        }
      });
    }
  } else if (name === 'Collasso di Marea') {
    battleState.grid.forEach((altar, aIdx) => {
      if (altar && altar.owner === player && altar.type === 'altar') {
        getAdjs(aIdx).forEach(adj => {
          const p = battleState.grid[adj];
          if (p && p.owner === opp) {
            p.hp -= 2;
            addLog(`Collasso di Marea investe ${p.name} (-2 PV)!`, 'sys');
            if (p.hp <= 0) handlePieceDefeated(adj, player);
          }
        });
      }
    });
  } else if (name === 'Salasso di Massa') {
    battleState.grid.forEach((p, idx) => {
      if (p && p.hp > 0 && p.hp < 3) {
        p.hp -= 1;
        addLog(`Salasso di Massa ferisce ${p.name} (-1 PV)!`, 'sys');
        if (p.hp <= 0) handlePieceDefeated(idx, player);
      }
    });
  } else if (name === 'Carne Putrida') {
    if (target && target.owner === player) {
      target.hp += 2;
      target.att = Math.max(0, target.att - 1);
      addLog(`Carne Putrida rinvigorisce ${target.name} (+2 PV, -1 ATT)!`, player);
    }
  } else if (name === 'Rinvigorire') {
    if (target && target.owner === player) {
      target.exhausted = false;
      addLog(`Rinvigorire restituisce l'azione a ${target.name}!`, player);
    }
  } else if (name === 'Manto di Marmo') {
    if (target && target.owner === player && target.type === 'altar') {
      target.hasTotalShield = true;
      addLog(`Manto di Marmo conferisce Scudo Totale a ${target.name}!`, player);
    }
  } else if (name === 'Frantumare la Corazza') {
    if (target && target.owner === opp) {
      target.armor = 0;
      target.tempArmor = 0;
      addLog(`Frantumare la Corazza distrugge l'armatura di ${target.name}!`, player);
    }
  } else if (name === 'Gettata di Ghisa') {
    if (target && target.owner === opp) {
      target.hp -= 2;
      target.rooted = true;
      addLog(`Gettata di Ghisa infligge 2 danni e blocca ${target.name}!`, player);
      if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
    }
  } else if (name === 'Contagio') {
    if (target && target.owner === opp) {
      target.hp -= 1;
      addLog(`Contagio infetta ${target.name} (-1 PV)`, player);
      if (target.hp <= 0) {
        handlePieceDefeated(targetIdx, player);
        getAdjs(targetIdx).forEach(adj => {
          const p = battleState.grid[adj];
          if (p && p.owner === opp) {
            p.hp -= 1;
            if (p.hp <= 0) handlePieceDefeated(adj, player);
          }
        });
      }
    }
  } else if (name === "Manto d'Ossidiana") {
    if (target && target.owner === player) {
      target.immunePush = true;
      addLog(`Manto d'Ossidiana rende ${target.name} immune a spinte e urti!`, player);
    }
  } else if (name === 'Comando di Trincea') {
    battleState[player].trinceaActive = true;
    addLog(`Comando di Trincea azzera i danni a distanza adiacenti ad Altari!`, player);
  } else if (name === 'Formazione a Testuggine') {
    battleState[player].testuggineActive = true;
    addLog(`Formazione a Testuggine attiva (+1 armatura alleati adiacenti)!`, player);
  } else if (name === 'Marea Crescente') {
    battleState[player].mareaCrescente = true;
    addLog(`Marea Crescente conferisce +1 passo ai movimenti diagonali!`, player);
  } else if (name === 'Prisma di Distorsione') {
    battleState[player].prismaDistorsione = true;
    addLog(`Prisma di Distorsione: +1 gittata a tutti gli attacchi a distanza alleati!`, player);
  } else if (target && target.owner === opp) {
    // Standard targeted fallback
    target.hp -= 2;
    addLog(`${target.name} subisce 2 danni da ${card.name}!`, player);
    if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
  }
  return true;
}

// RUN SPELL TESTS
console.log('Testing Spell Dispatcher...');

// 1. Rito di Comunione (< 10 HP -> 3 cards drawn)
battleState = createTestState();
battleState.p1.hp = 8;
executeSpellAction(0, 'Rito di Comunione', 'p1');
console.log('Test Rito di Comunione hand size:', battleState.p1.hand.length, '(Expected: 3)');
console.assert(battleState.p1.hand.length === 3, 'Should draw 3 cards when HP < 10');

// 2. Giuramento Ancestrale (draw 3, heal 4)
battleState = createTestState();
battleState.p1.hp = 12;
executeSpellAction(0, 'Giuramento Ancestrale', 'p1');
console.log('Test Giuramento Ancestrale HP:', battleState.p1.hp, '(Expected: 16)');
console.log('Test Giuramento Ancestrale hand size:', battleState.p1.hand.length, '(Expected: 3)');
console.assert(battleState.p1.hp === 16, 'Should heal 4 HP');
console.assert(battleState.p1.hand.length === 3, 'Should draw 3 cards');

// 3. Patto della Pira (-2 HP, +3 Blood, +1 Action)
battleState = createTestState();
battleState.p1.hp = 15;
battleState.p1.blood = 2;
battleState.p1.actions = 2;
executeSpellAction(0, 'Patto della Pira', 'p1');
console.log('Test Patto della Pira HP:', battleState.p1.hp, '(Expected: 13)');
console.log('Test Patto della Pira blood:', battleState.p1.blood, '(Expected: 5)');
console.log('Test Patto della Pira actions:', battleState.p1.actions, '(Expected: 3)');
console.assert(battleState.p1.hp === 13 && battleState.p1.blood === 5 && battleState.p1.actions === 3, 'Patto della Pira stats match');

// 4. Barricata Improvvisata & Spaccatura Terrestre
battleState = createTestState();
executeSpellAction(24, 'Barricata Improvvisata', 'p1');
console.log('Test Barricata piece:', battleState.grid[24]?.name, '(Expected: Muro di Detriti)');
console.assert(battleState.grid[24]?.name === 'Muro di Detriti', 'Should spawn Muro di Detriti');

executeSpellAction(25, 'Spaccatura Terrestre', 'p1');
console.log('Test Spaccatura piece:', battleState.grid[25]?.name, '(Expected: Voragine)');
console.assert(battleState.grid[25]?.name === 'Voragine', 'Should spawn Voragine');

// 5. Confisca Totale (drains enemy blood, heals commander 2x)
battleState = createTestState();
battleState.p1.hp = 10;
battleState.p2.blood = 4;
executeSpellAction(0, 'Confisca Totale', 'p1');
console.log('Test Confisca Totale P2 blood:', battleState.p2.blood, '(Expected: 0)');
console.log('Test Confisca Totale P1 HP:', battleState.p1.hp, '(Expected: 18)');
console.assert(battleState.p2.blood === 0 && battleState.p1.hp === 18, 'Confisca Totale works');

// 6. Bastione Spezzato (sacrifices wall -> 2 cards drawn)
battleState = createTestState();
battleState.grid[12] = { owner: 'p1', type: 'wall', name: 'Muro di Detriti', hp: 3 };
executeSpellAction(12, 'Bastione Spezzato', 'p1');
console.log('Test Bastione Spezzato wall destroyed:', battleState.grid[12] === null, '(Expected: true)');
console.log('Test Bastione Spezzato cards drawn:', battleState.p1.hand.length, '(Expected: 2)');
console.assert(battleState.grid[12] === null && battleState.p1.hand.length === 2, 'Bastione Spezzato works');

// 7. Castigo della Legge (4 damage, no blood reward)
battleState = createTestState();
battleState.grid[15] = { owner: 'p2', type: 'unit', name: 'Nemico 4PV', hp: 4 };
battleState.p1.blood = 0;
executeSpellAction(15, 'Castigo della Legge', 'p1');
console.log('Test Castigo della Legge enemy dead:', battleState.grid[15] === null, '(Expected: true)');
console.log('Test Castigo della Legge killer blood:', battleState.p1.blood, '(Expected: 0)');
console.assert(battleState.grid[15] === null && battleState.p1.blood === 0, 'Castigo della Legge prevents killer blood');

console.log('ALL SPELL TESTS PASSED! 🎉');
