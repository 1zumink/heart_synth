import * as Tone from 'tone'
import { heart } from './heart.js'
import { nextBeat } from '../utilities.js'

// ПАМЯТЬ — включил: восьмыми, эхом и октавой ниже, перебирает
// последние ноты Сердца. Звук — короткий чиптюн-щипок: ровный по громкости
// с первой же ноты (PluckSynth на низких нотах был на 10–20 дБ тише)

export const memory = {
  synth: {
    volume: -6,
    oscillator: {
      type: 'square'
    },
    envelope: {
      attack: 0.002,
      decay: 0.25,
      sustain: 0,
      release: 0.2
    },
    node: null
  },
  // эхо ровно в сетку и негромкое: иначе громкость набирается за несколько
  // повторов и кажется, что Память вступает с опозданием
  feedbackDelay: {
    wet: 0.25,
    delayTime: '8n',
    maxDelay: 1,
    feedback: 0.3,
    node: null
  },
  reverb: {
    wet: 0.25,
    decay: 4,
    node: null
  },
  channel: {
    volume: 0,
    pan: 0.5,
    mute: false,
    solo: false,
    node: null
  },
  // что вспоминать, если Сердце ещё ничего не сыграло
  fallback: ['E5', 'D5', 'C5', 'A4'],
  // на октаву ниже Сердца; pitch — сдвиг в полутонах с бегунка «Тон»
  transpose: -12,
  pitch: 0,
  index: 0,
  loop: {
    interval: '8n',
    node: null
  }
}

export function initMemory(output) {
  memory.synth.node = new Tone.PolySynth(Tone.Synth, memory.synth)
  memory.feedbackDelay.node = new Tone.FeedbackDelay(memory.feedbackDelay)
  memory.reverb.node = new Tone.Reverb(memory.reverb)
  memory.channel.node = new Tone.Channel(memory.channel).connect(output)

  memory.synth.node.chain(
    memory.feedbackDelay.node,
    memory.reverb.node,
    memory.channel.node
  )

  memory.loop.node = new Tone.Loop((time) => {
    playMemory(time)
  }, memory.loop.interval)
}

function playMemory(time) {
  const notes = heart.history.length > 0 ? heart.history : memory.fallback
  const noteName = notes[memory.index % notes.length]
  const remembered = Tone.Frequency(noteName)
    .transpose(memory.transpose + memory.pitch)
    .toNote()

  memory.synth.node.triggerAttackRelease(remembered, '16n', time)
  memory.index++
}

export function startMemory() {
  memory.index = 0
  memory.loop.node.start(nextBeat())
}

export function stopMemory() {
  memory.loop.node.stop(nextBeat())
}

// щипки короткие — новый тон слышен со следующей ноты
export function setMemoryPitch(semitones) {
  memory.pitch = semitones
}
