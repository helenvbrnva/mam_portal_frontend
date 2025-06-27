<script>
import CalendarService from "@/store/calendar.service.js";
import CreateCalendarForm from "@/components/Form/CreateCalendarForm.vue";
import CalendarForm from "@/components/Form/CalendarForm.vue";
import moment from "moment";

export default {
  name: "CalendarUserProfilePage",
  components: {CalendarForm, CreateCalendarForm},
  data() {
    return {
      dialogAddItemCalendar: false,
      dialogUpdateItemCalendar: false,
      selectCalendarItem: null,
      calendar: {
        uuid: null,
        name: null,
        date_start: null,
        date_end: null
      },
      today: moment(new Date()).format("YYYY-MM-DD"),
      events: [],
      isCreateCalendar: true,

      snackbar: false,
      message: ""
    };
  },
  methods: {
    loadCalendar(){
      this.events = []
      CalendarService.getCalendarByUuidUser().then((calendar) => {
        this.calendar = calendar
        this.events = Object.values(calendar.calendar).map(event => ({
                          key: event.name,
                          highlight: true,
                          dates: new Date(event.date)
                      }));
        this.isCreateCalendar = false
      }).catch(() => {
        this.isCreateCalendar = true
      })
    },
    addCalendarItem(form){
      form.append("date", this.today)
      CalendarService.addItemCalendar(this.calendar.uuid, form).then(() => {
          this.loadCalendar()
          this.dialogAddItemCalendar = false

          this.snackbar = true
          this.message = "Запись добавлена"
      })
    },
    updateCalendarItem(form){
      CalendarService.updateItemCalendar(this.calendar.uuid, this.today, form).then((response) => {
        this.loadCalendar()
        this.dialogUpdateItemCalendar = false
        this.selectCalendarItem = null

        this.snackbar = true
        this.message = "Запись обновлена"
      })
    },
    deleteCalendarItem(){
      CalendarService.deleteCalendarItem(this.calendar.uuid, this.today).then((response) => {
        this.loadCalendar()
        this.selectCalendarItem = null

        this.snackbar = true
        this.message = "Запись удалена"
      })
    },
    getDate(date) {
      this.today = date.id
      this.selectCalendarItem = this.calendar.calendar[date.id] || null
    },
    convertDescription(description){
        return description.replace(/\r\n|\r|\n/g, "<br>")
    }
  },
  mounted() {
    this.loadCalendar()
  }
}
</script>

<template>
  <v-container v-if="isCreateCalendar === false">
    <v-snackbar
        :timeout="4000"
        v-model="snackbar"
    >
      {{message}}
    </v-snackbar>
    <v-row class="fill-height">
      <v-col cols="12" md="7">
        <v-sheet min-height="300">
          <v-row>
            <v-col cols="12" md="12">
              <VCalendar
                  transparent
                  borderless
                  expanded
                  @dayclick="getDate"
                  :attributes="events"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-btn @click="dialogAddItemCalendar=true" :disabled="selectCalendarItem !== null">Добавить</v-btn>
              <v-btn @click="dialogUpdateItemCalendar=true" :disabled="selectCalendarItem === null">Редактировать</v-btn>
              <v-btn @click="deleteCalendarItem" :disabled="selectCalendarItem === null">Удалить</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="5">
        <v-card v-if="selectCalendarItem !== null">
          <v-img :src="selectCalendarItem.img" height="100%" cover></v-img>
          <v-card-title>Информация о дате</v-card-title>
          <v-card-text>
            <p><strong>Название:</strong> {{selectCalendarItem.name}}</p>
            <p><strong>Описание:</strong></p>
            <p v-html="convertDescription(selectCalendarItem.description)"></p>
          </v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-title>По данной дате пока нет записи</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogAddItemCalendar" max-width="800px">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <CalendarForm
                  :addMode="true"
                  @add="addCalendarItem"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogUpdateItemCalendar" max-width="800px">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <CalendarForm
                  :addMode="false"
                  :calendar-info="selectCalendarItem"
                  @update="updateCalendarItem"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>


  </v-container>
  <v-container v-else>
    <v-row justify="center" class="mt-4">
      <v-col cols="12" class="text-center">
        <p><strong>У вас нет активного календаря, вам необходимо создать календарь</strong></p>
        <CreateCalendarForm @create="loadCalendar"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>