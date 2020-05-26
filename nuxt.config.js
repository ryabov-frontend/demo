// const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "culinaryon",
    meta: [
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#ffffff" },
      { hid: "description", name: "description", content: "" },
      { hid: "keywords", name: "keywords", content: "" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "CulinaryOn" }
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "https://culinaryon.ru/img/favicons/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "https://culinaryon.ru/img/favicons/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "https://culinaryon.ru/img/favicons/manifest.json"
      },
      {
        rel: "mask-icon",
        color: "#5bbad5",
        href: "https://culinaryon.ru/img/favicons/safari-pinned-tab.svg"
      },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },
  css: ["@/assets/styles/application.sass"],
  loading: {
    color: "#940186"
  },
  vendor: ["jquery"],
  plugins: [
    { src: '~plugins/vue-carousel', mode: 'client' },
    { src: '~plugins/vue-awesome-swiper', mode: 'client' },
    "~plugins/filters/thousandSeparator",
    "~plugins/element-ui",
    "~plugins/vue-youtube",
    "~plugins/vue-silentbox",
    "~plugins/vuelidate",
    "~plugins/vue-scrollto",
  ],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/moment",
    "@nuxtjs/global-components",
    "cookie-universal-nuxt"
  ],
  axios: {
    baseURL: "http://dev.culinaryon.com",
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Accept: '*/*'
    }
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },
  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          // loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

        // config.plugins.push(
        //   new StylelintPlugin({
        //     files: [
        //       '**/*.vue',
        //       'assets/styles/**/*.{scss,sass}'
        //     ],
        //     configFile: './.stylelintrc.dev.js'
        //   })
        // )
      }
    }
  },
  vendor: ["axios"]
}
