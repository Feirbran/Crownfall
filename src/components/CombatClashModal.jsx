import React from 'react';

export default function CombatClashModal({
  clashData,
  onClose = () => {}
}) {
  if (!clashData) return null;

  const { att, def, damage, counterDmg = 0, details = {} } = clashData;
  const defInitialHp = (def.hp || 0) + damage;
  const defResultHp = Math.max(0, def.hp || 0);

  return (
    <div className="combat-clash-overlay" onClick={onClose}>
      <div className="clash-modal" onClick={onClose}>
        <div className="clash-header">
          <span className="clash-icon">⚔️</span>
          <span className="clash-title">SCONTRO TATTICO SULLA PLANCIA</span>
          <span className="clash-icon">⚔️</span>
        </div>

        <div className="clash-fighters-row">
          {/* CARTA ATTACCANTE */}
          <div className="clash-card attacker">
            <div className="clash-card-badge">ATTACCANTE ({att.owner === 'p1' ? 'TUO' : 'NEMICO'})</div>
            <div className="clash-card-glyph">{att.glyph || '⚔️'}</div>
            <div className="clash-card-name" title={att.name}>{att.name || 'Attaccante'}</div>
            <div className="clash-card-stats">⚔️ {att.att} ATT  •  ❤️ {att.hp} PV</div>
          </div>

          {/* CENTRO: FORMULA DI COMBATTIMENTO */}
          <div className="clash-vs-box">
            <div className="clash-vs-icon">💥</div>
            <div className="clash-formula">
              <span>⚔️ Potenza Base: <strong>{details.rawAtk !== undefined ? details.rawAtk : att.att}</strong></span>
              {details.flankingBonus > 0 && (
                <span style={{ color: '#2ecc71' }}>+ Aggiramento (Flanking): <strong>+{details.flankingBonus}</strong></span>
              )}
              {details.isStructure && (
                <span style={{ color: '#f39c12' }}>💥 Sfondamento Struttura</span>
              )}
              {details.absorbed > 0 && (
                <span style={{ color: '#74b9ff' }}>🛡️ Armatura/Riparo: <strong>-{details.absorbed}</strong></span>
              )}
            </div>

            <div className="clash-damage-banner">
              💥 {damage} DANNI INFLITTI
            </div>

            {counterDmg > 0 ? (
              <div className="clash-counter-banner">
                🛡️ Contrattacco Nemico: {counterDmg} Danni
              </div>
            ) : details.isRanged ? (
              <div className="clash-counter-banner">
                🏹 Tiro a Distanza: Nessun Contrattacco
              </div>
            ) : details.defCannotCounter ? (
              <div className="clash-counter-banner">
                🛡️ Il Difensore non può contrattaccare
              </div>
            ) : null}
          </div>

          {/* CARTA DIFENSORE */}
          <div className="clash-card defender">
            <div className="clash-card-badge def">DIFENSORE ({def.owner === 'p1' ? 'TUO' : 'NEMICO'})</div>
            <div className="clash-card-glyph">{def.glyph || '🛡️'}</div>
            <div className="clash-card-name" title={def.name}>{def.name || 'Difensore'}</div>
            <div className="clash-card-stats">
              ❤️ {defInitialHp} ➔ {defResultHp <= 0 ? '💀 CADUTO' : `${defResultHp} PV`}
            </div>
          </div>
        </div>

        <button className="clash-dismiss-btn" onClick={onClose}>
          Continua (Spazio / Click) ➔
        </button>
        <div className="clash-footer-hint">Premi Barra Spaziatrice o tocca ovunque per chiudere</div>
      </div>
    </div>
  );
}
