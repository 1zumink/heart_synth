// const tonejsWaveTypes = [
//   // Базовые типы
//   'sine',
//   'triangle',
//   'sawtooth',
//   'square',

//   // Модуляционные типы
//   'pwm',
//   'pulse',

//   // Жирные волны (унисон / детюн)
//   'fatsine',
//   'fattriangle',
//   'fatsawtooth',
//   'fatsquare',

//   // Частотная модуляция (FM)
//   'fmsine',
//   'fmtriangle',
//   'fmsawtooth',
//   'fmsquare',

//   // Амплитудная модуляция (AM)
//   'amsine',
//   'amtriangle',
//   'amsawtooth',
//   'amsquare'
// ]

const drums = {
  sampler: {
    urls: {
      C2: 'BT7A0D0.WAV',
      D2: 'ST0T3S7.WAV'
    },
    baseUrl: 'roland_tr_909/',
    node: null
  },
  tremolo: {
    wet: 0.5,
    frequency: 100,
    type: 'square',
    depth: 0.9,
    spread: 100,
    node: null
  },
  jcReverb: {
    wet: 0.1,
    roomSize: 0.05,
    node: null
  },
  channel: {
    volume: -24,
    pan: 0,
    mute: false,
    solo: false,
    node: null
  },
  sequence: {
    parts: [
      [
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
      [
        {
          time: '0:0:0',
          noteName: 'C2',
          duration: '2n',
          velocity: 1
        },
        {
          time: '0:0:2',
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
        },
        {
          time: '1:3:2',
          noteName: 'D2',
          duration: '2n',
          velocity: 1
        }
      ]
    ],
    loop: '2m',
    node: null
  }
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
    },
    node: null
  },
  tremolo: {
    wet: 1,
    frequency: 30,
    type: 'square',
    depth: 0.9,
    spread: 100,
    node: null
  },
  channel: {
    volume: -24,
    pan: 0,
    mute: false,
    solo: false,
    node: null
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

const bassMid = {
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
    },
    node: null
  },
  stereoWidener: {
    wet: 0.8,
    width: 0.9,
    node: null
  },
  jcReverb: {
    wet: 0.4,
    roomSize: 0.1,
    node: null
  },
  channel: {
    volume: -8,
    pan: 0,
    mute: false,
    solo: false,
    node: null
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

const bassHigh = {
  synth: {
    volume: 1,
    detune: 0,
    portamento: 0.01,
    harmonicity: 0.5,
    modulationIndex: 4,
    modulation: {
      type: 'triangle',
      modulationType: 'square',
      phase: 100,
      harmonicity: 100
    },
    modulationEnvelope: {
      attack: 0.9,
      attackCurve: 'linear',
      decay: 0.4,
      decayCurve: 'linear',
      sustain: 0.2,
      release: 0.01,
      releaseCurve: 'linear'
    },
    oscillator: {
      type: 'triangle',
      modulationType: 'sawtooth',
      phase: 0,
      harmonicity: 0
    },
    envelope: {
      attack: 0.9,
      attackCurve: 'linear',
      decay: 0.4,
      decayCurve: 'linear',
      sustain: 0.1,
      release: 0.4,
      releaseCurve: 'linear'
    },
    node: null
  },
  vibrato: {
    wet: 0.6,
    maxDelay: 0.005,
    frequency: 5,
    depth: 0.1,
    type: 'sine',
    node: null
  },
  jcReverb: {
    wet: 0.4,
    roomSize: 0.1,
    node: null
  },
  channel: {
    volume: -24,
    pan: 0,
    mute: false,
    solo: false,
    node: null
  },
  sequence: [
    {
      time: '0:0:0',
      noteName: ['C4', 'E4', 'A4'],
      duration: '2n',
      velocity: 1
    },
    {
      time: '3:0:0',
      noteName: ['E4', 'G4'],
      duration: '4n',
      velocity: 1
    },
    {
      time: '4:0:0',
      noteName: ['C4', 'E4', 'A4'],
      duration: '2n',
      velocity: 1
    }
  ],
  loop: '8m'
}

const highVoice = {
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
    },
    node: null
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
    },
    node: null
  },
  pingPongDelay: {
    wet: 0.2,
    delayTime: 0.25,
    maxDelayTime: 1,
    node: null
  },
  jcReverb: {
    wet: 0.4,
    roomSize: 0.1,
    node: null
  },
  channel: {
    volume: -20,
    pan: 0,
    mute: false,
    solo: false,
    node: null
  },
  sequence: {
    part: [
      {
        time: '0:0:0',
        noteName: 'A6',
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
        time: '0:1:0',
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
        time: '1:0:0',
        noteName: 'A#5',
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
        time: '1:1:3',
        noteName: 'F6',
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
      }
    ],
    loop: '2m',
    node: null
  }
}

