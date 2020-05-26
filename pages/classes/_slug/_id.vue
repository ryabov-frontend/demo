<template lang="pug">
  div
    .site-top
      Header(
        :menu = "menu"
        :options = "options")

      main.site-main
          widget-header-slider(
            v-if = "data.image"
            :items = "[{image: data.image}]")

          widget-breadcrumbs(:items = "breadcrumbs")

          div(
            itemscope
            itemtype = "http://schema.org/Product")

            .heading
              .container
                h1(itemprop = "name") {{ data.name }}

            .container.blank-container
              .row
                .col-md-12(
                  itemprop = "description"
                  v-html = "data.content")

                .col-md-12


          widget-guests(
            :related = "related"
            :currency = "options.currency"
            :title = "'Ближайшие <span class=\"text-default\">мастер-классы:</span>'")

    Footer(
      :menu = "menu"
      :options = "options")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
import WidgetBreadcrumbs from '~/components/widgets/WidgetBreadcrumbs'
import WidgetGuests from '~/components/widgets/WidgetGuests'
import WidgetHeaderSlider from '~/components/widgets/WidgetHeaderSlider'

export default {
  components: {
    WidgetBreadcrumbs,
    WidgetGuests,
    WidgetHeaderSlider
  },
  async asyncData({ $axios, params }) {
    console.log(params)
    const options = await $axios.$get('/api/site/get-params')
    const menu = await $axios.$get('/api/site/get-menu')
    const related = await $axios.$get('/api/calendar/get-related')
    const data = await $axios.$get(`/api/calendar/get-class?slug=${params.slug}/${params.id}`)
    return { options, menu, data, related }
  },
  data: () => ({
    breadcrumbs: null,
    meta: {
      title: '',
      description: '',
      keywords: '',
      og_image: ''
    }
  }),
  created() {
    this.breadcrumbs = [
      { link: '/', title: 'Главная' },
      { link: '/classes', title: 'Виды классов' },
      { title: this.data.name }
    ]
    this.meta = this.data.meta
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
        { property: 'og:image', content: this.meta.og_image }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
