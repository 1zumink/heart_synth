import * as Tone from 'tone'
import { atNextBeat } from '../utilities.js'

// НАДЕЖДА — включил: яркие суперсоу-аккорды тянутся, пока не выключишь.
// Каждое включение — следующий аккорд. Вкл и выкл — ровно в бит

export const hope = {
  synth: {
    volume: 0,
    oscillator: {
      type: 'fatsawtooth',
      count: 5,
      spread: 40
    },
    // атака короткая — аккорд звучит сразу, как только включил
    envelope: {
      attack: 0.02,
      attackCurve: 'linear',
      decay: 0.6,
      sustain: 0.7,
      release: 4,
      releaseCurve: 'exponential'
    },
    node: null
  },
  chorus: {
    wet: 0.5,
    frequency: 0.8,
    delayTime: 4,
    depth: 0.6,
    spread: 180,
    node: null
  },
  reverb: {
    wet: 0.6,
    decay: 8,
    node: null
  },
  channel: {
    volume: -6,
    pan: 0.4,
    mute: false,
    solo: false,
    node: null
  },
  chords: [
    ['C4', 'E4', 'G4', 'D5'],
    ['A3', 'C4', 'E4', 'G4'],
    ['F3', 'A3', 'C4', 'E4'],
    ['G3', 'B3', 'D4', 'E4']
  ],
  chordIndex: 0,
  playing: null,
  // сдвиг в полутонах с бегунка «Тон»
  pitch: 0
}

export function initHope(output) {
  hope.synth.node = new Tone.PolySynth(Tone.Synth, hope.synth)
  hope.chorus.node = new Tone.Chorus(hope.chorus).start()
  hope.reverb.node = new Tone.Reverb(hope.reverb)
  hope.channel.node = new Tone.Channel(hope.channel).connect(output)

  hope.synth.node.chain(hope.chorus.node, hope.reverb.node, hope.channel.node)
}

export function startHope() {
  const chord = hope.chords[hope.chordIndex]
  hope.chordIndex = (hope.chordIndex + 1) % hope.chords.length
  hope.playing = chord

  atNextBeat((time) => hope.synth.node.triggerAttack(chord, time, 0.7))
}

export function stopHope() {
  const chord = hope.playing

  atNextBeat((time) => hope.synth.node.triggerRelease(chord, time))
}

// detune сдвигает и уже звучащий аккорд
export function setHopePitch(semitones) {
  hope.pitch = semitones
  hope.synth.node.set({ detune: semitones * 100 })
}
