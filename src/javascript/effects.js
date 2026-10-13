import * as Tone from 'tone'
import { createSlider } from './ui/controls.js'

// ОБЩАЯ СТОЙКА ЭФФЕКТОВ — одна на оба голоса и эмоции.
// Искажение → Эхо → Реверб, у каждого свой бегунок силы (wet)

export const effects = {
  distortion: {
    title: 'Искажение',
    wet: 0,
    distortion: 0.6,
    oversample: '2x',
    node: null
  },
  echo: {
    title: 'Эхо',
    wet: 0.2,
    delayTime: '8n.',
    maxDelay: 1,
    feedback: 0.4,
    node: null
  },
  reverb: {
    title: 'Реверб',
    wet: 0.3,
    decay: 4,
    node: null
  }
}

export function initEffects(input, output) {
  effects.distortion.node = new Tone.Distortion(effects.distortion)
  effects.echo.node = new Tone.FeedbackDelay(effects.echo)
  effects.reverb.node = new Tone.Reverb(effects.reverb)

  input.chain(
    effects.distortion.node,
    effects.echo.node,
    effects.reverb.node,
    output
  )
}

export function initEffectsUI() {
  const container = document.getElementById('effects')

  Object.values(effects).forEach((effect) => {
    const slider = createSlider(
      effect.title,
      {
        min: 0,
        max: 1,
        step: 0.01,
        value: effect.wet,
        format: (value) => `${Math.round(value * 100)}%`
      },
      (value) => {
        effect.node.wet.rampTo(value, 0.05)
      }
    )

    slider.classList.add('effect')
    container.appendChild(slider)
  })
}
