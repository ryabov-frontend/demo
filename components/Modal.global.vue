<template lang="pug">
  div
    .modal.in(
      role = "dialog"
      tabindex = "-1"
      v-if = "data.place !== false"
      :class = "{ '_standard _md _bg-icons': data.place === 'header', \
                  '_certificate _md _bg-icons': [ 'signup', 'registerCertificate' ].indexOf(data.place) !== -1, \
                  '_cart _sm fade': data.place === 'addedcart' }")

      .modal-dialog
        .modal-content
          .modal-body

              .modal-ajax-loader(v-if = "data.place === 'loading'")

              BookEvent(
                v-if = "data.place === 'header'"
                template = "header"
                :data = "data.data"
                :language = "$parent.options.language")

              BookEvent(
                v-if = "data.place === 'wedding'"
                template = "wedding"
                :data = "data.data"
                :language = "$parent.options.language")

              BookEvent(
                v-if = "data.place === 'birth_day'"
                template = "birth_day"
                :data = "data.data"
                :language = "$parent.options.language")

              BookEvent(
                v-if = "data.place === 'child_birth_day'"
                template = "child_birth_day"
                :data = "data.data"
                :language = "$parent.options.language")

              BookEvent(
                v-if = "data.place === 'rent_studio'"
                template = "rent_studio"
                :data = "data.data"
                :language = "$parent.options.language")

              BookEvent(
                v-if = "data.place === 'rent_conference'"
                template = "rent_conference"
                :data = "data.data"
                :language = "$parent.options.language")

              BookEvent(
                v-if = "data.place === 'field_events'"
                template = "field_events"
                :data = "data.data"
                :language = "$parent.options.language")

              BookEvent(
                v-if = "data.place === 'hen_party'"
                template = "hen_party"
                :data = "data.data"
                :language = "$parent.options.language")

              SignupEvent(
                v-if = "data.place === 'signup'"
                :data = "data.data"
                :language = "$parent.options.language")

              RegisterCertificate(
                v-if = "data.place === 'registerCertificate'"
                :data = "data.data"
                :language = "$parent.options.language")

              AddedCart(
                v-if = "data.place === 'addedcart'"
                :data = "data.data"
                :language = "$parent.options.language")

              InfoModal(
                v-if = "data.place === 'removeItemFromCart'"
                :text = "'Товар удален из корзины.'"
                :errorClass = "true")

              InfoModal(
                v-if = "data.place === 'discountFromCart'"
                :text = "'Скидка успешно применена!'")

              InfoModal(
                v-if = "data.place === 'textModal'"
                :text = "data.msg")

    .modal-backdrop.in(
      @click = "closeModal()"
      v-if = "data.place !== false")
</template>

<script>
import BookEvent from "~/components/modals/BookEvent"
import SignupEvent from "~/components/modals/SignupEvent"
import AddedCart from "~/components/modals/AddedCart"
import InfoModal from "~/components/modals/_infoModal"
import RegisterCertificate from "~/components/modals/RegisterCertificate"

export default {
  components: {
    BookEvent,
    SignupEvent,
    AddedCart,
    InfoModal,
    RegisterCertificate
  },
  props: ["data"],
  methods: {
    closeModal() {
      this.$store.dispatch("hideModal")
    },
    validateForm(form) {
      return {
        result: "success"
      }
    }
  }
}
</script>

<style lang="sass">

.modal,
.modal-open
  overflow: hidden

