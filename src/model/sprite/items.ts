
import { Sprite } from '../display/sprite'

class Items extends Sprite {
  constructor({
    name = 'items_01',
    assets = ''
  }) {
    super({ group: 'items', name, assets })
    const image = new Image()
    image.src = assets
    image.onload = () => {
      this.width = image.naturalWidth
      this.height = image.naturalHeight
      this.image = image
    }
  }

  draw({ ctx }) {
    if (this.image) {
    //   const args = [
    //     this.image,
    //     this.position.x,
    //     this.position.y,
    //     this.width,
    //     this.height
    //   ]
    //   ctx.drawImage(...args)
    } else if (!this.assets) {
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

export { Items }
