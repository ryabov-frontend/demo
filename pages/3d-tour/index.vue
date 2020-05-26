<template lang="pug">
  div
    .site-top
      Header(
        :menu = "menu"
        :options = "options")

      main.site-main
        Elements(
          v-for = "element in data.elements"
          :key = "element.id"
          :options = "options"
          :data = "element"
          :template = "data.template")

        widget-faq(
          v-if = "data.template === 'faq_list' && data.parentPages"
          :items = "data.parentPages")

        widget-partners-text(
          v-if = "data.template === 'partners_list' && data.parentPages"
          :items = "data.parentPages")

        widget-sitemap-page(
          v-if = "data.template === 'site_map' && data.parentPages"
          :items = "data.parentPages")

        widget-about-page(v-if = "data.template === 'about'")

        widget-wineon-page(v-if = "data.template === 'wineon'")

    Footer(
      :menu = "menu"
      :options = "options"
      :hide-partners = "data.template === 'partners_list'")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
import WidgetHeaderSlider from "~/components/widgets/WidgetHeaderSlider"
import WidgetFaq from "~/components/widgets/WidgetFaq"
import WidgetPartnersText from "~/components/widgets/WidgetPartnersText"
import WidgetWineonPage from "~/components/widgets/WidgetWineonPage"
import WidgetSitemapPage from "~/components/widgets/WidgetSitemapPage"
import WidgetAboutPage from "~/components/widgets/WidgetAboutPage"

export default {
  components: {
    WidgetHeaderSlider,
    WidgetFaq,
    WidgetPartnersText,
    WidgetWineonPage,
    WidgetSitemapPage,
    WidgetAboutPage
  },
  async asyncData({ $axios, params }) {
    const options = await $axios.$get("/api/site/get-params")
    const menu = await $axios.$get("/api/site/get-menu")
    const data = await $axios.$get(
      `/api/site/get-page-info-by-slug?slug=3d-tour`
    )
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
    this.breadcrumbs = [
      { link: "/", title: "Главная" },
      { link: "/classes", title: "Виды классов" },
      { title: this.data.name }
    ]
    this.meta = this.data.meta
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
        { property: "og:image", content: this.meta.og_image }
      ]
    }
  }
}
</script>

<style lang="sass">

h1
  font-size: 40px
  margin: 0 0 40px
  line-height: 1.1

  @media (max-width: 991px)
    font-size: 30.76923px

.contack-row
  padding: 15px
  text-align: center
  color: #FFFFFF

  .text-xs-center
    text-align: center !important
    color: #FFFFFF !important

  a
    color: #FFFFFF

  &.persian_green_approx
    background-color: #91278f

  &.bitter_lemon_approx
    background-color: #d4d800

.youtube
  iframe
    width: 100% !important
</style>
