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
          :related = "related")

    Footer(
      :menu = "menu"
      :options = "options")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const options = await $axios.$get("/api/site/get-params")
    const menu = await $axios.$get("/api/site/get-menu")
    const related = await $axios.$get("/api/calendar/get-related")
    const data = await $axios.$get("/api/site/get-page-info-by-slug?slug=index")
    return { options, menu, related, data }
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
      const reg = /(\<!--.*?\-->)/g

      this.$store.dispatch("jivo", this.options.js_google_tag.replace(reg, ""))
      this.$store.dispatch("jivo", this.options.js_webitel.replace(reg, ""))
      this.$store.dispatch(
        "jivo",
        this.options.js_google_tag_noscript.replace(reg, "")
      )
      this.$store.dispatch("jivo", this.options.js_ya_metrika.replace(reg, ""))
      // this.$store.dispatch('jivo', this.options.js_jivosite.replace(reg, ''))
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
        { property: "og:url", content: "http://dev.culinaryon.ru/" },
        { property: "og:image", content: this.meta.og_image }
      ]
    }
  }
}
</script>
