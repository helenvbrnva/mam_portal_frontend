<script>
import ArticleService from "@/store/article.service.js";

export default {
  name: "CommentForm",
  props: {
    uuidUser: {
      type: Object,
      default: null
    },
    uuidArticle: {
      type: Object,
      default: null
    },
    userType: {
      type: Object,
      default: null
    }
  },
  data(){
    return{
      comments: [],
      comment: {
        content: ""
      },
      snackbar: false,
      message: "",
      commentRule: [
        v => (!v || v.length <= 500) || 'Коментарий не может быть болше 500 симворлов'
      ],
    }
  },
  methods: {
    loadComment(){
      ArticleService.getCommentary(this.uuidArticle).then((comment) => {
        this.comments = comment
      })
    },
    deleteComment(uuid){
      ArticleService.deleteComment(uuid).then(() => {
        this.loadComment()
      })
    },
    async addComment(){
      const valid = await this.$refs.form.validate()
      if(valid.valid){
        ArticleService.addComment(this.uuidArticle, this.comment).then(() => {
          this.loadComment()
          this.comment.content = ""
        })
      }
    },
    nameConvert(user){
      if(user.surname === null)
        return "Неизвестен"
      return `${user.surname} ${user.name[0]}. ${user.patronymic[0]}.`
    }
  },
  mounted() {
    this.loadComment()
  }
}
</script>

<template>
  <v-card flat class="pa-2 mb-6">
    <v-card-title>
      <h2 class="text-h5">Комментарии</h2>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-if="userType !== null">
        <v-textarea
            v-model="comment.content"
            variant="underlined"
            label="Напишите комментарий"
            auto-grow
            class="mt-4"
            :rules="commentRule"
        />
        <v-btn  color="pink" class="mt-2" @click="addComment">Опубликовать</v-btn>
      </v-form>
      <v-list>
        <v-list-item
            v-for="com in comments"
            :key="com.uuid"
            :subtitle="nameConvert(com.user)"
            :title="com.content"
        >
          <template v-slot:prepend>
            <v-avatar>
              <img :src="com.user.icon" alt="avatar" cover height="100%"/>
            </v-avatar>
          </template>

          <template v-slot:append v-if="userType === 'admin'">
            <v-btn
                color="red"
                icon="mdi-delete"
                variant="text"
                @click="deleteComment(com.uuid)"
            ></v-btn>
          </template>
        </v-list-item>

      </v-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>