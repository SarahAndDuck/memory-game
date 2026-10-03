
import { createElement } from '../utils/dom.js';

export function createLayout() {

  // newGameBtn
  const newGameBtn = createElement('button', {
    className: ['btn', 'btn--new-game'],
    onClick: () => { }
  }, 'Новая игра')

  // leaderboardBtn
  const leaderboardBtn = createElement('button', {
    className: ['btn', 'btn--leaderboard'],
    onClick: () => { }
  }, 'Таблица лидеров')

  const titleIcon = createElement('span', {
    className: 'header__title-icon',

  }, '🎴');


  // header
  const header = createElement('header', {
    className: 'header',
  },
    createElement('h1', { className: 'header__title', }, titleIcon, 'Memory'),
    createElement('div', { className: 'header__controls', }, newGameBtn, leaderboardBtn))

  // movesCount
  const movesCounter = createElement('span', { id: 'moves-count' }, '0')

  // pairsCount
  const pairsCounter = createElement('span', { id: 'pairs-count' }, '0 из 8')

  // scoreboard
  const stats = createElement('div', { className: 'stats' },
    createElement('div', { className: 'stats__item' }, 'Ходы ', movesCounter),
    createElement('div', { className: 'stats__item' }, 'найденые пары ', pairsCounter)
  )

  // board
  const board = createElement('main', {
    className: 'board',
    id: 'board'
  }, header)

  // App
  const app = createElement('div', { id: 'app' }, header, stats, board)

  return {
    app,
    movesCounter,
    pairsCounter,
    board,
    newGameBtn,
    leaderboardBtn
  }


}


