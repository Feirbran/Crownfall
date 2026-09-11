const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Normalize line endings to LF for consistent matching
const isCRLF = content.includes('\r\n');
if (isCRLF) content = content.replace(/\r\n/g, '\n');

console.log('Original index.html lines:', content.split('\n').length);

// =========================================================================
// 1. UPDATE COMMANDERS_POOL: Blood costs 7-8 and Rite descriptions
// =========================================================================
const commandersOld = `    const COMMANDERS_POOL = {
      "Valeria": { faction: "Ferro", glyph: "🛡️", shortName: "VALERIA", hp: 42, att: 3, move: "ortho", rite: "Schianto Sismico", bloodCost: 5, desc: "Aura: Alleati e Altari adiacenti subiscono -1 danno; non scavalcabile da balzi a L. Rito (5🩸, 1⚡): 2 danni ad area e respinta di 1 casella (+1 danno urto)." },
      "Garek": { faction: "Ferro", glyph: "♞", shortName: "GAREK", hp: 38, att: 3, move: "knight", rite: "Ruggito del Bastione", bloodCost: 5, desc: "Aura: Le truppe nemiche adiacenti non possono muoversi. Rito (5🩸, 1⚡): Ripara 4 PV a un Altare alleato e gli conferisce 2 ATT di contrattacco." },
      "Malakor": { faction: "Ceneri", glyph: "💀", shortName: "MALAKOR", hp: 35, att: 2, move: "omni", rite: "Vincolo di Carne", bloodCost: 6, desc: "Aura: Ottiene 2 Sangue a perdita; evoca truppe adiacenti anche ai propri Altari. Rito (6🩸, 1⚡): Riflette il 50% dei danni subiti sul bersaglio per 1 round." },
      "Morbida": { faction: "Ceneri", glyph: "🪱", shortName: "MORBIDA", hp: 32, att: 3, move: "diag", rite: "Masticazione", bloodCost: 6, desc: "Aura: I caduti alleati creano Cimiteri (1 danno ai nemici che transitano). Rito (6🩸, 1⚡): Consuma un Cimitero per infliggere 3 danni diretti a vista." },
      "Vespera": { faction: "Marea", glyph: "🌌", shortName: "VESPERA", hp: 35, att: 2, move: "diag", rite: "Ritorno di Marea", bloodCost: 5, desc: "Aura: Trascina di 1 casella un nemico entro 3 passi a inizio turno. Rito (5🩸, 1⚡): Spinge un pezzo fino a 3 caselle in linea retta (+2 danni se urta ostacoli)." },
      "Kaelen": { faction: "Marea", glyph: "🌀", shortName: "KAELEN", hp: 34, att: 2, move: "ortho2", rite: "Faglia Gravitazionale", bloodCost: 5, desc: "Aura: Respinge di 1 chi entra adiacente. Rito (5🩸, 1⚡): Scambia di posizione due unità qualsiasi entro 4 passi." },
      "Aurelius": { faction: "Silenzio", glyph: "⚖️", shortName: "AURELIUS", hp: 38, att: 3, move: "ortho", rite: "Decima di Ferro", bloodCost: 6, desc: "Aura: Chi muore entro 2 caselle da lui non genera Sangue per nessuno. Rito (6🩸, 1⚡): Se il nemico attacca paga 1 Mana o subisce 2 danni." },
      "Justiciar Kael": { faction: "Silenzio", glyph: "📜", shortName: "J. KAEL", hp: 36, att: 3, move: "ortho", rite: "Sigillo della Legge", bloodCost: 6, desc: "Aura: L'avversario subisce 1 danno diretto se accumula 3+ Sangue in un turno. Rito (6🩸, 1⚡): Blocca abilità [1⚡] e Riti nemici per 1 turno." },
      "Vulkan": { faction: "Forgia", glyph: "🌋", shortName: "VULKAN", hp: 36, att: 4, move: "ortho", rite: "Altare Semovente", bloodCost: 5, desc: "Aura: Può sacrificare un Altare adiacente per curarsi 4 PV o dare +2/+2 a un automa. Rito (5🩸, 1⚡): Anima un Altare in truppa 3/5 che attacca subito." },
      "Ignis": { faction: "Forgia", glyph: "🔥", shortName: "IGNIS", hp: 32, att: 4, move: "ortho", rite: "Eruzione di Scorie", bloodCost: 5, desc: "Aura: Guadagna permanentemente +1 ATT ogni volta che cade un Altare alleato. Rito (5🩸, 1⚡): Sacrifica un Altare per infliggere 3 danni ad area ortogonale." }
    };`;

const commandersNew = `    const COMMANDERS_POOL = {
      "Valeria": { faction: "Ferro", glyph: "🛡️", shortName: "VALERIA", hp: 42, att: 3, move: "ortho", rite: "Schianto Sismico", bloodCost: 7, desc: "Aura: Alleati e Altari adiacenti subiscono -1 danno; non scavalcabile da balzi a L. Rito (7🩸, 1⚡, max 1/turno): 2 danni ad area e respinta di 1 casella (+1 danno urto)." },
      "Garek": { faction: "Ferro", glyph: "♞", shortName: "GAREK", hp: 38, att: 3, move: "knight", rite: "Ruggito del Bastione", bloodCost: 7, desc: "Aura: Le truppe nemiche adiacenti non possono muoversi. Rito (7🩸, 1⚡, max 1/turno): Ripara 4 PV a un Altare alleato e gli conferisce 2 ATT di contrattacco." },
      "Malakor": { faction: "Ceneri", glyph: "💀", shortName: "MALAKOR", hp: 35, att: 2, move: "omni", rite: "Vincolo di Carne", bloodCost: 8, desc: "Aura: Ottiene 2 Sangue a perdita; evoca truppe adiacenti anche ai propri Altari. Rito (8🩸, 1⚡, max 1/turno): Riflette il 50% dei danni subiti sul bersaglio per 1 round." },
      "Morbida": { faction: "Ceneri", glyph: "🪱", shortName: "MORBIDA", hp: 32, att: 3, move: "diag", rite: "Masticazione", bloodCost: 8, desc: "Aura: I caduti alleati creano Cimiteri (1 danno ai nemici che transitano). Rito (8🩸, 1⚡, max 1/turno): Consuma un Cimitero per infliggere 3 danni diretti a vista." },
      "Vespera": { faction: "Marea", glyph: "🌌", shortName: "VESPERA", hp: 35, att: 2, move: "diag", rite: "Ritorno di Marea", bloodCost: 7, desc: "Aura: Trascina di 1 casella un nemico entro 3 passi a inizio turno. Rito (7🩸, 1⚡, max 1/turno): Spinge un pezzo fino a 3 caselle in linea retta (+2 danni se urta ostacoli)." },
      "Kaelen": { faction: "Marea", glyph: "🌀", shortName: "KAELEN", hp: 34, att: 2, move: "ortho2", rite: "Faglia Gravitazionale", bloodCost: 7, desc: "Aura: Respinge di 1 chi entra adiacente. Rito (7🩸, 1⚡, max 1/turno): Scambia di posizione due unità qualsiasi entro 4 passi." },
      "Aurelius": { faction: "Silenzio", glyph: "⚖️", shortName: "AURELIUS", hp: 38, att: 3, move: "ortho", rite: "Decima di Ferro", bloodCost: 8, desc: "Aura: Chi muore entro 2 caselle da lui non genera Sangue per nessuno. Rito (8🩸, 1⚡, max 1/turno): Se il nemico attacca paga 1 Mana o subisce 2 danni." },
      "Justiciar Kael": { faction: "Silenzio", glyph: "📜", shortName: "J. KAEL", hp: 36, att: 3, move: "ortho", rite: "Sigillo della Legge", bloodCost: 8, desc: "Aura: L'avversario subisce 1 danno diretto se accumula 3+ Sangue in un turno. Rito (8🩸, 1⚡, max 1/turno): Blocca abilità [1⚡] e Riti nemici per 1 turno." },
      "Vulkan": { faction: "Forgia", glyph: "🌋", shortName: "VULKAN", hp: 36, att: 4, move: "ortho", rite: "Altare Semovente", bloodCost: 7, desc: "Aura: Può sacrificare un Altare adiacente per curarsi 4 PV o dare +2/+2 a un automa. Rito (7🩸, 1⚡, max 1/turno): Anima un Altare in truppa 3/5 che attacca subito." },
      "Ignis": { faction: "Forgia", glyph: "🔥", shortName: "IGNIS", hp: 32, att: 4, move: "ortho", rite: "Eruzione di Scorie", bloodCost: 7, desc: "Aura: Guadagna permanentemente +1 ATT ogni volta che cade un Altare alleato. Rito (7🩸, 1⚡, max 1/turno): Sacrifica un Altare per infliggere 3 danni ad area ortogonale." }
    };`;

