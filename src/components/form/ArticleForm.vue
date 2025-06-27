<script>
import ButtonAgrea from "@/components/UI/ButtonAgrea.vue";
import TextEditor from "@/components/UI/TextEditor.vue";
import TagSelection from "@/components/UI/TagSelection.vue";
import EnvService from "@/store/env.service.js";
import ArticleService from "@/store/article.service.js";

export default {
  name: "ArticleForm",
  components: {TagSelection, TextEditor, ButtonAgrea},
  props: {
    addMode: {
      type: Boolean,
      default: true
    },
    uuidArticle: {
      type: String,
      default: null
    }
  },
  data(){
    return{
      article: {
        name: null,
        description: "",
        id_type: 1,
        tags: [],
        description_lite: "",
      },
      listTypeArticle: [],
      snackbar: false,
      message: null,

      nameRule: [
        v => !!v || 'Название не заполнена',
        v => (v.length > 5 && v.length <= 90) || 'Название может быть длинной от 5 до 90 символа'
      ],

      loader: false
    }
  },
  methods: {
    loadType(){
      EnvService.getAllTypeArticle()
          .then((typeArticle) => {
            this.listTypeArticle = typeArticle
          })
    },
    getArticle(){
      ArticleService.getArticleByUuid(this.uuidArticle)
          .then((article) => {
            Object.assign(this.article, article)
            this.loader = true
            this.$nextTick(() => {
              this.$refs.description.val(article.description)
            })
          })
    },

    async addArticle(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.article.tags = Object.keys(this.article.tags)
        this.$emit("addArticle", this.article)
    },
    async updateArticle(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.article.tags = Object.keys(this.article.tags)
        this.$emit("updateArticle", this.article)
    },
  },
  mounted() {
    this.loadType()
    if(this.addMode === false){
      this.getArticle()
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
            v-model="article.name"
            label="Название *"
            variant="underlined"
            :rules="nameRule"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-select
            label="Тема статьи *"
            :items="listTypeArticle"
            item-title="name"
            item-value="id"
            variant="underlined"
            v-model="article.id_type"
        />
      </v-col>
      <v-col>
        <tag-selection
            v-model="article.tags"
            :text-btn="'Выбрать тэги *'"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-textarea
            :placeholder="'Краткое содержание *'"
            v-model="article.description_lite"
        />
      </v-col>
      <v-col cols="12" md="12">
        <TextEditor
            :placeholder="'Содержание *'"
            v-model="article.description"
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
        <ButtonAgrea @click="addArticle">Опубликовать</ButtonAgrea>
      </v-col>
      <v-col cols="12" md="4" v-else>
        <ButtonAgrea @click="updateArticle">Обновить</ButtonAgrea>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>