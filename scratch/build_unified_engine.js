// Master Script to integrate the Unified Rules Engine into index.html and crownfall.html
const fs = require('fs');

console.log('Loading index.html...');
let html = fs.readFileSync('index.html', 'utf8');

// Normalize all newlines to LF for clean pattern matching
const hasCRLF = html.includes('\r\n');
html = html.replace(/\r\n/g, '\n');

// 1. ADD ADJACENCY HELPERS
const oldAdjs = `    function getAdjs(idx) {
      const r = Math.floor(idx / 8), c = idx % 8;
      const res = [];
      [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([dr, dc]) => {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
      });
      return res;
    }`;

const newAdjs = `    function getAdjs(idx) {
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
    }`;

if (!html.includes(oldAdjs)) {
  console.error('ERROR: oldAdjs not found in index.html!');
  process.exit(1);
}
html = html.replace(oldAdjs, newAdjs);
console.log('1. Adjacency helpers updated.');

// 2. HIGHLIGHT SPELL TARGETS & TARGET ARCHETYPES
const oldHighlight = `    /* GESTIONE SORTILEGI */
    function highlightSpellTargets(card) {
      const role = getMyRole();
      const opp = getOppRole();
      const commIdx = battleState.grid.findIndex(p => p && p.owner === role && p.type === 'commander');
      if (commIdx === -1) return;
      const commR = Math.floor(commIdx / 8);
      const commC = commIdx % 8;
      const name = card.name || card.id;

      battleState.marciaSelectedUnit = null;

      for (let i = 0; i < 64; i++) {
        const target = battleState.grid[i];
        const r = Math.floor(i / 8);
        const c = i % 8;
        const dist = Math.max(Math.abs(r - commR), Math.abs(c - commC));

        if (name === 'Marcia Forzata' || card.id === 'spell_heal' || name === 'Carica Sfondante' || card.id === 'spell_push') {
          // Marcia Forzata e Carica Sfondante: bersagliano unità o miniatura alleata
          if (target && target.owner === role && (target.type === 'unit' || target.type === 'commander')) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Frantumare la Pietra' || card.id === 'spell_cleave') {
          // Bersaglia Altare o Muro nemico entro 4 caselle dal Comandante (esclusi altari immuni)
          const isImmune = target && (target.name === 'Monolito di Basalto' || target.cardId === 'altar_stone' || target.name === 'Cattedrale Sbarrata' || (target.desc && target.desc.includes('non bersagliabile da Frantumare')));
          if (target && target.owner === opp && (target.type === 'altar' || target.type === 'wall' || (target.desc && target.desc.includes('Muro'))) && dist <= 4 && !isImmune) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Genio del Geniere' || card.id === 'spell_fortify') {
          if (target && target.owner === role) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Salasso Crudele' || card.id === 'spell_bloodsurge') {
          if (target && target.owner === opp) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Furia dei Relitti' || card.id === 'spell_wrath') {
          if (i === commIdx) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Trazione Forzata' || name === 'Singolarità Tascabile' || card.id === 'spell_pull_ally' || card.id === 'spell_pull_commander') {
          // Bersaglia un'unità o comandante nemico (non altari, non immuni a trascinamenti)
          const isImmune = target && (target.type === 'altar' || target.type === 'wall' || (target.desc && (target.desc.includes('immune a spinte') || target.desc.includes('non può essere trascinat') || target.desc.includes('Inamovibile') || target.desc.includes('Ancorato'))));
          if (target && target.owner === opp && !isImmune) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (name === 'Barricata Improvvisata' || name === 'Fucina da Campo' || card.id === 'spell_barricade') {
          // Bersaglia una casella libera entro 3 passi dal Comandante
          if (!target && dist <= 3) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else {
          if (target && target.owner === opp) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        }
      }
    }`;

const newHighlight = `    /* GESTIONE SORTILEGI E ARCHETIPI */
    function getSpellTargetArchetype(card) {
      const name = card.name || card.id || '';
      
      // Free square terrain / summons / traps
      if (['Barricata Improvvisata', 'Fucina da Campo', 'Spaccatura Terrestre', 'Faglia Improvvisa', 'Tagliola da Campo', 'Pozza di Sangue', 'Quarantena di Faglia', 'Colata di Magma', 'Editto di Quarantena', 'Infestazione di Vermi'].includes(name) || card.id === 'spell_barricade') {
        return 'free_cell';
      }

      // Friendly altar or structure
      if (['Genio del Geniere', 'Rinforzo dei Plinti', 'Riparazione di Garek', 'Manto di Marmo', 'Eruzione di Scorie Rapida', 'Ignizione Primordiale', 'Ignizione di Ignis'].includes(name) || card.id === 'spell_fortify') {
        return 'ally_altar';
      }

      // Friendly sacrifice (unit/structure/altar)
      if (['Offerta Funebre', "Offerta d'Ossa", 'Bastione Spezzato', "Fusione d'Emergenza", 'Fusione di Emergenza', 'Esplosione Spettrale', 'Masticazione Rapida', 'Riciclo Metalli', 'Riciclo Istantaneo'].includes(name)) {
        return 'sacrifice_ally';
      }

      // Friendly unit or commander buff / move
      if (['Marcia Forzata', 'Carica Sfondante', "Carica d'Acciaio", 'Carica Inarrestabile', 'Sovraccarico di Vapore', 'Salasso di Piastre', "Tempra d'Acciaio", "Tempra d'Ossidiana", 'Sovraccarico Termico', 'Bolla Sfasante', 'Carne Putrida', 'Rinvigorire', "Manto d'Ossidiana", "Saldata d'Urgenza"].includes(name) || card.id === 'spell_heal' || card.id === 'spell_push') {
        return 'ally_unit';
      }

      // Enemy Altar/Wall destruction
      if (['Frantumare la Pietra', 'Martellata Sismica', 'Confisca Forzata'].includes(name) || card.id === 'spell_cleave') {
        return 'enemy_altar';
      }

      // Enemy Unit/Commander pull / push / freeze / destroy
      if (['Trazione Forzata', 'Singolarità Tascabile', 'Spinta nel Vuoto', "Ritorno all'Origine", 'Sguardo del Monolito', 'Nube di Larve', 'Sentenza Inappellabile', 'Verdetto Immediato', 'Pietrificazione', 'Catene di Braci', 'Anatema del Silenzio', 'Castigo della Legge'].includes(name) || card.id === 'spell_pull_ally' || card.id === 'spell_pull_commander') {
        return 'enemy_unit';
      }

      // Global or self/commander spells
      if (['Rito di Comunione', 'Giuramento Ancestrale', 'Patto della Pira', 'Vortice Temporale', 'Muraglia di Scudi', 'Voto di Silenzio', 'Nebbia di Guerra', 'Fendenti Incrociati', "Scudo d'Ossidiana", 'Furia dei Relitti', 'Salasso di Massa', 'Patto Sepolcrale', 'Marea Sepolcrale', 'Rianimazione Veloce', 'Rianimazione Putrescente', 'Marea di Larve', 'Editto di Confisca', 'Sigillo di Confisca', 'Confisca Totale', "Decreto d'Interdizione", 'Tassa Imperiale', 'Tassa sulle Armi', 'Prisma di Distorsione', 'Marea Crescente', 'Formazione a Testuggine', 'Comando di Trincea', 'Collasso di Marea', "Onda d'Urto Astrale", "Ruggito d'Ossidiana", 'Scoppio di Braciere', 'Festino Macabro', 'Saccheggio Rapido', 'Sigillo di Kael', 'Forgiatura Istantanea'].includes(name) || card.id === 'spell_wrath') {
        return 'commander';
      }

      // Default: enemy piece
      return 'enemy_any';
    }

    function highlightSpellTargets(card) {
      const role = getMyRole();
      const opp = getOppRole();
      const commIdx = battleState.grid.findIndex(p => p && p.owner === role && p.type === 'commander');
      if (commIdx === -1) return;
      const commR = Math.floor(commIdx / 8);
      const commC = commIdx % 8;
      const name = card.name || card.id;

      battleState.marciaSelectedUnit = null;
      const arch = getSpellTargetArchetype(card);

      for (let i = 0; i < 64; i++) {
        const target = battleState.grid[i];
        const r = Math.floor(i / 8);
        const c = i % 8;
        const dist = Math.max(Math.abs(r - commR), Math.abs(c - commC));

        if (name === 'Marcia Forzata' || card.id === 'spell_heal' || name === 'Carica Sfondante' || card.id === 'spell_push') {
          if (target && target.owner === role && (target.type === 'unit' || target.type === 'commander')) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (arch === 'commander') {
          if (i === commIdx) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (arch === 'free_cell') {
          if (!target && dist <= 3) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (arch === 'ally_unit') {
          if (target && target.owner === role && (target.type === 'unit' || target.type === 'commander')) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (arch === 'ally_altar') {
          if (target && target.owner === role && (target.type === 'altar' || target.type === 'wall' || (target.desc && target.desc.includes('Muro')))) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (arch === 'sacrifice_ally') {
          if (target && target.owner === role && target.type !== 'commander') {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (arch === 'enemy_altar') {
          const isImmune = target && (target.name === 'Monolito di Basalto' || target.cardId === 'altar_stone' || target.name === 'Cattedrale Sbarrata' || (target.desc && target.desc.includes('non bersagliabile da Frantumare')));
          if (target && target.owner === opp && (target.type === 'altar' || target.type === 'wall' || (target.desc && target.desc.includes('Muro'))) && dist <= 4 && !isImmune) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else if (arch === 'enemy_unit') {
          const isImmune = target && (target.desc && (target.desc.includes('immune a spinte') || target.desc.includes('non può essere trascinat') || target.desc.includes('Inamovibile') || target.desc.includes('Ancorato')));
          if (target && target.owner === opp && (target.type === 'unit' || target.type === 'commander') && (name.includes('Trazione') || name.includes('Singolarità') ? !isImmune : true)) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        } else {
          if (target && target.owner === opp) {
            document.querySelector(\`.square[data-index="\${i}"]\`)?.classList.add('highlight-spell-target');
          }
        }
      }
    }`;

