<template lang="pug">
  .widget.widget--mini.no-pd-top
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

      .formula-inner
        .d-flex
          .element.pink(data-type = "+")
            .ico.circle
              img(
                src = "~assets/images/other/food.png"
                alt = "")

            .text 1. Выбери<br>меню из<br>трех блюд

          .element.blue(data-type = "+")
            .ico.circle
              img(
                src = "~assets/images/other/disco-ball.png"
                alt = "")

            .text 2. Выбери<br>Дополнительные<br>активности

          .element.green(data-type = "=")
            .ico.circle
              img(
                src = "~assets/images/other/dance.png"
                alt = "")

            .text 3. Собери<br>друзей

          .element
            .ico
              img(
                src = "~assets/images/other/cake.png"
                alt = "")

            .text Лучший<br>день<br>рождения

      hr
</template>

<script>
export default {
  props: ["name"]
}
</script>

<style lang="sass" scoped="">

.formula-inner
  padding-bottom: 50px

  @media screen and (max-width: 1200px)
    padding-bottom: 0px
    margin-bottom: 0px

  .d-flex
    display: flex !important

    @media screen and (max-width: 1200px)
      flex-direction: column
      align-items: center

  .element
    position: relative
    padding-right: 60px
    flex: 1
    display: flex
    align-items: center

    @media screen and (max-width: 1200px)
      flex: auto
      padding-right: 0
      padding-bottom: 80px

    &::after
      content: attr(data-type)
      position: absolute
      font-size: 84px
      top: 50%
      right: 0
      color: #a8a8a8
      line-height: 104px
      transform: translate(-20%, -50%)

      @media screen and (max-width: 1200px)
        content: attr(data-type)
        position: absolute
        font-size: 84px
        bottom: -10px
        left: 50%
        right: unset
        top: unset
        color: #dcdcdc
        line-height: 104px
        transform: translate(-50%, 0%)

    .ico
      flex: 0 0 85px
      height: 85px
      width: 85px
      margin-right: .5rem
      display: flex
      align-items: center
      justify-content: center

      &.circle
        padding: 15px
        border-radius: 50%
        border: 2px solid #000

    .text
      font-size: 18px
      font-family: 'Intro'

    &.pink
      .ico.circle
        border-color: #e61676

      .text
        color: #e61676

    &.blue
      .ico.circle
        border-color: #00afda

      .text
        color: #00afda

    &.green
      .ico.circle
        border-color: #d4d800

      .text
        color: #d4d800
</style>
