<template lang="pug">
  .widget
    .container
      h3.widget__title.hidden-md.hidden-sm.text-center Что мы <span class="text-default">делаем?</span>

      .service-list
        .service-item.widget__title.hidden-xs.hidden-lg Что мы <span class="text-default">делаем?</span>

        nuxt-link(
          to = "/calendar"
          class = "service-item")

          .service-item__thumb(style="background-image: url('/uploads/cache/MenuItems/MenuItem114/1cc05adee1-1.jpg')")

          p.service-item__title Кулинарные  мастер-классы

        a(
          href = "http://events.culinaryon.ru/korporativnyie-meropriyatiya"
          class = "service-item")

          .service-item__thumb(style="background-image: url('/uploads/cache/MenuItems/MenuItem115/59eeecc5b4-1.jpg')")

          p.service-item__title Корпоративы и праздники

        nuxt-link(
          to = "/bdays"
          class = "service-item")

          .service-item__thumb(style="background-image: url('/uploads/cache/MenuItems/MenuItem116/c20b06a274-1.jpg')")

          p.service-item__title Веселые дни рождения

        nuxt-link(
          to = "/detskie-prazdniki"
          class = "service-item")

          .service-item__thumb(style="background-image: url('/uploads/cache/MenuItems/MenuItem117/52ddff790a-1.jpg')")

          p.service-item__title Детские праздники
</template>

<script>
export default {
  props: ["title", "list"]
}
</script>

<style lang="sass" scoped>

.service-list
  margin: -15px -7.5px 0
  display: flex
  flex-wrap: wrap

  .service-item
    margin: 15px 7.5px 0
    max-width: 330px
    width: calc(25% - 18px)
    border: 1px solid #e8e8e8
    border-radius: 5px
    background-color: #fff
    padding: 12px 12px 34px
    box-shadow: 0 4px 13px 0 rgba(57, 57, 57, .1)
    transition: all .3s ease
    display: inline-flex
    flex-wrap: wrap

    @media (max-width: 1259px)
      width: calc(33.3333% - 18px)

    @media (max-width: 767px)
      width: calc(50% - 18px)
      margin-left: auto
      margin-right: auto

    &__thumb
      width: 100%
      min-height: 185px
      border-radius: 5px
      background-position: center
      background-repeat: no-repeat
      background-size: cover

      @media (max-width: 767px)
        width: 100%
        min-height: 138px
        border-radius: 5px
        background-position: center
        background-repeat: no-repeat
        background-size: cover

    &__title
      display: block
      padding: 0 20px
      font-size: 23px
      color: #940084
      margin: 24px 0 0
      font-weight: 700
      text-align: center
      text-transform: uppercase
      transition: all .3s ease
      width: 330px

      @media (max-width: 991px)
        padding: 0 15px
        font-size: 12px

    &.widget__title
      margin: auto 7.5px
      border: 0
      padding: 0
      background: transparent
      box-shadow: none

    &:hover
      box-shadow: 0 18px 35px 0 rgba(57, 57, 57, .2)
      text-decoration: none

      .service-item__title
        color: #B01FA1
</style>
