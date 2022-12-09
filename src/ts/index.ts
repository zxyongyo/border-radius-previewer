import '../style/main.scss'
import AdjustableBox from './AdjustableBox'
import { SimpleControlBox } from './SimpleControlBox'

const movables = {
  top: document.getElementById('top')!,
  right: document.getElementById('right')!,
  bottom: document.getElementById('bottom')!,
  left: document.getElementById('left')!,
}

const initState = AdjustableBox.generateInitStateFromUrlHash(window.location.hash)

new SimpleControlBox({
  moveableElems: movables,
  state: initState
})
