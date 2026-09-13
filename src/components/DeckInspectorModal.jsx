import React, { useState } from 'react';
import { CARDS_DB, RARITY_NAMES } from '../data/cardsData.js';

export default function DeckInspectorModal({
  isOpen = false,
  isGraveyard = false,
  cardsList = [],
  onClose = () => {},
  onInspectCard = () => {}
}) {
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  // Group cards by cardId
  const counts = {};
  cardsList.forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
  });

  const uniqueCards = Object.keys(counts).map(id => {
    const card = CARDS_DB[id] || { name: id, cost: 0, type: 'unit' };
    return { id, card, count: counts[id] };
  });

  const filtered = uniqueCards.filter(item => {
    const c = item.card;
    if (filterType !== 'all' && c.type !== filterType) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="battle-modal-backdrop" onClick={onClose}>
      <div className="battle-modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="battle-modal-header">
          <div className="bmh-title-wrap">
            <span className="bmh-icon">{isGraveyard ? '💀' : '📚'}</span>
            <div>
              <h3 className="bmh-title">
                {isGraveyard ? 'ISPETTORE CIMITERO' : 'ISPETTORE GRIMORIO'}
              </h3>
              <div className="bmh-subtitle">
                {isGraveyard ? `${cardsList.length} Carte Cadute in Battaglia` : `${cardsList.length} Carte Rimanenti nel Mazzo`}
              </div>
            </div>
          </div>
          <button className="btn-close-modal" onClick={onClose}>✕</button>
        </div>

        {/* CONTROLS */}
        <div className="battle-modal-controls">
          <div className="filter-pills-row">
            <button className={`fp-btn ${filterType === 'all' ? 'active' : ''}`} onClick={() => setFilterType('all')}>Tutte ({cardsList.length})</button>
            <button className={`fp-btn ${filterType === 'unit' ? 'active' : ''}`} onClick={() => setFilterType('unit')}>Truppe</button>
            <button className={`fp-btn ${filterType === 'altar' ? 'active' : ''}`} onClick={() => setFilterType('altar')}>Altari</button>
            <button className={`fp-btn ${filterType === 'spell' ? 'active' : ''}`} onClick={() => setFilterType('spell')}>Magie</button>
          </div>
          <input
            type="text"
            className="input-modal-search"
            placeholder="Cerca carta per nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CARDS GRID */}
        <div className="battle-modal-cards-grid">
          {filtered.length === 0 ? (
            <div className="empty-pile-msg">Nessuna carta corrisponde ai filtri selezionati.</div>
          ) : (
            filtered.map(item => {
              const c = item.card;
              const r = c.rarity || 'common';
              return (
                <div
                  key={item.id}
                  className={`pile-card-chip rarity-${r}`}
                  onClick={() => onInspectCard(c)}
                >
                  <div className="pcc-header">
                    <span className="pcc-cost">{c.cost !== undefined ? c.cost : 0}💧</span>
                    <span className="pcc-count">{item.count}x</span>
                  </div>
                  <div className="pcc-name">
                    <span>{c.glyph || '⚔️'}</span> {c.name}
                  </div>
                  <div className="pcc-footer">
                    <span>{c.type?.toUpperCase()}</span>
                    {c.type === 'unit' && <span>⚔️{c.att} ❤️{c.pv || c.hp}</span>}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
