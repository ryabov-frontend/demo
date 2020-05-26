<template lang="pug">
  div
    .site-top
      Header(
        :menu = "menu"
        :options = "options")

      main.site-main
        .heading#scroll
          .container
            h1 корзина

            ul.cart-nav
              li.active
                span.cursor-none Товары и скидки
                span.separator

              li
                span.cursor-none Доставка
                span.separator

              li
                span.cursor-none Подтверждение заказа
                span.separator

            h5.text-center(v-if = "!$store.state.cart.count || $store.state.cart.count <= 0") Ваша корзина сейчас пуста. Выбирайте сертификаты и другие подарки в магазине или заказывайте билеты на любимый мастер-класс из календаря.

            .cart-container(v-if = "$store.state.cart.count > 0")
              .cart-widget
                .cart-widget__title В корзине <span>{{ $store.state.cart.count }} товар</span>

                .cart-grid
                  .cart-row._header
                    .cart-cell._thumb
                    .cart-cell._name
                    .cart-cell._price
                      span.cart-heading Стоимость
                    .cart-cell._quantity
                      span.cart-heading Количество
                    .cart-cell._summary
                      span.cart-heading Итого
                    .cart-cell._remove

                  .cart-row(
                    v-for = "item in $store.state.cart.items"
                    :key = "item.id")

                    .cart-cell._thumb
                      img(
                        :src = "item.img"
                        :alt = "item.name")

                    .cart-cell._name
                      nuxt-link(
                        v-if = "item.slug"
                        :to = "item.slug"
                        class = "cart-item__name") {{ item.name }}

                      .cart-item__name(v-if = "!item.slug") {{ item.name }}

                      span.cart-item__date.cart-item__txt Cертификат на Вечеринку
                      br
                      span.cart-item__date {{ $moment.unix(item.dateStart).format('DD.MM') }} {{ getMonthName($moment.unix(item.dateStart).format('e')) }} | {{ $moment.unix(item.dateStart).format('HH:mm') }}

                    .cart-cell._price
                      span.cart-heading Стоимость
                      span.price {{ item.price | thousandSeparator }} {{ options.currency }}

                    .cart-cell._quantity
                      span.cart-heading Количество
                      .number-container.relative.cart-change-count
                        span.number-down(@click.prevent = "changeCount('minus', item, 'cart-form-down')")
                          | <svg class="icon icon-down"><use xlink:href="#icon-down"></use></svg>

                        input(
                          v-model = "item.count"
                          type = "tel"
                          class = "form-control number shop-action-change active"
                          @input = "changeCount('input', item, 'cart-form-up')")

                        span.number-up(@click.prevent = "changeCount('plus', item, 'cart-form-up')") +

                    .cart-cell._summary
                      span.cart-heading Итого
                      span.price {{ item.cost | thousandSeparator }} {{ options.currency }}

                    .cart-cell._remove
                      span.remove.shop-action(@click.prevent = "remove(item, 'cart-form-remove')")
                        | <svg class="icon icon-close"><use xlink:href="#icon-close"></use></svg>
                        span Удалить

              .cart-widget._result
                .cart-widget__left
                  .cart-widget__title У Вас есть скидка или промокод?

                  .sale-block.has-error
                    input(
                      v-model.trim = "saleText"
                      type = "text"
                      class = "sale-input"
                      :disabled = "$store.state.cart.discountName")

                    button(
                      type = "button"
                      class = "sale-btn"
                      style = "max-height: 50px"
                      :class = "{ 'btn-default': saleText.length >= 3 }"
                      :disabled = "$store.state.cart.discountName"
                      @click.prevent = "checkSale") Применить

                    .help-block(
                      v-if = "error"
                      v-html = "error.name || error")

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

                  .cart-steps(style = "margin-bottom: 15px")
                    nuxt-link(
                      to = "/shop/delivery"
                      class = "btn btn-default next") Дальше

            .cart-widget._special(v-if = "products && products.products && products.products.length > 0")
              .cart-widget__title Специальные предложения
              .cart-grid
                .cart-row._header
                  .cart-cell._thumb
                  .cart-cell._name
                  .cart-cell._price
                    .cart-heading Стоимость
                  .cart-cell._summary
                    .cart-heading Со скидкой
                  .cart-cell._remove._auto

                .cart-row(
                  v-for = "product in products.products"
                  :key = "product.id")

                  .cart-cell._thumb
                    img(
                      :src = "'http://dev.culinaryon.com/' + product.image"
                      alt = "")

                  .cart-cell._name
                    .cart-item__name {{ product.title }}

                  .cart-cell._price
                    span.cart-heading Стоимость
                    span.price(style = "text-decoration: line-through") {{ product.priceOld }}

                  .cart-cell._summary
                    span.cart-heading Итого
                    span.price(style = "color: #940084;") {{ product.price }}

                  .cart-cell._remove
                    .btn.btn-default(@click.prevent = "addItem(product)") Добавить в корзину

          widget-guests(
            v-if = "$store.state.cart.count <= 0"
            :related = "related"
            :currency = "options.currency"
            :title = "'Ближайшие <span class=\"text-default\">мастер-классы:</span>'")

    Footer(
      :menu = "menu"
      :options = "options")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
