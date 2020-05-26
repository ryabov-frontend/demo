<template lang="pug">
  .widget._no-padding.m-b-30
    .container
      h1.widget__title._mini.text-center(
        v-if = "name.tag === 'h1' && name.title"
        v-html = "name.title")

      h2.widget__title._mini.text-center(
        v-if = "name.tag === 'h2' && name.title"
        v-html = "name.title")

      h3.widget__title._mini.text-center(
        v-if = "name.tag === 'h3' && name.title"
        v-html = "name.title")

      h4.widget__title._mini.text-center(
        v-if = "name.tag === 'h4' && name.title"
        v-html = "name.title")

      p.widget__title._mini.text-center(
        v-if = "name.tag === 'p' && name.title"
        v-html = "name.title")

      .carousel-wrapper.sliderHead
        client-only
          carousel(v-bind = "optionsCarousel")

            slide(
              v-for = "(item, i) in items"
              :key = "item.id")

              .js-slider-clients-nav__item
                img(
                  :src = "item.image")

      client-only
        .slider.sliderBody(
          v-swiper:swiper = "swiperOption"
          @slideChange = "changeSlide")
          .swiper-wrapper
            .swiper-slide(
              v-for = "item in items"
              :key = "item.id")

              .js-slider-clients-main__item
                .js-slider-clients-main__title.visible-xs(v-html = "item.name.title")

                .js-slider-clients-main__thumb
                  img(
                    :src = "item.mobile_image"
                    alt = "item.name.title")

                  //- span(
                    v-if = "item.name && item.name.title"
                    v-html = "item.name.title")

                .js-slider-clients-main__content.hidden-xs
                  span.js-slider-clients-main__title(v-html = "item.name.title")
                  p.hidden-xs.hidden-sm(v-html = "item.content")

                p.visible-xs.visible-sm(v-html = "item.content")

</template>

<script>
export default {
  props: ["name", "items"],
  data: () => ({
    swiperOption: {
      loop: true,
      effect: 'fade',
      centeredSlides: true,
      spaceBetween: 0,
      slidesPerView: 1,
      allowTouchMove: true
    },
    optionsCarousel: {
      loop: true,
      perPage: 5,
      paginationEnabled: true,
      centerMode: true,
      mouseDrag: true,
      touchDrag: true,
      navigationEnabled: false,
      scrollPerPage: false
    },
    windowWidth: 0,
    activeIndex: 1,
    activeIndexHead: 1
  }),
  methods: {
    slideTo (number) {
      this.swiper.slideTo(number)
    },
    changeSlide () {
      this.activeIndex = this.swiper.activeIndex
    },
    changeSlideHead () {
      this.activeIndexHead = this.swiperHead.activeIndex
    },
    onResize() {
      this.windowWidth = window.innerWidth
    }
  },
  watch: {
    windowWidth(newWidth, oldWidth) {
     this.optionsCarousel.perPage = newWidth < 767 ? 1 : 5
    }
  },
  mounted () {
    this.windowWidth = window.innerWidth
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  }
}
</script>

<style lang="sass">

.sliderBody.slider
  .swiper-slide
    opacity: 0 !important

    &.swiper-slide-active
      opacity: 1 !important

.sliderHead
  margin-bottom: 65px

  @media (max-width: 767px)
    margin-bottom: 45px

  .js-slider-clients-nav__item
    height: 135px
    padding: 20px
    text-align: center
    border: 1px solid #e8e8e8
    cursor: pointer
    display: flex
    flex-wrap: wrap
    align-items: center
    transition: all .3s ease

    @media (max-width: 767px)
      height: 100px

    img
      margin: auto
      max-height: 100%
      filter: grayscale(100%)
      transition: all .3s ease

  .VueCarousel-slide-active
    .js-slider-clients-nav__item
      border-color: #FC2DFC

      img
        filter: none

.js-slider-clients-main
  &__content
    width: calc(100% - 230px)
    padding-left: 55px

  &__title
    margin-bottom: 24px
    font-size: 18px
    color: #000
    font-weight: 700
    line-height: 1.5
    display: block
    width: 100%

    @media (max-width: 991px)
      font-size: 25px
      margin-bottom: 60px

    @media (max-width: 767px)
      margin-bottom: 20px
      text-align: center

    span
      display: block
      color: #888
      font-weight: 500

  &__item
    display: flex
    flex-wrap: wrap
    align-items: flex-start

    p
      font-size: 18px
      color: #000
      line-height: 1.556
      text-align: left
      margin-bottom: 30px

      @media (max-width: 480px)
        max-height: 130px
        overflow: hidden

  &__thumb
    width: 230px
    border: 1px solid #e8e8e8
    border-radius: 5px
    background-color: #fff
    padding: 12px 12px 34px
    box-shadow: 0 4px 13px 0 rgba(57, 57, 57, .1)
    transition: all .3s ease
    display: inline-flex
    flex-wrap: wrap

    @media (max-width: 991px)
      margin-bottom: 60px

    @media (max-width: 767px)
      margin-bottom: 25px
      margin-left: auto
      margin-right: auto

    @media (max-width: 480px)
      width: 100%

    img
      display: block
      max-height: 150px
      margin: 0 auto

      @media (max-width: 480px)
        width: 100%

    span
      width: 100%
      display: block
      margin-top: 24px
      text-align: center
      font-size: 14px
      color: #888
      font-style: italic

      span
        margin-top: 0

</style>
