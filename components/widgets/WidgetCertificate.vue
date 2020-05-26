<template lang="pug">
  .widget.widget-certificate
    .certificate-thumb(
      style = "background-image: url('https://culinaryon.ru/uploads/cache/Elements/Element9/562905566f-1.jpg')")

    .certificate-content.gradient-v
      p.widget__title.text-white(
        v-if = "name.tag === 'p'"
        v-html = "name.title")

      nuxt-link(
        :to = "button.link"
        class = "btn btn-primary _huge") {{ button.name }}

</template>

<script>
export default {
  props: ["name", "button"]
}
</script>

<style lang="sass" scoped>

.widget-certificate
  display: flex
  flex-wrap: wrap
  padding: 0

  .certificate-thumb
    width: 35%
    background-size: cover
    background-repeat: no-repeat
    background-position: center

    @media (max-width: 991px)
      width: 100%
      min-height: 285px

    @media (max-width: 767px)
      min-height: 200px

  .certificate-content
    width: 65%
    padding: 60px

    @media (max-width: 991px)
      width: 100%
      text-align: center
      padding: 55px 20px

    @media (max-width: 767px)
      width: 100%
      text-align: center
      padding: 50px 20px

    .widget__title
      @media (max-width: 991px)
        text-align: center
        font-size: 38px
        margin-bottom: 30px

      @media (max-width: 767px)
        text-align: center
        font-size: 28px
        margin-bottom: 40px

    .btn._huge
      height: 55px
      line-height: 55px
      min-width: 290px

      @media (max-width: 767px)
        width: 100%
</style>
