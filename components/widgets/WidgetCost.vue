<template lang="pug">
  .widget.widget--mini.bg-gray
    .container.relative
      .how_mutch
        .col-md-8.col-xs-12.how_mutch__left
          h1.widget__title(
            v-if = "name.tag === 'h1'"
            v-html = "name.title")

          h2.widget__title(
            v-if = "name.tag === 'h2'"
            v-html = "name.title")

          h3.widget__title(
            v-if = "name.tag === 'h3'"
            v-html = "name.title")

          p.widget__title(
            v-if = "name.tag === 'p'"
            v-html = "name.title")

        .col-md-4.col-xs-12.how_mutch__right(v-html = "content")

      .events__btn
        button(
          class = "btn btn-default"
          @click = "showModal(template, ['zabron', 'modal-order-event'])") {{ button.name }}
</template>

<script>
export default {
  props: ["name", "content", "button", "template"],
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

<style lang="sass">

.how_mutch
  display: flex
  flex-wrap: wrap

  @media (max-width: 991px)
    text-align: center

  &__right
    p
      font-family: 'Myriad Pro', sans-serif
      font-size: 25px
      line-height: 1.2
      text-align: left
      font-weight: 600

      @media (max-width: 991px)
        text-align: center
        font-size: 18px

    .price
      display: block
      font-size: 50px
      font-weight: 600
      font-family: 'Myriad Pro', sans-serif

      @media (max-width: 991px)
        font-size: 34px

    .text-gray
      color: #888

    .text-credit
      font-size: 17px
</style>
