<template lang="pug">
  .widget.widget--mini
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

      .slider.slider--as.wedding-slider.list-as._standard-arrows(
        :class = "{ 'mini': mini }"
        v-swiper:swiper="swiperOption")

        .swiper-wrapper
          .swiper-slide.list-as__item(
            v-for = "item in items"
            :key = "item.id")

            .list-as__icon
              img(
                :src = "item.image"
                alt = "")

            .list-as__title(
              :class = "{ 'mini': mini }"
              v-html = "item.name.title")

            .list-as__price(
              v-if = "item.content"
              v-html = "item.content")

      .events__btn
        button(
          class = "btn btn-default"
          @click = "showModal(template, ['zabron', 'modal-order-event'])") {{ button.name }}
</template>

<script>
export default {
  props: ["name", "items", "button", "mini", "template"],
  data: () => ({
    swiperOption: {
      loop: false,
      centeredSlides: true,
      spaceBetween: 0,
      slidesPerView: 5,
      allowTouchMove: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  }),
  created() {
    this.swiperOption.slidesPerView = this.mini ? 5 : 2
  },
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

.list-as
  display: flex
  justify-content: center

  &__item
    width: calc(100% / 4) !important
    text-align: center

  &__icon
    display: flex
    align-items: center
    justify-content: center
    height: 105px
    margin-bottom: 10px

  &__title
    display: block
    font-size: 40px
    font-family: 'Myriad Pro Cond', sans-serif
    color: #373534
    text-transform: uppercase
    line-height: 1

    &.mini
      font-size: 17px

  &.mini
    .swiper-wrapper
      transform: translate3d(0px, 0, 0) !important

  &:not(.mini)
    .list-as__item
      width: 300px !important

  &__price
    font-size: 31px
    color: #373534
    line-height: 1

  &.wedding-slider
    justify-content: space-around
</style>
