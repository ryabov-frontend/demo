<template lang="pug">
  .widget.widget--tripa(:class = "[ gradient ]")
    .container(v-if = "!gradient")
      p.widget__title.text-center <span class="text-default">Отзывы</span> c tripadvisor
      .flex
        .left
          img(
            :src = "image"
            alt = "TripAdvisor")

          span.label.visible-sm {{ label }}

          a(
            target = "_blank"
            rel = "nofollow"
            class = "more hidden-xs hidden-sm"
            :href = "link") Больше отзывов на TripAdvisor &gt;

        .right
          span.label.hidden-sm {{ label }}

          .description(v-html = "text")

          a(
            target = "_blank"
            rel = "nofollow"
            class = "more visible-xs visible-sm"
            :href = "link") Больше отзывов на TripAdvisor &gt;

    .container(v-if = "gradient")
      img(
        class = "trip_a-logo lazyload lazy-loaded"
        :data-src = "image"
        alt = "TripAdvisor"
        :src = "image"
        v-if = "image")

      .trip_a-content
        p.widget__title.text-white
          | <span class="text-yellow">СЕРТИФИКАТ КАЧЕСТВА</span> tripadvisor
        div
          p {{ label }}

          a(
            target = "_blank"
            rel = "nofollow"
            :href = "link")
              br

          a(
            target = "_blank"
            rel = "nofollow"
            :href = "link") посмотреть отзывы Tripadvisor
</template>

<script>
export default {
  props: ["label", "text", "link", "image", "gradient"]
}
</script>

<style lang="sass">

.widget--tripa
  background: #fdfdfd
  padding: 30px 0 52px

  @media (max-width: 1259px)
    padding: 65px 0

  @media (max-width: 767px)
    padding: 45px 0

  .name
    font-size: 24px
    line-height: 1.5
    text-align: left
    text-transform: uppercase
    display: block
    color: #373534
    letter-spacing: .3px

    @media (max-width: 1259px)
      font-size: 18px
      width: 100%
      text-align: center

  .flex
    display: flex
    flex-wrap: wrap
    align-items: flex-start

  .left
    width: 100%
    max-width: 400px
    text-align: center

    @media (max-width: 1259px) and (min-width: 768px)
      display: flex
      align-items: center

    @media (max-width: 1259px)
      max-width: 100%

  .right
    width: 100%
    max-width: calc(100% - 400px)
    padding-left: 6px

    @media (max-width: 1259px)
      max-width: 100%

  .label
    font-size: 20px
    color: #d4d800
    line-height: 1.5
    text-align: left
    display: block
    margin-bottom: 25px
    white-space: inherit
    padding: 0

    @media (max-width: 1259px)
      font-size: 16px
      line-height: 24px

  .description
    font-size: 20px
    line-height: 1.5
    text-align: left
    display: block
    color: #373534
    margin: 0
    letter-spacing: .3px

    @media (max-width: 1259px)
      font-size: 16px
      line-height: 24px

    p
      font-size: 20px
      line-height: 1.5

      @media (max-width: 1259px)
        font-size: 16px
        line-height: 24px

  .more
    font-family: 'Myriad Pro Cond', sans-serif
    display: inline-block
    margin: 26px auto 0
    letter-spacing: .9px
    font-size: 24px
    color: #940084
    text-decoration: underline
    line-height: 1
    text-align: center

  &.gradient-v
    padding: 55px 0

    @media (max-width: 1259px)
      padding: 65px 0

    p
      &:not(.widget__title)
        font-size: 18px
        color: #fff
        line-height: 1.444

    a
      font-family: 'Intro', sans-serif
      font-size: 16px
      line-height: 17px
      border-bottom: 1px solid
      color: #fff

      &:hover
        color: #e6e6e6

    .container
      display: flex
      flex-wrap: wrap
      align-items: flex-start

    .trip_a-logo
      width: 190px

      @media (max-width: 991px)
        width: 140px

      @media (max-width: 767px)
        margin-left: auto
        margin-right: auto

    .trip_a-content
      width: calc(100% - 190px)
      padding-left: 60px

      @media (max-width: 991px)
        width: 100%
        padding-left: 0
        position: relative
        padding-top: 40px

      @media (max-width: 767px)
        padding-top: 25px
        text-align: center

      .widget__title
        @media (max-width: 991px)
          position: absolute
          top: -110px
          left: 175px
          font-size: 40px
          line-height: 1.2

        @media (max-width: 767px)
          position: static
          font-size: 25px
</style>
