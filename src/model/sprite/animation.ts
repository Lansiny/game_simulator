import { Sprite } from '../display/sprite'
import { config } from '../../config'

class Animation extends Sprite {
  image: HTMLImageElement
  duration: number  // 播放时长 单位 毫秒
  framesPerAction: number  // 动画总帧数
  numberOfActions: number  // 动作数量

  elapsedTime: number  // 忘记干啥用的了
  lastTime: number  // 忘记干啥用的了
  timer: number  // 播放计时
  indexOfFrame: number  // 当前帧
  nowAction: number  // 当前动作
  isNextFrame: boolean  // 是否已轮到下一帧
  isReplay: boolean  // 是否循环播放

  sx: number  // 图像切割的起始x位置
  sy: number  // 图像切割的起始y位置
  sw: number  // 图像切割的宽度
  sh: number  // 图像切割的高度
  imageWidth: number // 原图宽度
  imageHeight: number // 原图高度
  keyStatus: {
    'a': boolean,
    's': boolean,
    'd': boolean,
    'w': boolean
  }
  constructor({
    name = 'animation_01',
    assets = '',
    width = 48,
    height = 48,
    duration = 800,
    nowAction = 0
  }) {
    super({ group: 'animation', name, width, height, assets })
    const image = new Image()
    image.src = assets
    image.onload = () => {
      this.imageWidth = image.naturalWidth
      this.imageHeight = image.naturalHeight
      this.image = image
      this.sw = width
      this.sh = height
      this.sx = 0
      this.sy = 0
      this.speed.x = 10
      this.speed.y = 10
      this.isReplay = true
      this.isNextFrame = true
      this.elapsedTime = 0
      this.timer = 0
      this.lastTime = 0
      this.indexOfFrame = 0
      this.nowAction = nowAction
      this.numberOfActions = this.imageHeight / height
      this.framesPerAction = this.imageWidth / width
      this.duration = duration
      this.elapsedTime = this.duration / this.framesPerAction
      this.isAction = true
      this.addKeyListener(this.keyStatus)
    }
  }

  draw({ ctx }) {
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.sx,
        this.sy,
        this.sw,
        this.sh,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
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

  action() {
    this.animationAction(this.keyStatus)
    if (this.timer <= this.duration) {
      if (this.lastTime >= this.elapsedTime) {
        this.setSplitPosition()
        if (this.isNextFrame) {
          this.indexOfFrame += 1
          if (this.indexOfFrame >= this.framesPerAction - 1) {
            this.isNextFrame = !this.isNextFrame
          }
        } else {
          this.indexOfFrame -= 1
          if (this.indexOfFrame <= 0) {
            this.isNextFrame = !this.isNextFrame
          }
        }
        this.replay()
        // console.log(`sx: ${this.sx}, sy: ${this.sy}, sw: ${this.sw}, sh: ${this.sh}`)
        this.lastTime -= this.elapsedTime
      }
      this.lastTime += 1000 / config.display.FPS
      this.timer += 1000 / config.display.FPS
    }
  }

  animationAction(keyStatus: any) {
    const flagMoveX = this.position.x < config.display.width - this.width
    const flagMoveY = this.position.y < config.display.height - this.height
    const flagStop = !flagMoveY || !flagMoveX
    // TODO: 按键判定
    if (flagMoveX) {
      this.position.x += this.speed.y / (1000 / config.display.FPS)
    }
    if (flagMoveY) {
      this.position.y += this.speed.y / (1000 / config.display.FPS)
    }
    if (flagStop) {
      this.isReplay = false
    }
  }

  keydown(event: KeyboardEvent, keyStatus: any) {
    // console.log(event)
    const key = event.key
    switch (key) {
      case 's':
        this.keyStatus.s = !this.keyStatus.s
        break
      case 'd':
        this.keyStatus.s = !this.keyStatus.d
        break
      case 'w':
        this.keyStatus.s = !this.keyStatus.w
        break
      case 'a':
        this.keyStatus.s = !this.keyStatus.a
        break
    }
  }

  keypress(event: KeyboardEvent, keyStatus: any) {
    // console.log(event)
  }

  keyup(event: KeyboardEvent, keyStatus: any) {
    // console.log(event.timeStamp)
  }

  replay() {
    if (this.isReplay) {
      this.timer = 0
    } else {
      this.isValid = true
      this.isAction = false
      this.isVisible = true
    }
  }

  setAction(num: number) {
    this.nowAction = num
    this.setSplitPosition()
  }

  setSplitPosition() {
    this.sx = this.sw * this.indexOfFrame
    this.sy = this.sh * this.nowAction
  }

  addKeyListener(keyStatus: any) {
    window.addEventListener('keydown', event => { this.keydown(event, keyStatus) })
    window.addEventListener('keypress', event => { this.keypress(event, keyStatus) })
    window.addEventListener('keyup', event => { this.keyup(event, keyStatus) })
  }
}

export { Animation }