const highVoiceNotes = highVoice.sequence.part.map((s) => s.noteName)

// DRUMS

function initDrums() {
  drums.sampler.node = new Tone.Sampler(drums.sampler)
  drums.tremolo.node = new Tone.Tremolo(drums.tremolo).start()
  drums.jcReverb.node = new Tone.JCReverb(drums.jcReverb)
  drums.channel.node = new Tone.Channel(drums.channel).toDestination()

  drums.sampler.node.chain(
    drums.tremolo.node,
    drums.jcReverb.node,
    drums.channel.node
  )

  drums.sequence.node = new Tone.Part((time, note) => {
    drums.sampler.node.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, drums.sequence.parts[0]).start(0)

  drums.sequence.node.loopEnd = drums.sequence.loop
  drums.sequence.node.loop = true
}

function initDrumsUI() {
  const typeButtonSet = document
    .getElementById('drumsSequencePresets')
    .querySelectorAll('.ToggleButton')

  typeButtonSet.forEach((button, index) => {
    button.addEventListener('click', () => {
      drums.sequence.node.clear()

      drums.sequence.parts[index].forEach((note) => {
        drums.sequence.node.add(note)
      })

      typeButtonSet.forEach((b) => {
        b.classList.remove('active')
      })

      button.classList.toggle('active')
    })
  })

  const channelVolumeSlider = document.getElementById('drumsChannelVolume')
  channelVolumeSlider.value = drums.channel.volume

  channelVolumeSlider.addEventListener('input', (e) => {
    drums.channel.node.volume.value = e.target.value
    console.log('drumsChannelVolume', e.target.value)
  })

  const muteButton = document.getElementById('drumsChannelMute')

  muteButton.addEventListener('click', () => {
    drums.channel.node.mute = !drums.channel.node.mute
    muteButton.classList.toggle('active')
  })
}

// BASS LOW

function initBassLow() {
  bassLow.synth.node = new Tone.PolySynth(bassLow.synth)
  bassLow.tremolo.node = new Tone.Tremolo(bassLow.tremolo).start()
  bassLow.channel.node = new Tone.Channel(bassLow.channel).toDestination()
  bassLow.synth.node.chain(bassLow.tremolo.node, bassLow.channel.node)

  const part = new Tone.Part((time, note) => {
    bassLow.synth.node.triggerAttackRelease(
      [note.noteName, note.noteName, note.noteName],
      note.duration,
      time,
      note.velocity
    )
  }, bassLow.sequence).start(0)

  part.loopEnd = bassLow.loop
  part.loop = true
}

function initBassLowUI() {
  const synthOscTypeSelect = document.getElementById('synthOscTypeSelect')
  const selectInput = synthOscTypeSelect.querySelector('div.input')
  const selectOptions = synthOscTypeSelect.querySelectorAll('div.option')

  selectInput.addEventListener('click', () => {
    synthOscTypeSelect.classList.toggle('active')
  })

  selectOptions.forEach((option) => {
    option.addEventListener('click', () => {
      synthOscTypeSelect.classList.toggle('active')
      selectInput.innerText = option.innerText

      bassLow.synth.node.set({
        oscillator: {
          type: option.innerText.toLowerCase()
        }
      })
    })
  })

  const channelVolumeSlider = document.getElementById('bassLowChannelVolume')
  channelVolumeSlider.value = bassLow.channel.volume

  channelVolumeSlider.addEventListener('input', (e) => {
    bassLow.channel.node.volume.value = e.target.value
    console.log('bassHighChannelVolume', e.target.value)
  })

  const muteButton = document.getElementById('bassLowChannelMute')

  muteButton.addEventListener('click', () => {
    bassLow.channel.node.mute = !bassLow.channel.node.mute
    muteButton.classList.toggle('active')
  })
}

// BASS MID

function initBassMid() {
  bassMid.synth.node = new Tone.FMSynth(bassMid.synth)
  bassMid.stereoWidener.node = new Tone.StereoWidener(bassMid.stereoWidener)
  bassMid.jcReverb.node = new Tone.JCReverb(bassMid.jcReverb)
  bassMid.channel.node = new Tone.Channel(bassMid.channel).toDestination()

  bassMid.synth.node.chain(
    bassMid.stereoWidener.node,
    bassMid.jcReverb.node,
    bassMid.channel.node
  )

  const part = new Tone.Part((time, note) => {
    bassMid.synth.node.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, bassMid.sequence).start(0)

  part.loopEnd = bassMid.loop
  part.loop = true
}

function initBassMidUI() {
  const channelVolumeSlider = document.getElementById('bassMidChannelVolume')
  channelVolumeSlider.value = bassMid.channel.volume

  channelVolumeSlider.addEventListener('input', (e) => {
    bassMid.channel.node.volume.value = e.target.value
    console.log('bassHighChannelVolume', e.target.value)
  })

  const muteButton = document.getElementById('bassMidChannelMute')

  muteButton.addEventListener('click', () => {
    bassMid.channel.node.mute = !bassMid.channel.node.mute
    muteButton.classList.toggle('active')
  })
}

// BASS HIGH

function initBassHigh() {
  bassHigh.synth.node = new Tone.PolySynth(Tone.FMSynth, bassHigh.synth)
  bassHigh.vibrato.node = new Tone.Vibrato(bassHigh.vibrato)
  bassHigh.jcReverb.node = new Tone.JCReverb(bassHigh.jcReverb)
  bassHigh.channel.node = new Tone.Channel(bassHigh.channel).toDestination()

  bassHigh.synth.node.chain(
    bassHigh.vibrato.node,
    bassHigh.jcReverb.node,
    bassHigh.channel.node
  )

  const part = new Tone.Part((time, note) => {
    bassHigh.synth.node.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, bassHigh.sequence).start(0)

  part.loopEnd = bassHigh.loop
  part.loop = true
}

function initBassHighUI() {
  const channelVolumeSlider = document.getElementById('bassHighChannelVolume')
  channelVolumeSlider.value = bassHigh.channel.volume

  channelVolumeSlider.addEventListener('input', (e) => {
    bassHigh.channel.node.volume.value = e.target.value
    console.log('bassHighChannelVolume', e.target.value)
  })

  const muteButton = document.getElementById('bassHighChannelMute')

  muteButton.addEventListener('click', () => {
    bassHigh.channel.node.mute = !bassHigh.channel.node.mute
    muteButton.classList.toggle('active')
  })
}

// HIGH VOICE

function initHighVoice() {
  highVoice.synth.node = new Tone.AMSynth(highVoice.synth)
  highVoice.autoFilter.node = new Tone.AutoFilter(highVoice.autoFilter).start()
  highVoice.pingPongDelay.node = new Tone.PingPongDelay(highVoice.pingPongDelay)
  highVoice.jcReverb.node = new Tone.JCReverb(highVoice.jcReverb)
  highVoice.channel.node = new Tone.Channel(highVoice.channel).toDestination()

  highVoice.synth.node.chain(
    highVoice.autoFilter.node,
    highVoice.pingPongDelay.node,
    highVoice.jcReverb.node,
    highVoice.channel.node
  )

  highVoice.sequence.node = new Tone.Part((time, note) => {
    highVoice.synth.node.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, highVoice.sequence.part).start(0)

  highVoice.sequence.node.loopEnd = highVoice.sequence.loop
  highVoice.sequence.node.loop = true
}

function initHighVoiceUI() {
  const fxSurface = document.getElementById('fxSurface')
  const fxSurfaceBoudingBox = fxSurface.getBoundingClientRect()
  const { top, left, width, height } = fxSurfaceBoudingBox

  const fxSurfaceThumb = fxSurface.querySelector('.thumb')
  const thumbBoundingBox = fxSurfaceThumb.getBoundingClientRect()

  const pingPongDelayWet = highVoice.pingPongDelay.wet
  const jcReverbWet = highVoice.jcReverb.wet

  const thumbLeft =
    width * 0.01 * ((jcReverbWet / 1) * 100) - thumbBoundingBox.width / 2

  fxSurfaceThumb.style.left = thumbLeft + 'px'

  const thumbBottom =
    height * 0.01 * ((pingPongDelayWet / 1) * 100) - thumbBoundingBox.height / 2

  fxSurfaceThumb.style.bottom = thumbBottom + 'px'

  fxSurfaceThumb.addEventListener('mousedown', () => {
    fxSurface.classList.add('active')
  })

  fxSurface.addEventListener('mousemove', (e) => {
    if (fxSurface.classList.contains('active')) {
      const { pageX, pageY } = e

      const thumbLeft = pageX - left - thumbBoundingBox.width / 2
      const thumbBottom = top + height - pageY - thumbBoundingBox.height / 2

      if (thumbLeft >= 0 && thumbLeft <= width - thumbBoundingBox.height) {
        fxSurfaceThumb.style.left = thumbLeft + 'px'
      }

      if (thumbBottom >= 0 && thumbBottom <= height - thumbBoundingBox.height) {
        fxSurfaceThumb.style.bottom = thumbBottom + 'px'
      }

      const leftValue = thumbLeft / width
      const bottomValue = thumbBottom / height

      if (leftValue >= 0 && leftValue <= 1) {
        highVoice.jcReverb.node.wet.value = leftValue
      }

      if (bottomValue >= 0 && bottomValue <= 1) {
        highVoice.pingPongDelay.node.wet.value = bottomValue
      }
    }
  })

  document.body.addEventListener('mouseup', () => {
    fxSurface.classList.remove('active')
  })

  const channelVolumeSlider = document.getElementById('highVoiceChannelVolume')
  channelVolumeSlider.value = highVoice.channel.volume

  channelVolumeSlider.addEventListener('input', (e) => {
    highVoice.channel.node.volume.value = e.target.value
    console.log('highVoiceChannelVolume', e.target.value)
  })

  const muteButton = document.getElementById('highVoiceChannelMute')

  muteButton.addEventListener('click', () => {
    highVoice.channel.node.mute = !highVoice.channel.node.mute
    muteButton.classList.toggle('active')
  })

  const randomButton = document.getElementById('highVoiceSequenceRandom')

  randomButton.addEventListener('click', () => {
    const newVoiceNotes = shuffle(highVoiceNotes)
    highVoice.sequence.node.clear()

    highVoice.sequence.part.forEach((note, index) => {
      note.noteName = newVoiceNotes[index]
      highVoice.sequence.node.add(note)
    })
  })
}

// WEB AUDIO AND TONE STUFF

function initWebAudio() {
  Tone.start()
}

function initTransport() {
  const transport = Tone.getTransport()
  transport.bpm.value = 112
  transport.start()
}

function initUI() {
  document.body.classList.add('started')
}

// UTILITIES

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    // prettier-ignore
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ]
  }

  return array
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('startButton')

  startButton.addEventListener('click', () => {
    initWebAudio()
    initUI()

    initDrums()
    initDrumsUI()

    initBassLow()
    initBassLowUI()

    initBassMid()
    initBassMidUI()

    initBassHigh()
    initBassHighUI()

    initHighVoice()
    initHighVoiceUI()

    initTransport()
  })
})
