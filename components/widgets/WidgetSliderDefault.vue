<template lang="pug">
  .widget.widget--mini(:class = "{ 'bg-gray': !gray }")
    .container
      h1.widget__title.text-center(
        v-if = "name.tag === 'h1' && name.title"
        v-html = "name.title")

      h2.widget__title.text-center(
        v-if = "name.tag === 'h2' && name.title"
        v-html = "name.title")

      h3.widget__title.text-center(
        v-if = "name.tag === 'h3' && name.title"
        v-html = "name.title")

      p.widget__title.text-center(
        v-if = "name.tag === 'p' && name.title"
        v-html = "name.title")

      .slider--we_do-nav(v-if = "template === 'rent_conference'")
        .item(
          :class = "{ 'active': activeIndex === 1 || activeIndex === 5 }"
          @click = "slideTo(1)") Общий стол<small>30 человек</small>
        .item(
          :class = "{ 'active': activeIndex === 2 }"
          @click = "slideTo(2)") Форма "П"<small>30 человек</small>
        .item(
          :class = "{ 'active': activeIndex === 3 }"
          @click = "slideTo(3)") Театр<small>60 человек</small>
        .item(
          :class = "{ 'active': activeIndex === 4 }"
          @click = "slideTo(4)") Банкет<small>50 человек</small>

      .slider--we_do-nav(v-if = "template === 'rent_studio'")
        .item(
          :class = "{ 'active': activeIndex === 1 }"
          @click = "slideTo(1)") Размер студий от 100 до 260 кв.м
        .item(
          :class = "{ 'active': activeIndex === 2 }"
          @click = "slideTo(2)") Удобное расположение в центре города
        .item(
          :class = "{ 'active': activeIndex === 3 }"
          @click = "slideTo(3)") До 350 гостей одновременно
        .item(
          :class = "{ 'active': activeIndex === 4 }"
          @click = "slideTo(4)") Панорамный вид на Москву

      ul.list-dr._wd(v-if = "wd")
        li(@click = "slideTo(1)")
          .icon
            img(
              src = "~assets/images/other/about/wd1.png"
              alt = "")
          | Кулинарные мастер-классы

        li(@click = "slideTo(2)")
          .icon
            img(
              src = "~assets/images/other/about/wd2.png"
              alt = "")
          | Тимбилдинги

        li(@click = "slideTo(3)")
          .icon
            img(
              src = "~assets/images/other/about/wd3.png"
              alt = "")
          | Дни рождения, семейные праздники

        li(@click = "slideTo(4)")
          .icon
            img(
              src = "~assets/images/other/about/wd4.png"
              alt = "")
          | Аренда конференц-зала

        li(@click = "slideTo(5)")
          .icon
            img(
              src = "~assets/images/other/about/wd5.png"
              alt = "")
          | Девичники

        li(@click = "slideTo(6)")
          .icon
            img(
              src = "~assets/images/other/about/wd6.png"
              alt = "")
          | Детские праздники

      //- icons

      .slider.slider--dr.js-slider-dr(
        v-swiper:swiper = "swiperOption"
        @slideChange = "changeSlide")
        .swiper-wrapper
          .swiper-slide.age(
            v-for = "item in items"
            :key = "item.id")

            img(
              :src = "item.image"
              alt = "item.name.title")

            .info(v-if = "item.content")
              p {{ item.content }}

        .swiper-button-prev(slot = "button-prev")
        .swiper-button-next(slot = "button-next")

      //- icons

      .list-dr(v-if = "icons")
        li(@click = "slideTo(1)")
          .icon
            img(
              src = "~assets/images/other/ico_ddr_1.png"
              alt = "")
          | Кулинарный мастер-класс

        li(@click = "slideTo(2)")
          .icon
            img(
              src = "~assets/images/other/dr5.png"
              alt = "")
          | Квесты и конкурсы

        li(@click = "slideTo(3)")
          .icon
            img(
              src = "~assets/images/other/ico_ddr_3.png"
              alt = "")
          | Шоу чокнутого профессора

        li(@click = "slideTo(4)")
          .icon
            img(
              src = "~assets/images/other/ico_ddr_4.png"
              alt = "")
          | Коктейльный мастер-класс

        li(@click = "slideTo(5)")
          .icon
            img(
              src = "~assets/images/other/dr6.png"
              alt = "")
          | Захватывающее пицца-шоу

        li(@click = "slideTo(6)")
          .icon
            img(
              src = "~assets/images/other/ico_ddr_6.png"
              alt = "")
          | Анимация, фокусники и многое другое

        li(@click = "slideTo(7)")
          .icon
            img(
              src = "~assets/images/other/dr8.png"
              alt = "")
          | DJ и дискотека

        li(@click = "slideTo(8)")
          .icon
            img(
              src = "~assets/images/other/dr2.png"
              alt = "")
          | Торт с любым оформлением

      .events__btn(v-if = "button.name")
        button(
          class = "btn btn-default"
          @click = "showModal(template, ['zabron', 'modal-order-event'])") {{ button.name }}
