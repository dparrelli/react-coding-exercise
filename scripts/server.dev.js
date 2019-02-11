'use strict'

const _ = require('lodash')
const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const clearConsole = require('react-dev-utils/clearConsole')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const {
  createCompiler,
  prepareProxy,
  prepareUrls
} = require('react-dev-utils/WebpackDevServerUtils')
const openBrowser = require('react-dev-utils/openBrowser')
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')
const createDevServerConfig = require('../config/webpackDevServer.config')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const errorMiddleware = require('../src/server/middleware/error')

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appIndexJs])) {
  process.exit(1)
}

module.exports = function (port, host) {
  const config = configFactory('development')
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
  const appName = require(paths.appPackageJson).name
  const urls = prepareUrls(protocol, host, port)

  // Create a webpack compiler that is configured with custom messages.
  const compiler = createCompiler(webpack, config, appName, urls, useYarn)
  // Load proxy config
  const proxySetting = require(paths.appPackageJson).proxy
  const proxyConfig = prepareProxy(proxySetting, paths.appPublic)
  // Serve webpack assets generated by the compiler over a web server.
  const serverConfig = createDevServerConfig(
    proxyConfig,
    urls.lanUrlForConfig
  )

  serverConfig.after = app => {
    app.use(webpackHotMiddleware(compiler.compilers[0]))
    app.use(webpackHotServerMiddleware(compiler, {
      createHandler: (error, serverRenderer) => (req, res, next) => {
        if (error ||
            // if the dev server doesn't handle a hot-update request, we don't want to pass it through
            // to the SSR server
            req.url.indexOf('hot-update') >= 0) {
          return next(error)
        }
        serverRenderer(req, res, next)
      }
    }))
    app.use(errorMiddleware)
  }

  const devServer = new WebpackDevServer(compiler, serverConfig)

  compiler.hooks.done.tap('WebpackDevServer', _.once(() => {
    // Launch WebpackDevServer.
    devServer.listen(port, host, err => {
      if (err) {
        return console.log(err)
      }
      openBrowser(urls.localUrlForBrowser)
    })
  }))

  if (isInteractive) {
    clearConsole()
  }
  console.log(chalk.cyan('Starting the development server...\n'))

  return devServer
}