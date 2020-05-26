<template lang="pug">
  .widget.widget--guests.bg-gray(v-if = "related.length > 0")
    .container
      h3.widget__title.text-center(v-if = "!title") Гости, выбравшие эту вечеринку, <span class="text-default">также смотрели:</span>

      h3.widget__title.text-center(
        v-else
        v-html = "title")

      .carousel-wrapper
        client-only
          carousel(v-bind = "optionsCarousel")

            slide(
              v-for = "(item, i) in related"
              :key = "item.name")

              widget-master-class(
                :events = "[item]"
                :currency = "currency"
                :mini = "true")

      .more
        nuxt-link(to = "/calendar") Посмотреть весь календарь
</template>

<script>
import WidgetMasterClass from "~/components/widgets/WidgetMasterClass"

export default {
  components: {
    WidgetMasterClass
  },
  props: ['related', 'currency', 'title'],
  data: () => ({
    optionsCarousel: {
      loop: true,
      perPage: 4,
      paginationEnabled: false,
      centerMode: true,
      mouseDrag: true,
      touchDrag: true,
      navigationEnabled: true,
      scrollPerPage: false
    },
    windowWidth: 0
  }),
  watch: {
    windowWidth(newWidth, oldWidth) {
     this.optionsCarousel.perPage = newWidth < 767 ? 1 : 4
    }
  },
  mounted () {
    this.windowWidth = window.innerWidth
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style lang="sass">

.widget--guests
  padding: 50px 0

  .container
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column

    @media (max-width: 767px)
      padding-left: 10px
      padding-right: 10px

  .widget__title
    max-width: 70%
    margin-left: auto
    margin-right: auto

    @media (max-width: 1259px)
      max-width: 100%

  .more
    display: block
    text-align: center
    margin-top: 30px

    a
      font-size: 18px
      color: #940084
      text-decoration: underline
      line-height: 1.2

</style>
