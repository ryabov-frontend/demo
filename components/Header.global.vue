<template lang="pug">
  header.site-header
    .site-header-top
      .container(
        itemscope
        itemtype = "http://schema.org/Organization")

        button.icon.icon-menu(@click = "showMenu = true")
          span.icon.icon-bar
          span.icon.icon-bar
          span.icon.icon-bar

        nuxt-link.site-logo(
          to = "/"
          itemprop = "url")

          img(
            src = "~assets/images/logo.png"
            alt = "КулинарнаястудияCulinaryOn"
            itemprop = "logo")

        .city-block.hidden-xs.hidden-sm(
          v-if = "options.cities && options.cities.length > 0"
          :class = "{ 'opened': citiesOpened }"
          @click = "toggleCities"
          v-click-outside = "hideCities")
          span.city-current
            span(
              v-for = "item in options.cities"
              :key = "item.name"
              v-if = "item.current") {{ item.name }}
          ul.city-list
            li(
              v-for = "item in options.cities"
              :key = "item.name")
              a(:href = "item.url") {{ item.name }}

        .contact-info.hidden-md.hidden-lg.hidden-xs
          a(
            :href = "'tel:' + cleanPhone(options.phone)"
            data-event-ya = "clic-tel"
            class = "phone"
            v-if = "options.phone") {{ options.phone }}

          a(
            :href = "'mailto:' + options.email"
            data-event-ya = "click-mail"
            class = "email"
            v-if = "options.email") {{ options.email }}

        .right
          .contact-info.hidden-xs.hidden-sm
            a(
              :href = "'tel:' + cleanPhone(options.phone)"
              data-event-ya = "clic-tel"
              class = "phone"
              v-if = "options.phone") {{ options.phone }}

            a(
              :href = "'mailto:' + options.email"
              data-event-ya = "click-mail"
              class = "email"
              v-if = "options.email") {{ options.email }}

          .btn.btn-default.call.hidden-xs.hidden-sm(
            @click = "showModal('header', 'book-event')") Заказать мероприятие

          .cart-block.hidden-md.hidden-lg
            nuxt-link(to = "/shop/cart")
            nuxt-link(to = "/shop/cart")
              img(
                src = "~assets/images/icons/icon-cart.svg"
                alt = "")

    .site-header-bottom(:class = "{ 'out': $store.state.headerMenuHide }")
      .container
        header-menu(
          :menu = "menu"
          :desktop = "true")

        .right
          cart

    .site-mobile-menu(:class = "{ 'opened': showMenu }")
      .site-mobile-menu__top
        .site-mobile-menu__header
          button.icon.icon-menu(@click = "showMenu = false")
            span.icon.icon-bar
            span.icon.icon-bar
            span.icon.icon-bar

          nuxt-link.logo(to = "/")
            img(src = "~assets/images/logo.png" alt="")

        .site-mobile-menu__nav
          header-menu(:menu = "menu")

      .site-mobile-menu__footer
        .city-block(
          v-if = "options.cities && options.cities.length > 0"
          :class = "{ 'opened': citiesMobileOpened }"
          @click = "toggleCitiesMobile"
          v-click-outside = "hideCitiesMobile")
          span.city-pre Город:
          span.city-current
            span(
              v-for = "item in options.cities"
              :key = "item.name"
              v-if = "item.current") {{ item.name }}
          ul.city-list
            li(
              v-for = "item in options.cities"
              :key = "item.name")
              a(:href = "item.url") {{ item.name }}

        .contact-info.hidden-sm
          a(
            :href = "'tel:' + cleanPhone(options.phone)"
            data-event-ya = "clic-tel"
            class = "phone"
            v-if = "options.phone") {{ options.phone }}
          a(
            :href = "'mailto:' + options.email"
            data-event-ya = "click-mail"
            class = "email"
            v-if = "options.email") {{ options.email }}

        ul.site-header__socials.visible-xs.visible-sm
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
</template>

<script>
import ClickOutside from 'vue-click-outside'
import HeaderMenu from "~/components/menu/HeaderMenu"
import Cart from "~/components/params/Cart"