if (!content.includes(commandersOld)) {
  console.error("ERROR: Could not find commandersOld in content");
  process.exit(1);
}
content = content.replace(commandersOld, commandersNew);
console.log('1. COMMANDERS_POOL replaced.');

// =========================================================================
// 2. SURRENDER BUTTON IN BATTLE HUD
// =========================================================================
const hudButtonsOld = `        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="btn btn-gold" id="btn-rite-p1" onclick="useWeaponRiteP1()" onmouseenter="showRiteHoverCard(event)" onmousemove="updateHoverCardPos(event)" onmouseleave="hideHoverCard()">Rito d'Armi</button>
          <button class="btn btn-crimson" id="btn-end-turn" onclick="advanceTurnPhase()">Passa a Fase 2: Azioni ⚔️</button>
        </div>`;

const hudButtonsNew = `        <div style="display: flex; gap: 8px; align-items: center;">
          <button class="btn btn-gold" id="btn-rite-p1" onclick="useWeaponRiteP1()" onmouseenter="showRiteHoverCard(event)" onmousemove="updateHoverCardPos(event)" onmouseleave="hideHoverCard()">Rito d'Armi</button>
          <button class="btn btn-crimson" id="btn-end-turn" onclick="advanceTurnPhase()">Passa a Fase 2: Azioni ⚔️</button>
          <button class="btn btn-crimson btn-surrender" id="btn-surrender" onclick="surrenderMatch()" title="Arrenditi ed esci dalla partita">🏳️ Resa</button>
        </div>`;

if (!content.includes(hudButtonsOld)) {
  console.error("ERROR: Could not find hudButtonsOld in content");
  process.exit(1);
}
content = content.replace(hudButtonsOld, hudButtonsNew);
console.log('2. Surrender button added to battle HUD.');

// =========================================================================
// 3. DECKBUILDER AUTOCOMPLETE BUTTON LABEL
// =========================================================================
const deckAutoBtnOld = `<button class="btn" style="padding: 6px;" onclick="autoCompleteDeck()">✨ Autocompleta (30)</button>`;
const deckAutoBtnNew = `<button class="btn btn-gold" style="padding: 6px; font-weight: 800;" onclick="autoCompleteDeck()" title="Riempi strategicamente il grimorio fino a 40 carte con carte conformi e sinergiche">✨ Autocompleta (40 Carte)</button>`;

if (!content.includes(deckAutoBtnOld)) {
  console.error("ERROR: Could not find deckAutoBtnOld in content");
  process.exit(1);
}
content = content.replace(deckAutoBtnOld, deckAutoBtnNew);
console.log('3. Deckbuilder button updated.');

// =========================================================================
// 4. HOMEPAGE REDESIGN (MENU PRINCIPALE CON LORE & AZIONI DI GIOCO)
// =========================================================================
const homePaneOld = `    <!-- HOME -->
    <div id="pane-home" class="pane">
      <div class="home-hero" style="margin: auto; max-width: 620px; padding: 20px;">
        <h1>CROWNFALL</h1>
        <p>Scegli il tuo Campione, schiera gli Altari territoriali e sfida l'IA o un altro Comandante in Multiplayer P2P per guadagnare Oro e gloria.</p>
        <div class="menu-grid">
          <div class="menu-btn" onclick="showPaneDirect('lore')">
            <span class="title">📖 La Lore di Veridia</span>
            <span class="desc">La Sottrazione, il Demiurgo e i Frammenti</span>
          </div>
          <div class="menu-btn" onclick="showPaneDirect('tutorial')">
            <span class="title">⚔️ Accademia Tattica</span>
            <span class="desc">Come muovere, attaccare e usare gli Altari</span>
          </div>
          <div class="menu-btn" onclick="showPane('battle-lobby')">
            <span class="title">👑 Arena di Battaglia</span>
            <span class="desc">Sfida l'IA locale o gioca online in P2P</span>
          </div>
          <div class="menu-btn" onclick="openDeckBuilder()">
            <span class="title">📜 Deckbuilder Arena</span>
            <span class="desc">Costruisci il tuo grimorio Standard (30–40 carte, max 4x)</span>
          </div>
        </div>
      </div>
    </div>`;

const homePaneNew = `    <!-- HOME (MENU PRINCIPALE CON LORE, PILASTRI & AZIONI DI GIOCO) -->
    <div id="pane-home" class="pane">
      <div class="home-container">
        
        <header class="home-header">
          <h1 class="home-title">CROWNFALL</h1>
          <p class="home-subtitle">Lo Skirmish Tattico di Miniature, Grimori e Altari di Veridia</p>
        </header>

        <div class="home-layout">
          <!-- COLONNA SINISTRA: LORE & PILASTRI FONDAMENTALI -->
          <aside class="home-sidebar-lore">
            <div class="home-lore-box">
              <div class="home-lore-header">
                <span class="hl-badge">CRONACHE DI VERIDIA</span>
                <h3>📖 Il Conflitto dei Frammenti</h3>
              </div>
              <p class="home-lore-text">
                Dopo la <em>Sottrazione dell'Assoluto</em>, la Corona Primordiale si è spezzata in cinque frammenti di potere. 
                I cinque Ordini dominanti si sfidano sui campi scacchistici per la sovranità suprema: 
                <strong>Bastione di Ferro</strong>, <strong>Ceneri del Giudizio</strong>, <strong>Marea Abissale</strong>, 
                <strong>Silenzio Eterno</strong> e <strong>Forgia del Magma</strong>.
              </p>
            </div>

            <div class="home-pillars-box">
              <h4 class="pillars-title">⚖️ PILASTRI DI GIOCO</h4>
              
              <div class="pillar-item">
                <span class="p-icon">🏛️</span>
                <div class="p-content">
                  <strong>Altari & Mana 💧</strong>
                  <p>Controlla gli Altari per espandere il territorio e generare fino a 4 Mana per turno.</p>
                </div>
              </div>

              <div class="pillar-item">
                <span class="p-icon">🩸</span>
                <div class="p-content">
                  <strong>Riserva Sangue & Riti d'Arma</strong>
                  <p>I caduti alimentano il Sangue. Scatena il devastante Rito d'Arma del tuo Comandante (max 1 volta per turno!).</p>
                </div>
              </div>

              <div class="pillar-item">
                <span class="p-icon">⏳</span>
                <div class="p-content">
                  <strong>4 Fasi del Turno</strong>
                  <p>Mantenimento I ➔ Movimento & Azioni (2⚡) ➔ Mantenimento II ➔ Fine Turno.</p>
                </div>
              </div>

              <!-- SEZIONE SBUSTA FONDAMENTALE -->
              <div class="pillar-item highlight-packs">
                <span class="p-icon">📦</span>
                <div class="p-content">
                  <strong>SBUSTA PER VINCERE! (Fondamentale)</strong>
                  <p>Apri i Box di Espansione nel Mercato! Sbustare nuove carte Rare, Epiche e Mitiche è FONDAMENTALE per ampliare la tua collezione e forgiare mazzi vincenti.</p>
                </div>
              </div>
            </div>
          </aside>

          <!-- COLONNA DESTRA: AZIONI PRINCIPALI E MODALITÀ -->
          <main class="home-actions-main">
            <h4 class="actions-title">⚔️ AZIONI & MODALITÀ DI GIOCO</h4>

            <div class="home-action-card pack-shop-action" onclick="showPane('packs')">
              <div class="action-card-left">
                <div class="action-icon">📦</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">MERCATO BOX & SBUSTA BUSTINE</span>
                    <span class="action-badge pulse-gold">FONDAMENTALE</span>
                  </div>
                  <p class="action-desc">Apri box con le monete d'oro vinte, sblocca truppe leggendarie e amplia la tua collezione!</p>
                </div>
              </div>
              <button class="btn btn-gold action-btn" onclick="event.stopPropagation(); showPane('packs')">SBUSTA ORA (100 🪙)</button>
            </div>

            <div class="home-action-card battle-arena-action" onclick="showPane('battle-lobby')">
              <div class="action-card-left">
                <div class="action-icon">👑</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">ARENA DI BATTAGLIA</span>
                    <span class="action-reward-pill">🤖 IA: +100 🪙</span>
                    <span class="action-reward-pill p2p">🌐 P2P: +200 🪙</span>
                  </div>
                  <p class="action-desc">Sfida l'Intelligenza Artificiale tattica (+100 Oro) oppure combatti online in Multigiocatore P2P (+200 Oro)!</p>
                </div>
              </div>
              <button class="btn btn-crimson action-btn" onclick="event.stopPropagation(); showPane('battle-lobby')">ENTRA IN BATTAGLIA</button>
            </div>

            <div class="home-action-card deck-action" onclick="openDeckBuilder()">
              <div class="action-card-left">
                <div class="action-icon">📜</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">DECKBUILDER ARENA</span>
                    <span class="action-badge">40 CARTE STANDARD</span>
                  </div>
                  <p class="action-desc">Costruisci il tuo grimorio personalizzato o usa l'Autocompletamento Professionale IA a 40 carte.</p>
                </div>
              </div>
              <button class="btn action-btn" onclick="event.stopPropagation(); openDeckBuilder()">COMPONI MAZZO</button>
            </div>

            <div class="home-subgrid">
              <div class="home-mini-action" onclick="showPaneDirect('tutorial')">
                <span class="mini-icon">⚔️</span>
                <div>
                  <div class="mini-title">Accademia Tattica</div>
                  <div class="mini-desc">Guida a movimento, gittata, altari e fasi</div>
                </div>
              </div>

              <div class="home-mini-action" onclick="showPaneDirect('lore')">
                <span class="mini-icon">📖</span>
                <div>
                  <div class="mini-title">Grimorio della Lore</div>
                  <div class="mini-desc">I 5 Comandanti, la Sottrazione e i Frammenti</div>
                </div>
              </div>
            </div>
          </main>
        </div>

      </div>
    </div>`;

