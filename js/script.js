import { createElement, clearElement } from './utils/dom.js';
import { createDeck, shuffle } from './game/deck.js';
import { createCardElement } from './components/card.js';
import { state, resetState } from './game/state.js';
import { handleCardSelect } from './game/gameLogic.js';
import { showWinModal, showLeaderboardModal } from './components/modal.js';

// Ссылки на ключевые DOM-элементы страницы
let boardElement = null;
let movesCountElement = null;
let pairsCountElement = null;

/**
 * Обновляет счетчики DOM
 * @param {number} moves - Количество сделанных ходов
 * @param {number} pairs - Количество найденных пар
 */
function updateScoreboard(moves, pairs) {
  if (movesCountElement) {
    movesCountElement.textContent = String(moves);
  }
  if (pairsCountElement) {
    pairsCountElement.textContent = `${pairs} из 8`;
  }
}


// Запускает новую игру:


export function startNewGame() {
  //  Сброс состояния логики и отмена незавершенных таймеров (clearTimeout)
  resetState();
  updateScoreboard(state.moves, state.matchedPairs);

  if (!boardElement) return;

  //   очистка игрового поля 
  clearElement(boardElement);

  //  Создание и перемешивание  элементов
  const rawDeck = createDeck();
  const shuffledDeck = shuffle(rawDeck);

  //  Генерация  карточек в DOM
  shuffledDeck.forEach((cardData, index) => {
    const cardElement = createCardElement(cardData, index, (data, idx, element) => {
      // Связываем клик по карточке в DOM с нашей игровой логикой
      handleCardSelect(data, idx, element, {
        onUpdateScoreboard: updateScoreboard,
        onWin: (finalMoves) => {
          showWinModal(finalMoves, () => {
            startNewGame()
          })
          
        }
      });
    });

    // вставляем созданный элемент карточки в игровое поле
    boardElement.appendChild(cardElement);
  });
}


// Создает общую разметку приложения при загрузке страницы

function createAppLayout() {
  // Заголовок приложения
  const titleIcon = createElement('span', {
    className: 'header__title-icon',
    'aria-hidden': 'true'
  }, '🎴');

  const title = createElement('h1', {
    className: 'header__title'
  }, titleIcon, 'Мемори');

  //  Кнопки в хедере
  const newGameBtn = createElement('button', {
    className: ['btn', 'btn--new-game'],
    'aria-label': 'Начать новую игру',
    onClick: () => startNewGame()
  }, 'Новая игра');

  const leaderboardBtn = createElement('button', {
    className: ['btn', 'btn--leaderboard'],
    'aria-label': 'Открыть таблицу лидеров',
    onClick: () => {
      showLeaderboardModal();
    }
  }, 'Таблица лидеров');

  const headerControls = createElement('div', {
    className: 'header__controls'
  }, newGameBtn, leaderboardBtn);

  const header = createElement('header', {
    className: 'header'
  }, title, headerControls);

  // Панель счетчиков
  movesCountElement = createElement('span', { id: 'moves-count' }, '0');
  pairsCountElement = createElement('span', { id: 'pairs-count' }, '0 из 8');

  const scoreboard = createElement('div', { className: 'scoreboard' },
    createElement('div', {}, 'Ходы: ', movesCountElement),
    createElement('div', {}, 'Найденные пары: ', pairsCountElement)
  );

  //  Контейнер для игрового поля
  boardElement = createElement('main', { className: 'board', id: 'board' });

  //  Корневой контейнер и добавление в body
  const app = createElement('div', { id: 'app' }, header, scoreboard, boardElement);
  document.body.appendChild(app);

  //  Первичный автозапуск игры при загрузке страницы
  startNewGame();
}

// Точка входа
document.addEventListener('DOMContentLoaded', createAppLayout);