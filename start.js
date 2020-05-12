const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')()
console.log(path.join(__dirname, 'dist'))
const devServerConfig = {
  hot: true,
  host: 'localhost',
  contentBase: path.join(__dirname, 'dist')
}
WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig)
const server = new WebpackDevServer(webpack(webpackConfig), devServerConfig)
server.listen(9000, () => console.log('webpack is starting.....'))