if (!content.includes(homePaneOld)) {
  console.error("ERROR: Could not find homePaneOld in content");
  process.exit(1);
}
content = content.replace(homePaneOld, homePaneNew);
console.log('4. Homepage redesigned.');

// =========================================================================
// 5. COMBAT CLASH OVERLAY HTML INJECTION (JUST BEFORE </main> OR AT END OF BODY)
// =========================================================================
const clashOverlayHtml = `
    <!-- OVERLAY COMBATTIMENTO DINAMICO SOVRAIMPRESSIONE -->
    <div id="combat-clash-overlay" class="combat-clash-overlay" style="display: none;" onclick="hideCombatClashOverlay()">
      <div class="clash-modal" onclick="event.stopPropagation()">
        <div class="clash-header">
          <span class="clash-icon">⚔️</span>
          <span class="clash-title">SCONTRO TATTICO SULLA PLANCIA</span>
          <span class="clash-icon">⚔️</span>
        </div>
        <div class="clash-fighters-row">
          <!-- CARTA ATTACCANTE -->
          <div class="clash-card attacker" id="clash-card-att">
            <div class="clash-card-badge">ATTACCANTE</div>
            <div class="clash-card-glyph" id="clash-att-glyph">⚔️</div>
            <div class="clash-card-name" id="clash-att-name">Attaccante</div>
            <div class="clash-card-stats" id="clash-att-stats">⚔️ 3 | ❤️ 5</div>
          </div>

          <!-- CENTRO: CALCOLO COMBATTIMENTO -->
          <div class="clash-vs-box">
            <div class="clash-vs-icon">💥</div>
            <div class="clash-formula" id="clash-formula-box">
              <!-- Righe di calcolo dinamiche -->
            </div>
            <div class="clash-damage-banner" id="clash-damage-banner">
              💥 3 DANNI INFLITTI
            </div>
            <div class="clash-counter-banner" id="clash-counter-banner">
              🛡️ Contrattacco: 2 Danni
            </div>
          </div>

          <!-- CARTA DIFENSORE -->
          <div class="clash-card defender" id="clash-card-def">
            <div class="clash-card-badge def">DIFENSORE</div>
            <div class="clash-card-glyph" id="clash-def-glyph">🛡️</div>
            <div class="clash-card-name" id="clash-def-name">Difensore</div>
            <div class="clash-card-stats" id="clash-def-stats">⚔️ 2 | ❤️ 4 ➔ 1</div>
          </div>
        </div>
        <div class="clash-footer-hint">Clicca ovunque per continuare</div>
      </div>
    </div>
`;

if (!content.includes('id="combat-clash-overlay"')) {
  const marker = '  </main>';
  if (!content.includes(marker)) {
    console.error("ERROR: Could not find </main> in content");
    process.exit(1);
  }
  content = content.replace(marker, `${clashOverlayHtml}\n  </main>`);
  console.log('5. Combat clash overlay HTML injected.');
}

