import { createElement } from '../utils/dom.js';
/**
 * 
 * @param {Object} options 
 * @param {string}  
 * @param {HTMLElement|Array|string}  
 * @param {Function} 
 * @returns {object}  
 */

export function createModal({ title, content, onClose }) {
  // создаем контейнер для переменной  overlayElement
  let overlayElement = null

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      close()
    }
  }


  function close() {
    if (overlayElement && overlayElement.parentNode) {
      overlayElement.parentNode.removeChild(overlayElement)
    }
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleKeyDown)
    if (typeof onClose === 'function') {
      onClose()
    }
  }

  function open() {
    const closeBtn = createElement('button', {
      className: 'modal__close-btn',
      onClick: close
    }, '✖')


    const modalTitle = createElement('h1', { className: 'modal__title' }, title)
    const modalHeader = createElement('div', { className: 'modal__header' }, modalTitle, closeBtn)
    const childrenArray = Array.isArray(content) ? content : [content];
    const modalBody = createElement('div', { className: 'modal__body' },
      ...childrenArray)


    const modalWindow = createElement('div', {
      className: 'modal__window',
    }, modalHeader, modalBody)

    overlayElement = createElement('div', {
      className: "modal__overlay",
      onClick: (e) => {
        if (e.target === overlayElement) {
          close()
        }
      }
    }, modalWindow)
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    document.body.appendChild(overlayElement)
  }
  return { open, close }
}

export function showWinModal(movesCount, onRestart) {
  const message = createElement('p', {
    className: 'modal__text'
  }, `Поздравляем! Вы нашли все пары за ${movesCount} ходов.`)

  const restartBtn = createElement('button', {
    className: ['btn', 'btn--primary'],
    onClick: () => {
      winModal.close()
      onRestart()
    }
  }, 'Сыграть ещё раз')

  const winModal = createModal({
    title: '🎉 Победа!',
    content: [message, restartBtn]
  })

  winModal.open()
}