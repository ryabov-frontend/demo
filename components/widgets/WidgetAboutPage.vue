<template lang="pug">
  div
    .widget.widget--mini.bg-gray
      .container.relative
        h3.widget__title.text-center <span class="text-default">CulinaryOn</span> в цифраx <span class="widget__title-default">5 крупных городов</span>

        .map
          .text-center
            img(
              src = "~assets/images/other/map_about.png"
              alt = "")

            .map-item.item-1 Санкт-Петербург
            .map-item.item-2 Москва
            .map-item.item-3 Бухарест
            .map-item.item-4 Сингапур

        h4.widget__title.text-center В москве

        .places
          .places__col
            img(
              src = "~assets/images/other/places_metro.png"
              alt = "")

          .places__col
            span.places__item
              span.places__number 8
              span.places__text Кулинарных студий

          .places__col
            span.places__item
              span.places__number 1
              span.places__text конференц зал

    .widget.widget--standard
      .container.relative
        .text-center.g-icons
          .col-md-3.col-xs-6
            .g-icons__first
              .g-icons__first-1 от
              .g-icons__first-2 50
              .g-icons__first-3 мастер классов в месяц
            img(
              src = "~assets/images/other/g_icon_1.png"
              alt = "")

          .col-md-3.col-xs-6
            .g-icons__second
              .g-icons__second-1 более
              .g-icons__second-2 60
              .g-icons__second-3 шеф-поваров
            img(
              src = "~assets/images/other/g_icon_2.png"
              alt = "")

          .col-md-3.col-xs-6
            .g-icons__three
              .g-icons__three-1 <span>до</span>250
              .g-icons__three-2 гостей на
              .g-icons__three-3 мероприятии одновременно
            img(
              src = "~assets/images/other/g_icon_3.png"
              alt = "")

          .col-md-3.col-xs-6
            .g-icons__four
              .g-icons__four-1 более
              .g-icons__four-2 300
              .g-icons__four-3 лучших блюд<br>со всего мира
            img(
              src = "~assets/images/other/g_icon_4.png"
              alt = "")

        .g-icons__footer
          nuxt-link(
            to = "/calendar/"
            class = "btn btn-default") Записаться на мастер-класс

          button(
            class = "btn btn-default"
            @click = "showModal('header', ['zabron', 'modal-order-event'])") Заказать мероприятие
</template>

<script>
export default {
  methods: {
    showModal(place, analytic) {
      this.$store.dispatch("showModal", {
        place: place,
        analytic: analytic
      })
    }
  }
}
</script>

<style lang="sass" scoped>

.g-icons__footer
  .btn
    &:first-child
      @media (max-width: 767px)
        margin: 0 auto 10px !important

.map
  position: relative

  &-item
    position: absolute
    top: 0
    left: 0
    font-family: 'Intro', sans-serif
    font-size: 18px
    font-weight: 700

    @media (max-width: 1259px)
      font-size: 17px

    @media (max-width: 991px)
      font-size: 13px

    @media (max-width: 767px)
      font-size: 10px

    &::before
      content: ''
      position: absolute
      bottom: 13px
      left: -64px
      width: 97px
      height: 75px
      background-repeat: no-repeat
      background-position: center
      background-size: contain
      pointer-events: none

      @media (max-width: 1259px)
        bottom: 12px
        left: -59px
        height: 68px
        width: 87px

      @media (max-width: 991px)
        bottom: 8px
        left: -42px
        height: 51px
        width: 63px

      @media (max-width: 767px)
        bottom: 7px
        left: -28px
        height: 33px
        width: 41px

    &.item-1
      color: #ffd200
      left: 35%
      top: 17%

      @media (max-width: 1259px)
        left: 33%

      &::before
        background-image: url('~assets/images/other/map-item-1.png')

    &.item-2
      color: #e94f0a
      left: 31.5%
      top: 25%

      @media (max-width: 1259px)
        left: 29.5%

      &::before
        background-image: url('~assets/images/other/map-item-2.png')

    &.item-3
      color: #e61676
      left: 26.5%
      top: 39%

      @media (max-width: 1259px)
        left: 23.5%

      &::before
        background-image: url('~assets/images/other/map-item-3.png')

    &.item-4
      color: #00afda
      left: 70.5%
      top: 92%

      @media (max-width: 1259px)
        left: 74%

      &::before
        left: -60px
        background-image: url('~assets/images/other/map-item-4.png')

        @media (max-width: 1259px)
          left: -57px

        @media (max-width: 991px)
          left: -41px

        @media (max-width: 767px)
          left: -27px

