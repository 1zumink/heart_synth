import * as Tone from 'tone'
import { createClock, nextBeat } from '../utilities.js'

// СЕРДЦЕБИЕНИЕ — включил: «тук-тук» на каждую долю бита.
// Идёт мимо шин голосов, поэтому его не глушит Тишина

export const heartbeat = {
  synth: {
    volume: -2,
    pitchDecay: 0.05,
    octaves: 4,
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.001,
      decay: 0.4,
      sustain: 0,
      release: 0.8
    },
    node: null
  },
  distortion: {
    wet: 0.2,
    distortion: 0.3,
    node: null
  },
  jcReverb: {
    wet: 0.15,
    roomSize: 0.3,
    node: null
  },
  channel: {
    volume: -6,
    pan: 0,
    mute: false,
    solo: false,
    node: null
  },
  beat: {
    noteName: 'C1',
    lub: 1,
    dub: 0.65,
    gap: 0.18
  },
  loop: {
    interval: '4n',
    node: null
  },
  // сдвиг в полутонах с бегунка «Тон»
  pitch: 0,
  clock: createClock()
}

export function initHeartbeat(output) {
  heartbeat.synth.node = new Tone.MembraneSynth(heartbeat.synth)
  heartbeat.distortion.node = new Tone.Distortion(heartbeat.distortion)
  heartbeat.jcReverb.node = new Tone.JCReverb(heartbeat.jcReverb)
  heartbeat.channel.node = new Tone.Channel(heartbeat.channel).connect(output)

  heartbeat.synth.node.chain(
    heartbeat.distortion.node,
    heartbeat.jcReverb.node,
    heartbeat.channel.node
  )

  heartbeat.loop.node = new Tone.Loop((time) => {
    playBeat(time)
  }, heartbeat.loop.interval)
}

function playBeat(time) {
  const { noteName, lub, dub, gap } = heartbeat.beat
  time = heartbeat.clock(time, gap)

  heartbeat.synth.node.triggerAttackRelease(noteName, '16n', time, lub)
  heartbeat.synth.node.triggerAttackRelease(noteName, '16n', time + gap, dub)
}

// пульс — строго на четверти, поэтому и вступает с ближайшей четверти
export function startHeartbeat() {
  heartbeat.loop.node.start(nextBeat(heartbeat.loop.interval))
}

export function stopHeartbeat() {
  heartbeat.loop.node.stop(nextBeat())
}

export function setHeartbeatPitch(semitones) {
  heartbeat.pitch = semitones
  heartbeat.synth.node.detune.rampTo(semitones * 100, 0.05)
}
