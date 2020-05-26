<template lang="pug">
  div
    .filter-hide(
      v-if = "filterShow"
      @click = "filterShow = false")

      img(
        class = "icon"
        src = "~assets/images/other/controls.png"
        alt = "")

      .filter-hide__text Скрыть фильтры

    .filter-hide(
      v-if = "!filterShow"
      @click = "filterShow = true")

      img(
        class = "icon"
        src = "~assets/images/other/controls.png"
        alt = "")

      .filter-hide__text Показать фильтры

    .filter(v-if = "filterShow")
      .container
        .filter-container
          .filter-group.form-group
            el-select(
              v-model = "form.branch"
              placeholder = ""
              multiple
              @change = "changeItem('branch', form.branch)"
              ref = "branch")
                el-option(
                  v-for = "item in items.branch"
                  :key = "item.value"
                  :label = "item.label"
                  :value = "item.value")

            .form-placeholder(:class = "{ 'select': form.branch.length > 0 }")
              | <svg class="icon icon-pin"><use xlink:href="#icon-pin"></use></svg>
              span.form-placeholder--text(v-if = "form.branch.length <= 0") Любая студия
              span.form-placeholder--text(v-else) {{ getValue('branch', form.branch) }}

          .filter-group.form-group
            el-select(
              v-model = "form.month"
              placeholder = ""
              multiple
              @change = "changeItem('month', form.month)"
              ref = "month")
                el-option(
                  v-for = "item in items.month"
                  :key = "item.value"
                  :label = "item.label"
                  :value = "item.value")

            .form-placeholder(:class = "{ 'select': form.month.length > 0 }")
              | <svg class="icon icon-date"><use xlink:href="#icon-date"></use></svg>
              span.form-placeholder--text(v-if = "form.month.length <= 0") Месяц
              span.form-placeholder--text(v-else) {{ getValue('month', form.month) }}

          .filter-group.form-group
            el-select(
              v-model = "form.items"
              placeholder = ""
              multiple
              @change = "changeItem('items', form.items)"
              ref = "items")
                el-option(
                  v-for = "item in items.items"
                  :key = "item.value"
                  :label = "item.label"
                  :value = "item.value")

            .form-placeholder(:class = "{ 'select': form.items.length > 0 }")
              | <svg class="icon icon-dish"><use xlink:href="#icon-dish"></use></svg>
              span.form-placeholder--text(v-if = "form.items.length <= 0") Кухня
              span.form-placeholder--text(v-else) {{ getValue('items', form.items) }}

          .filter-group.form-group
            el-select(
              v-model = "form.price"
              placeholder = ""
              multiple
              @change = "changeItem('price', form.price)"
              ref = "price")
                el-option(
                  v-for = "item in items.price"
                  :key = "item.value"
                  :label = "item.label"
                  :value = "item.value")

            .form-placeholder(:class = "{ 'select': form.price.length > 0 }")
              | <svg class="icon icon-rub"><use xlink:href="#icon-rub"></use></svg>
              span.form-placeholder--text(v-if = "form.price.length <= 0") Любая стоимость
              span.form-placeholder--text(v-else) {{ getValue('price', form.price) }}

          .filter-group.form-group
            el-select(
              v-model = "form.type"
              placeholder = ""
              multiple
              @change = "changeItem('type', form.type)"
              ref = "type")
                el-option(
                  v-for = "item in items.type"
                  :key = "item.value"
                  :label = "item.label"
                  :value = "item.value")

            .form-placeholder(:class = "{ 'select': form.type.length > 0 }")
              | <svg class="icon icon-dish"><use xlink:href="#icon-dish"></use></svg>
              span.form-placeholder--text(v-if = "form.type.length <= 0") Любая вечеринка
              span.form-placeholder--text(v-else) {{ getValue('type', form.type) }}
</template>

<script>
import BookEvent from "~/components/modals/BookEvent"