.places
  display: flex
  align-items: center
  flex-wrap: wrap
  width: 100%

  &__col
    width: 33.3333%
    display: inline-flex
    align-items: center
    justify-content: center
    padding: 0 16px

    @media (max-width: 767px)
      width: 100%
      margin-top: 25px

      &:last-child
        margin-bottom: 0

  &__item
    display: inline-flex
    align-items: center
    justify-content: center

  &__number
    font-size: 135px
    font-family: 'Intro', sans-serif
    color: #e94f0a
    line-height: 0
    margin-top: 20px

    @media (max-width: 991px)
      font-size: 80px
      margin-top: 5px

  &__text
    font-family: 'Intro', sans-serif
    font-size: 30px
    font-weight: 700
    color: #e38100
    line-height: 1.2
    padding-left: 10px
    max-width: 160px

    @media (max-width: 991px)
      font-size: 18px

.g-icons
  display: flex
  align-items: center
  flex-wrap: wrap
  margin-top: -25px

  & > div
    margin-top: 25px
    display: inline-flex
    align-items: center
    position: relative

  &__first
    position: absolute
    top: 0
    left: 55px
    width: 112px

    @media (max-width: 767px)
      left: 0
      width: 100%
      padding: 0 25%

    &-1
      font-family: 'Intro', sans-serif
      font-size: 30px
      font-weight: 700
      color: #fff
      padding-top: 62px
      line-height: 1

      @media (max-width: 767px)
        font-size: 20px
        padding-top: 46px

    &-2
      font-family: 'Intro', sans-serif
      font-size: 60px
      font-weight: 700
      color: #fff
      line-height: 1

      @media (max-width: 767px)
        font-size: 40px
        padding-top: 5px

    &-3
      font-family: 'Intro', sans-serif
      font-size: 18px
      font-weight: 700
      color: #fff
      text-align: left
      line-height: 1.2

      @media (max-width: 767px)
        font-size: 14px

  &__second
    position: absolute
    top: 0
    left: 15px
    width: 150px

    @media (max-width: 767px)
      left: 0
      width: 100%
      padding: 0 25%

    &-1
      font-family: 'Intro', sans-serif
      font-size: 30px
      font-weight: 700
      color: #e94f0a
      padding-top: 120px
      line-height: 1

      @media (max-width: 767px)
        font-size: 20px
        padding-top: 110px

    &-2
      font-family: 'Intro', sans-serif
      font-size: 60px
      font-weight: 700
      color: #e94f0a
      line-height: 1
      padding-top: 3px

      @media (max-width: 767px)
        font-size: 40px

    &-3
      font-family: 'Intro', sans-serif
      font-size: 18px
      font-weight: 700
      color: #e94f0a
      line-height: 1.2

      @media (max-width: 767px)
        font-size: 14px

  &__three
    position: absolute
    top: 0
    left: 15px
    width: 155px

    @media (max-width: 767px)
      left: 0
      width: 100%
      padding: 0

    &-1
      font-family: 'Intro', sans-serif
      font-size: 61px
      font-weight: 700
      color: #00afda
      line-height: 1
      white-space: nowrap

      @media (max-width: 767px)
        font-size: 41px

      span
        font-family: 'Intro', sans-serif
        font-size: 18px
        font-weight: 700
        color: #00afda
        text-align: left
        line-height: 1.2
        padding-right: 7px

    &-2
      font-family: 'Intro', sans-serif
      font-size: 26px
      font-weight: 700
      color: #00afda
      line-height: 1
      padding-top: 7px

      @media (max-width: 767px)
        font-size: 22px

    &-3
      font-family: 'Intro', sans-serif
      font-size: 18px
      font-weight: 700
      color: #00afda
      line-height: 1.4
      padding-top: 7px

      @media (max-width: 767px)
        font-size: 14px

  &__four
    position: absolute
    top: 0
    left: 12px
    width: 171px

    @media (max-width: 767px)
      left: 0
      width: 100%
      padding: 0

    &-1
      font-family: 'Intro', sans-serif
      font-size: 30px
      font-weight: 700
      color: #fff
      padding-top: 45px
      line-height: 1

      @media (max-width: 767px)
        font-size: 20px
        padding-top: 40px

    &-2
      font-family: 'Intro', sans-serif
      font-size: 73px
      font-weight: 700
      color: #e61676
      line-height: 1
      padding-top: 10px

      @media (max-width: 767px)
        font-size: 53px

    &-3
      font-family: 'Intro', sans-serif
      font-size: 18px
      font-weight: 700
      color: #e61676
      line-height: 1.1

      @media (max-width: 767px)
        font-size: 14px

  &__footer
    margin-top: 40px
    text-align: center

    .btn
      text-align: center
      margin: 0 18px
      font-size: 16px
      min-width: 350px
      height: 60px
      line-height: 60px
      border-radius: 30px

      @media (max-width: 991px)
        margin: 0 10px
        height: 50px
        line-height: 50px
        border-radius: 25px
        font-size: 14px
        min-width: 300px
</style>
