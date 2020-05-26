<template lang="pug">
  div.master_class-new__wrapper(:class = "{ 'mini': mini }")
    .master_class-new(
      v-for = "event in events"
      :key = "event.id")

      nuxt-link(
        :to = "'/calendar/' + event.slug"
        class = "master_class-new__link")

      nuxt-link(
        :to = "'/calendar/' + event.slug"
        class = "master_class-new__overlay")

        span.title(v-if = "event.numberSeats > 0") Осталось мест&nbsp;&mdash; {{ event.numberSeats }}
        span.title(v-if = "event.numberSeats <= 0") Мест нет

        ul
          li(
            v-for = "item in event.description"
            :key = "item") &mdash; {{ item }}

        .footer
          span.price {{ event.price | thousandSeparator }} {{ currency }}

          button(
            class = "btn btn-default _yellow"
            v-if = "event.numberSeats > 0"
            @click.prevent = "showModal('signup', 'zap', { event, currency })") Записаться

      .master_class-new__label(
        v-if = "event.label"
        :style = "{ backgroundImage: 'url(' + event.label + ')' }")

      .master_class-new__thumb(
        :style = "{ backgroundImage: 'url(' + event.image + ')' }")

      .master_class-new__info(
        :style = "'background-color:' + event.color")

        span.date {{ $moment.unix(event.dateStart).format('DD.MM') }} {{ getMonthName($moment.unix(event.dateStart).format('e')) }} | {{ $moment.unix(event.dateStart).format('HH:mm') }}
        span.name {{ event.name }}

        span.seats-count(v-if = "event.numberSeats > 0 && !mini") Осталось мест&nbsp;&mdash; {{ event.numberSeats }}
        span.seats-count(v-if = "event.numberSeats <= 0 && !mini") Мест нет

        span.price {{ event.price | thousandSeparator }} {{ currency }}
        .label
          .label__name {{ event.branch.name }}
</template>

<script>
export default {
  props: ['events', 'currency', 'mini'],
  methods: {
    showModal(place, analytic, data) {
      this.$store.dispatch("showModal", {
        place: place,
        analytic: analytic,
        data: data
      })
    },
    getMonthName(day) {
      let result
      switch (day * 1) {
        case 0:
          result = "ВС"
          break
        case 1:
          result = "ПН"
          break
        case 2:
          result = "ВТ"
          break
        case 3:
          result = "СР"
          break
        case 4:
          result = "ЧТ"
          break
        case 5:
          result = "ПТ"
          break
        case 6:
          result = "СБ"
          break
      }
      return result
    }
  }
}
</script>

<style lang="sass">

