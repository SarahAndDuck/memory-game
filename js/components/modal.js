import { createElement } from '../utils/dom.js';
import { getLeaderboard, saveScore } from '../game/leaderboard.js';
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

export function showLeaderboardModal() {
  const scores = getLeaderboard()
  let bodyContent
  if (scores.length === 0) {
    bodyContent = createElement('p', { className: 'modal__text' }, 'здесь могла бы быть ваша реклама')
  } else {
    const rows = scores.map((score, index) => {
      return createElement('tr', {},
        createElement('td', {}, `${index + 1}`),
        createElement('td', {}, score.name),
        createElement('td', {}, String(score.moves))
      )
    })
    const tableHeader = createElement('thead', {},
      createElement('tr', {},
        createElement('th', {}, 'Место'),
        createElement('th', {}, 'Имя'),
        createElement('th', {}, 'Ходы')
      )
    )
    const tableBody = createElement('tbody', {}, ...rows)
    bodyContent = createElement('table', {
      className: 'leaderboard-table'
    }, tableHeader, tableBody)
  }

  const modal = createModal({
    title: 'Таблица лидеров',
    content: [bodyContent],
  })
  modal.open()
}
