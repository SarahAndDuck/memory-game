export const state = {
  firstCard: null,
  secondCard: null,
  isBoardLocked: false,
  moves: 0,
  matchedPairs: 0,
  mismatchTimerId: null,
}
// сброс
export function resetState() {
  if (state.mismatchTimerId) {
    clearTimeout(state.mismatchTimerId)
    state.mismatchTimerId = null
  }
  state.firstCard = null
  state.secondCard = null
  state.isBoardLocked = false
  state.moves = 0
  state.matchedPairs = 0
}

