<script>
import MainHeader from "@/components/MainHeader.vue";
import ButtonAgrea from "@/components/UI/ButtonAgrea.vue";
import {auth as $store} from "@/store/auth.model.js";
import {createRouter as $router} from "vue-router";

export default {
  name: "RegistrationPage",
  components: {ButtonAgrea, MainHeader},
  data(){
    return{
      user: {
        email: null,
        name: null,
        surname: null,
        patronymic: null,
        password: null,
        phone: null,
        id_type: 1
      },
      passwordConfirm: null,
      surnameRule: [
        v => !!v || 'Фамилия не заполнена',
        v => /^[а-яА-ЯёЁ\s-]{2,20}$/.test(v) || 'Фамилия может содержать только русские символы и длинной от 2 до 21 символа'
      ],
      nameRule: [
        v => !!v || 'Имя не заполнена',
        v => /^[а-яА-ЯёЁ\s-]{2,20}$/.test(v) || 'Имя может содержать только русские символы и длинной от 2 до 21 символа'
      ],
      patronymicRule: [
        v => !!v || 'Отчество не заполнена',
        v => /^[а-яА-ЯёЁ\s-]{2,20}$/.test(v) || 'Отчество может содержать только русские символы и длинной от 2 до 21 символа'
      ],
      emailRule: [
        v => !!v || 'Почта обязательна',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Неверная почта',
      ],
      phoneRule: [
        v => !!v || 'Почта обязательна',
        v => /^(\+7|8)\d{10}$/.test(v) || 'телефон набран не правильно'
      ],

      passwordAddRule: [
        v => !!v || 'Пароль обязателен',
        v => /^.{4,32}$/.test(v) || 'Длина от 4 до 32 символов',
        v => /[a-z]/.test(v) || 'Хотя бы одна строчная буква',
        v => /[A-Z]/.test(v) || 'Хотя бы одна заглавная буква',
        v => /\d/.test(v) || 'Хотя бы одна цифра',
        v => /[!@#$%^&*]/.test(v) || 'Хотя бы один специальный символ'
      ],
      passwordConfirmRule: [
          v => !!v || 'Пароль обязателен',
          v => (v === this.user.password) || 'Пароль не совпадает'
      ]

    }
  },
  methods: {
    async submit(){
      const valid = await this.$refs.form.validate()
      if(valid.valid){
        this.$store.dispatch('auth/register', {user: this.user})
            .then(
                (response) => {
                  if (response.status !== 200){
                    this.error = response.message
                  }
                  else{
                    const initialState = $store.state;
                    if(initialState.user.type.name === "user"){
                      this.$router.push("/profile")
                    }
                  }
                },
            )
      }
    }
  }
}
</script>

<template>
  <main-header/>
  <v-container class="fill-height d-flex flex-column justify-center align-center">
    <div class="d-flex mb-6">
      <div class="text-h6 font-weight-medium auth-tab mr-8" @click="this.$router.push('/login')">Вход</div>
      <div class="text-h6 font-weight-medium auth-tab active-tab" @click="this.$router.push('/registration')">Регистрация</div>
    </div>

    <v-col cols="12" md="4">
      <v-form ref="form">
        <v-text-field
            v-model="user.surname"
            :rules="surnameRule"
            label="Фамилия"
            placeholder="Ваше фамилия..."
            variant="outlined"
            class="mb-3"
        />
        <v-text-field
            v-model="user.name"
            :rules="nameRule"
            label="Имя"
            placeholder="Ваше имя..."
            variant="outlined"
            class="mb-3"
        />
        <v-text-field
            v-model="user.patronymic"
            label="Отчество"
            placeholder="Ваша отчество..."
            variant="outlined"
            class="mb-3"
        />
        <v-text-field
            v-model="user.email"
            :rules="emailRule"
            label="Email"
            placeholder="Введите ваш email"
            variant="outlined"
            class="mb-3"
        />
        <v-text-field
            v-model="user.phone"
            :rules="phoneRule"
            label="Телефон"
            placeholder="Введите ваш телефон"
            variant="outlined"
            type="phone"
            class="mb-3"
        />
        <v-text-field
            v-model="user.password"
            :rules="passwordAddRule"
            label="Пароль"
            placeholder="Придумайте пароль..."
            type="password"
            variant="outlined"
            class="mb-3"
        />
        <v-text-field
            v-model="passwordConfirm"
            :rules="passwordConfirmRule"
            label="Повторите пароль"
            placeholder="Повторите пароль..."
            type="password"
            variant="outlined"
            class="mb-3"
        />
        <v-btn color="pink-lighten-3" block @click="submit">Зарегистрироваться</v-btn>
      </v-form>
    </v-col>
  </v-container>
</template>

<style scoped>
.auth-tab {
  cursor: pointer;
  color: #888;
  padding-bottom: 4px;
}

.active-tab {
  color: black;
  border-bottom: 2px solid #f48fb1;
}
</style>