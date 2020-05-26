<template lang="pug">
  .widget.widget--additional.widget--mini.bg-purple
    .container.relative
      h1.widget__title.text-center.text-white(
        v-if = "name.tag === 'h1' && name.title"
        v-html = "name.title")

      h2.widget__title.text-center.text-white(
        v-if = "name.tag === 'h2' && name.title"
        v-html = "name.title")

      h3.widget__title.text-center.text-white(
        v-if = "name.tag === 'h3' && name.title"
        v-html = "name.title")

      p.widget__title.text-center.text-white(
        v-if = "name.tag === 'p' && name.title"
        v-html = "name.title")

      .list-ao
        li(
          v-for = "item in items"
          :key = "item.id")

          span.icon
            img(
              :src = "item.image"
              alt = "Culinaryon")

          | {{ item.name.title }}
</template>

<script>
export default {
  props: ["name", "items"]
}
</script>

<style lang="sass" scoped>

.bg-purple
  background-color: #940084

.list-ao
  display: flex
  flex-wrap: wrap
  padding: 0 20px
  list-style: none
  margin-top: -30px

  @media (max-width: 991px)
    margin-top: -15px

  li
    width: 20%
    position: relative
    font-size: 18px
    color: #fff
    line-height: 1.2
    margin-top: 30px
    text-align: center
    text-transform: uppercase
    font-weight: 700
    padding: 0 30px

    @media (max-width: 991px)
      font-size: 10px
      margin-top: 15px

    @media (max-width: 767px)
      width: 50%

    .icon
      display: flex
      align-items: center
      justify-content: center
      height: 150px
      width: 100%
      margin-bottom: 15px

      @media (max-width: 991px)
        height: 85px

      img
        margin: auto
        max-height: 100%
</style>
