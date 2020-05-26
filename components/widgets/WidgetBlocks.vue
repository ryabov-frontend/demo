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

      .order-columns
        .row
          .col-lg-4.col-md-6(
            v-for = "item in items"
            :key = "item.id")

            .element(v-if = "!item.content")
              img(
                :src = "item.image"
                alt = "")

              div.title(
                v-if = "item.name.tag === 'div'"
                v-html = "item.name.title")

              p.title(
                v-if = "item.name.tag === 'p'"
                v-html = "item.name.title")

            .element(v-if = "item.content")
              a(
                :href = "item.content"
                target = "_blank")

                img(
                  :src = "item.image"
                  alt = "")

                div.title(
                  v-if = "item.name.tag === 'div'"
                  v-html = "item.name.title")

                p.title(
                  v-if = "item.name.tag === 'p'"
                  v-html = "item.name.title")

      .events__btn
        button(
          class = "btn btn-default"
          @click = "showModal(template, ['zabron', 'modal-order-event'])") Оставить заявку
</template>

<script>
export default {
  props: ["name", "items", "template"],
  data: () => ({
    swiperOption: {
      loop: false,
      centeredSlides: true,
      spaceBetween: 0,
      slidesPerView: 4,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  }),
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

.order-columns
  .element
    position: relative
    margin-bottom: 2rem

    .title
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      background-color: rgba(0, 0, 0, .7)
      color: #fff
      text-align: center
      font-family: 'Intro'
      font-weight: 700
      font-size: 19px
      padding: 5px 10px
      margin: 0
</style>
