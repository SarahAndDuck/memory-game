/** 
 * @param {string} tag 
 * @param {Object} [props={}]
 * @param {...(Node|string)} children 
 * @returns {HTMLElement}
 */

export function createElement(tag, props = {}, ...children) {
  const element = document.createElement(tag)

  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined || value === null) return

    // Обработка слушателей событий
    if (key.startsWith('on') && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase()
      element.addEventListener(eventName, value)
    }
    // Обработка дата-атрибутов (dataset)
    else if (key === 'dataset' && typeof value === 'object') {
      Object.assign(element.dataset, value);
    }
    // Установка классов
    else if (key === 'className') {
      if (Array.isArray(value)) {
        element.className = value.filter(Boolean).join(' ')
      } else {
        element.className = value
      }
    }
    // Все остальные атрибуты 
    else {
      element.setAttribute(key, value);
    }

  })

  // Добавление дочерних элементов

  children.forEach((child) => {
    if (child === null || child === undefined) return

    if (typeof child === "string" || typeof child === "number") {
      element.appendChild(document.createTextNode(String(child)))

    } else if (child instanceof Node) {
      element.appendChild(child)
    }

  })
  return element
}

/** 
 * @param {HTMLElement} element 
 */

export function clearElement(element) {
  element.replaceChildren()
}

