<script>
import ArticleService from "@/store/article.service.js";
import ArticleForm from "@/components/Form/ArticleForm.vue";
import UserForm from "@/components/Form/UserForm.vue";

export default {
  name: "EditArticleAdminPage",
  components: {UserForm, ArticleForm},
  data(){
    return {
      uuidArticle: this.$route.params.uuid,
      addMode: (this.$route.params.uuid === undefined),
      error: null
    }
  },
  methods: {
    addArticle(article){
      ArticleService.addArticle(article)
          .then(() => {
            this.$router.push(`/admin/article/`)
          })
          .catch((response) => {
            this.error = response.data.message
          })

    },
    updateArticle(article){
      ArticleService.updateArticle(this.uuidArticle, article)
          .then(() => {
            this.$router.push(`/admin/article/`)
          })
          .catch((response) => {
            this.error = response.data.message
          })

    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <v-alert
            density="compact"
            :text="error"
            title="Ошибка"
            type="warning"
            v-if="error !== null"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <ArticleForm
            :add-mode="addMode"
            :uuid-article="uuidArticle"
            @addArticle="addArticle"
            @updateArticle="updateArticle"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>