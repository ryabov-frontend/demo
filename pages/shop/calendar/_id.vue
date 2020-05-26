<template lang="pug">
  div
    .site-top
      Header(
        :menu = "menu"
        :options = "options")

      main.site-main(v-if = "event")
        widget-breadcrumbs(:items = "breadcrumbs")

        .master_class-detail(
          itemscope
          itemtype="http://schema.org/Product")

          .container.flex
            h1.master_class-detail__main-title.visible-xs {{ event.name }}

            .master_class-detail__thumb(:style = "{ backgroundImage: 'url(' + event.image + ')' }")

              .info(:style = "'background-color:' + event.color")
                span.date {{ $moment.unix(event.dateStart).format('DD.MM') }} {{ getMonthName($moment.unix(event.dateStart).format('e')) }} | {{ $moment.unix(event.dateStart).format('HH:mm') }}
                span.price(
                  itemprop = "offers"
                  itemscope = ""
                  itemtype = "http://schema.org/Offer")
                  span(itemprop = "price") {{ event.price | thousandSeparator }}
                  | {{ options.currency }}
                  meta(itemprop = "priceCurrency" content = "RUB")

            .master_class-detail__main
              h1(
                class = "master_class-detail__main-title hidden-xs"
                itemprop = "name") {{ event.name }}

              span.master_class-detail__main-left(v-if = "event.numberSeats > 0") Осталось мест&nbsp;&mdash; {{ event.numberSeats }}
              span.master_class-detail__main-left(v-else) Мест нет

              nuxt-link(
                :to = "event.address.link"
                target = "_blank"
                class = "master_class-detail__main-studio") {{ event.address.name }}

              br(class = "visible-xs")

              span.master_class-detail__main-time Продолжительность {{ event.duration }} часа

              .master_class-detail__main-buttons
                .number-container.relative.omk-detail-counter(
                  data-product-count="area-241"
                  style="margin-bottom: 15px")

                  span(
                    class = "number-down"
                    data-product-count = "number-down"
                    @click.prevent = "updateProductCount('minus')") -

                  input(
                    v-model = "productCount"
                    type = "tel"
                    class = "form-control number active")

                  span(
                    class = "number-up"
                    data-product-count = "number-up"
                    @click.prevent = "updateProductCount('plus')") +

                button(
                  class= "btn btn-default _buy newsize"
                  @click.prevent = "showModal('addedcart', 'kypit', event)") Купить билет

                button(
                  class= "btn btn-default _has _pink newsize newstyle"
                  @click.prevent = "showModal('registerCertificate', 'omk-register', event)") Активировать сертификат

              p(style="margin-top: 20px;") Вы можете присоединиться к этому классу или заказать <span @click="showModal('header', 'ostavit')" rel="nofollow" class="link">частную вечеринку</span>.

              nuxt-link(
                to = "/faq"
                class = "master_class-detail__main-questions") Часто задаваемые вопросы

          widget-menu(
            :menu = "event.menu")

          widget-include(
            :list = "event.includeList"
            :text = "options.master_class_detail_text"
            :content = "event.content")

          .master_class-detail._no-margin
            widget-tripa(
              :label = "options.trip_text"
              :text = "event.tripAdvisorText"
              :link = "options.trip_link"
              :image = "options.trip_logo")

          widget-banner(
            :event = "event"
            :currency = "options.currency")

          widget-guests(
            :related = "related"
            :currency = "options.currency")

    Footer(
      :menu = "menu"
      :options = "options")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
import WidgetBreadcrumbs from "~/components/widgets/WidgetBreadcrumbs"
import WidgetMenu from "~/components/widgets/WidgetMenu"
import WidgetInclude from "~/components/widgets/WidgetInclude"
import WidgetTripa from "~/components/widgets/WidgetTripa"
import WidgetBanner from "~/components/widgets/WidgetBanner"
import WidgetGuests from "~/components/widgets/WidgetGuests"

