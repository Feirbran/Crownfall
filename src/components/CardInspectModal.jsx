import React from 'react';
import { RARITY_NAMES, getTroopArchetype, formatCardDesc } from '../data/cardsData.js';

export default function CardInspectModal({
  card,
  onClose = () => {}
}) {
  if (!card) return null;

  const isComm = card.type === 'commander' || !!card.riteDesc;
  const archetype = getTroopArchetype(card);
  const r = card.rarity || 'common';
  const rarityLabel = RARITY_NAMES[r] || 'Comune';

  const moveLabels = {
    ortho: 'Ortogonale (1 passo in croce ↕️↔️)',
    orth: 'Ortogonale (1 passo in croce ↕️↔️)',
    ortho2: 'Ortogonale Esteso (fino a 2 passi in linea retta)',
    orth2: 'Ortogonale Esteso (fino a 2 passi in linea retta)',
    diag: 'Diagonale (1 passo in X ↗️↘️↙️↖️)',
    omni: 'Omnidirezionale (1 passo in qualsiasi delle 8 direzioni)',
    knight: 'Balzo a L / Cavalleria (Salta ostacoli con traiettoria a L ♞)',
    none: 'Immobile / Struttura Fissa'
  };
  const moveDesc = moveLabels[card.move] || card.move || 'Ortogonale (1 passo)';

  const range = card.range || card.gittata || 1;

  // Extract aura and rite if present
  let auraText = card.auraDesc || '';
  let riteText = card.activeRiteDesc || '';
  if (isComm && !auraText && !riteText) {
    const rawDesc = card.rawDesc || card.desc || '';
    const auraMatch = rawDesc.match(/Aura:\s*([^.]+(?:\.[^Rito]+)?)/i);
    const riteMatch = rawDesc.match(/Rito[^:]*:\s*(.+)/i);
    if (auraMatch) auraText = auraMatch[1].trim();
    if (riteMatch) riteText = riteMatch[1].trim();
    if (!auraText && !riteText) auraText = rawDesc;
  }

  return (
    <div className="card-inspect-backdrop" onClick={onClose}>
      <div className="card-inspect-dialog" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="cid-header">
          <div className="cid-title-row">
            <span className="cid-glyph">{card.glyph || '⚔️'}</span>
            <div>
              <h3 className="cid-name">{card.name}</h3>
              <div className="cid-tags">
                <span className={`rarity-badge ${r}`}>{rarityLabel}</span>
                <span className="cid-faction-tag">{card.faction || 'Neutrale'}</span>
                <span className="cid-archetype-tag" style={{ color: archetype.color }}>
                  {archetype.icon} {archetype.label}
                </span>
              </div>
            </div>
          </div>
          <button className="btn-close-inspect" onClick={onClose}>✕</button>
        </div>

        {/* STATS & ATTRIBUTES ROW */}
        <div className="cid-stats-bar">
          <div className="cid-stat-chip">
            <span className="sc-lbl">COSTO</span>
            <span className="sc-val">
              {card.bloodCost ? `${card.bloodCost}🩸` : `${card.cost !== undefined ? card.cost : 0}💧`}
            </span>
          </div>
          {(card.att !== undefined || card.type === 'unit' || isComm) && (
            <div className="cid-stat-chip">
              <span className="sc-lbl">ATTACCO</span>
              <span className="sc-val">⚔️ {card.att || 0}</span>
            </div>
          )}
          {(card.hp !== undefined || card.pv !== undefined) && (
            <div className="cid-stat-chip">
              <span className="sc-lbl">PUNTI VITA</span>
              <span className="sc-val">❤️ {card.hp || card.pv || 1}</span>
            </div>
          )}
          <div className="cid-stat-chip">
            <span className="sc-lbl">GITTATA</span>
            <span className="sc-val">🏹 {range} {range > 1 ? '(Distanza)' : '(Mischia)'}</span>
          </div>
        </div>

        {/* MOVEMENT RULE */}
        <div className="cid-move-section">
          <div className="cms-title">🧭 MOVIMENTO SULLA SCACCHIERA:</div>
          <div className="cms-desc">{moveDesc}</div>
        </div>

        {/* ABILITIES SECTION */}
        <div className="cid-abilities-container">
          {isComm ? (
            <>
              {auraText && (
                <div className="commander-ability-card passive">
                  <div className="cac-header">
                    <span className="skill-pill passive-pill">🛡️ AURA PASSIVA</span>
                  </div>
                  <div
                    className="cac-body"
                    dangerouslySetInnerHTML={{ __html: formatCardDesc(auraText) }}
                  />
                </div>
              )}
              <div className="commander-ability-card active">
                <div className="cac-header">
                  <span className="skill-pill active-pill">
                    ⚡ RITO D'ARMI ({card.riteCost || card.bloodCost || 7}🩸, 1⚡)
                  </span>
                  <span className="skill-name">{card.rite || "Rito Supremo"}</span>
                </div>
                <div
                  className="cac-body"
                  dangerouslySetInnerHTML={{ __html: formatCardDesc(riteText || card.riteDesc || '') }}
                />
              </div>
            </>
          ) : (
            <div className="unit-desc-card">
              <div className="udc-title">📜 ABILITÀ & EFFETTI:</div>
              <div
                className="udc-body"
                dangerouslySetInnerHTML={{ __html: formatCardDesc(card.desc || 'Nessuna abilità speciale.') }}
              />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="cid-footer">
          <span className="cid-set-badge">Set: {card.set || 'α'}</span>
          <button className="btn btn-gold" onClick={onClose}>Chiudi Scheda</button>
        </div>
      </div>
    </div>
  );
}
