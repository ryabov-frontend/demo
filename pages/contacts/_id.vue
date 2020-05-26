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

    Footer(
      :menu = "menu"
      :options = "options"
      :hide-partners = "data.template === 'partners_list'")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
import $ from "jquery"

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
      `/api/site/get-page-info-by-slug?slug=${params.id}`
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
  mounted() {
    // Табы на странице контактов
    // https://culinaryon.ru/contacts/novinskij-bulvar.html

    $('.tabs > ul > li:first-child').addClass('active')
    $('.tabs > div > div:first-child').show()
    $('.tabs > div > div:last-child').hide()

    $('.tabs > ul > li').on('click', function(element) {
      $('.tabs > ul > li').removeClass('active')
      $('.tabs > ul > li:nth-child(' + ($(this).index() + 1) + ')').addClass('active')

      $('.tabs > div > div').hide()
      $('.tabs > div > div:nth-child(' + ($(this).index() + 1) + ')').show()
    });
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

.tabs
  display: block

  & > div
    padding-top: 10px

  ul
    margin: 0px
    padding: 0px

    &::after
      content: ''
      display: block
      clear: both
      height: 5px
      background: #d4d800

    li
      margin: 0px
      padding: 0px
      cursor: pointer
      display: block
      float: left
      padding: 10px 15px
      background: #940084
      color: #ffffff

      &:hover
        background: #d6d6d7

      &.active,
      &.active:hover
        background: #d4d800
        color: #fff

// .breadcrumbs
//   padding-top: 0 !important

</style>