// =========================================================================
// 6. CSS STYLING FOR HOMEPAGE, CLASH OVERLAY, SURRENDER BUTTON, AND PIECE AURAS
// =========================================================================
const newCssStyles = `
    /* === STILI HOMEPAGE REDESIGN (LORE & AZIONI) === */
    .home-container {
      width: 100%;
      max-width: 1060px;
      margin: 0 auto;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      height: 100%;
      overflow-y: auto;
    }
    .home-header {
      text-align: center;
      margin-bottom: 4px;
    }
    .home-title {
      font-size: 2.6rem;
      font-weight: 900;
      letter-spacing: 5px;
      color: var(--gold-primary);
      text-shadow: 0 4px 20px var(--gold-glow);
      margin: 0 0 4px 0;
    }
    .home-subtitle {
      color: var(--text-muted);
      font-size: 0.88rem;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .home-layout {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 20px;
      align-items: start;
    }
    @media (max-width: 880px) {
      .home-layout { grid-template-columns: 1fr; }
    }
    .home-sidebar-lore {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .home-lore-box {
      background: linear-gradient(135deg, rgba(22, 27, 40, 0.95) 0%, rgba(13, 16, 25, 0.95) 100%);
      border: 1px solid var(--border-gold);
      border-radius: 8px;
      padding: 14px 16px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.5);
    }
    .home-lore-header {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 8px;
    }
    .hl-badge {
      font-size: 0.62rem;
      font-weight: 900;
      color: var(--gold-primary);
      letter-spacing: 1px;
    }
    .home-lore-header h3 {
      font-size: 0.98rem;
      font-weight: 800;
      color: #fff;
      margin: 0;
    }
    .home-lore-text {
      font-size: 0.78rem;
      line-height: 1.5;
      color: #b0b8d1;
      margin: 0;
    }
    .home-lore-text strong {
      color: #f1f2f6;
    }
    .home-pillars-box {
      background: var(--bg-card);
      border: 1px solid var(--border-frame);
      border-radius: 8px;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    .pillars-title, .actions-title {
      font-size: 0.76rem;
      font-weight: 900;
      letter-spacing: 1px;
      color: var(--gold-primary);
      margin: 0 0 4px 0;
    }
    .pillar-item {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 6px;
      padding: 8px 10px;
    }
    .pillar-item .p-icon {
      font-size: 1.25rem;
      line-height: 1;
    }
    .pillar-item .p-content strong {
      display: block;
      font-size: 0.78rem;
      color: #fff;
      margin-bottom: 2px;
    }
    .pillar-item .p-content p {
      font-size: 0.71rem;
      color: var(--text-muted);
      margin: 0;
      line-height: 1.35;
    }
    .pillar-item.highlight-packs {
      background: linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(255, 107, 129, 0.08) 100%);
      border: 1px solid rgba(212, 175, 55, 0.4);
      box-shadow: 0 0 14px rgba(212, 175, 55, 0.2);
    }
    .pillar-item.highlight-packs strong {
      color: var(--gold-primary);
    }

    .home-actions-main {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .home-action-card {
      background: var(--bg-card);
      border: 1px solid var(--border-frame);
      border-radius: 8px;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    .home-action-card:hover {
      border-color: var(--gold-primary);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(212, 175, 55, 0.2);
    }
    .action-card-left {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
    }
    .action-icon {
      font-size: 2rem;
      line-height: 1;
    }
    .action-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .action-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .action-title {
      font-size: 0.92rem;
      font-weight: 800;
      color: #fff;
    }
    .action-badge {
      font-size: 0.62rem;
      font-weight: 900;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(255,255,255,0.08);
      color: var(--text-muted);
      border: 1px solid rgba(255,255,255,0.15);
    }
    .action-badge.pulse-gold {
      background: rgba(212, 175, 55, 0.2);
      color: var(--gold-primary);
      border-color: var(--gold-primary);
      animation: goldPulse 1.5s infinite alternate;
    }
    @keyframes goldPulse {
      from { box-shadow: 0 0 4px rgba(212,175,55,0.4); }
      to { box-shadow: 0 0 12px rgba(212,175,55,0.85); }
    }
    .action-reward-pill {
      font-size: 0.65rem;
      font-weight: 900;
      padding: 2px 8px;
      border-radius: 12px;
      background: rgba(46, 204, 113, 0.15);
      color: #2ecc71;
      border: 1px solid rgba(46, 204, 113, 0.35);
    }
    .action-reward-pill.p2p {
      background: rgba(241, 196, 15, 0.18);
      color: #ffd32a;
      border-color: rgba(241, 196, 15, 0.45);
    }
    .action-desc {
      font-size: 0.74rem;
      color: var(--text-muted);
      margin: 0;
      line-height: 1.35;
    }
    .action-btn {
      font-size: 0.76rem;
      font-weight: 800;
      padding: 8px 16px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .pack-shop-action {
      background: linear-gradient(135deg, rgba(32, 28, 16, 0.9) 0%, rgba(18, 20, 29, 0.9) 100%);
      border-color: rgba(212, 175, 55, 0.5);
    }
    .battle-arena-action {
      background: linear-gradient(135deg, rgba(35, 16, 20, 0.9) 0%, rgba(18, 20, 29, 0.9) 100%);
      border-color: rgba(231, 76, 60, 0.4);
    }
    .home-subgrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .home-mini-action {
      background: var(--bg-card);
      border: 1px solid var(--border-frame);
      border-radius: 8px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .home-mini-action:hover {
      border-color: var(--border-gold);
      transform: translateY(-2px);
    }
    .mini-icon {
      font-size: 1.4rem;
    }
    .mini-title {
      font-size: 0.8rem;
      font-weight: 800;
      color: #fff;
    }
    .mini-desc {
      font-size: 0.68rem;
      color: var(--text-muted);
    }

    /* === RESA BUTTON === */
    .btn-surrender {
      background: #4a151b !important;
      border-color: #a82a36 !important;
      color: #ff7675 !important;
      padding: 4px 10px !important;
      font-size: 0.75rem !important;
      font-weight: 800 !important;
    }
    .btn-surrender:hover {
      background: #c0392b !important;
      color: #fff !important;
      box-shadow: 0 0 10px rgba(192, 57, 43, 0.6) !important;
    }

    /* === COMBAT CLASH OVERLAY (SOVRAIMPRESSIONE SCONTRO) === */
    .combat-clash-overlay {
      position: fixed;
      inset: 0;
      background: rgba(3, 4, 8, 0.86);
      backdrop-filter: blur(6px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: clashFadeIn 0.2s ease-out;
    }
    @keyframes clashFadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    .clash-modal {
      background: linear-gradient(135deg, #131722 0%, #0a0c14 100%);
      border: 2px solid var(--border-gold);
      border-radius: 12px;
      padding: 22px;
      max-width: 660px;
      width: 100%;
      box-shadow: 0 0 35px rgba(229, 185, 88, 0.4), 0 10px 40px rgba(0, 0, 0, 0.9);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      animation: clashImpact 0.28s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    }
    @keyframes clashImpact {
      0% { transform: scale(0.85); opacity: 0; }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); opacity: 1; }
    }
    .clash-header {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 1.1rem;
      font-weight: 900;
      letter-spacing: 2px;
      color: var(--gold-primary);
      text-shadow: 0 0 12px var(--gold-glow);
    }
    .clash-fighters-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      gap: 12px;
    }
    .clash-card {
      flex: 1;
      max-width: 160px;
      background: #171b26;
      border: 2px solid #3d4460;
      border-radius: 8px;
      padding: 12px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 6px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.6);
    }
    .clash-card.attacker {
      border-color: #e74c3c;
      box-shadow: 0 0 16px rgba(231, 76, 60, 0.35);
    }
    .clash-card.defender {
      border-color: #3498db;
      box-shadow: 0 0 16px rgba(52, 152, 219, 0.35);
    }
    .clash-card-badge {
      font-size: 0.62rem;
      font-weight: 900;
      padding: 2px 8px;
      border-radius: 4px;
      background: rgba(231, 76, 60, 0.2);
      color: #ff7675;
      border: 1px solid rgba(231, 76, 60, 0.4);
    }
    .clash-card-badge.def {
      background: rgba(52, 152, 219, 0.2);
      color: #74b9ff;
      border-color: rgba(52, 152, 219, 0.4);
    }
    .clash-card-glyph {
      font-size: 2.2rem;
      margin: 4px 0;
    }
    .clash-card-name {
      font-weight: 800;
      font-size: 0.82rem;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .clash-card-stats {
      font-weight: 900;
      font-size: 0.8rem;
      color: var(--gold-primary);
    }
    .clash-vs-box {
      flex: 1.4;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 8px;
      background: rgba(0, 0, 0, 0.35);
      border-radius: 8px;
      border: 1px dashed var(--border-frame);
    }
    .clash-vs-icon {
      font-size: 1.6rem;
      animation: clashPulse 0.8s ease-in-out infinite alternate;
    }
    @keyframes clashPulse {
      from { transform: scale(1); }
      to { transform: scale(1.15); }
    }
    .clash-formula {
      font-size: 0.72rem;
      color: #cbd5e1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      text-align: center;
      line-height: 1.35;
    }
    .clash-damage-banner {
      font-size: 0.85rem;
      font-weight: 900;
      color: #ff6b81;
      background: rgba(255, 107, 129, 0.15);
      border: 1px solid #ff4757;
      padding: 4px 10px;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }
    .clash-counter-banner {
      font-size: 0.72rem;
      font-weight: 800;
      color: #ffd32a;
    }
    .clash-footer-hint {
      font-size: 0.65rem;
      color: var(--text-muted);
      letter-spacing: 0.5px;
      font-style: italic;
    }

    /* === PIECE AURA & BUFF BADGES DIRECTLY ON MINIATURES === */
    .piece-auras-row {
      position: absolute;
      top: -6px;
      right: -4px;
      display: flex;
      gap: 2px;
      z-index: 5;
    }
    .piece-aura-badge {
      font-size: 0.55rem;
      font-weight: 900;
      padding: 1px 3px;
      border-radius: 3px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.8);
      pointer-events: none;
      line-height: 1.1;
    }
    .piece-aura-badge.def { background: #1e3799; color: #70a1ff; border: 1px solid #3742fa; }
    .piece-aura-badge.atk { background: #4a151b; color: #ff7675; border: 1px solid #d63031; }
    .piece-aura-badge.shield { background: #4b380a; color: #ffd32a; border: 1px solid #e5b958; }
    .piece-aura-badge.armor { background: #1e272e; color: #dfe4ea; border: 1px solid #747d8c; }
`;

