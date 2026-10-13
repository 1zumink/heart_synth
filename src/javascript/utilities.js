import * as Tone from 'tone'

// Монофонические синты Tone.js падают с ошибкой «Start time must be strictly
// greater than previous start time», если два старта попадают в одно время
// (две клавиши в один кадр, быстрые повторные нажатия). Часы возвращают время
// не раньше запрошенного и строго позже предыдущего занятого
export function createClock(minGap = 0.005) {
  let last = 0

  return (time = Tone.now(), duration = 0) => {
    const next = Math.max(time, last + minGap)
    last = next + duration
    return next
  }
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

// x от 0 до 1 → значение между min и max по логарифмической шкале (для частот)
export function expScale(x, min, max) {
  return min * Math.pow(max / min, x)
}

export function expUnscale(value, min, max) {
  return Math.log(value / min) / Math.log(max / min)
}

// целое случайное от min до max включительно
export function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)]
}

// Паттерн бита строкой по 16 шагов на такт: 'x...o...x...o...'
// x — громкий удар, o — тихий, . — пауза; пробелы для читаемости игнорируются.
// Возвращает события для Tone.Part: { time: 'такт:доля:16-я', noteName, velocity }.
// barOffset сдвигает паттерн на нужный такт
export function patternToEvents(
  pattern,
  noteName,
  velocities = { x: 1, o: 0.45 },
  barOffset = 0
) {
  return pattern
    .replace(/\s/g, '')
    .split('')
    .flatMap((symbol, step) => {
      if (!(symbol in velocities)) return []

      const bar = barOffset + Math.floor(step / 16)
      const beat = Math.floor((step % 16) / 4)
      const sixteenth = step % 4

      return [
        {
          time: `${bar}:${beat}:${sixteenth}`,
          noteName,
          velocity: velocities[symbol]
        }
      ]
    })
}

// Эмоции включаются и выключаются не сразу, а с ближайшей восьмой — так они
// всегда попадают в бит и не заставляют долго ждать.
// Строку '@8n' Tone тут использовать нельзя: она берёт время AudioContext
// и переводит его в такты по текущему темпу. Это верно, только если
// транспорт стартовал в 0 и темп не менялся, — иначе через несколько минут
// включение «уезжает» на секунды. Поэтому считаем точный тик сами
export function nextBeatTicks(subdivision = '8n') {
  const transport = Tone.getTransport()
  const time = transport.nextSubdivision(subdivision)

  return Math.round(transport.getTicksAtTime(time))
}

// ближайшая доля как время транспорта в тиках, например '6144i'
export function nextBeat(subdivision = '8n') {
  return `${nextBeatTicks(subdivision)}i`
}

// выполнить в момент ближайшей доли; в колбэк приходит точное время
export function atNextBeat(callback, subdivision = '8n') {
  Tone.getTransport().scheduleOnce(callback, nextBeat(subdivision))
}
