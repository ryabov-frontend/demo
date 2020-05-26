<template lang="pug">
  div
    .site-top
      Header(
        :menu = "menu"
        :options = "options")

      main.site-main
        .heading
          .container
            h1 Кулинарные <span class="text-default">мастер-классы</span> в CulinaryOn

        .widget.widget-classes
          .container

            h3.text-center.title.m-t-30.m-b-30(v-html = "data.name")

            .text(v-html = "data.description")

            .master_class-list-new
              .master_class-new.classes(
                v-for = "(item, i) in data.classes"
                :key = "item.id")

                nuxt-link(
                  :to = "item.slug"
                  class="master_class-new__link")

                .master_class-new__thumb(:style = "{ backgroundImage: 'url(' + item.image + ')' }")

                nuxt-link(
                  :to = "item.slug")
                  .master_class-new__info(:style = "{ backgroundColor: getBackground(i + 1) }")
                    span.date {{ item.name }}
                    .name {{ item.description }}

    Footer(
      :menu = "menu"
      :options = "options")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const options = await $axios.$get("/api/site/get-params")
    const menu = await $axios.$get("/api/site/get-menu")
    const data = await $axios.$get(
      `/api/site/get-page-info-by-slug?slug=classes/${params.slug}`
    )
    console.log(data)
    return { options, menu, data }
  },
  data: () => ({
    meta: {
      title: "",
      description: "",
      keywords: "",
      og_image: ""
    }
  }),
  created() {
    this.meta = this.data.meta

    if (process.browser) {
      // Ловим ссылки внутри теста

      document.addEventListener('click', e => {
        const target = e.target

        if (
          target.getAttribute('data-action') &&
          target.getAttribute('data-action') === 'modal-order-event'
        ) {
          this.showModal('header', target.getAttribute('data-event-ya') || '')

          e.stopPropagation()
          e.preventDefault()
        }
      })
    }
  },
  methods: {
    showModal(place, analytic) {
      this.$store.dispatch('showModal', {
        place: place,
        analytic: analytic
      })
    },
    getBackground(index) {
      let color
      switch (index) {
        case 1:
        case 8:
        case 15:
        case 22:
          color = this.$store.state.colors[0]
          break
        case 2:
        case 9:
        case 16:
        case 23:
          color = this.$store.state.colors[1]
          break
        case 3:
        case 10:
        case 17:
        case 24:
          color = this.$store.state.colors[2]
          break
        case 4:
        case 11:
        case 18:
        case 25:
          color = this.$store.state.colors[3]
          break
        case 5:
        case 12:
        case 19:
        case 26:
          color = this.$store.state.colors[4]
          break
        case 6:
        case 13:
        case 20:
        case 27:
          color = this.$store.state.colors[5]
          break
        case 7:
        case 14:
        case 21:
        case 28:
          color = this.$store.state.colors[6]
          break
      }
      return color
    }
  },
  head() {
    return {
      title: this.meta.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.meta.description
        },
        { hid: 'keywords', name: 'keywords', content: this.meta.keywords },
        { property: 'og:title', content: this.meta.title },
        { property: 'og:description', content: this.meta.description },
        { property: 'og:url', content: 'https://culinaryon.ru/classes/' },
        { property: 'og:image', content: this.meta.og_image }
      ]
    }
  }
}
</script>

<style lang="sass">

.widget-classes
  padding: 0 0 50px 0

  .text
    font-size: 19px
    margin-bottom: 30px

    p
      a
        font-size: 19px

  .date
    line-height: 23px
    margin-bottom: 5px

  .master_class-list-new
    margin: -45px -22.5px 0
    display: -ms-flexbox
    display: flex
    flex-wrap: wrap

    @media (max-width: 1259px)
      margin: -20px -10px 0

    @media (max-width: 767px)
      width: calc(100% - 20px)

  .master_class-new.classes .master_class-new__info
    min-height: 185px
    height: auto

    .name
      font-family: 'Myriad Pro', sans-serif

  .master_class-new.classes:hover .master_class-new__info
    transform: translate(0, 0)
</style>
