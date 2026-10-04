import { createElement } from '../utils/dom.js';

export function createCardElement(cardData, index, onCardClick) {
  // Рубашка (знак вопроса)
  const frontFace = createElement('div', {
    className: ['card__face', 'card__face--front']
  }, '❓');

  // Лицевая сторона (картинка/цветок)
  const backFace = createElement('div', {
    className: ['card__face', 'card__face--back']
  }, cardData.symbol);

  // Контейнер 3D-вращения
  const cardInner = createElement('div', {
    className: 'card__inner'
  }, frontFace, backFace);

  // Кнопка карточки
  const cardButton = createElement('button', {
    className: 'card',
    type: 'button',
    'aria-label': `Карточка ${index + 1}`,
    onClick: () => onCardClick(cardData, index, cardButton)
  }, cardInner);

  return cardButton;
}