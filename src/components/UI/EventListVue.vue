<script>
import moment from "moment/moment.js";
import EventService from "@/store/event.service.js";
import SearchEventForm from "@/components/Form/SearchEventForm.vue";
import EventRegForm from "@/components/Form/EventRegForm.vue";
import {auth as $store} from "@/store/auth.model.js";

export default {
  name: "EventListVue",
  components: {EventRegForm, SearchEventForm},
  props: {
    byUser: false
  },
  data(){
    return{
      event: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      loading: false,
      search: "",
      totalItems: 0,

      tags: [],
      city: null,
      userType: $store.state.user.type.name || null,
      userUuid: $store.state.user.uuid || null,
    }
  },
  methods: {
    dateInfo(date) {
      let dateNew = new Date(date)
      return moment(dateNew).format('DD.MM.YYYY HH:mm')
    },
    loadItem() {
      this.loading = true
      if (this.search.length === 0) {
        EventService.getPageEvent(this.page, this.tags, this.city).then(
            response => {
              this.event = response.data
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"])
              this.itemsPerPage = parseInt(response.headers["x-count-item"])
              this.pageCount = parseInt(response.headers["x-count-page"])
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      } else {
        EventService.searchEvent(this.search).then(
            response => {
              this.event = response.data
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }
    },
    loadItemByUser(){
      this.loading = true
      if (this.search.length === 0) {
        EventService.getPageEventByUser(this.page).then(
            response => {
              this.event = response.data
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"])
              this.itemsPerPage = parseInt(response.headers["x-count-item"])
              this.pageCount = parseInt(response.headers["x-count-page"])
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      } else {
        EventService.searchEvent(this.search).then(
            response => {
              this.event = response.data
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }
    },

    searchFunct(data){
      this.city = data.selectedCity
      this.tags = data.selectedTags
      this.search = data.searchQuery

      if(!this.byUser)
        this.loadItem()
      else
        this.loadItemByUser()
    },
    resetInfo(){
      this.city = null
      this.tags = []
      this.search = ""

      if(!this.byUser)
        this.loadItem()
      else
        this.loadItemByUser()
    }
  },
  watch: {
    page(){
      if(!this.byUser)
        this.loadItem()
      else
        this.loadItemByUser()
    }
  },
  mounted() {
    if(!this.byUser)
      this.loadItem()
    else
      this.loadItemByUser()
  }
}
</script>

<template>
  <SearchEventForm @search="searchFunct" @reset="resetInfo"/>
  <v-container class="py-12" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="10">
            <v-card class="mb-6 pa-4" elevation="0" rounded="xl" border
                    v-for="item in event"
                    :key="item.uuid">
              <v-row>
                <v-col cols="12" md="4">
                  <v-img
                      src="/gl.png"
                      alt="Школа будущих мам"
                      height="160"
                      cover
                      class="rounded-lg"
                  />
                </v-col>
                <v-col cols="12" md="8">
                  <h3 class="text-subtitle-1 font-weight-bold title-case">
                    <span class="title-case">{{ item.name }}</span>
                  </h3>
                  <p class="text-body-2 mt-2 mb-3">
                    {{ item.description_lite }}
                  </p>
                  <p class="text-body-2 font-weight-medium mb-1">
                    Дата и время проведения: <strong>{{ dateInfo(item.date_conducting) }}</strong>
                  </p>
                  <p class="text-body-2 font-weight-medium">
                    Место проведения: <span class="text-deep-pink">г. {{ item.city.name }} {{ item.address }}</span>
                  </p>
                </v-col>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn text append-icon="mdi-link-variant" color="pink" variant="flat" class="mt-n6 me-2" @click="this.$router.push(`/event/vue/${item.uuid}`)">
                    подробнее
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>

          </v-col>
        </v-row>
    <v-row justify="center">
      <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="itemsPerPage"
          color="primary"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-h6 {
  font-weight: bold;
}
.article-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.article-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.title-case {
  text-transform: capitalize;
}
</style>