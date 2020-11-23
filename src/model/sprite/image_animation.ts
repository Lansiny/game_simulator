
import { Sprite } from '../display/sprite'
import { prefixPath } from '../../config/assets'
class ImageAnimation extends Sprite {
  constructor({
    name = 'animation01',
    assetPath = '',
    width = 64,
    height = 64
  }) {
    super({ group: 'animation', name, assetPath, isAction: true})
    const image = new Image()
    image.src = prefixPath + this.assetPath
    image.onload = () => {
      // TODO: 帧动画的宽高计算

      this.width = width
      this.height = height
      this.image = image
    }
  }

  draw({ ctx }) {
    if (this.assetPath) {
      // TODO: 帧动画的绘制方法

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

export { ImageAnimation }
