<template lang="pug">
  .slider-main
    img(
      class = "site-logo-big hidden-xs"
      src = "~assets/images/logo-big.png"
      alt = "")

    client-only
      .js-slider-main

        div(
          v-swiper:swiper = "swiperOption"
          @slideChange = "changeSlide")

          .swiper-wrapper
            .swiper-slide(
              v-for = "item in items"
              :key = "item.id")

              .js-slider-main__item
                .js-slider-main__thumb(
                  v-if = "item.video"
                  :class = "{ 'show': showVideo }"
                  :style = "{ backgroundImage: 'url(' + item.mobile_image + ')' }")

                  youtube.video_iframe_youtube(
                    :video-id = "item.video"
                    :player-vars = "{ autoplay: 1 }"
                    @ended = "endedVideo"
                    ref = "youtube")

                .js-slider-main__thumb(
                  v-if = "item.image"
                  :style = "{ backgroundImage: 'url(' + item.image + ')' }")

                .js-slider-main__container.container
                  .js-slider-main__center._to_bottom(v-if = "item.name")
                    p.js-slider-main__title(
                      v-if = "item.name.tag === 'p'"
                      v-html = "item.name.title")

                    h1.js-slider-main__title(
                      v-if = "item.name.tag === 'h1'"
                      v-html = "item.name.title")

                    h2.js-slider-main__title(
                      v-if = "item.name.tag === 'h2'"
                      v-html = "item.name.title")

                    h3.js-slider-main__title(
                      v-if = "item.name.tag === 'h3'"
                      v-html = "item.name.title")

                    h2.js-slider-main__description(
                      v-if = "item.content"
                      v-html = "item.content")

                    a(
                      :href = "item.button.link"
                      class = "btn btn-default _huge"
                      v-if = "item.button.name && item.button.link") {{ item.button.name }}

                      img(
                        src = "~assets/images/other/arr_white.svg"
                        alt = ""
                        class = "icon")

                    button(
                      class = "btn btn-default _huge"
                      @click = "showModal(template)"
                      v-if = "item.button.name && !item.button.link") {{ item.button.name }}

                      img(
                        src = "~assets/images/other/arr_white.svg"
                        alt = ""
                        class = "icon")

          .swiper-button-prev(v-if = "items.length > 1" slot = "button-prev")
          .swiper-button-next(v-if = "items.length > 1" slot = "button-next")
</template>

<script>
export default {
  props: ["items", "template"],
  data: () => ({
    swiperOption: {
      loop: true,
      centeredSlides: true,
      spaceBetween: 0,
      slidesPerView: 1,
      allowTouchMove: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    },
    activeIndex: 1,
    timer: false,
    timerTime: 10000,
    showVideo: false
  }),
  computed: {
    player() {
      return this.$refs.youtube[0].player
    }
  },
  mounted () {
    this.showVideo = false
    setTimeout(() => {
      this.showVideo = true
    }, 2000)
  },
  methods: {
    endedVideo() {
      if (this.items.length > 1) {
        this.slideTo(this.activeIndex + 1)
      } else {
        this.playVideo()
      }
    },
    playVideo() {
      this.player.playVideo()
      this.showVideo = false
      setTimeout(() => {
        this.showVideo = true
      }, 3000)
    },
    showModal(place, analytic) {
      this.$store.dispatch("showModal", {
        place: place,
        analytic: analytic
      })
    },
    slideTo(number) {
      this.swiper.slideTo(number)
    },
    changeSlide() {
      this.activeIndex = this.swiper.activeIndex
      const item = this.items[this.activeIndex - 1]
      clearInterval(this.timer)
      if (item) {
        if (item.video) {
          this.playVideo()
        } else {
          this.timer = setInterval(() => {
            let next = this.activeIndex + 1
            if (next > this.items.length) {
              this.slideTo(1)
            } else {
              this.slideTo(next)
            }
          }, this.timerTime)
        }
      }
    }
  }
}
</script>

<style lang="sass">

.slider-main
  position: relative

  .site-logo-big
    position: absolute
    top: 0
    left: 50%
    z-index: 5
    transition: all .3s ease
    transform: translate(-600px, 0)

  .swiper-slide
    width: 100%

.js-slider-main
  position: relative
  max-height: 70vh
  overflow: hidden

  .swiper-button-prev,
  .swiper-button-next
    position: absolute
    top: 50%
    border-radius: 50%
    background-color: rgba(53, 53, 53, .8)
    width: 45px
    height: 45px
    z-index: 2
    border: 0
    font-size: 0
    background-repeat: no-repeat
    background-position: center
    transition: all .3s ease

    &:hover
      background-color: #353535

  .swiper-button-prev
    left: 50%
    background-image: url('~assets/images/other/icon-chevron-left.svg')
    transform: translate(-600px, -50%)

  .swiper-button-next
    right: 50%
    background-image: url('~assets/images/other/icon-chevron-right.svg')
    transform: translate(600px, -50%)

  &__item
    background-color: #000

  &__thumb
    width: 100%
    min-height: 65vh
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    opacity: .8

    @media (max-width: 767px)
      min-height: 400px

    &.show
      iframe
        opacity: 1

    iframe
      position: absolute
      top: 0
      width: 200% !important
      height: 200% !important
      pointer-events: none
      transform: translate(-25%, -25%)
      opacity: 0
      transition: .3s

      @media (max-width: 767px)
        display: none
        pointer-events: none

  &__container
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 1
    display: flex
    flex-wrap: wrap
    align-items: center

    &::before,
    &::after
      display: none !important

  &__center
    width: 100%
    margin: auto
    text-align: center

    &._to_bottom
      margin-bottom: 0
      padding-bottom: 80px

      @media (max-width: 767px)
        padding-bottom: 30px

  &__title
    font-size: 49px
    font-family: 'Intro', sans-serif
    color: #fff
    line-height: 1.2
    text-align: center
    margin-bottom: 40px

    @media (max-width: 767px)
      font-size: 23px

  &__description
    font-size: 20px
    font-family: 'Intro', sans-serif
    color: #fff
    line-height: 1.2
    text-align: center
    margin: -5px 0 30px

    @media (max-width: 767px)
      font-size: 16px
</style>
