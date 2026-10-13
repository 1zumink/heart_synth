const drums = {
  tremolo: {
    wet: 0.5,
    frequency: 100,
    type: 'square',
    depth: 0.9,
    spread: 100
  },
  jcReverb: {
    wet: 0.1,
    roomSize: 0.05
  },
  channel: {
    volume: -24,
    pan: 0,
    mute: false,
    solo: false
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

const bassLow = {
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
  channel: {
    volume: -24,
    pan: 0,
    mute: false,
    solo: false
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

const bassHigh = {
  synth: {
    volume: 1,
    detune: 0,
    portamento: 0.01,
    harmonicity: 0.5,
    modulationIndex: 4,
    modulation: {
      type: 'square',
      modulationType: 'triangle',
      phase: 0,
      harmonicity: 0
    },
    modulationEnvelope: {
      attack: 0.5,
      attackCurve: 'exponential',
      decay: 0.8,
      decayCurve: 'exponential',
      sustain: 0.3,
      release: 0.1,
      releaseCurve: 'exponential'
    },
    oscillator: {
      type: 'triangle',
      modulationType: 'sawtooth',
      phase: 0,
      harmonicity: 0
    },
    envelope: {
      attack: 0.1,
      attackCurve: 'exponential',
      decay: 0.9,
      decayCurve: 'exponential',
      sustain: 0.9,
      release: 0.7,
      releaseCurve: 'exponential'
    }
  },
  stereoWidener: {
    wet: 0.8,
    width: 0.9
  },
  jcReverb: {
    wet: 0.4,
    roomSize: 0.1
  },
  channel: {
    volume: -8,
    pan: 0,
    mute: false,
    solo: false
  },
  sequence: [
    {
      time: '1:2:2',
      noteName: 'D2',
      duration: '4n',
      velocity: 1
    },
    {
      time: '1:3:0',
      noteName: 'F2',
      duration: '4n',
      velocity: 1
    },
    {
      time: '1:3:2',
      noteName: 'G2',
      duration: '4n',
      velocity: 1
    },
    {
      time: '3:2:2',
      noteName: 'C3',
      duration: '4n',
      velocity: 1
    },
    {
      time: '3:3:2',
      noteName: 'A2',
      duration: '4n',
      velocity: 1
    },
    {
      time: '6:2:2',
      noteName: 'F2',
      duration: '4n',
      velocity: 1
    },
    {
      time: '6:3:0',
      noteName: 'A2',
      duration: '4n',
      velocity: 1
    },
    {
      time: '6:3:2',
      noteName: 'F2',
      duration: '4n',
      velocity: 1
    },
    {
      time: '7:0:0',
      noteName: 'G2',
      duration: '4n',
      velocity: 1
    }
  ],
  loop: '8m'
}

const rythm = {
  synth: {
    volume: 0.8,
    detune: 4,
    portamento: 0.01,
    harmonicity: 0,
    modulation: {
      type: 'triangle',
      phase: 0,
      harmonicity: 0
    },
    modulationEnvelope: {
      attack: 0.01,
      attackCurve: 'exponential',
      decay: 0.9,
      decayCurve: 'exponential',
      sustain: 0.8,
      release: 0.01,
      releaseCurve: 'exponential'
    },
    oscillator: {
      type: 'sawtooth',
      modulationType: 'sine',
      phase: 0,
      harmonicity: 0
    },
    envelope: {
      attack: 0.01,
      attackCurve: 'exponential',
      decay: 0.9,
      decayCurve: 'exponential',
      sustain: 0.1,
      release: 0.9,
      releaseCurve: 'exponential'
    }
  },
  autoFilter: {
    wet: 1,
    frequency: '1m',
    type: 'sine',
    depth: 0.8,
    baseFrequency: 200,
    octaves: 3.0,
    filter: {
      type: 'lowpass',
      rolloff: -12
    }
  },
  pingPongDelay: {
    wet: 0.2,
    delayTime: 0.25,
    maxDelayTime: 1
  },
  jcReverb: {
    wet: 0.4,
    roomSize: 0.1
  },
  channel: {
    volume: -20,
    pan: 0,
    mute: false,
    solo: false
  },
  sequence: [
    {
      time: '0:1:0',
      noteName: 'A6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:0:0',
      noteName: 'A6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:1:2',
      noteName: 'C6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:0:1',
      noteName: 'F6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:0:2',
      noteName: 'C6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:0:3',
      noteName: 'F6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:1:3',
      noteName: 'F6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:2:1',
      noteName: 'C6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:2:3',
      noteName: 'F6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '0:3:2',
      noteName: 'A6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '1:0:1',
      noteName: 'C6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '1:0:0',
      noteName: 'A#5',
      duration: '16n',
      velocity: 1
    },
    {
      time: '1:0:3',
      noteName: 'F6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '1:1:1',
      noteName: 'A6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '1:3:1',
      noteName: 'F6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '1:3:3',
      noteName: 'A6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '1:2:3',
      noteName: 'C6',
      duration: '16n',
      velocity: 1
    },
    {
      time: '1:1:3',
      noteName: 'F6',
      duration: '16n',
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
  })

  const tremolo = new Tone.Tremolo(drums.tremolo).start()
  const jcReverb = new Tone.JCReverb(drums.jcReverb)
  const channel = new Tone.Channel(drums.channel).toDestination()
  sampler.chain(tremolo, jcReverb, channel)

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

function initBassLow() {
  const synth = new Tone.PolySynth(bassLow.synth)
  const tremolo = new Tone.Tremolo(bassLow.tremolo).start()
  const channel = new Tone.Channel(bassLow.channel).toDestination()
  synth.chain(tremolo, channel)

  const part = new Tone.Part((time, note) => {
    synth.triggerAttackRelease(
      [note.noteName, note.noteName, note.noteName],
      note.duration,
      time,
      note.velocity
    )
  }, bassLow.sequence).start('1:0:0')

  part.loopEnd = bassLow.loop
  part.loop = true
}

function initBassHigh() {
  const synth = new Tone.FMSynth(bassHigh.synth)
  const stereoWidener = new Tone.StereoWidener(bassHigh.stereoWidener)
  const jcReverb = new Tone.JCReverb(bassHigh.jcReverb)
  const channel = new Tone.Channel(bassHigh.channel).toDestination()
  synth.chain(stereoWidener, jcReverb, channel)

  const part = new Tone.Part((time, note) => {
    synth.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, bassHigh.sequence).start('2:0:0')

  part.loopEnd = bassHigh.loop
  part.loop = true
}

function initRythm() {
  const synth = new Tone.AMSynth(rythm.synth)
  const autoFilter = new Tone.AutoFilter(rythm.autoFilter).start()
  const pingPongDelay = new Tone.PingPongDelay(rythm.pingPongDelay)
  const jcReverb = new Tone.JCReverb(rythm.jcReverb)
  const channel = new Tone.Channel(rythm.channel).toDestination()
  synth.chain(autoFilter, pingPongDelay, jcReverb, channel)

  const part = new Tone.Part((time, note) => {
    synth.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, rythm.sequence).start('16:0:0')

  part.loopEnd = rythm.loop
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
    initBassLow()
    initBassHigh()
    initRythm()
    initTransport()
  })
})