.modal
  z-index: 1050
  display: flex !important
  transition: all .3s ease
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0

  &-date
    margin: 0 auto 20px
    font-family: 'Intro', sans-serif
    font-size: 15px
    color: #9f9f9f
    line-height: 1
    text-align: center

    span
      padding: 2px 0 2px 23px
      background: url('~assets/images/icons/icon-clock.svg') left 0 no-repeat
      background-size: 15px

  &._cart
    .modal-body
      padding: 0

    .modal-title
      color: #940186

    .btn
      width: 100%
      margin-bottom: 0
      min-width: 0

  &._certificate
    .modal-content
      padding: 70px 55px

    .modal-title
      margin-bottom: 30px

    .btn
      width: 100%
      margin-bottom: 0
      min-width: 0

      @media (max-width: 767px)
        margin-bottom: 15px

  &.in
    pointer-events: all
    transform: translate(0, 0)
    flex-wrap: wrap
    align-items: center
    justify-content: center

    .modal-content
      pointer-events: all
      opacity: 1

  &-ajax
    &-loader
      border: 5px solid #f3f3f3
      animation: spin 1s linear infinite
      border-top: 5px solid #555
      border-radius: 50%
      width: 50px
      height: 50px
      margin: auto

  &-backdrop
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    z-index: 1040
    background-color: #000
    transition: opacity .2s linear

    &.in
      opacity: .30

  &._bg-icons
    .modal-content
      background: url('https://culinaryon.ru/img/bg-modal.png') no-repeat center calc(100% + 70px) #fff

  &._standard
    .modal-content
      padding: 70px 55px 50px

  &._md
    .modal-content
      width: 100%
      max-width: 625px

  &._sm
    .modal-content
      width: 100%
      max-width: 570px

      @media (max-width: 767px)
        max-width: 100% !important

  &-content
    padding: 85px 30px 80px
    border-radius: 20px
    border: 0
    margin: auto
    position: relative
    overflow: hidden
    transition: all .3s ease
    background-color: #fff

    @media (min-width: 768px)
      box-shadow: none

    @media (max-width: 767px)
      display: flex
      box-shadow: none
      flex-wrap: wrap
      align-items: center
      justify-content: center
      padding: 70px 20px 50px !important
      border-radius: 0
      background-position: -90px calc(100% + 80px) !important
      background-size: 694px 439px !important
      min-height: 100vh

    &--inner
      width: 100%

    p
      font-size: 18px
      color: #000

    hr
      display: block
      border: 0
      margin: 45px -70px
      height: 1px
      background: url('~assets/images/other/modal-hr.svg') repeat-x

    .place
      text-align: center
      margin-bottom: 10px
      font-size: 22px
      color: #727272
      line-height: 1.2

    .price
      width: 100%
      font-size: 32px
      text-align: center
      line-height: .7
      margin-top: 10px

    .mini-title
      font-size: 18px
      font-family: 'Intro', sans-serif
      color: #000
      line-height: 1.2
      text-align: center
      margin-bottom: 30px

  &-body
    padding: 15px

  &-dialog
    pointer-events: none
    margin: auto
    height: auto
    padding: 50px 0
    transform: translate(0, 0)
    position: relative
    z-index: 2

    @media (min-width: 768px)
      width: 600px

    @media (max-width: 767px)
      width: 100%
      padding: 0
      display: block
      min-height: 100vh

  &-close
    padding: 0
    background: transparent
    border: 0
    position: absolute
    top: 30px
    right: 30px

    @media (max-width: 767px)
      top: 15px
      right: 15px

  &-title
    font-size: 30px
    font-family: 'Intro', sans-serif
    color: #940186
    line-height: 1.2
    text-align: center
    margin-bottom: 40px

    @media (max-width: 767px)
      font-size: 22px
      margin-left: -25px
      margin-right: -25px

  &-pretitle
    margin-top: -25px
    text-align: center
    margin-bottom: 40px

  &-submit
    margin-top: 15px

  &-open
    .modal
      overflow-x: hidden
      overflow-y: auto

  .form
    max-width: 465px
    margin: 0 auto

    &-group
      margin-bottom: 20px

      @media (max-width: 767px)
        margin-bottom: 13px

    &._mini
      max-width: 370px
      margin-left: auto
      margin-right: auto

      .text-center
        color: #333

  [class*="col-"]
    padding-left: 10px
    padding-right: 10px

  .row
    margin-left: -10px
    margin-right: -10px

  .btn
    min-width: 0
    padding-left: 35px
    padding-right: 35px

  .confirm
    display: block
    font-size: 15px
    color: #000
    line-height: 1.467
    text-align: center
    margin-top: 20px

@keyframes spin
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(360deg)
</style>
