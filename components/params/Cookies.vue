<template lang="pug">
  #gdpr-cookie-message(:class = "{ 'show': show }")
    h4 🍪 {{ $parent.options.modal_cookie_title }}

    p(v-html = "$parent.options.modal_cookie_text")

    p
      nuxt-link(:to = "$parent.options.modal_cookie_info_link") {{ $parent.options.modal_cookie_info_label }}

    p
      button#gdpr-cookie-accept(
        type = "button"
        @click.prevent = "acceptCookies") Я согласен
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  created() {
    if (this.$cookies.get('cookies') !== 'accept') {
      setTimeout(() => {
        this.show = true
      }, 2000)
    }
  },
  methods: {
    acceptCookies() {
      this.show = false
      this.$cookies.set('cookies', 'accept', {
        path: '/'
      })
    }
  }
}
</script>

<style lang="sass" scoped>

#gdpr-cookie-message
  position: fixed
  right: 30px
  bottom: 30px
  max-width: 375px
  background-color: #b5b5b5
  padding: 20px
  border-radius: 5px
  box-shadow: 0 6px 6px rgba(0, 0, 0, .25)
  margin-left: 30px
  z-index: 999
  transition: opacity .3s
  opacity: 0
  pointer-events: none

  &.show
    opacity: 1
    pointer-events: all

  h4
    color: #940084
    font-size: 18px
    font-weight: 500
    margin-bottom: 10px

  h5
    color: #779600
    font-family: 'Quicksand', sans-serif
    font-size: 15px
    font-weight: 500
    margin-bottom: 10px

  p,
  ul
    color: #2f2f2f
    font-size: 15px
    line-height: 1.5em

  p
    &:last-child
      margin-bottom: 0
      text-align: right

  ul
    li
      width: 49%
      display: inline-block

  a
    color: #940084
    text-decoration: none
    font-size: 15px
    padding-bottom: 2px
    border-bottom: 1px dotted #940084
    transition: all .3s ease-in

    &:hover
      color: white
      border-bottom-color: #940084
      transition: all .3s ease-in

  button
    border: none
    background: #940084
    color: white
    font-family: 'Quicksand', sans-serif
    font-size: 15px
    padding: 7px
    border-radius: 3px
    margin-left: 15px
    cursor: pointer
    transition: all 0.3s ease-in

    &#gdpr-cookie-advanced
      display: none
      background: white
      color: #940084

    &:hover
      background: white
      color: #940084
      transition: all 0.3s ease-in
</style>
