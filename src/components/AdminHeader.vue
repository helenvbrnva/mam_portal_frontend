<script>
import {auth as $store} from "@/store/auth.model.js";

export default {
  name: "AdminHeader",
  data(){
    return {
      appTitle: 'Админ панель',
      isLogin: $store.state.status.loggedIn,
      drawer: false,

      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
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
  }
}
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>Админ панель</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn @click="this.$router.push('/admin/user')">Пользователи</v-btn>
    <v-btn @click="this.$router.push('/admin/env')">Теги/Топики</v-btn>
    <v-btn @click="this.$router.push('/admin/article')">Статьи</v-btn>
    <v-btn @click="this.$router.push('/admin/event')">Мероприятия</v-btn>
    <template v-slot:append v-if="isLogin === true">
      <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="end"
      >
        <template v-slot:activator="{ props }">
          <v-btn
              v-bind="props"
          >
            Аккаунт
          </v-btn>
        </template>

        <v-card min-width="300">
          <v-list>
            <v-list-item
                :prepend-avatar="icon"
                :title="fullName"
            >
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item prepend-icon="mdi-account" title="Профиль" @click="this.$router.push('/profile')"/>
            <v-list-item prepend-icon="mdi-calendar-blank" title="Календарь" @click="this.$router.push('/profile/calendar')"/>
            <v-list-item prepend-icon="mdi-thumb-up" title="Статьи" @click="this.$router.push('/profile/article')"/>
            <v-list-item prepend-icon="mdi-calendar-star" title="События" @click="this.$router.push('/profile/event') "/>
          </v-list>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
                variant="text"
                @click="menu = false"
            >
              Закрыть
            </v-btn>
            <v-btn
                color="primary"
                variant="text"
                @click="logout"
            >
              Выйти из аккаунта
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </template>
  </v-toolbar>
</template>

<style scoped>

</style>