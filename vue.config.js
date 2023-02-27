const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        views: '@/views',
        components: '@/components'
      }
    }
  }
  // 后端已配置跨域，此处可不需要
  /*
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:9090',
        pathRewrite: ''
      },
      changeOrigin: true
    }
  }
  */
})
