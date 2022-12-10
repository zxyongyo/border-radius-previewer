import '../style/main.scss'
import AdjustableBox from './AdjustableBox'
import { FullControlBox } from './FullControlBox'

const movables = {
  topX: document.getElementById('topX')!,
  rightY: document.getElementById('rightY')!,
  bottomX: document.getElementById('bottomX')!,
  leftY: document.getElementById('leftY')!,
  topY: document.getElementById('topY')!,
  rightX: document.getElementById('rightX')!,
  bottomY: document.getElementById('bottomY')!,
  leftX: document.getElementById('leftX')!
}

const initState = AdjustableBox.generateInitStateFromUrlHash(window.location.hash)

new FullControlBox({
  moveableElems: movables,
  state: initState
})
