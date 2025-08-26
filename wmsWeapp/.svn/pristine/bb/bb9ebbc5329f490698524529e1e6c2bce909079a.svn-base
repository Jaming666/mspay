module.exports = {
  env: {
    NODE_ENV: '"development"',
    API_ENV: '"test"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer: {
      port: 10086,
      proxy: {
        '/wmsapi/': {
          target: 'https://saastest.msfpay.com/',
          // target: 'https://test.umbpay.com.cn/',
          // target: 'http://127.0.0.1:8080/',
          changeOrigin: true,
          pathRewrite: { '^/wmsapi': '/wmsapi' }
        }
      }
    }
  }
}
