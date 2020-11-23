
import {Sprite} from '../display/sprite'
import {config} from '../../config/index'

class Rect extends Sprite {
  fillStyle: string
  borderStyle: string
  borderWidth: number
  constructor({
    // 父类属性
    name = 'rect01',
    width = 25,
    height = 25,
    isAction = true,
    // 子类属性
    fillStyle = 'rgba(255, 255, 255, 1)',
    borderStyle = 'rgba(120, 120, 120, 1)',
    borderWidth = 1
  }) {
    super({ group: 'rect', name, width, height, isAction })
    this.fillStyle = fillStyle
    this.borderStyle = borderStyle
    this.borderWidth = borderWidth
  }

  action() {
    const flagMoveX = this.position.x < config.display.width - this.width - this.borderWidth * 2
    const flagMoveY = this.position.y < config.display.height - this.height - this.borderWidth * 2
    const flagStop = !flagMoveX && !flagMoveY
    if (flagMoveX) {
      this.position.x += 1
    }
    if (flagMoveY) {
      this.position.y += 1
    }
    // 预测动作停止后可以关闭动作，减少运算量
    if (flagStop) {
      this.isAction = false
    }
  }

  draw({ ctx }) {
    ctx.fillStyle = this.borderStyle
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width + this.borderWidth * 2,
      this.height + this.borderWidth * 2
    )
    ctx.fillStyle = this.fillStyle
    ctx.fillRect(
      this.position.x + this.borderWidth,
      this.position.y + this.borderWidth,
      this.width,
      this.height
    )
  }
}

export { Rect }
