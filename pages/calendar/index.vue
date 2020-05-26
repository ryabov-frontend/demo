<template lang="pug">
  div
    .site-top
      Header(
        :menu = "menu"
        :options = "options")

      main.site-main
        .heading
          .container
            h1(v-html = "data.h1_title")

        .discounts-schedule.text-center(style = "background-color: #940084")
          .discounts-schedule__value
            font(color = "white") - 15% по промокоду LOVE

        filters(:events = "events")

        #calendar-form
          .widget.widget-schedule
            .container
              .widget-schedule-title
                span Всего {{ filtered.length }} мастер-классов

              h3(v-if = "filtered.length <= 0") Мастер-классов по вашему запросу не найдено

              .master_class-list-new(v-if = "filtered.length > 0")
                widget-master-class(
                  :events = "filtered"
                  :currency = "options.currency")

    Footer(
      :menu = "menu"
      :options = "options")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
import Filters from "~/components/params/Filters"
import WidgetMasterClass from "~/components/widgets/WidgetMasterClass"

export default {
  components: {
    Filters,
    WidgetMasterClass
  },
  async asyncData({ $axios }) {
    const options = await $axios.$get("/api/site/get-params")
    const menu = await $axios.$get("/api/site/get-menu")
    const data = await $axios.$get(
      '/api/site/get-page-info-by-slug?slug=calendar'
    )
    const events = await $axios.$get("/api/calendar/get-events")
    return { options, menu, data, events }
  },
  data: () => ({
    filtered: [],
    meta: {
      title: "",
      description: "",
      keywords: "",
      og_image: ""
    }
  }),
  watch: {
    "$route.query": {
      handler: function(query) {
        this.filteredEvents(query)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.meta = this.data.meta
    this.filteredEvents(this.$route.query)
  },
  methods: {
    filteredEvents(query) {
      let filtered = []
      this.events.forEach(event => {
        let access = true

        if (query.branch) {
          if (query.branch.split(",").indexOf(event.branch.id) === -1) {
            access = false
          }
        }

        if (access && query.month) {
          if (
            query.month
              .split(",")
              .indexOf(this.$moment.unix(event.dateStart).format("M")) === -1
          ) {
            access = false
          }
        }

        if (access && query.items) {
          if (
            query.items.split(",").indexOf(event.class.id.toString()) === -1
          ) {
            access = false
          }
        }

        if (access && query.price) {
          if (query.price.split(",").indexOf(event.price.toString()) === -1) {
            access = false
          }
        }

        if (access) {
          filtered.push(event)
        }
      })
      this.filtered = filtered
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

<style lang="sass" scoped>

.widget-schedule
  padding: 40px 0

  @media (max-width: 1259px)
    padding: 65px 0

  @media (max-width: 767px)
    padding: 45px 0

  &-title
    width: 100%
    margin-bottom: 30px
    font-family: 'Intro', sans-serif
    font-size: 15px
    color: #000
    line-height: 1.2

    @media (max-width: 991px)
      font-size: 18px

    @media (max-width: 767px)
      margin-bottom: 18px

.master_class
  &-list-new
    margin: -45px -22.5px 0

    @media (max-width: 1259px)
      margin: -20px -10px 0

    & > div
      display: flex
      flex-wrap: wrap
</style>
