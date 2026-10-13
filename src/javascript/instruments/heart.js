import * as Tone from 'tone'

// ГОЛОС СЕРДЦА — высокий, яркий чиптюн-лид: узкий «пульс» как у приставки
// плюс тихий суперсоу для ширины. Звучит «сухо»: реверб, эхо и искажение —
// в общей стойке эффектов

export const heart = {
  synth: {
    volume: -4,
    oscillator: {
      type: 'pulse',
      width: 0.25
    },
    envelope: {
      attack: 0.005,
      decay: 0.2,
      sustain: 0.6,
      release: 0.3
    },
    node: null
  },
  // суперсоу под лидом — делает его шире
  layer: {
    volume: -14,
    oscillator: {
      type: 'fatsawtooth',
      count: 3,
      spread: 25
    },
    envelope: {
      attack: 0.005,
      decay: 0.3,
      sustain: 0.5,
      release: 0.4
    },
    node: null
  },
  channel: {
    volume: -3,
    pan: 0.3,
    // в начале голос выключен — включается кнопкой «Вкл»
    mute: true,
    solo: false,
    node: null
  },
  // ноты шагов секвенсора: До…До высокой октавы
  notes: ['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'],
  // последние сыгранные ноты — их потом вспоминает Память
  history: [],
  historyLength: 6
}

export function initHeart(output) {
  heart.synth.node = new Tone.PolySynth(Tone.Synth, heart.synth)
  heart.layer.node = new Tone.PolySynth(Tone.Synth, heart.layer)
  heart.channel.node = new Tone.Channel(heart.channel).connect(output)

  heart.synth.node.connect(heart.channel.node)
  heart.layer.node.connect(heart.channel.node)
}

export function rememberHeartNote(noteName) {
  heart.history.push(noteName)

  if (heart.history.length > heart.historyLength) {
    heart.history.shift()
  }
}

export function playHeart(noteName, duration, time, velocity) {
  heart.synth.node.triggerAttackRelease(noteName, duration, time, velocity)
  heart.layer.node.triggerAttackRelease(noteName, duration, time, velocity)
  rememberHeartNote(noteName)
}
