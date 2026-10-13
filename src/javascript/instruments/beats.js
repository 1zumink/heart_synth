import * as Tone from 'tone'
import { patternToEvents } from '../utilities.js'
import { mixer } from '../mixer.js'
import closedHatUrl from '../../samples/HHCD2.WAV'
import openHatUrl from '../../samples/HHOD4.WAV'
import rimUrl from '../../samples/RIM127.WAV'
import clapUrl from '../../samples/HANDCLP1.WAV'

// БИТ-ДОРОЖКА — играет сама. Биты Сердца — живое тёплое «тук-тук»,
// биты Разума — ровная драм-машина TR-909

export const heartBeats = {
  synth: {
    volume: 0,
    pitchDecay: 0.06,
    octaves: 5,
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.001,
      decay: 0.5,
      sustain: 0,
      release: 0.6
    },
    node: null
  },
  filter: {
    type: 'lowpass',
    frequency: 900,
    rolloff: -24,
    Q: 1,
    node: null
  },
  jcReverb: {
    wet: 0.2,
    roomSize: 0.4,
    node: null
  },
  channel: {
    volume: -9,
    pan: 0.15,
    mute: false,
    solo: false,
    node: null
  },
  noteName: 'A1',
  part: {
    loop: '1m',
    node: null
  }
}

export const mindBeats = {
  sampler: {
    volume: 0,
    urls: {
      C3: closedHatUrl,
      D3: openHatUrl,
      E3: rimUrl,
      F3: clapUrl
    },
    node: null
  },
  filter: {
    type: 'highpass',
    frequency: 250,
    rolloff: -12,
    node: null
  },
  feedbackDelay: {
    wet: 0.15,
    delayTime: '16n',
    maxDelay: 1,
    feedback: 0.2,
    node: null
  },
  channel: {
    volume: -9,
    pan: -0.15,
    mute: false,
    solo: false,
    node: null
  },
  notes: {
    closedHat: 'C3',
    openHat: 'D3',
    rim: 'E3',
    clap: 'F3'
  },
  part: {
    loop: '1m',
    node: null
  }
}

export const beats = {
  // в начале всё выключено — бит включается кнопкой «Играть» или Enter
  playing: false,
  presetIndex: 0,
  bpm: {
    value: 80,
    min: 60,
    max: 120
  },
  // пределы бегунка громкости бита, дБ (сама громкость — в mixer.beatBus)
  volume: {
    min: -40,
    max: 6
  },
  presets: [
    {
      title: 'Спокойствие',
      heart: 'x.o. .... x.o. ....',
      closedHat: '..o. ..o. ..o. ..o.',
      openHat: '.... .... .... ..o.',
      rim: '.... .... .... ....',
      clap: '.... .... .... ....'
    },
    {
      title: 'Волнение',
      heart: 'x.o. ..o. x.o. .o..',
      closedHat: 'xoxo xoxo xoxo xoxo',
      openHat: '.... ..o. .... ..o.',
      rim: '.... .... ..o. ....',
      clap: '.... x... .... x...'
    },
    {
      title: 'Ясность',
      heart: 'x.o. x... x.o. x...',
      closedHat: 'x.x. x.x. x.x. x.x.',
      openHat: '.... .... .... ....',
      rim: '.... x... .... x...',
      clap: '.... .... .... ....'
    }
  ]
}

function heartEvents(preset) {
  return patternToEvents(preset.heart, heartBeats.noteName)
}

function mindEvents(preset) {
  return Object.entries(mindBeats.notes).flatMap(([name, noteName]) =>
    patternToEvents(preset[name], noteName)
  )
}

