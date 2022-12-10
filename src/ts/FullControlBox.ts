import AdjustableBox, { MovableHandles, MovalbeElements, State } from "./AdjustableBox";
import Movable from "./Movable";

export class FullControlBox extends AdjustableBox {
  
  initState(state: State) {
    const defaultState = {
      topX: 10,
      rightY: 10,
      bottomX: 90,
      leftY: 90,
      topY: 10,
      rightX: 90,
      bottomY: 90,
      leftX: 10,
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
      leftY: new Movable(movalbeElements.leftY!, this.updateState.bind(this), 'y', this.state.leftY, this.saveStateAsUrlHash.bind(this)),
      topY: new Movable(movalbeElements.topY!, this.updateState.bind(this), 'y', this.state.topY, this.saveStateAsUrlHash.bind(this)),
      rightX: new Movable(movalbeElements.rightX!, this.updateState.bind(this), 'x', this.state.rightX, this.saveStateAsUrlHash.bind(this)),
      bottomY: new Movable(movalbeElements.bottomY!, this.updateState.bind(this), 'y', this.state.bottomY, this.saveStateAsUrlHash.bind(this)),
      leftX: new Movable(movalbeElements.leftX!, this.updateState.bind(this), 'x', this.state.leftX, this.saveStateAsUrlHash.bind(this))
    }
  }

  updateBorderRadius() {
    const {topX, rightY, bottomX, leftY, topY, rightX, bottomY, leftX} = this.state
    const borderRadius = topX + '% '
      + (100 - rightX) + '% '
      + (100 - bottomX) + '% '
      + leftX + '% / '
      + topY + '% '
      + rightY + '% '
      + (100 - bottomY) + '% '
      + (100 - leftY) + '%'
    
    this.shape.style.borderRadius = borderRadius
    this.codeEle.innerText = borderRadius
  }

  saveStateAsUrlHash() {
    const {topX, rightY, bottomX, leftY, topY, rightX, bottomY, leftX, width, height} = this.state
    const hash = `#${topX}.${rightY}.${bottomX}.${leftY}-${topY}.${rightX}.${bottomY}.${leftX}-${width}.${height}`
    this.setHash(hash)
  }

}