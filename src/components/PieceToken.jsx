import React from 'react';
import { getTroopArchetype } from '../data/cardsData.js';

export default function PieceToken({
  piece,
  isAlly = true,
  isCommander = false,
  isAltar = false,
  isWall = false,
  isExhausted = false,
  isBoosted = false,
  hasTotalShield = false,
  armor = 0,
  hasIronProtection = false,
  onInspect = null
}) {
  if (!piece) return null;

  const archetype = getTroopArchetype(piece);
  const owner = piece.owner || (isAlly ? 'p1' : 'p2');
  const roleClass = isAlly ? 'ally-piece' : 'enemy-piece';
  const shortName = piece.shortName || (piece.name ? piece.name.slice(0, 7).toUpperCase() : 'UNIT');
  const glyph = piece.glyph || (isCommander ? '👑' : isAltar ? '🏛️' : isWall ? '🧱' : '⚔️');
  const att = piece.att !== undefined ? piece.att : 0;
  const hp = piece.hp !== undefined ? piece.hp : (piece.pv !== undefined ? piece.pv : 1);
  const range = piece.range || piece.gittata || 1;

  return (
    <div
      className={`tactical-piece-token ${roleClass} ${owner} ${isExhausted ? 'exhausted' : ''} ${isCommander ? 'commander-token' : ''} ${isAltar ? 'altar-token' : ''} ${isWall ? 'wall-token' : ''} ${isBoosted ? 'resonant-boost' : ''}`}
      onClick={(e) => {
        if (onInspect) {
          e.stopPropagation();
          onInspect(piece);
        }
      }}
      title={`${piece.name} (${isAlly ? 'Alleato' : 'Nemico'}) - Clicca per dettagli`}
    >
      {/* 1. FACTION & TEAM INDICATOR BAR */}
      <div className="token-top-bar">
        <span className={`team-tag-badge ${isAlly ? 'ally' : 'enemy'}`}>
          {isAlly ? 'TUO' : 'NEMICO'}
        </span>
        <span
          className="archetype-badge"
          style={{ background: archetype.color + '25', borderColor: archetype.color, color: archetype.color }}
          title={`${archetype.label} (${archetype.icon})`}
        >
          {archetype.icon}
        </span>
      </div>

      {/* 2. GLYPH & SHORT NAME */}
      <div className="token-glyph-center">
        <span className="token-glyph">{glyph}</span>
      </div>
      <div className="token-name-tag" title={piece.name}>
        {shortName}
      </div>

      {/* 3. AURAS & STATUS BADGES */}
      <div className="token-auras-row">
        {hasTotalShield && <span className="aura-badge shield" title="Scudo Totale Attivo">✨SCUDO</span>}
        {(armor > 0) && <span className="aura-badge armor" title={`Armatura: -${armor} Danni`}>🛡️{armor}</span>}
        {hasIronProtection && <span className="aura-badge iron" title="Protetto da Altare di Ferro">🛡️-1</span>}
        {range > 1 && <span className="aura-badge range" title={`Gittata ${range} (Attacco a Distanza)`}>🏹{range}</span>}
      </div>

      {/* 4. ATTACK / HEALTH COMBAT STATS */}
      <div className="token-stats-dock">
        <span className="token-stat-pill atk" title={`Attacco: ${att}`}>
          ⚔️{att}
        </span>
        <span className="token-stat-pill hp" title={`Punti Vita: ${hp}`}>
          ❤️{hp}
        </span>
      </div>
    </div>
  );
}
