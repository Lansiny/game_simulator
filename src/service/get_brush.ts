import { Brush } from '../model/display/brush'
import { assets } from '../config/assets'
import { Rect } from '../model/sprite/rect'

import { ImageStatic } from '../model/sprite/image_static'
import { ImageAnimation } from '../model/sprite/image_animation'
const getBrush = function () {
  const brush = new Brush({})



  const image = new ImageStatic({ assets: assets.image.cat})
  brush.add({ sprite: image })

  const rect = new Rect({})
  rect.borderWidth = 5
  brush.add({ sprite: rect })

  const animation = new ImageAnimation({ assets: assets.image.npc })
  brush.add({ sprite: animation })

  return brush
}


export { getBrush }