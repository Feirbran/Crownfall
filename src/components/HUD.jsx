import React from 'react';

export default function HUD({
  battleState,
  myRole = 'p1',
  onAdvancePhase = () => {},
  onUseRite = () => {},
  onInspectCard = () => {},
  onOpenDeckInspector = () => {},
  onOpenGraveInspector = () => {}
}) {
  if (!battleState) return null;

  const role = myRole;
  const opp = role === 'p1' ? 'p2' : 'p1';
  const myPlayer = battleState[role];
  const oppPlayer = battleState[opp];
  const isMyTurn = battleState.turn === role;
  const phase = battleState.turnPhase || 1;

  const myComm = myPlayer.commander || {};
  const oppComm = oppPlayer.commander || {};

  const blood = myPlayer.blood || 0;
  const riteCost = myComm.riteCost || 7;
  const isRiteUsed = !!myPlayer.riteUsedThisTurn;
  const isRiteReady = (blood >= riteCost) && !isRiteUsed && isMyTurn;

  const p1DeckCount = (battleState.p1?.deck?.length) || 0;
  const p1GraveCount = (battleState.p1?.graveyard?.length) || 0;
  const p2DeckCount = (battleState.p2?.deck?.length) || 0;
  const p2GraveCount = (battleState.p2?.graveyard?.length) || 0;

  const phaseLabels = [
    '1ª Fase: Mantenimento',
    '2ª Fase: Movimento & Azioni',
    '3ª Fase: Mantenimento Finale',
    '4ª Fase: Fine Turno'
  ];

  let turnBtnText = 'Turno Avversario...';
  let turnBtnClass = 'btn-disabled';

  if (isMyTurn) {
    if (phase === 1) {
      turnBtnText = 'Passa a Fase 2: Azioni ⚔️';
      turnBtnClass = 'btn-gold';
    } else if (phase === 2) {
      turnBtnText = 'Passa a Fase 3: Mantenimento 💧';
      turnBtnClass = 'btn-crimson';
    } else if (phase === 3) {
      turnBtnText = 'Passa a Fase 4: Fine Turno ⏳';
      turnBtnClass = 'btn-crimson';
    } else {
      turnBtnText = 'Fine Turno ⏳';
      turnBtnClass = 'btn-crimson';
    }
  }

  return (
    <div className="hud-panel-container">
      {/* 1. TOP COMBATANTS BAR */}
      <div className="hud-players-row">
        {/* P1 (ALLEATO) */}
        <div className="hud-player-card ally">
          <div
            className="hud-comm-header"
            onClick={() => onInspectCard(myComm)}
            title="Clicca per ispezionare il Comandante alleato"
          >
            <span className="comm-crown-glyph">{myComm.glyph || '🛡️'}</span>
            <div className="comm-info">
              <span className="comm-name">{myComm.name || 'Comandante'}</span>
              <span className="comm-role-tag ally">CONDOTTIERO (TUO)</span>
            </div>
          </div>
          <div className="hud-stats-grid">
            <div className="stat-box hp" title="Punti Vita Comandante">
              <span className="stat-icon">❤️</span>
              <span className="stat-val">{myPlayer.hp}</span>
            </div>
            <div className="stat-box mana" title="Mana Disponibile / Massimo">
              <span className="stat-icon">💧</span>
              <span className="stat-val">{myPlayer.mana}/{myPlayer.maxMana}</span>
            </div>
            <div className="stat-box blood" title="Riserva Sangue">
              <span className="stat-icon">🩸</span>
              <span className="stat-val">{myPlayer.blood}</span>
            </div>
            <div className="stat-box actions" title="Azioni Tattiche Rimanenti">
              <span className="stat-icon">⚡</span>
              <span className="stat-val">{myPlayer.actions}</span>
            </div>
          </div>
          <div className="hud-piles-shortcuts">
            <button className="hud-pile-btn" onClick={() => onOpenDeckInspector(role)}>
              📚 Mazzo: <strong>{p1DeckCount}</strong>
            </button>
            <button className="hud-pile-btn grave" onClick={() => onOpenGraveInspector(role)}>
              💀 Cimitero: <strong>{p1GraveCount}</strong>
            </button>
          </div>
        </div>

        {/* CENTER: RITE & PHASE ACTION */}
        <div className="hud-center-controls">
          <button
            className={`btn-rite-trigger ${isRiteReady ? 'ready pulse-gold' : ''} ${isRiteUsed ? 'used' : ''}`}
            onClick={onUseRite}
            disabled={!isRiteReady}
            title={`${myComm.name} — Rito (${riteCost}🩸): ${myComm.activeRiteDesc || myComm.riteDesc || ''}`}
          >
            <span className="rite-icon">🩸</span>
            <div className="rite-text-wrap">
              <span className="rite-label">RITO D'ARMI</span>
              <span className="rite-cost">({blood}/{riteCost}🩸)</span>
            </div>
          </button>

          <button
            className={`btn-turn-phase-trigger ${turnBtnClass}`}
            onClick={onAdvancePhase}
            disabled={!isMyTurn}
          >
            {turnBtnText}
          </button>
        </div>

        {/* P2 (NEMICO / IA) */}
        <div className="hud-player-card enemy">
          <div
            className="hud-comm-header"
            onClick={() => onInspectCard(oppComm)}
            title="Clicca per ispezionare il Comandante nemico"
          >
            <div className="comm-info text-right">
              <span className="comm-name">{oppComm.name || 'IA Avversaria'}</span>
              <span className="comm-role-tag enemy">AVVERSARIO (NEMICO)</span>
            </div>
            <span className="comm-crown-glyph">{oppComm.glyph || '💀'}</span>
          </div>
          <div className="hud-stats-grid">
            <div className="stat-box hp" title="Punti Vita Comandante Nemico">
              <span className="stat-icon">❤️</span>
              <span className="stat-val">{oppPlayer.hp}</span>
            </div>
            <div className="stat-box mana" title="Mana Nemico">
              <span className="stat-icon">💧</span>
              <span className="stat-val">{oppPlayer.mana}/{oppPlayer.maxMana}</span>
            </div>
            <div className="stat-box blood" title="Sangue Nemico">
              <span className="stat-icon">🩸</span>
              <span className="stat-val">{oppPlayer.blood}</span>
            </div>
            <div className="stat-box actions" title="Azioni Nemico">
              <span className="stat-icon">⚡</span>
              <span className="stat-val">{oppPlayer.actions}</span>
            </div>
          </div>
          <div className="hud-piles-shortcuts justify-end">
            <button className="hud-pile-btn" onClick={() => onOpenDeckInspector(opp)}>
              📚 Mazzo: <strong>{p2DeckCount}</strong>
            </button>
            <button className="hud-pile-btn grave" onClick={() => onOpenGraveInspector(opp)}>
              💀 Cimitero: <strong>{p2GraveCount}</strong>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TURN TIMELINE STRIP */}
      <div className="turn-phase-timeline-bar">
        {[1, 2, 3, 4].map((step) => {
          const isActive = phase === step;
          const isPassed = phase > step;
          return (
            <div
              key={step}
              className={`timeline-step ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
            >
              <span className="step-num">{step}</span>
              <span className="step-label">{phaseLabels[step - 1]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