import WidgetGuests from '~/components/widgets/WidgetGuests'

export default {
  components: {
    WidgetGuests
  },
  async asyncData({ $axios }) {
    const options = await $axios.$get('/api/site/get-params')
    const menu = await $axios.$get('/api/site/get-menu')
    const related = await $axios.$get('/api/calendar/get-related')
    const cart = await $axios.$get('/api/cart/get')
    const products = await $axios.$get('/api/shop/get-dop-products')
    // const cart = {"result":true,"msg":"","cart":{"items":[{"itemId":"c185de4a9f4c74ab215031e581ca3dd7","id":73,"name":"Подарочный сертификат ( 6000 р.)","slug":"/calendar/podarocnyj-sertifikat-6000-r.html","img":"/uploads/cache/placeHolder/placeHolder_85x85.png","count":"1","price":6000,"cost":6000,"dateStart":null}],"sum":6000,"cost":6000,"count":1,"deliveryPrice":0,"deliveryName":null,"discountPrice":0,"discountName":null}}
    return { options, menu, cart, related, products }
  },
  data: () => ({
    saleText: '',
    error: false
  }),
  async created () {
    this.$store.dispatch('updateCart', this.cart.cart ? this.cart.cart : this.cart)
    this.$store.dispatch('updateCartShow', false)

    if (this.cart.cart.count === 0) {
      const cart = await this.$axios.$get('/api/cart/get')
      this.$store.dispatch('updateCart', cart.cart)
    }
  },
  mounted () {
    this.saleText = this.$store.state.cart.discountName || ''
  },
  methods: {
    showModal(place, analytic) {
      this.$store.dispatch('showModal', {
        place: place,
        analytic: analytic
      })
    },
    async addItem (product) {
      const response = await this.$axios.$get(
        `/api/cart/add?productId=${product.id}&productCount=1`
      )
      if (response.result) {
        this.$store.commit("updateCart", response.cart)
        this.$scrollTo('#scroll')
      }
    },
    remove (item, analytic) {
      this.$store.dispatch('removeItemFromCart', { product: item, analytic: analytic })
    },
    changeCount (action, item, analytic) {
      if (action === 'minus') {

        if (item.count > 1) {

          this.$store.dispatch('updateItemFromCart', { productId: item.itemId, count: item.count * 1 - 1 })
          this.$store.dispatch('analytic', analytic)
        }
      } else if (action === 'plus') {

        this.$store.dispatch('updateItemFromCart', { productId: item.itemId, count: item.count * 1 + 1 })
        this.$store.dispatch('analytic', analytic)
      }
    },
    async checkSale () {
      if (this.saleText.length >= 3) {
        const checkSale = await this.$axios.$post('/api/cart/set-discount', {
          name: this.saleText
        })
        if (checkSale.result) {
          this.$store.dispatch('updateCart', checkSale.cart)
          this.showModal('discountFromCart')
          this.error = false
        } else {
          this.error = checkSale.msg
        }
      }
    },
    getMonthName(day) {
      let result
      switch (day * 1) {
        case 0:
          result = 'ВС'
          break
        case 1:
          result = 'ПН'
          break
        case 2:
          result = 'ВТ'
          break
        case 3:
          result = 'СР'
          break
        case 4:
          result = 'ЧТ'
          break
        case 5:
          result = 'ПТ'
          break
        case 6:
          result = 'СБ'
          break
      }
      return result
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

.sale
  &-block
    margin-top: 55px
    max-width: 440px
    position: relative

    @media (max-width: 991px)
      max-width: 100%

    @media (max-width: 767px)
      margin-top: 30px

  &-input
    height: 50px
    line-height: 52px
    border-radius: 25px
    border: 1px solid #c6c6c6
    background-color: #fff
    padding: 0 35px
    font-size: 18px
    color: #000
    transition: all .3s ease
    text-transform: uppercase

    &[disabled]
      pointer-events: none

  &-btn
    position: absolute
    top: 0
    right: 0
    bottom: 0
    line-height: 50px
    border-radius: 25px
    background-color: #8d8d8d
    min-width: 160px
    border: 0
    text-align: center
    font-size: 15px
    font-family: 'Intro', sans-serif
    color: #fff
    transition: all .3s ease
    border: 2px solid #8d8d8d

    @media (max-width: 767px)
      height: 50px
      position: static
      width: 100%
      margin-top: 15px

    &:hover
      background-color: #b3b3b3

    &.btn-default
      background: #940084
      border-color: #940084
      color: #fff

    &[disabled]
      pointer-events: none

.cart
  &-widget
    @media (max-width: 767px)
      margin-left: -20px
      margin-right: -20px
      border-left: 0 !important
      border-right: 0 !important
      padding: 40px 40px !important

  &-widget__title
    @media (max-width: 991px)
      margin-bottom: 40px !important

  &-nav
    margin-top: 20px
    margin-bottom: 40px

    @media (max-width: 767px)
      margin-top: 0
      margin-bottom: 25px

    li
      display: inline-block
      font-size: 13px
      font-family: 'Intro', sans-serif
      color: #cecece
      line-height: 1.2
      transition: all .3s ease

      @media (max-width: 991px)
        font-size: 15px

      @media (max-width: 767px)
        display: none

        &:not(:last-child)
          margin-bottom: 10px

      a
        border-bottom: 1px solid transparent
        font-size: inherit
        font-family: inherit
        color: inherit
        line-height: inherit

      .separator
        display: inline-block
        vertical-align: middle
        height: 1px
        width: 35px
        background: #cecece
        position: relative
        margin: 0 5px

        @media (max-width: 991px)
          width: 55px

        &:before,
        &:after
          content: ''
          position: absolute
          top: 50%
          width: 6px
          height: 6px
          background: #cecece
          border-radius: 50%
          transform: translate(0, -50%)

        &:before
          left: 0

        &:after
          right: 0

      &:last-child
        .separator
          display: none

      &.active
        color: #000

        a
          border-bottom: 1px solid #000

  &-grid
    margin-left: -40px
    margin-right: -40px

  &-row
    width: 100%
    padding: 0 40px
    position: relative
    display: flex
    flex-wrap: wrap
    align-items: center

    &:not(:last-child) 
      padding-bottom: 30px
      margin-bottom: 30px
      border-bottom: 1px solid #E7E7E7

    @media (min-width: 992px)
      .cart-heading
        display: none

    @media (max-width: 991px)
      padding-left: 125px
      align-items: flex-end

    @media (max-width: 767px)
      padding-left: 40px
      padding-right: 40px

    &._header
      padding-bottom: 0
      margin-bottom: 0
      border-bottom: 0

      @media (max-width: 991px)
        display: none

      .cart-cell
        text-align: center

      .cart-heading
        display: block

  &-cell
    flex: 1

    &._thumb
      max-width: 85px
      margin-left: auto
      margin-right: auto
      flex: .65

      @media (max-width: 991px)
        position: absolute
        top: 0
        left: 40px
        flex: auto

      @media (max-width: 767px)
        display: none

    &._name
      padding-left: 30px
      flex: 1 1 20%

      @media (min-width: 992px)
        padding-left: 55px

      @media (max-width: 991px)
        width: calc(100% - 85px)
        margin-bottom: 30px
        flex: auto

      @media (max-width: 767px)
        width: 100%
        text-align: center
        padding: 0

    &._price,
    &._summary
      text-align: center

      @media (max-width: 991px)
        width: 33.3333%
        flex: auto

    &._quantity
      text-align: center

      @media (max-width: 991px)
        width: 33.3333%
        text-align: center
        flex: auto

      .number-down
        width: 20px
        height: 40px
        padding-left: 15px

        .icon
          max-width: 13px
          max-height: 13px

      .number
        width: 100px
        height: 40px
        font-size: 19px
        line-height: 42px

      .number-up
        width: 20px
        height: 40px
        line-height: 42px
        padding-right: 25px
        padding-left: 0
        font-size: 19px

    &._summary
      text-align: center

      .cart-heading
        @media (max-width: 991px)
          text-align: center

    &._remove
      min-width: 45px
      text-align: right
      padding-left: 15px
      flex: .1

      @media (max-width: 991px)
        position: absolute
        top: 0
        right: 40px

      @media (max-width: 767px)
        width: 100%
        position: static
        text-align: center
        margin-top: 25px
        padding: 0
        flex: auto

    .price
      font-size: 25px
      line-height: 1

      @media (max-width: 991px)
        padding-top: 11px
        padding-bottom: 3px

      @media (max-width: 767px)
        font-size: 19px

    .remove
      cursor: pointer
      color: #940084

      @media (max-width: 767px)
        width: 100%
        display: flex
        flex-wrap: wrap
        align-items: center
        justify-content: center

      .icon
        max-width: 27px
        max-height: 27px

        @media (max-width: 767px)
          max-width: 18px
          max-height: 18px

      span
        display: none

        @media (max-width: 767px)
          display: inline-block
          margin-left: 5px
          font-size: 18px
          color: #950287
          font-weight: 700
          line-height: 1
          position: relative
          top: 2px

  &-heading
    font-size: 12px
    color: #adabad
    text-transform: uppercase
    line-height: 1.2
    display: block
    text-align: center
    padding: 0 0 10px

    @media (min-width: 992px)
      display: none

  &-widget
    border: 1px solid #e8e8e8
    padding: 40px
    background: #fff
    text-align: left
    box-shadow: 0 2px 27px 0 rgba(80, 78, 80, .13)

    &:not(:first-child)
      margin-top: 40px

    &__title
      font-size: 20px
      font-family: 'Intro', sans-serif
      color: #adabad
      line-height: 1.2
      margin-bottom: 20px

      @media (max-width: 767px)
        margin-bottom: 10px !important
        text-align: center

    &__left
      width: 50%
      padding-right: 40px

      @media (max-width: 991px)
        width: 100%
        padding-right: 0

    &__right
      width: 50%

      @media (max-width: 991px)
        width: 100%

      &._summary
        margin: -40px
        width: calc(50% + 40px)
        padding: 40px 50px
        border-left: 1px solid #e8e8e8
        background: #F5F5F5
        position: relative
        left: 40px

        @media (max-width: 991px)
          width: calc(100% + 80px)
          margin: 50px -80px -80px
          border-left: 0
          border-top: 1px solid #e8e8e8
          text-align: center

        .cart-widget__title
          @media (max-width: 991px)
            text-align: left

          @media (max-width: 767px)
            display: none

        .cart-steps
          position: absolute
          left: calc(-50% + 160px)
          bottom: -90px
          transform: translate(50%, 0)

          @media (max-width: 991px)
            position: static
            margin-top: 45px
            transform: translate(0, 0)

          .btn
            min-width: 0
            padding: 0 35px

            @media (max-width: 767px)
              width: 100%

    &._result
      margin-bottom: 90px
      display: flex
      flex-wrap: wrap

      @media (max-width: 767px)
        margin-bottom: 20px
        padding-left: 20px
        padding-right: 20px
        margin-top: 0

    .btn
      font-size: 15px
      height: 45px
      line-height: 45px
      padding: 0 22px

  &-item
    &__name
      display: block
      font-size: 20px
      color: #000
      line-height: 1.2
      font-weight: 600

      @media (max-width: 991px)
        padding-right: 45px

      &:hover
        text-decoration: none
        color: #B01FA1

    &__date
      display: inline-block
      margin-top: 12px
      font-size: 14px
      color: #9f9f9f
      line-height: 1
      padding-left: 20px
      padding-top: 3px
      background: url('~assets/images/icons/icon-clock.svg') left center no-repeat
      background-size: 12px

    &__txt
      background: none
      padding-left: 0

  &-result
    display: flex
    flex-wrap: wrap

    li
      width: 100%
      font-size: 20px
      color: #000
      line-height: 1.8
      background: url('~assets/images/other/dots.svg') left calc(100% - 12px) repeat-x
      display: flex
      flex-wrap: wrap

      &:last-child
        font-weight: 700

    &__label
      background: #F5F5F5
      padding-right: 8px

    &__val
      background: #F5F5F5
      margin-left: auto
      text-align: left
      min-width: 100px
      padding-left: 8px

.cart-widget._special
  @media (max-width: 767px)
    padding-top: 20px

    .cart-widget__title
      margin-bottom: 10px
      margin-top: 20px
      text-align: center

  .cart-cell._name
    @media (min-width: 992px)
      flex: 1 1 12%

  .cart-cell._summary,
  .cart-cell._price
    @media (min-width: 992px)
      flex: .6

  .cart-cell._remove
    flex: 1

    @media (max-width: 767px)
      margin: 30px -40px -40px !important

    .btn
      @media (max-width: 767px)
        width: 100%

    @media (max-width: 1259px)
      width: 100%
      margin: 35px -40px -40px
      background: #F5FBFF
      text-align: center
      padding: 15px
      flex: auto

    @media (max-width: 991px)
      position: static
      margin-left: -125px

  .cart-row._header
    .cart-cell._remove
      @media (max-width: 1259px)
        display: none

</style>
