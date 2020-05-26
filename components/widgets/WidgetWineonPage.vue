<template lang="pug">

  .container
    h3.widget__title.text-center <span class="text-default">красные</span> вина

    .wine-row
      ul
        li(@click = "selectWine(1)")
          img.img-circle(src = "~assets/images/wine/wino1.png" alt = "")
          h5 WineOn Chianti<br>Montalbano
          p 0,375 л

        li(@click = "selectWine(2)")
          img.img-circle(src = "~assets/images/wine/wino2.jpg" alt = "")
          h5 WineOn Chianti<br>Montalbano Riserva
          p 1,5 л

        li(@click = "selectWine(3)")
          img.img-circle(src = "~assets/images/wine/wino3.jpg" alt = "")
          h5 WineOn<br>Carmignano
          p 0,75 л or 3 л

        li(@click = "selectWine(4)")
          img.img-circle(src = "~assets/images/wine/wino4.jpg" alt = "")
          h5 WineOn<br>Carmignano Riserva
          p 1,5 л

    hr

    h3.widget__title.text-center <span class="text-default">белые</span> вина

    .wine-row
      ul
        li(@click = "selectWine(5)")
          img.img-circle(src = "~assets/images/wine/wino5.png" alt = "")
          h5 WineOn<br>Gavi
          p 0,75 л

        li(@click = "selectWine(6)")
          img.img-circle(src = "~assets/images/wine/wino6.jpg" alt = "")
          h5 WineOn Gavi<br>Riserva
          p 0,75 л

    hr

    h3.widget__title.text-center <span class="text-default">ДЕСЕРТНОЕ</span> ВИНО

    .wine-row
      ul
        li(@click = "selectWine(7)")
          img.img-circle(src = "~assets/images/wine/wino7.png" alt = "")
          h5 WineOn<br>VinSanto
          p 0,5 л

    hr

    .fs-19.text-center
      p астрономичные вина WineOn прекрасно сочетаются с различными блюдами кухонь мира. Наш сомелье всегда готов помочь вам и подобрать подходящее для вас вино, а при желании провести для вас дегустацию с более полным погружением в мир вина.
      p.fs-24 Мы искренне гордимся нашими винами и готовы разделить с вами нашу любовь к ним.

    .wine-danger чрезмерное употребление алкоголя<br>вредит вашему здоровью

    .modal.in(v-if = "showWarning")
      .modal-overlay
      .modal-dialog
        .modal-content(style="background:#fff!important")
          .modal-content--inner
            h5.modal-title(style="color:#940186 !important") Вам уже исполнилось<br>18 лет?
            .row
              .col-sm-6.col-xs-12
                button.btn.btn-default._medium.btn-first(@click = "showWarning = false") Да

              .col-sm-6.col-xs-12
                nuxt-link.btn.btn-default._medium(to = "/") Нет

    .modal.in(v-if = "showModal")
      .modal-overlay
      .modal-dialog
        .modal-content(:class = "{ 'red': [1, 2, 3, 4].includes(selectId), \
                                   'white': [5, 6].includes(selectId), \
                                   'desert': [7].includes(selectId) }")
          .modal-close(@click = "showModal = false")
            | <svg class="icon icon-modal-close"><use xlink:href="#icon-modal-close"></use></svg>

          h5.modal-title(v-if = "selectId === 1") WineOn Сhianti Montalbano <nobr>0,375 л</nobr>
          h5.modal-title(v-if = "selectId === 2") WineOn Сhianti Montalbano Riserva <nobr>1,5 л</nobr>
          h5.modal-title(v-if = "selectId === 3") WineOn Carmignano <nobr>0,75 л и 3 л</nobr>
          h5.modal-title(v-if = "selectId === 4") WineOn Carmignano Riserva <nobr>1,5 л</nobr>
          h5.modal-title(v-if = "selectId === 5") WineOn Gavi <nobr>0,75 л</nobr>
          h5.modal-title(v-if = "selectId === 6") WineOn Gavi Riserva <nobr>0,75 л</nobr>
          h5.modal-title(v-if = "selectId === 7") WineOn VinSanto <nobr>0,5 л</nobr>

          p.description(v-if = "selectId === 1") Красное сухое вино с&nbsp;благородным рубиновым цветом. Аромат интенсивный и&nbsp;в&nbsp;тоже время деликатный. Аромат спелых ягод и&nbsp;фиалки. Элегантное вино с&nbsp;бархатистыми танинами и&nbsp;приятным фруктовым послевкусием.
          p.description(v-if = "selectId === 2") Вино глубокого рубинового цвета, обладает насыщенным, богатым, ярким вкусом с&nbsp;шелковистыми танинами и&nbsp;оттенками ежевики и&nbsp;чернослива в&nbsp;послевкусии. В&nbsp;пышном, насыщенном букете вина переплетаются ароматы красных ягод, фиалки и&nbsp;вишни.
          p.description(v-if = "selectId === 3") Красное сухое вино глубокого рубиново-красного цвета. Обладает сбалансированным, мягким, гармоничным вкусом с&nbsp;отличной структурой, элегантными, сладкими танинами и&nbsp;продолжительным послевкусием. Сложный и&nbsp;душистый аромат вина раскрывается оттенками красных фруктов, пряной ванили и&nbsp;кожи.
          p.description(v-if = "selectId === 4") Красное сухое вино обладает сбалансированным, мягким, гармоничным вкусом с&nbsp;отличной структурой, элегантными, сладкими танинами и&nbsp;продолжительным послевкусием. Сложный и&nbsp;душистый аромат вина раскрывается оттенками красных фруктов, пряной ванили и&nbsp;кожи.
          p.description(v-if = "selectId === 5") Белое сухое вино, светло-соломенного цвета с&nbsp;зеленоватым оттенком. Аромат свежий, элегантный, доминируют минеральные, цитрусовые и&nbsp;цветочные ноты. Вкус вина сбалансированный, свежий, с&nbsp;яркой кислотностью, послевкусие продолжительное с&nbsp;миндальным оттенком.
          p.description(v-if = "selectId === 6") Вино светло-соломенного цвета с&nbsp;зеленоватым оттенком. Аромат свежий, элегантный. Доминируют минеральные и&nbsp;цветочные ноты. Вкус вина сбалансированный, с&nbsp;яркой кислотностью. Послевкусие средней продолжительности с&nbsp;легким миндальным оттенком.
          p.description(v-if = "selectId === 7") Белое сладкое вино янтарного цвета. Аромат интенсивный с&nbsp;оттенками кураги, горького миндаля, абрикоса и&nbsp;меда. Прекрасно сбалансированный вкус вина с&nbsp;хорошей кислотностью оттенками цукатов, абрикоса, меда, карамели и&nbsp;жареного миндального ореха.

          ul.modal-icon(v-if = "[1, 2, 3, 4].includes(selectId)")
            li
              img(src = "~assets/images/wine/modal_1.png")
              p(v-if = "[1, 2].includes(selectId)") Санджовезе 100%
              p(v-if = "[3, 4].includes(selectId)") Санджовезе 80%, Каберне Совиньон 20%

            li
              img(src = "~assets/images/wine/modal_2.png")
              p(v-if = "[1, 2, 4].includes(selectId)") 13,5%
              p(v-if = "[3].includes(selectId)") 13%

            li
              img(src = "~assets/images/wine/modal_3.png")
              p(v-if = "[1].includes(selectId)") 15-18°С
              p(v-if = "[2, 3, 4].includes(selectId)") 16-18°С

            li
              img(src = "~assets/images/wine/modal_7.png")
              p(v-if = "[1].includes(selectId)") Мясные закуски, тушеное мясо, твердые сыры
              p(v-if = "[2, 3, 4].includes(selectId)") Мясо, дичь, выдержанные сыры

          ul.modal-icon(v-if = "[5, 6].includes(selectId)")
            li
              img(src = "~assets/images/wine/modal_1.png")
              p Кортезе 100%

            li
              img(src = "~assets/images/wine/modal_2.png")
              p 12,5%

            li
              img(src = "~assets/images/wine/modal_3.png")
              p(v-if = "[5].includes(selectId)") 9-12°С
              p(v-if = "[6].includes(selectId)") 5-8°С

            li
              img(src = "~assets/images/wine/modal_15.png")
              p(v-if = "[5].includes(selectId)") Закуски, морепродукты, рыба, сыр
              p(v-if = "[6].includes(selectId)") Закуски, морепродукты, рыба, сыр, овощи

          ul.modal-icon(v-if = "[7].includes(selectId)")
            li
              img(src = "~assets/images/wine/modal_1.png")
              p Кортезе 100%

            li
              img(src = "~assets/images/wine/modal_2.png")
              p 12,5%

            li
              img(src = "~assets/images/wine/modal_3.png")
              p 15-18°С

            li
              img(src = "~assets/images/wine/modal_15.png")
              p Сухие пирожные, печенье, голубые сыры

