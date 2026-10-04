import { state } from './state.js'
/**
 * 
 * @param {Object} cardData 
 * @param {number} index 
 * @param {HTMLElement} cardElement 
 * @param {Object} callbacks 
 */
export function handleCardSelect(cardData, index, cardElement, callbacks) {
  // Пока игрок рассматривает несовпавшую пару, открыть другие карточки нельзя.
  // Нажатия на уже открытую карточку или найденную пару игнорируются
  if (
    state.isBoardLocked ||
    cardElement.classList.contains('is-open') ||
    cardElement.classList.contains('is-matched')
  ) {
    return
  }

  // открываем карточку
  cardElement.classList.add('is-open')

  const selectedCard = {
    symbol: cardData.symbol,
    element: cardElement,
    index: index,
  };

  // первая карточка
  if (!state.firstCard) {
    state.firstCard = selectedCard;
    return; // Ждем выбора второй карточки
  }

  // вторая карточка 
  state.secondCard = selectedCard;

  // один ход зачитывается в момент открытия второй карточки
  state.moves += 1;
  callbacks.onUpdateScoreboard(state.moves, state.matchedPairs);
  checkForMatch(callbacks);
}


//  Проверка на совпадение символов

function checkForMatch(callbacks) {
  const isMatch = state.firstCard.symbol === state.secondCard.symbol;

  if (isMatch) {
    handleMatch(callbacks);
  } else {
    handleMismatch(callbacks);
  }
}

// карточки совпали 
function handleMatch(callbacks) {
  // Заметь: карточки остаются открытыми до конца игры
  state.firstCard.element.classList.add('is-matched');
  state.secondCard.element.classList.add('is-matched');

  // Увеличиваем счетчик найденных пар
  state.matchedPairs += 1;
  callbacks.onUpdateScoreboard(state.moves, state.matchedPairs);

  // Очищаем выбор для следующего хода
  resetTurn();

  // Проверяем условие победы (найдены все 8 пар)
  if (state.matchedPairs === 8) {
    callbacks.onWin(state.moves);
  }
}

//  Карточки  не совпали

function handleMismatch(callbacks) {
  // Блокируем выбор других карточек на время показа ошибки
  state.isBoardLocked = true;

  // Запускаем таймер задержки (1000 мс по ТЗ)
  state.mismatchTimerId = setTimeout(() => {
    // Закрываем обе карточки
    if (state.firstCard) state.firstCard.element.classList.remove('is-open');
    if (state.secondCard) state.secondCard.element.classList.remove('is-open');

    // Снимаем блокировку и очищаем выбор
    resetTurn();
  }, 1000);
}
// сброс
function resetTurn() {
  state.firstCard = null;
  state.secondCard = null;
  state.isBoardLocked = false;
  state.mismatchTimerId = null;
}