import * as Tone from 'tone'

// ГОЛОС РАЗУМА — низкий жирный бас: детюн-пила с щелчком фильтра и
// чистый саб под ней. Моно: думает об одном за раз. Звучит «сухо»: реверб,
// эхо и искажение — в общей стойке эффектов

export const mind = {
  synth: {
    volume: 0,
    portamento: 0.04,
    oscillator: {
      type: 'fatsawtooth',
      count: 2,
      spread: 20
    },
    filter: {
      type: 'lowpass',
      rolloff: -24,
      Q: 1
    },
    envelope: {
      attack: 0.005,
      decay: 0.3,
      sustain: 0.7,
      release: 0.3
    },
    // фильтр открывается на удар и быстро закрывается — «щелчок»
    filterEnvelope: {
      attack: 0.005,
      decay: 0.2,
      sustain: 0.3,
      release: 0.3,
      baseFrequency: 120,
      octaves: 4,
      exponent: 2
    },
    node: null
  },
  // саб — чистый синус той же ноты, даёт «вес»
  sub: {
    volume: -4,
    portamento: 0.04,
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.005,
      decay: 0.3,
      sustain: 0.8,
      release: 0.3
    },
    node: null
  },
  channel: {
    volume: -2,
    pan: -0.3,
    // в начале голос выключен — включается кнопкой «Вкл»
    mute: true,
    solo: false,
    node: null
  },
  // ноты шагов секвенсора: До…До низкой октавы
  notes: ['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3']
}

export function initMind(output) {
  mind.synth.node = new Tone.MonoSynth(mind.synth)
  mind.sub.node = new Tone.Synth(mind.sub)
  mind.channel.node = new Tone.Channel(mind.channel).connect(output)

  mind.synth.node.connect(mind.channel.node)
  mind.sub.node.connect(mind.channel.node)
}

export function playMind(noteName, duration, time, velocity) {
  mind.synth.node.triggerAttackRelease(noteName, duration, time, velocity)
  mind.sub.node.triggerAttackRelease(noteName, duration, time, velocity)
}