if (!html.includes(oldHighlight)) {
  console.error('ERROR: oldHighlight not found in index.html!');
  process.exit(1);
}
html = html.replace(oldHighlight, newHighlight);
console.log('2. highlightSpellTargets updated.');

// 3. EXECUTE SPELL ACTION
const oldSpellActionStart = `    function executeSpellAction(targetIdx, cardId, player = getMyRole(), isOriginator = true) {`;
const oldSpellActionEnd = `        clearHighlights();
        renderPieces();
        updateHUD();
        renderHand();
        checkWin();
      });
    }`;

const spellActionIdx1 = html.indexOf(oldSpellActionStart);
const spellActionIdx2 = html.indexOf(oldSpellActionEnd, spellActionIdx1);

if (spellActionIdx1 === -1 || spellActionIdx2 === -1) {
  console.error('ERROR: executeSpellAction bounds not found!');
  process.exit(1);
}

const oldExecuteSpellActionBlock = html.substring(spellActionIdx1, spellActionIdx2 + oldSpellActionEnd.length);

const newExecuteSpellActionBlock = `    function executeSpellAction(targetIdx, cardId, player = getMyRole(), isOriginator = true) {
      const card = CARDS_DB[cardId];
      if (!card) return;
      const opp = (player === 'p1') ? 'p2' : 'p1';
      const name = card.name || card.id;

      const bloodReq = card.bloodCost || (name === 'Salasso Crudele' || card.id === 'spell_bloodsurge' ? 2 : 0);
      if (isOriginator) {
        if (battleState[player].mana < card.cost) return showToast("Mana insufficiente!");
        if (bloodReq > 0 && battleState[player].blood < bloodReq) {
          return showToast(\`\${card.name} richiede almeno \${bloodReq} 🩸 Sangue!\`);
        }
        const sq = document.querySelector(\`.square[data-index="\${targetIdx}"]\`);
        if (!sq || !sq.classList.contains('highlight-spell-target')) return;

        battleState[player].mana -= card.cost;
        if (bloodReq > 0) battleState[player].blood -= bloodReq;
        battleState[player].hand.splice(battleState.selectedHandIndex, 1);
        battleState.selectedHandIndex = null;
      } else {
        battleState[player].mana -= card.cost;
        if (bloodReq > 0) battleState[player].blood -= bloodReq;
        const hIdx = battleState[player].hand.indexOf(cardId);
        if (hIdx !== -1) battleState[player].hand.splice(hIdx, 1);
      }
      if (!battleState[player].graveyard) battleState[player].graveyard = [];
      battleState[player].graveyard.push(cardId);

      addLog(\`\${player.toUpperCase()} lancia Sortilegio: \${card.name} su cella \${targetIdx}\`, player);

      animateCardPlayed(card, () => {
        const target = battleState.grid[targetIdx];

        if ((name === 'Frantumare la Pietra' || card.id === 'spell_cleave') && target) {
          const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
          const cr = commIdx !== -1 ? Math.floor(commIdx / 8) : 0;
          const cc = commIdx !== -1 ? commIdx % 8 : 0;
          const tr = Math.floor(targetIdx / 8), tc = targetIdx % 8;
          const dist = Math.max(Math.abs(tr - cr), Math.abs(tc - cc));
          const isImmune = (target.name === 'Monolito di Basalto' || target.cardId === 'altar_stone' || target.name === 'Cattedrale Sbarrata' || (target.desc && target.desc.includes('non bersagliabile da Frantumare')));

          if (dist > 4) {
            addLog(\`Frantumare la Pietra fallito: \${target.name} è a distanza \${dist} (portata max 4 caselle dal Comandante)!\`, 'sys');
          } else if (isImmune) {
            addLog(\`Frantumare la Pietra inefficace: \${target.name} è immune a sortilegi diretti!\`, 'sys');
          } else {
            addLog(\`Frantumare la Pietra polverizza istantaneamente \${target.name}!\`, 'sys');
            target.hp = 0;
            handlePieceDefeated(targetIdx, player);
          }
        } else if (name === 'Rito di Comunione') {
          const commHp = battleState[player].hp;
          const cardsToDraw = commHp < 10 ? 3 : 2;
          for (let i = 0; i < cardsToDraw; i++) drawCard(player);
          addLog(\`Rito di Comunione: \${player.toUpperCase()} pesca \${cardsToDraw} carte!\`, player);
        } else if (name === 'Giuramento Ancestrale') {
          for (let i = 0; i < 3; i++) drawCard(player);
          battleState[player].hp = Math.min(20, battleState[player].hp + 4);
          const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
          if (commIdx !== -1) battleState.grid[commIdx].hp = Math.min(20, battleState.grid[commIdx].hp + 4);
          addLog(\`Giuramento Ancestrale: \${player.toUpperCase()} pesca 3 carte e rigenera 4 PV al Comandante!\`, player);
        } else if (name === 'Patto della Pira') {
          battleState[player].hp -= 2;
          battleState[player].blood += 3;
          battleState[player].actions += 1;
          const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
          if (commIdx !== -1) battleState.grid[commIdx].hp -= 2;
          addLog(\`Patto della Pira: -2 PV Comandante, +3 Sangue e +1 Azione Tattica!\`, player);
        } else if (name === 'Vortice Temporale') {
          battleState[player].actions += 1;
          addLog(\`Vortice Temporale: +1 Azione Tattica per \${player.toUpperCase()}!\`, player);
        } else if (name === "Scudo d'Ossidiana") {
          battleState[player].hp = Math.min(20, battleState[player].hp + 3);
          const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
          if (commIdx !== -1) {
            battleState.grid[commIdx].hp = Math.min(20, battleState.grid[commIdx].hp + 3);
            battleState.grid[commIdx].hasTotalShield = true;
          }
          addLog(\`Scudo d'Ossidiana: Comandante curato di 3 PV e protetto da Scudo Totale!\`, player);
        } else if (name === 'Muraglia di Scudi') {
          battleState[player].muragliaScudiActive = true;
          addLog(\`Muraglia di Scudi: tutte le unità alleate ottengono +1 armatura per 1 round!\`, player);
        } else if (name === "Tempra d'Acciaio" && target) {
          target.armor = (target.armor || 0) + 1;
          addLog(\`Tempra d'Acciaio: +1 armatura permanente a \${target.name} (Armatura: \${target.armor})!\`, player);
        } else if (name === "Tempra d'Ossidiana" && target) {
          target.tempArmor = (target.tempArmor || 0) + 2;
          addLog(\`Tempra d'Ossidiana: +2 armatura temporanea a \${target.name}!\`, player);
        } else if (name === 'Bolla Sfasante' && target) {
          target.immunePhysical = true;
          target.exhausted = true;
          addLog(\`Bolla Sfasante: \${target.name} è immune ai danni fisici per 1 turno!\`, player);
        } else if (name === 'Fendenti Incrociati') {
          battleState[player].fendentiIncrociati = true;
          addLog(\`Fendenti Incrociati attivo: +2 danni extra da Flanking in questo turno!\`, player);
        } else if (name === 'Offerta Funebre' && target) {
          target.hp = 0;
          handlePieceDefeated(targetIdx, player);
          battleState[player].blood += 3;
          drawCard(player);
          addLog(\`Offerta Funebre sacrifica \${target.name}: +3 Sangue e 1 carta pescata!\`, player);
        } else if (name === "Offerta d'Ossa" && target) {
          target.hp = 0;
          handlePieceDefeated(targetIdx, player);
          battleState[player].blood += 2;
          drawCard(player); drawCard(player);
          addLog(\`Offerta d'Ossa sacrifica \${target.name}: +2 Sangue e 2 carte pescate!\`, player);
        } else if (name === 'Bastione Spezzato' && target) {
          target.hp = 0;
          handlePieceDefeated(targetIdx, player);
          drawCard(player); drawCard(player);
          addLog(\`Bastione Spezzato demolisce \${target.name}: +2 carte pescate!\`, player);
        } else if (name === 'Festino Macabro') {
          let sacCount = 0;
          battleState.grid.forEach((p, idx) => {
            if (p && p.owner === player && p.type === 'unit' && p.cost && p.cost <= 1) {
              p.hp = 0;
              handlePieceDefeated(idx, player);
              sacCount++;
            }
          });
          const healAmt = sacCount * 3;
          battleState[player].hp = Math.min(20, battleState[player].hp + healAmt);
          const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
          if (commIdx !== -1) battleState.grid[commIdx].hp = Math.min(20, battleState.grid[commIdx].hp + healAmt);
          addLog(\`Festino Macabro sacrifica \${sacCount} pedine minori (+ \${healAmt} PV al Comandante)!\`, player);
        } else if (name === 'Editto di Confisca') {
          const drainKey = (opp === 'p1') ? 'nextTurnManaDrainP1' : 'nextTurnManaDrainP2';
          battleState[drainKey] = (battleState[drainKey] || 0) + 1;
          addLog(\`Editto di Confisca: \${opp.toUpperCase()} subirà -1 Mana al prossimo turno!\`, player);
        } else if (name === 'Sigillo di Confisca') {
          const stolen = Math.min(2, battleState[opp].blood);
          battleState[opp].blood -= stolen;
          battleState[player].blood += stolen;
          if (stolen < 2) {
            const dmg = (2 - stolen) * 2;
            battleState[opp].hp -= dmg;
            addLog(\`Sigillo di Confisca ruba \${stolen} Sangue e infligge \${dmg} danni al Comandante avversario!\`, player);
          } else {
            addLog(\`Sigillo di Confisca ruba 2 Sangue all'avversario!\`, player);
          }
        } else if (name === 'Confisca Totale') {
          const drained = battleState[opp].blood;
          battleState[opp].blood = 0;
          const healAmt = drained * 2;
          battleState[player].hp = Math.min(20, battleState[player].hp + healAmt);
          const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
          if (commIdx !== -1) battleState.grid[commIdx].hp = Math.min(20, battleState.grid[commIdx].hp + healAmt);
          addLog(\`Confisca Totale: prosciugati \${drained} Sangue nemico (+ \${healAmt} PV al Comandante)!\`, player);
        } else if ((name === 'Genio del Geniere' || card.id === 'spell_fortify') && target) {
          const healAmount = target.type === 'altar' ? 3 : 2;
          target.hp += healAmount;
          addLog(\`\${target.name} ottiene +\${healAmount} PV da Genio del Geniere (PV: \${target.hp})\`, 'sys');
        } else if (name === 'Rinforzo dei Plinti' && target) {
          target.hp += 3;
          addLog(\`Rinforzo dei Plinti ripristina 3 PV a \${target.name} (PV: \${target.hp})!\`, 'sys');
        } else if (name === 'Riparazione di Garek' && target) {
          target.hp += 4;
          addLog(\`Riparazione di Garek ripristina 4 PV a \${target.name} (PV: \${target.hp})!\`, 'sys');
        } else if (name === "Saldata d'Urgenza" && target) {
          target.hp += 3;
          addLog(\`Saldata d'Urgenza ripristina 3 PV a \${target.name} (PV: \${target.hp})!\`, 'sys');
        } else if ((name === 'Carica Sfondante' || card.id === 'spell_push') && target) {
          pushPiece(targetIdx, 2, player);
        } else if (name === 'Marcia Forzata' || card.id === 'spell_heal') {
          if (target) {
            target.hp += 2;
            addLog(\`Marcia Forzata rinvigorisce \${target.name} (+2 PV)\`, 'sys');
          }
        } else if ((name === 'Salasso Crudele' || card.id === 'spell_bloodsurge') && target) {
          target.hp -= 3;
          addLog(\`\${target.name} subisce 3 danni da Salasso Crudele (PV residui: \${target.hp})\`, 'sys');
          if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
        } else if (name === 'Castigo della Legge' && target) {
          target.hp -= 4;
          target.noBloodReward = true;
          addLog(\`Castigo della Legge punisce \${target.name} (-4 PV, nessun Sangue concesso)!\`, player);
          if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
        } else if (name === 'Verdetto Immediato' && target) {
          target.hp -= 3;
          addLog(\`Verdetto Immediato colpisce \${target.name} (-3 PV)!\`, player);
          if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
        } else if (name === 'Martellata Sismica' && target) {
          target.hp -= 3;
          addLog(\`Martellata Sismica demolisce \${target.name} (-3 PV)!\`, player);
          if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
        } else if (name === 'Eruzione di Scorie Rapida' && target) {
          target.hp = 0;
          handlePieceDefeated(targetIdx, player);
          getAdjs(targetIdx).forEach(adj => {
            const p = battleState.grid[adj];
            if (p && p.owner === opp) {
              p.hp -= 4;
              addLog(\`Eruzione di Scorie devasta \${p.name} (-4 PV)!\`, 'sys');
              if (p.hp <= 0) handlePieceDefeated(adj, player);
            }
          });
        } else if ((name === "Fusione d'Emergenza" || name === 'Fusione di Emergenza') && target) {
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
          addLog(\`Fusione d'Emergenza fonde \${target.name} (+2 carte pescate, 2 danni attorno)!\`, player);
        } else if ((name === 'Riciclo Metalli' || name === 'Riciclo Istantaneo') && target) {
          target.hp = 0;
          handlePieceDefeated(targetIdx, player);
          battleState[player].mana += 2;
          addLog(\`Riciclo Metalli demolisce \${target.name} (+2 Mana immediati)!\`, player);
        } else if (name === 'Saccheggio Rapido') {
          battleState[player].mana += 2;
          addLog(\`Saccheggio Rapido incassa +2 Mana immediati!\`, player);
        } else if (name === 'Sguardo del Monolito' && target) {
          target.frozen = true;
          target.exhausted = true;
          addLog(\`Sguardo del Monolito pietrifica \${target.name} per 1 round!\`, player);
        } else if (name === 'Nube di Larve' && target) {
          target.range = 1;
          addLog(\`Nube di Larve acceca \${target.name}: gittata ridotta a 1!\`, player);
        } else if (name === 'Catene di Braci' && target) {
          target.rooted = true;
          addLog(\`Catene di Braci immobilizzano \${target.name}!\`, player);
        } else if (name === 'Anatema del Silenzio' && target) {
          target.silenced = true;
          target.desc = 'Silenziato: tutte le abilità e passive sono annullate.';
          addLog(\`Anatema del Silenzio annulla le abilità di \${target.name}!\`, player);
        } else if (name === 'Voto di Silenzio') {
          battleState.votoSilenzioActive = true;
          addLog(\`Voto di Silenzio attivo: sortilegi non-reazione bloccati per 1 round!\`, player);
        } else if (name === 'Sigillo di Kael') {
          battleState[opp].ritesBlocked = true;
          addLog(\`Sigillo di Kael: Riti d'Armi dell'avversario bloccati per 1 round!\`, player);
        } else if (name === 'Nebbia di Guerra') {
          battleState.nebbiaGuerraActive = true;
          addLog(\`Nebbia di Guerra: attacchi a distanza impediti per 1 round!\`, player);
        } else if (name === 'Furia dei Relitti' || card.id === 'spell_wrath') {
          const commIdx = battleState.grid.findIndex(p => p && p.owner === player && p.type === 'commander');
          if (commIdx !== -1) {
            getAdjs(commIdx).forEach(adj => {
              const p = battleState.grid[adj];
              if (p && p.owner === opp) {
                p.hp -= 2;
                addLog(\`Furia dei Relitti colpisce \${p.name} (-2 PV)\`, 'sys');
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
                  addLog(\`Collasso di Marea investe \${p.name} (-2 PV)!\`, 'sys');
                  if (p.hp <= 0) handlePieceDefeated(adj, player);
                }
              });
            }
          });
        } else if (name === 'Salasso di Massa') {
          battleState.grid.forEach((p, idx) => {
            if (p && p.hp > 0 && p.hp < 3) {
              p.hp -= 1;
              addLog(\`Salasso di Massa ferisce \${p.name} (-1 PV)!\`, 'sys');
              if (p.hp <= 0) handlePieceDefeated(idx, player);
            }
          });
        } else if (name === 'Carne Putrida' && target) {
          target.hp += 2;
          target.att = Math.max(0, target.att - 1);
          addLog(\`Carne Putrida rinvigorisce \${target.name} (+2 PV, -1 ATT)!\`, player);
        } else if (name === 'Rinvigorire' && target) {
          target.exhausted = false;
          addLog(\`Rinvigorire restituisce l'azione a \${target.name}!\`, player);
        } else if (name === 'Manto di Marmo' && target) {
          target.hasTotalShield = true;
          addLog(\`Manto di Marmo conferisce Scudo Totale a \${target.name}!\`, player);
        } else if (name === 'Frantumare la Corazza' && target) {
          target.armor = 0;
          target.tempArmor = 0;
          addLog(\`Frantumare la Corazza distrugge l'armatura di \${target.name}!\`, player);
        } else if (name === 'Gettata di Ghisa' && target) {
          target.hp -= 2;
          target.rooted = true;
          addLog(\`Gettata di Ghisa infligge 2 danni e blocca \${target.name}!\`, player);
          if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
        } else if (name === 'Contagio' && target) {
          target.hp -= 1;
          addLog(\`Contagio infetta \${target.name} (-1 PV)\`, player);
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
        } else if (name === "Manto d'Ossidiana" && target) {
          target.immunePush = true;
          addLog(\`Manto d'Ossidiana rende \${target.name} immune a spinte e urti!\`, player);
        } else if (name === 'Comando di Trincea') {
          battleState[player].trinceaActive = true;
          addLog(\`Comando di Trincea azzera i danni a distanza vicino agli Altari!\`, player);
        } else if (name === 'Formazione a Testuggine') {
          battleState[player].testuggineActive = true;
          addLog(\`Formazione a Testuggine attiva (+1 armatura alleati adiacenti)!\`, player);
        } else if (name === 'Marea Crescente') {
          battleState[player].mareaCrescente = true;
          addLog(\`Marea Crescente conferisce +1 passo ai movimenti diagonali!\`, player);
        } else if (name === 'Prisma di Distorsione') {
          battleState[player].prismaDistorsione = true;
          addLog(\`Prisma di Distorsione: +1 gittata a tutti gli attacchi a distanza alleati!\`, player);
        } else if ((name === 'Trazione Forzata' || card.id === 'spell_pull_ally' || name === 'Singolarità Tascabile' || card.id === 'spell_pull_commander') && target) {
          const targetAllyType = (name === 'Singolarità Tascabile' || card.id === 'spell_pull_commander') ? 'commander' : 'nearest';
          pullPiece(targetIdx, 2, player, null, targetAllyType);
        } else if (name === 'Barricata Improvvisata' || name === 'Fucina da Campo' || card.id === 'spell_barricade') {
          if (!battleState.grid[targetIdx]) {
            const isForge = name === 'Fucina da Campo';
            const wallPiece = {
              owner: player,
              type: 'wall',
              cardId: isForge ? 'fucina_da_campo' : 'barricata_improvvisata',
              name: isForge ? 'Blocco di Scorie' : 'Muro di Detriti',
              hp: isForge ? 4 : 3,
              att: 0,
              move: 'none',
              range: 0,
              glyph: '🧱',
              desc: isForge ? "Blocco di Scorie solido (0 ATT / 4 PV). Struttura impassabile." : "Muro di Detriti solido (0 ATT / 3 PV). Struttura difensiva impassabile.",
              rarity: 'common',
              exhausted: true
            };
            battleState.grid[targetIdx] = wallPiece;
            addLog(\`\${player.toUpperCase()} erige \${wallPiece.name} (\${wallPiece.hp} PV) sulla cella \${targetIdx}!\`, player);
            showCollisionPopup(targetIdx, "🧱 BARRICATA!", \`\${wallPiece.name} (\${wallPiece.hp} PV)\`);
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
            addLog(\`Spaccatura Terrestre apre una Voragine permanente su cella \${targetIdx}!\`, player);
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
          addLog(\`Marea di Larve evoca \${toSpawn} Larvoni Infetti con Slancio!\`, player);
        } else if (name === 'Pietrificazione' && target) {
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
          addLog(\`Pietrificazione trasforma \${target.name} in un solido Muro di Pietra!\`, player);
        } else if (target && target.owner === opp) {
          target.hp -= 2;
          addLog(\`\${target.name} subisce 2 danni da \${card.name}!\`, 'sys');
          if (target.hp <= 0) handlePieceDefeated(targetIdx, player);
        }

        if (isP2P && isOriginator) {
          sendNetMsg({ type: 'ACTION_SPELL', targetIdx, cardId, player });
        }

        clearHighlights();
        renderPieces();
        updateHUD();
        renderHand();
        checkWin();
      });
    }`;

