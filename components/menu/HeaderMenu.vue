<template lang="pug">
  nav(:class = "{ 'site-nav': desktop }")
    ul
      li(
        v-for = "(item, i) in items"
        :key = "item.label"
        :class = "{ 'has-childs': item.childrenItems.length > 0, \
                    'opened': showChildenLabel === item.label }")

        a(
          v-if = "item.url.includes('http') && desktop"
          :href = "item.url || '/'"
          :target = "item.target_blank ? '_blank' : false"
          :rel = "item.rel_nofollow ? 'nofollow' : false"
          no-prefetch) {{ item.label }}

        nuxt-link(
          v-else-if = "desktop || (!desktop && item.childrenItems.length <= 0)"
          :to = "item.url || '/'"
          :target = "item.target_blank ? '_blank' : false"
          :rel = "item.rel_nofollow ? 'nofollow' : false"
          no-prefetch) {{ item.label }}

        a(
          v-else-if = "!desktop && item.childrenItems.length > 0"
          href = "javascript:void(0);"
          @click = "showChildenItems(i)") {{ item.label }}

        ul.submenu(v-if = "item.childrenItems.length > 0")
          li(
            v-for = "subitem in item.childrenItems"
            :key = "subitem.label")

            a(
              v-if = "subitem.url.includes('http')"
              :href = "subitem.url || '/'"
              :target = "subitem.target_blank ? '_blank' : false"
              :rel = "item.rel_nofollow ? 'nofollow' : false"
              no-prefetch) {{ subitem.label }}

            nuxt-link(
              v-else
              :to = "subitem.url || '/'"
              :target = "subitem.target_blank ? '_blank' : false"
              :rel = "item.rel_nofollow ? 'nofollow' : false"
              no-prefetch) {{ subitem.label }}
</template>

<script>
export default {
  props: ["menu", "desktop"],
  data: () => ({
    items: [],
    showChildenLabel: ''
  }),
  created() {
    this.menu.forEach(item => {
      if (item.type === 1) {
        this.items = item.items
      }
    })
  },
  methods: {

    showChildenItems (i) {
      if (this.showChildenLabel === this.items[i].label) {
        this.showChildenLabel = ''
      } else {
        this.showChildenLabel = this.items[i].label
      }
    }

  }
}
</script>

<style lang="sass">

.site-nav
  & > ul
    & > li
      display: inline-block
      margin-right: 3px

      &:last-child
        margin-right: 0

      & > a
        font-family: Intro, sans-serif
        text-transform: uppercase
        font-size: 14px
        height: 54px
        display: block
        color: #4f420c
        line-height: 56px
        padding: 0 15px
        letter-spacing: .1px

        @media (max-width: 1259px)
          font-size: 11px
          letter-spacing: 0
          padding: 0 10px

        &.nuxt-link-exact-active
          background-color: #E9EA43

      &:hover
        & > a
          background-color: #E9EA43

          &::before
            margin-top: -4px !important
            transform: rotate(180deg) !important

        .submenu
          pointer-events: all
          opacity: 1

      &.has-childs
        position: relative

        & > a
          position: relative
          padding-right: 24px

          @media (max-width: 1259px)
            padding-right: 16px

          &::before
            content: ''
            position: absolute
            top: 50%
            right: 11px
            width: 7px
            height: 5px
            background: url('~assets/images/icons/icon-arrow-menu.svg') no-repeat
            transition: all .3s ease
            transform: translate(0, -50%)

            @media (max-width: 1259px)
              right: 4px

  .submenu
    position: absolute
    top: calc(100% - 9px)
    left: 0
    pointer-events: none
    background-color: #E9EA43
    min-width: 110%
    padding: 15px 0
    transition: all .3s ease
    opacity: 0

    & > li
      display: block

      & > a
        display: block
        font-family: Intro, sans-serif
        text-transform: uppercase
        font-size: 14px
        height: 37px
        line-height: 39px
        padding: 0 15px
        color: #4f420c
        white-space: nowrap

        @media (max-width: 1259px)
          font-size: 12px

        &:hover
          background-color: #d4d800

      &:hover
        & > a
          &::before
            margin-top: -4px
            transform: rotate(180deg)
</style>
