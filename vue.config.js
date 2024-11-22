const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

//mudando a porta para 8081
module.exports = {
  devServer: {
    port: 8081
  }
}