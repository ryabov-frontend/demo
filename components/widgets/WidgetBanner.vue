<template lang="pug">
  .widget.widget--banner_mc

    .container.flex
      .left
        h1.master_class-detail__main-title {{ event.name }}
        span.date {{ $moment.unix(event.dateStart).format('DD.MM') + ' ' + $parent.getMonthName($moment.unix(event.dateStart).format('e')) + ' | ' + $moment.unix(event.dateStart).format('HH:mm') }}
        span.master_class-detail__main-left.hidden-xs(v-if = "event.numberSeats > 0") Осталось мест: {{ event.numberSeats }}
        span.master_class-detail__main-left.hidden-xs(v-else) Мест нет

      .right
        span.title Присоединяйтесь
        span.master_class-detail__main-left.visible-xs(v-if = "event.numberSeats > 0") Осталось мест: {{ event.numberSeats }}
        span.master_class-detail__main-left.visible-xs(v-else) Мест нет
        span.price {{ event.price | thousandSeparator }} {{ currency }}

        .buttons
          button(
            rel = "nofollow"
            class= "btn btn-default _buy newsize"
            @click.prevent = "$parent.showModal('addedcart', 'kypit', event)") Купить билет

        .buttons
          a(
            href = "javascript:void(0)"
            rel = "nofollow"
            class = "btn btn-default _has _pink connect"
            @click.prevent = "$parent.showModal('registerCertificate', 'omk-register', event)") Активировать сертификат

        nuxt-link(
          to = "/faq"
          class = "master_class-detail__main-questions") Часто задаваемые вопросы
</template>

<script>
export default {
  props: ["currency", "event"]
}
</script>

<style lang="sass">

.widget--banner_mc
  background-image: url('~assets/images/other/banner_mc.jpg')
  background-repeat: no-repeat
  background-position: center
  background-size: cover
  position: relative
  padding: 50px 0 35px

  @media (max-width: 1259px)
    padding: 50px 0 40px !important

  &::before
    content: ''
    position: absolute
    left: 0
    right: 0
    bottom: 0
    top: 0
    background: rgba(55, 53, 52, .7)
    z-index: 1

  .date
    @media (max-width: 767px)
      display: block

  .container
    position: relative
    z-index: 2

    .left
      width: 50%
      padding-left: 107px
      padding-top: 10px

      @media (max-width: 1259px)
        padding: 0

      @media (max-width: 767px)
        width: 100%
        text-align: center

      .master_class-detail__main
        &-title
          color: #fff
          margin-bottom: 20px

          @media (max-width: 1259px)
            margin-bottom: 30px

          @media (max-width: 767px)
            text-align: center

        &-left
          display: block
          margin-top: 20px

          @media (max-width: 1259px)
            margin-top: 30px

          @media (max-width: 767px)
            margin-top: 0

      .date
        font-size: 24px
        font-family: 'Myriad Pro Cond', sans-serif
        color: #fff
        line-height: 1.2
        letter-spacing: .6px

    .right
      width: 50%
      padding-left: 27px
      padding-top: 10px
      position: relative

      @media (max-width: 1259px)
        padding: 0 0 0 30px

      @media (max-width: 767px)
        width: 100%
        text-align: center
        padding-top: 30px
        padding-left: 0

      &:before
        content: ''
        position: absolute
        top: 11px
        left: 0
        bottom: 10%
        width: 2px
        background: #fff

        @media (max-width: 767px)
          display: none

      .title
        display: block
        font-size: 30px
        font-family: 'Intro', sans-serif
        color: #ccc
        line-height: 1.333
        margin-bottom: 20px
        letter-spacing: .6px

        @media (max-width: 1259px)
          font-size: 20px
          padding-right: 0
          margin-bottom: 5px

        @media (max-width: 1259px)
          font-size: 20px
          padding-right: 0
          margin-bottom: 5px

      .price
        color: #fff
        font-size: 36px
        font-family: 'Intro', sans-serif
        line-height: .667
        margin-top: 10px
        display: inline-block

        @media (max-width: 1259px)
          font-size: 30px

        @media (max-width: 1259px)
          font-size: 30px

      .buttons
        display: flex
        align-items: center
        flex-wrap: wrap
        margin-top: 13px

        @media (max-width: 767px)
          justify-content: center

        .btn
          font-size: 22px
          font-family: 'Intro', sans-serif
          color: #fff
          text-align: center
          height: 60px
          line-height: 60px
          padding: 0 22px
          border-radius: 30px
          letter-spacing: .4px

          @media (max-width: 1259px)
            height: 50px
            line-height: 50px
            font-size: 18px

        .connect
          margin: 0
          font-size: 17px
          background: transparent
          border: none
          border-bottom: 1px solid
          padding: 0
          border-radius: 0
          line-height: 20px
          height: auto

          @media (max-width: 767px)
            margin: 10px 0

          &:hover
            border-bottom: 1px solid transparent

      .master_class-detail__main
        &-left
          display: block
          margin-top: 20px

          @media (max-width: 1259px)
            margin-top: 30px

          @media (max-width: 767px)
            margin-top: 0

        &-questions
          color: rgba(251, 251, 251, .502)

          @media (max-width: 1259px)
            margin-left: calc(-100% - 30px)
            width: 200%
            text-align: center
            position: relative
            top: 20px
            font-size: 16px
            margin-top: 10px

          @media (max-width: 767px)
            width: 100%
            margin-left: 0
            top: 0
</style>
