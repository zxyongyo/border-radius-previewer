import AdjustableBox, { MovableHandles, MovalbeElements, State } from "./AdjustableBox";
import Movable from "./Movable";

export class SimpleControlBox extends AdjustableBox {
  
  initState(state: State) {
    const defaultState = {
      topX: 30,
      rightY: 30,
      bottomX: 30,
      leftY: 30,
      width: this.box.offsetWidth.toFixed(0),
      height: this.box.offsetHeight.toFixed(0)
    }
    this.state = Object.assign(defaultState, state)
  }

  initHandles(movalbeElements: MovalbeElements): MovableHandles {
    return {
      topX: new Movable(movalbeElements.topX!, this.updateState.bind(this), 'x', this.state.topX, this.saveStateAsUrlHash.bind(this)),
      rightY: new Movable(movalbeElements.rightY!, this.updateState.bind(this), 'y', this.state.rightY, this.saveStateAsUrlHash.bind(this)),
      bottomX: new Movable(movalbeElements.bottomX!, this.updateState.bind(this), 'x', this.state.bottomX, this.saveStateAsUrlHash.bind(this)),
      leftY: new Movable(movalbeElements.leftY!, this.updateState.bind(this), 'y', this.state.leftY, this.saveStateAsUrlHash.bind(this))
    }
  }

  updateBorderRadius() {
    const {topX, rightY, bottomX, leftY} = this.state
    const borderRadius = topX + '% '
      + (100 - topX) + '% '
      + (100 - bottomX) + '% '
      + bottomX + '% / '
      + leftY + '% '
      + rightY + '% '
      + (100 - rightY) + '% '
      + (100 - leftY) + '%'
    
    this.shape.style.borderRadius = borderRadius
    this.codeEle.innerText = borderRadius
  }

  saveStateAsUrlHash() {
    const {topX, rightY, bottomX, leftY, width, height} = this.state
    const hash = `#${topX}.${rightY}.${bottomX}.${leftY}--${width}.${height}`
    this.setHash(hash)
  }

}