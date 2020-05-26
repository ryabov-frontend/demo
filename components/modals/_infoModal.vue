<template lang="pug">
  .modal-content--inner(:class = "{ 'error': errorClass }")
    button(
      type = "button"
      class = "modal-close"
      data-dismiss = "modal"
      aria-label = "Закрыть"
      @click = "$parent.closeModal")

      | <svg class="icon icon-modal-close"><use xlink:href="#icon-modal-close"></use></svg>

    p.modal-title(v-html = "text")

    .row
      .col-xs-12.text-center
        button(
          class = "btn btn-default _medium _full"
          @click.prevent = "$parent.closeModal") Ok
</template>

<script>
export default {
  props: ['text', 'errorClass'],
  created() {
    this.$store.dispatch('updateCartShow', false)
  }
}
</script>

<style lang="sass" scoped>

.modal-content--inner
  margin: -15px 0

  .modal-title
    text-align: center
    margin-bottom: 30px

  .btn
    width: 150px

  &.error
    .modal-title
      color: red
</style>
