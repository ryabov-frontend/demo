<template lang="pug">
  .modal-content--inner
    button(
      type = "button"
      class = "modal-close"
      data-dismiss = "modal"
      aria-label = "Закрыть"
      @click = "$parent.closeModal")

      | <svg class="icon icon-modal-close"><use xlink:href="#icon-modal-close"></use></svg>

    h5.modal-title Оставьте заявку

    p.modal-pretitle И мы поможем провести незабываемое мероприятие!

    form.form._mini(@submit.prevent = "sendForm")
      .form-group
        el-select(
          v-model = "form.event_name"
          placeholder = "Select event")
            el-option(
              v-for = "item in events"
              :key = "item.value"
              :label = "item.label"
              :value = "item.value")

      .form-group
        .row._row-flex
          .col-sm-6.col-xs-12
            p Количество гостей

          .col-sm-6.col-xs-12.relative.required(:class = "{ 'has-error': !!validate.count, \
                                                            'has-success': validate.count === false }")
            span.number-down(@click = "changeCount('minus')")
              | <svg class="icon icon-down"><use xlink:href="#icon-down"></use></svg>

            input(
              type = "text"
              class = "form-control modal_count_event number active"
              v-model = "form.count"
              @blur = "validateItem('count')")

            span.number-up(@click = "changeCount('plus')") +

            .help-block(v-if = "validate.count")
              span(v-if = "validate.name === count") Необходимо заполнить «Count».
              span(v-else) {{ validate.count }}

      //- .form-group(:class = "{ 'has-error': validate.date === true, \
                              'has-success': validate.date === false }")
        el-date-picker(
          v-model = "form.date"
          type = "date"
          format = "dd.MM.yyyy"
          value-format = "timestamp"
          @blur = "validateItem('date')"
          :picker-options = "pickerOptions")

        span.form-control-placeholder(v-if = "!form.date") Дата <span>*</span>

        .help-block(v-if = "validate.date") Необходимо заполнить «Date».

      .row
        .col-xs-12.form-group.required(:class = "{ 'has-error': !!validate.name, \
                                                   'has-success': validate.name === false }")
          input(
            type = "text"
            class = "form-control"
            aria-required = "true"
            v-model = "form.name"
            @blur = "validateItem('name')")

          span.form-control-placeholder(v-if = "checkRequired('name')") Имя <span>*</span>

          .help-block(v-if = "validate.name")
            span(v-if = "validate.name === true") Необходимо заполнить «Name».
            span(v-else) {{ validate.name }}

        .col-xs-12.form-group.required(:class = "{ 'has-error': !!validate.surname, \
                                                   'has-success': validate.surname === false }")
          input(
            type = "text"
            class = "form-control"
            aria-required = "true"
            v-model = "form.surname"
            @blur = "validateItem('surname')")

          span.form-control-placeholder(v-if = "checkRequired('surname')") Фамилия <span>*</span>

          .help-block(v-if = "validate.surname")
            span(v-if = "validate.surname === true") Необходимо заполнить «Surname».
            span(v-else) {{ validate.surname }}

        .col-xs-12.form-group.required(:class = "{ 'has-error': !!validate.phone, \
                                                   'has-success': validate.phone === false }")
          //- input(
            type = "text"
            class = "form-control"
            v-mask = "'+7 (###) ###-##-##'"
            v-model = "form.phone"
            @blur = "validateItem('phone')")

          masked-input(
            v-model = "form.phone"
            type = "text"
            pattern = "+7 (111) 111-11-11"
            @blur = "validateItem('phone')"
            class = "form-control")
        
          span.form-control-placeholder(v-if = "checkRequired('phone')") Телефон <span>*</span>

          .help-block(v-if = "validate.phone")
            span(v-if = "validate.phone === true") Необходимо заполнить «Phone».
            span(v-else) {{ validate.phone }}

        .col-xs-12.form-group.required(:class = "{ 'has-error': !!validate.email, \
                                                   'has-success': validate.email === false }")
          input(
            type = "text"
            class = "form-control"
            aria-required = "true"
            v-model = "form.email"
            @blur = "validateItem('email')")

          span.form-control-placeholder(v-if = "checkRequired('email')") Email <span>*</span>

          .help-block(v-if = "validate.email")
            span(v-if = "validate.email === true") Необходимо заполнить «Email».
            span(v-else) {{ validate.email }}

      .text-center(v-html = "$parent.$parent.options.event_modal_text")

      .text-center.modal-submit
        button(
          type = "submit"
          class = "btn btn-default _huge _full") Отправить

      span.confirm(v-html = "$parent.$parent.options.event_modal_text_confirm")
