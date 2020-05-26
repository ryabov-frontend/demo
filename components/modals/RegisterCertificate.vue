<template lang="pug">
  .modal-content--inner
    button(
      type = "button"
      class = "modal-close"
      data-dismiss = "modal"
      aria-label = "Закрыть"
      @click = "$parent.closeModal")

      | <svg class="icon icon-modal-close"><use xlink:href="#icon-modal-close"></use></svg>

    p.modal-date
      span {{ $moment.unix(data.event.dateStart).format('DD.MM') }} {{ getMonthName($moment.unix(data.event.dateStart).format('e')) }} | {{ $moment.unix(data.event.dateStart).format('HH:mm') }}

    p.modal-title {{ data.event.name }}

    p.place(v-if = "data.event.numberSeats > 0") Осталось мест: {{ data.event.numberSeats }}
    p.place(v-else) Мест нет

    .price {{ data.event.price | thousandSeparator }} {{ data.currency }}

    hr

    p.mini-title Регистрация сертификата на мастер-класс

    .form
      form.row(@submit.prevent = "sendForm()")
        p(style="text-align: center;font-size: 14px;") При вводе номера сертификата используйте пробел вместо тире.

        .col-xs-12.form-group(:class = "{ 'has-error': $v.code.$error, \
                                          'has-success': !$v.code.$error && !$v.code.$invalid }")

          masked-input(
            v-model = "code"
            type = "text"
            pattern = "11111-1111-1111"
            @keydown.enter = "$v.code.$touch()"
            class = "form-control")

          //- input(
          //-   v-model = "code"
          //-   @blur = "$v.code.$touch()"
          //-   type = "text"
          //-   class = "form-control")

          span.form-control-placeholder(v-if = "!code || code.length <= 0") Номер сертификата <span>*</span>
          .help-block Необходимо заполнить «Номер сертификата».

        .col-xs-6.form-group(:class = "{ 'has-error': $v.name.$error, \
                                          'has-success': !$v.name.$error && !$v.name.$invalid }")
          input(
            v-model = "name"
            @blur = "$v.name.$touch()"
            type = "text"
            class = "form-control")
          span.form-control-placeholder(v-if = "!name || name.length <= 0") Имя <span>*</span>
          .help-block Необходимо заполнить «Name».

        .col-xs-6.form-group(:class = "{ 'has-error': $v.surname.$error, \
                                          'has-success': !$v.surname.$error && !$v.surname.$invalid }")
          input(
            v-model = "surname"
            @blur = "$v.surname.$touch()"
            type = "text"
            class = "form-control")
          span.form-control-placeholder(v-if = "!surname || surname.length <= 0") Фамилия <span>*</span>
          .help-block Необходимо заполнить «Surname».

        .col-xs-6.form-group(:class = "{ 'has-error': $v.phone.$error, \
                                          'has-success': !$v.phone.$error && !$v.phone.$invalid }")
          masked-input(
            v-model = "phone"
            type = "text"
            pattern = "+7 (111) 111-11-11"
            @blur = "$v.phone.$touch()"
            class = "form-control")

          //- input(
            v-model = "phone"
            @blur = "$v.phone.$touch()"
            type = "text"
            class = "form-control"
            v-mask = "'+7 (###) ###-##-##'")

          span.form-control-placeholder(v-if = "!phone || phone.length <= 0") Телефон <span>*</span>
          .help-block Необходимо заполнить «Телефон».

        .col-xs-6.form-group(:class = "{ 'has-error': $v.email.$error, \
                                          'has-success': !$v.email.$error && !$v.email.$invalid }")
          input(
            v-model = "email"
            @blur = "$v.email.$touch()"
            type = "text"
            class = "form-control")
          span.form-control-placeholder(v-if = "!email || email.length <= 0") E-mail <span>*</span>
          .help-block Необходимо заполнить «E-Mail».

      .text-center.modal-submit
        button(
          type = "button"
          class = "btn btn-default _huge _full"
          :class = "{ 'disabled': loading }"
          @click = "sendForm()") Зарегистрироваться
</template>

<script>
import MaskedInput from 'vue-maskedinput'
import { required } from 'vuelidate/lib/validators'

export default {
  props: ['data'],
  components: {
    MaskedInput
  },
  data() {
    return {
      code: null,
      name: null,
      surname: null,
      phone: null,
      email: null,
      loading: false
    }
  },
  validations: {
    code: {
      required,
      alpha: val => /^[0-9 ]*$/i.test(val)
    },
    name: {
      required,
      alpha: val => /^[а-яА-ЯёЁa-zA-Z ]*$/i.test(val)
    },
    surname: {
      required,
      alpha: val => /^[а-яА-ЯёЁa-zA-Z ]*$/i.test(val)
    },
    phone: {
      required,
      alpha: val => /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(val)
    },
    email: {
      required,
      alpha: val => /\S+@\S+\.\S+/i.test(val)
    }
  },
  methods: {
    async showModal(place, analytic, data) {
      this.$store.dispatch("showModal", {
        place: place,
        analytic: analytic,
        data: data
      })
    },
    async sendForm() {
      if (!this.$v.$invalid && !this.$v.$error && !this.loading) {
        this.loading = true
        const form = await this.$axios.$post('/api/order/send', {
          eventId: this.data.event.id,
          code: this.code,
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          email: this.email
        })
        if (form.result) {
          this.loading = false
          this.$parent.showModal('textModal', '', response.msg)
        } else {
          this.loading = false
          // Object.keys(response.messages).forEach(index => {
          //   this.validate[index] = true
          // })
        }
      }
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
  
.help-block
  display: none !important

.has-error
  .help-block
    display: block !important

</style>
