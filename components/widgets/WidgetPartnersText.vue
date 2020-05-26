<template lang="pug">
  .container
    .list-widget-main
      .row(
        v-for = "item in items"
        :key = "item.id")

        .col-md-4.image-wrapper
          img(
            :src = "item.image"
            :alt = "item.name")

        .col-md-8
          .title {{ item.name }}

          .description(v-html = "item.description")

</template>

<script>
export default {
  props: ["name", "items"]
}
</script>

<style lang="sass" scoped>

.list-widget-main
  .image-wrapper
    text-align: center

    img
      max-width: 300px

  .title
    font-weight: bold
    font-size: 25px
    margin-bottom: 15px
</style>