export default {
  components: {
    HeaderMenu,
    Cart
  },
  directives: {
    ClickOutside
  },
  props: ['options', 'menu'],
  data: () => ({
    showMenu: false,
    citiesOpened: false,
    citiesMobileOpened: false
  }),
  methods: {
    showModal(place, analytic, msg) {
      this.$store.dispatch("showModal", {
        place: place,
        analytic: analytic,
        msg: msg
      })
    },
    cleanPhone(phone) {
      return phone.replace(/[^+\d]/g, "")
    },
    toggleCities() {
      this.citiesOpened = this.citiesOpened ? false : true
    },
    hideCities() {
      this.citiesOpened = false
    },
    toggleCitiesMobile() {
      console.log('lflflflf')
      this.citiesMobileOpened = this.citiesMobileOpened ? false : true
    },
    hideCitiesMobile() {
      this.citiesMobileOpened = false
    }
  }
}
</script>

<style lang="sass">

.site-header
  position: fixed
  top: 0
  left: 0
  right: 0
  background-color: transparent
  z-index: 1001

  .site-mobile-menu
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    max-width: 520px
    background-color: #940084
    z-index: 1000
    overflow-x: hidden
    overflow-y: auto
    box-shadow: 13.828px -2.19px 79px 0 rgba(6, 6, 23, .71)
    transition: all .5s ease
    transform: translate(-150%, 0)
    display: flex
    flex-wrap: wrap
    align-items: flex-start

    &__top
      margin-bottom: auto
      width: 100%

    &__footer
      width: 100%
      background-color: #700E66
      padding: 25px 20px
      text-align: center
      margin-top: auto

      .city-block
        font-size: 25px

        .city-list
          top: inherit
          bottom: calc(100% + 25px)
          right: -20px
          left: -30px
          background-color: #7E1673

          li
            a
              font-size: 25px
              color: #fff

        .city-pre
          font-size: 25px
          color: #A3619D

        .city-current
          font-size: 25px
          color: #fff

          &::before
            width: 11px
            top: 19px
            right: 10px
            height: 6px
            background: url('~assets/images/other/icon-arrow-mini.svg') no-repeat

          &::after
            opacity: 0

      .contact-info
        .phone
          display: block
          font-size: 25px
          font-weight: 700
          color: #fff
          white-space: nowrap

        .email
          display: block
          font-size: 18px
          color: #fff
          text-decoration: underline
          white-space: nowrap

    &__nav
      width: 100%
      margin-bottom: 40px

      @media (max-width: 767px)
        margin-bottom: 20px

      ul > li
        & > a
          display: block
          padding: 17px 50px
          font-size: 22px
          font-family: 'Intro', sans-serif
          color: #fff
          text-transform: uppercase

          @media (max-width: 767px)
            font-size: 20px
            padding: 17px 40px 17px 20px

        &.has-childs.opened
          & > a
            background-color: #7E1673

          .submenu
            display: block
            background-color: #7E1673
            padding: 15px 0 25px 40px
            padding-left: 0

            & > li > a
              color: #f2b6ec
              display: block
              padding: 12px 50px
              font-size: 22px
              font-family: 'Intro', sans-serif
              text-transform: uppercase

              @media (max-width: 767px)
                padding: 12px 20px

      .submenu
        display: none

    &__header
      margin-bottom: 35px
      width: 100%
      display: flex
      align-items: center

      @media (max-width: 767px)
        margin-bottom: 0

      .logo
        margin-top: -7px

      .icon
        position: relative
        margin-right: 20px
        display: flex
        align-items: center

      .icon-bar
        width: 4px
        height: 27px
        background-color: #fff
        margin: 0

        &:first-child
          margin-left: auto

        &:last-child
          margin-right: auto

        &:not(:last-child)
          margin-right: 6px
          margin-bottom: 0

    &.opened
      transform: translate(0, 0)

  .right
    margin-left: auto
    display: flex
    flex-wrap: wrap
    align-items: center

  &__socials
    list-style: none
    padding: 0
    margin-top: 10px

    @media (max-width: 991px)
      margin: 30px 0 0

    li
      display: inline-block
      vertical-align: top
      margin: 0 2px

      a
        display: inline-flex
        width: 25px
        height: 25px
        background: #940084
        text-align: center
        align-items: center
        justify-content: center

        @media (max-width: 991px)
          width: 30px
          height: 30px

        &:hover
          background: #B01FA1

        .icon
          max-width: 14px
          max-height: 14px
          color: #fff
          fill: #fff !important
          stroke: #fff

          @media (max-width: 991px)
            max-width: 18px
            max-height: 18px

  &-top
    height: 81px
    background: #fff
    box-shadow: 0px 0px 10px 0px #00000050

    .container
      display: flex
      flex-wrap: wrap
      align-items: center
      padding-top: 8px
      padding-bottom: 8px
      height: 81px

      @media (max-width: 991px)
        padding-left: 81px
        padding-right: 40px
        width: 100%

      @media (max-width: 767px)
        padding-right: 20px

      img
        max-height: 100%

    .right
      margin-left: auto
      display: flex
      flex-wrap: wrap
      align-items: center

      .btn
        @media (max-width: 1259px)
          min-width: 180px

    .contact-info
      margin: 6px 22px auto 54px

      @media (max-width: 1259px)
        margin-left: 10px
        margin-right: 10px

      @media (max-width: 991px)
        margin-top: auto
        margin-left: 60px
        margin-right: 60px

      .phone
        display: block
        font-size: 21px
        color: #000
        font-weight: 700
        line-height: 15px
        letter-spacing: .3px

        @media (max-width: 1259px)
          font-size: 18px

        &:hover
          color: #940186

      .email
        font-size: 13px
        padding-left: 7px
        color: #940186
        text-decoration: underline

        @media (max-width: 1259px)
          font-size: 12px

  &-bottom
    height: 54px
    background-color: #D4D52D
    transition: all .3s ease

    @media (max-width: 991px)
      display: none

    &.out
      opacity: 0
      visibility: hidden

    .container
      display: flex
      flex-wrap: wrap
      align-items: center

