<template lang="pug">
  .breadcrumbs(:class = "{ 'hide': !items || items.length <= 0 }")
    .container
      ul.shop-breadcrumbs(
        itemscope = ""
        itemtype = "http://schema.org/BreadcrumbList")

        li(
          itemprop = "itemListElement"
          itemscopeitemtype = "http://schema.org/ListItem"
          v-for = "(item, i) in items")

          div(v-if = "item.link")
            nuxt-link(
              :id = "i"
              :to = "item.link"
              itemtype = "http://schema.org/Thing"
              itemprop = "item")

              span(itemprop = "name" v-html = "item.title")
            meta(
              itemprop = "position"
              :content = "i")

          div(v-else)
            meta(
              itemscope = ""
              itemtype = "http://schema.org/Thing"
              itemprop = "item"
              :itemid = "item.slug")

            span(itemprop = "name" v-html = "item.title")
            meta(
              itemprop = "position"
              :content = "i")
</template>

<script>
export default {
  props: ["items"]
}
</script>

<style lang="sass">

.breadcrumbs
  padding: 30px 0 0

  &.hide
    display: none !important

  @media (max-width: 1259px)
    padding: 17px 0

  ul
    &.shop-breadcrumbs
      margin-bottom: 30px

      @media (max-width: 767px)
        margin-bottom: 0px

    li
      display: inline-block
      vertical-align: top
      margin-right: 5px
      font-size: 18px
      color: #373534
      line-height: 1.2
      letter-spacing: .3px

      @media (max-width: 1259px)
        font-size: 14px

      .text-default
        color: #373534 !important

      div
        display: inline-block
        vertical-align: top

      a
        font-size: 18px
        color: #373534
        position: relative

        @media (max-width: 1259px)
          font-size: 14px

        &:before
          content: ''
          position: absolute
          bottom: 2px
          height: 1px
          left: 0
          right: 0
          background: #373534
          transition: all .3s ease

        &:hover
          &::before
            opacity: 0

      &:not(:last-child):after
        content: '>'
        font-size: 18px
        display: inline-block
        vertical-align: middle
        margin-left: 9px

        @media (max-width: 1259px)
          font-size: 14px
</style>
