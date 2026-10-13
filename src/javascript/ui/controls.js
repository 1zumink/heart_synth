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

export function createButton(title, onClick) {
  const element = document.createElement('div')
  element.className = 'ToggleButton'
  element.innerText = title
  element.addEventListener('click', onClick)

  return element
}