export default {
  components: {
    WidgetBreadcrumbs,
    WidgetMenu,
    WidgetInclude,
    WidgetTripa,
    WidgetBanner,
    WidgetGuests
  },
  async asyncData({ $axios, params }) {
    const options = await $axios.$get("/api/site/get-params")
    const menu = await $axios.$get("/api/site/get-menu")
    const event = await $axios.$get(`/api/calendar/get-event?slug=${params.id}`)
    const related = await $axios.$get(
      `/api/calendar/get-related?price=${event.price}`
    )
    return { options, menu, event, related }
  },
  data: () => ({
    breadcrumbs: null,
    meta: {
      title: "",
      description: "",
      keywords: "",
      og_image: ""
    },
    productCount: 1
  }),
  created() {
    if (this.event) {
      this.breadcrumbs = [
        { link: "/", title: "Главная" },
        { link: "/calendar", title: "Расписание вечеринок" },
        { title: this.event.name, slug: "/calendar/" + this.$route.params.id }
      ]
      this.meta = this.event.meta
    }
  },
  methods: {
    async showModal(place, analytic, data) {
      if (place === 'addedcart') {
        let productCount = this.productCount

        if (!productCount || productCount <= 0) {
          productCount = 1
        }

        const response = await this.$axios.$get(
          `/api/cart/add?productId=${data.id}&productCount=${productCount || 1}`
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
    },
    updateProductCount(action) {
      if (action === 'minus') {
        if (this.productCount > 1) {
          this.productCount--
        }
      } else {
        this.productCount++
      }
    }
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.meta.description
        },
        { hid: "keywords", name: "keywords", content: this.meta.keywords },
        { property: "og:title", content: this.meta.title },
        { property: "og:description", content: this.meta.description },
        { property: "og:url", content: "https://culinaryon.ru/calendar/" },
        { property: "og:image", content: this.meta.og_image }
      ]
    }
  }
}
</script>

<style lang="sass">

.master_class-detail .widget--include ul,
.master_class-detail .widget--include ol
  padding-left: 20px
  padding-top: 20px

.master_class-detail .widget--include li
  font-size: 20px
  color: #373534
  line-height: 1.5
  text-align: justify
  letter-spacing: .3px
  list-style: disc

