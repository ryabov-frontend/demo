<template lang="pug">
  .widget.widget--features
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

      .events__block
        .events__item
          .events__item-content
            span.events__item-title Встречаем гостей, Надеваем фартуки и моем руки
            hr.events__item-hr
            ul.events__item-list
              li
                span.icon
                  img(
                    src = "~assets/images/other/icon3.png"
                    alt = "")
                | Приветственный фуршет

              li
                span.icon
                  img(
                    src = "~assets/images/other/icon2.png"
                    alt = "")
                | Welcome напитки

          span.events__item-dot
          span.events__item-time 18:00

        .events__item
          .events__item-content
            span.events__item-title Начало мероприятия: готовим и дегустируем 3 блюда с шефом
            hr.events__item-hr
            ul.events__item-list
              li
                span.icon
                  img(
                    src = "~assets/images/other/icon5.png"
                    alt = "")
                | Винные дегустации

              li
                span.icon
                  img(
                    src = "~assets/images/other/icon4.png"
                    alt = "")
                | Викторины и конкурсы

              li
                span.icon
                  img(
                    src = "~assets/images/other/icon2.png"
                    alt = "")
                | Коктейльный мастер-класс

          span.events__item-dot
          span.events__item-time 18:30

        .events__item
          .events__item-content
            span.events__item-title Вкусный ужин с изысканным вином и развлечениями
            hr.events__item-hr
            ul.events__item-list
              li
                span.icon
                  img(
                    src = "~assets/images/other/icon7.png"
                    alt = "")
                | Танцевальный мастер-класс

              li
                span.icon
                  img(
                    src = "~assets/images/other/icon8.png"
                    alt = "")
                | Караоке

              li
                span.icon
                  img(
                    src = "~assets/images/other/icon9.png"
                    alt = "")
                | Квесты

          span.events__item-dot
          span.events__item-time 20:30

        .events__item
          .events__item-content
            span.events__item-title Завершение<br>веселого кулинарного мероприятия
            hr.events__item-hr
            ul.events__item-list
              li
                span.icon
                  img(
                    src = "~assets/images/other/icon11.png"
                    alt = "")
                | Групповое фото

              li
                span.icon
                  img(
                    src = "~assets/images/other/icon10.png"
                    alt = "")
                | Памятные дипломы

          span.events__item-dot
          span.events__item-time 21:30

      .events__btn
        button(
          class = "btn btn-default"
          @click = "showModal(template, ['zabron', 'modal-order-event'])") {{ button.name }}
</template>

<script>
export default {
  props: ["name", "button", "template"],
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

.events
  &__block
    max-width: 880px
    display: flex
    flex-wrap: wrap
    margin: 0 auto
    padding-bottom: 70px
    position: relative

    @media (max-width: 991px)
      flex-direction: column
      padding-left: 140px
      padding-bottom: 0

    &::before
      content: ''
      position: absolute
      bottom: 41px
      height: 5px
      left: 0
      right: 0
      background: url('~assets/images/other/events_dots.svg') repeat-x

      @media (max-width: 991px)
        width: 5px
        bottom: 0
        top: 0
        height: auto
        right: initial
        left: calc(50% - 65px)
        background: url('~assets/images/other/events_dots-v.svg') repeat-y

  &__item
    margin: 0 7px
    width: calc(25% - 14px)
    border: 1px solid #940084
    background-color: #fff
    padding: 9px
    position: relative
    border-radius: 12px

    @media (max-width: 991px)
      width: 100%
      max-width: 210px
      margin: 0 auto 10px

    &::before
      content: ''
      position: absolute
      left: 0
      right: 0
      top: 100%
      width: 0
      margin: 0 auto
      border-top: 10px solid #940084
      border-left: 18px solid transparent
      border-right: 18px solid transparent
      z-index: 1

      @media (max-width: 991px)
        top: 50%
        transform: translate(0, -50%)
        right: 100%
        left: initial
        border-left: initial
        border-right: 10px solid #940084
        border-top: 18px solid transparent
        border-bottom: 18px solid transparent

    &::after
      content: ''
      position: absolute
      left: 0
      right: 0
      top: calc(100% - 1px)
      width: 0
      margin: 0 auto
      border-top: 10px solid #fff
      border-left: 18px solid transparent
      border-right: 18px solid transparent
      z-index: 2

      @media (max-width: 991px)
        top: 50%
        transform: translate(0, -50%)
        right: calc(100% - 1px)
        left: initial
        border-left: initial
        border-right: 10px solid #fff
        border-top: 18px solid transparent
        border-bottom: 18px solid transparent

    &-list
      li
        font-family: 'Myriad Pro Cond', sans-serif
        position: relative
        font-size: 18px
        color: #373534
        line-height: 1
        padding: 7px 0 7px 40px

        .icon
          position: absolute
          top: 50%
          left: 0
          width: 40px
          padding-right: 10px
          text-align: center
          transform: translate(0, -50%)

    &-hr
      margin: 4px 0
      height: 3px
      border: 0
      display: block
      background: url('~assets/images/other/events_hr.svg') repeat-x

    &-title
      font-family: 'Myriad Pro Cond', sans-serif
      display: block
      font-size: 18px
      color: #373534
      font-weight: 700
      line-height: 1.333
      text-align: center
      padding: 0 10px

    &-dot
      position: absolute
      top: calc(100% + 20px)
      left: 0
      right: 0
      margin: 0 auto
      border-radius: 50%
      background-color: #940084
      width: 14px
      height: 14px

      @media (max-width: 991px)
        top: 50%
        transform: translate(0, -50%)
        right: calc(100% + 20px)
        left: initial

    &-time
      position: absolute
      top: calc(100% + 40px)
      left: 0
      right: 0
      font-size: 30px
      font-family: 'Intro', sans-serif
      color: #940084
      line-height: 1.333
      text-align: center

      @media (max-width: 991px)
        top: 50%
        transform: translate(0, -50%)
        right: calc(100% + 40px)
        left: initial
</style>
