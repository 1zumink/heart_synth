import * as Tone from 'tone'
import { createSlider, createToggle, createButton } from './ui/controls.js'
import { mind, playMind } from './instruments/mind.js'
import { heart, playHeart } from './instruments/heart.js'

// ШАГОВЫЙ СЕКВЕНСОР — ноты идут друг за другом в темпе транспорта.
// Разум и Сердце шагают одновременно: на каждом шаге каждый голос
// играет свою ноту, если шаг включён. Ноты постоянные — гамма До…До,
// у шага меняются только «включён» и громкость

export const sequencer = {
  steps: 8,
  // 8 восьмых = 1 такт, ровно круг бита
  subdivision: '8n',
  noteLength: '8n',
  // громкость шага: x — обычная, o — тихая; . — шаг выключен
  velocities: { x: 0.8, o: 0.5 },
  defaultVelocity: 0.8,
  current: -1,
  node: null
}

// Ноты шагов — instrument.notes (До Ре Ми Фа Соль Ля Си До), а строка
// pattern говорит, какие шаги включены. Пробелы только для читаемости
export const voices = [
  {
    id: 'mindSequencer',
    title: 'Разум',
    hint: 'низкий, собранный · C2–C3',
    instrument: mind,
    play: playMind,
    pattern: 'x.x. x..x',
    steps: [],
    elements: []
  },
  {
    id: 'heartSequencer',
    title: 'Сердце',
    hint: 'высокий, тёплый · C5–C6',
    instrument: heart,
    play: playHeart,
    pattern: '.x.x .xo.',
    steps: [],
    elements: []
  }
]

function createSteps(notes, pattern) {
  const symbols = pattern.replace(/\s/g, '').split('')

  return notes.map((noteName, index) => {
    const symbol = symbols[index]
    const on = symbol in sequencer.velocities

    return {
      on,
      noteName,
      velocity: on ? sequencer.velocities[symbol] : sequencer.defaultVelocity
    }
  })
}

export function initSequencer() {
  voices.forEach((voice) => {
    voice.steps = createSteps(voice.instrument.notes, voice.pattern)
  })

  const indices = Array.from({ length: sequencer.steps }, (_, i) => i)

  sequencer.node = new Tone.Sequence(
    (time, index) => {
      voices.forEach((voice) => {
        const step = voice.steps[index]
        if (!step.on) return

        voice.play(step.noteName, sequencer.noteLength, time, step.velocity)
      })

      // подсветка шага — в такт со звуком, а не раньше
      Tone.getDraw().schedule(() => showCurrent(index), time)
    },
    indices,
    sequencer.subdivision
  ).start(0)
}

// UI

function showCurrent(index) {
  voices.forEach((voice) => {
    voice.elements[sequencer.current]?.classList.remove('current')
    voice.elements[index]?.classList.add('current')
  })

  sequencer.current = index
}

function createStepElement(step) {
  const element = document.createElement('div')
  element.className = 'Step'
  element.innerHTML = `
    <div class="note">${step.noteName}</div>
    <div class="toggle"></div>
    <input class="velocity" type="range" min="0" max="1" step="0.01" />
  `

  const velocityInput = element.querySelector('.velocity')

  function render() {
    element.classList.toggle('on', step.on)
    velocityInput.value = step.velocity
  }

  element.querySelector('.toggle').addEventListener('click', () => {
    step.on = !step.on
    render()
  })

  velocityInput.addEventListener('input', (e) => {
    step.velocity = Number(e.target.value)
  })

  // двойной клик — громкость по умолчанию
  velocityInput.addEventListener('dblclick', () => {
    step.velocity = sequencer.defaultVelocity
    render()
  })

  render()

  return { element, render }
}

function randomize(voice) {
  voice.steps.forEach((step, index) => {
    // на долях нота чаще, между долями реже
    const chance = index % 2 === 0 ? 0.7 : 0.35

    step.on = Math.random() < chance
    step.velocity = 0.5 + Math.round(Math.random() * 50) / 100
  })
}

function clear(voice) {
  voice.steps.forEach((step) => {
    step.on = false
  })
}

function createVoiceHead(voice, container, renderAll) {
  const channel = voice.instrument.channel

  const head = document.createElement('div')
  head.className = 'voiceHead'
  head.innerHTML = `
    <div class="name">
      <div class="title">${voice.title}</div>
      <div class="hint">${voice.hint}</div>
    </div>
    <div class="controls"></div>
  `

  const controls = head.querySelector('.controls')

  controls.appendChild(
    createToggle('Вкл', !channel.mute, (active) => {
      channel.node.mute = !active
      if (active) channel.node.volume.value = channel.volume
      // выключенный голос приглушён и на экране
      container.classList.toggle('off', !active)
    })
  )

  const volume = createSlider(
    'Громкость',
    {
      min: -40,
      max: 6,
      step: 1,
      value: channel.volume,
      format: (value) => `${value} дБ`
    },
    (value) => {
      // в Mute громкость не трогаем, применим при включении
      channel.volume = value
      if (!channel.node.mute) channel.node.volume.value = value
    }
  )

  volume.classList.add('volume')
  controls.appendChild(volume)

  controls.appendChild(
    createButton('Случайно', () => {
      randomize(voice)
      renderAll()
    })
  )

  controls.appendChild(
    createButton('Очистить', () => {
      clear(voice)
      renderAll()
    })
  )

  return head
}

export function initSequencerUI() {
  voices.forEach((voice) => {
    const container = document.getElementById(voice.id)
    const steps = voice.steps.map((step) => createStepElement(step))

    function renderAll() {
      steps.forEach(({ render }) => render())
    }

    const row = document.createElement('div')
    row.className = 'Steps'
    steps.forEach(({ element }) => row.appendChild(element))

    container.classList.toggle('off', voice.instrument.channel.mute)
    container.appendChild(createVoiceHead(voice, container, renderAll))
    container.appendChild(row)

    voice.elements = steps.map(({ element }) => element)
  })
}
