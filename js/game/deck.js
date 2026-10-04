// 8 уникальных цветов и растений
export const CARD_SYMBOLS = ['🌸', '🌺', '🌻', '🌹', '🌷', '🪻', '🌼', '🪷'];

/**
 * Создает колоду из 16 карточек (8 пар)
 * @returns {Array<{id: number, symbol: string}>}
 */
export function createDeck() {
  const pairedSymbols = [...CARD_SYMBOLS, ...CARD_SYMBOLS];

  return pairedSymbols.map((symbol, index) => ({
    id: index,
    symbol: symbol,
  }));
}

/**
 * Перемешивает массив по алгоритму Фишера — Йейтса
 * @template T
 * @param {T[]} array 
 * @returns {T[]}
 */
export function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}