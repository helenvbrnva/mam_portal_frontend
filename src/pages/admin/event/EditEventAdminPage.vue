<script>
import EventForm from "@/components/Form/EventForm.vue";
import ArticleForm from "@/components/Form/ArticleForm.vue";
import EventService from "@/store/event.service.js";

export default {
  name: "EditEventAdminPage",
  components: {ArticleForm, EventForm},
  data(){
    return {
      uuidEvent: this.$route.params.uuid,
      addMode: (this.$route.params.uuid === undefined),
      error: null
    }
  },
  methods: {
    addEvent(event){
      EventService.addEvent(event)
          .then(() => {
            this.$router.push(`/admin/event/`)
          })
          .catch((response) => {
            this.error = response.data.message
          })

    },
    updateEvent(event){
      EventService.updateEvent(this.uuidEvent, event)
          .then(() => {
            this.$router.push(`/admin/event/`)
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
        <EventForm
            :add-mode="addMode"
            :uuid-event="uuidEvent"
            @addEvent="addEvent"
            @updateEvent="updateEvent"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>