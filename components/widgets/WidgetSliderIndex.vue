<template lang="pug">
  .widget.widget-do.gradient-v
    .container
      h1.widget__title.text-white-important.text-center(
        v-if = "name.tag === 'h1' && name.title"
        v-html = "name.title")

      h2.widget__title.text-white-important.text-center(
        v-if = "name.tag === 'h2' && name.title"
        v-html = "name.title")

      h3.widget__title.text-white-important.text-center(
        v-if = "name.tag === 'h3' && name.title"
        v-html = "name.title")

      p.widget__title.text-white-important.text-center(
        v-if = "name.tag === 'p' && name.title"
        v-html = "name.title")

      .do-list
        li.do-item(
          :class = "{ 'active': activeIndex === 1 }"
          @click = "slideTo(1)") Кулинарные мастер-классы
        li.do-item(
          :class = "{ 'active': activeIndex === 2 }"
          @click = "slideTo(2)") Тематические праздники
        li.do-item(
          :class = "{ 'active': activeIndex === 3 }"
          @click = "slideTo(3)") Бизнес мероприятия
        li.do-item(
          :class = "{ 'active': activeIndex === 4 }"
          @click = "slideTo(4)") Арт-вечеринки
        li.do-item(
          :class = "{ 'active': activeIndex === 5 }"
          @click = "slideTo(5)") Квизы
        li.do-item(
          :class = "{ 'active': activeIndex === 6 }"
          @click = "slideTo(6)") Выездные мероприятия

      client-only
        .slider.slider--dr.js-slider-dr(
          v-swiper:swiper = "swiperOption"
          @slideChange = "changeSlide")
          .swiper-wrapper
            .swiper-slide.age(
              v-for = "item in items"
              :key = "item.id")

              .img(
                :style = "{ backgroundImage: 'url(' + item.image + ')' }"
                alt = "item.name.title")

              .info(v-if = "item.content")
                p {{ item.content }}

          .swiper-button-prev(slot = "button-prev")
          .swiper-button-next(slot = "button-next")

      .text-center(v-if = "button.name")
        button(
          class = "btn btn-primary _huge"
          @click = "showModal('header', ['zabron', 'modal-order-event'])")

          | {{ button.name }}

          img(
            class = "icon"
            src = "~assets/images/other/arr.svg"
            alt = "Arrow")
</template>

<script>
export default {
  props: ["name", "items", "button", "icons", "template"],
  data: () => ({
    swiperOption: {
      loop: true,
      effect: 'fade',
      centeredSlides: true,
      spaceBetween: 0,
      slidesPerView: 1,
      allowTouchMove: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    },
    activeIndex: 1
  }),
  methods: {
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
    }
  }
}
</script>

<style lang="sass" scoped>

.widget-do.widget
  padding-bottom: 75px

.do
  &-list
    list-style: none
    padding: 0
    margin: 0
    margin-bottom: 35px
    display: flex
    flex-wrap: wrap

  &-item
    width: 33.3333%
    margin-bottom: 10px
    padding-left: 34px
    color: #fff
    font-size: 25px
    font-weight: 600
    cursor: pointer
    position: relative
    z-index: 2
    transition: all .3s ease

    @media (max-width: 1600px)
      text-shadow: 0 0 3px rgba(0, 0, 0, .8)

    @media (max-width: 991px)
      width: 50%

    @media (max-width: 767px)
      width: 100%
      text-align: center
      padding-left: 0
      background: transparent

    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 25px
      height: 25px
      background: url('~assets/images/other/check.svg') left 3px no-repeat
      background-size: 21px
      pointer-events: none
      transition: all .3s ease

      @media (max-width: 767px)
        display: none

    &::after
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 25px
      height: 25px
      background: url('~assets/images/other/check_yellow.svg') left 3px no-repeat
      background-size: 21px
      pointer-events: none
      transition: all .3s ease
      opacity: 0

      @media (max-width: 767px)
        display: none

    &.active
      color: #d4d800

      &::before
        opacity: 0

      &::after
        opacity: 1

.js-slider-dr
  margin-bottom: 40px
  // .swiper-wrapper
  //   transform: translate3d(0px, 0, 0) !important

  .swiper-button-prev,
  .swiper-button-next
    width: 45px
    height: 45px
    background: rgba(53, 53, 53, 0.8) url('~assets/images/icons/icon-arrow-left.svg') no-repeat center
    z-index: 10
    background-size: 27px 44px
    opacity: 1 !important
    border-radius: 50%

  .swiper-button-next
    transform: rotate(-180deg)
    right: 30px

    @media (max-width: 767px)
      right: 10px

  .swiper-button-prev
    @media (max-width: 767px)
      left: 10px

  img,
  .img
    width: 100%

  .img
    height: 530px
    background-repeat: no-repeat
    background-position: center
    background-size: cover

    @media (max-width: 767px)
      height: 335px

  .info
    position: absolute
    bottom: 0
    left: 0
    right: 0
    padding: 20px
    z-index: 10

    @media (max-width: 767px)
      padding: 5px

    &:after
      content: ''
      position: absolute
      left: 0
      right: 0
      bottom: 0
      background-image: linear-gradient(to top, rgba(55, 53, 52, .8) 0%, rgba(55, 53, 52, 0) 100%)
      height: 150px
      z-index: 1

    p
      font-size: 49px
      font-family: 'Intro', sans-serif
      color: #fff
      line-height: 1.2
      text-align: center
      margin: 0 0 20px !important
      position: relative
      z-index: 2

      @media (max-width: 991px)
        font-size: 45px

      @media (max-width: 767px)
        font-size: 23px
</style>
