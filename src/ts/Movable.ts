
export default class Movable {
  element: HTMLElement
  onChange: (key: string, val: number) => void
  axis: 'x' | 'y'
  offset: number
  onDragEnd: () => void

  constructor(
    element: HTMLElement,
    onChange: (key: string, val: number) => void,
    axis: 'x' | 'y',
    initPosition = 30,
    onDragEnd: () => void = () => {}
  ) {
    this.element = element
    this.onChange = onChange
    this.axis = axis
    this.offset = initPosition
    this.onDragEnd = onDragEnd

    this.initPosition(initPosition)
    this.onChange(this.element.id, this.offset)
    this.element.addEventListener('mousedown', this.onMousedown)
  }

  onMousedown = (e: MouseEvent) => {
    e.preventDefault()

    this.element.classList.add('active')

    document.addEventListener('mousemove', this.onMove)
    document.addEventListener('mouseup', this.onEnd)
  }
  
  onMove = (e: MouseEvent) => {
    this.setPosition(e.clientX, e.clientY)

    this.onChange(this.element.id, this.offset)
  }

  onEnd = () => {
    this.element.classList.remove('active')

    this.onDragEnd()

    document.removeEventListener('mousemove', this.onMove)
    document.removeEventListener('mouseup', this.onEnd)
  }

  setPosition(offsetX: number, offsetY: number) {
    const boxRect =
      this.element.parentElement!.parentElement!.getBoundingClientRect()
    if (this.axis === 'x') {
      const moveX = +(((offsetX - boxRect.left) / boxRect.width) * 100).toFixed(0)
      this.offset = this.minmax(moveX, 0, 100)
      this.element.style.left = this.offset + '%'
    } else {
      const moveY = +(((offsetY - boxRect.top) / boxRect.height) * 100).toFixed(0)
      this.offset = this.minmax(moveY, 0, 100)
      this.element.style.top = this.offset + '%'
    }
  }

  initPosition(pos: number) {
    if (this.axis === 'x') {
      this.element.style.left = pos + '%'
    } else {
      this.element.style.top = pos + '%'
    }
  }

  minmax(n: number, min: number, max: number) {
    return Math.max(Math.min(n, max), min)
  }
}
