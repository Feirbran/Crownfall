// =============================================================================
// CROWNFALL — Core Tactical Skirmish Engine (React Module)
// =============================================================================

import { CARDS_DB, COMMANDERS, getTroopArchetype } from '../data/cardsData.js';

export const defaultBaseDeck = [
  "Baluardo di Granito Vivente", "Altare della Fortezza", "Torretta di Ferro Fuso",
  "Fante Corazzato", "Fante Corazzato", "Fante con Scudo a Torre", "Fante con Scudo a Torre",
  "Sentinella del Bastione", "Sentinella del Bastione", "Picchiere di Presidio", "Picchiere di Presidio",
  "Balestriere della Guardia", "Balestriere della Guardia", "Picchiere della Guardia", "Picchiere della Guardia",
  "Alabardiere da Trincea", "Fante Corazzato Veterano", "Guardia Giurata di Ferro",
  "Cavaliere Corazzato", "Cavaliere Corazzato", "Lanciere da Breccia",
  "Campione del Bastione", "Mastro d'Armi di Ferro",
  "Ariete da Breccia", "Ariete Spaccagranito", "Balista Corazzata",
  "Comando di Trincea", "Formazione a Testuggine", "Carica d'Acciaio", "Sfondamento di Linea"
];

export function shuffleDeck(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ensureDeck30Cards(deck) {
  if (!deck || !deck.cards) return [...defaultBaseDeck];
  let cards = [...deck.cards];
  if (cards.length >= 30) return cards;
  const pool = Object.keys(CARDS_DB);
  while (cards.length < 30) {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    cards.push(pick);
  }
  return cards;
}

export function idxToNotation(idx) {
  const r = 8 - Math.floor(idx / 8);
  const c = String.fromCharCode(97 + (idx % 8));
  return `${c}${r}`;
}

export function getAdjs(idx) {
  const r = Math.floor(idx / 8), c = idx % 8;
  const res = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
    }
  }
  return res;
}

export function getOrthAdjs(idx) {
  const r = Math.floor(idx / 8), c = idx % 8;
  const res = [];
  [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dr, dc]) => {
    const nr = r + dr, nc = c + dc;
    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
  });
  return res;
}

export function getDiagAdjs(idx) {
  const r = Math.floor(idx / 8), c = idx % 8;
  const res = [];
  [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dr, dc]) => {
    const nr = r + dr, nc = c + dc;
    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) res.push(nr * 8 + nc);
  });
  return res;
}

export function hasResonantBonus(idx, piece, grid) {
  if (!piece || !grid) return false;
  const faction = piece.faction;
  if (!faction || faction === 'Neutral') return false;
  return getAdjs(idx).some(adj => {
    const neighbor = grid[adj];
    return neighbor && neighbor.owner === piece.owner && neighbor.faction === faction && neighbor !== piece;
  });
}

export function hasIronAltarProtection(idx, piece, grid) {
  if (!piece || piece.type === 'altar' || !grid) return false;
  return getAdjs(idx).some(adj => {
    const p = grid[adj];
    return p && p.owner === piece.owner && p.type === 'altar' && (p.cardId === 'altar_iron' || p.name === 'Altare di Ferro');
  });
}

