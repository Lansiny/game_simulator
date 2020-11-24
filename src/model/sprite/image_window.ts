
import { Sprite } from '../display/sprite'

class ImageWindow extends Sprite {
  cellSize: number
  constructor({
    name = 'image01',
    assetPath = '',
    width = 240,
    height = 120,
  }) {
    super({ group: 'window', name, assetPath, isAction: true })
    const image = new Image()
    image.src = this.assetPath
    image.onload = () => {
      // TODO: 窗口的宽高计算

      this.width = width
      this.height = height
      this.image = image
    }
  }

  draw({ ctx }) {
    if (this.assetPath) {
      // TODO: 窗口的绘制方法

    } else {
      ctx.fillStyle = '#000'
      ctx.fillRect(
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
      ctx.fillStyle = '#fff'
      ctx.fillRect(
        this.position.x + 1,
        this.position.y + 1,
        this.width - 2,
        this.height - 2
      )
    }
  }
}

export { ImageWindow }
