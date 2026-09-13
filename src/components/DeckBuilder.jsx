import React, { useState } from 'react';
import { CARDS_DB, COMMANDERS, RARITY_NAMES, getTroopArchetype } from '../data/cardsData.js';

export default function DeckBuilder({
  userState,
  onSaveUserState = () => {},
  onBackToLobby = () => {},
  onInspectCard = () => {}
}) {
  const [activeDeckName, setActiveDeckName] = useState(userState.activeDeckName || 'Mazzo Base');
  const [filterMode, setFilterMode] = useState('cards'); // 'cards' or 'commander_select'
  const [filterType, setFilterType] = useState('all');
  const [filterFaction, setFilterFaction] = useState('all');
  const [search, setSearch] = useState('');

  const decks = userState.decks || {};
  const currentDeck = decks[activeDeckName] || { cards: [], commanderId: 'valeria' };
  const currentComm = COMMANDERS[currentDeck.commanderId] || COMMANDERS['valeria'];
  const commFaction = currentComm.faction || 'Ferro';

  const cardsCount = currentDeck.cards.length;

  const handleAddCard = (cardKey) => {
    const card = CARDS_DB[cardKey];
    if (!card) return;
    if (card.faction !== commFaction && card.faction !== 'Neutral') {
      alert(`Questa carta appartiene a ${card.faction}. Il Comandante ${currentComm.name} accetta solo carte ${commFaction} e Neutrali!`);
      return;
    }
    const existingCopies = currentDeck.cards.filter(id => id === cardKey).length;
    if (existingCopies >= 3) {
      alert("Massimo 3 copie per carta nel Grimorio!");
      return;
    }
    if (currentDeck.cards.length >= 40) {
      alert("Il Grimorio ha raggiunto la dimensione massima di 40 carte!");
      return;
    }
    const updatedCards = [...currentDeck.cards, cardKey];
    const updatedDecks = {
      ...decks,
      [activeDeckName]: { ...currentDeck, cards: updatedCards }
    };
    onSaveUserState({ ...userState, decks: updatedDecks });
  };

  const handleRemoveCard = (cardKey) => {
    const idx = currentDeck.cards.indexOf(cardKey);
    if (idx === -1) return;
    const updatedCards = [...currentDeck.cards];
    updatedCards.splice(idx, 1);
    const updatedDecks = {
      ...decks,
      [activeDeckName]: { ...currentDeck, cards: updatedCards }
    };
    onSaveUserState({ ...userState, decks: updatedDecks });
  };

  const handleSelectCommander = (commId) => {
    const newComm = COMMANDERS[commId];
    if (!newComm) return;
    const newFaction = newComm.faction;

    // Remove incompatible faction cards
    const filteredCards = currentDeck.cards.filter(cId => {
      const c = CARDS_DB[cId];
      if (!c) return true;
      return c.faction === newFaction || c.faction === 'Neutral';
    });

    const updatedDecks = {
      ...decks,
      [activeDeckName]: {
        ...currentDeck,
        commanderId: commId,
        cards: filteredCards
      }
    };
    onSaveUserState({ ...userState, decks: updatedDecks });
    setFilterMode('cards');
  };

  // Group cards for the deck tray
  const trayCounts = {};
  currentDeck.cards.forEach(cId => {
    trayCounts[cId] = (trayCounts[cId] || 0) + 1;
  });

  // Filter catalog
  const catalogList = Object.entries(CARDS_DB).filter(([key, card]) => {
    if (filterType !== 'all' && card.type !== filterType) return false;
    if (filterFaction !== 'all' && card.faction !== filterFaction) return false;
    if (search && !card.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="deck-builder-page">
      {/* TOP HEADER */}
      <div className="db-top-header">
        <div className="db-title-wrap">
          <button className="btn btn-gold" onClick={onBackToLobby}>
            ← Torna alla Lobby
          </button>
          <h2>⚔️ ISPETTORE GRIMORI & COMANDANTI</h2>
        </div>

        <div className="db-deck-selector-row">
          <label>Mazzo Attivo:</label>
          <select
            className="db-select"
            value={activeDeckName}
            onChange={(e) => {
              setActiveDeckName(e.target.value);
              onSaveUserState({ ...userState, activeDeckName: e.target.value });
            }}
          >
            {Object.keys(decks).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <button
            className="btn btn-crimson"
            onClick={() => {
              const name = prompt("Nome del nuovo Grimorio:");
              if (!name) return;
              const newDecks = {
                ...decks,
                [name]: { commanderId: 'valeria', cards: [] }
              };
              onSaveUserState({ ...userState, decks: newDecks, activeDeckName: name });
              setActiveDeckName(name);
            }}
          >
            + Nuovo Grimorio
          </button>
        </div>
      </div>

      {/* MAIN BUILDER WORKSPACE */}
      <div className="db-workspace-grid">
        {/* LEFT / CENTER: CATALOG / COMMANDER SELECTOR */}
        <div className="db-catalog-panel">
          <div className="db-catalog-controls">
            <div className="db-mode-buttons">
              <button
                className={`db-mode-tab ${filterMode === 'cards' ? 'active' : ''}`}
                onClick={() => setFilterMode('cards')}
              >
                🃏 Catalogo Carte
              </button>
              <button
                className={`db-mode-tab ${filterMode === 'commander_select' ? 'active' : ''}`}
                onClick={() => setFilterMode('commander_select')}
              >
                👑 Scegli Comandante ({currentComm.name})
              </button>
            </div>

            {filterMode === 'cards' && (
              <div className="db-filter-chips">
                <select
                  className="db-select-filter"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">Tutti i Tipi</option>
                  <option value="unit">Truppe</option>
                  <option value="altar">Altari</option>
                  <option value="spell">Magie</option>
                  <option value="reaction">Reazioni</option>
                </select>

                <select
                  className="db-select-filter"
                  value={filterFaction}
                  onChange={(e) => setFilterFaction(e.target.value)}
                >
                  <option value="all">Tutte le Fazioni</option>
                  <option value="Ferro">Bastione di Ferro 🛡️</option>
                  <option value="Ceneri">Ceneri del Giudizio 💀</option>
                  <option value="Marea">Marea Abissale 🌊</option>
                  <option value="Silenzio">Silenzio Eterno ⚖️</option>
                  <option value="Forgia">Forgia del Magma 🌋</option>
                  <option value="Neutral">Neutrali ⚔️</option>
                </select>

                <input
                  type="text"
                  className="db-input-search"
                  placeholder="Cerca per nome o abilità..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* CARDS CATALOG GRID */}
          {filterMode === 'cards' ? (
            <div className="db-cards-grid">
              {catalogList.map(([k, card]) => {
                const isCompatible = card.faction === commFaction || card.faction === 'Neutral';
                const countInDeck = trayCounts[k] || 0;
                const r = card.rarity || 'common';
                const archetype = getTroopArchetype(card);

                return (
                  <div
                    key={k}
                    className={`mtg-card rarity-${r} ${isCompatible ? '' : 'incompatible'}`}
                    onClick={() => handleAddCard(k)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      onInspectCard(card);
                    }}
                  >
                    <div className="mtg-card-header">
                      <span className="mtg-card-title">{card.name}</span>
                      <span className="mtg-cost-pip">
                        {card.bloodCost ? `${card.bloodCost}🩸` : `${card.cost || 0}💧`}
                      </span>
                    </div>

                    <div className="mtg-card-art">
                      <span className="mtg-card-art-glyph">{card.glyph || '⚔️'}</span>
                    </div>

                    <div className="mtg-type-banner">
                      <span>{archetype.icon} {card.type?.toUpperCase()}</span>
                      <span className="count-badge-in-deck">{countInDeck}/3</span>
                    </div>

                    <div className="mtg-text-box">
                      {card.desc}
                    </div>

                    <div className="mtg-card-footer">
                      <span className="mtg-set-badge">{card.set || 'α'}</span>
                      {card.type === 'unit' && (
                        <span className="mtg-pt-box">⚔️{card.att} ❤️{card.pv}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* COMMANDERS SELECTION GRID */
            <div className="db-commanders-grid">
              {Object.values(COMMANDERS).filter((c, idx, arr) => arr.findIndex(x => x.id === c.id) === idx).map(comm => {
                const isSelected = comm.id === currentDeck.commanderId;
                return (
                  <div
                    key={comm.id}
                    className={`db-comm-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectCommander(comm.id)}
                  >
                    <div className="dcc-header">
                      <span className="dcc-glyph">{comm.glyph}</span>
                      <div>
                        <h4>{comm.name}</h4>
                        <span className="dcc-faction">Fazione: {comm.faction}</span>
                      </div>
                    </div>
                    <div className="dcc-stats">
                      <span>❤️ {comm.hp} PV</span>
                      <span>⚔️ {comm.att} ATT</span>
                      <span>🩸 Rito: {comm.riteCost}🩸</span>
                    </div>
                    <div className="dcc-aura-box">
                      <strong>🛡️ Aura:</strong> {comm.auraDesc}
                    </div>
                    <div className="dcc-rite-box">
                      <strong>⚡ Rito:</strong> {comm.activeRiteDesc}
                    </div>
                    <button className={`btn ${isSelected ? 'btn-gold' : 'btn-surface'}`}>
                      {isSelected ? '✓ Leader Attuale' : 'Seleziona come Leader'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT: DECK TRAY */}
        <div className="db-tray-panel">
          <div className="db-tray-header">
            <div className="tray-title-row">
              <h3>{activeDeckName}</h3>
              <span className={`tray-counter ${cardsCount >= 30 && cardsCount <= 40 ? 'valid' : 'invalid'}`}>
                {cardsCount}/30-40 Carte
              </span>
            </div>
            <div className="tray-comm-banner" onClick={() => setFilterMode('commander_select')}>
              <span className="tcb-glyph">{currentComm.glyph}</span>
              <div>
                <div className="tcb-name">{currentComm.name} ({currentComm.faction})</div>
                <div className="tcb-hint">Clicca per cambiare Comandante</div>
              </div>
            </div>
          </div>

          <div className="db-tray-cards-list">
            {Object.keys(trayCounts).length === 0 ? (
              <div className="empty-tray-msg">Il mazzo è vuoto. Clicca sulle carte a sinistra per aggiungerle!</div>
            ) : (
              Object.keys(trayCounts).map(cId => {
                const c = CARDS_DB[cId] || { name: cId, cost: 0 };
                const r = c.rarity || 'common';
                return (
                  <div
                    key={cId}
                    className={`tray-card-item rarity-${r}`}
                    onClick={() => handleRemoveCard(cId)}
                    title="Clicca per rimuovere una copia"
                  >
                    <span className="tci-cost">{c.cost !== undefined ? c.cost : 0}💧</span>
                    <span className="tci-name"><span>{c.glyph || '⚔️'}</span> {c.name}</span>
                    <span className="tci-count">{trayCounts[cId]}x</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
