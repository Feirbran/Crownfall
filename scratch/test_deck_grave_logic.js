const fs = require('fs');

const modalHtml = `
    <!-- MODAL ISPETTORE GRIMORIO & CIMITERO -->
    <div id="battle-pile-modal" class="battle-modal-backdrop" onclick="onPileBackdropClick(event)">
      <div class="battle-modal-window" onclick="event.stopPropagation()">
        <div class="battle-modal-header">
          <div class="bmh-title-wrap">
            <span class="bmh-icon" id="bpm-icon">📚</span>
            <div>
              <h3 class="bmh-title" id="bpm-title">ISPETTORE TATTICO: IL TUO GRIMORIO</h3>
              <span class="bmh-subtitle" id="bpm-subtitle">24 Carte Rimanenti nel Mazzo</span>
            </div>
          </div>
          <button class="btn btn-close-modal" onclick="closePileModal()">✖ Chiudi</button>
        </div>

        <!-- TABS NAVIGAZIONE -->
        <div class="bpm-tabs-bar">
          <button class="bpm-tab-btn active" id="bpm-tab-my-deck" onclick="setPileModalView('my-deck')">📚 Tuo Mazzo (<span id="bpm-badge-my-deck">0</span>)</button>
          <button class="bpm-tab-btn" id="bpm-tab-my-grave" onclick="setPileModalView('my-grave')">🪦 Tuo Cimitero (<span id="bpm-badge-my-grave">0</span>)</button>
          <button class="bpm-tab-btn" id="bpm-tab-opp-grave" onclick="setPileModalView('opp-grave')">💀 Cimitero Nemico (<span id="bpm-badge-opp-grave">0</span>)</button>
          <button class="bpm-tab-btn" id="bpm-tab-opp-deck" onclick="setPileModalView('opp-deck')">👁️ Mazzo Nemico (<span id="bpm-badge-opp-deck">0</span>)</button>
        </div>

        <!-- STATS & SUMMARY BAR -->
        <div class="bpm-summary-bar" id="bpm-summary-bar"></div>

        <!-- FILTER & SEARCH BAR -->
        <div class="bpm-filter-bar">
          <input type="text" class="bpm-search-input" id="bpm-search" placeholder="🔍 Cerca per nome..." oninput="onPileSearchInput(this.value)">
          <div class="bpm-filter-group" id="bpm-type-filters">
            <button class="bpm-filter-btn active" id="bpm-f-all" onclick="setPileTypeFilter('all')">Tutti</button>
            <button class="bpm-filter-btn" id="bpm-f-unit" onclick="setPileTypeFilter('unit')">⚔️ Miniature</button>
            <button class="bpm-filter-btn" id="bpm-f-altar" onclick="setPileTypeFilter('altar')">🏛️ Altari</button>
            <button class="bpm-filter-btn" id="bpm-f-spell" onclick="setPileTypeFilter('spell')">✨ Magie & Reazioni</button>
          </div>
        </div>

        <!-- LISTA CARTE -->
        <div class="bpm-cards-body" id="bpm-cards-body"></div>
      </div>
    </div>
`;

fs.writeFileSync('scratch/pile_modal.html', modalHtml, 'utf8');
console.log('Saved pile modal html.');
