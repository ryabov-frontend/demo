<template lang="pug">
  div
    .site-top
      Header(
        :menu = "menu"
        :options = "options")

      main.site-main
        .widget.widget--certificates
          .container
            h1.widget__title.text-center <span class="text-default">Сертификаты</span>  на кулинарные мастер-классы

          .discounts-schedule.text-center(style = "background-color: #940084; margin-bottom: 30px;")
            .discounts-schedule__value
              font(color = "white") - 15% по промокоду LOVE

          .container(v-if = "Object.keys(certificatesFiltered).length > 0")
            .certificates
              .certificates__item(
                v-for = "item in certificatesFiltered"
                :key = "item.id")

                nuxt-link.certificates__item-thumb(
                  :to = "item.slug"
                  :style = "{ backgroundImage: 'url(' + item.image + ')' }")

                .certificates__item-info(:style = "'background-color:' + item.color")
                  span.name {{ item.name }}

                  .certificates__item-tool
                    span.price {{ item.price | thousandSeparator }} {{ options.currency }}

                    .number-container.relative.omk-detail-counter
                      span(
                        class="number-up"
                        @click.prevent = "updateProductCount('plus', item)") +

                      input(
                        v-model = "item.productCount"
                        type = "tel"
                        class = "form-control number active")

                      span(
                        class="number-down"
                        @click.prevent = "updateProductCount('minus', item)") -

                  button(
                    class = "btn"
                    @click.prevent = "showModal('addedcart', 'cart-add-product', item)"
                    :style = "'color:' + item.color") Купить

        widget-guests(
          :related = "related"
          :currency = "options.currency"
          :title = "'Или <span class=\"text-default\">купите сертификат</span> на конкретный мастер-класс'")

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
  async asyncData({ $axios, params }) {
    const options = await $axios.$get('/api/site/get-params')
    const menu = await $axios.$get('/api/site/get-menu')
    const certificates = await $axios.$get('/api/shop/get-certificates')
    const related = await $axios.$get('/api/calendar/get-related')
    const data = await $axios.$get(`/api/site/get-page-info-by-slug?slug=${params.id}`)
    return { options, menu, certificates, related, data }
  },
  data: () => ({
    meta: {
      title: '',
      description: '',
      keywords: '',
      og_image: ''
    },
    certificatesFiltered: []
  }),
  created() {
    if (this.data) {
      this.meta = this.data.meta || {}
    }
    if (Object.keys(this.certificates)) {
      this.certificates.forEach((x, i) => {
        let item = x
        item.productCount = 1
        this.certificatesFiltered.push(item)
      })
    }
  },
  methods: {
    async showModal(place, analytic, data) {
      if (place === 'addedcart') {
        let productCount = data.productCount

        if (!productCount || productCount <= 0) {
          productCount = 1
        }

        const response = await this.$axios.$get(`/api/cart/add?productId=${data.id}&productCount=${productCount || 1}`)

        this.$router.push('/shop/cart')
      } else {

        this.$store.dispatch('showModal', {
          place: place,
          analytic: analytic,
          data: {event: data}
        })
      }
    },
    updateProductCount(action, event) {
      let productCount = event.productCount
      if (action === 'minus') {
        if (productCount > 1) {
          event.productCount--
        }
      } else {
        event.productCount++
      }
    }
  },
  head() {
    return {
      title: this.meta.title || '',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description || ''
        },
        { hid: 'keywords', name: 'keywords', content: this.meta.keywords || '' },
        { property: 'og:title', content: this.meta.title || '' },
        { property: 'og:description', content: this.meta.description || '' },
        { property: 'og:url', content: 'https://culinaryon.ru/calendar/' },
        { property: 'og:image', content: this.meta.og_image || '' }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>

.widget--certificates
  padding: 60px 0

  h1
    margin-bottom: 40px

  .certificates
    display: flex
    flex-wrap: wrap
    margin: -20px -10px 0

    &__item
      margin: 20px 10px 0
      width: calc(25% - 20px)

      @media (max-width: 1259px)
        width: calc(33.3333% - 20px)

      @media (max-width: 991px)
        width: calc(50% - 20px)

      @media (max-width: 767px)
        width: calc(100% - 20px)

      &-thumb
        display: block
        width: 100%
        height: 285px
        background-repeat: no-repeat
        background-size: cover
        background-position: center

      &-tool
        width: 100%
        display: flex
        align-items: center
        margin-top: 15px

        .price
          width: calc(50% - 7px)
          color: #fff
          font-size: 18px
          font-family: 'Intro', sans-serif
          border: 2px solid #fff
          border-radius: 30px
          padding: 16px 10px 15px
          text-align: center

      &-info
        padding: 20px
        background: #940084

        .number
          width: 52px
          height: 52px
          line-height: 52px
          padding: 0

        .number-up
          width: 25px
          height: 25px
          line-height: 25px
          border-radius: 50%
          background: #fff
          position: absolute
          top: 50%
          left: calc(100% + 3px)
          transform: translate(0, -50%)
          padding: 0
          text-align: center
          font-weight: 400
          font-size: 24px

        .number-down
          width: 25px
          height: 25px
          line-height: 25px
          border-radius: 50%
          background: #fff
          position: absolute
          top: 50%
          left: -29px
          transform: translate(0, -50%)
          padding: 0
          text-align: center
          font-weight: 400
          font-size: 24px

        .name
          font-size: 18px
          font-family: 'Intro', sans-serif
          color: #fff
          line-height: 1.333
          text-align: left
          display: block
          max-width: 80%
          min-height: 69px

        .btn
          margin-top: 15px
          background: #fff
          color: #940084
          height: 60px
          line-height: 63px
          border-radius: 30px
          padding: 0 10px
          font-size: 24px
          font-family: 'Intro', sans-serif
          width: 100%
          text-align: center
          display: block

</style>
