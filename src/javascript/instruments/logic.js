import * as Tone from 'tone'
import { createClock, nextBeat } from '../utilities.js'

// ЛОГИКА — включил: ровный 16-й чиптюн-«расчёт» в темпе бита

export const logic = {
  synth: {
    volume: -10,
    // узкий «пульс» — звук приставки NES
    oscillator: {
      type: 'pulse',
      width: 0.125
    },
    envelope: {
      attack: 0.001,
      decay: 0.04,
      sustain: 0,
      release: 0.02
    },
    node: null
  },
  bitCrusher: {
    wet: 0.5,
    bits: 4,
    node: null
  },
  feedbackDelay: {
    wet: 0.25,
    delayTime: '8n',
    maxDelay: 1,
    feedback: 0.25,
    node: null
  },
  channel: {
    volume: -8,
    pan: -0.6,
    mute: false,
    solo: false,
    node: null
  },
  notes: ['A4', 'E5', 'A5', 'C6', 'E5', 'G5'],
  step: 0,
  loop: {
    interval: '16n',
    node: null
  },
  // сдвиг в полутонах с бегунка «Тон»
  pitch: 0,
  clock: createClock()
}

export function initLogic(output) {
  logic.synth.node = new Tone.Synth(logic.synth)
  logic.bitCrusher.node = new Tone.BitCrusher(logic.bitCrusher)
  logic.feedbackDelay.node = new Tone.FeedbackDelay(logic.feedbackDelay)
  logic.channel.node = new Tone.Channel(logic.channel).connect(output)

  logic.synth.node.chain(
    logic.bitCrusher.node,
    logic.feedbackDelay.node,
    logic.channel.node
  )

  logic.loop.node = new Tone.Loop((time) => {
    playStep(time)
  }, logic.loop.interval)
}

function playStep(time) {
  const noteName = logic.notes[logic.step % logic.notes.length]
  logic.synth.node.triggerAttackRelease(noteName, '32n', logic.clock(time))
  logic.step++
}

export function startLogic() {
  logic.step = 0
  logic.loop.node.start(nextBeat())
}

export function stopLogic() {
  logic.loop.node.stop(nextBeat())
}

export function setLogicPitch(semitones) {
  logic.pitch = semitones
  logic.synth.node.detune.rampTo(semitones * 100, 0.05)
}
