<script>
import EnvService from "@/store/env.service.js";
import ButtonAgrea from "@/components/UI/ButtonAgrea.vue";

export default {
  name: "TagForm",
  components: {ButtonAgrea},
  props: {
    addMode: {
      type: Boolean,
      default: true
    },
    idTag: {
      type: String,
      default: null
    }
  },
  data(){
    return {
      tag: {
        name: null,
        description: null
      },
      defaultTag: {
        name: null,
        description: null
      },
      nameRule: [
        v => !!v || 'Название не заполнена',
        v => /^[а-яА-ЯёЁ\s-]{2,20}$/.test(v) || 'Название может содержать только русские символы и длинной от 2 до 21 символа'
      ],
      descriptionRule: [
        v => (!v || v.length <= 300) || 'Описание не может быть болше 300 симворлов'
      ],
    }
  },
  methods: {
    getTag(){
      EnvService.getTagById(this.idTag)
          .then((tag) => {
            Object.assign(this.tag, tag)
          })
    },
    async addTag(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.$emit("addTag", this.tag)
    },
    async updateTag(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.$emit("updateTag", this.tag)
    },
    clearForm(){
      Object.assign(this.tag, this.defaultTag)
    }

  },
  mounted() {
    if(this.addMode === false){
      this.getTag()
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
            v-model="tag.name"
            label="Название *"
            variant="underlined"
            :rules="nameRule"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-textarea
            v-model="tag.description"
            variant="underlined"
            label="Описание"
            auto-grow
            :rules="descriptionRule"
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
        <ButtonAgrea @click="addTag">Сохранить</ButtonAgrea>
      </v-col>
      <v-col cols="12" md="4" v-else>
        <ButtonAgrea @click="updateTag">Обновить</ButtonAgrea>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>