export default {
  props: ["events"],
  data: () => ({
    form: {
      branch: [],
      month: [],
      items: [],
      price: [],
      type: []
    },
    items: {
      branch: [
        {
          value: "clear",
          label: "Любая студия"
        }
      ],
      month: [
        {
          value: "clear",
          label: "Все даты"
        }
      ],
      items: [
        {
          value: "clear",
          label: "Любая кухня"
        }
      ],
      price: [
        {
          value: "clear",
          label: "Любая стоимость"
        }
      ],
      type: [
        {
          value: "clear",
          label: "Любая вечеринка"
        },
        {
          value: "1",
          label: "Кулинарные"
        },
        {
          value: "2",
          label: "Арт-вечеринки"
        },
        {
          value: "3",
          label: "Вино и коктейли"
        }
      ]
    },
    filterShow: true
  }),
  watch: {
    "$route.query": {
      handler: function(query) {
        this.initFilters(query)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.events.forEach(event => {
      let findedBranch = false,
        findedMonth = false,
        findedItems = false,
        findedPrice = false

      const itemBranch = {
        value: event.branch.id,
        label: event.branch.name
      }

      const itemMonth = {
        value: this.$moment.unix(event.dateStart).format("M"),
        label: this.getMonthName(this.$moment.unix(event.dateStart).format("M"))
      }

      const itemItems = {
        value: event.class.id.toString(),
        label: event.class.name
      }

      const itemPrice = {
        value: event.price.toString(),
        label:
          this.$options.filters.thousandSeparator(event.price) +
          " " +
          this.$parent.options.currency
      }

      // Проверяем дубликаты

      if (this.items.branch.length > 0) {
        this.items.branch.forEach(branch => {
          if (branch.value === itemBranch.value) {
            findedBranch = true
          }
        })
      }

      if (this.items.month.length > 0) {
        this.items.month.forEach(month => {
          if (month.value === itemMonth.value) {
            findedMonth = true
          }
        })
      }

      if (this.items.items.length > 0) {
        this.items.items.forEach(items => {
          if (items.value === itemItems.value) {
            findedItems = true
          }
        })
      }

      if (this.items.price.length > 0) {
        this.items.price.forEach(price => {
          if (price.value === itemPrice.value) {
            findedPrice = true
          }
        })
      }

      // Заполняем данными

      if (findedBranch === false) {
        this.items.branch.push(itemBranch)
      }

      if (findedMonth === false) {
        this.items.month.push(itemMonth)
      }

      if (findedItems === false) {
        this.items.items.push(itemItems)
      }

      if (findedPrice === false) {
        this.items.price.push(itemPrice)
      }
    })
  },
  methods: {
    initFilters(query) {
      if (query.branch) {
        this.form.branch = query.branch.split(",")
      }

      if (query.month) {
        this.form.month = query.month.split(",")
      }

      if (query.items) {
        this.form.items = query.items.split(",")
      }

      if (query.price) {
        this.form.price = query.price.split(",")
      }

      if (query.type) {
        this.form.type = query.type.split(",")
      }
    },
    changeItem(item, value) {
      if (value.includes("clear")) {
        this.form[item] = []
        this.$refs[item].blur()
      }
      this.$router.replace({
        query: {
          branch:
            this.form.branch.length > 0
              ? this.form.branch.join(",")
              : undefined,
          month:
            this.form.month.length > 0 ? this.form.month.join(",") : undefined,
          items:
            this.form.items.length > 0 ? this.form.items.join(",") : undefined,
          price:
            this.form.price.length > 0 ? this.form.price.join(",") : undefined,
          type: this.form.type.length > 0 ? this.form.type.join(",") : undefined
        }
      })
      this.$refs[item].blur()
    },
    getValue(item, value) {
      let response
      if (value.length > 0) {
        this.items[item].forEach(part => {
          if (part.value == value[0]) {
            response = part.label
          }
        })
        if (value.length > 1) {
          response = response + " и ..."
        }
      }
      return response
    },
    getMonthName(month) {
      let response
      switch (month) {
        case "1":
          response = "Январь"
          break
        case "2":
          response = "Февраль"
          break
        case "3":
          response = "Март"
          break
        case "4":
          response = "Апрель"
          break
        case "5":
          response = "Май"
          break
        case "6":
          response = "Июнь"
          break
        case "7":
          response = "Июль"
          break
        case "8":
          response = "Август"
          break
        case "9":
          response = "Сентябрь"
          break
        case "10":
          response = "Октябрь"
          break
        case "11":
          response = "Ноябрь"
          break
        case "12":
          response = "Декабрь"
          break
      }
      return response
    }
  }
}
</script>

<style lang="sass">

.filter
  background: #F2F2F2
  padding: 20px 0

  &-hide
    width: calc(100% + 40px)
    margin: 0 -20px
    height: 40px
    display: flex
    position: relative
    align-items: center
    justify-content: center
    text-align: center
    background-color: #f2f2f2
    font-size: 18px
    cursor: pointer
    box-shadow: 0 3px 5px 0 rgba(55, 53, 52, .1)

    @media (min-width: 768px)
      display: none

    .icon
      margin-right: 7px

  &-container
    margin: -20px -10px 0
    display: flex
    flex-wrap: wrap
    align-items: flex-start

  &-group
    position: relative
    width: -webkit-calc(25% - 20px)
    width: calc(20% - 20px)
    margin: 20px 10px 0
    color: #C4C4C4
    display: flex
    flex-wrap: wrap

    @media (max-width: 767px)
      width: calc(100% - 20px)

  .el-input__inner
    color: #fff !important
    height: 50px !important

  .el-input__suffix
    z-index: 13 !important

  .el-select__tags
    opacity: 0
    visibility: hidden

    .el-tag
      display: none !important
</style>
