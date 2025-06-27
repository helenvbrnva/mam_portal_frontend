<script>
import ButtonAgrea from "@/components/UI/ButtonAgrea.vue";
import TextEditor from "@/components/UI/TextEditor.vue";
import TagSelection from "@/components/UI/TagSelection.vue";
import moment from "moment";
import EnvService from "@/store/env.service.js";
import EventService from "@/store/event.service.js";

export default {
  name: "EventForm",
  components: {TagSelection, TextEditor, ButtonAgrea},
  props: {
    addMode: {
      type: Boolean,
      default: true
    },
    uuidEvent: {
      type: String,
      default: null
    }
  },
  data(){
    return{
      event: {
        name: null,
        address: null,
        date_conducting: null,
        date_stop: null,
        description: "",
        description_lite: "",
        id_city: 1,
        tags: [],
        id_state: 1,
      },
      loader: false,
      listStateEvent: [],
      listCity: [],

      nameRule: [
        v => !!v || 'Название не заполнена',
        v => (v.length > 5 && v.length <= 90) || 'Название может быть длинной от 5 до 90 символа'
      ],
      addressRule: [
        v => !!v || 'Адрес не заполнена',
        v => (v.length > 5 && v.length <= 128) || 'Адрес может быть длинной от 5 до 128 символа'
      ],
    }
  },
  methods: {
    loadStateEvent(){
      EventService.getAllStateEvent()
          .then((stateEvent) => {
            this.listStateEvent = stateEvent
          })
    },

    loadCity(){
      EnvService.getAllCity()
          .then((city) => {
            this.listCity = city
          })
    },

    getEvent(){
      EventService.getEventByUuid(this.uuidEvent)
          .then((event) => {
            Object.assign(this.event, event)
            this.loader = true
            this.$nextTick(() => {
              this.$refs.description.val(event.description)
            })
          })
    },

    async addEvent(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.event.tags = Object.keys(this.event.tags)
      this.$emit("addEvent", this.event)
    },
    async updateEvent(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.event.tags = Object.keys(this.event.tags)
      this.$emit("updateEvent", this.event)
    },

    formatDate(date){
      return moment(date).format('DD/MM/YYYY HH:mm');
    }
  },
  mounted() {
    this.loadCity()
    if(this.addMode === false){
      this.getEvent()
      this.loadStateEvent()
    }else{
      this.loader = true
    }
  }
}
</script>

<template>
  <v-form ref="form" v-if="loader">
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
            type="text"
            v-model="event.name"
            label="Название *"
            variant="underlined"
            :rules="nameRule"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-select
            label="Город *"
            :items="listCity"
            item-title="name"
            item-value="id"
            variant="underlined"
            v-model="event.id_city"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
            type="text"
            v-model="event.address"
            label="Адресс *"
            variant="underlined"
            :rules="addressRule"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <label>Время начала *</label>
        <VueDatePicker v-model="event.date_conducting"
                       locale="ru"
                       :format="formatDate">
          <template #input-icon>
            <img/>
          </template>
        </VueDatePicker>
      </v-col>
      <v-col cols="12" sm="6" v-if="event.date_conducting !== null">
        <label>Время окончания</label>
        <VueDatePicker
            v-model="event.date_stop"
            locale="ru"
            :min-date="event.date_conducting"
            prevent-min-max-navigation
            :format="formatDate">

          <template #input-icon>
            <img/>
          </template>
        </VueDatePicker>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" v-if="!addMode">
        <v-select
            label="Тема статьи *"
            :items="listStateEvent"
            item-title="description"
            item-value="id"
            variant="underlined"
            v-model="event.id_state"
        />
      </v-col>
      <v-col>
        <tag-selection
            v-model="event.tags"
            :text-btn="'Выбрать тэги *'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-textarea
            :placeholder="'Краткое содержание *'"
            v-model="event.description_lite"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <TextEditor
            :placeholder="'Содержание *'"
            v-model="event.description"
            ref="description"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <small class="text-caption text-medium-emphasis">* - Поле обязательное</small>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" v-if="addMode">
        <ButtonAgrea @click="addEvent">Опубликовать</ButtonAgrea>
      </v-col>
      <v-col cols="12" md="4" v-else>
        <ButtonAgrea @click="updateEvent">Обновить</ButtonAgrea>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>