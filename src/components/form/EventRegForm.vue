<script>
import EventService from "@/store/event.service.js";
import {auth as $store} from "@/store/auth.model.js";

export default {
  name: "EventRegForm",
  props: {
    uuidUser: {
      type: Object,
      default: null
    },
    uuidEvent: {
      type: Object,
      default: null
    },
    stateEvent:{
      type: Object,
      default: null
    },
    userType: {
      type: Object,
      default: null
    },
  },
  data(){
    return{
      countUser: 0,
      isUserReg: false,
      snackbar: false,
      message: "",
    }
  },
  methods: {
    getInfoRegUser(){
      let userUuid = this.uuidUser
      if(this.userType === null)
        userUuid = "no"

      EventService.getUserRegInfo(this.uuidEvent, userUuid).then((info) => {
        this.countUser = info.count
        this.isUserReg = info.youReg
      })
    },

    addRegUser(){
      EventService.addRegUser(this.uuidEvent).then((info) => {
        this.getInfoRegUser()
      })
    },
    removeRegUser(){
      EventService.deleteRegUser(this.uuidEvent).then((info) => {
        this.getInfoRegUser()
      })
    }

  },
  mounted() {
    this.getInfoRegUser()
  }
}
</script>

<template>
  <!--<v-card flat class="pa-4 mb-6">
    <v-card-text>
      <v-row>
        <v-col cols="12" v-if="userType !== null && stateEvent === 'opened'">
          <div class="text-body-1">
            <strong>{{countUser}}</strong>
            <v-btn
                prepend-icon="mdi-account-remove"
                variant="outlined"
                color="red"
                @click="removeRegUser"
                v-if="this.isUserReg">
              Отписаться
            </v-btn>
            <v-btn
                prepend-icon="mdi-account-check"
                variant="outlined"
                color="green"
                @click="addRegUser"
                v-else>
              Зарегистрироваться
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" v-else>
          <strong>Для того что бы зарегистрироваться на мероприятияе требуеться авторизоваться</strong>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>-->
  <div v-if="userType !== null && stateEvent === 'opened'">
    <div class="d-flex align-center mb-4">
      <div class="text-body-1 text-white">
        Участников зарегистрировано: <strong>{{ countUser }}</strong>
      </div>

      <v-btn
          v-if="isUserReg"
          color="red darken-2"
          prepend-icon="mdi-account-remove"
          @click="removeRegUser"
      >
        Отписаться
      </v-btn>

      <v-btn
          v-else
          color="amber darken-2"
          prepend-icon="mdi-account-check"
          @click="addRegUser"
      >
        Зарегистрироваться
      </v-btn>
    </div>
  </div>

  <div v-else>
    <p class="text-white font-weight-medium">
      Для того чтобы зарегистрироваться на мероприятие, требуется авторизоваться.
    </p>
  </div>
</template>

<style scoped>
.text-body-1 > strong{
  margin-right: 10px;
}
</style>