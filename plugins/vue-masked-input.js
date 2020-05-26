import Vue from "vue"
import MaskedInput from "vue-masked-input"

if (process.browser) {
  Vue.use(MaskedInput)
}
