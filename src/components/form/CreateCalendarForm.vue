<script>
import ButtonAgrea from "@/components/UI/ButtonAgrea.vue";
import TextEditor from "@/components/UI/TextEditor.vue";
import TagSelection from "@/components/UI/TagSelection.vue";
import CalendarService from "@/store/calendar.service.js";

export default {
  name: "CreateCalendarForm",
  components: {TagSelection, TextEditor, ButtonAgrea},
  data(){
    return{
      calendar: {
        name: null,
        date_start: null
      },
      dialog: false,
      nameRule: [
        v => !!v || 'Название не заполнена',
        v => (v.length > 5 && v.length <= 90) || 'Название может быть длинной от 5 до 90 символа'
      ],
    }
  },
  methods: {
    async create(){
      const valid = await this.$refs.form.validate()
      if(valid.valid){
        CalendarService.createCalendar(this.calendar).then(() => {
          this.$emit("create")
          this.dialog = false
        })
      }
    },
  }
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      min-width="1000px"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-center">
          <v-btn
              class="text-none font-weight-regular"
              prepend-icon="mdi-calendar"
              variant="tonal"
              v-bind="activatorProps"
          >Создать календарь</v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card
        prepend-icon="mdi-update"
        title="Калекндарь"
        class="overflow-visible"
    >
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                  type="text"
                  v-model="calendar.name"
                  label="Название *"
                  variant="underlined"
                  :rules="nameRule"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <label>Дата первого дня последней менструации (ПДПМ)</label>
              <VueDatePicker v-model="calendar.date_start"
                             locale="ru"
                             :format="formatDate">
                <template #input-icon>
                  <img/>
                </template>
              </VueDatePicker>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <small class="text-caption text-medium-emphasis">* - Поле обязательное</small>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <ButtonAgrea @click="create">Опубликовать</ButtonAgrea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>