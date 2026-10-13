import * as Tone from 'tone'
import { initMixer, mixer, startSilence, stopSilence } from './mixer.js'
import { initKeyboard, initPadsUI } from './keyboard.js'
import { initConversationUI } from './conversation.js'
import { initSequencer, initSequencerUI } from './sequencer.js'
import { initEffectsUI } from './effects.js'
import { initHeart } from './instruments/heart.js'
import { initMind } from './instruments/mind.js'
import {
  heartbeat,
  initHeartbeat,
  startHeartbeat,
  stopHeartbeat,
  setHeartbeatPitch
} from './instruments/heartbeat.js'
import {
  hope,
  initHope,
  startHope,
  stopHope,
  setHopePitch
} from './instruments/hope.js'
import {
  passion,
  initPassion,
  startPassion,
  stopPassion,
  setPassionPitch
} from './instruments/passion.js'
import {
  memory,
  initMemory,
  startMemory,
  stopMemory,
  setMemoryPitch
} from './instruments/memory.js'
import {
  doubt,
  initDoubt,
  startDoubt,
  stopDoubt,
  setDoubtPitch
} from './instruments/doubt.js'
import {
  anxiety,
  initAnxiety,
  startAnxiety,
  stopAnxiety,
  setAnxietyPitch
} from './instruments/anxiety.js'
import {
  logic,
  initLogic,
  startLogic,
  stopLogic,
  setLogicPitch
} from './instruments/logic.js'
import { beats, initBeats, initBeatsUI } from './instruments/beats.js'

const pads = [
  {
    code: 'KeyA',
    label: 'A',
    side: 'heart',
    title: 'Сердцебиение',
    hint: '«тук-тук» на каждую долю',
    start: startHeartbeat,
    stop: stopHeartbeat,
    instrument: heartbeat,
    setPitch: setHeartbeatPitch
  },
  {
    code: 'KeyS',
    label: 'S',
    side: 'heart',
    title: 'Надежда',
    hint: 'суперсоу-аккорд, тянется',
    start: startHope,
    stop: stopHope,
    instrument: hope,
    setPitch: setHopePitch
  },
  {
    code: 'KeyD',
    label: 'D',
    side: 'heart',
    title: 'Страсть',
    hint: 'визжащий лид, новая нота на долю',
    start: startPassion,
    stop: stopPassion,
    instrument: passion,
    setPitch: setPassionPitch
  },
  {
    code: 'KeyF',
    label: 'F',
    side: 'heart',
    title: 'Память',
    hint: 'эхо последних нот сердца восьмыми',
    start: startMemory,
    stop: stopMemory,
    instrument: memory,
    setPitch: setMemoryPitch
  },
  {
    code: 'KeyG',
    label: 'G',
    side: 'mind',
    title: 'Сомнение',
    hint: 'тянется и колеблется',
    start: startDoubt,
    stop: stopDoubt,
    instrument: doubt,
    setPitch: setDoubtPitch
  },
  {
    code: 'KeyH',
    label: 'H',
    side: 'mind',
    title: 'Тревога',
    hint: 'дрожь нарастает',
    start: startAnxiety,
    stop: stopAnxiety,
    instrument: anxiety,
    setPitch: setAnxietyPitch
  },
  {
    code: 'KeyJ',
    label: 'J',
    side: 'mind',
    title: 'Логика',
    hint: 'ровный расчёт шестнадцатыми',
    start: startLogic,
    stop: stopLogic,
    instrument: logic,
    setPitch: setLogicPitch
  },
  {
    code: 'Space',
    label: 'Пробел',
    side: 'neutral',
    title: 'Тишина',
    hint: 'всё стихает, кроме сердцебиения',
    start: startSilence,
    stop: stopSilence
  }
]

// WEB AUDIO AND TONE STUFF

// темп задаём до создания эффектов: их задержки вида '8n.' считаются от него
function initTempo() {
  Tone.getTransport().bpm.value = beats.bpm.value
}

function startTransport() {
  Tone.getTransport().start()
}

function initInstruments() {
  initHeart(mixer.heartBus.node)
  initHope(mixer.heartBus.node)
  initPassion(mixer.heartBus.node)
  initMemory(mixer.heartBus.node)

  initMind(mixer.mindBus.node)
  initDoubt(mixer.mindBus.node)
  initAnxiety(mixer.mindBus.node)
  initLogic(mixer.mindBus.node)

  initHeartbeat(mixer.master.node)

  initBeats(mixer.beatBus.node)
  initSequencer()
}

// UI

function initUI() {
  initSequencerUI()
  initEffectsUI()
  initPadsUI('pads', pads)
  initBeatsUI()
  initConversationUI()
  initKeyboard()
}

// Браузер разрешает звук только после действия пользователя, поэтому
// запускаем его по первому клику или клавише — тем же нажатием, которое
// что-то включает. Слушаем на погружении (capture), чтобы звук и транспорт
// успели запуститься раньше, чем сработает сама кнопка
function initAudioUnlock() {
  let unlocked = false

  function unlock() {
    if (unlocked) return
    unlocked = true

    Tone.start()
    startTransport()

    document.removeEventListener('pointerdown', unlock, true)
    document.removeEventListener('keydown', unlock, true)
  }

  document.addEventListener('pointerdown', unlock, true)
  document.addEventListener('keydown', unlock, true)
}

export function initSketch() {
  initTempo()
  initMixer()
  initInstruments()
  initUI()
  initAudioUnlock()
}
