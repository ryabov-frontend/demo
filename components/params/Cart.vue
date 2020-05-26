<template lang="pug">
  .cart-block(v-click-outside = "hideCart")
    #cart-widget
      button.open-cart-window(@click.prevent = "toggleCart")
        img(
          src = "~assets/images/icons/icon-cart.svg"
          alt = "")
        small(v-if = "$store.state.cart.count") {{ $store.state.cart.count }}
        small(v-else) 0

    .cart-window(v-if = "$store.state.cartShow")
      .cart-window__header
        p(v-if = "$store.state.cart.items.length > 0") В корзине <span>{{ $store.state.cart.count || 0 }} товар</span>

      .cart-window__body
        p(
          v-if = "$store.state.cart.items.length <= 0"
          style="text-align: center;font-size: 17px;font-weight: bold;") Ваша корзина пуста

        ul.cart-window__list(v-if = "$store.state.cart.items.length > 0")
          li.cart-window__item(
            v-for = "item in $store.state.cart.items")
            .main
              span.name
                nuxt-link(
                  v-if = "item.slug"
                  :to = "item.slug") {{ item.name }}

                a(
                  v-if = "!item.slug"
                  href = "javascript:void(0)") {{ item.name }}

              span.date {{ $moment.unix(item.dateStart).format('DD.MM') }} {{ getMonthName($moment.unix(item.dateStart).format('e')) }} | {{ $moment.unix(item.dateStart).format('HH:mm') }}

            span.price {{ item.count }} x {{ item.price | thousandSeparator }} {{ $parent.options.currency }}

            span(
              class = "remove"
              @click.prevent = "remove(item, 'mini-cart-remove')")
              | <svg class="icon icon-close-cart"><use xlink:href="#icon-close-cart"></use></svg>

      .cart-window__footer(v-if = "$store.state.cart.items.length > 0")
        span.summary Итого: {{ $store.state.cart.cost | thousandSeparator }} {{ $parent.options.currency }}
        nuxt-link(
          to = "/shop/cart"
          class = "btn btn-default") Оформить
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  directives: {
    ClickOutside
  },
  props: ['options'],
  methods: {
    showModal(place, analytic) {
      this.$store.dispatch("showModal", {
        place: place,
        analytic: analytic
      })
    },
    cleanPhone(phone) {
      return phone.replace(/[^+\d]/g, "")
    },
    remove(item, analytic) {
      this.$store.dispatch('removeItemFromCart', { product: item })
      this.showModal('removeItemFromCart', 'mini-cart-remove')
    },
    toggleCart() {
      this.$store.dispatch(
        'updateCartShow',
        this.$store.state.cart.cartShow ? false : true
      )
    },
    hideCart() {
      this.$store.dispatch('updateCartShow', false)
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
  // async mounted () {
  //   const result = await this.$axios.$get("/api/cart/get")
  //   this.$store.dispatch('updateCart', result.cart)
  // }
}
</script>

<style lang="sass">

.cart-block
  height: 54px
  line-height: 54px
  position: relative
  padding: 0 17px 0 0

  @media (max-width: 1259px) and (min-width: 992px)
    padding-right: 10px

  @media (max-width: 991px)
    height: 60px
    width: 60px
    text-align: right

  img
    @media (max-width: 1259px) and (min-width: 992px)
      max-width: 20px

  .open-cart-window
    cursor: pointer
    background: none
    border: 0

  .cart-window
    position: absolute
    top: 100%
    right: -30px
    min-width: 495px
    background: #fff
    cursor: default
    box-shadow: 0 4px 16px 0 rgba(37, 37, 37, .15)

    &__header
      background: #F5F5F5
      padding: 26px 37px 17px
      border-bottom: 1px solid #efeeea
      position: relative

      @media (max-width: 1259px)
        padding: 20px 20px 17px

      &:before
        content: ''
        position: absolute
        bottom: 100%
        right: 50px
        border-bottom: 8px solid #F5F5F5
        border-left: 7.5px solid transparent
        border-right: 7.5px solid transparent

      p
        margin: 0
        font-size: 17px
        color: #000
        line-height: 1.2

        span
          color: #940186

    &__list
      li
        padding: 23px 37px
        line-height: 1
        display: flex
        flex-wrap: wrap
        align-items: center

        .price
          margin: 0 50px 0 auto
          display: inline-flex

        .main
          max-width: 210px

        .name
          display: block
          text-decoration: none
          font-size: 17px
          font-weight: 600
          color: #000
          line-height: 1.2

        .date
          display: inline-block
          margin-top: 10px
          font-size: 14px
          color: #909090
          line-height: 1
          padding-left: 20px
          background: url('~assets/images/icons/icon-clock.svg') left center no-repeat

        .remove
          cursor: pointer

          .icon
            color: #940084

          &:hover
            .icon
              color: #4d0946

    &__footer
      border-top: 1px solid #efeeea
      padding: 18px 37px
      text-align: right
      display: flex
      flex-wrap: wrap
      align-items: center

      .summary
        margin-right: 23px
        margin-left: auto
        line-height: normal
        font-size: 17px
        color: #000
        font-weight: 700

      .btn
        min-width: 0
        height: 40px
        padding: 0 25px
        line-height: 40px

  small
    font-family: 'Myriad Pro', sans-serif
    position: absolute
    top: 10px
    right: 0
    width: 23px
    height: 23px
    line-height: 25px
    text-align: center
    font-size: 12px
    font-weight: 700
    color: #fff
    background-color: #4f420c
    border-radius: 50%

    @media (max-width: 1259px) and (min-width: 992px)
      width: 15px
      height: 15px
      line-height: 17px
      text-align: center
      font-size: 8px
      top: 13px
</style>
