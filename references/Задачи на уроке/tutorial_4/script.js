const bassSynthSettings = {
  volume: 0.8,
  detune: 0,
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
}

const bassSynthSequence = [
  {
    time: '0:0:0',
    noteName: 'C2',
    duration: '2n',
    velocity: 1
  },
  {
    time: '0:2:0',
    noteName: 'G2',
    duration: '2n',
    velocity: 1
  },
  {
    time: '1:0:0',
    noteName: 'E2',
    duration: '2n',
    velocity: 1
  },
  {
    time: '1:2:0',
    noteName: 'F2',
    duration: '2n',
    velocity: 1
  }
]

const drumsFreeverbSettings = {
  wet: 0.8,
  roomSize: 0.9,
  dampening: 4
}

const echoDrumFeedbackDelaySettings = {
  wet: 1,
  delayTime: 0.25,
  maxDelayTime: 1
}

const echoDrumFreeverbSettings = {
  wet: 1,
  roomSize: 0.9,
  dampening: 20
}

const echoDrumSamplerSequence = [
  {
    time: '1:1:2',
    noteName: 'C2',
    duration: '2n',
    velocity: 1
  }
]

const drumSamplerSequence = [
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
    time: '0:2:0',
    noteName: 'C2',
    duration: '2n',
    velocity: 1
  },
  {
    time: '0:3:0',
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
    time: '1:2:0',
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
]

function initWebAudio() {
  Tone.start()
}

function initTransport() {
  const transport = Tone.getTransport()
  transport.bpm.value = 120
  transport.start()
}

function initDrum() {
  const sampler = new Tone.Sampler({
    urls: {
      C2: 'BT7A0D0.WAV',
      D2: 'ST0T3S7.WAV'
    },
    baseUrl: 'roland_tr_909/'
  }).toDestination()

  const freeverbNode = new Tone.Freeverb(drumsFreeverbSettings).toDestination()
  sampler.connect(freeverbNode)

  const part = new Tone.Part((time, note) => {
    sampler.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, drumSamplerSequence).start(0)

  part.loopEnd = '2m'
  part.loop = true
}

function initEchoDrum() {
  const sampler = new Tone.Sampler({
    urls: {
      C2: 'HHOD6.WAV'
    },
    baseUrl: 'roland_tr_909/'
  }).toDestination()

  const pingPongDelayNode = new Tone.PingPongDelay(
    echoDrumFeedbackDelaySettings
  ).toDestination()

  const freeverbNode = new Tone.Freeverb(
    echoDrumFreeverbSettings
  ).toDestination()

  sampler.chain(pingPongDelayNode, freeverbNode)

  const part = new Tone.Part((time, note) => {
    sampler.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, echoDrumSamplerSequence).start(0)

  part.loopEnd = '2m'
  part.loop = true
}

function initBassSynth() {
  const synthNode = new Tone.PolySynth(bassSynthSettings).toDestination()

  const part = new Tone.Part((time, note) => {
    synthNode.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, bassSynthSequence).start(0)

  part.loopEnd = '2m'
  part.loop = true
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton')

  startButton.addEventListener('click', () => {
    initWebAudio()
    initTransport()
    initDrum()
    initEchoDrum()
    initBassSynth()
  })
})
