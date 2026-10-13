import * as Tone from 'tone'
import { atNextBeat } from '../utilities.js'

// СОМНЕНИЕ — включил: протяжный колеблющийся дрон с тритоном внутри,
// выключил — долго не уходит. Вкл и выкл — ровно в бит

export const doubt = {
  synth: {
    volume: -10,
    oscillator: {
      type: 'fatsawtooth',
      count: 5,
      spread: 40
    },
    envelope: {
      attack: 0.08,
      attackCurve: 'linear',
      decay: 1,
      sustain: 0.9,
      release: 6,
      releaseCurve: 'exponential'
    },
    node: null
  },
  filter: {
    type: 'lowpass',
    frequency: 2200,
    rolloff: -24,
    Q: 1,
    node: null
  },
  phaser: {
    wet: 0.6,
    frequency: 0.3,
    octaves: 3,
    baseFrequency: 300,
    node: null
  },
  vibrato: {
    wet: 1,
    maxDelay: 0.01,
    frequency: 0.2,
    depth: 0.4,
    type: 'sine',
    node: null
  },
  reverb: {
    wet: 0.5,
    decay: 10,
    node: null
  },
  channel: {
    volume: -5,
    pan: -0.4,
    mute: false,
    solo: false,
    node: null
  },
  chord: ['E3', 'B3', 'F4'],
  // сдвиг в полутонах с бегунка «Тон»
  pitch: 0
}

export function initDoubt(output) {
  doubt.synth.node = new Tone.PolySynth(Tone.Synth, doubt.synth)
  doubt.filter.node = new Tone.Filter(doubt.filter)
  doubt.phaser.node = new Tone.Phaser(doubt.phaser)
  doubt.vibrato.node = new Tone.Vibrato(doubt.vibrato)
  doubt.reverb.node = new Tone.Reverb(doubt.reverb)
  doubt.channel.node = new Tone.Channel(doubt.channel).connect(output)

  doubt.synth.node.chain(
    doubt.filter.node,
    doubt.phaser.node,
    doubt.vibrato.node,
    doubt.reverb.node,
    doubt.channel.node
  )
}

export function startDoubt() {
  atNextBeat((time) => doubt.synth.node.triggerAttack(doubt.chord, time, 0.6))
}

export function stopDoubt() {
  atNextBeat((time) => doubt.synth.node.triggerRelease(doubt.chord, time))
}

// detune сдвигает и уже звучащий дрон
export function setDoubtPitch(semitones) {
  doubt.pitch = semitones
  doubt.synth.node.set({ detune: semitones * 100 })
}
