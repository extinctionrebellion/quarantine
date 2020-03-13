module.exports = {
  webpack: (config) => {
    config.node = {
      fs: 'empty'
    }
    return config
  },
  env: {
    API_URL: 'http://127.0.0.1:3333/api/v1/'
  }
};