const cssInsertionPoint = '  </style>';
if (!content.includes(cssInsertionPoint)) {
  console.error("ERROR: Could not find </style> in content");
  process.exit(1);
}
content = content.replace(cssInsertionPoint, `${newCssStyles}\n  </style>`);
console.log('6. CSS styles added.');

// =========================================================================
// 7. JS LOGIC: SURRENDER & MULTIPLAYER P2P SURRENDER HANDLER
// =========================================================================
// Add surrender handler in handleNetMsg
const netMsgAnchor = `      } else if (data.type === 'ACTION_KAELEN_SWAP') {
        executeKaelenSwap(data.firstIdx, data.secondIdx, data.player, false);`;

const netMsgSurrender = `      } else if (data.type === 'ACTION_SURRENDER') {
        if (battleState && !battleState.isGameOver) {
          battleState.isGameOver = true;
          const winnerRole = (data.player === 'p1') ? 'p2' : 'p1';
          const myRole = getMyRole();
          addLog(\`BATTAGLIA CONCLUSA: \${data.player.toUpperCase()} si è arreso!\`, 'sys');
          if (myRole === winnerRole) {
            userState.gold = (userState.gold || 0) + 200;
            updateNavGold();
            saveCloudState();
            alert("🏆 VITTORIA PER RESA! L'avversario ha abbandonato il campo. Guadagni +200 Oro 🪙!");
          } else {
            alert("💀 Ti sei arreso. Partita terminata.");
          }
          showPaneDirect('home');
        }
      } else if (data.type === 'ACTION_KAELEN_SWAP') {
        executeKaelenSwap(data.firstIdx, data.secondIdx, data.player, false);`;

if (!content.includes(netMsgAnchor)) {
  console.error("ERROR: Could not find netMsgAnchor in content");
  process.exit(1);
}
content = content.replace(netMsgAnchor, netMsgSurrender);
console.log('7. ACTION_SURRENDER added to handleNetMsg.');

// =========================================================================
// 8. JS LOGIC: surrenderMatch() FUNCTION
// =========================================================================
const surrenderFuncCode = `
    function surrenderMatch() {
      if (!battleState || battleState.isGameOver) {
        showPaneDirect('home');
        return;
      }
      if (!confirm("Sei sicuro di voler abbandonare la partita? La resa comporterà la sconfitta.")) {
        return;
      }
      const myRole = getMyRole();
      battleState.isGameOver = true;
      addLog(\`RESA: \${myRole.toUpperCase()} ha abbandonato la battaglia!\`, 'sys');

      if (battleState.isP2P) {
        sendNetMsg({
          type: 'ACTION_SURRENDER',
          player: myRole
        });
      }

      alert("💀 Ti sei arreso. La vittoria va al tuo avversario.");
      showPaneDirect('home');
    }
`;

// =========================================================================
// 9. JS LOGIC: COMBAT CLASH OVERLAY HELPER FUNCTIONS
// =========================================================================
const clashHelpersCode = `
    let clashOverlayTimer = null;
    function showCombatClashOverlay(attPiece, defPiece, damage, counterDmg, details = {}) {
      const overlay = document.getElementById('combat-clash-overlay');
      if (!overlay) return;

      if (clashOverlayTimer) {
        clearTimeout(clashOverlayTimer);
        clashOverlayTimer = null;
      }

      // Attacker data
      document.getElementById('clash-att-glyph').textContent = attPiece.glyph || (attPiece.type === 'commander' ? '👑' : '⚔️');
      document.getElementById('clash-att-name').textContent = attPiece.name || 'Attaccante';
      document.getElementById('clash-att-stats').textContent = \`⚔️ \${attPiece.att} ATT  •  ❤️ \${attPiece.hp} PV\`;

      // Defender data
      const defInitialHp = defPiece.hp + damage;
      const defResultHp = Math.max(0, defPiece.hp);
      document.getElementById('clash-def-glyph').textContent = defPiece.glyph || (defPiece.type === 'altar' ? '🏛️' : (defPiece.type === 'commander' ? '👑' : '🛡️'));
      document.getElementById('clash-def-name').textContent = defPiece.name || 'Difensore';
      document.getElementById('clash-def-stats').textContent = \`❤️ \${defInitialHp} ➔ \${defResultHp <= 0 ? '💀 CADUTO' : defResultHp + ' PV'}\`;

      // Formula breakdown
      const formulaEl = document.getElementById('clash-formula-box');
      const lines = [];
      lines.push(\`<span>⚔️ Potenza Base: <strong>\${details.rawAtk || attPiece.att}</strong></span>\`);
      if (details.flankingBonus) {
        lines.push(\`<span style="color:#2ecc71;">+ Aggiramento (Flanking): <strong>+\${details.flankingBonus}</strong></span>\`);
      }
      if (details.isStructure) {
        lines.push(\`<span style="color:#f39c12;">💥 Sfondamento Struttura</span>\`);
      }
      if (details.absorbed && details.absorbed > 0) {
        lines.push(\`<span style="color:#74b9ff;">🛡️ Armatura/Riparo: <strong>-\${details.absorbed}</strong></span>\`);
      }
      if (defPiece.hasTotalShield) {
        lines.push(\`<span style="color:#ffd32a;">✨ Scudo Totale: Colpo Assorbito</span>\`);
      }
      formulaEl.innerHTML = lines.join('');

      document.getElementById('clash-damage-banner').textContent = \`💥 \${damage} DANNI INFLITTI\`;
      
      const counterBanner = document.getElementById('clash-counter-banner');
      if (counterDmg > 0) {
        counterBanner.style.display = 'block';
        counterBanner.textContent = \`🛡️ Contrattacco nemico: \${counterDmg} Danni\`;
      } else if (details.isRanged) {
        counterBanner.style.display = 'block';
        counterBanner.textContent = \`🏹 Attacco a distanza: Nessun contrattacco\`;
      } else if (details.defCannotCounter) {
        counterBanner.style.display = 'block';
        counterBanner.textContent = \`🛡️ Il difensore non può contrattaccare\`;
      } else {
        counterBanner.style.display = 'none';
      }

      overlay.style.display = 'flex';

      clashOverlayTimer = setTimeout(() => {
        hideCombatClashOverlay();
      }, 1300);
    }

    function hideCombatClashOverlay() {
      const overlay = document.getElementById('combat-clash-overlay');
      if (overlay) overlay.style.display = 'none';
      if (clashOverlayTimer) {
        clearTimeout(clashOverlayTimer);
        clashOverlayTimer = null;
      }
    }
`;

