import Components from 'unplugin-vue-components/webpack';
import NutUIResolver from '@nutui/nutui-taro/dist/resolver';

const path = require('path')
const today = new Date().getTime()

const config = {
  projectName: '民生库管',
  date: '2024-5-18',
  designWidth(input) {
    if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
      return 375
    }
    return 750
  },
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: ['@tarojs/plugin-html'],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: {
    type: 'webpack5',
    prebundle: { enable: false }
  },
  sass: {
    resource: [
      path.resolve(__dirname, '..', 'src/assets/styles/custom_theme.scss')
    ],
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`
  },
  mini: {
    webpackChain(chain) {
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader')
                }
              }
            }
          }
        }
      })
      chain.plugin('unplugin-vue-components').use(Components({
        resolvers: [NutUIResolver({ taro: true })]
      }))
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          // selectorBlackList: ['nut-']
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true
    }
  },
  h5: {
    webpackChain(chain) {
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader')
                }
              }
            }
          }
        }
      })
      chain.plugin('unplugin-vue-components').use(Components({
        resolvers: [NutUIResolver({ taro: true })]
      }))
    },
    publicPath: '/wmswap',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro', 'icons-vue-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    router: {
      mode: 'browser',
      basename: '/wmswap',
      customRoutes: {
        '/login/pages/login/login': '/phonelogin',
        '/login/pages/autoLogin/autoLogin': '/oalogin',
        '/login/pages/autoLogin/oacallback': '/oacallback'
      }
    },
    output: {
      filename: 'js/[name].js?' + 'v=' + today,
      chunkFilename: 'js/[name].js?' + 'v=' + today,
    }
  },
  alias: {
    'src': path.resolve(__dirname, '..', 'src'),
    'components': path.resolve(__dirname, '..', 'src/components'),
    'utils': path.resolve(__dirname, '..', 'src/utils'),
    'api': path.resolve(__dirname, '..', 'src/api'),
    'stores': path.resolve(__dirname, '..', 'src/stores'),
    'assets': path.resolve(__dirname, '..', 'src/assets')
  }
}

module.exports = function (merge) {

  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  if (process.env.API_ENV === 'test') {
    return merge({}, config, require('./test'))
  }
  return merge({}, config, require('./prod'))
}
