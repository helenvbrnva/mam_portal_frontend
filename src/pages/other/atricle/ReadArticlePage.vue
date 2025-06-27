<script>
import {auth as $store} from "@/store/auth.model.js";
import ArticleService from "@/store/article.service.js";
import moment from "moment/moment.js";
import LikeForm from "@/components/Form/LikeForm.vue";
import CommentForm from "@/components/Form/CommentForm.vue";

export default {
  name: "ReadArticlePage",
  components: {CommentForm, LikeForm},
  data(){
    return {
      uuidArticle: this.$route.params.uuid,
      error: null,
      userType: $store.state.user.type.name || null,
      userUuid: $store.state.user.uuid || null,
      isLoad: false,
      article: null,
    }
  },
  methods: {
    loadArticle(){
      ArticleService.getArticleByUuid(this.uuidArticle).then((article) => {
        this.article = article
        this.isLoad = true
      })
    }
  },
  mounted() {
    this.loadArticle()
  },
  computed:{
    autor(){
      if(this.article.autor.surname === null)
        return "Администратор"
      return `${this.article.autor.surname} ${this.article.autor.name[0]}. ${this.article.autor.patronymic[0]}.`
    },
    date_publication(){
      let dateNew = new Date(this.article.date_publications)
      return moment(dateNew).format('DD.MM.YYYY HH:mm')
    }
  }
}
</script>

<template>
  <!--<v-container class="my-6" v-if="isLoad">
    <v-row>
      <v-col cols="12" md="3">
        <v-card flat class="pa-4 mb-6">
          <v-card-title>
            <h2 class="text-h6">Рекомендуемые статьи</h2>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(article, index) in recommendedArticles" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ article.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="9">
        <v-card flat class="pa-4 mb-6">
          <v-card-title>
            <h1 class="text-h4">{{article.name}}</h1>
          </v-card-title>
          <v-card-subtitle>
            <div class="text-body-1">
              Автор: <strong>{{autor}}</strong> | Дата публикации: <strong>{{date_publication}}</strong>
            </div>
          </v-card-subtitle>
        </v-card>
        <v-card flat class="pa-4 mb-6">
          <v-card-text>
            <div class="text-body-1">
              <strong>Основная тема:</strong> {{article.type.name}}
            </div>
            <div class="text-body-1 mt-2">
              <v-chip-group>
                <v-chip v-for="tag in article.tags" :key="tag.id">{{tag.name}}</v-chip>
              </v-chip-group>
            </div>
          </v-card-text>
        </v-card>

        <v-card flat class="pa-4 mb-6">
          <v-card-text>
            <div class="text-body-1" v-html="article.description">
            </div>
          </v-card-text>
        </v-card>

        <like-form
            :uuid-user="userUuid"
            :uuid-article="uuidArticle"
            :user-type="userType"
        />
        <comment-form
            :uuid-user="userUuid"
            :uuid-article="uuidArticle"
            :user-type="userType"
        />
      </v-col>
    </v-row>
  </v-container>-->
  <v-container class="my-6" v-if="isLoad">
    <v-row>
      <v-col cols="12">
        <!-- Заголовок статьи -->
        <v-sheet
            class="pa-6 mb-6 rounded-lg"
            color="white"
            style="position: relative;"
        >
          <like-form
              :uuid-user="userUuid"
              :uuid-article="uuidArticle"
              :user-type="userType"
          />
          <h1 class="text-h4 mb-2 text-black">{{ article.name }}</h1>
          <div class="text-body-1 mb-4 text-black">
            Автор: <strong>{{ autor }}</strong> | Дата публикации: <strong>{{ date_publication }}</strong>
          </div>

          <div class="text-body-1 mb-3 text-black">
            <strong>Основная тема:</strong> {{ article.type.name }}
          </div>

          <div class="mt-2 mb-4">
            <v-chip-group>
              <v-chip
                  v-for="tag in article.tags"
                  :key="tag.id"
                  variant="outlined"
                  color="primary"
                  class="ma-1"
              >
                {{ tag.name }}
              </v-chip>
            </v-chip-group>
          </div>

          <div class="text-body-1 text-black" v-html="article.description"></div>
        </v-sheet>

        <comment-form
            :uuid-user="userUuid"
            :uuid-article="uuidArticle"
            :user-type="userType"
        />
      </v-col>
    </v-row>
  </v-container>


</template>

<style scoped>

</style>