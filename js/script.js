import { createLayout } from './components/app.js';

document.addEventListener('DOMContentLoaded', () => {
  const layout = createLayout()
  document.body.appendChild(layout.app)
})