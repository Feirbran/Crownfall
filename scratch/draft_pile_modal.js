// Draft for Deck & Graveyard Inspector Modal and Logic

function openDeckModal(targetPlayer = getMyRole()) {
  currentPileTab = targetPlayer === getMyRole() ? 'my-deck' : 'opp-deck';
  renderPileModalContent();
  document.getElementById('battle-pile-modal').classList.add('active');
}

function openGraveyardModal(targetPlayer = getMyRole()) {
  currentPileTab = targetPlayer === getMyRole() ? 'my-grave' : 'opp-grave';
  renderPileModalContent();
  document.getElementById('battle-pile-modal').classList.add('active');
}

function closePileModal() {
  const modal = document.getElementById('battle-pile-modal');
  if (modal) modal.classList.remove('active');
  hideHoverCard();
}