.city-block
  position: relative
  margin-left: 16px

  @media (max-width: 1259px)
    margin-left: 10px

  &::after
    content: ''
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 8
    pointer-events: none
    opacity: 0
    box-shadow: 0 18px 35px 0 rgba(57, 57, 57, .2)

  .city-current
    font-size: 18px
    display: inline-block
    line-height: 16px
    font-weight: 600
    padding: 15px 38px 15px 25px
    color: #940186
    position: relative
    cursor: pointer
    z-index: 10
    transition: all .3s ease

    @media (max-width: 1259px)
      font-size: 16px
      padding-left: 15px
      padding-right: 28px

    &::before
      content: ''
      position: absolute
      top: 21px
      right: 25px
      width: 7px
      height: 5px
      z-index: 9
      background: url('~assets/images/other/icon-arrow-city.svg') no-repeat
      transition: all .3s ease

      @media (max-width: 1259px)
        right: 15px

    &::after
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      z-index: 8
      background-color: #fff

    span
      position: relative
      z-index: 9
      border-bottom: 1px solid
      display: inline-block
      line-height: 15px

  .city-list
    position: absolute
    top: 100%
    left: 0
    right: auto
    background: #fff
    pointer-events: none
    z-index: 9
    padding: 10px 0
    opacity: 0
    transition: all .3s ease
    box-shadow: 0 18px 35px 0 rgba(57, 57, 57, .2)

    li
      cursor: pointer
      padding: 3px 45px 3px 25px

      a
        display: inline-block
        font-weight: 600
        font-size: 18px
        line-height: 14px
        color: #000
        white-space: nowrap
        border-bottom: 1px solid transparent

        @media (max-width: 1259px)
          font-size: 16px

        &:hover
          color: #940186
          border-color: #940186

  &.opened
    &::after
      opacity: 1

    .city-current
      &::before
        transform: rotate(180deg)

    .city-list
      pointer-events: all
      opacity: 1
</style>
