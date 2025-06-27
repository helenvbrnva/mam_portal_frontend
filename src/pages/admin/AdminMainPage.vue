<script>
import AdminHeader from "@/components/AdminHeader.vue";

export default {
  name: "AdminMainPage",
  components: {AdminHeader}
}
</script>

<template>
  <admin-header/>
  <v-main>
    <router-view>

    </router-view>
  </v-main>
</template>

<style scoped>

</style>