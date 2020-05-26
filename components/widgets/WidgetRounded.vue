<template lang="pug">
  .master_class-detail._no-margin
    .widget.widget--tripa
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

                .age-block
                  .age__thumb(:style = "{ backgroundImage: 'url(' + item.image + ')' }")
                  .age__number(v-html = "item.name.title")
                  .age__description(v-html = "item.content")

        hr

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

<style lang="sass" scoped>

.age
  width: 300px
  padding: 0 10px
  text-align: center

  &__thumb
    width: 270px
    height: 270px
    border-radius: 50%
    background-repeat: no-repeat
    background-position: center
    background-size: cover
    margin: 0 auto 15px

    @media (max-width: 1259px)
      width: 220px
      height: 220px

    @media (max-width: 991px)
      width: 150px
      height: 150px
      margin-bottom: 5px

  &__number
    display: block
    width: 100%
    font-size: 40px
    font-family: 'Myriad Pro Cond', sans-serif
    color: #373534
    line-height: 1.2
    text-align: center
    margin-bottom: 15px

    @media (max-width: 991px)
      font-size: 22px
      margin-bottom: 5px

  &__description
    display: block
    width: 100%
    font-size: 18px
    color: #373534
    line-height: 1.2
    text-align: center
    margin: 0

    @media (max-width: 991px)
      font-size: 12px

</style>
