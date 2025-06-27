<template>
  <main-header/>
  <v-main>
    <v-container class="fill-height d-flex flex-column justify-center align-center">
      <div class="d-flex mb-6">
        <div class="text-h6 font-weight-medium auth-tab mr-8 active-tab" @click="this.$router.push('/login')">Вход</div>
        <div class="text-h6 font-weight-medium auth-tab " @click="this.$router.push('/registration')">Регистрация</div>
      </div>
        <v-col cols="12" md="4">
          <v-form ref="form">
            <v-text-field
                label="e-mail"
                placeholder="Введите e-mail"
                variant="outlined"
                density="comfortable"
                class="mb-4"
                v-model="email"
                :rules="emailRules"
            />
            <v-text-field
                label="Пароль"
                placeholder="Введите пароль"
                type="password"
                variant="outlined"
                density="comfortable"
                class="mb-1"
                v-model="password"
            />
            <v-btn color="pink-lighten-3" block @click="login">Войти</v-btn>
          </v-form>
        </v-col>
    </v-container>
  </v-main>
</template>

<script>
import router from "@/router/router";
import {auth as $store} from "@/store/auth.model";
import ButtonAgrea from "@/components/UI/ButtonAgrea.vue";
import MainHeader from "@/components/MainHeader.vue";

export default {
  components: {MainHeader, ButtonAgrea},
  data(){
    return{
      email: "",
      password: "",
      error: null,

      emailRules: [
        v => !!v || 'Почта обязательна',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Неверная почта',
      ]
    }
  },
  methods:{
    async login(){
      const valid = await this.$refs.form.validate()
      if(!valid.valid)
        return

      this.$store.dispatch('auth/login', {url: '/login/sign-in', email: this.email, password: this.password})
          .then(
              (response) => {
                if (response.status !== 200){
                  this.error = response.message
                }
                else{
                  const initialState = $store.state;
                  if(initialState.user.type.name === "user"){
                    router.push("/profile")
                  }else{
                    router.push('/admin/user')
                  }
                }
              },
          )
    }
  },
  name: "LoginPage"
}
</script>

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