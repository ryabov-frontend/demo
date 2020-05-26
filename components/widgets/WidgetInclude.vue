<template lang="pug">
  .widget.widget--include
    .container
      p.widget__title.text-center Что входит в <span class = "text-default">стоимость</span>

      ul.list-services
        li(
          v-for = "item in list"
          :key = "item.name")
          .icon
            img(
              :src = "item.photo"
              alt = "")
          span(style = "line-height: 20px;") {{ item.name }}

      .text
        p.text-gray {{ text }}
        .text-more
          span(
            itemprop = "description"
            v-html = "content")
</template>

<script>
export default {
  props: ["list", "text", "content"]
}
</script>

<style lang="sass">

.widget--include
  padding: 20px 0 20px

  @media (max-width: 1259px)
    padding-top: 35px !important
    padding-bottom: 55px !important

  .list-services
    display: flex
    flex-wrap: wrap
    padding-left: 90px
    padding-right: 10px
    margin-bottom: 30px

    @media (max-width: 1259px)
      .list-services
        padding: 0 35px

    @media (max-width: 767px)
      padding: 0
      margin-bottom: 20px

    li
      width: 50%
      position: relative
      display: inline-flex
      align-items: center
      font-size: 20px
      color: #373534
      line-height: 2.4
      margin-bottom: 10px

      @media (max-width: 1259px)
        line-height: 1.3
        font-size: 18px

      @media (max-width: 767px)
        width: 100%

      span
        width: calc(100% - 55px)

        @media (max-width: 1259px)
          width: calc(100% - 35px)

      .icon
        width: 55px
        text-align: center
        margin-right: 10px

        @media (max-width: 1259px)
          width: 35px
          margin-right: 15px

        img
          margin: 0 auto
</style>
