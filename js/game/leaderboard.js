const STORAGE_KEY = 'memory_game_leaderboard'
const MAX_LEADERBOARD_ITEMS = 10


/**
 * @returns {Array<{name: staring, moves:number,date:string}>}
 */
export function getLeaderboard() {

  const data = localStorage.getItem(STORAGE_KEY)
  if (data) {
    return JSON.parse(data)
  } else {
    return []
  }
}

export function saveScore(name, moves) {
  const leaderboard = getLeaderboard()
  const trimmedName = name.trim() || 'Тёмная лошадка'
  const existingEntryIndex = leaderboard.findIndex(item => item.name === trimmedName &&
    item.moves === moves)
  if (existingEntryIndex !== -1) return
  else {
    const newEntry = {
      name: trimmedName,
      moves: moves,
    }
    leaderboard.push(newEntry)
  }
  leaderboard.sort((a, b) => a.moves - b.moves)
  const topScores = leaderboard.slice(0, MAX_LEADERBOARD_ITEMS)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(topScores))
}
