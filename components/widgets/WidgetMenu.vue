<template lang="pug">
  .widget.widget--menu
    .container
      p.widget__title.text-center <span class="text-default">Программа</span> мероприятия
      .master_class-detail__menu
        .master_class-detail__menu-item(
          v-for = "item in menu"
          :key = "item.name")
          .thumb(:style = "{ backgroundImage: 'url(' + item.photo + ')' }")
          p.title {{ item.name }}
</template>

<script>
export default {
  props: ["menu"]
}
</script>

<style lang="sass">

.widget--menu
  padding: 90px 0 45px

  @media (max-width: 1259px)
    padding-top: 55px !important
    padding-bottom: 20px !important

  .master_class-detail__menu
    display: flex
    align-items: flex-start
    justify-content: center
    flex-wrap: wrap
    margin: -25px -12.5px 0

    &-item
      width: calc(25% - 25px)
      margin: 25px 12.5px 0

      @media (max-width: 1259px)
        width: calc(50% - 25px)

      @media (max-width: 767px)
        width: calc(100% - 25px)

      .thumb
        min-height: 280px
        width: 100%
        background-size: cover
        background-repeat: no-repeat
        background-position: center
        margin-bottom: 7px

      .title
        font-size: 18px
        color: #373534
        line-height: 1.2
        text-align: center
</style>