// =========================================================================
// 10. JS LOGIC: SMART 40-CARD AUTOCOMPLETE DECK (PROFESSIONALE)
// =========================================================================
const smartAutoCompleteCode = `
    function autoCompleteDeck() {
      const deck = userState.decks[userState.activeDeckName];
      if (!deck) return;
      const comm = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];
      const commFaction = comm ? comm.faction : 'Neutral';
      const targetCount = 40;

      if (deck.cards.length >= targetCount) {
        return showToast("Il grimorio ha già raggiunto le 40 carte massime consentite!");
      }

      const getAvailableCopies = (cardId) => {
        const c = CARDS_DB[cardId];
        if (!c) return 0;
        const isAlpha = (c.set === 0 || c.set === 'α');
        if (isAlpha) return 4;
        return Math.min(4, (userState.collection && userState.collection[cardId]) || 0);
      };

      // Punteggio tattico per carta in base a comandante, fazione, rarità, statistiche ed archetipi
      const scoreCard = (card) => {
        let score = 10;
        if (card.faction === commFaction) score += 15;
        else if (card.faction === 'Neutral') score += 5;
        else return -999;

        if (card.rarity === 'mythic') score += 10;
        else if (card.rarity === 'rare') score += 7;
        else if (card.rarity === 'uncommon') score += 4;

        if (card.type === 'unit') {
          const att = card.att || 0;
          const hp = card.hp || 0;
          const cost = card.cost || 1;
          score += (att * 1.8 + hp * 1.2) - (cost * 1.8);
          if (card.slancio) score += 4;
          if (card.move === 'knight') score += 3;
          if (card.range && card.range > 1) score += 4;
        }

        const desc = (card.desc || '').toLowerCase();
        const name = (card.name || '').toLowerCase();

        if (commFaction === 'Ferro') {
          if (desc.includes('armatura') || desc.includes('presidio') || desc.includes('muro') || desc.includes('difesa') || desc.includes('copertura') || desc.includes('scudo')) score += 8;
          if (card.type === 'altar' && (name.includes('ferro') || name.includes('fortezza') || name.includes('pietra'))) score += 12;
        } else if (commFaction === 'Ceneri') {
          if (desc.includes('sangue') || desc.includes('cimitero') || desc.includes('morte') || desc.includes('sacrifica') || desc.includes('spirito')) score += 8;
          if (card.bloodCost && card.bloodCost > 0) score += 5;
          if (card.type === 'altar' && (name.includes('sangue') || name.includes('cenere') || name.includes('ossario'))) score += 12;
        } else if (commFaction === 'Marea') {
          if (desc.includes('spinta') || desc.includes('spinge') || desc.includes('urto') || desc.includes('trascin') || desc.includes('attira') || desc.includes('marea') || desc.includes('balzo')) score += 8;
          if (card.type === 'altar' && (name.includes('marea') || name.includes('abissi') || name.includes('vortice'))) score += 12;
        } else if (commFaction === 'Silenzio') {
          if (desc.includes('tassa') || desc.includes('silenzio') || desc.includes('confisca') || desc.includes('scudo') || desc.includes('legge') || desc.includes('blocca')) score += 8;
          if (card.type === 'altar' && (name.includes('silenzio') || name.includes('legge') || name.includes('giudizio'))) score += 12;
        } else if (commFaction === 'Forgia') {
          if (desc.includes('automa') || desc.includes('forgia') || desc.includes('scoria') || desc.includes('metallo') || desc.includes('fuoco') || desc.includes('incendio')) score += 8;
          if (card.type === 'altar' && (name.includes('forgia') || name.includes('magma') || name.includes('fiamma'))) score += 12;
        }

        return score;
      };

      const eligibleCards = Object.values(CARDS_DB).filter(c => {
        if (!c || !c.id) return false;
        if (c.faction !== commFaction && c.faction !== 'Neutral') return false;
        return getAvailableCopies(c.id) > 0;
      });

      eligibleCards.sort((a, b) => scoreCard(b) - scoreCard(a));

      const getCounts = (cards) => {
        let altars = 0, units1 = 0, units2 = 0, units3Plus = 0, spells = 0;
        cards.forEach(id => {
          const c = CARDS_DB[id];
          if (!c) return;
          if (c.type === 'altar') altars++;
          else if (c.type === 'unit') {
            if (c.cost <= 1) units1++;
            else if (c.cost === 2) units2++;
            else units3Plus++;
          } else if (c.type === 'spell' || c.type === 'reaction') {
            spells++;
          }
        });
        return { altars, units1, units2, units3Plus, spells };
      };

      const tryAdd = (predicate, quota, maxCopiesPerCard = 2) => {
        for (const card of eligibleCards) {
          if (deck.cards.length >= targetCount) break;
          if (!predicate(card)) continue;
          const inDeck = deck.cards.filter(id => id === card.id).length;
          const available = getAvailableCopies(card.id);
          const cap = Math.min(maxCopiesPerCard, available);
          const canAdd = Math.min(quota, cap - inDeck);
          for (let k = 0; k < canAdd; k++) {
            deck.cards.push(card.id);
            quota--;
          }
          if (quota <= 0) break;
        }
      };

      // 1. Quota 4 Altari per rampa territoriale
      let counts = getCounts(deck.cards);
      if (counts.altars < 4) {
        tryAdd(c => c.type === 'altar', 4 - counts.altars);
      }

      // 2. Presidio Early Game: Unità Costo 1 (~10)
      counts = getCounts(deck.cards);
      if (counts.units1 < 10) {
        tryAdd(c => c.type === 'unit' && (c.cost <= 1), 10 - counts.units1);
      }

      // 3. Spina Dorsale Mid-Range: Unità Costo 2 (~13)
      counts = getCounts(deck.cards);
      if (counts.units2 < 13) {
        tryAdd(c => c.type === 'unit' && c.cost === 2, 13 - counts.units2);
      }

      // 4. Finitori Pesanti & Colossi: Unità Costo 3+ (~7)
      counts = getCounts(deck.cards);
      if (counts.units3Plus < 7) {
        tryAdd(c => c.type === 'unit' && c.cost >= 3, 7 - counts.units3Plus);
      }

      // 5. Sortilegi & Reazioni di Rimozione/Controllo (~6)
      counts = getCounts(deck.cards);
      if (counts.spells < 6) {
        tryAdd(c => (c.type === 'spell' || c.type === 'reaction'), 6 - counts.spells);
      }

      // 6. Riempi le posizioni rimanenti fino a rigorosamente 40 carte
      for (let maxCap of [2, 4]) {
        while (deck.cards.length < targetCount) {
          let added = false;
          for (const card of eligibleCards) {
            if (deck.cards.length >= targetCount) break;
            const inDeck = deck.cards.filter(id => id === card.id).length;
            const available = getAvailableCopies(card.id);
            const cap = Math.min(maxCap, available);
            if (inDeck < cap) {
              deck.cards.push(card.id);
              added = true;
              break;
            }
          }
          if (!added) break;
        }
      }

      renderDeckBuilder();
      saveCloudState();
      showToast(\`✨ Grimorio completato professionalmente a 40 carte con sinergie \${commFaction}!\`);
    }
`;

// Replace old autoCompleteDeck function
const oldAutoCompleteDeck = `    function autoCompleteDeck() {
      const deck = userState.decks[userState.activeDeckName];
      const comm = COMMANDERS[deck.commanderId] || COMMANDERS['valeria'];
      const commFaction = comm ? comm.faction : 'Neutral';

      // Pescaggio consentito ESCLUSIVAMENTE da carte della Fazione del Comandante e Neutrali (Set α o sbloccate)
      const eligibleBase = Object.keys(CARDS_DB).filter(k => {
        const c = CARDS_DB[k];
        if (!c) return false;
        const isUnlocked = (c.set === 0 || c.set === 'α') || (userState.collection && (userState.collection[c.id] || 0) > 0);
        return isUnlocked && (c.faction === commFaction || c.faction === 'Neutral');
      });

      if (deck.cards.length >= 30) {
        return showToast("Il mazzo ha già raggiunto la soglia minima legale (30 carte)!");
      }

      while (deck.cards.length < 30) {
        const eligible = eligibleBase.filter(id => deck.cards.filter(cId => cId === id).length < 4);
        if (eligible.length === 0) break;
        deck.cards.push(eligible[Math.floor(Math.random() * eligible.length)]);
      }
      renderDeckBuilder();
      saveCloudState();
      showToast(\`Mazzo completato con carte conformi di \${commFaction} e Neutrali!\`);
    }`;

if (!content.includes(oldAutoCompleteDeck)) {
  console.error("ERROR: Could not find oldAutoCompleteDeck in content");
  process.exit(1);
}
content = content.replace(oldAutoCompleteDeck, `${smartAutoCompleteCode}\n${surrenderFuncCode}\n${clashHelpersCode}`);
console.log('8-10. Smart 40-card autocomplete, surrenderMatch, and clash helpers added.');

