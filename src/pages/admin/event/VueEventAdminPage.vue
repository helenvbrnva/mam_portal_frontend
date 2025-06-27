<script>
import FixedButton from "@/components/UI/FixedButton.vue";
import EventTable from "@/components/Tabels/EventTable.vue";
import EventService from "@/store/event.service.js";

export default {
  name: "VueEventAdminPage",
  components: {EventTable, FixedButton},
  data(){
    return {
      snackbar: false,
      error: ""
    }
  },
  methods: {
    addEvent(){
      this.$router.push(`/admin/event/add`)
    },
    deleteEvent(uuid){
      EventService.deleteEvent(uuid)
          .then(()=>{
            this.message = "Событие удалено"
            this.snackbar = true
            this.$refs.eventTable.loadItem(1)
          })
    },
    updateEvent(uuid){
      this.$router.push(`/admin/event/edit/${uuid}`)
    },
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <EventTable
            ref="eventTable"
            @update="updateEvent"
            @delete="deleteEvent"
        />
      </v-col>
    </v-row>
  </v-container>
  <FixedButton @click="addEvent"/>
</template>

<style scoped>

</style>