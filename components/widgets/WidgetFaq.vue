<template lang="pug">
  .container.blank-container(style = "padding-bottom: 35px")
    ul.faq
      li(
        v-for = "(item, i) in list"
        :key = "item.id")

        nuxt-link(
          :to = "item.slug"
          :style = "{ backgroundColor: getBackground(i + 1) }") {{ item.name }}
</template>

<script>
export default {
  props: ["list"],
  methods: {
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
  }
}
</script>

<style lang="sass" scoped>

.faq
  padding-left: 0

  li
    float: left
    padding: 0
    margin: 0 1.5% 1.5% 0
    list-style: none

    a
      width: 282px
      height: 282px
      color: #fff
      text-decoration: none
      text-align: center
      font-family: 'Intro', sans-serif
      font-size: 16px
      display: flex
      justify-content: center
      align-items: center
      line-height: 26px
      padding: 15px

      &:hover
        opacity: .4
        transition: all 1s ease 0s
</style>
