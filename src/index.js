import { initSketch } from './javascript/sketch.js'

// В dev-режиме bun модуль может выполниться уже после DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initSketch()
  })
} else {
  initSketch()
}
