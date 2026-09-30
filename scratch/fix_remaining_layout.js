const fs = require('fs');

let s = fs.readFileSync('index.html', 'utf8');

// 1. Replace offline button in pane-auth
const authSearch = 'onclick="playOffline()">';
const authIdx = s.indexOf(authSearch);
if (authIdx !== -1) {
  const lineStart = s.lastIndexOf('<button', authIdx);
  const lineEnd = s.indexOf('</button>', authIdx) + '</button>'.length;
  const newButtons = `<button type="button" class="btn btn-gold" style="width: 100%; margin-top: 6px; padding: 12px; font-weight: 800; font-size: 0.92rem;" onclick="playOffline()">⚔️ GIOCA SUBITO (ACCESSO OSPITE IMMEDIATO)</button>
          <button type="button" class="btn" style="width: 100%; margin-top: 6px; border-color: var(--border-frame);" onclick="showPaneDirect('home')">🏛️ Torna al Menu Principale</button>`;
  s = s.substring(0, lineStart) + newButtons + s.substring(lineEnd);
  console.log("Replaced auth offline button!");
}

// 2. Replace pane-home layout
const homeHeaderEnd = '</header>\r\n\r\n        <div class="home-layout">';
const altHomeHeaderEnd = '</header>\n\n        <div class="home-layout">';
let hStart = s.indexOf(homeHeaderEnd);
let headerLen = homeHeaderEnd.length;
if (hStart === -1) {
  hStart = s.indexOf(altHomeHeaderEnd);
  headerLen = altHomeHeaderEnd.length;
}

const deckbuilderMarker = '<!-- DECKBUILDER -->';
const dIdx = s.indexOf(deckbuilderMarker);

if (hStart !== -1 && dIdx !== -1) {
  // Find the closing </div>\r\n    </div> right before <!-- DECKBUILDER -->
  const homeEnd = s.lastIndexOf('</div>', dIdx);
  const homeEnd2 = s.lastIndexOf('</div>', homeEnd - 1);

  const newHomeBody = `</header>

        <!-- HERO BANNER PRIMARIO CON AVVIO ISTANTANEO 1-CLICK -->
        <div class="home-hero-cta">
          <div class="hh-tag">⚡ SKIRMISH TATTICO DARK FANTASY</div>
          <h2 class="hh-title">Entra sul Campo di Battaglia di Veridia</h2>
          <p class="hh-desc">
            Schiera Altari per canalizzare Mana, muovi le tue miniature con precisione scacchistica e scatena i devastanti Riti d'Arma del tuo Comandante per frantumare la corona avversaria.
          </p>
          <div class="hh-buttons-row">
            <button class="btn-hero-primary" onclick="quickBattleAI()">
              <span>⚔️</span>
              <span>BATTAGLIA RAPIDA VS IA (+100 🪙)</span>
            </button>
            <button class="btn-hero-secondary" onclick="showPane('battle-lobby')">
              <span>🌐</span>
              <span>Lobby & Duello P2P (+200 🪙)</span>
            </button>
            <button class="btn-hero-secondary" onclick="showPaneDirect('tutorial')">
              <span>🎓</span>
              <span>Accademia Tattica</span>
            </button>
          </div>
        </div>

        <div class="home-layout">
          <!-- COLONNA SINISTRA: LORE & GUIDA RAPIDA -->
          <aside class="home-sidebar-lore">
            <div class="home-pillars-box">
              <h4 class="pillars-title">🎯 COME SI GIOCA IN 3 PASSI</h4>
              
              <div class="pillar-item">
                <span class="p-icon">🏛️</span>
                <div class="p-content">
                  <strong>1. Altari & Mana 💧</strong>
                  <p>Consacra Altari accanto al tuo Comandante per espandere il territorio e generare fino a 4 Mana per turno.</p>
                </div>
              </div>

              <div class="pillar-item">
                <span class="p-icon">⚔️</span>
                <div class="p-content">
                  <strong>2. Miniature & Aggiramento ⚡</strong>
                  <p>Spendi 2 Azioni a turno per muovere e colpire. Accerchia i nemici con due alleati per attivare il Flanking (+2 Danni!).</p>
                </div>
              </div>

              <div class="pillar-item">
                <span class="p-icon">👑</span>
                <div class="p-content">
                  <strong>3. Vittoria & Sangue 🩸</strong>
                  <p>Ogni unità caduta alimenta il Sangue per i Riti d'Arma. Abbatti il Comandante nemico per trionfare!</p>
                </div>
              </div>
            </div>

            <div class="home-lore-box" style="margin-top: 14px;">
              <div class="home-lore-header">
                <span class="hl-badge">CRONACHE DI VERIDIA</span>
                <h3>📖 I Cinque Ordini</h3>
              </div>
              <p class="home-lore-text">
                Dopo la <em>Sottrazione dell'Assoluto</em>, la Corona Primordiale si è spezzata. I cinque Ordini dominanti si sfidano: 
                <strong>Bastione di Ferro</strong>, <strong>Ceneri del Giudizio</strong>, <strong>Marea Abissale</strong>, 
                <strong>Silenzio Eterno</strong> e <strong>Forgia del Magma</strong>.
              </p>
            </div>
          </aside>

          <!-- COLONNA DESTRA: MODALITA DI GIOCO & PROGRESSIONE -->
          <main class="home-actions-main">
            <h4 class="actions-title">⚔️ ARENA & ARMERIA</h4>

            <div class="home-action-card battle-arena-action" onclick="showPane('battle-lobby')">
              <div class="action-card-left">
                <div class="action-icon">👑</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">LOBBY DI BATTAGLIA & STANZE LIVE</span>
                    <span class="action-reward-pill">🤖 IA: +100 🪙</span>
                    <span class="action-reward-pill p2p">🌐 P2P: +200 🪙</span>
                  </div>
                  <p class="action-desc">Scegli il Comandante avversario, configura match personalizzati o duella online contro altri giocatori in stanze P2P!</p>
                </div>
              </div>
              <button class="btn btn-crimson action-btn" onclick="event.stopPropagation(); showPane('battle-lobby')">APRI LOBBY</button>
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

            <div class="home-action-card pack-shop-action" onclick="showPane('packs')">
              <div class="action-card-left">
                <div class="action-icon">📦</div>
                <div class="action-info">
                  <div class="action-title-row">
                    <span class="action-title">MERCATO BOX & SBUSTA BUSTINE</span>
                    <span class="action-badge pulse-gold">RICOMPENSE</span>
                  </div>
                  <p class="action-desc">Spendi le monete d'oro vinte nelle battaglie per aprire box d'espansione e sbloccare carte Rare e Mitiche!</p>
                </div>
              </div>
              <button class="btn btn-gold action-btn" onclick="event.stopPropagation(); showPane('packs')">SBUSTA (100 🪙)</button>
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
      `;

  s = s.substring(0, hStart) + newHomeBody + s.substring(homeEnd2);
  console.log("Replaced home layout successfully!");
} else {
  console.error("Could not find home markers:", hStart, dIdx);
}

fs.writeFileSync('index.html', s, 'utf8');
fs.writeFileSync('crownfall.html', s, 'utf8');
console.log("Wrote updated index.html and crownfall.html!");
