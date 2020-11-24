'use strict'
// 预加载脚本
import { Brush } from '../model/display/brush'
import { config } from '../config'
import { getBrush } from '../service/get_brush'
// const { dialog } = require('electron').remote
import {assets} from '../config/assets'
function test(canvas: HTMLElement, brush: Brush) {

}

// dom加载完成时执行
window.addEventListener('DOMContentLoaded', () => {
  // 设置画布
  const mainCanvas = document.getElementById('canvas')
  const bufferCanvas = document.createElement('canvas')

  mainCanvas['width'] = config.display.width
  mainCanvas['height'] = config.display.height
  bufferCanvas['width'] = config.display.width
  bufferCanvas['height'] = config.display.height

  let FPS = config.display.FPS || 60
  if (FPS < config.display.minFPS) {
    FPS = config.display.minFPS
  } else if (FPS > config.display.maxFPS) {
    FPS = config.display.maxFPS
  }

  const brush = getBrush()
  let now: number
  let then = Date.now()
  const interval = 1000 / FPS
  let delta: number

  function run() {
    window.requestAnimationFrame(run)
    now = Date.now()
    delta = now - then
    if (delta > interval) {
      then = now - (delta % interval)
      brush.render({ mainCanvas, bufferCanvas })
    }
  }

  test(mainCanvas, brush)
  run()

  // await dialog.showMessageBox({
  //   type: 'warning',
  //   title: '您确定么？',
  //   message: '您真的想要删除这条数据么？',
  //   buttons: ['OK', 'Cancel']
  // })
})

// 输出鼠标位置
window.addEventListener('mousemove', event => {
  document.getElementById(
    'location'
  ).innerHTML = `&emsp; X ${event.clientX} &emsp; Y ${event.clientY} &emsp;`
})

// 正常来讲必须这么做，但在electron里面没啥意义
// requestAnimationFrame方法兼容性处理
// window.requestNextAnimationFrame = (function () {
//   let originalWebkitRequestAnimationFrame
//   let wrapper
//   let callback
//   let geckoVersion = 0
//   const userAgent = navigator.userAgent
//   let index = 0
//   const self = this

//   // Workaround for Chrome 10 bug where Chrome
//   // does not pass the time to the animation function

//   if (window.webkitRequestAnimationFrame) {
//     // Define the wrapper

//     wrapper = function (time) {
//       if (time === undefined) {
//         time = +new Date()
//       }
//       self.callback(time)
//     }

//     // Make the switch

//     originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame

//     window.webkitRequestAnimationFrame = function (callback, element) {
//       self.callback = callback

//       // Browser calls the wrapper and wrapper calls the callback

//       originalWebkitRequestAnimationFrame(wrapper, element)
//     }
//   }

//   // Workaround for Gecko 2.0, which has a bug in
//   // mozRequestAnimationFrame() that restricts animations
//   // to 30-40 fps.

//   if (window.mozRequestAnimationFrame) {
//     // Check the Gecko version. Gecko is used by browsers
//     // other than Firefox. Gecko 2.0 corresponds to
//     // Firefox 4.0.

//     index = userAgent.indexOf('rv:')

//     if (userAgent.indexOf('Gecko') !== -1) {
//       geckoVersion = userAgent.substr(index + 3, 3)

//       if (geckoVersion === '2.0') {
//         // Forces the return statement to fall through
//         // to the setTimeout() function.

//         window.mozRequestAnimationFrame = undefined
//       }
//     }
//   }

//   return (
//     window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.oRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     function (callback, element) {
//       let start, finish

//       window.setTimeout(function () {
//         start = +new Date()
//         callback(start)
//         finish = +new Date()

//         self.timeout = 1000 / 60 - (finish - start)
//       }, self.timeout)
//     }
//   )
// })()

// cancelRequestAnimationFrame方法兼容性处理
// window.cancelNextRequestAnimationFrame = (function () {
//   return window.cancelRequestAnimationFrame ||
//   window.webkitCancelRequestAnimationFrame ||
//   window.mozCancelRequestAnimationFrame ||
//   window.oCancelRequestAnimationFrame ||
//   window.msCancelRequestAnimationFrame ||
//   clearTimeout
// })()
