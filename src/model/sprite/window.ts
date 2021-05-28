
import { Sprite } from '../display/sprite'

class ImageWindow extends Sprite {
  cellSize: number
  constructor({
    name = 'image01',
    assets = '',
    width = 240,
    height = 120,
  }) {
    super({ group: 'window', name, assets})
    const image = new Image()
    image.src = assets
    image.onload = () => {
      // TODO: 窗口的宽高计算
      this.width = width
      this.height = height
      this.image = image
      this.isAction = true
    }
  }

  draw({ ctx }) {
    if (this.assets) {
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
