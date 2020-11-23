'use strict'
class Sprite {
  name: string
  group: string
  width: number
  height: number
  isVisible: boolean
  isAction: boolean
  isValid: boolean
  position: { x: number; y: number }
  speed: { x: number; y: number }
  offset: { x: number; y: number }
  rank: number
  assetPath: string
  image: HTMLImageElement
  constructor({
    name = 'unnamed',
    group = 'unnamed',
    width = 64,
    height = 64,
    isVisible = true,
    isAction = false,
    isValid = true,
    position = { x: 0, y: 0 },
    speed = { x: 0, y: 0 },
    offset = { x: 0, y: 0 },
    rank = 0,
    assetPath = ''
  }) {
    this.name = name
    this.group = group
    this.width = width
    this.height = height
    this.isVisible = isVisible
    this.isAction = isAction
    this.isValid = isValid
    this.position = position
    this.speed = speed
    this.offset = offset
    this.rank = rank
    this.assetPath = assetPath
  }

  buffer({ mainCtx, bufferCtx, bufferCanvas }) {
    bufferCtx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height)
    this.draw({ ctx: bufferCtx })
    mainCtx.drawImage(bufferCanvas, 0, 0)
  }

  draw({ ctx }) { }
  init(){}
  action() { }
}

export { Sprite }
