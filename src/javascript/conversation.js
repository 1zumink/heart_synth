import * as Tone from 'tone'
import { mixer } from './mixer.js'

// РАЗГОВОР — фон мягко подсвечивается цветом того, кто сейчас говорит

export const conversation = {
  // во сколько раз усилить уровень шины для яркости подсветки
  glowGain: 4
}

export function initConversationUI() {
  function update() {
    const heartLevel = Tone.dbToGain(mixer.heartMeter.node.getValue())
    const mindLevel = Tone.dbToGain(mixer.mindMeter.node.getValue())

    document.body.style.setProperty(
      '--heartGlow',
      Math.min(1, heartLevel * conversation.glowGain).toFixed(3)
    )
    document.body.style.setProperty(
      '--mindGlow',
      Math.min(1, mindLevel * conversation.glowGain).toFixed(3)
    )

    requestAnimationFrame(update)
  }

  update()
}
