const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Include here the "empty" modules
      "fs": false,
      "path": false,
    };
  },

  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
    electronBuilder: {
      nodeIntegration: true,
      electronBuilder: {
        builderOptions: {
          productName: 'fmo-gerenciador'
        }
      }
    }
  }
})