.master_class
  &-detail
    margin-top: 0

    @media (max-width: 1259px)
      margin-top: 38px

    @media (max-width: 767px)
      margin-top: 0

    .number
      &-container
        width: 100%
        display: flex
        align-items: center
        margin-bottom: 45px
        margin-top: auto

        @media (max-width: 767px)
          justify-content: center

        .number
          width: 40px
          height: 40px
          border-radius: 50%
          padding: 0
          margin: 0
          font-size: 24px
          line-height: 42px
          border: 1px solid #940084

      &-up
        margin-left: 10px

      &-down
        margin-right: 10px

      &-up,
      &-down
        position: static
        width: 30px
        height: 30px
        border-radius: 50%
        background: #940084
        padding: 0
        color: #fff
        line-height: 30px
        text-align: center
        font-size: 24px

    .flex
      display: flex
      flex-wrap: wrap
      align-items: flex-start
      position: relative

    &__thumb
      width: 50%
      background-repeat: no-repeat
      background-position: center
      background-size: cover
      min-height: 350px
      display: flex

      @media (max-width: 1259px)
        min-height: 305px

      @media (max-width: 767px)
        width: 100%

      .info
        margin-left: auto
        margin-top: auto
        padding: 29px 32px 29px 30px
        background: #e61676

        @media (max-width: 1259px)
          padding: 19px 22px 25px 20px

        .date
          display: block
          font-size: 30px
          font-family: 'Myriad Pro Cond', sans-serif
          color: #fff
          line-height: 1.2
          letter-spacing: .5px
          text-align: right

          @media (max-width: 1259px)
            font-size: 22px

        .price
          font-size: 39.317px
          font-family: 'Intro', sans-serif
          color: #fff
          line-height: 1.2
          position: relative
          top: 15px
          text-align: right
          display: block

          @media (max-width: 1259px)
            font-size: 28px

    &__main
      width: 50%
      padding-left: 38px
      margin-top: -6px
      display: flex
      flex-wrap: wrap
      flex-direction: column

      @media (max-width: 1259px)
        padding-left: 20px
        margin-top: 0

      @media (max-width: 767px)
        width: 100%
        padding-left: 0
        padding-top: 25px
        text-align: center

      &-time
        @media (max-width: 767px)
          text-align: left

      &-title
        font-size: 30px
        font-family: 'Intro', sans-serif
        color: #373534
        line-height: 1.333
        text-align: left
        letter-spacing: .5px
        padding-right: 7%
        margin-bottom: 28px

        @media (max-width: 1259px)
          font-size: 20px
          padding-right: 0
          margin-bottom: 13px

      &-buttons
        margin-top: 11px

        .btn
          font-size: 22px
          font-family: 'Intro', sans-serif
          color: #fff
          text-align: center
          height: 60px
          line-height: 60px
          padding: 0 22px
          border-radius: 30px
          letter-spacing: .4px
          display: inline-flex
          justify-content: center

          @media (max-width: 1259px)
            height: 50px
            line-height: 50px
            font-size: 18px
            margin-bottom: 10px

        ._has
          margin-left: 14px

          @media (max-width: 1259px)
            margin-left: 0

        .newstyle,
        .widget--include .buttons .newstyle
          border: 2px solid #940084
          background: transparent
          color: #940084

          @media (max-width: 991px)
            font-size: 16px !important

          @media (max-width: 767px)
            display: block
            width: fit-content
            margin: 10px auto
            border: none
            padding: 0
            border-bottom: 1px solid #940084
            border-radius: 0
            line-height: 25px
            height: auto

        .newsize,
        .buttons .newsize
          font-size: 18px !important

        .newstyle:hover,
        .newstyle:focus,
        .newstyle:active,
        .widget--include .buttons .newstyle:hover,
        .widget--include .buttons .newstyle:focus,
        .widget--include .buttons .newstyle:active
          border: 2px solid #940084
          background: #940084
          color: #fff

          @media (max-width: 767px)
            border: none
            border-bottom: 1px solid transparent
            background: transparent
            color: #940084

      &-left
        display: block
        font-size: 18px
        font-family: 'Intro', sans-serif
        color: #d4d700
        line-height: .778
        margin-left: 2px
        letter-spacing: .4px
        margin-bottom: 31px

        @media (max-width: 1259px)
          margin-bottom: 8px
          font-size: 16px

      &-studio
        font-family: 'Myriad Pro Cond', sans-serif
        font-size: 24px
        color: #373534
        text-decoration: underline
        line-height: 1
        text-align: left
        padding: 3px 0 3px 23px
        background: url('~assets/images/icons/icon-pin.png') 3px center no-repeat
        letter-spacing: .3px

        @media (max-width: 1259px)
          font-size: 20px
          background: url('~assets/images/icons/icon-pin.png') 3px center/9px no-repeat
          padding-left: 16px

      &-time
        font-family: 'Myriad Pro Cond', sans-serif
        font-size: 24px
        margin: 9px 0 0
        display: block
        width: 100%
        padding: 2px 0 3px 28px
        background: url('~assets/images/icons/icon-clock.png') 3px 9px no-repeat
        letter-spacing: .4px

        @media (max-width: 1259px)
          font-size: 20px
          padding-left: 20px
          background: url('~assets/images/icons/icon-clock.png') 0 10px/15px no-repeat

      &-questions
        font-size: 18px
        color: #373534
        text-decoration: underline
        line-height: 1.333
        margin-top: 15px
        letter-spacing: .5px
        display: block

        @media (max-width: 1259px)
          font-size: 16px
          margin-top: 10px
</style>
