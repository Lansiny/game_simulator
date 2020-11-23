
import { Sprite } from '../display/sprite'
import { prefixPath } from '../../config/assets'
class ImageStatic extends Sprite {
  constructor({
    name = 'image01',
    assetPath = ''
  }) {
    super({ group: 'image', name, assetPath })
    const image = new Image()
    image.src = prefixPath + this.assetPath
    image.onload = () => {
      this.width = image.naturalWidth
      this.height = image.naturalHeight
      this.image = image
    }
  }

  draw({ ctx }) {
    if (!this.assetPath) {
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
    } else {
      const args = [
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      ]
      ctx.drawImage(...args)
    }
  }
}

export { ImageStatic }