html = html.replace(oldExecuteSpellActionBlock, newExecuteSpellActionBlock);
console.log('3. executeSpellAction updated.');

// 4. DEATH HANDLER (handlePieceDefeated)
const oldDeathHandler = `    function handlePieceDefeated(idx, killerOwner) {
      const piece = battleState.grid[idx];
      if (!piece) return;

      battleState.grid[idx] = null;
      const isAltarBlood = piece.cardId === 'altar_blood' || piece.name === 'Altare del Sangue';
      
      // Calcolo ricompensa Sangue calibrata:
      // Truppe leggere (costo 1-2 o pedine base): +1 Sangue a chi uccide
      // Altari, Colossi o Truppe pesanti (costo 3+): +2 Sangue a chi uccide
      // Altare del Sangue conferisce +1 Sangue bonus
      const isHeavy = piece.type === 'altar' || (piece.cost && piece.cost >= 3) || piece.type === 'commander';
      let bloodReward = isHeavy ? 2 : 1;
      if (isAltarBlood) bloodReward += 1;

      // Inserisce il pezzo nel cimitero del suo proprietario
      if (piece.owner && piece.type !== 'commander' && piece.type !== 'wall') {
        const pOwner = piece.owner;
        if (!battleState[pOwner].graveyard) battleState[pOwner].graveyard = [];
        const deadCardId = piece.cardId || piece.name;
        if (deadCardId) battleState[pOwner].graveyard.push(deadCardId);
      }

      if (killerOwner === 'p1') {
        battleState.p1.blood += bloodReward;
        battleState.p2.blood += 1;
        addLog(\`\${piece.name} distrutto! P1 ottiene +\${bloodReward} Sangue, P2 riceve +1 Sangue\`, 'sys');
      } else {
        battleState.p2.blood += bloodReward;
        battleState.p1.blood += 1;
        addLog(\`\${piece.name} distrutto! P2 ottiene +\${bloodReward} Sangue, P1 riceve +1 Sangue\`, 'sys');
      }

      if (piece.type === 'altar') {
        recalculatePlayerMaxMana(piece.owner);
        addLog(\`Altare di \${piece.owner.toUpperCase()} distrutto! Riserva Mana massimo ridotta a \${battleState[piece.owner].maxMana}.\`, 'sys');
      }
    }`;

