import { Sprite } from '../display/sprite'

class Text extends Sprite {
  cellSize: number
  body: string
  isAutoWrap: boolean
  fontSize: number
  align: string
  constructor({
    name = 'image01',
    body = '',
    width = 256,
    isAutoWrap = false,
    align = '',
    fontSize = 14
  }) {
    super({ group: 'text', name })
    this.body = body
    this.isAutoWrap = isAutoWrap
    this.fontSize = fontSize
    this.align = align
    this.width = width
    // TODO: 文本 上边距计算
    // TODO: 文本 下边距计算
    // TODO: 文本 字距计算
    // TODO: 文本 内边距计算
    // TODO: 文本 换行后宽高计算
    // TODO: 文本 根据对齐方式定位
  }

  draw({ ctx }) {
    // TODO: 文本 绘制方法
  }
}

export { Text }
