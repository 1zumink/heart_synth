import * as Tone from 'tone'
import { initEffects } from './effects.js'

// Шины сторон — Tone.Volume, а не Tone.Channel: иначе Solo на любом
// инструменте глушил бы саму шину вместе со всеми её каналами

export const mixer = {
  heartBus: {
    volume: 0,
    node: null
  },
  mindBus: {
    volume: 0,
    node: null
  },
  // голоса и эмоции сходятся сюда и идут через общую стойку эффектов
  fxBus: {
    volume: 0,
    node: null
  },
  // бит идёт отдельной шиной мимо эффектов: не размазывается и не путается
  // с голосами в подсветке разговора
  beatBus: {
    volume: 0,
    node: null
  },
  heartMeter: {
    smoothing: 0.85,
    node: null
  },
  mindMeter: {
    smoothing: 0.85,
    node: null
  },
  silence: {
    gain: 1,
    rampTime: 1.5,
    node: null
  },
  master: {
    gain: 1,
    node: null
  },
  compressor: {
    threshold: -18,
    ratio: 3,
    attack: 0.01,
    release: 0.2,
    node: null
  },
  limiter: {
    threshold: -1,
    node: null
  }
}

export function initMixer() {
  mixer.compressor.node = new Tone.Compressor(mixer.compressor)
  mixer.limiter.node = new Tone.Limiter(mixer.limiter)
  mixer.master.node = new Tone.Gain(mixer.master.gain)

  mixer.master.node.chain(
    mixer.compressor.node,
    mixer.limiter.node,
    Tone.getDestination()
  )

  // Тишина глушит оба голоса и бит, но не сердцебиение — оно идёт сразу в мастер
  mixer.silence.node = new Tone.Gain(mixer.silence.gain).connect(
    mixer.master.node
  )

  mixer.fxBus.node = new Tone.Volume(mixer.fxBus.volume)
  initEffects(mixer.fxBus.node, mixer.silence.node)

  mixer.heartBus.node = new Tone.Volume(mixer.heartBus.volume).connect(
    mixer.fxBus.node
  )

  mixer.mindBus.node = new Tone.Volume(mixer.mindBus.volume).connect(
    mixer.fxBus.node
  )

  mixer.beatBus.node = new Tone.Volume(mixer.beatBus.volume).connect(
    mixer.silence.node
  )

  mixer.heartMeter.node = new Tone.Meter(mixer.heartMeter)
  mixer.mindMeter.node = new Tone.Meter(mixer.mindMeter)
  mixer.heartBus.node.connect(mixer.heartMeter.node)
  mixer.mindBus.node.connect(mixer.mindMeter.node)
}

export function startSilence() {
  mixer.silence.node.gain.rampTo(0, mixer.silence.rampTime)
}

export function stopSilence() {
  mixer.silence.node.gain.rampTo(mixer.silence.gain, mixer.silence.rampTime)
}
