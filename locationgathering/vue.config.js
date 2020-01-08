module.exports = {
  publicPath: '/camp_entry/mAddSite',
  // publicPath: './',
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL, //对应跨域的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        },
        secure:false,
      },
    },
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      },
      postcss: {
        postcss: {
          plugins: [
            function (css, result) {
                if (options.exclude && css.source.input.file.match(options.exclude) !== null) {
                  result.root = css;
                  return
                }
                var oldCssText = css.toString();
                var px2remIns = new Px2rem(options);
                var newCssText = px2remIns.generateRem(oldCssText);
                result.root = postcss.parse(newCssText)
              }
          ]
        }
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    },
    themeColor: '#E37B50'
  },
  configureWebpack: {
    //关闭 webpack 的性能提示
    performance: {
      hints:false
    },

    //或者

    //警告 webpack 的性能提示
    performance: {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }
}

