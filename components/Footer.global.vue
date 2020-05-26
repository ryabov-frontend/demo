<template lang="pug">
  div
    widget-partners(
      v-if = "!hidePartners"
      :list = "options.partnersListFooter")

    footer.site-footer
      #button-up(
        :class = "{ 'show': $store.state.scrollTop >= 500 }"
        @click = "scrollTop")
        .arrow-up

      .container
        .col__info(
          itemscope
          itemprop = "address"
          itemtype = "http://schema.org/PostalAddress")

          span.text--gray(
            itemprop = "name"
            v-if = "options.company_name") <strong>{{ options.company_name }}</strong>

          p
            span(
              itemprop = "streetAddress"
              v-if = "options.address_1") {{ options.address_1 }}

            span.text--gray(
              v-if = "options.address_index") {{ options.address_index }}

          p
            span(
              itemprop = "streetAddress"
              v-if = "options.address_2") {{ options.address_2 }}

            span.text--gray(
              v-if = "options.address_index") {{ options.address_index }}

          span(
            itemprop = "telephone"
            v-if = "options.phone")
            a(
              :href = "'tel:' + cleanPhone(options.phone)"
              data-event-ya = "clic-tel"
              class = "tel") {{ options.phone }}

          span(
            itemprop = "email"
            v-if = "options.email")
            a(
              :href = "'mailto:' + options.email"
              data-event-ya = "click-mail"
              class = "text--gray text-underline") {{ options.email }}

          client-only
            ul.site-header__socials
              li(v-if = "options.fb_link")
                a(
                  target = "_blank"
                  :href = "options.fb_link")
                  | <svg class="icon icon-fb"><use xlink:href="#icon-fb"></use></svg>

              li(v-if = "options.vk_link")
                a(
                  target = "_blank"
                  :href = "options.vk_link")
                  | <svg class="icon icon-vk"><use xlink:href="#icon-vk"></use></svg>

              li(v-if = "options.in_link")
                a(
                  target = "_blank"
                  :href = "options.in_link")
                  | <svg class="icon icon-inst"><use xlink:href="#icon-inst"></use></svg>

              li(v-if = "options.trip_link")
                a(
                  target = "_blank"
                  rel = "nofollow"
                  :href = "options.trip_link")
                  | <svg class="icon icon-trip"><use xlink:href="#icon-trip"></use></svg>

              li(v-if = "options.linked_link")
                a(
                  target = "_blank"
                  rel = "nofollow"
                  :href = "options.linked_link")
                  | <svg class="icon icon-trip"><use xlink:href="#icon-linked"></use></svg>

          .copyright.hidden-md.hidden-lg(v-if = "options.text_copyright") &copy; СulinaryOn, 2012—2020 {{ options.text_copyright }}

        footer-menu(:menu = "menu")

        .copyright.hidden-sm.hidden-xs(v-if = "options.text_copyright") &copy; СulinaryOn, 2012—2020 {{ options.text_copyright }}

    cookies(v-if = "options.modal_cookie_enable == 1")
</template>

<script>
import Cookies from "~/components/params/Cookies"
import FooterMenu from "~/components/menu/FooterMenu"
import WidgetPartners from "~/components/widgets/WidgetPartners"

export default {
  components: {
    Cookies,
    FooterMenu,
    WidgetPartners
  },
  props: ["options", "menu", "hidePartners"],
  methods: {
    cleanPhone(phone) {
      return phone.replace(/[^+\d]/g, "")
    },
    scrollTop() {
      if (process.browser) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>

.site-footer
  background: #19181d
  padding: 60px 0 35px

  @media (max-width: 991px)
    padding: 40px 0

  @media (max-width: 767px)
    padding: 30px 0

  .container
    display: flex
    flex-wrap: wrap
    align-items: flex-start
    position: relative

    .col__info
      width: 34%
      color: #fff

      @media (max-width: 991px)
        width: 40%
        position: absolute
        top: 0
        left: 40px
        z-index: 1

      @media (max-width: 767px)
        position: static
        left: initial
        width: 100%
        order: 5

  .text--gray
    display: block
    font-size: 17px
    color: #979797

  .tel
    font-size: 24px
    color: #fff

    &:hover
      color: #940084

  .copyright
    width: 100%
    font-size: 14px
    color: #979797
    line-height: 1.786
    margin-top: 45px

    @media (max-width: 991px)
      margin-top: 20px
      padding-right: 40px
      line-height: 1.3

#button-up
  display: block
  position: fixed
  right: 40px
  bottom: 60px
  background: #fff
  border: 3px solid #B01FA1
  z-index: 7
  width: 50px
  height: 50px
  cursor: pointer
  opacity: 0
  visibility: hidden
  pointer-events: none
  transition: opacity 1s

  .arrow-up
    &::before
      content: ''
      position: absolute
      width: 20px
      height: 3px
      top: 20px
      right: 18px
      background-color: #B01FA1
      box-shadow: 0 3px 5px rgba(0, 0, 0, .2)
      transform: rotate(-45deg)

    &::after
      content: ''
      position: absolute
      width: 20px
      height: 3px
      top: 20px
      right: 6px
      background-color: #B01FA1
      transform: rotate(45deg)

  &:hover
    background-color: #B01FA1

    .arrow-up
      &::after,
      &::before
        background-color: #fff

  &.show
    opacity: 1
    visibility: visible
    pointer-events: all
</style>
