import Vue from "vue"
import ElementUI from "element-ui"

import VueI18n from "vue-i18n"
import enLocale from "element-ui/lib/locale/lang/en"
import ruLocale from "element-ui/lib/locale/lang/ru-RU"

import "element-ui/lib/theme-chalk/index.css"

export default (context, inject) => {
  let parseLanguage = "ru"

  // switch (context.app.$store.state.language) {
  //   default:
  //     parseLanguage = context.app.$store.state.language
  // }

  Vue.use(VueI18n)

  const messages = {
    en: {
      ...enLocale
    },
    ru: {
      ...ruLocale
    }
  }

  const i18n = new VueI18n({
    locale: parseLanguage,
    messages
  })

  Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
  })
}