const newDeathHandler = `    function handlePieceDefeated(idx, killerOwner) {
      const piece = battleState.grid[idx];
      if (!piece) return;

      battleState.grid[idx] = null;
      const pOwner = piece.owner;
      const name = piece.name || piece.cardId || '';
      const desc = piece.desc ? piece.desc.toLowerCase() : '';

      // 1. INNESCHI ALLA MORTE (DEATH TRIGGERS)
      if (name === 'Guscio Esplosivo' || desc.includes('detonazione: alla morte infligge 2 danni a tutte le 4 caselle ortogonali')) {
        getOrthAdjs(idx).forEach(adj => {
          const p = battleState.grid[adj];
          if (p) {
            p.hp -= 2;
            addLog(\`Guscio Esplosivo deflagra colpendo \${p.name} (-2 PV)!\`, 'sys');
            if (p.hp <= 0) handlePieceDefeated(adj, killerOwner);
          }
        });
      } else if (name === 'Guscio di Morbida' || desc.includes('detonazione diagonale')) {
        getDiagAdjs(idx).forEach(adj => {
          const p = battleState.grid[adj];
          if (p) {
            p.hp -= 2;
            addLog(\`Guscio di Morbida esplode in diagonale colpendo \${p.name} (-2 PV)!\`, 'sys');
            if (p.hp <= 0) handlePieceDefeated(adj, killerOwner);
          }
        });
      } else if (name === 'Scoppio di Caldaia' || desc.includes('alla distruzione di un automa, infligge 3 danni ad area')) {
        getAdjs(idx).forEach(adj => {
          const p = battleState.grid[adj];
          if (p) {
            p.hp -= 3;
            addLog(\`Scoppio di Caldaia devasta l'area colpendo \${p.name} (-3 PV)!\`, 'sys');
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
            addLog(\`Kamikaze di Braci detona frontalmente su \${p.name} (-3 PV)!\`, 'sys');
            if (p.hp <= 0) handlePieceDefeated(frontIdx, killerOwner);
          }
        }
      }

      // Pescaggi alla morte
      if (name === 'Monaco Mendicante' || desc.includes('fa pescare 1 carta al controllore quando viene distrutto')) {
        drawCard(pOwner);
        addLog(\`Monaco Mendicante concede l'Elemosina: \${pOwner.toUpperCase()} pesca 1 carta!\`, 'sys');
      } else if (name === 'Monaco Eremita') {
        drawCard(pOwner); drawCard(pOwner);
        addLog(\`Monaco Eremita concede l'Elemosina: \${pOwner.toUpperCase()} pesca 2 carte!\`, 'sys');
      }

      // Cure alla morte
      if (name === 'Chierico Errante') {
        battleState[pOwner].hp = Math.min(20, battleState[pOwner].hp + 3);
        const commIdx = battleState.grid.findIndex(p => p && p.owner === pOwner && p.type === 'commander');
        if (commIdx !== -1) battleState.grid[commIdx].hp = Math.min(20, battleState.grid[commIdx].hp + 3);
        addLog(\`Chierico Errante esala l'ultimo respiro curando di 3 PV il Comandante \${pOwner.toUpperCase()}!\`, 'sys');
      } else if (name === 'Monaco Errante') {
        getAdjs(idx).forEach(adj => {
          const ally = battleState.grid[adj];
          if (ally && ally.owner === pOwner && ally.type !== 'altar') {
            ally.hp += 2;
            addLog(\`Monaco Errante guarisce \${ally.name} di 2 PV prima di cadere!\`, 'sys');
          }
        });
      }

      // Macerie e Voragini alla morte
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
          desc: "Blocco di Scorie (0 ATT / 2 PV). Ostacolo solido impassabile.",
          rarity: 'common',
          exhausted: true
        };
        addLog(\`Rottame Semovente collassa lasciando un Blocco di Scorie (2 PV)!\`, 'sys');
      } else if (name === "Puntone d'Ossidiana") {
        battleState.grid[idx] = {
          owner: pOwner,
          type: 'wall',
          cardId: 'blocco_ossidiana',
          name: "Blocco d'Ossidiana",
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
        addLog(\`Il crollo di \${name} apre una Voragine permanente!\`, 'sys');
      }

      // Effetti avversi alla morte
      if (name === 'Vena Tettorica Instabile' && killerOwner !== pOwner) {
        battleState[pOwner].hp -= 2;
        const cIdx = battleState.grid.findIndex(p => p && p.owner === pOwner && p.type === 'commander');
        if (cIdx !== -1) battleState.grid[cIdx].hp -= 2;
        addLog(\`Vena Tettorica Instabile esplode infliggendo 2 danni al Comandante \${pOwner.toUpperCase()}!\`, 'sys');
      }

      // Passiva Comandante Ignis (+1 ATT per ogni Altare alleato distrutto)
      const commIdx = battleState.grid.findIndex(p => p && p.owner === pOwner && p.type === 'commander');
      if (commIdx !== -1) {
        const comm = battleState.grid[commIdx];
        if ((comm.name === 'Ignis' || comm.cardId === 'ignis') && piece.type === 'altar') {
          comm.att = (comm.att || 3) + 1;
          addLog(\`Ignis assorbe l'essenza dell'Altare distrutto: +1 ATT permanente (ATT: \${comm.att})!\`, pOwner);
        }
      }

      // Calcolo Sangue addizionale
      let extraBlood = 0;
      if (name === 'Sepolcro delle Ceneri Calde') extraBlood += 2;
      if (name === 'Verme Sepolcrale') extraBlood += 1;
      if (name === 'Altare dei Sacrifici' && killerOwner === pOwner) extraBlood += 3;
      const isAltarBlood = piece.cardId === 'altar_blood' || piece.name === 'Altare del Sangue';
      if (isAltarBlood) extraBlood += 1;

      const isHeavy = piece.type === 'altar' || (piece.cost && piece.cost >= 3) || piece.type === 'commander';
      let killerBlood = isHeavy ? 2 : 1;
      let ownerBlood = 1 + extraBlood;

      if (piece.noBloodReward) killerBlood = 0;

      if (piece.owner && piece.type !== 'commander' && piece.type !== 'wall') {
        if (!battleState[pOwner].graveyard) battleState[pOwner].graveyard = [];
        const deadCardId = piece.cardId || piece.name;
        if (deadCardId) battleState[pOwner].graveyard.push(deadCardId);
      }

      if (killerOwner) {
        battleState[killerOwner].blood += killerBlood;
        if (killerBlood > 0) addLog(\`\${killerOwner.toUpperCase()} ottiene +\${killerBlood} Sangue\`, 'sys');
      }
      if (pOwner && pOwner !== killerOwner) {
        battleState[pOwner].blood += ownerBlood;
        addLog(\`\${pOwner.toUpperCase()} riceve +\${ownerBlood} Sangue per la caduta di \${piece.name}\`, 'sys');
      }

      if (piece.type === 'altar') {
        recalculatePlayerMaxMana(piece.owner);
        addLog(\`Altare di \${piece.owner.toUpperCase()} distrutto! Riserva Mana massimo ridotta a \${battleState[piece.owner].maxMana}.\`, 'sys');
      }
    }`;

