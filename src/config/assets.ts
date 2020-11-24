'use strict'
import path = require('path')
import fs = require('fs')

const assetsLoader = {
  assetDirPath: '',
  assets: {},
  get: function (assetDirPath: any) {
    if (!assetDirPath) {
      return false
    }
    this.assetDirPath = assetDirPath
    this.listDir(this.assets, this.assetDirPath)
    return this.assets
  },
  listDir: function (assets: any, dir: fs.PathLike) {
    const assetList = fs.readdirSync(dir, 'utf-8')
    for (var i = 0; i < assetList.length; i++) {
      const asset = path.join(dir.toString(), assetList[i])
      const stat = fs.lstatSync(asset)
      if (stat.isDirectory()) {
        assets[assetList[i]] = {}
        this.listDir(assets[assetList[i]], path.join(asset, '/'))
      } else {
        assets[assetList[i].split('.')[0]] = asset.toString()
      }
    }
  }
}

const assets = assetsLoader.get(path.join(__dirname, '../../assets/'))

export { assets }
