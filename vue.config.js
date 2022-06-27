/* eslint-disable */
const path=require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config =>{
    const dir = path.resolve(__dirname, 'src/assets/icons')  // 改这里

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 包含 icons 目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()
      // .use('svgo-loader').loader('svgo-loader')  // 为了防止图标自带颜色的影响
      // //  yarn add --dev svgo-loader  之后才能使用
      // .tap(options=>({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录
  }
}
