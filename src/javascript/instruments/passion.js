import * as Tone from 'tone'
import {
  randomItem,
  createClock,
  nextBeat,
  atNextBeat
} from '../utilities.js'

// СТРАСТЬ — включил: визжащий грязный лид въезжает в ноту снизу и поёт,
// каждую долю перетекая в новую ноту — легато, без обрыва. Вкл и выкл — в бит

export const passion = {
  synth: {
    volume: -8,
    portamento: 0.05,
    oscillator: {
      type: 'fatsawtooth',
      count: 3,
      spread: 30
    },
    filter: {
      type: 'lowpass',
      rolloff: -24,
      Q: 2
    },
    envelope: {
      attack: 0.01,
      decay: 0.3,
      sustain: 0.7,
      release: 0.8
    },
    filterEnvelope: {
      attack: 0.01,
      decay: 0.4,
      sustain: 0.6,
      release: 0.8,
      baseFrequency: 800,
      octaves: 3
    },
    node: null
  },
  distortion: {
    wet: 0.5,
    distortion: 0.6,
    node: null
  },
  pingPongDelay: {
    wet: 0.3,
    delayTime: '8n',
    maxDelay: 1,
    feedback: 0.4,
    node: null
  },
  channel: {
    volume: -6,
    pan: 0.15,
    mute: false,
    solo: false,
    node: null
  },
  notes: ['A4', 'C5', 'D5', 'E5', 'G5'],
  // насколько ниже (в центах) нота начинается и за сколько секунд подтягивается
  scoop: {
    detune: -300,
    time: 0.15
  },
  // новая нота лида на каждую долю
  loop: {
    interval: '4n',
    node: null
  },
  playing: false,
  attackTime: 0,
  // сдвиг в полутонах с бегунка «Тон»
  pitch: 0,
  clock: createClock()
}

export function initPassion(output) {
  passion.synth.node = new Tone.MonoSynth(passion.synth)
  passion.distortion.node = new Tone.Distortion(passion.distortion)
  passion.pingPongDelay.node = new Tone.PingPongDelay(passion.pingPongDelay)
  passion.channel.node = new Tone.Channel(passion.channel).connect(output)

  passion.synth.node.chain(
    passion.distortion.node,
    passion.pingPongDelay.node,
    passion.channel.node
  )

  passion.loop.node = new Tone.Loop((time) => {
    playNote(time)
  }, passion.loop.interval)
}

// первая нота — атака со «скупом» снизу, с ближайшей восьмой
function attack(time) {
  time = passion.clock(time)
  const detune = passion.synth.node.detune
  const base = passion.pitch * 100

  detune.cancelScheduledValues(time)
  detune.setValueAtTime(base + passion.scoop.detune, time)
  detune.linearRampToValueAtTime(base, time + passion.scoop.time)

  passion.synth.node.triggerAttack(randomItem(passion.notes), time, 1)
  passion.playing = true
  passion.attackTime = time
}

// дальше на каждую долю — только смена высоты, нота не перезапускается
function playNote(time) {
  if (!passion.playing || time <= passion.attackTime + 0.01) return

  passion.synth.node.setNote(randomItem(passion.notes), passion.clock(time))
}

export function startPassion() {
  atNextBeat((time) => attack(time))
  passion.loop.node.start(nextBeat(passion.loop.interval))
}

export function stopPassion() {
  passion.loop.node.stop(nextBeat())

  atNextBeat((time) => {
    passion.synth.node.triggerRelease(passion.clock(time))
    passion.playing = false
  })
}

export function setPassionPitch(semitones) {
  passion.pitch = semitones
  passion.synth.node.detune.rampTo(semitones * 100, 0.05)
}