.master_class
  &-new
    width: calc(33.3333% - 45px)
    margin: 45px 22.5px 0
    position: relative
    overflow: hidden

    @media (max-width: 1259px)
      margin: 20px 10px 0
      width: calc(50% - 20px)

    @media (max-width: 767px)
      width: calc(100% - 70px) !important
      margin: 0 auto !important

    &__link
      position: absolute
      left: 0
      right: 0
      bottom: 0
      top: 0

      @media (max-width: 767px)
        z-index: 9

    &__overlay
      position: absolute
      left: 0
      right: 0
      bottom: 0
      top: 0
      display: flex
      flex-wrap: wrap
      flex-direction: column
      background-color: rgba(55, 53, 52, .8)
      transform: translate(0, -100%)
      z-index: 15
      padding: 30px
      cursor: pointer
      transition: all .3s ease
      text-align: left

      .title
        font-family: 'Myriad Pro Cond', sans-serif
        font-size: 40px
        color: #fff
        line-height: 1.2
        display: block
        margin-bottom: 10px

      .footer
        margin-top: auto
        color: #fff
        padding: 8.5px 15px
        border-radius: 25px
        border: 2px solid #fff
        display: flex

        .price
          font-size: 20px
          position: relative
          top: 1px
          color: #fff

        .btn
          margin: -10.5px -17px -20px auto
          height: 49px
          line-height: 49px
          padding: 0 20px
          min-width: 0
          border-radius: 25px
          font-size: 20px

      ul
        font-size: 16px
        color: #fff

        li
          line-height: 1.4
          color: #fff

    &__label
      position: absolute
      top: 10px
      left: 10px
      z-index: 2
      width: 90px
      height: 90px
      border-radius: 50%
      background-repeat: no-repeat
      background-position: center
      background-size: cover

      @media (max-width: 1259px)
        width: 68px
        height: 68px

    &__thumb
      width: 100%
      height: 370px
      background-repeat: no-repeat
      background-position: center
      background-size: cover

      @media (max-width: 1259px)
        height: 334px

      @media (max-width: 767px)
        height: calc(100vw - 40px)

    &__info
      position: absolute
      bottom: 0
      right: 0
      width: 205px
      height: 195px
      padding: 20px 45px 20px 20px
      display: flex
      align-items: center
      flex-wrap: wrap
      flex-direction: column
      color: #fff
      transition: all .3s ease

      @media (max-width: 1259px)
        width: 155px
        height: 140px
        padding: 15px 35px 15px 15px

      @media (max-width: 767px)
        width: 200px
        height: 185px
        padding: 15px 35px 15px 15px

      .date
        width: 100%
        font-size: 24px
        font-family: 'Myriad Pro Cond', sans-serif

        @media (max-width: 1259px)
          font-size: 18px

      .name
        width: 100%
        font-family: 'Intro', sans-serif
        font-size: 14px
        line-height: 1.2
        margin: auto 0

        @media (max-width: 1259px)
          font-size: 10px

        @media (max-width: 767px)
          font-size: 12px

      .seats-count
        width: 100%
        font-family: 'Intro', sans-serif
        font-size: 11px
        line-height: 1.2
        margin: auto 0

        @media (max-width: 767px)
          font-size: 10px

      .price
        width: 100%
        color: #fff
        font-size: 20px

        @media (max-width: 1259px)
          font-size: 15px

      .label
        position: absolute
        top: 0
        right: 0
        bottom: 0
        width: 35px
        border-left: 1px dotted #fff

        @media (max-width: 1259px)
          width: 27px

        &__name
          font-size: 16px
          font-family: 'Myriad Pro', sans-serif
          color: #fff
          text-transform: uppercase
          line-height: 1.2
          position: absolute
          transform: rotate(-90deg)
          width: 185px
          bottom: 83px
          right: -77px
          text-align: right
          padding: 0 20px

          @media (max-width: 1259px)
            font-size: 12px
            width: 140px
            bottom: 63px
            right: -58px

    &__wrapper
      &.mini
        margin: 0 10px

        @media (max-width: 767px)
          margin: 0

        .master_class
          &-new
            width: 100%
            margin: 0

            &__overlay
              position: absolute
              left: 0
              right: 0
              bottom: 0
              top: 0
              display: flex
              flex-wrap: wrap
              flex-direction: column
              background-color: rgba(55, 53, 52, .8)
              transform: translate(0,-100%)
              z-index: 15
              padding: 15px
              transition: all .3s ease

              .title
                font-family: 'Myriad Pro Cond', sans-serif
                font-size: 30px
                color: #fff
                line-height: 1.2
                display: block
                margin-bottom: 10px

              .footer
                margin-top: auto
                color: #fff
                padding: 8.5px 15px
                border-radius: 25px
                border: 2px solid #fff
                display: flex

                .price
                  font-size: 18px
                  position: relative
                  top: 1px
                  color: #fff

                .btn
                  margin: -10.5px -17px -20px auto
                  height: 46px
                  line-height: 46px
                  padding: 0 15px
                  min-width: 0
                  border-radius: 25px
                  font-size: 18px

              ul
                font-size: 14px
                color: #fff

                li
                  line-height: 1.4

            &__label
              width: 68px
              height: 68px

            &__thumb
              height: 275px

            &__info
              width: 175px
              height: 165px
              padding: 15px 35px 15px 15px

              .label__name
                font-size: 12px
                width: 140px
                bottom: 63px
                right: -58px

              .date
                font-size: 18px

              .name
                font-size: 10px

              .price
                font-size: 15px

              .label
                width: 27px

    @media (min-width: 766px)
      &:hover
        .master_class-new__info
          transform: translate(100%, 0)

        .master_class-new__overlay
          transform: translate(0, 0)
</style>
