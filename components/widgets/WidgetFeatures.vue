<template lang="pug">
  .widget.widget--features
    .container
      h1.widget__title.text-center(
        v-if = "name.tag === 'h1' && name.title"
        v-html = "name.title")

      h2.widget__title.text-center(
        v-if = "name.tag === 'h2' && name.title"
        v-html = "name.title")

      h3.widget__title.text-center(
        v-if = "name.tag === 'h3' && name.title"
        v-html = "name.title")

      p.widget__title.text-center(
        v-if = "name.tag === 'p' && name.title"
        v-html = "name.title")

      .carousel-wrapper
        client-only
          carousel(v-bind = "optionsCarousel")

            slide(
              v-for = "(item, i) in items"
              :key = "item.id")

              .features__item
                .features__item-thumb
                  img(:src = "item.image"
                      alt = "")

                p.features__item-title(v-html = "item.name.title")

                p.features__item-description(v-html = "item.content")

</template>

<script>
export default {
  props: ["name", "items"],
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

.widget--features.widget
  padding: 60px 0

  @media (max-width: 767px)
    padding: 30px 0

  .features
    &__item
      padding: 0 45px

      @media (max-width: 991px)
        padding: 0

      @media (max-width: 767px)
        padding: 0 40px

      &-thumb
        display: flex
        align-items: center
        justify-content: center
        margin-bottom: 15px
        height: 135px

        @media (max-width: 991px)
          height: 80px
          margin-bottom: 5px

        img
          max-height: 100%

      &-title
        font-size: 22px
        color: #373534
        line-height: 1.2
        display: block
        margin: 0 0 15px
        text-transform: uppercase
        text-align: center

        @media (max-width: 991px)
          font-size: 14px
          margin-bottom: 5px

      &-description
        font-size: 22px
        color: rgba(55, 53, 52, .502)
        line-height: 1.364
        text-align: center
        margin: 0 !important

        @media (max-width: 991px)
          font-size: 14px

</style>
