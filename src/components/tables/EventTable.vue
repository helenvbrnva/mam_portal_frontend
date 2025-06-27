<script>
import DeleteButton from "@/components/UI/DeleteButton.vue";
import moment from "moment/moment.js";
import EventService from "@/store/event.service.js";

export default {
  name: "EventTable",
  components: {DeleteButton},
  data(){
    return{
      itemsPerPage: 20,
      headers: [
        { title: 'Название', align: 'start', sortable: false, key: 'name',  value: item => {
            if(item.name !== null)
              return item.name
            return "Нет"
          }
        },
        { title: 'Дата начала', key: 'date_conducting', align: 'start', value: item => {
            let dateNew = new Date(item.date_conducting)
            return moment(dateNew).format('DD.MM.YYYY HH:mm')
          }
        },
        { title: 'Дата конца', key: 'date_stop', align: 'start', value: item => {
            let dateNew = new Date(item.date_stop)
            return moment(dateNew).format('DD.MM.YYYY HH:mm')
          }
        },
        { title: 'Город и адресс', key: 'city', align: 'start', value: item => {
            return `${item.city.name} ${item.address}`
          }
        },
        { title: 'Тэги', key: 'tags', align: 'start', value: item =>
          {
            return item.tags.map(tag => tag.name).join(", ")
          }
        },
        { title: 'Сотояние', key: 'state', align: 'start', value: item => item.state.description},
        { title: 'Действия', key: "actions", align: 'center' }
      ],
      event: [],
      totalItems: 0,
      loading: true,
      search: '',
    }
  },
  methods: {
    getColor (state) {
      if (state === "Закрыта регистрация") return 'orange'
      else if (state === "Прошел") return 'red'
      else return 'green'
    },

    loadItem({page}){
      this.loading = true
      if(this.search.length === 0){
        EventService.getPageEvent(page).then(
            response => {
              this.event = response.data
              console.log(this.event)
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"])
              this.itemsPerPage = parseInt(response.headers["x-count-item"])
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }else{
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
    updateEvent(uuid){
      this.$emit("update", uuid)
    },
    deleteEvent(uuid){
      this.$emit("delete", uuid)
    },
    infoEvent(uuid){
      this.$router.push(`/event/vue/${uuid}`)
    },
  },
  watch: {
    search(){
      this.loadItem(1)
    }
  }
}
</script>

<template>
  <v-card
      title="События"
      flat
  >
    <template v-slot:text>
      <v-text-field
          v-model="search"
          label="Поиск"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
      ></v-text-field>
    </template>

    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="event"
        :items-length="totalItems"
        :loading="loading"
        item-value="uuid"
        @update:options="loadItem"
        :items-per-page-options="[
          {value: -1, title: '$vuetify.dataFooter.itemsPerPageAll'}
      ]"
        :items-per-page-text="'Количество элементов'"
        :loading-text="'Закгрузка данных'"
        :no-data-text="'Данных не обнаружено'"
    >
      <template v-slot:[`item.state`]="{ value }">
        <v-chip :color="getColor(value)">
          {{ value }}
        </v-chip>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <delete-button
            @agree="deleteEvent(item.uuid)"
        />
        <v-icon
            class="me-2"
            size="small"
            @click="updateEvent(item.uuid)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            class="me-2"
            size="small"
            @click="infoEvent(item.uuid)"
        >
          mdi-information
        </v-icon>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style scoped>

</style>