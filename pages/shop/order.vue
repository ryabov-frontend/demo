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
                nuxt-link(
                  to = "/shop/delivery") Доставка

                span.separator

              li.active
                span.cursor-none Подтверждение заказа
                span.separator

            .cart-container
              .cart-widget._order
                .cart-content
                  .form-section
                    .cart-widget__title Данные плательщика

                    form.row(@submit.prevent = "sendForm()")
                      .col-sm-6.col-xs-12.form-group(
                        :class = "{ 'has-error': $v.customer_name.$error, \
                                    'has-success': !$v.customer_name.$error && !$v.customer_name.$invalid }")
                        input(
                          v-model = "customer_name"
                          @blur = "$v.customer_name.$touch()"
                          type = "text"
                          class = "form-control"
                          placeholder = "Имя *")

                      .col-sm-6.col-xs-12.form-group(
                        :class = "{ 'has-error': $v.customer_surname.$error, \
                                    'has-success': !$v.customer_surname.$error && !$v.customer_surname.$invalid }")
                        input(
                          v-model = "customer_surname"
                          @blur = "$v.customer_surname.$touch()"
                          type = "text"
                          class = "form-control"
                          placeholder = "Фамилия *")

                      .col-sm-6.col-xs-12.form-group(
                        :class = "{ 'has-error': $v.customer_phone.$error, \
                                    'has-success': !$v.customer_phone.$error && !$v.customer_phone.$invalid }")
                        //- input(
                        //-   v-model = "customer_phone"
                        //-   @blur = "$v.customer_phone.$touch()"
                        //-   type = "text"
                        //-   class = "form-control"
                        //-   v-mask = "'+7 (###) ###-##-##'"
                        //-   placeholder = "+7 (___) ___-__-__")

                        masked-input(
                          v-model = "customer_phone"
                          type = "text"
                          pattern = "+7 (111) 111-11-11"
                          @blur = "$v.customer_phone.$touch()"
                          class = "form-control")

                      .col-sm-6.col-xs-12.form-group(
                        :class = "{ 'has-error': $v.customer_email.$error, \
                                    'has-success': !$v.customer_email.$error && !$v.customer_email.$invalid }")
                        input(
                          v-model = "customer_email"
                          @blur = "$v.customer_email.$touch()"
                          type = "text"
                          class = "form-control"
                          placeholder = "Email *")

                  .form-section
                    .cart-widget__title Выберите способ оплаты
                    .row
                      .form-group
                        .col-sm-6.col-xs-12.form-group(
                          v-for = "(item, i) in payments.paymentMethods"
                          :key = "item")
                          label.radio
                            input(
                              v-model = "payment_method_id"
                              type = "radio"
                              :value = "i"
                              class = "active")
                            span.radio-icon
                            span.radio-text(v-html = "item")

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
                    button.btn.btn-default.next(
                      :class = "{ 'disbaled': loading }"
                      @click = "sendForm()") Оформить

                    nuxt-link(
                      to = "/shop/delivery"
                      class = "btn btn-default _back")
                      | <svg class="icon icon-back"><use xlink:href="#icon-back"></use></svg> Назад

                  .order-confirm
                    .form-group
                      label.checkbox
                        <input type="checkbox" id="orderform-iagree" name="OrderForm[iAgree]" value="1" checked="" class="active">

                        .checkbox-block
                          .checkbox-icon
                          .checkbox-text Я прочитал и согласен с 
                            nuxt-link(to = "/website/user-regulations.html") правилами пользования сайтом

                    p Нажимая кнопку «Оформить», я даю&nbsp;
                      nuxt-link(to = "/agreement.html") согласие
                      br
                      | на обработку персональных данных

    Footer(
      :menu = "menu"
      :options = "options")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  async asyncData({ $axios }) {
    const options = await $axios.$get("/api/site/get-params")
    const menu = await $axios.$get("/api/site/get-menu")
    const payments = await $axios.$get("/api/cart/get-payment-methods")
    return { options, menu, payments }
  },
  data: () => ({
    payment_method_id: null,
    customer_name: null,
    customer_surname: null,
    customer_phone: null,
    customer_email: null,
    loading: false
  }),
  validations: {
    payment_method_id: {
      required
    },
    customer_name: {
      required,
      alpha: val => /^[а-яА-ЯёЁa-zA-Z ]*$/i.test(val)
    },
    customer_surname: {
      required,
      alpha: val => /^[а-яА-ЯёЁa-zA-Z ]*$/i.test(val)
    },
    customer_phone: {
      required,
      alpha: val => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(val)
    },
    customer_email: {
      required,
      alpha: val => /\S+@\S+\.\S+/i.test(val)
    }
  },
  watch: {
    'payment_method_id': function(val) {
      this.$cookies.set('payment_method_id', val, {
        path: '/'
      })
    }
  },
  created () {
    this.$store.dispatch(
      "updateCart",
      this.payments.cart ? this.payments.cart : this.payments
    )
  },
  mounted () {
    if (this.$cookies.get("payment_method_id")) {
      this.payment_method_id = this.$cookies.get("payment_method_id")
    }
  },
  methods: {
    async sendForm () {
      this.$store.commit("loadingWrapper", true)

      if (!this.$v.$invalid && !this.$v.$error && !this.loading) {
        this.loading = true
        const form = await this.$axios.$post('/api/order/send', {
          customer_name: this.customer_name,
          customer_surname: this.customer_surname,
          customer_phone: this.customer_phone,
          customer_email: this.customer_email,
          payment_method_id: this.payment_method_id
        })
        if (form.result) {
          this.loading = false
          if (process.browser) {
            window.location.href = form.url
          }
        } else {
          this.loading = false
          this.$store.commit("loadingWrapper", false)
        }
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

.order-confirm
  text-align: center
  max-width: 330px
  margin-left: auto
  margin-right: auto

  a
    text-decoration: underline

  .checkbox
    display: block
    margin-bottom: 10px !important

    &-text
      font-size: 15px

.cart-content
  max-width: 52%

  @media (max-width: 1259px)
    max-width: 100%

  .row
    margin-left: -8px
    margin-right: -8px

  .form-group
    margin-bottom: 16px

  [class*=col-]
    padding-left: 8px
    padding-right: 8px

.cart-widget._order
  position: relative
  margin-bottom: 90px
  display: flex
  flex-wrap: wrap
  align-items: flex-start

  @media (max-width: 1259px)
    margin-bottom: 0

  @media (max-width: 767px)
    padding-bottom: 0

  .cart-steps
    position: static !important
    left: inherit !important
    margin-top: 35px !important
    transform: translate(0, 0) !important

    @media (max-width: 1259px)
      margin-bottom: 0

    .btn
      display: block
      width: 100%
      margin: 0 !important

      &._back
        margin-top: 10px !important
        position: relative
        left: -15px

      &.disabled
        opacity: .3
        pointer-events: none

  .form-section:not(:last-child)
    margin-bottom: 55px

  .cart-widget__title
    margin-bottom: 35px

  .cart-widget__right._summary
    margin: 57px 0 0
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
