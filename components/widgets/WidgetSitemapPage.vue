<template lang="pug">
  .widget.widget--mini.widget--content
    .container
      h1.widget__title.text-center Карта сайта

      ul(style = "margin-top: 30px; padding-bottom: 30px;")
        li(
          v-for = "item in items"
          :key = "item.name")

          nuxt-link(
            v-if = "item.link"
            :to = "item.link") {{ item.name }} 

          ul(
            v-if = "item.childs"
            style="padding-left: 30px;")

            li(
              v-for = "child in item.childs"
              :key = "child.name")

              nuxt-link(
                v-if = "child.link"
                :to = "child.link") {{ child.name }}
</template>

<script>
export default {
  props: ["items"]
}
</script>

<style lang="sass" scoped></style>
