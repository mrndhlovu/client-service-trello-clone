module.exports = {
  webpackDevMiddleware: config => ({
    ...config,
    watchOptions: { ...config?.watchOptions, poll: 300 },
  }),
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
    }
    return config
  },
}
