<template lang="pug">
  div
    .site-top
      Header(
        :menu = "menu"
        :options = "options")

      main.site-main
        .widget
          .container
            .site-error
              h1 Страница не найдена.<br>Пожалуйста, вернитесь на главную или выберите ближайший мастер-класс:

          widget-guests(
            :related = "related"
            :currency = "options.currency"
            :title = "'Ближайшие <span class=\"text-default\">мастер-классы:</span>'")

    Footer(
      :menu = "menu"
      :options = "options")

    modal(:data = "$store.state.actions.modal")
</template>

<script>
import WidgetGuests from '~/components/widgets/WidgetGuests'

export default {
  components: {
    WidgetGuests
  },
  props: ['error'],
  async asyncData({ $axios }) {
    const options = await $axios.$get('/api/site/get-params')
    const menu = await $axios.$get('/api/site/get-menu')
    const related = await $axios.$get('/api/calendar/get-related')
    return { options, menu, related }
  },
  head() {
    return {
      title: 'Not Found (#404)'
    }
  }
}
</script>

<style lang="sass" scoped>
  h1
    font-size: 40px
    margin: 0 0 40px
    line-height: 1.1

    @media (max-width: 991px)
      font-size: 30.76923px
</style>