</template>

<script>
export default {
  data: () => ({
    showModal: false,
    selectId: undefined,
    showWarning: true
  }),
  methods: {
    selectWine (id) {
      this.showModal = true
      this.selectId = id
    }
  }
}
</script>

<style lang="sass" scoped>

.modal.in
  display: none
  pointer-events: all
  transform: translate(0, 0)
  flex-wrap: wrap
  align-items: center
  justify-content: center

  .btn
    width: 100%
    margin-bottom: 0
    min-width: 0

    &.btn-first
      @media (max-width: 767px)
        margin-bottom: 15px

  .modal-title
    color: #fff !important

  .modal-overlay
    position: absolute
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: rgba(0, 0, 0, .75)
    backdrop-filter: blur(20px)
    z-index: 1

  .modal-dialog
    width: 600px
    position: relative
    pointer-events: none
    margin: auto
    height: auto
    padding: 50px 0
    transition: transform .3s ease-out
    transform: translate(0, 0)
    z-index: 2

    @media (max-width: 767px)
      display: block
      min-height: 100vh
      width: 100%
      padding: 0

  .modal-content
    padding: 85px 30px 80px
    border-radius: 20px
    background-color: #fff
    border: 0
    margin: auto
    position: relative
    overflow: hidden
    box-shadow: 0 4px 59px 0 rgba(57, 57, 57, .53)
    opacity: 0
    transition: all .3s ease
    box-shadow: none
    pointer-events: all
    opacity: 1
    background: #e61676

    @media (max-width: 767px)
      border-radius: 0
      min-height: 100vh
      padding: 70px 40px
      box-shadow: none
      display: flex
      flex-wrap: wrap
      align-items: center
      justify-content: center

    &.desert
      background: #e61676 !important

    &.red
      background: #b30949 !important

    &.white
      background: #c59f54 !important

    .description
      text-align: justify
      color: #ffffff
      font-size: 15px

    .modal-title
      @media (max-width: 767px)
        font-size: 22px
        margin-left: -25px
        margin-right: -25px

    .wine-row ul,
    .modal-icon
      padding-left: 0
      text-align: center

      li
        display: inline-block
        text-align: center
        width: 24.5%
        list-style: none
        vertical-align: top

        @media (max-width: 767px)
          width: 100%

        img
          border: none
          max-width: 75px
          margin-bottom: 15px

        p
          color: #ffffff
          font-size: 14px

  .modal-close
    padding: 0
    background: transparent
    border: 0
    position: absolute
    top: 30px
    right: 30px
    cursor: pointer

    @media (max-width: 767px)
      top: 15px
      right: 15px

.fs-19
  font-size: 19px

  p
    font-size: 19px

    &.fs-24
      font-weight: bold

.wine
  &-row
    ul
      padding-left: 0
      text-align: center

      li
        display: inline-block
        text-align: center
        width: 24.5%
        list-style: none
        vertical-align: top
        cursor: pointer

        @media (max-width: 767px)
          width: 100%

        &:hover
          img
            opacity: .4
            transition: all 1s ease 0s

        img
          border: 1px solid #efccd9
          margin-bottom: 15px
          border-radius: 50%

        h5
          text-align: center
          font-weight: normal
          margin-bottom: 15px

        p
          color: #940186

  &-danger
    font-size: 121px
    font-family: 'Open Sans Condensed', sans-serif
    color: #eeeeee
    line-height: 1
    text-transform: uppercase
    text-align: center
    margin-bottom: 30px

    @media (max-width: 767px)
      font-size: 9vh
</style>
