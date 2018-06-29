module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '疯狂抢矿机',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: '疯狂抢矿机' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/ico/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },//页面跳转时的进度条样式
  css: ['~/assets/css/loading.css'],//全局样式
  plugins: [
    // { src: '~/plugins/localStorage.js', ssr: false },//store state持久化插件
  ],
  /*
  ** Build configuration
  */
  build: {
    publicPath: '/views/_nuxt/',
    // publicPath: 'https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/20180518_active/',
    vendor: ['axios', 'vant'],//多个模板引入第三方插件时，vendor配置只打包一次
    // loaders: [
    //   {
    //     test: /\.(png|jpe?g|gif|svg)$/,
    //     loader: 'url-loader',
    //     query: {
    //       limit: 10000, // 10KO
    //       name: 'img/[name].[hash].[ext]'
    //     }
    //   }
    // ],
    plugins: [],//webpack插件
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
