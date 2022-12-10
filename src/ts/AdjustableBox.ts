import type Movable from "./Movable"

export type State = {
  topX: number
  rightX: number
  bottomX: number
  leftX: number
  topY: number
  rightY: number
  bottomY: number
  leftY: number
  width: string
  height: string
}
export type MovalbeElements = Partial<Record<Exclude<keyof State, 'width' |'height'>, HTMLElement>>
export type MovableHandles = Partial<Record<Exclude<keyof State, 'width' |'height'>, Movable>>

export default abstract class AdjustableBox {
  state!: State
  box: HTMLElement
  shape: HTMLElement
  codeEle: HTMLElement
  widthInput: HTMLInputElement
  heightInput: HTMLInputElement
  resetBtn: HTMLElement
  copyBtn: HTMLElement
  messageEle: HTMLElement
  timerId: number | undefined

  constructor({
    state = {} as State,
    boxEleId = 'box',
    shapeEleId = 'shape',
    codeEleId = 'code',
    widthInputId = "width",
    heightInputId = "height",
    resetBtnId = 'reset',
    copyBtnId = 'copy',
    messageEleId = 'message',
    moveableElems = {} as MovalbeElements
  } = {}) {
    this.box = document.getElementById(boxEleId)!
    this.shape = document.getElementById(shapeEleId)!

    this.codeEle = document.getElementById(codeEleId)!
    this.copyBtn = document.getElementById(copyBtnId)!
    this.messageEle = document.getElementById(messageEleId)!

    this.widthInput = document.getElementById(widthInputId) as HTMLInputElement
    this.heightInput = document.getElementById(heightInputId) as HTMLInputElement
    this.resetBtn = document.getElementById(resetBtnId)!

    this.widthInput.addEventListener('change', () => {
      this.updateState('width', this.widthInput.value)
      this.saveStateAsUrlHash()
    })
    this.heightInput.addEventListener('change', () => {
      this.updateState('height', this.heightInput.value)
      this.saveStateAsUrlHash()
    })
    this.resetBtn.addEventListener('click', this.resetBoxSize.bind(this))

    this.copyBtn.addEventListener('click', this.handleCopyCode.bind(this))

    this.initState(state)
    this.initHandles(moveableElems)
  }

  abstract initState(state: State): void
  abstract initHandles(movalbeElements: MovalbeElements): MovableHandles
  abstract updateBorderRadius(): void

  updateState(key: string, val: string | number) {
    (this.state as any)[key] = val
    this.updateBorderRadius()
    this.updateBoxSize()
  }

  updateBoxSize() {
    this.box.style.width = this.state.width + 'px'
    this.box.style.height = this.state.height + 'px'

    this.widthInput.value = this.state.width
    this.heightInput.value = this.state.height
  }

  resetBoxSize() {
    this.box.style.width = '50vmin'
    this.box.style.height = '50vmin'
    this.state.width = this.box.offsetWidth.toFixed(0)
    this.state.height = this.box.offsetHeight.toFixed(0)
    this.widthInput.value = this.state.width
    this.heightInput.value = this.state.height
    this.saveStateAsUrlHash()
  }

  async handleCopyCode() {
    await navigator.clipboard.writeText(this.codeEle.innerText)
    this.showMessage()
  }

  showMessage(text = 'Copied success! 👌', duration = 2500) {
    if (this.timerId) { clearTimeout(this.timerId) }

    this.messageEle.innerText = text
    this.messageEle.classList.add('visible')
    
    this.timerId = setTimeout(() => {
      this.messageEle.classList.remove('visible')
    }, duration)
  }

  abstract saveStateAsUrlHash(): void

  setHash(hash: string) {
    if (window.history && 'pushState' in window.history) {
      window.history.pushState(null, '', hash)
    } else {
      window.location.hash = hash
    }
  }

  static generateInitStateFromUrlHash(url: string) {
    const regex = /#(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100)-(?:(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100)\.(\d\d?|100))?-(\d*).(\d*)/gm;
    if (!regex.test(url)) { return undefined }

    const paramsToAttribute = [
      "topX",
      "rightY",
      "bottomX",
      "leftY",
      "topY",
      "rightX",
      "bottomY",
      "leftX",
      "width",
      "height"
    ]

    const attributes: Record<string, string> = {}
    let m
    regex.lastIndex = 0;

    while ((m = regex.exec(url)) !== null) {
      m.forEach((match, groupIndex) => {
        if (groupIndex != 0 && match) {
          attributes[paramsToAttribute[groupIndex - 1]] = match
        }
      });
    }

    return attributes as any as State
  }
}