<template lang="pug">
  .wrapper.modal-open(:class = "{ 'loading': $store.state.loadingWrapper }")
    #scripts
    nuxt
    svg-images
    .loader-wrapper
</template>

<script>
import SvgImages from "~/components/params/Svg"

export default {
  components: {
    SvgImages
  },
  data: () => ({
    scroll: 0
  }),
  created() {
    if (process.browser) {
      if (localStorage.getItem('culinatyon-cart')) {
        this.$store.dispatch(
          'updateCart',
          JSON.parse(localStorage.getItem('culinatyon-cart'))
        )
      }

      window.addEventListener("scroll", this.handleScroll)
    }
  },
  beforeUpdate() {
    if (process.browser) {
      window.addEventListener("scroll", this.handleScroll)
    }
  },
  methods: {
    handleScroll() {
      const st = window.scrollY
      let fixedOnScroll = false
      if (st > this.scroll) {
        if (st >= 100) {
          fixedOnScroll = true
        }
      } else {
        fixedOnScroll = false
      }
      this.scroll = st
      this.$store.dispatch("scrollTop", st)
      this.$store.dispatch("headerMenuHide", fixedOnScroll)
    }
  }
}
</script>
