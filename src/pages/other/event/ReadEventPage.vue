<script>
import {auth as $store} from "@/store/auth.model.js";
import EventService from "@/store/event.service.js";
import moment from "moment";
import EventRegForm from "@/components/Form/EventRegForm.vue";
import RegUserForm from "@/components/Form/RegUserForm.vue";

export default {
  name: "ReadEventPage",
  components: {RegUserForm, EventRegForm},
  data(){
    return {
      uuidEvent: this.$route.params.uuid,
      error: null,
      userType: $store.state.user.type.name || null,
      userUuid: $store.state.user.uuid || null,
      isLoad: false,
      event: null,
    }
  },
  methods: {
    loadEvent(){
      EventService.getEventByUuid(this.uuidEvent)
          .then((event) => {
            this.event = event
            this.isLoad = true
          })
    },
    dateInfo(date) {
      let dateNew = new Date(date)
      return moment(dateNew).format('DD.MM.YYYY HH:mm')
    },
    updateCountReg(){
      this.$refs.eventRegForm.getInfoRegUser()
    }
  },
  mounted() {
    this.loadEvent()
  }
}
</script>

<template>
  <v-container class="my-6" v-if="isLoad">
    <v-row>
      <v-col cols="12" md="9">
        <v-card flat class="pa-4 mb-6">
          <v-card-title class="text-h5 font-weight-bold pb-0">
            {{ event.name }}
          </v-card-title>
          <v-card-subtitle class="text-body-2 text-grey">
            {{ event.description_lite }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="my-4" align="stretch">
      <v-col cols="12" md="6">
        <v-img
            class="rounded-lg"
            height="100%"
            src="/gl.png"
            cover
        ></v-img>
      </v-col>

      <!-- Правая колонка: инфо-блок -->
      <v-col cols="12" md="6">
        <v-sheet
            elevation="1"
            class="pa-4 rounded-lg d-flex flex-column justify-space-between h-100"
            style="background: linear-gradient(135deg, #2c3e50, #4b6584); color: white;"
        >
          <!-- Блок состояния события -->
          <div class="mb-4">
            <span class="text-subtitle-2 font-weight-medium">Статус:</span>
            <v-chip
                class="ms-2"
                color="white"
                text-color="#2c3e50"
                variant="elevated"
                size="small"
                label
            >
              {{ event.state.description }}
            </v-chip>
          </div>

          <!-- Основной инфоблок -->
          <div class="d-flex flex-column flex-grow-1 justify-center">
            <div class="d-flex align-center mb-3">
              <v-icon class="me-2" color="white">mdi-calendar</v-icon>
              {{ dateInfo(event.date_conducting) }}
            </div>
            <div class="d-flex align-center mb-3">
              <v-icon class="me-2" color="white">mdi-clock-outline</v-icon>
              {{ dateInfo(event.date_stop) }}
            </div>
            <div class="d-flex align-center mb-3">
              <v-icon class="me-2" color="white">mdi-human-male-female</v-icon>
              2–3 семестр
            </div>
            <div class="d-flex align-center mb-3">
              <v-icon class="me-2" color="white">mdi-map-marker</v-icon>
              {{ event.city.name }}, {{ event.address }}
            </div>
          </div>
          <event-reg-form
              ref="eventRegForm"
              :user-type="userType"
              :uuid-event="uuidEvent"
              :uuid-user="userUuid"
              :state-event="event.state.name"
          />
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="9">
        <v-card flat class="pa-4 mb-6">
          <v-card-text class="text-body-1" v-html="event.description">
          </v-card-text>

          <!-- Теги -->
          <v-card-text v-if="event.tags?.length">
            <strong>Теги:</strong>
            <v-chip-group>
              <v-chip v-for="tag in event.tags" :key="tag.id" class="ma-1">{{ tag.name }}</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>



    <v-card flat class="pa-4 mb-6" v-if="userType === 'admin'">
      <v-card-title class="text-subtitle-1 font-weight-bold">Участники</v-card-title>
      <v-card-text>
        <reg-user-form
            :uuid-event="uuidEvent"
            :users-info="event.users"
            @update="updateCountReg"
        />
      </v-card-text>
    </v-card>
  </v-container>



</template>

<style scoped>

</style>