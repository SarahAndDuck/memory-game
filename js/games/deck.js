import { createElement } from '../utils/dom.js';

const CARD_SYMBOLS = ['🌸', '🌺', '🌻', '🌹', '🌷', '🪻', '🌼', '🪷'];
/**
*@returns {Array<{id:number,symbol:string}>}
*/
// колода 
export function createDeck() {
  const pairedSymbols = [...CARD_SYMBOLS, ...CARD_SYMBOLS]
  return pairedSymbols.map((symbol, index) => ({
    id: index,
    symbol: symbol
  }))
}
/**
 * @template T
 * @param {T[]} array 
 * @returns {T[]}
 */
export function shuffle(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}