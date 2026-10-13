import * as Tone from 'tone'
import { createClock, atNextBeat } from '../utilities.js'

// ТРЕВОГА — включил: дрожащий шум мечется по стерео и нарастает,
// пока не выключишь. Вкл и выкл — ровно в бит

export const anxiety = {
  synth: {
    volume: 10,
    noise: {
      type: 'pink'
    },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 1,
      release: 1.5
    },
    node: null
  },
  tremolo: {
    wet: 1,
    frequency: 9,
    type: 'sine',
    depth: 0.9,
    spread: 90,
    node: null
  },
  autoPanner: {
    wet: 1,
    frequency: 3,
    depth: 1,
    node: null
  },
  filter: {
    type: 'bandpass',
    frequency: 2500,
    Q: 3,
    node: null
  },
  channel: {
    volume: 2,
    pan: -0.5,
    mute: false,
    solo: false,
    node: null
  },
  // пока включена, фильтр ползёт вверх — тревога нарастает
  rise: {
    frequency: 5000,
    time: 4
  },
  // шум без высоты: «Тон» сдвигает частоты фильтра, полутон за полутоном
  pitch: 0,
  playing: false,
  clock: createClock()
}

export function initAnxiety(output) {
  anxiety.synth.node = new Tone.NoiseSynth(anxiety.synth)
  anxiety.tremolo.node = new Tone.Tremolo(anxiety.tremolo).start()
  anxiety.autoPanner.node = new Tone.AutoPanner(anxiety.autoPanner).start()
  anxiety.filter.node = new Tone.Filter(anxiety.filter)
  anxiety.channel.node = new Tone.Channel(anxiety.channel).connect(output)

  anxiety.synth.node.chain(
    anxiety.tremolo.node,
    anxiety.autoPanner.node,
    anxiety.filter.node,
    anxiety.channel.node
  )
}

// частота фильтра с учётом «Тона»
function pitched(frequency) {
  return frequency * Math.pow(2, anxiety.pitch / 12)
}

export function startAnxiety() {
  atNextBeat((time) => {
    const frequency = anxiety.filter.node.frequency

    frequency.cancelScheduledValues(time)
    frequency.setValueAtTime(pitched(anxiety.filter.frequency), time)
    frequency.rampTo(pitched(anxiety.rise.frequency), anxiety.rise.time, time)

    anxiety.synth.node.triggerAttack(anxiety.clock(time), 0.8)
    anxiety.playing = true
  })
}

export function stopAnxiety() {
  atNextBeat((time) => {
    anxiety.synth.node.triggerRelease(anxiety.clock(time))
    anxiety.filter.node.frequency.rampTo(
      pitched(anxiety.filter.frequency),
      1.5,
      time
    )
    anxiety.playing = false
  })
}

export function setAnxietyPitch(semitones) {
  anxiety.pitch = semitones

  const frequency = anxiety.filter.node.frequency
  const target = anxiety.playing
    ? anxiety.rise.frequency
    : anxiety.filter.frequency

  // остановить текущий подъём фильтра там, где он сейчас, и плавно переехать
  frequency.cancelAndHoldAtTime(Tone.now())
  frequency.rampTo(pitched(target), 0.3)
}