if (!html.includes(oldDeathHandler)) {
  console.error('ERROR: oldDeathHandler not found in index.html!');
  process.exit(1);
}
html = html.replace(oldDeathHandler, newDeathHandler);
console.log('4. handlePieceDefeated updated.');

// 5. COMBAT ATTACK ACTION (executeAttackAction)
const oldAttackStart = `    function executeAttackAction(from, to, player = getMyRole(), isOriginator = true) {`;
const oldAttackEnd = `      if (isP2P && isOriginator) {
        sendNetMsg({ type: 'ACTION_ATTACK', from, to, player });
      }
    }`;

const attackIdx1 = html.indexOf(oldAttackStart);
const attackIdx2 = html.indexOf(oldAttackEnd, attackIdx1);

if (attackIdx1 === -1 || attackIdx2 === -1) {
  console.error('ERROR: executeAttackAction bounds not found!');
  process.exit(1);
}

const oldAttackBlock = html.substring(attackIdx1, attackIdx2 + oldAttackEnd.length);

const newAttackBlock = `    function executeAttackAction(from, to, player = getMyRole(), isOriginator = true) {
      const att = battleState.grid[from];
      const def = battleState.grid[to];
      if (!att || !def) return;

      battleState.selectedSquare = null;
      clearHighlights();

      let damage = att.att;
      const attDesc = (att.desc || '').toLowerCase();
      const defDesc = (def.desc || '').toLowerCase();
      const isStructure = def.type === 'altar' || def.type === 'wall' || (def.desc && def.desc.includes('Muro'));

      // 1. Anti-Structure / Sfondamento
      if (isStructure) {
        if (att.name === 'Ariete da Breccia') {
          damage = 6;
          addLog(\`Ariete da Breccia applica Sfondamento: 6 danni diretti alla struttura!\`, player);
        } else if (att.name === 'Ariete Cataclismatico') {
          damage = 8;
          addLog(\`Ariete Cataclismatico applica Sfondamento: 8 danni diretti all'Altare!\`, player);
        } else if (attDesc.includes('sfondamento') || attDesc.includes('muri e altari')) {
          damage *= 2;
          addLog(\`Sfondamento: danni raddoppiati contro struttura (\${damage} danni)!\`, player);
        }
      }

      // 2. Flanking / Aggiramento Tattico
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
          addLog(\`⚔️ AGGIRAMENTO TATTICO (FLANKING)! +\${flankingBonus} danni inflitti a \${def.name}!\`, player);
        }
      }

      // 3. Scudo Totale & Immunità Difensiva
      if (def.hasTotalShield) {
        damage = 0;
        def.hasTotalShield = false;
        addLog(\`🛡️ SCUDO TOTALE ha assorbito completamente il colpo su \${def.name}!\`, 'sys');
      } else if (def.immunePhysical) {
        damage = 0;
        addLog(\`✨ BOLLA SFASANTE rende \${def.name} immune al danno fisico!\`, 'sys');
      } else {
        // 4. Armatura & Coperture
        let armor = 0;
        if (def.armor) armor += def.armor;
        if (def.tempArmor) armor += def.tempArmor;
        if (battleState[def.owner].muragliaScudiActive) armor += 1;
        if (defDesc.includes('armatura') && !def.armor) armor += 1;
        if (hasIronAltarProtection(to, def)) armor += 1;

        if (attDesc.includes("ignora l'armatura") || attDesc.includes('trapassano qualsiasi') || attDesc.includes('ignora la riduzione')) {
          addLog(\`\${att.name} ignora le armature nemiche!\`, player);
          armor = 0;
        }

        if (armor > 0) {
          const absorbed = Math.min(damage - 1, armor);
          if (absorbed > 0) {
            damage -= absorbed;
            addLog(\`Armatura protegge \${def.name}: -\${absorbed} danno assorbito (subisce \${damage} danni)!\`, 'sys');
          }
        }
      }

      addLog(\`\${att.name} attacca \${def.name} infliggendo \${damage} danni\`, player);
      def.hp -= damage;

      if (att.cardId === 'colossus' || att.name === 'Colosso di Basalto') {
        pushPiece(to, 1, att.owner);
      }

      if (def.hp <= 0) {
        handlePieceDefeated(to, att.owner);
      } else {
        // 5. Contrattacco & Presidio
        const dist = Math.max(Math.abs(Math.floor(from/8) - Math.floor(to/8)), Math.abs((from%8) - (to%8)));
        const isRangedAttacker = (att.range && att.range > 1) && dist > 1;
        const defCannotCounter = defDesc.includes('non può contrattaccare') || defDesc.includes('non contrattacca');

        if (!defCannotCounter && (!isRangedAttacker || def.range >= dist || def.cardId === 'halberdier' || def.name === "Alabardiere d'Élite")) {
          let counterDmg = def.att;
          if (defDesc.includes('presidio') && counterDmg === 0) {
            counterDmg = 2; // Presidio contrattacca a 2 ATT
          }
          if (def.name === 'Campione del Bastione' && def.hp <= 2) counterDmg = 4;
          if (def.name === 'Guardiano della Fucina' && getAdjs(to).some(adj => battleState.grid[adj]?.type === 'altar')) counterDmg = 4;
          if (def.name === 'Duellante Sfregiato' && def.hp <= 2) counterDmg = 4;
          if (getAdjs(to).some(adj => battleState.grid[adj]?.name === 'Altare della Fortezza')) counterDmg += 1;

          let attArmor = (att.armor || 0) + (att.tempArmor || 0);
          if (battleState[att.owner].muragliaScudiActive) attArmor += 1;
          if (attDesc.includes('armatura') && !att.armor) attArmor += 1;
          if (hasIronAltarProtection(from, att)) attArmor += 1;
          if (attArmor > 0) counterDmg = Math.max(0, counterDmg - attArmor);

          att.hp -= counterDmg;
          addLog(\`\${def.name} contrattacca infliggendo \${counterDmg} danni a \${att.name}\`, 'sys');
          if (att.hp <= 0) {
            handlePieceDefeated(from, def.owner);
          }
        } else {
          addLog(\`\${att.name} attacca a distanza senza subire contrattacco!\`, 'sys');
        }
      }

      if (battleState.grid[from]) battleState.grid[from].exhausted = true;
      battleState[player].actions--;
      renderPieces();
      updateHUD();
      checkWin();

      if (isP2P && isOriginator) {
        sendNetMsg({ type: 'ACTION_ATTACK', from, to, player });
      }
    }`;

