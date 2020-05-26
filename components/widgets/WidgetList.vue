<template lang="pug">
  .widget.widget--mini
    .container
      h1.widget__title.text-center(
        v-if = "name.tag === 'h1' && name.title"
        v-html = "name.title")

      h2.widget__title.text-center(
        v-if = "name.tag === 'h2' && name.title"
        v-html = "name.title")

      h3.widget__title.text-center(
        v-if = "name.tag === 'h3' && name.title"
        v-html = "name.title")

      p.widget__title.text-center(
        v-if = "name.tag === 'p' && name.title"
        v-html = "name.title")

      .price-columns
        .row
          .col-lg-6
            ul.price-list
              li.element
                span.icon
                  img(
                    src = "~assets/images/other/wd1.png"
                    alt = "")
                | Мастер-класс по приготовлению 3-х блюд

              li.element
                span.icon
                  img(
                    src = "~assets/images/other/coffee-cup.png"
                    alt = "")
                | Б/а напитки без ограничения (чай, кофе, соки, вода)

              li.element
                span.icon
                  img(
                    src = "~assets/images/other/salad.png"
                    alt = "")
                | Все ингредиенты и оборудование

              li.element
                span.icon
                  img(
                    src = "~assets/images/other/fork.png"
                    alt = "")
                | Работа команды: шеф-повар, су шеф, ивент-менеджер, бармен, клининг, менеджер по организации мероприятия

              li.element
                span.icon
                  img(
                    src = "~assets/images/other/question-mark2.png"
                    alt = "")
                | Конкурсы и викторины

          .col-lg-6
            ul.price-list
              li.element
                span.icon
                  img(
                    src = "~assets/images/other/music.png"
                    alt = "")
                | Музыкальное сопровождение (фоновая музыка)

              li.element
                span.icon
                  img(
                    src = "~assets/images/other/tablet.png"
                    alt = "")
                | Рецепты в электронном формате

              li.element
                span.icon
                  img(
                    src = "~assets/images/other/apron.png"
                    alt = "")
                | Фирменные фартуки на время мероприятия

              li.element
                span.icon
                  img(
                    src = "~assets/images/other/diploma.png"
                    alt = "")
                | Памятные дипломы

              li.element
                span.icon
                  img(
                    src = "~assets/images/other/confetti.png"
                    alt = "")
                | И, конечно, море положительных эмоций :)

      hr
</template>

<script>
export default {
  props: ["name"]
}
</script>

<style lang="sass" scoped>

.price-columns
  .price-list
    li
      margin-bottom: 15px
      font-size: 18px

      .icon
        margin-right: 15px
</style>
