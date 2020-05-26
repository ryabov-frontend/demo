<template lang="pug">
  .site-footer-right
    .col__menu.col--1(
      v-for = "menu in items"
      :key = "menu.title")

      p.col__title {{ menu.title }}

      ul
        li(
          v-for = "item in menu.items"
          :key = "item.title")

          a(
            v-if = "item.url.includes('http')"
            :href = "item.url"
            :target = "item.target_blank ? '_blank' : false"
            :rel = "item.rel_nofollow ? 'nofollow' : false") {{ item.label }}

          nuxt-link(
            v-else
            :to = "item.url"
            :target = "item.target_blank ? '_blank' : false"
            :rel = "item.rel_nofollow ? 'nofollow' : false") {{ item.label }}
</template>

<script>
export default {
  props: ["menu"],
  data: () => ({
    items: []
  }),
  created() {
    let array = []
    this.menu.forEach(function(item) {
      if (item.type === 2) {
        array.push(item)
      }
    })
    this.items = array
  }
}
</script>

<style lang="sass">

.site-footer-right
  width: 66%
  display: flex
  flex-wrap: wrap
  align-items: flex-start
  position: relative

  @media (max-width: 991px)
    width: 100%
    padding-left: calc(40% + 40px)

  @media (max-width: 767px)
    padding-left: 0
    order: 1

.col__menu
  width: 33.334%

  @media (max-width: 991px)
    width: 100%
    margin-bottom: 20px

  .col__title
    font-family: Intro, sans-serif
    font-size: 13px
    color: #686478
    margin-bottom: 20px

    @media (max-width: 991px)
      margin-bottom: 15px

  ul
    li
      margin-bottom: 10px

      @media (max-width: 991px)
        display: inline-block
        margin: 0 10px 5px 0

      a
        color: #fff

        &:hover
          text-decoration: underline
</style>