</template>

<script>
export default {
  props: ["name", "items", "button", "icons", "template", "gray", "wd"],
  data: () => ({
    swiperOption: {
      loop: true,
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

.slider--we_do-nav
  display: flex
  align-items: stretch
  justify-content: center

  .item
    flex: none
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    background-color: #f1f1f1
    border: 1px solid #ccc
    height: 70px
    font-size: 20px
    font-family: 'Intro', sans-serif
    color: #373534
    text-transform: uppercase
    cursor: pointer
    text-align: center
    transition: all .3s ease
    width: calc(100% / 4)

    @media (max-width: 991px)
      line-height: 14px
      font-size: 14px
      height: 50px

    @media (max-width: 767px)
      width: 100%
      display: none

    small
      display: block
      font-weight: 400
      text-transform: initial
      font-size: 18px
      font-family: 'Myriad Pro', sans-serif
      color: #373534
      line-height: 1.2
      text-align: center
      transition: all .3s ease

      @media (max-width: 991px)
        font-size: 12px

    &.active
      color: #fff
      background: #940084

      @media (max-width: 767px)
        display: flex

      small
        color: #fff

.list-dr
  display: flex
  flex-wrap: wrap
  margin-top: 10px
  padding: 0 20px
  list-style: none

  &._wd
    list-style: none
    padding: 0
    margin-top: -25px
    margin-bottom: 35px

    li
      width: 16.6666%
      margin-top: 25px
      font-size: 24px
      color: #373534
      line-height: 1.2
      text-align: center
      font-family: 'Myriad Pro Cond', sans-serif
      padding: 0 10px

      @media (max-width: 991px)
        width: 33.3333%
        font-size: 24px
        padding-left: 0

      @media (max-width: 480px)
        width: 50%

      .icon
        height: 75px
        width: 100%
        display: block
        position: static
        padding: 0
        transform: translate(0, 0)
        margin-bottom: 10px

        @media (max-width: 991px)
          width: initial

        img
          margin: 0 auto

          @media (max-width: 991px)
            max-height: initial;

  li
    font-family: 'Myriad Pro Cond', sans-serif
    width: 33.333%
    position: relative
    padding: 10px 0 10px 60px
    font-size: 24px
    color: #373534
    line-height: 1.2
    margin-top: 10px
    cursor: pointer

    @media (max-width: 991px)
      font-size: 14px
      padding-left: 35px

    @media (max-width: 767px)
      width: 100%

    .icon
      position: absolute
      top: 50%
      left: 0
      width: 60px
      padding-right: 10px
      transform: translate(0, -50%)

      @media (max-width: 991px)
        width: 35px

      img
        @media (max-width: 991px)
          max-height: 25px

.js-slider-dr
  // .swiper-wrapper
  //   transform: translate3d(0px, 0, 0) !important

  .swiper-button-prev,
  .swiper-button-next
    width: 37px
    height: 70px
    background: url('~assets/images/other/arrow-prev-white.png') no-repeat
    z-index: 10
    background-size: cover
    background-color: transparent !important
    opacity: 1 !important
    margin-top: -35px
    pointer-events: all !important
    cursor: pointer !important

    @media (max-width: 767px)
      width: 22px
      height: 40px
      top: 50%

  .swiper-button-next
    transform: rotate(-180deg)
    right: 30px

    @media (max-width: 767px)
      right: 10px

  .swiper-button-prev
    @media (max-width: 767px)
      left: 10px

  img
    width: 100%

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
      font-size: 40px
      font-family: 'Intro', sans-serif
      color: #fff
      line-height: 1.2
      text-align: center
      margin: 0 !important
      position: relative
      z-index: 2

      @media (max-width: 991px)
        font-size: 30px

      @media (max-width: 767px)
        font-size: 18px
</style>