html = html.replace(oldAttackBlock, newAttackBlock);
console.log('5. executeAttackAction updated.');

// 6. TURN HOOKS (handleTurnEndFor & startTurnFor)
const oldEndTurnBlock = `    function endTurnP1() {
      const role = getMyRole();
      if (battleState.turn !== role) return showToast("Non è il tuo turno!");

      addLog(\`--- FINE TURNO \${role.toUpperCase()} ---\`, role);

      const commIdx = battleState.grid.findIndex(p => p && p.owner === role && p.type === 'commander');
      if (commIdx !== -1) {
        getAdjs(commIdx).forEach(adj => {
          const u = battleState.grid[adj];
          if (u && u.owner === role && (u.cardId === 'cleric' || u.name === 'Chierico del Crepuscolo')) {
            battleState.grid[commIdx].hp = Math.min(battleState[role].commander.hp, battleState.grid[commIdx].hp + 2);
            addLog(\`Chierico del Crepuscolo guarisce il Comandante \${role.toUpperCase()} di 2 PV!\`, role);
          }
        });
      }

      const nextTurn = (role === 'p1') ? 'p2' : 'p1';
      if (isP2P) {
        sendNetMsg({ type: 'SYNC_END_TURN', nextTurn });
        showToast("Turno avversario...");
      }

      startTurnFor(nextTurn);
    }

    function startTurnFor(nextTurn) {
      battleState.turn = nextTurn;
      battleState.turnPhase = 1;
      battleState[nextTurn].actions = 2;
      const drainKey = (nextTurn === 'p1') ? 'nextTurnManaDrainP1' : 'nextTurnManaDrainP2';
      recalculatePlayerMaxMana(nextTurn);
      battleState[nextTurn].mana = Math.max(0, battleState[nextTurn].maxMana - (battleState[drainKey] || 0));
      battleState[drainKey] = 0;
      battleState[nextTurn].altarDeployedThisTurn = false;

      battleState.grid.forEach(p => {
        if (p && p.owner === nextTurn) p.exhausted = false;
      });

      drawCard(nextTurn);
      updateHUD();
      updatePhaseUI();
      renderHand();
      renderPieces();`;