// =========================================================================
// 11. GOLD BALANCING IN checkWin() (+100 vs IA, +200 in P2P)
// =========================================================================
const checkWinOld = `    function checkWin() {
      if (!battleState || battleState.isGameOver) return;

      const p1Alive = battleState.grid.some(p => p && p.owner === 'p1' && p.type === 'commander' && p.hp > 0);
      const p2Alive = battleState.grid.some(p => p && p.owner === 'p2' && p.type === 'commander' && p.hp > 0);

      const role = getMyRole();
      if (!p2Alive) {
        battleState.isGameOver = true;
        addLog("BATTAGLIA CONCLUSA: VITTORIA DI P1!", 'sys');
        if (role === 'p1') {
          userState.gold = (userState.gold || 0) + 100;
          updateNavGold();
          saveCloudState();
          alert("🏆 VITTORIA! Il Comandante nemico è stato abbattuto. Guadagni +100 Oro 🪙!");
        } else {
          alert("💀 SCONFITTA! Il tuo Comandante è caduto sul campo di battaglia.");
        }
        showPaneDirect('home');
      } else if (!p1Alive) {
        battleState.isGameOver = true;
        addLog("BATTAGLIA CONCLUSA: VITTORIA DI P2!", 'sys');
        if (role === 'p2') {
          userState.gold = (userState.gold || 0) + 100;
          updateNavGold();
          saveCloudState();
          alert("🏆 VITTORIA! Il Comandante nemico è stato abbattuto. Guadagni +100 Oro 🪙!");
        } else {
          alert("💀 SCONFITTA! Il tuo Comandante è caduto sul campo di battaglia.");
        }
        showPaneDirect('home');
      }
    }`;

const checkWinNew = `    function checkWin() {
      if (!battleState || battleState.isGameOver) return;

      const p1Alive = battleState.grid.some(p => p && p.owner === 'p1' && p.type === 'commander' && p.hp > 0);
      const p2Alive = battleState.grid.some(p => p && p.owner === 'p2' && p.type === 'commander' && p.hp > 0);

      const role = getMyRole();
      const goldReward = battleState.isP2P ? 200 : 100;

      if (!p2Alive) {
        battleState.isGameOver = true;
        addLog("BATTAGLIA CONCLUSA: VITTORIA DI P1!", 'sys');
        if (role === 'p1') {
          userState.gold = (userState.gold || 0) + goldReward;
          updateNavGold();
          saveCloudState();
          alert(\`🏆 VITTORIA! Il Comandante nemico è stato abbattuto. Guadagni +\${goldReward} Oro 🪙!\`);
        } else {
          alert("💀 SCONFITTA! Il tuo Comandante è caduto sul campo di battaglia.");
        }
        showPaneDirect('home');
      } else if (!p1Alive) {
        battleState.isGameOver = true;
        addLog("BATTAGLIA CONCLUSA: VITTORIA DI P2!", 'sys');
        if (role === 'p2') {
          userState.gold = (userState.gold || 0) + goldReward;
          updateNavGold();
          saveCloudState();
          alert(\`🏆 VITTORIA! Il Comandante nemico è stato abbattuto. Guadagni +\${goldReward} Oro 🪙!\`);
        } else {
          alert("💀 SCONFITTA! Il tuo Comandante è caduto sul campo di battaglia.");
        }
        showPaneDirect('home');
      }
    }`;

if (!content.includes(checkWinOld)) {
  console.error("ERROR: Could not find checkWinOld in content");
  process.exit(1);
}
content = content.replace(checkWinOld, checkWinNew);
console.log('11. Gold reward balancing applied (+100 IA, +200 P2P).');

// =========================================================================
// 12. RITE 1 PER TURNO: startTurnFor, useWeaponRiteP1, executeRiteAction, updateHUD
// =========================================================================
// Reset riteUsedThisTurn in startTurnFor
const startTurnOld = `      battleState[nextTurn].altarDeployedThisTurn = false;`;
const startTurnNew = `      battleState[nextTurn].altarDeployedThisTurn = false;
      battleState[nextTurn].riteUsedThisTurn = false;`;

if (!content.includes(startTurnOld)) {
  console.error("ERROR: Could not find startTurnOld in content");
  process.exit(1);
}
content = content.replace(startTurnOld, startTurnNew);

// In useWeaponRiteP1: check riteUsedThisTurn
const useRiteP1Old = `    function useWeaponRiteP1() {
      const role = getMyRole();
      if (!battleState || battleState.turn !== role) return showToast("Attendi il tuo turno!");
      const comm = battleState[role].commander;
      if (!comm) return;
      if (comm.id === 'kaelen') {
        startKaelenRiteSelection(role);
      } else {
        executeRiteAction(role, true);
      }
    }`;

const useRiteP1New = `    function useWeaponRiteP1() {
      const role = getMyRole();
      if (!battleState || battleState.turn !== role) return showToast("Attendi il tuo turno!");
      if (battleState[role].riteUsedThisTurn) {
        return showToast("I Riti possono essere usati al MASSIMO una volta per turno!");
      }
      const comm = battleState[role].commander;
      if (!comm) return;
      if (comm.id === 'kaelen') {
        startKaelenRiteSelection(role);
      } else {
        executeRiteAction(role, true);
      }
    }`;

if (!content.includes(useRiteP1Old)) {
  console.error("ERROR: Could not find useRiteP1Old in content");
  process.exit(1);
}
content = content.replace(useRiteP1Old, useRiteP1New);

// In startKaelenRiteSelection: check riteUsedThisTurn
const kaelenRiteOld = `    function startKaelenRiteSelection(role) {
      const comm = battleState[role].commander;
      if (battleState[role].blood < comm.riteCost) {
        return showToast(\`Sangue insufficiente! Richiede \${comm.riteCost} 🩸.\`);
      }`;

const kaelenRiteNew = `    function startKaelenRiteSelection(role) {
      const comm = battleState[role].commander;
      if (battleState[role].riteUsedThisTurn) {
        return showToast("I Riti possono essere usati al MASSIMO una volta per turno!");
      }
      if (battleState[role].blood < comm.riteCost) {
        return showToast(\`Sangue insufficiente! Richiede \${comm.riteCost} 🩸.\`);
      }`;

if (!content.includes(kaelenRiteOld)) {
  console.error("ERROR: Could not find kaelenRiteOld in content");
  process.exit(1);
}
content = content.replace(kaelenRiteOld, kaelenRiteNew);

// In executeKaelenSwap: set riteUsedThisTurn = true
const kaelenSwapOld = `    function executeKaelenSwap(firstIdx, secondIdx, player = getMyRole(), isOriginator = true) {
      const p1 = battleState.grid[firstIdx];
      const p2 = battleState.grid[secondIdx];
      if (!p1 || !p2) return;

      addLog(\`\${player.toUpperCase()} scatena il Rito d'Armi di Kaelen: scambia di posizione \${p1.name} e \${p2.name}!\`, player);`;

const kaelenSwapNew = `    function executeKaelenSwap(firstIdx, secondIdx, player = getMyRole(), isOriginator = true) {
      const p1 = battleState.grid[firstIdx];
      const p2 = battleState.grid[secondIdx];
      if (!p1 || !p2) return;

      battleState[player].riteUsedThisTurn = true;
      addLog(\`\${player.toUpperCase()} scatena il Rito d'Armi di Kaelen: scambia di posizione \${p1.name} e \${p2.name}!\`, player);`;

if (!content.includes(kaelenSwapOld)) {
  console.error("ERROR: Could not find kaelenSwapOld in content");
  process.exit(1);
}
content = content.replace(kaelenSwapOld, kaelenSwapNew);

// In executeRiteAction: check and set riteUsedThisTurn
const execRiteOld = `    function executeRiteAction(player = getMyRole(), isOriginator = true) {
      const comm = battleState[player].commander;
      const opp = (player === 'p1') ? 'p2' : 'p1';

      if (isOriginator && battleState[player].blood < comm.riteCost) {
        return showToast(\`Sangue insufficiente! Richiede \${comm.riteCost} 🩸.\`);
      }`;

