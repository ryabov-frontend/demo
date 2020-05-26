<template lang="pug">
  .widget.widget--mini.bg-gray
    .container.relative
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

      .info-card__icons
        img(
          class = "icon1"
          src = "~assets/images/other/1.svg"
          alt = "")

        img(
          class = "icon2"
          src = "~assets/images/other/2.svg"
          alt = "")

        img(
          class = "icon3"
          src = "~assets/images/other/3.svg"
          alt = "")

        img(
          class = "icon4"
          src = "~assets/images/other/4.svg"
          alt = "")

        img(
          class = "icon5"
          src = "~assets/images/other/5.svg"
          alt = "")

        img(
          class = "icon6"
          src = "~assets/images/other/6.svg"
          alt = "")

      .carousel-wrapper.visible-xs
        client-only
          carousel(v-bind = "optionsCarousel")

            slide(
              v-for = "(item, i) in items"
              :key = "item.id")

              .info-card
                .info-card__thumb(:style = "{ backgroundImage: 'url(' + item.image + ')' }")
                .info-card__title(v-html = "item.name.title")

      .info-card__container.hidden-xs
        .info-card(
          v-for = "item in items"
          :key = "item.id")

          .info-card__thumb(:style = "{ backgroundImage: 'url(' + item.image + ')' }")

          span.info-card__title(v-html = "item.name.title")

</template>

<script>
export default {
  props: ["name", "items"],
  data: () => ({
    optionsCarousel: {
      loop: true,
      perPage: 1,
      paginationEnabled: false,
      centerMode: true,
      mouseDrag: true,
      touchDrag: true,
      navigationEnabled: true,
      scrollPerPage: false
    }
  })
}
</script>

<style lang="sass" scoped>

.container
  padding-left: 10px
  padding-right: 10px

.slider--info-card
  position: relative
  z-index: 2
  margin: 0 -40px

.info-card
  &__container
    display: flex
    justify-content: center
    flex-wrap: wrap
    margin: 0 -40px
    padding-top: 20px
    padding-bottom: 40px
    position: relative
    z-index: 2
    margin-top: -60px

    @media (max-width: 1259px)
      margin: 0 -13px

  &__icons
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    z-index: 1

    .icon1
      width: 152px
      height: 99px
      top: 50px
      position: absolute
      left: -26px
      transform: rotate(-10deg)

      @media (max-width: 991px)
        width: 83px
        height: 54px
        left: 10px

      @media (max-width: 767px)
        width: 128px
        height: 84px
        left: -7%
        top: 12%

    .icon2
      width: 228px
      height: 172px
      bottom: -36px
      position: absolute
      left: 184px
      transform: rotate(-210deg)

      @media (max-width: 991px)
        width: 124px
        height: 94px
        left: 131px
        bottom: 10px

      @media (max-width: 767px)
        width: 193px
        height: 146px
        bottom: -21px
        left: 170px

    .icon3
      width: 130px
      height: 185px
      position: absolute
      top: 120px
      left: 326px
      transform: rotate(-144deg)

      @media (max-width: 991px)
        width: 70px
        height: 100px
        top: 100px
        left: 218px

      @media (max-width: 767px)
        width: 109px
        height: 156px
        top: 30%
        left: 75%

    .icon4
      width: 103px
      height: 231px
      position: absolute
      top: 60px
      left: 736px
      transform: rotate(-18deg)

      @media (max-width: 991px)
        width: 56px
        height: 125px
        position: absolute
        top: 60px
        left: 454px

      @media (max-width: 767px)
        display: none

    .icon5
      width: 145px
      height: 124px
      position: absolute
      bottom: -5px
      left: 795px
      transform: rotate(-38deg)

      @media (max-width: 991px)
        width: 79px
        height: 67px
        position: absolute
        bottom: 15px
        left: 484px

      @media (max-width: 767px)
        display: none

    .icon6
      width: 101px
      height: 168px
      position: absolute
      top: 50px
      right: -30px
      transform: rotate(-28deg)

      @media (max-width: 991px)
        width: 55px
        height: 91px
        top: 50px
        right: 20px

      @media (max-width: 767px)
        display: none

.info-card
  margin: 0 40px
  background: #fff
  padding: 18px
  box-shadow: 0 2px 25px 0 rgba(55, 53, 52, .2)
  margin-top: 60px
  width: calc(33.3333% - 80px)

  @media (max-width: 1259px)
    padding: 10px
    margin: 0 13px
    margin-top: 30px
    width: calc(33.3333% - 26px)

  @media (max-width: 767px)
    width: calc(100% - 54px)
    margin-left: auto !important
    margin-right: auto !important
    margin-bottom: 40px

  &__thumb
    height: 270px
    width: 100%
    background-size: cover
    background-repeat: no-repeat
    background-position: center
    margin-bottom: 12px

    @media (max-width: 1259px)
      height: 240px

    @media (max-width: 991px)
      height: 150px

    @media (max-width: 767px)
      height: 320px

  &__title
    font-size: 24px
    font-family: 'FiveMinutes', sans-serif
    color: #373534
    line-height: 1
    text-align: center
    display: flex
    width: 100%
    align-items: center
    justify-content: center
    min-height: 48px
    margin-bottom: -12px
    margin-top: -4px

    @media (max-width: 1259px)
      margin-bottom: -4px

    @media (max-width: 991px)
      font-size: 17px
      line-height: 1.4

</style>