const newEndTurnBlock = `    function handleTurnEndFor(role) {
      const opp = (role === 'p1') ? 'p2' : 'p1';
      const commIdx = battleState.grid.findIndex(p => p && p.owner === role && p.type === 'commander');
      if (commIdx !== -1) {
        getAdjs(commIdx).forEach(adj => {
          const u = battleState.grid[adj];
          if (u && u.owner === role && (u.cardId === 'cleric' || u.name === 'Chierico del Crepuscolo')) {
            battleState.grid[commIdx].hp = Math.min(battleState[role].commander.hp, battleState.grid[commIdx].hp + 2);
            addLog(\`Chierico del Crepuscolo guarisce il Comandante \${role.toUpperCase()} di 2 PV!\`, role);
          }
        });
      }

      // Effetti a fine turno sulla scacchiera
      battleState.grid.forEach((p, idx) => {
        if (!p || p.owner !== role) return;
        const name = p.name || '';
        const desc = (p.desc || '').toLowerCase();

        // Torre degli Arpioni: trascina un nemico entro gittata 3 ortogonale verso di sé
        if (name === 'Torre degli Arpioni' || desc.includes('a fine turno trascina di 1 casella')) {
          const r = Math.floor(idx / 8), c = idx % 8;
          let enemyToPull = -1;
          for (let i = 0; i < 64; i++) {
            const ep = battleState.grid[i];
            if (ep && ep.owner === opp && ep.type !== 'altar' && ep.type !== 'wall') {
              const er = Math.floor(i / 8), ec = i % 8;
              const isOrth = (r === er || c === ec);
              const dist = Math.abs(r - er) + Math.abs(c - ec);
              if (isOrth && dist <= 3 && dist > 1) {
                enemyToPull = i;
                break;
              }
            }
          }
          if (enemyToPull !== -1) {
            pullPiece(enemyToPull, 1, role, null, 'nearest');
            addLog(\`Torre degli Arpioni trascina \${battleState.grid[enemyToPull]?.name} verso di sé!\`, role);
          }
        }

        // Vortice Tellurico: trascina nemico più vicino entro 3 passi
        if (name === 'Vortice Tellurico' || desc.includes('a fine turno trascina di 1 passo verso di sé')) {
          const r = Math.floor(idx / 8), c = idx % 8;
          let bestDist = Infinity, bestEnemy = -1;
          for (let i = 0; i < 64; i++) {
            const ep = battleState.grid[i];
            if (ep && ep.owner === opp && ep.type !== 'altar' && ep.type !== 'wall') {
              const er = Math.floor(i / 8), ec = i % 8;
              const d = Math.max(Math.abs(r - er), Math.abs(c - ec));
              if (d <= 3 && d < bestDist) {
                bestDist = d;
                bestEnemy = i;
              }
            }
          }
          if (bestEnemy !== -1) {
            pullPiece(bestEnemy, 1, role, null, 'nearest');
            addLog(\`Vortice Tellurico attira il nemico di 1 passo!\`, role);
          }
        }

        // Fornace Vivente di Ignis: 1 danno ad area attorno a sé
        if (name.includes('Fornace Vivente') || desc.includes('a fine turno infligge 1 danno ad area')) {
          getAdjs(idx).forEach(adj => {
            const ep = battleState.grid[adj];
            if (ep) {
              ep.hp -= 1;
              addLog(\`Fornace Vivente irradia calore su \${ep.name} (-1 PV)\`, role);
              if (ep.hp <= 0) handlePieceDefeated(adj, role);
            }
          });
        }
      });
    }

    function endTurnP1() {
      const role = getMyRole();
      if (battleState.turn !== role) return showToast("Non è il tuo turno!");

      addLog(\`--- FINE TURNO \${role.toUpperCase()} ---\`, role);
      handleTurnEndFor(role);

      const nextTurn = (role === 'p1') ? 'p2' : 'p1';
      if (isP2P) {
        sendNetMsg({ type: 'SYNC_END_TURN', nextTurn });
        showToast("Turno avversario...");
      }

      startTurnFor(nextTurn);
    }

    function startTurnFor(nextTurn) {
      battleState.turn = nextTurn;
      battleState.turnPhase = 1;
      battleState[nextTurn].actions = 2;
      const drainKey = (nextTurn === 'p1') ? 'nextTurnManaDrainP1' : 'nextTurnManaDrainP2';
      recalculatePlayerMaxMana(nextTurn);
      battleState[nextTurn].mana = Math.max(0, battleState[nextTurn].maxMana - (battleState[drainKey] || 0));
      battleState[drainKey] = 0;
      battleState[nextTurn].altarDeployedThisTurn = false;

      // Rimozione scadenze temporanee 1 round
      battleState[nextTurn].muragliaScudiActive = false;
      battleState[nextTurn].fendentiIncrociati = false;
      battleState[nextTurn].prismaDistorsione = false;
      battleState[nextTurn].mareaCrescente = false;
      battleState[nextTurn].trinceaActive = false;
      battleState[nextTurn].testuggineActive = false;
      battleState[nextTurn].ritesBlocked = false;
      battleState.votoSilenzioActive = false;
      battleState.nebbiaGuerraActive = false;

      battleState.grid.forEach(p => {
        if (!p) return;
        if (p.owner === nextTurn) {
          p.exhausted = false;
          p.tempArmor = 0;
          p.frozen = false;
          p.rooted = false;
          p.immunePhysical = false;

          const name = p.name || '';
          const desc = (p.desc || '').toLowerCase();

          // Altare del Patto di Sangue: -1 HP Comandante alleato
          if (name === 'Altare del Patto di Sangue' || desc.includes('subisci 1 danno a inizio turno')) {
            battleState[nextTurn].hp = Math.max(1, battleState[nextTurn].hp - 1);
            const commIdx = battleState.grid.findIndex(c => c && c.owner === nextTurn && c.type === 'commander');
            if (commIdx !== -1) battleState.grid[commIdx].hp = Math.max(1, battleState.grid[commIdx].hp - 1);
            addLog(\`Altare del Patto di Sangue: il Comandante \${nextTurn.toUpperCase()} subisce 1 danno vitale!\`, nextTurn);
          }

          // Il Cuore della Griglia: +1 Sangue
          if (name === 'Il Cuore della Griglia' || desc.includes('genera +1 sangue a inizio turno')) {
            battleState[nextTurn].blood += 1;
            addLog(\`Il Cuore della Griglia genera +1 Sangue per \${nextTurn.toUpperCase()}!\`, nextTurn);
          }

          // Colosso di Rame: +1 Mana
          if (name === 'Colosso di Rame' || desc.includes('genera anche +1 mana a inizio turno')) {
            battleState[nextTurn].mana += 1;
            addLog(\`Colosso di Rame genera +1 Mana per \${nextTurn.toUpperCase()}!\`, nextTurn);
          }

          // Sorgente Primordiale: rigenera 1 PV ad alleato adiacente con meno salute
          if (name === 'Sorgente Primordiale') {
            const pIdx = battleState.grid.indexOf(p);
            let lowestHp = Infinity, lowestAlly = null;
            getAdjs(pIdx).forEach(adj => {
              const ally = battleState.grid[adj];
              if (ally && ally.owner === nextTurn && ally.type !== 'altar' && ally.hp < lowestHp) {
                lowestHp = ally.hp;
                lowestAlly = ally;
              }
            });
            if (lowestAlly) {
              lowestAlly.hp += 1;
              addLog(\`Sorgente Primordiale rigenera 1 PV a \${lowestAlly.name}!\`, nextTurn);
            }
          }

          // Servo di Bronzo: ripara 1 PV ad automa alleato adiacente
          if (name === 'Servo di Bronzo') {
            const pIdx = battleState.grid.indexOf(p);
            getAdjs(pIdx).forEach(adj => {
              const ally = battleState.grid[adj];
              if (ally && ally.owner === nextTurn && (ally.desc?.includes('automa') || ally.name?.includes('Automa') || ally.type === 'altar')) {
                ally.hp += 1;
                addLog(\`Servo di Bronzo ripara 1 PV a \${ally.name}!\`, nextTurn);
              }
            });
          }

          // Forgiatore di Scaglie: conferisce Scudo Totale a un alleato adiacente
          if (name === 'Forgiatore di Scaglie') {
            const pIdx = battleState.grid.indexOf(p);
            getAdjs(pIdx).forEach(adj => {
              const ally = battleState.grid[adj];
              if (ally && ally.owner === nextTurn && !ally.hasTotalShield) {
                ally.hasTotalShield = true;
                addLog(\`Forgiatore di Scaglie protegge \${ally.name} con uno Scudo!\`, nextTurn);
              }
            });
          }
        }
      });

      drawCard(nextTurn);
      updateHUD();
      updatePhaseUI();
      renderHand();
      renderPieces();`;

