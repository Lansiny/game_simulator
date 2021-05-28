import { Brush } from '../model/display/brush'
import { assets } from '../config/assets'
import { Rect } from '../model/sprite/rect'

import { Background } from '../model/sprite/background'
import { Animation } from '../model/sprite/animation'
const getBrush = function () {
  const brush = new Brush({})

  const background = new Background({ assets: assets.image.cat})
  brush.add({ sprite: background })

  const rect = new Rect({})
  rect.borderWidth = 5
  brush.add({ sprite: rect })

  const animation = new Animation({ assets: assets.image.npc })
  brush.add({ sprite: animation })

  return brush
}


export { getBrush }