import React from 'react';
import PieceToken from './PieceToken.jsx';
import { hasResonantBonus, hasIronAltarProtection } from '../engine/gameEngine.js';

export default function Board({
  grid,
  myRole = 'p1',
  selectedSquare = null,
  validMoves = [],
  deployHighlights = [],
  spellHighlights = [],
  placementHighlights = [],
  onSquareClick = () => {},
  onInspectPiece = () => {}
}) {
  const squares = [];

  for (let idx = 0; idx < 64; idx++) {
    const row = Math.floor(idx / 8);
    const col = idx % 8;
    const isDark = (row + col) % 2 === 1;
    const piece = grid[idx];

    const isSelected = selectedSquare === idx;
    const moveInfo = validMoves.find(m => m.idx === idx);
    const isMove = moveInfo && moveInfo.type === 'move';
    const isAttack = moveInfo && moveInfo.type === 'attack';
    const isDeploy = deployHighlights.includes(idx);
    const isSpellTarget = spellHighlights.includes(idx);
    const isPlacement = placementHighlights.includes(idx);

    let highlightClass = '';
    if (isSelected) highlightClass = 'sq-selected';
    else if (isAttack) highlightClass = 'sq-highlight-attack';
    else if (isMove) highlightClass = 'sq-highlight-move';
    else if (isDeploy) highlightClass = 'sq-highlight-deploy';
    else if (isSpellTarget) highlightClass = 'sq-highlight-spell';
    else if (isPlacement) highlightClass = 'sq-highlight-placement';

    const isAlly = piece ? (piece.owner === myRole) : false;
    const isCommander = piece ? (piece.type === 'commander') : false;
    const isAltar = piece ? (piece.type === 'altar') : false;
    const isWall = piece ? (piece.type === 'wall') : false;
    const isExhausted = piece ? !!piece.exhausted : false;
    const isBoosted = piece ? hasResonantBonus(idx, piece, grid) : false;
    const ironProt = piece ? hasIronAltarProtection(idx, piece, grid) : false;
    const armor = piece ? ((piece.armor || 0) + (piece.tempArmor || 0)) : 0;
    const hasTotalShield = piece ? !!piece.hasTotalShield : false;

    // Coordinate labels for chess board border squares
    const fileChar = String.fromCharCode(97 + col);
    const rankNum = 8 - row;

    squares.push(
      <div
        key={idx}
        className={`board-square ${isDark ? 'dark' : 'light'} ${highlightClass}`}
        data-index={idx}
        onClick={() => onSquareClick(idx)}
      >
        {/* Coordinate hints */}
        {col === 0 && <span className="sq-coord rank">{rankNum}</span>}
        {row === 7 && <span className="sq-coord file">{fileChar}</span>}

        {/* Move indicator dot or attack target ring */}
        {isMove && <div className="move-indicator-dot" />}
        {isAttack && <div className="attack-indicator-ring" />}
        {isDeploy && <div className="deploy-indicator-box" />}
        {isSpellTarget && <div className="spell-indicator-box" />}

        {piece && (
          <PieceToken
            piece={piece}
            isAlly={isAlly}
            isCommander={isCommander}
            isAltar={isAltar}
            isWall={isWall}
            isExhausted={isExhausted}
            isBoosted={isBoosted}
            hasTotalShield={hasTotalShield}
            armor={armor}
            hasIronProtection={ironProt}
            onInspect={onInspectPiece}
          />
        )}
      </div>
    );
  }

  return (
    <div className="chessboard-outer-frame">
      <div className="chessboard-grid-container">
        {squares}
      </div>
    </div>
  );
}
