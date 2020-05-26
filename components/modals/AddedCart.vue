<template lang="pug">
  .modal-content--inner
    button(
      type = "button"
      class = "modal-close"
      data-dismiss = "modal"
      aria-label = "Закрыть"
      @click = "$parent.closeModal")

      | <svg class="icon icon-modal-close"><use xlink:href="#icon-modal-close"></use></svg>

    p.modal-title(v-html = "data.response.msg")

    .row
      .col-md-offset-3.col-sm-6.col-xs-12
        button(
          class = "btn btn-default _medium _green"
          @click.prevent = "goCart") Оформить заказ

    p.text-center
      a(
        href = "javascript: void(0);"
        style = "color: #333333"
        @click.prevent = "$parent.closeModal") Продолжить покупки
</template>

<script>
export default {
  props: ["data"],
  methods: {
    goCart() {
      this.$parent.closeModal()
      this.$router.push('/shop/cart')
    }
  }
}
</script>

<style lang="sass" scoped>

.text-center
  margin-bottom: 0px
  padding-top: 15px

  a
    font-size: 18px
</style>
