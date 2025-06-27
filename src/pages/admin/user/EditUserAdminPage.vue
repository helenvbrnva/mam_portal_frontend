<script>
import UserForm from "@/components/Form/UserForm.vue";
import UserService from "@/store/user.service.js";

export default {
  name: "EditUserAdminPage",
  components: {UserForm},
  data(){
    return {
      idUser: this.$route.params.uuid,
      addMode: (this.$route.params.uuid === undefined),
      error: null
    }
  },
  methods: {
    addUser(user){
      UserService.addUser(user)
          .then(() => {
            this.$router.push(`/admin/user/`)
          })
          .catch((response) => {
            this.error = response.data.message
          })

    },
    updateUser(user){
      UserService.updateUser(this.idUser, user)
          .then(() => {
            this.$router.push(`/admin/user/`)
          })
          .catch((response) => {
            this.error = response.data.message
          })
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-alert
            density="compact"
            :text="error"
            title="Ошибка"
            type="warning"
            v-if="error !== null"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <UserForm
            :add-mode="addMode"
            :id-user="idUser"
            @addUser="addUser"
            @updateUser="updateUser"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>