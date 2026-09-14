const fs = require('fs');

function applyMobileFixes(filename) {
  let content = fs.readFileSync(filename, 'utf8');

  // 1. UPDATE BATTLE HUD & TRACKER HTML
  const startMarker = '      <div class="battle-hud">';
  const endMarker = '      <div class="battle-arena-wrap">';

  const sIdx = content.indexOf(startMarker);
  const eIdx = content.indexOf(endMarker);

  if (sIdx === -1 || eIdx === -1) {
    console.error('Markers not found in ' + filename);
    return false;
  }

  const battleHudNew = `      <div class="battle-hud">
        <div class="battle-hud-players-row">
          <div class="player-hud-box">
            <span style="font-weight: 900; color: #9ec5fe;" id="hud-p1-name">P1</span>
            <span class="hud-stat mana">💧 <span id="hud-p1-mana">1</span>/4</span>
            <span class="hud-stat blood">🩸 <span id="hud-p1-blood">0</span></span>
            <span class="hud-stat actions"><span class="hud-actions-label">Azioni: </span>⚡ <span id="hud-p1-actions">2</span></span>
            <button class="btn-hud-pile" id="btn-hud-p1-deck" onclick="openDeckModal('p1')" title="Esamina carte rimaste nel tuo Grimorio">📚 <span id="hud-p1-deck-count">0</span></button>
            <button class="btn-hud-pile grave" id="btn-hud-p1-grave" onclick="openGraveyardModal('p1')" title="Esamina carte giocate e caduti nel tuo Cimitero">🪦 <span id="hud-p1-grave-count">0</span></button>
          </div>
          
          <div class="player-hud-box">
            <button class="btn-hud-pile grave" id="btn-hud-p2-grave" onclick="openGraveyardModal('p2')" title="Esamina Cimitero nemico">🪦 <span id="hud-p2-grave-count">0</span></button>
            <button class="btn-hud-pile" id="btn-hud-p2-deck" onclick="openDeckModal('p2')" title="Conteggio carte Grimorio nemico">📚 <span id="hud-p2-deck-count">0</span></button>
            <span class="hud-stat actions"><span class="hud-actions-label">P2: </span>⚡ <span id="hud-p2-actions">2</span></span>
            <span class="hud-stat blood">🩸 <span id="hud-p2-blood">0</span></span>
            <span class="hud-stat mana">💧 <span id="hud-p2-mana">1</span>/4</span>
            <span style="font-weight: 900; color: #f5a6b0;" id="hud-p2-name">P2</span>
          </div>
        </div>

        <div class="battle-hud-actions-row">
          <button class="btn btn-gold btn-hud-action" id="btn-rite-p1" onclick="useWeaponRiteP1()" onmouseenter="showRiteHoverCard(event)" onmousemove="updateHoverCardPos(event)" onmouseleave="hideHoverCard()">🩸 Rito d'Armi</button>
          <button class="btn btn-crimson btn-hud-action" id="btn-end-turn" onclick="advanceTurnPhase()">Passa a Fase 2 ⚔️</button>
          <button class="btn btn-crimson btn-surrender" id="btn-surrender" onclick="surrenderMatch()" title="Arrenditi ed esci dalla partita">🏳️ Resa</button>
        </div>
      </div>

      <!-- TRACKER DELLE FASI DEL TURNO -->
      <div class="turn-phase-tracker" id="turn-phase-tracker">
        <div class="phase-step active" id="phase-step-1" data-phase="1">
          <span class="phase-num">1</span>
          <span class="phase-label phase-label-full">1ª Fase: Mantenimento</span>
          <span class="phase-label phase-label-short">1: Mant.</span>
        </div>
        <div class="phase-arrow" id="phase-arrow-1">➔</div>
        <div class="phase-step" id="phase-step-2" data-phase="2">
          <span class="phase-num">2</span>
          <span class="phase-label phase-label-full">2ª Fase: Azioni / Movimento</span>
          <span class="phase-label phase-label-short">2: Azioni ⚔️</span>
        </div>
        <div class="phase-arrow" id="phase-arrow-2">➔</div>
        <div class="phase-step" id="phase-step-3" data-phase="3">
          <span class="phase-num">3</span>
          <span class="phase-label phase-label-full">3ª Fase: Mantenimento</span>
          <span class="phase-label phase-label-short">3: Mant.</span>
        </div>
        <div class="phase-arrow" id="phase-arrow-3">➔</div>
        <div class="phase-step" id="phase-step-4" data-phase="4">
          <span class="phase-num">4</span>
          <span class="phase-label phase-label-full">4ª Fase: Fine Turno</span>
          <span class="phase-label phase-label-short">4: Fine</span>
        </div>
      </div>\n\n`;

  content = content.slice(0, sIdx) + battleHudNew + content.slice(eIdx);

  fs.writeFileSync(filename, content, 'utf8');
  console.log('Battle HUD updated in ' + filename);
  return true;
}

applyMobileFixes('index.html');
applyMobileFixes('crownfall.html');