const execRiteNew = `    function executeRiteAction(player = getMyRole(), isOriginator = true) {
      const comm = battleState[player].commander;
      const opp = (player === 'p1') ? 'p2' : 'p1';

      if (isOriginator && battleState[player].riteUsedThisTurn) {
        return showToast("I Riti possono essere usati al MASSIMO una volta per turno!");
      }
      if (isOriginator && battleState[player].blood < comm.riteCost) {
        return showToast(\`Sangue insufficiente! Richiede \${comm.riteCost} 🩸.\`);
      }

      battleState[player].riteUsedThisTurn = true;`;

if (!content.includes(execRiteOld)) {
  console.error("ERROR: Could not find execRiteOld in content");
  process.exit(1);
}
content = content.replace(execRiteOld, execRiteNew);

// In updateHUD: rite button appearance
const updateHUDOld = `      const role = getMyRole();
      const myComm = battleState[role].commander;
      const riteBtn = document.getElementById('btn-rite-p1');
      const blood = battleState[role].blood;
      const isReady = blood >= myComm.riteCost;

      riteBtn.textContent = \`🩸 Rito (\${blood}/\${myComm.riteCost}🩸)\`;
      riteBtn.title = \`\${myComm.name} — Rito d'Armi (\${myComm.riteCost} 🩸):\\n\${myComm.riteDesc}\\n\\nStato: \${isReady ? 'PRONTO! Clicca per attivare' : 'Sangue insufficiente'}\`;

      if (isReady && battleState.turn === role) {
        riteBtn.style.border = '2px solid #ff7675';
        riteBtn.style.boxShadow = '0 0 14px rgba(255, 118, 117, 0.8), 0 0 22px rgba(229, 185, 88, 0.5)';
        riteBtn.style.background = 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)';
        riteBtn.style.color = '#fff';
      } else {
        riteBtn.style.border = '1px solid var(--border-frame)';
        riteBtn.style.boxShadow = 'none';
        riteBtn.style.background = 'var(--bg-surface)';
        riteBtn.style.color = 'var(--text-muted)';
      }`;

const updateHUDNew = `      const role = getMyRole();
      const myComm = battleState[role].commander;
      const riteBtn = document.getElementById('btn-rite-p1');
      const blood = battleState[role].blood;
      const isUsed = !!battleState[role].riteUsedThisTurn;
      const isReady = (blood >= myComm.riteCost) && !isUsed;

      if (isUsed) {
        riteBtn.textContent = \`🩸 Rito Usato (1/turno)\`;
        riteBtn.title = \`\${myComm.name} — Rito già invocato in questo turno! Massimo 1 utilizzo per turno.\`;
      } else {
        riteBtn.textContent = \`🩸 Rito (\${blood}/\${myComm.riteCost}🩸)\`;
        riteBtn.title = \`\${myComm.name} — Rito d'Armi (\${myComm.riteCost} 🩸):\\n\${myComm.riteDesc}\\n\\nStato: \${isReady ? 'PRONTO! Clicca per attivare (max 1/turno)' : 'Sangue insufficiente'}\`;
      }

      if (isReady && battleState.turn === role) {
        riteBtn.style.border = '2px solid #ff7675';
        riteBtn.style.boxShadow = '0 0 14px rgba(255, 118, 117, 0.8), 0 0 22px rgba(229, 185, 88, 0.5)';
        riteBtn.style.background = 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)';
        riteBtn.style.color = '#fff';
        riteBtn.style.opacity = '1';
      } else {
        riteBtn.style.border = '1px solid var(--border-frame)';
        riteBtn.style.boxShadow = 'none';
        riteBtn.style.background = 'var(--bg-surface)';
        riteBtn.style.color = 'var(--text-muted)';
        riteBtn.style.opacity = isUsed ? '0.5' : '0.85';
      }`;

if (!content.includes(updateHUDOld)) {
  console.error("ERROR: Could not find updateHUDOld in content");
  process.exit(1);
}
content = content.replace(updateHUDOld, updateHUDNew);
console.log('12. Rite 1/turn limit applied in turn start, execution, and HUD.');

// =========================================================================
// 13. COMBAT CLASH OVERLAY CALL IN executeAttackAction()
// =========================================================================
const execAttackOld = `      addLog(\`\${att.name} attacca \${def.name} infliggendo \${damage} danni\`, player);
      def.hp -= damage;`;

const execAttackNew = `      // Visualizzazione sovraimpressione dinamica scontro
      showCombatClashOverlay(att, def, damage, (typeof counterDmg !== 'undefined' ? counterDmg : 0), {
        rawAtk: att.att,
        flankingBonus: (typeof flankingBonus !== 'undefined' ? flankingBonus : 0),
        isStructure: isStructure,
        absorbed: (typeof absorbed !== 'undefined' ? absorbed : 0),
        isRanged: (att.range && att.range > 1),
        defCannotCounter: (typeof defCannotCounter !== 'undefined' ? defCannotCounter : false)
      });

      addLog(\`\${att.name} attacca \${def.name} infliggendo \${damage} danni\`, player);
      def.hp -= damage;`;

if (!content.includes(execAttackOld)) {
  console.error("ERROR: Could not find execAttackOld in content");
  process.exit(1);
}
content = content.replace(execAttackOld, execAttackNew);
console.log('13. Combat clash overlay integrated into executeAttackAction.');

// =========================================================================
// 14. PIECE AURA & BUFF BADGES IN renderPieces()
// =========================================================================
const renderPiecesInnerOld = `          el.innerHTML = \`<span>\${p.type === 'commander' ? '👑' : p.type === 'altar' ? '🏛️' : (p.type === 'wall' ? (p.glyph || '🧱') : '⚔️')}</span><div class="piece-badges">\${p.att}/\${p.hp}</div>\`;
          sq.appendChild(el);`;

const renderPiecesInnerNew = `          const hasIronProt = hasIronAltarProtection(i, p);
          const hasFortressBuff = getAdjs(i).some(adj => battleState.grid[adj]?.name === 'Altare della Fortezza' && battleState.grid[adj]?.owner === p.owner);
          const auraBadges = [];
          if (hasIronProt) auraBadges.push('<span class="piece-aura-badge def" title="Protetto da Altare/Bastione di Ferro (-1 Danno)">🛡️-1</span>');
          if (hasFortressBuff) auraBadges.push('<span class="piece-aura-badge atk" title="Bonus Altare della Fortezza (+1 ATT Contrattacco)">+1⚔️</span>');
          if (p.hasTotalShield) auraBadges.push('<span class="piece-aura-badge shield" title="Scudo Totale Attivo">✨SCUDO</span>');
          if (p.armor || p.tempArmor) auraBadges.push(\`<span class="piece-aura-badge armor" title="Armatura +\${p.armor || p.tempArmor}">🛡️ARM</span>\`);

          const aurasHtml = auraBadges.length > 0 ? \`<div class="piece-auras-row">\${auraBadges.join('')}</div>\` : '';

          el.innerHTML = \`\${aurasHtml}<span>\${p.type === 'commander' ? '👑' : p.type === 'altar' ? '🏛️' : (p.type === 'wall' ? (p.glyph || '🧱') : '⚔️')}</span><div class="piece-badges">\${p.att}/\${p.hp}</div>\`;
          sq.appendChild(el);`;

if (!content.includes(renderPiecesInnerOld)) {
  console.error("ERROR: Could not find renderPiecesInnerOld in content");
  process.exit(1);
}
content = content.replace(renderPiecesInnerOld, renderPiecesInnerNew);
console.log('14. Aura and buff badges integrated into renderPieces.');

// Restore CRLF if file was CRLF originally
if (isCRLF) {
  content = content.replace(/\n/g, '\r\n');
}

// Write back to index.html and crownfall.html
fs.writeFileSync('index.html', content, 'utf8');
fs.writeFileSync('crownfall.html', content, 'utf8');

console.log('SUCCESS! index.html and crownfall.html successfully updated with 100% parity.');
