<script>
import {auth as $store} from "@/store/auth.model.js";

export default {
  name: "MainHeader",
  data(){
    return {
      appTitle: 'Awesome App',
      isLogin: $store.state.status.loggedIn,
      drawer: false,

      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  computed: {
    fullName(){
      const user = this.$store.state.auth.user
      if(user === null)
        return `Неизветно`
      if(user.name !== null){
        return `${user.surname} ${user.name[0]}. ${user.patronymic[0]}.`
      }
      return `Неизветно`
    },
    icon(){
      const user = this.$store.state.auth.user
      return user.icon
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  },
}
</script>

<template>
  <v-toolbar flat class="px-4 py-2 custom-header" height="80">
    <div class="d-flex align-center" style="flex: 1">
      <v-toolbar-title>
        <img src="../assets/logo.svg" alt="logo" height="32" class="mr-2" />
      </v-toolbar-title>
    </div>

    <div class="d-flex justify-center align-center" style="flex: 1">
      <v-btn text class="mx-2" color="#3B3B3B" @click="this.$router.push('/')">Главная</v-btn>
      <v-btn text class="mx-2" color="#3B3B3B" @click="this.$router.push('/article')">Статьи</v-btn>
      <v-btn text class="mx-2" color="#3B3B3B" @click="this.$router.push('/event')">Мероприятия</v-btn>
    </div>

    <div class="d-flex justify-end align-center" style="flex: 1">
      <template v-if="!isLogin">
        <v-btn
            outlined
            rounded
            color="#3B3B3B"
            class="mx-2 custom-hover-btn"
            @click="$router.push('/login')"
        >
          Вход
        </v-btn>
        <v-btn
            outlined
            rounded
            color="#3B3B3B"
            class="mx-2 custom-hover-btn"
            @click="$router.push('/registration')"
        >
          Регистрация
        </v-btn>
      </template>
      <template v-else>
      <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="bottom end"
      >
        <template v-slot:activator="{ props }">
          <v-btn
              v-bind="props"
              rounded
              color="#3B3B3B"
              class="mx-2"
          >
            Аккаунт
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-list>
            <v-list-item
                :prepend-avatar="icon"
                :title="fullName"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item prepend-icon="mdi-account" title="Профиль" @click="$router.push('/profile')" />
            <v-list-item prepend-icon="mdi-thumb-up" title="Статьи" @click="$router.push('/profile/article')" />
            <v-list-item prepend-icon="mdi-calendar-star" title="События" @click="$router.push('/profile/event')" />
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="text" @click="menu = false">Закрыть</v-btn>
            <v-btn color="primary" variant="text" @click="logout">Выйти</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
    </div>
  </v-toolbar>
</template>

<style scoped>
.custom-header {
  background-color: #FFAED7;
  color: #000; /* Чёрный текст на розовом фоне */
}
.custom-hover-btn {
  border: 1px solid #3B3B3B;
  transition: 0.2s;
}

.custom-hover-btn:hover {
  border: 2px solid #3B3B3B;
}
</style>