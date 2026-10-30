// Мелкие элементы управления, которые собираются из JS

// бегунок с подписью; format показывает текущее значение рядом с подписью
export function createSlider(
  title,
  { min, max, step, value, format = null },
  onInput
) {
  const element = document.createElement('div')
  element.className = 'Slider'
  element.innerHTML = `
    <div class="title">${title} <span class="value"></span></div>
    <input type="range" min="${min}" max="${max}" step="${step}" />
  `

  const input = element.querySelector('input')
  const valueLabel = element.querySelector('.value')

  function set(newValue) {
    if (format) valueLabel.innerText = format(newValue)
    onInput(newValue)
  }

  input.value = value
  if (format) valueLabel.innerText = format(value)

  input.addEventListener('input', (e) => set(Number(e.target.value)))

  // двойной клик — вернуть значение по умолчанию
  input.addEventListener('dblclick', () => {
    input.value = value
    set(value)
  })

  return element
}

export function createToggle(title, active, onToggle) {
  const element = document.createElement('div')
  element.className = 'ToggleButton'
  element.innerText = title

  if (active) element.classList.add('active')

  element.addEventListener('click', () => {
    element.classList.toggle('active')
    onToggle(element.classList.contains('active'))
  })

  return element
}

// иконка: выключено — треугольник «играть», включено — квадрат «стоп»
export function playIcon(playing) {
  const shape = playing
    ? '<rect x="2" y="2" width="10" height="10" rx="1" />'
    : '<path d="M3.5 1.5 L12.5 7 L3.5 12.5 Z" />'

  return `<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">${shape}</svg>`
}

// круглая кнопка с иконкой вместо подписи; label — что включаем, для подсказки
export function createPlayToggle(label, active, onToggle) {
  const element = document.createElement('div')
  element.className = 'ToggleButton PlayButton'
  element.setAttribute('role', 'button')

  function render() {
    const playing = element.classList.contains('active')
    element.innerHTML = playIcon(playing)
    element.title = `${playing ? 'Выключить' : 'Включить'} ${label}`
    element.setAttribute('aria-label', element.title)
  }

  element.classList.toggle('active', active)
  render()

  element.addEventListener('click', () => {
    element.classList.toggle('active')
    render()
    onToggle(element.classList.contains('active'))
  })

  return element
}

export function createButton(title, onClick) {
  const element = document.createElement('div')
  element.className = 'ToggleButton'
  element.innerText = title
  element.addEventListener('click', onClick)

  return element
}
