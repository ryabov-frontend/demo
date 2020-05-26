<template lang="pug">
  .partners
    .container
      h3.widget__title._mini.text-center Наши <span class="text-default">партнеры</span>

      client-only
        div(v-swiper:swiper="swiperOption")
          .swiper-wrapper
            .swiper-slide(
              v-for = "item in list"
              :key = "item.name")

              nuxt-link(:to = "item.link")
                img(
                  :src = "item.img"
                  width = "125"
                  alt)

          .swiper-button-prev(slot = "button-prev")
          .swiper-button-next(slot = "button-next")
</template>

<script>
export default {
  props: ['list'],
  data: () => ({
    swiperOption: {
      loop: true,
      centeredSlides: true,
      spaceBetween: 0,
      slidesPerView: 4,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    },
    windowWidth: 0
  }),
  watch: {
    windowWidth(newWidth, oldWidth) {
     this.swiperOption.slidesPerView = newWidth < 767 ? 4 : 9
    }
  },
  created () {
    if (process.browser) {
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize)
      })
    }
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style lang="sass" scoped>

.partners
  background: #fff
  padding: 25px 0

  .container
    @media (max-width: 1259px)
      width: 100%
      padding: 0

  .widget__title
    &._mini.text-center
      text-align: center

  .swiper-button-prev,
  .swiper-button-next
    border-radius: 50%
    background-color: rgba(53, 53, 53, .8)
    width: 45px
    height: 45px
    transition: all .3s ease
    background-repeat: no-repeat
    background-position: center

    &:hover
      background-color: #353535

  .swiper-button-prev
    left: 0
    background-image: url('~assets/images/icons/icon-arrow-left.svg')

    @media (max-width: 767px)
      left: 10px

  .swiper-button-next
    right: 0
    background-image: url('~assets/images/icons/icon-arrow-right.svg')

    @media (max-width: 767px)
      right: 10px
</style>
