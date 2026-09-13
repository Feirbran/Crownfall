import React, { useState, useEffect, useCallback } from 'react';
import { CARDS_DB, COMMANDERS, RARITY_NAMES } from './data/cardsData.js';
import {
  createInitialBattleState,
  getValidMoves,
  getAdjs,
  getOrthAdjs,
  getDiagAdjs,
  hasIronAltarProtection,
  idxToNotation,
  defaultBaseDeck
} from './engine/gameEngine.js';

import Board from './components/Board.jsx';
import HUD from './components/HUD.jsx';
import HandBar from './components/HandBar.jsx';
import CombatClashModal from './components/CombatClashModal.jsx';
import CardInspectModal from './components/CardInspectModal.jsx';
import DeckInspectorModal from './components/DeckInspectorModal.jsx';
import CombatLog from './components/CombatLog.jsx';
import DeckBuilder from './components/DeckBuilder.jsx';
import Lobby from './components/Lobby.jsx';

export default function App() {
  const [view, setView] = useState('lobby'); // 'lobby', 'battle', 'deckbuilder'
  const [userState, setUserState] = useState(() => {
    const saved = localStorage.getItem('crownfall_user_state');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      username: 'Condottiero',
      gold: 500,
      activeDeckName: 'Mazzo Base',
      decks: {
        'Mazzo Base': { commanderId: 'valeria', cards: [...defaultBaseDeck] }
      }
    };
  });

  const [battleState, setBattleState] = useState(null);
  const [logs, setLogs] = useState([]);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [deployHighlights, setDeployHighlights] = useState([]);
  const [selectedHandIndex, setSelectedHandIndex] = useState(null);
  const [clashModalData, setClashModalData] = useState(null);
  const [inspectCard, setInspectCard] = useState(null);
  const [pileModal, setPileModal] = useState({ isOpen: false, isGraveyard: false, cardsList: [] });
  const [isLogMobileOpen, setIsLogMobileOpen] = useState(false);

  const saveUserState = (newState) => {
    setUserState(newState);
    localStorage.setItem('crownfall_user_state', JSON.stringify(newState));
  };

  const addLog = useCallback((text, type = 'sys') => {
    const time = new Date().toLocaleTimeString().slice(3);
    setLogs((prev) => [...prev, { time, text, type }]);
  }, []);

  // START BATTLE
  const handleStartBattle = (deckName, aiCommId) => {
    const initial = createInitialBattleState(deckName, userState, aiCommId);
    setBattleState(initial);
    setLogs([]);
    setSelectedSquare(null);
    setValidMoves([]);
    setSelectedHandIndex(null);
    setClashModalData(null);
    setView('battle');
    addLog(`--- NUOVA BATTAGLIA AVVIATA (Single Player vs IA) ---`, 'sys');
    addLog(`Piazza il tuo Comandante sulla prima riga (a1–h1)!`, 'sys');
  };

  // CHECK WIN
  const checkWin = (state) => {
    if (!state || state.isGameOver) return state;
    const p1Alive = state.grid.some(p => p && p.owner === 'p1' && p.type === 'commander' && p.hp > 0);
    const p2Alive = state.grid.some(p => p && p.owner === 'p2' && p.type === 'commander' && p.hp > 0);

    if (!p2Alive) {
      addLog("🏆 BATTAGLIA CONCLUSA: VITTORIA DI P1!", 'sys');
      alert("🏆 VITTORIA! Il Comandante nemico è caduto!");
      return { ...state, isGameOver: true, winner: 'p1' };
    } else if (!p1Alive) {
      addLog("💀 BATTAGLIA CONCLUSA: VITTORIA DI P2!", 'sys');
      alert("💀 SCONFITTA! Il tuo Comandante è caduto in battaglia.");
      return { ...state, isGameOver: true, winner: 'p2' };
    }
    return state;
  };

  // DRAW CARD WITH DECK-OUT FATIGUE
  const drawCard = (state, player) => {
    const p = state[player];
    if (!p) return state;

    // 1. DECK-OUT FATIGUE
    if (p.deck.length === 0) {
      const commIdx = state.grid.findIndex(c => c && c.owner === player && c.type === 'commander');
      if (commIdx !== -1) {
        const comm = { ...state.grid[commIdx] };
        comm.hp = Math.max(0, comm.hp - 1);
        state.grid[commIdx] = comm;
        p.hp = comm.hp;
        addLog(`[${player.toUpperCase()}] -> [Esaurimento Mazzo (Deck-Out)] -> [${comm.name} (${player.toUpperCase()})] = [1 Danno Affaticamento (PV: ${comm.hp})]`, 'sys');
        if (comm.hp <= 0) {
          state.grid[commIdx] = null;
        }
      } else {
        p.hp = Math.max(0, p.hp - 1);
        addLog(`[${player.toUpperCase()}] -> [Esaurimento Mazzo (Deck-Out)] -> [Comandante ${player.toUpperCase()}] = [1 Danno Vitale (PV: ${p.hp})]`, 'sys');
      }
      return checkWin(state);
    }

    // 2. STANDARD DRAW
    if (p.hand.length < 6) {
      const newDeck = [...p.deck];
      const drawnCardId = newDeck.shift();
      const newHand = [...p.hand, drawnCardId];
      p.deck = newDeck;
      p.hand = newHand;
      const cObj = CARDS_DB[drawnCardId];
      const cName = cObj?.name || drawnCardId;
      const rarity = RARITY_NAMES[cObj?.rarity] || 'Comune';
      if (player === 'p1') {
        addLog(`[${player.toUpperCase()}] -> [Pescata] -> [Mano (${newHand.length}/6)] = [${cName} (${rarity})]`, player);
      } else {
        addLog(`[${player.toUpperCase()}] -> [Pescata] -> [Mano (${newHand.length}/6)] = [1 Carta Pescata]`, player);
      }
    } else {
      addLog(`[${player.toUpperCase()}] -> [Pescata] -> [Mano Piena (6/6)] = [Pescata Ignorata (Limite Raggiunto)]`, player);
    }

    return state;
  };

  // ADVANCE PHASE
  const advanceTurnPhase = () => {
    if (!battleState || battleState.isGameOver) return;
    if (battleState.turn !== 'p1') {
      alert("Non è il tuo turno!");
      return;
    }

    const currentPhase = battleState.turnPhase || 1;

    if (currentPhase === 1) {
      setBattleState(prev => ({ ...prev, turnPhase: 2, selectedSquare: null, selectedHandIndex: null }));
      setValidMoves([]);
      setDeployHighlights([]);
      addLog(`>>> Inizio 2ª Fase: Movimento / Azioni [Azioni: ${battleState.p1.actions}]`, 'p1');
    } else if (currentPhase === 2) {
      setBattleState(prev => ({ ...prev, turnPhase: 3, selectedSquare: null, selectedHandIndex: null }));
      setValidMoves([]);
      setDeployHighlights([]);
      addLog(`>>> Inizio 3ª Fase: Mantenimento Finale [Mana: ${battleState.p1.mana}]`, 'p1');
    } else {
      // END TURN P1 -> START AI P2
      addLog(`--- FINE TURNO P1 ---`, 'p1');
      endTurnAndStart('p2');
    }
  };

  // END TURN & START NEXT TURN
  const endTurnAndStart = (nextTurn) => {
    let nextState = { ...battleState, turn: nextTurn, turnPhase: 1 };
    const p = nextState[nextTurn];
    p.actions = 2;
    p.altarDeployedThisTurn = false;
    p.riteUsedThisTurn = false;

    // Recalculate mana
    const altars = nextState.grid.filter(c => c && c.owner === nextTurn && c.type === 'altar').length;
    p.maxMana = Math.min(4, 1 + altars);
    p.mana = p.maxMana;

    // Un-exhaust pieces
    nextState.grid = nextState.grid.map(c => (c && c.owner === nextTurn ? { ...c, exhausted: false } : c));

    // Draw card
    const isDeckEmpty = p.deck.length === 0;
    nextState = drawCard(nextState, nextTurn);

    // Auto advance phase if deck is empty to avoid softlock
    if (isDeckEmpty && !nextState.isGameOver) {
      nextState.turnPhase = 2;
      addLog(`[${nextTurn.toUpperCase()}] -> [Mazzo Vuoto] -> [Fase 2: Movimento & Azioni] = [Transizione Automatica Eseguita]`, nextTurn);
    }

    setBattleState(nextState);
    setSelectedSquare(null);
    setSelectedHandIndex(null);
    setValidMoves([]);
    setDeployHighlights([]);

    if (nextTurn === 'p2' && !nextState.isGameOver) {
      setTimeout(() => runAITurn(nextState), 800);
    }
  };

  // AI TURN LOGIC
  const runAITurn = (state) => {
    if (!state || state.isGameOver || state.turn !== 'p2') return;
    addLog(`--- TURNO IA AGGRESSIVA --- [Mana: ${state.p2.mana}, Azioni: ${state.p2.actions}]`, 'p2');

    let curState = { ...state };

    // AI Deploy if possible
    if (curState.p2.hand.length > 0 && curState.p2.mana > 0) {
      const cardId = curState.p2.hand[0];
      const card = CARDS_DB[cardId];
      if (card && (card.cost || 0) <= curState.p2.mana) {
        // Find spawn square
        const emptyRows = [56, 57, 58, 59, 60, 61, 62, 63, 48, 49, 50, 51, 52, 53, 54, 55];
        const targetSq = emptyRows.find(i => !curState.grid[i]);
        if (targetSq !== undefined) {
          curState.p2.hand = curState.p2.hand.slice(1);
          curState.p2.mana -= (card.cost || 0);
          curState.grid[targetSq] = {
            ...card,
            cardId: cardId,
            owner: 'p2',
            hp: card.pv || card.hp || 1,
            att: card.att || 0,
            type: card.type || 'unit',
            exhausted: true
          };
          addLog(`[IA (P2)] -> [Schieramento] -> [${card.name} (Cella ${idxToNotation(targetSq)})] = [Schierato]`, 'p2');
        }
      }
    }

    // AI Combat Actions
    curState.turnPhase = 2;
    for (let act = 0; act < 2; act++) {
      const aiPieces = [];
      curState.grid.forEach((p, idx) => {
        if (p && p.owner === 'p2' && !p.exhausted && p.type !== 'altar' && p.type !== 'wall') {
          aiPieces.push({ idx, piece: p });
        }
      });

      if (aiPieces.length === 0) break;

      let actionDone = false;
      for (const item of aiPieces) {
        const moves = getValidMoves(item.idx, item.piece, curState);
        const attackMove = moves.find(m => m.type === 'attack');
        if (attackMove) {
          // Execute Attack
          const att = item.piece;
          const def = curState.grid[attackMove.idx];
          const damage = att.att;
          const defHpAfter = Math.max(0, def.hp - damage);
          addLog(`[${att.name} (P2)] -> [Attacco] -> [${def.name} (P1)] = [${damage} Danni (PV residui: ${defHpAfter})]`, 'p2');
          def.hp -= damage;
          if (def.hp <= 0) {
            curState.grid[attackMove.idx] = null;
            if (def.type === 'commander') {
              curState = checkWin(curState);
            }
          }
          att.exhausted = true;
          actionDone = true;
          break;
        } else {
          // Move forward towards row 0
          const forwardMove = moves.find(m => Math.floor(m.idx / 8) < Math.floor(item.idx / 8));
          if (forwardMove) {
            curState.grid[forwardMove.idx] = { ...item.piece, exhausted: true };
            curState.grid[item.idx] = null;
            addLog(`[${item.piece.name} (P2)] -> [Movimento] -> [${idxToNotation(item.idx)} ➔ ${idxToNotation(forwardMove.idx)}] = [Successo]`, 'p2');
            actionDone = true;
            break;
          }
        }
      }
      if (!actionDone) break;
    }

    // End AI turn
    addLog(`--- FINE TURNO IA (P2) ---`, 'p2');
    setTimeout(() => {
      endTurnAndStart('p1');
    }, 600);
  };

  // HANDLE SQUARE CLICK IN BATTLE
  const handleSquareClick = (idx) => {
    if (!battleState || battleState.isGameOver) return;

    // 1. PLACEMENT PHASE
    if (battleState.phase === 'placement') {
      const isRow0 = idx >= 0 && idx <= 7;
      if (!isRow0) {
        alert("Piazza il tuo Comandante sulla prima riga alleata (a1–h1)!");
        return;
      }
      const newGrid = [...battleState.grid];
      const comm = battleState.p1.commander;
      newGrid[idx] = {
        ...comm,
        owner: 'p1',
        type: 'commander',
        hp: comm.hp,
        att: comm.att,
        exhausted: false
      };
      // Place AI Commander on opposite row (row 7: 56..63)
      const aiComm = battleState.p2.commander;
      const aiIdx = 56 + (idx % 8);
      newGrid[aiIdx] = {
        ...aiComm,
        owner: 'p2',
        type: 'commander',
        hp: aiComm.hp,
        att: aiComm.att,
        exhausted: false
      };

      let state = {
        ...battleState,
        grid: newGrid,
        phase: 'active',
        p1Placed: true,
        p2Placed: true,
        turn: 'p1',
        turnPhase: 1
      };

      // Draw initial 4 cards for each player
      for (let i = 0; i < 4; i++) {
        state = drawCard(state, 'p1');
        state = drawCard(state, 'p2');
      }

      setBattleState(state);
      addLog(`P1 piazza il Comandante ${comm.name} su ${idxToNotation(idx)}`, 'p1');
      addLog(`IA piazza il Comandante ${aiComm.name} su ${idxToNotation(aiIdx)}`, 'p2');
      addLog(`--- INIZIO BATTAGLIA (Turno P1 - Fase 1: Mantenimento) ---`, 'sys');
      return;
    }

    // 2. ACTIVE BATTLE PHASE
    if (battleState.turn !== 'p1') {
      alert("È il turno dell'avversario!");
      return;
    }

    // A. DEPLOY FROM HAND
    if (selectedHandIndex !== null && deployHighlights.includes(idx)) {
      const cardId = battleState.p1.hand[selectedHandIndex];
      const card = CARDS_DB[cardId];
      if (!card) return;

      const cost = card.cost !== undefined ? card.cost : 0;
      if (battleState.p1.mana < cost) {
        alert(`Mana insufficiente! Richiesto: ${cost} 💧, Disponibile: ${battleState.p1.mana} 💧`);
        return;
      }

      const newHand = [...battleState.p1.hand];
      newHand.splice(selectedHandIndex, 1);
      const newGrid = [...battleState.grid];
      newGrid[idx] = {
        ...card,
        cardId: cardId,
        owner: 'p1',
        hp: card.pv || card.hp || 1,
        att: card.att || 0,
        type: card.type || 'unit',
        exhausted: true
      };

      const newState = {
        ...battleState,
        grid: newGrid,
        p1: {
          ...battleState.p1,
          mana: battleState.p1.mana - cost,
          hand: newHand
        }
      };

      setBattleState(newState);
      setSelectedHandIndex(null);
      setDeployHighlights([]);
      addLog(`[P1] -> [Schieramento] -> [${card.name} (Cella ${idxToNotation(idx)})] = [Schierato in Campo]`, 'p1');
      return;
    }

    // B. MOVE OR ATTACK WITH SELECTED PIECE
    if (selectedSquare !== null) {
      const move = validMoves.find(m => m.idx === idx);
      if (move) {
        if (battleState.p1.actions <= 0) {
          alert("Non hai più Azioni Tattiche ⚡ in questo turno!");
          return;
        }

        const fromIdx = selectedSquare;
        const attPiece = battleState.grid[fromIdx];
        const newGrid = [...battleState.grid];

        if (move.type === 'move') {
          newGrid[idx] = { ...attPiece, exhausted: true };
          newGrid[fromIdx] = null;
          const newState = {
            ...battleState,
            grid: newGrid,
            p1: { ...battleState.p1, actions: battleState.p1.actions - 1 }
          };
          setBattleState(newState);
          setSelectedSquare(null);
          setValidMoves([]);
          addLog(`[${attPiece.name} (P1)] -> [Movimento] -> [${idxToNotation(fromIdx)} ➔ ${idxToNotation(idx)}] = [Successo (Azioni: ${newState.p1.actions})]`, 'p1');
        } else if (move.type === 'attack') {
          const defPiece = newGrid[idx];
          const damage = attPiece.att;
          let counterDmg = defPiece.att || 0;
          if (move.isRanged) counterDmg = 0;

          // Show Clash modal
          setClashModalData({
            att: attPiece,
            def: defPiece,
            damage: damage,
            counterDmg: counterDmg,
            details: { rawAtk: attPiece.att, isRanged: !!move.isRanged }
          });

          defPiece.hp -= damage;
          const defRem = Math.max(0, defPiece.hp);
          addLog(`[${attPiece.name} (P1)] -> [Attacco] -> [${defPiece.name} (P2)] = [${damage} Danni (PV residui: ${defRem})]`, 'p1');

          if (defPiece.hp <= 0) {
            newGrid[idx] = null;
          } else if (counterDmg > 0) {
            attPiece.hp -= counterDmg;
            const attRem = Math.max(0, attPiece.hp);
            addLog(`[${defPiece.name} (P2)] -> [Contrattacco] -> [${attPiece.name} (P1)] = [${counterDmg} Danni Contrattacco (PV residui: ${attRem})]`, 'sys');
            if (attPiece.hp <= 0) {
              newGrid[fromIdx] = null;
            }
          }

          if (newGrid[fromIdx]) {
            newGrid[fromIdx].exhausted = true;
          }

          let state = {
            ...battleState,
            grid: newGrid,
            p1: { ...battleState.p1, actions: battleState.p1.actions - 1 }
          };
          state = checkWin(state);
          setBattleState(state);
          setSelectedSquare(null);
          setValidMoves([]);
        }
        return;
      }
    }

    // C. SELECT A SQUARE WITH PIECE
    const clickedPiece = battleState.grid[idx];
    if (clickedPiece && clickedPiece.owner === 'p1') {
      if (clickedPiece.exhausted) {
        alert("Questa unità è esausta per questo turno!");
      }
      setSelectedSquare(idx);
      setSelectedHandIndex(null);
      setDeployHighlights([]);
      const moves = getValidMoves(idx, clickedPiece, battleState);
      setValidMoves(moves);
    } else {
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  // HANDLE HAND CARD SELECT
  const handleSelectHandCard = (index) => {
    if (!battleState || battleState.turn !== 'p1') return;
    if (selectedHandIndex === index) {
      setSelectedHandIndex(null);
      setDeployHighlights([]);
      return;
    }

    setSelectedHandIndex(index);
    setSelectedSquare(null);
    setValidMoves([]);

    // Calculate spawnable squares (e.g. empty squares adjacent to friendly pieces or row 0)
    const deployable = [];
    battleState.grid.forEach((p, i) => {
      if (p && p.owner === 'p1') {
        getAdjs(i).forEach(adj => {
          if (!battleState.grid[adj] && !deployable.includes(adj)) {
            deployable.push(adj);
          }
        });
      }
    });
    for (let r0 = 0; r0 < 8; r0++) {
      if (!battleState.grid[r0] && !deployable.includes(r0)) deployable.push(r0);
    }
    setDeployHighlights(deployable);
  };

  // HANDLE WEAPON RITE
  const handleUseRite = () => {
    if (!battleState || battleState.turn !== 'p1') return;
    const p1 = battleState.p1;
    const comm = p1.commander;
    const riteCost = comm.riteCost || 7;
    if (p1.blood < riteCost || p1.riteUsedThisTurn) {
      alert("Sangue insufficiente o Rito già usato in questo turno!");
      return;
    }

    // Default Valeria/AOE Rite: 2 damage to all enemies within range
    const newGrid = [...battleState.grid];
    newGrid.forEach((p, idx) => {
      if (p && p.owner === 'p2') {
        p.hp -= 2;
        addLog(`[${comm.name} (P1)] -> [Rito d'Armi: ${comm.rite}] -> [${p.name} (P2)] = [2 Danni ad Area (PV: ${Math.max(0, p.hp)})]`, 'p1');
        if (p.hp <= 0) newGrid[idx] = null;
      }
    });

    let state = {
      ...battleState,
      grid: newGrid,
      p1: {
        ...p1,
        blood: p1.blood - riteCost,
        riteUsedThisTurn: true
      }
    };
    state = checkWin(state);
    setBattleState(state);
    alert(`🩸 RITO SCATENATO: ${comm.rite}!`);
  };

  // GLOBAL KEYBOARD LISTENER: SPACEBAR QoL
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

      if (e.key === 'Escape') {
        setClashModalData(null);
        setInspectCard(null);
        setPileModal(prev => ({ ...prev, isOpen: false }));
      }

      if (e.code === 'Space' || e.key === ' ') {
        if (clashModalData) {
          e.preventDefault();
          setClashModalData(null);
          return;
        }
        if (pileModal.isOpen) {
          e.preventDefault();
          setPileModal(prev => ({ ...prev, isOpen: false }));
          return;
        }
        if (inspectCard) {
          e.preventDefault();
          setInspectCard(null);
          return;
        }
        if (view === 'battle' && battleState && !battleState.isGameOver && battleState.turn === 'p1') {
          e.preventDefault();
          advanceTurnPhase();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clashModalData, pileModal, inspectCard, view, battleState]);

  return (
    <div className="crownfall-app-root">
      {/* 1. LOBBY VIEW */}
      {view === 'lobby' && (
        <Lobby
          userState={userState}
          onStartSinglePlayer={handleStartBattle}
          onOpenDeckBuilder={() => setView('deckbuilder')}
        />
      )}

      {/* 2. DECK BUILDER VIEW */}
      {view === 'deckbuilder' && (
        <DeckBuilder
          userState={userState}
          onSaveUserState={saveUserState}
          onBackToLobby={() => setView('lobby')}
          onInspectCard={(c) => setInspectCard(c)}
        />
      )}

      {/* 3. BATTLE VIEW */}
      {view === 'battle' && battleState && (
        <div className="battle-view-layout">
          {/* TOP HUD */}
          <HUD
            battleState={battleState}
            myRole="p1"
            onAdvancePhase={advanceTurnPhase}
            onUseRite={handleUseRite}
            onInspectCard={(c) => setInspectCard(c)}
            onOpenDeckInspector={(role) => {
              setPileModal({ isOpen: true, isGraveyard: false, cardsList: battleState[role].deck });
            }}
            onOpenGraveInspector={(role) => {
              setPileModal({ isOpen: true, isGraveyard: true, cardsList: battleState[role].graveyard });
            }}
          />

          {/* MAIN ARENA & COMBAT LOG SIDEBAR */}
          <div className="battle-arena-split">
            <div className="battle-board-section">
              <Board
                grid={battleState.grid}
                myRole="p1"
                selectedSquare={selectedSquare}
                validMoves={validMoves}
                deployHighlights={deployHighlights}
                placementHighlights={battleState.phase === 'placement' ? [0, 1, 2, 3, 4, 5, 6, 7] : []}
                onSquareClick={handleSquareClick}
                onInspectPiece={(p) => setInspectCard(p)}
              />
            </div>

            {/* COMBAT LOG */}
            <CombatLog
              logs={logs}
              isOpenMobile={isLogMobileOpen}
              onToggleMobile={() => setIsLogMobileOpen(prev => !prev)}
              onCopyLog={() => {
                const text = logs.map(l => `[${l.time}] ${l.text}`).join('\n');
                navigator.clipboard.writeText(text);
                alert("Registro di battaglia copiato negli appunti!");
              }}
            />
          </div>

          {/* BOTTOM HAND BAR */}
          <HandBar
            hand={battleState.p1.hand}
            deckCount={battleState.p1.deck.length}
            graveyardCount={battleState.p1.graveyard.length}
            selectedHandIndex={selectedHandIndex}
            onSelectCard={handleSelectHandCard}
            onInspectCard={(c) => setInspectCard(c)}
            onOpenDeckInspector={() => {
              setPileModal({ isOpen: true, isGraveyard: false, cardsList: battleState.p1.deck });
            }}
            onOpenGraveInspector={() => {
              setPileModal({ isOpen: true, isGraveyard: true, cardsList: battleState.p1.graveyard });
            }}
          />
        </div>
      )}

      {/* MODALS */}
      {clashModalData && (
        <CombatClashModal
          clashData={clashModalData}
          onClose={() => setClashModalData(null)}
        />
      )}

      {inspectCard && (
        <CardInspectModal
          card={inspectCard}
          onClose={() => setInspectCard(null)}
        />
      )}

      {pileModal.isOpen && (
        <DeckInspectorModal
          isOpen={pileModal.isOpen}
          isGraveyard={pileModal.isGraveyard}
          cardsList={pileModal.cardsList}
          onClose={() => setPileModal(prev => ({ ...prev, isOpen: false }))}
          onInspectCard={(c) => setInspectCard(c)}
        />
      )}
    </div>
  );
}