export function initBeats(output) {
  heartBeats.synth.node = new Tone.MembraneSynth(heartBeats.synth)
  heartBeats.filter.node = new Tone.Filter(heartBeats.filter)
  heartBeats.jcReverb.node = new Tone.JCReverb(heartBeats.jcReverb)
  heartBeats.channel.node = new Tone.Channel(heartBeats.channel).connect(output)

  heartBeats.synth.node.chain(
    heartBeats.filter.node,
    heartBeats.jcReverb.node,
    heartBeats.channel.node
  )

  mindBeats.sampler.node = new Tone.Sampler(mindBeats.sampler)
  mindBeats.filter.node = new Tone.Filter(mindBeats.filter)
  mindBeats.feedbackDelay.node = new Tone.FeedbackDelay(mindBeats.feedbackDelay)
  mindBeats.channel.node = new Tone.Channel(mindBeats.channel).connect(output)

  mindBeats.sampler.node.chain(
    mindBeats.filter.node,
    mindBeats.feedbackDelay.node,
    mindBeats.channel.node
  )

  const preset = beats.presets[beats.presetIndex]

  heartBeats.part.node = new Tone.Part((time, note) => {
    heartBeats.synth.node.triggerAttackRelease(
      note.noteName,
      '8n',
      time,
      note.velocity
    )
  }, heartEvents(preset)).start(0)

  heartBeats.part.node.loopEnd = heartBeats.part.loop
  heartBeats.part.node.loop = true

  mindBeats.part.node = new Tone.Part((time, note) => {
    mindBeats.sampler.node.triggerAttack(note.noteName, time, note.velocity)
  }, mindEvents(preset)).start(0)

  mindBeats.part.node.loopEnd = mindBeats.part.loop
  mindBeats.part.node.loop = true

  heartBeats.part.node.mute = !beats.playing
  mindBeats.part.node.mute = !beats.playing
}

function setPreset(index) {
  const preset = beats.presets[index]
  beats.presetIndex = index

  heartBeats.part.node.clear()
  heartEvents(preset).forEach((note) => heartBeats.part.node.add(note))

  mindBeats.part.node.clear()
  mindEvents(preset).forEach((note) => mindBeats.part.node.add(note))
}

// части не останавливаем, а глушим — так бит возвращается ровно в такт
function setPlaying(playing) {
  beats.playing = playing
  heartBeats.part.node.mute = !playing
  mindBeats.part.node.mute = !playing
}

export function initBeatsUI() {
  const toggleButton = document.getElementById('beatToggle')

  function toggle() {
    setPlaying(!beats.playing)
    toggleButton.innerText = beats.playing ? 'Стоп' : 'Играть'
    toggleButton.classList.toggle('active', beats.playing)
  }

  toggleButton.innerText = beats.playing ? 'Стоп' : 'Играть'
  toggleButton.classList.toggle('active', beats.playing)
  toggleButton.addEventListener('click', toggle)

  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Enter' || e.repeat) return
    e.preventDefault()
    toggle()
  })

  const presetsContainer = document.getElementById('beatPresets')

  beats.presets.forEach((preset, index) => {
    const button = document.createElement('div')
    button.className = 'ToggleButton'
    button.innerText = preset.title

    if (index === beats.presetIndex) button.classList.add('active')

    button.addEventListener('click', () => {
      setPreset(index)

      presetsContainer.querySelectorAll('.ToggleButton').forEach((b) => {
        b.classList.remove('active')
      })

      button.classList.add('active')
    })

    presetsContainer.appendChild(button)
  })

  const tempoSlider = document.getElementById('beatTempo')
  const tempoValue = document.getElementById('beatTempoValue')

  tempoSlider.min = beats.bpm.min
  tempoSlider.max = beats.bpm.max
  tempoSlider.value = beats.bpm.value
  tempoValue.innerText = beats.bpm.value

  tempoSlider.addEventListener('input', (e) => {
    const bpm = Number(e.target.value)
    Tone.getTransport().bpm.rampTo(bpm, 0.2)
    tempoValue.innerText = bpm
  })

  const volumeSlider = document.getElementById('beatVolume')
  const volumeValue = document.getElementById('beatVolumeValue')

  function setVolume(volume) {
    mixer.beatBus.node.volume.rampTo(volume, 0.05)
    volumeValue.innerText = volume
  }

  volumeSlider.min = beats.volume.min
  volumeSlider.max = beats.volume.max
  volumeSlider.value = mixer.beatBus.volume
  volumeValue.innerText = mixer.beatBus.volume

  volumeSlider.addEventListener('input', (e) => setVolume(Number(e.target.value)))

  // двойной клик — громкость по умолчанию
  volumeSlider.addEventListener('dblclick', () => {
    volumeSlider.value = mixer.beatBus.volume
    setVolume(mixer.beatBus.volume)
  })
}
