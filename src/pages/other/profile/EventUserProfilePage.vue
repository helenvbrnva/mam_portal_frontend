<script>
import EventListVue from "@/components/UI/EventListVue.vue";

export default {
  name: "EventUserProfilePage",
  components: {EventListVue}
}
</script>

<template>
  <event-list-vue :by-user="true"/>
</template>

<style scoped>

</style>