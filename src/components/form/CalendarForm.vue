<script>
import ButtonAgrea from "@/components/UI/ButtonAgrea.vue";

export default {
  name: "CalendarForm",
  components: {ButtonAgrea},
  props: {
    addMode: {
      type: Boolean,
      default: true
    },
    calendarInfo: {
      type: Object,
      default: {
        name: null,
        description: null,
        img: null
      }
    }
  },
  data(){
    return{
      calendarItem:{
        name: null,
        description: null,
        img: null
      }
    }
  },
  methods: {
    add(){
      let form = new FormData()
      if(this.calendarItem.img !== null)
        form.append("img", this.calendarItem.img)
      form.append("description", this.calendarItem.description)
      form.append("name", this.calendarItem.name)
      this.$emit("add", form)
      this.$nextTick(() => {
        this.calendarItem = {
          name: null,
          description: null,
          img: null
        }
      })
    },
    update(){
      let form = new FormData()
      if(this.calendarItem.img !== null)
        form.append("img", this.calendarItem.img)
      form.append("description", this.calendarItem.description)
      form.append("name", this.calendarItem.name)
      this.$emit("update", form)
      this.$nextTick(() => {
        this.calendarItem = {
          name: null,
          description: null,
          img: null
        }
      })
    }
  },
  mounted() {
    if(!this.addMode){
      this.calendarItem.name = this.calendarInfo.name
      this.calendarItem.description = this.calendarInfo.description
    }
  }
}
</script>

<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
            type="text"
            v-model="calendarItem.name"
            label="Заголовок"
            variant="underlined"
        />
      </v-col>
      <v-col cols="12" md="12">
        <v-textarea
            v-model="calendarItem.description"
            variant="underlined"
            label="Описание"
            auto-grow
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-file-input show-size label="Загрузить Фотографию" accept="image/*" outlined v-model="calendarItem.img"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <small class="text-caption text-medium-emphasis">* - Поле обязательное</small>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" v-if="addMode">
        <ButtonAgrea @click="add">Добавить</ButtonAgrea>
      </v-col>
      <v-col cols="12" md="4" v-else>
        <ButtonAgrea @click="update">Обновить</ButtonAgrea>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>