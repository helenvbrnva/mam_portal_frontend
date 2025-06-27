<script>
import FixedButton from "@/components/UI/FixedButton.vue";
import ArticleTable from "@/components/Tabels/ArticleTable.vue";
import ArticleService from "@/store/article.service.js";

export default {
  name: "VueArticleAdminPage",
  components: {ArticleTable, FixedButton},
  data(){
    return {
      snackbar: false,
      error: ""
    }
  },
  methods: {
    addArticle(){
      this.$router.push(`/admin/article/add`)
    },
    deleteArticle(uuid){
      ArticleService.deleteArticle(uuid)
          .then(()=>{
            this.message = "Статья удаленa"
            this.snackbar = true
            this.$refs.articleTable.loadItem(1)
          })
    },
    updateArticle(uuid){
      this.$router.push(`/admin/article/edit/${uuid}`)
    },
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <ArticleTable
            ref="articleTable"
          @updateArticle="updateArticle"
          @deleteArticle="deleteArticle"
        />
      </v-col>
    </v-row>
  </v-container>
  <FixedButton @click="addArticle"/>
</template>

<style scoped>

</style>