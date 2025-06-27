<script>
import EventService from "@/store/event.service.js";
import {auth as $store} from "@/store/auth.model.js";

export default {
  name: "RegUserForm",
  props: {
    uuidEvent: null,
    usersInfo: null,
  },
  data(){
    return{
      headers: [
        { title: 'ФИО', align: 'start', sortable: false, key: 'name',  value: item => {
            if(item.name !== null)
              return `${item.surname} ${item.name[0]}. ${item.patronymic[0]}.`
            return "Нет"
          }
        },
        { title: 'Почта', key: 'email', align: 'start', value: item => {
            if(item.email === null)
              return "Нет"
            return item.email
          }
        },
        { title: 'Телефон', key: 'phone', align: 'start', value: item => {
            if(item.phone === null)
              return "Нет"
            return item.phone
          }
        },
        { title: 'Роль', key: 'type', align: 'start', value: item => `${item.type.name}` },
        { title: 'Действия', key: "actions", align: 'center' }
      ],
      dialog: false,
      users: this.usersInfo
    }
  },
  methods: {
    deleteRegUser(uuidUser){
      EventService.deleteRegUserByAdmin(uuidUser, this.uuidEvent).then((users) => {
            this.users = users
            this.$emit("update")
          }
      )
    }
  },
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      min-width="1000px"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-row align="center" justify="start">
        <v-col cols="auto">
          <v-btn
              class="text-none font-weight-regular"
              prepend-icon="mdi-account"
              variant="tonal"
              v-bind="activatorProps"
          >Пользователи</v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card
        prepend-icon="mdi-update"
        title="Пользователи"
        class="overflow-visible"
    >
      <v-card-text>
        <v-row>
          <v-data-table
              :headers="headers"
              :items="users"
              hide-default-footer
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon
                  size="small"
                  @click="deleteRegUser(item.uuid)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-row>

      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<style scoped>

</style>