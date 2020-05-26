<template lang="pug">
  div
    .site-top
      Header(
        :menu = "menu"
        :options = "options")

      main.site-main
        .heading
          .container
            h1 корзина

            ul.cart-nav
              li.active
                nuxt-link(
                  to = "/shop/cart") Товары и скидки

                span.separator

              li.active
                span.cursor-none Доставка
                span.separator

              li
                span.cursor-none Подтверждение заказа
                span.separator

            .cart-container
              .cart-widget._delivery
                .delivery-block
                  .cart-widget__title Выберите способ доставки

                  .form-group(:class = "{ 'has-error': error }")
                    label.radio(
                      v-for = "(item, i) in delivery.deliveryMethods"
                      :key = "item")
                      input(
                        v-model = "deliverySelected"
                        type = "radio"
                        :value = "i"
                        class = "active")
                      span.radio-icon
                      span.radio-text(v-html = "item")

                    .help-block(v-if = "error") Необходимо заполнить «Способ доставки».

                .cart-widget__right._summary
                  .cart-widget__title Итого

                  ul.cart-result
                    li
                      span.cart-result__label Товаров
                      span.cart-result__val {{ $store.state.cart.count }}

                    li
                      span.cart-result__label На сумму
                      span.cart-result__val {{ $store.state.cart.sum | thousandSeparator }} {{ options.currency }}

                    li(v-if = "$store.state.cart.deliveryName")
                      span.cart-result__label Доставка ({{ $store.state.cart.deliveryName }})
                      span.cart-result__val {{ $store.state.cart.deliveryPrice | thousandSeparator }} {{ options.currency }}

                    li(v-if = "$store.state.cart.discountName")
                      span.cart-result__label Скидка
                      span.cart-result__val -{{ $store.state.cart.discountPrice | thousandSeparator }} {{ options.currency }}

                    li(v-else-if = "$store.state.cart.discountPrice")
                      span.cart-result__label Скидка
                      span.cart-result__val -{{ $store.state.cart.discountPrice | thousandSeparator }} {{ options.currency }}

                    li
                      span.cart-result__label Итого
                      span.cart-result__val {{ $store.state.cart.cost | thousandSeparator }} {{ options.currency }}

                  .cart-steps
                    nuxt-link(
                      to = "/shop/cart"
                      class = "btn btn-default _back")
                      | <svg class="icon icon-back"><use xlink:href="#icon-back"></use></svg> Назад

                    button(
                      @click = "nextStep"
                      class = "btn btn-default next") Дальше

    Footer(
      :menu = "menu"
      :options = "options")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const options = await $axios.$get("/api/site/get-params")
    const menu = await $axios.$get("/api/site/get-menu")
    const delivery = await $axios.$get("/api/cart/get-delivery-methods")
    return { options, menu, delivery }
  },
  data: () => ({
    deliverySelected: null,
    error: false
  }),
  watch: {
    async deliverySelected(val) {
      const update = await this.$axios.$post("/api/cart/set-delivery-method", {
        delivery_id: val
      })
      this.$cookies.set('deliverySelected', val, {
        path: '/'
      })
    }
  },
  created () {
    this.$store.dispatch(
      "updateCart",
      this.delivery.cart ? this.delivery.cart : this.delivery
    )
  },
  mounted () {
    if (this.$cookies.get("deliverySelected")) {
      this.deliverySelected = this.$cookies.get("deliverySelected")
    }
  },
  methods: {
    nextStep () {
      if (
        this.deliverySelected !== null &&
        this.deliverySelected !== undefined
      ) {
        this.error = false
        this.$router.push("/shop/order")
      } else {
        this.error = true
      }
    }
  },
  head() {
    return {
      title: 'Корзина'
    }
  }
}
</script>

<style lang="sass">

.cart-container
  @media (max-width: 767px)
    margin: 0 -20px

.cart-widget._delivery
  position: relative
  margin-bottom: 90px
  display: flex
  flex-wrap: wrap
  align-items: flex-start

  @media (max-width: 1259px)
    margin-bottom: 0
    padding-bottom: 130px

  @media (max-width: 991px)
    padding-bottom: 40px

  @media (max-width: 767px)
    padding-bottom: 0

  .cart-steps
    left: 50% !important
    transform: translate(-50%, 0) !important

    @media (max-width: 1259px)
      margin-bottom: 0

    @media (max-width: 991px)
      position: static
      margin-top: 45px
      transform: translate(0, 0) !important

  .cart-widget__title
    margin-bottom: 35px

  .cart-widget__right._summary
    margin: 0
    width: 100%
    max-width: 415px
    margin-left: auto
    position: static
    margin-right: 30px
    background: #E2EDF3
    border: 3px dashed #fff
    padding-left: 30px
    padding-right: 30px

    @media (max-width: 1259px)
      margin-top: 50px
      max-width: 100%
      margin-right: 0
      position: relative
      left: inherit
      bottom: inherit

    @media (max-width: 767px)
      margin: 0 -40px
      width: calc(100% + 80px)
      max-width: calc(100% + 80px)

    .cart-widget__title
      width: 100%
      color: #000

      @media (max-width: 767px)
        display: none

  .cart-result__label,
  .cart-result__val
    background: #E2EDF3
</style>
