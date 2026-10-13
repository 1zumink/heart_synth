import { createSlider } from './ui/controls.js'

// Эмоции-переключатели: нажал — включилась, нажал ещё раз — выключилась.
// Клавиши компьютера и экранные пэды. Используем e.code, а не e.key —
// раскладка (рус/англ) не важна

const bindings = new Map()
const active = new Set()

function toggle(binding) {
  if (active.has(binding)) {
    active.delete(binding)
    binding.element.classList.remove('active')
    binding.stop()
  } else {
    active.add(binding)
    binding.element.classList.add('active')
    binding.start()
  }
}

function bind(code, binding) {
  bindings.set(code, binding)

  binding.element.addEventListener('pointerdown', (e) => {
    e.preventDefault()
    toggle(binding)
  })
}

export function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return

    const binding = bindings.get(e.code)
    if (!binding) return

    e.preventDefault()
    toggle(binding)
  })
}

// громкость и тон эмоции прямо на пэде
function createPadControls(pad) {
  const controls = document.createElement('div')
  controls.className = 'controls'

  // бегунки не должны переключать эмоцию
  controls.addEventListener('pointerdown', (e) => e.stopPropagation())

  const channel = pad.instrument.channel

  controls.appendChild(
    createSlider(
      'Громкость',
      {
        min: -30,
        max: 6,
        step: 1,
        value: channel.volume,
        format: (value) => `${value} дБ`
      },
      (value) => {
        channel.node.volume.rampTo(value, 0.05)
      }
    )
  )

  controls.appendChild(
    createSlider(
      'Тон',
      {
        min: -12,
        max: 12,
        step: 1,
        value: 0,
        format: (value) => (value > 0 ? `+${value}` : `${value}`)
      },
      pad.setPitch
    )
  )

  return controls
}

export function initPadsUI(containerId, pads) {
  const container = document.getElementById(containerId)

  pads.forEach((pad) => {
    const element = document.createElement('div')
    element.className = `Pad ${pad.side}`
    element.innerHTML = `
      <span class="label">${pad.label}</span>
      <span class="title">${pad.title}</span>
      <span class="hint">${pad.hint}</span>
    `

    if (pad.instrument) element.appendChild(createPadControls(pad))

    container.appendChild(element)

    bind(pad.code, {
      element,
      start: pad.start,
      stop: pad.stop
    })
  })
}
