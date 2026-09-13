import React from 'react';
import { CARDS_DB, RARITY_NAMES, getTroopArchetype } from '../data/cardsData.js';

export default function HandBar({
  hand = [],
  deckCount = 0,
  graveyardCount = 0,
  selectedHandIndex = null,
  onSelectCard = () => {},
  onInspectCard = () => {},
  onOpenDeckInspector = () => {},
  onOpenGraveInspector = () => {}
}) {
  return (
    <div className="battle-hand-bar-wrap">
      {/* 1. PILE SHORTCUTS ON LEFT */}
      <div className="hand-piles-sidebar">
        <div className="pile-slot deck" onClick={onOpenDeckInspector} title="Ispeziona Grimorio">
          <span className="pile-icon">📚</span>
          <span className="pile-count">{deckCount}</span>
          <span className="pile-label">MAZZO</span>
        </div>
        <div className="pile-slot grave" onClick={onOpenGraveInspector} title="Ispeziona Cimitero">
          <span className="pile-icon">💀</span>
          <span className="pile-count">{graveyardCount}</span>
          <span className="pile-label">CIMITERO</span>
        </div>
      </div>

      {/* 2. CARDS SCROLL STRIP */}
      <div className="hand-cards-scroll-container">
        {hand.length === 0 ? (
          <div className="empty-hand-hint">Mano vuota — Pescata all'inizio del turno o tramite abilità</div>
        ) : (
          hand.map((cardId, idx) => {
            const card = CARDS_DB[cardId] || { name: cardId, cost: 1, type: 'unit' };
            const isSelected = selectedHandIndex === idx;
            const r = card.rarity || 'common';
            const archetype = getTroopArchetype(card);
            const isAltar = card.type === 'altar';
            const isSpell = card.type === 'spell';
            const isReaction = card.type === 'reaction';

            const costPip = (card.bloodCost && card.bloodCost > 0) ? (
              <span className="hand-cost-pip blood">{card.bloodCost}🩸</span>
            ) : (
              <span className="hand-cost-pip mana">{card.cost !== undefined ? card.cost : 0}💧</span>
            );

            return (
              <div
                key={`${cardId}-${idx}`}
                className={`hand-card-token rarity-${r} ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectCard(idx)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onInspectCard(card);
                }}
              >
                <div className="hand-card-top">
                  {costPip}
                  <span className="hand-archetype-icon" style={{ color: archetype.color }}>
                    {archetype.icon}
                  </span>
                </div>

                <div className="hand-card-glyph">{card.glyph || '⚔️'}</div>

                <div className="hand-card-name" title={card.name}>
                  {card.shortName || card.name}
                </div>

                <div className="hand-card-bottom">
                  <span className="hand-type-tag">
                    {isAltar ? 'ALTARE' : isSpell ? 'MAGIA' : isReaction ? 'REAZ' : 'TRUPPA'}
                  </span>
                  {card.type === 'unit' && (
                    <span className="hand-pt-badge">
                      {card.att !== undefined ? card.att : 1}/{card.pv !== undefined ? card.pv : 1}
                    </span>
                  )}
                  {isAltar && (
                    <span className="hand-pt-badge altar">
                      {card.pv || 5}PV
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
