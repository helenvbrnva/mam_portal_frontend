<script>
import {auth as $store} from "@/store/auth.model.js";
import MainHeader from "@/components/MainHeader.vue";
import AdminHeader from "@/components/AdminHeader.vue";

export default {
  name: "BaseEventPage",
  components: {AdminHeader, MainHeader},
  data(){
    return{

      userType: $store.state.user.type.name ? $store.state.user.loggedIn : null,
    }
  }
}
</script>

<template>
  <AdminHeader v-if="userType === 'admin'"/>
  <MainHeader v-else/>
  <router-view>

  </router-view>
  <v-footer padless color="#222">
    <v-col class="text-center white--text py-6">
      <div class="text-h6 font-weight-bold">SMOM — забота с первых шагов</div>
      <div class="text-caption mt-2">© 2025 SMOM. Все права защищены.</div>
    </v-col>
  </v-footer>
</template>

<style scoped>

</style>