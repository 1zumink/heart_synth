const drums = {
  tremolo: {
    wet: 1,
    frequency: 100,
    type: 'square',
    depth: 0.9,
    spread: 100
  },
  jcReverb: {
    wet: 0.1,
    roomSize: 0.05
  },
  sequence: [
    {
      time: '0:0:0',
      noteName: 'C2',
      duration: '2n',
      velocity: 1
    },
    {
      time: '0:1:0',
      noteName: 'D2',
      duration: '2n',
      velocity: 1
    },
    {
      time: '0:1:2',
      noteName: 'C2',
      duration: '8n',
      velocity: 1
    },
    {
      time: '0:2:0',
      noteName: 'C2',
      duration: '8n',
      velocity: 1
    },
    {
      time: '0:3:0',
      noteName: 'D2',
      duration: '2n',
      velocity: 1
    },
    {
      time: '0:3:3',
      noteName: 'D2',
      duration: '2n',
      velocity: 1
    },
    {
      time: '1:0:0',
      noteName: 'C2',
      duration: '2n',
      velocity: 1
    },
    {
      time: '1:1:0',
      noteName: 'D2',
      duration: '2n',
      velocity: 1
    },
    {
      time: '1:2:2',
      noteName: 'C2',
      duration: '2n',
      velocity: 1
    },
    {
      time: '1:3:0',
      noteName: 'D2',
      duration: '2n',
      velocity: 1
    }
  ],
  loop: '2m'
}

const bass = {
  synth: {
    volume: 0.8,
    detune: 0.3,
    portamento: 0.05,
    envelope: {
      attack: 0.05,
      attackCurve: 'exponential',
      decay: 0.2,
      decayCurve: 'exponential',
      sustain: 0.2,
      release: 1.5,
      releaseCurve: 'exponential'
    },
    oscillator: {
      type: 'sawtooth',
      modulationType: 'sine',
      // partialCount: 0,
      // partials: [],
      phase: 0,
      harmonicity: 0.5
    }
  },
  tremolo: {
    wet: 1,
    frequency: 30,
    type: 'square',
    depth: 0.9,
    spread: 100
  },
  sequence: [
    {
      time: '0:0:0',
      noteName: 'C2',
      duration: '1m',
      velocity: 1
    },
    {
      time: '1:0:0',
      noteName: 'F2',
      duration: '1m',
      velocity: 1
    }
  ],
  loop: '2m'
}

function initDrums() {
  const sampler = new Tone.Sampler({
    urls: {
      C2: 'BT7A0D0.WAV',
      D2: 'ST0T3S7.WAV'
    },
    baseUrl: 'roland_tr_909/'
  }).toDestination()

  const tremolo = new Tone.Tremolo(drums.tremolo).start()
  const jcReverb = new Tone.JCReverb(drums.jcReverb).toDestination()
  sampler.chain(tremolo, jcReverb)

  const part = new Tone.Part((time, note) => {
    sampler.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, drums.sequence).start(0)

  part.loopEnd = drums.loop
  part.loop = true
}

function initBass() {
  const synth = new Tone.PolySynth(bass.synth)
  const tremolo = new Tone.Tremolo(bass.tremolo).start().toDestination()
  synth.chain(tremolo)

  const part = new Tone.Part((time, note) => {
    synth.triggerAttackRelease(
      [note.noteName, note.noteName, note.noteName],
      note.duration,
      time,
      note.velocity
    )
  }, bass.sequence).start(0)

  part.loopEnd = bass.loop
  part.loop = true
}

function initWebAudio() {
  Tone.start()
}

function initTransport() {
  const transport = Tone.getTransport()
  transport.bpm.value = 112
  transport.start()
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton')

  startButton.addEventListener('click', () => {
    initWebAudio()
    initDrums()
    initBass()
    initTransport()
  })
})
