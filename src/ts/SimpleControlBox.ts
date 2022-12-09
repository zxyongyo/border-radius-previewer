import AdjustableBox, { MovableHandles, MovalbeElements, State } from "./AdjustableBox";
import Movable from "./Movable";

export class SimpleControlBox extends AdjustableBox {
  
  initState(state: State) {
    const defaultState = {
      top: 30,
      right: 30,
      bottom: 30,
      left: 30,
      width: this.box.offsetWidth.toFixed(0),
      height: this.box.offsetHeight.toFixed(0)
    }
    this.state = Object.assign(defaultState, state)
  }

  initHandles(movalbeElements: MovalbeElements): MovableHandles {
    return {
      top: new Movable(movalbeElements.top, this.updateState.bind(this), 'x', this.state.top, this.saveStateAsUrlHash.bind(this)),
      right: new Movable(movalbeElements.right, this.updateState.bind(this), 'y', this.state.right, this.saveStateAsUrlHash.bind(this)),
      bottom: new Movable(movalbeElements.bottom, this.updateState.bind(this), 'x', this.state.bottom, this.saveStateAsUrlHash.bind(this)),
      left: new Movable(movalbeElements.left, this.updateState.bind(this), 'y', this.state.left, this.saveStateAsUrlHash.bind(this))
    }
  }

  updateBorderRadius() {
    const {top, right, bottom, left} = this.state
    const borderRadius = top + '% '
      + (100 - top) + '% '
      + (100 - bottom) + '% '
      + bottom + '% / '
      + left + '% '
      + right + '% '
      + (100 - right) + '% '
      + (100 - left) + '%'
    
    this.shape.style.borderRadius = borderRadius
    this.codeEle.innerText = borderRadius
  }

  saveStateAsUrlHash() {
    const {top, right, bottom, left, width, height} = this.state
    const hash = `#${top}.${right}.${bottom}.${left}--${width}.${height}`
    this.setHash(hash)
  }

}