if (!html.includes(oldEndTurnBlock)) {
  console.error('ERROR: oldEndTurnBlock not found in index.html!');
  process.exit(1);
}
html = html.replace(oldEndTurnBlock, newEndTurnBlock);
console.log('6. Turn hooks updated.');

// 7. HOOK AI TURN END
const oldAiTurnEnd = `            setTurnPhase(4, false);
            setTimeout(() => startTurnFor('p1'), 500);`;
const newAiTurnEnd = `            setTurnPhase(4, false);
            handleTurnEndFor('p2');
            setTimeout(() => startTurnFor('p1'), 500);`;
if (!html.includes(oldAiTurnEnd)) {
  console.error('ERROR: oldAiTurnEnd not found in index.html!');
  process.exit(1);
}
html = html.replace(oldAiTurnEnd, newAiTurnEnd);
console.log('7. AI turn end hook updated.');

// Convert back to CRLF if the original file had CRLF
if (hasCRLF) {
  html = html.replace(/\n/g, '\r\n');
}

// SYNTAX CHECK ON EXTRACTED JAVASCRIPT
console.log('Validating JavaScript syntax of modified index.html...');
const scriptStartTag = '<script>';
const scriptEndTag = '</script>';
const sStart = html.indexOf(scriptStartTag);
const sEnd = html.lastIndexOf(scriptEndTag);
if (sStart === -1 || sEnd === -1) {
  console.error('ERROR: Script tags not found!');
  process.exit(1);
}
const jsCode = html.substring(sStart + scriptStartTag.length, sEnd);

try {
  new Function(jsCode);
  console.log('JavaScript syntax validation: PASSED! ✅');
} catch (e) {
  console.error('JavaScript syntax validation FAILED:', e.message);
  process.exit(1);
}

// WRITE index.html with CRLF preservation
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully written to index.html.');

// WRITE crownfall.html with 100% byte-for-byte parity
fs.writeFileSync('crownfall.html', html, 'utf8');
console.log('Successfully copied to crownfall.html.');

const b1 = fs.readFileSync('index.html');
const b2 = fs.readFileSync('crownfall.html');
if (b1.equals(b2)) {
  console.log('PARITY VERIFICATION: index.html and crownfall.html are 100% IDENTICAL byte-for-byte! ✅');
} else {
  console.error('ERROR: Parity check failed!');
  process.exit(1);
}

console.log('ALL UNIFIED RULES INTEGRATED AND VERIFIED! 🎉');
