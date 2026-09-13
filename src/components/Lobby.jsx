import React, { useState } from 'react';
import { COMMANDERS } from '../data/cardsData.js';

export default function Lobby({
  userState,
  onStartSinglePlayer = () => {},
  onOpenDeckBuilder = () => {},
  onOpenLore = () => {}
}) {
  const decks = userState.decks || {};
  const [selectedDeck, setSelectedDeck] = useState(userState.activeDeckName || Object.keys(decks)[0] || 'Mazzo Base');
  const [selectedAiComm, setSelectedAiComm] = useState('malakor');

  const currentDeck = decks[selectedDeck] || { cards: [], commanderId: 'valeria' };
  const playerComm = COMMANDERS[currentDeck.commanderId] || COMMANDERS['valeria'];
  const aiComm = COMMANDERS[selectedAiComm] || COMMANDERS['malakor'];

  const uniqueCommanders = Object.values(COMMANDERS).filter((c, idx, arr) => arr.findIndex(x => x.id === c.id) === idx);

  return (
    <div className="lobby-page-container">
      {/* HEADER LOGO */}
      <div className="lobby-brand-header">
        <h1 className="game-title">CROWNFALL</h1>
        <p className="game-subtitle">Tactical Commander Skirmish — Edizione Reale</p>
      </div>

      <div className="lobby-cards-layout">
        {/* PLAYER CARD & DECK SELECTOR */}
        <div className="lobby-box player-setup">
          <div className="lb-header">
            <h3>🛡️ IL TUO SCHIERAMENTO</h3>
          </div>

          <div className="lb-body">
            <div className="lb-form-group">
              <label>Scegli il tuo Grimorio:</label>
              <select
                className="lb-select"
                value={selectedDeck}
                onChange={(e) => setSelectedDeck(e.target.value)}
              >
                {Object.keys(decks).map(name => (
                  <option key={name} value={name}>{name} ({decks[name].cards?.length || 0} carte)</option>
                ))}
              </select>
            </div>

            <div className="lobby-commander-preview-card ally">
              <span className="lcp-glyph">{playerComm.glyph}</span>
              <div className="lcp-details">
                <div className="lcp-name">{playerComm.name} ({playerComm.faction})</div>
                <div className="lcp-stats">❤️ {playerComm.hp} PV  •  ⚔️ {playerComm.att} ATT  •  🩸 {playerComm.riteCost} Rito</div>
                <div className="lcp-aura"><strong>Aura:</strong> {playerComm.auraDesc}</div>
              </div>
            </div>

            <button className="btn btn-gold w-full mt-3" onClick={onOpenDeckBuilder}>
              🛠️ Modifica Grimorio & Comandante
            </button>
          </div>
        </div>

        {/* VS ICON */}
        <div className="lobby-vs-badge">VS</div>

        {/* AI OPPONENT SETUP */}
        <div className="lobby-box ai-setup">
          <div className="lb-header">
            <h3>💀 AVVERSARIO IA (SINGLE PLAYER)</h3>
          </div>

          <div className="lb-body">
            <div className="lb-form-group">
              <label>Comandante IA Avversario:</label>
              <select
                className="lb-select"
                value={selectedAiComm}
                onChange={(e) => setSelectedAiComm(e.target.value)}
              >
                {uniqueCommanders.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.faction})</option>
                ))}
              </select>
            </div>

            <div className="lobby-commander-preview-card enemy">
              <span className="lcp-glyph">{aiComm.glyph}</span>
              <div className="lcp-details">
                <div className="lcp-name">{aiComm.name} ({aiComm.faction})</div>
                <div className="lcp-stats">❤️ {aiComm.hp} PV  •  ⚔️ {aiComm.att} ATT  •  🩸 {aiComm.riteCost} Rito</div>
                <div className="lcp-aura"><strong>Aura:</strong> {aiComm.auraDesc}</div>
              </div>
            </div>

            <button
              className="btn btn-crimson btn-large w-full mt-3 pulse-crimson"
              onClick={() => onStartSinglePlayer(selectedDeck, selectedAiComm)}
            >
              ⚔️ AVVIA BATTAGLIA VS IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
