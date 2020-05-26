<template lang="pug">
  .modal-content--inner
    button(
      type = "button"
      class = "modal-close"
      data-dismiss = "modal"
      aria-label = "Закрыть"
      @click = "$parent.closeModal")

      | <svg class="icon icon-modal-close"><use xlink:href="#icon-modal-close"></use></svg>

    p.modal-date
      span {{ $moment.unix(data.event.dateStart).format('DD.MM') }} {{ getMonthName($moment.unix(data.event.dateStart).format('e')) }} | {{ $moment.unix(data.event.dateStart).format('HH:mm') }}

    p.modal-title {{ data.event.name }}

    p.place(v-if = "data.event.numberSeats > 0") Осталось мест: {{ data.event.numberSeats }}
    p.place(v-else) Мест нет

    .price {{ data.event.price | thousandSeparator }} {{ data.currency }}

    hr

    p.mini-title У вас уже есть сертификат на мастер-класс?

    .row
      .col-sm-6.col-xs-12
        button(
          class = "btn btn-default _medium _green"
          @click.prevent = "showModal('registerCertificate', 'omk-register', data.event)") Да, ввести номер

      .col-sm-6.col-xs-12
        button(
          class = "btn btn-default _medium add-cart"
          @click.prevent = "showModal('addedcart', 'cart-add-product', data.event)") Нет, купить
</template>

<script>
export default {
  props: ['data'],
  methods: {
    async showModal(place, analytic, data) {
      if (place === 'addedcart') {
        const response = await this.$axios.$get(
          `/api/cart/add?productId=${data.id}&productCount=${data.count || 1}`
        )

        this.$store.dispatch("showModal", {
          place: place,
          analytic: analytic,
          data: { response }
        })
      } else {
        this.$store.dispatch("showModal", {
          place: place,
          analytic: analytic,
          data: { event: data }
        })
      }
    },
    getMonthName(day) {
      let result
      switch (day * 1) {
        case 0:
          result = "ВС"
          break
        case 1:
          result = "ПН"
          break
        case 2:
          result = "ВТ"
          break
        case 3:
          result = "СР"
          break
        case 4:
          result = "ЧТ"
          break
        case 5:
          result = "ПТ"
          break
        case 6:
          result = "СБ"
          break
      }
      return result
    }
  }
}
</script>
