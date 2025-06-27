<script>
import EnvService from "@/store/env.service.js";
import ButtonAgrea from "@/components/UI/ButtonAgrea.vue";

export default {
  name: "TypeArticleForm",
  components: {ButtonAgrea},
  props: {
    addMode: {
      type: Boolean,
      default: true
    },
    idTypeArticle: {
      type: String,
      default: null
    }
  },
  data(){
    return {
      typeArticle: {
        name: null,
        description: null
      },
      defaultTypeArticle: {
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
    getTypeArticle(){
      EnvService.getTypeArticleById(this.idTypeArticle)
          .then((typeArticle) => {
            Object.assign(this.typeArticle, typeArticle)
          })
    },
    async addTypeArticle(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.$emit("addTypeArticle", this.typeArticle)
    },
    async updateTypeArticle(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.$emit("updateTypeArticle", this.typeArticle)
    },
    clearForm(){
      Object.assign(this.typeArticle, this.defaultTypeArticle)
    }

  },
  mounted() {
    if(this.addMode === false){
      this.getTypeArticle()
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
            v-model="typeArticle.name"
            label="Название *"
            variant="underlined"
            :rules="nameRule"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-textarea
            v-model="typeArticle.description"
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
        <ButtonAgrea @click="addTypeArticle">Сохранить</ButtonAgrea>
      </v-col>
      <v-col cols="12" md="4" v-else>
        <ButtonAgrea @click="updateTypeArticle">Обновить</ButtonAgrea>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>