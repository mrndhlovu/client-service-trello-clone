const path = require("path")

module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300
    return config
  },
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
    }
    return config
  },
}
