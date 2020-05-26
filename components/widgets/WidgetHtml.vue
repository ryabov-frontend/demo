<template lang="pug">
  div
    widget-breadcrumbs(:items = "breadcrumbs")

    .widget(:class = "{ 'widget--mini': type === 'text', 'widget--content': type === 'text' }")
      .container
        h1.widget__title.text-center(
          v-if = "tag === 'h1' && title"
          v-html = "title")

        h2.widget__title.text-center(
          v-if = "tag === 'h2' && title"
          v-html = "title")

        div(v-html = "content")
</template>

<script>
import WidgetBreadcrumbs from "~/components/widgets/WidgetBreadcrumbs"
export default {
  components: {
    WidgetBreadcrumbs
  },
  props: ['title', 'content', 'type', 'tag', 'breadcrumbs']
}
</script>

<style lang="sass" scoped></style>