export function getValidMoves(idx, piece, state) {
  if (!piece || !state || !state.grid) return [];
  if (piece.frozen || piece.rooted) return [];
  const moves = [];
  const r = Math.floor(idx / 8), c = idx % 8;
  const moveType = piece.move || 'ortho';
  const role = piece.owner;
  const opp = (role === 'p1') ? 'p2' : 'p1';

  // Check Garek aura: enemy units adjacent cannot move
  const isOppGarekAdj = getAdjs(idx).some(adj => {
    const p = state.grid[adj];
    return p && p.owner === opp && p.type === 'commander' && (p.name === 'Garek' || p.cardId === 'garek');
  });
  if (isOppGarekAdj && piece.type !== 'commander') return [];

  // Orthogonal Moves (1 step)
  if (moveType === 'ortho' || moveType === 'orth' || moveType === 'omni') {
    getOrthAdjs(idx).forEach(adj => {
      const p = state.grid[adj];
      if (!p) moves.push({ idx: adj, type: 'move' });
      else if (p.owner === opp) moves.push({ idx: adj, type: 'attack' });
    });
  }

  // Orthogonal Moves (up to 2 steps: ortho2)
  if (moveType === 'ortho2' || moveType === 'orth2') {
    [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dr, dc]) => {
      for (let step = 1; step <= 2; step++) {
        const nr = r + (dr * step), nc = c + (dc * step);
        if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
        const targetIdx = nr * 8 + nc;
        const p = state.grid[targetIdx];
        if (!p) {
          moves.push({ idx: targetIdx, type: 'move' });
        } else {
          if (p.owner === opp) moves.push({ idx: targetIdx, type: 'attack' });
          break; // Line blocked
        }
      }
    });
  }

  // Diagonal Moves
  if (moveType === 'diag' || moveType === 'omni') {
    getDiagAdjs(idx).forEach(adj => {
      const p = state.grid[adj];
      if (!p) moves.push({ idx: adj, type: 'move' });
      else if (p.owner === opp) moves.push({ idx: adj, type: 'attack' });
    });
  }

  // Knight Jump (L-Shape)
  if (moveType === 'knight') {
    const knightOffsets = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    knightOffsets.forEach(([dr, dc]) => {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
        const targetIdx = nr * 8 + nc;
        const p = state.grid[targetIdx];
        if (!p) moves.push({ idx: targetIdx, type: 'move' });
        else if (p.owner === opp) moves.push({ idx: targetIdx, type: 'attack' });
      }
    });
  }

  // Range 2+ Ranged Attacks
  const range = piece.range || piece.gittata || 1;
  if (range > 1) {
    for (let i = 0; i < 64; i++) {
      if (i === idx) continue;
      const tr = Math.floor(i / 8), tc = i % 8;
      const dist = Math.max(Math.abs(r - tr), Math.abs(c - tc));
      if (dist <= range) {
        const isOrthOrDiag = (r === tr || c === tc || Math.abs(r - tr) === Math.abs(c - tc));
        if (isOrthOrDiag) {
          const p = state.grid[i];
          if (p && p.owner === opp) {
            if (!moves.some(m => m.idx === i)) {
              moves.push({ idx: i, type: 'attack', isRanged: true });
            }
          }
        }
      }
    }
  }

  return moves;
}

export function createInitialBattleState(deckName, userState, aiCommId = 'malakor', isP2P = false, myRole = 'p1') {
  const p1DeckObj = (userState.decks && userState.decks[deckName]) || { cards: defaultBaseDeck, commanderId: 'valeria' };
  const p1Cards = ensureDeck30Cards(p1DeckObj);
  const p1Comm = COMMANDERS[p1DeckObj.commanderId] || COMMANDERS['valeria'];
  const aiComm = COMMANDERS[aiCommId] || COMMANDERS['malakor'];

  const p1Deck = shuffleDeck(p1Cards);
  const p2Deck = shuffleDeck(defaultBaseDeck);

  const state = {
    isP2P: isP2P,
    myRole: myRole,
    phase: 'placement', // 'placement' -> 'active' -> 'game_over'
    turn: 'p1',
    turnPhase: 1, // 1: Mantenimento, 2: Azioni, 3: Mantenimento finale, 4: Fine Turno
    round: 1,
    p1Placed: false,
    p2Placed: false,
    selectedSquare: null,
    selectedHandIndex: null,
    nextTurnManaDrainP1: 0,
    nextTurnManaDrainP2: 0,
    isGameOver: false,
    winner: null,
    grid: Array(64).fill(null),
    p1: {
      name: userState.username || 'Condottiero',
      commander: p1Comm,
      hp: p1Comm.hp,
      mana: 1,
      maxMana: 1,
      blood: 0,
      actions: 2,
      deck: p1Deck,
      hand: [],
      graveyard: [],
      altarDeployedThisTurn: false,
      riteUsedThisTurn: false,
      muragliaScudiActive: false,
      fendentiIncrociati: false
    },
    p2: {
      name: isP2P ? 'Ospite P2' : 'IA Avversaria',
      commander: aiComm,
      hp: aiComm.hp,
      mana: 1,
      maxMana: 1,
      blood: 0,
      actions: 2,
      deck: p2Deck,
      hand: [],
      graveyard: [],
      altarDeployedThisTurn: false,
      riteUsedThisTurn: false,
      muragliaScudiActive: false,
      fendentiIncrociati: false
    }
  };

  return state;
}
