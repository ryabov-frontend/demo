<template lang="pug">
  .widget.widget--mini
    .container.relative
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

      .why-include(v-html = "content")
</template>

<script>
export default {
  props: ["name", "content"]
}
</script>

<style lang="sass">

.why-include
  text-align: left
  max-width: 50%
  margin: 0 auto
  font-size: 20px
  padding: 25px
  border: 2px dashed #851779
  border-radius: 15px

  @media (max-width: 767px)
    max-width: 90%
    font-size: 15px

  ul
    list-style: disc
    padding-left: 20px
</style>
