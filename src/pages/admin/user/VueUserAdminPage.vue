<script>
import UserTable from "@/components/Tabels/UserTable.vue";
import UserService from "@/store/user.service.js";
import FixedButton from "@/components/UI/FixedButton.vue";

export default {
  name: "VueUserAdminPage",
  components: {FixedButton, UserTable},
  data(){
    return {
      snackbar: false,
      error: ""
    }
  },
  methods: {
    addUser(){
      //this.$refs.userTool.close()
      this.$router.push(`/admin/user/add`)
    },
    deleteUser(uuid){
      UserService.deleteUser(uuid)
          .then(()=>{
            this.message = "Пользователь удален"
            this.snackbar = true
            this.$refs.userTable.loadItem(1)
          })
    },
    updateUser(uuid){
      //this.$refs.userTool.close()
      this.$router.push(`/admin/user/edit/${uuid}`)
    },
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <UserTable
            ref="userTable"
            @deleteUser="deleteUser"
            @updateUser="updateUser"/>
      </v-col>
    </v-row>
    <v-snackbar
        :timeout="4000"
        v-model="snackbar"
    >
      {{error}}
    </v-snackbar>
  </v-container>
  <FixedButton @click="addUser"/>
</template>

<style scoped>

</style>