</template>

<script>
import MaskedInput from 'vue-maskedinput'

export default {
  props: ["data", "language", "template"],
  components: {
    MaskedInput
  },
  data() {
    return {
      events: [],
      form: {
        name: null,
        surname: null,
        event_name: null,
        phone: null,
        email: null,
        // date: null,
        count: 10
      },
      validate: {
        name: undefined,
        surname: undefined,
        phone: undefined,
        email: undefined,
        // date: undefined,
        count: undefined
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
        firstDayOfWeek: 1
      }
    }
  },
  created() {
    let events = []
    let eventList

    if (this.template === 'header') {
      eventList = this.$parent.$parent.options.activity_list_header.split('||')
    } else if (this.template === 'wedding') {
      eventList = this.$parent.$parent.options.activity_list_wedding.split('||')
    } else if (this.template === 'birth_day') {
      eventList = this.$parent.$parent.options.activity_list_birth_day.split(
        '||'
      )
    } else if (this.template === 'child_birth_day') {
      eventList = this.$parent.$parent.options.activity_list_child_birth_day.split(
        '||'
      )
    } else if (this.template === 'rent_studio') {
      eventList = this.$parent.$parent.options.activity_list_rent_studio.split(
        '||'
      )
    } else if (this.template === 'rent_conference') {
      eventList = this.$parent.$parent.options.activity_list_rent_conference.split(
        '||'
      )
    } else if (this.template === 'field_events') {
      eventList = this.$parent.$parent.options.activity_list_field_events.split(
        '||'
      )
    } else if (this.template === 'hen_party') {
      eventList = this.$parent.$parent.options.activity_list_hen_party.split(
        '||'
      )
    } else {
      eventList = this.$parent.$parent.options.activity_list_header.split('||')
    }

    eventList.forEach(index => {
      const item = {
        value: index,
        label: eventList[index]
      }
      events.push(item)
    })
    this.events = events
    this.form.event_name = this.events[0].value
  },
  methods: {
    validateItem(item, action) {
      if (!!action) {
        this.validate[item] = action
      } else {
        if (item === "name") {
          console.log(this.form[item], /[a-zA-Zа-яёА-ЯЁ\s]/.test(this.form[item]))
        }
        if (item === "phone") {
          this.validate[item] = !(
            this.form[item] &&
            this.form[item].trim() &&
            this.form[item].length == 18
          )
        } else if (item === "count") {
          this.validate[item] = !(this.form[item] && this.form[item] > 0)
        } else {
          this.validate[item] = !this.form[item]
        }
      }
    },
    checkRequired(item) {
      return !(this.form[item] && this.form[item].length > 0)
    },
    changeCount(action) {
      if (action === "plus") {
        this.form["count"]++
      } else if (action === "minus") {
        if (this.form["count"] > 1) {
          this.form["count"]--
        }
      }
    },
    async sendForm() {
      this.validateItem('name')
      this.validateItem('surname')
      this.validateItem('phone')
      this.validateItem('email')
      this.validateItem('count')
      if (this.validate.name === false && this.validate.surname === false && this.validate.phone === false && this.validate.email === false && this.validate.count === false) {
        const formData = new FormData()

        formData.append("event_name", this.form.event_name)
        formData.append("count", this.form.count)
        formData.append("name", this.form.name)
        formData.append("surname", this.form.surname)
        formData.append("email", this.form.email)
        formData.append("phone", this.form.phone.replace("+", ""))
        // formData.append("date", this.form.date)

        const response = await this.$axios.$post(
          "http://dev.culinaryon.com/api/post/event-application",
          formData
        )

        if (response.result === "error") {
          Object.keys(response.messages).forEach((x) => {
            this.validateItem(x, response.messages[x])
          })
        } else {
          this.$parent.showModal('textModal', '', response.msg)
        }
      } else {
        // this.$parent.validateForm(this.form).messages.forEach(index => {
        //   this.validate[index] = true
        // })
      }
    }
  }
}
</script>
