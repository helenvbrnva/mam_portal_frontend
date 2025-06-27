<script>
import ArticleService from "@/store/article.service.js";
import moment from "moment";
import SearchArticleForm from "@/components/Form/SearchArticleForm.vue";
import LikeForm from "@/components/Form/LikeForm.vue";
import {auth as $store} from "@/store/auth.model.js";

export default {
  name: "ArticleListVue",
  components: {LikeForm, SearchArticleForm},
  props: {
    byUser: false
  },
  data(){
    return{
      article: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 20,
      loading: false,
      search: "",
      totalItems: 0,

      tags: [],
      topic: null,

      userType: $store.state.user.type.name || null,
      userUuid: $store.state.user.uuid || null,
    }
  },
  methods: {
    autor(user){
      if(user.surname === null)
        return "Администратор"
      return `${user.surname} ${user.name[0]}. ${user.patronymic[0]}.`
    },
    datePublication(date){
      let dateNew = new Date(date)
      return moment(dateNew).format('DD.MM.YYYY HH:mm')
    },
    loadItem(){
      this.loading = true
      if(this.search.length === 0){
        ArticleService.getPageArticle(this.page, this.tags, this.topic).then(
            response => {
              this.article = response.data
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"])
              this.itemsPerPage = parseInt(response.headers["x-count-item"])
              this.pageCount = parseInt(response.headers["x-count-page"])
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }else{
        ArticleService.searchArticle(this.search).then(
            response => {
              this.article = response.data
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }
    },
    loadItemByUser(){
      this.loading = true
      if(this.search.length === 0){
        ArticleService.getPageArticleByUser(this.page, this.tags, this.topic).then(
            response => {
              this.article = response.data
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"])
              this.itemsPerPage = parseInt(response.headers["x-count-item"])
              this.pageCount = parseInt(response.headers["x-count-page"])
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }else{
        ArticleService.searchArticle(this.search).then(
            response => {
              this.article = response.data
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }
    },

    searchFunct(data){
      this.topic = data.selectedTopic
      this.tags = data.selectedTags
      this.search = data.searchQuery

      if(!this.byUser)
        this.loadItem()
      else
        this.loadItemByUser()
    },
    resetInfo(){
      this.topic = null
      this.tags = []
      this.search = ""

      if(!this.byUser)
        this.loadItem()
      else
        this.loadItemByUser()
    },
    timeAgo(dateString) {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now - date
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

      if (diffDays < 7) {
        return `${diffDays} ${this.getPlural(diffDays, 'день', 'дня', 'дней')} назад`
      }

      const diffWeeks = Math.floor(diffDays / 7)
      if (diffWeeks < 5) {
        return `${diffWeeks} ${this.getPlural(diffWeeks, 'неделя', 'недели', 'недель')} назад`
      }

      const diffMonths = Math.floor(diffDays / 30)
      if (diffMonths < 12) {
        return `${diffMonths} ${this.getPlural(diffMonths, 'месяц', 'месяца', 'месяцев')} назад`
      }

      const diffYears = Math.floor(diffDays / 365)
      return `${diffYears} ${this.getPlural(diffYears, 'год', 'года', 'лет')} назад`
    },
    getPlural(n, one, few, many) {
      const mod10 = n % 10
      const mod100 = n % 100
      if (mod10 === 1 && mod100 !== 11) return one
      if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return few
      return many
    }
  },
  watch: {
    page(){
      if(!this.byUser)
        this.loadItem()
      else
        this.loadItemByUser()
    }
  },
  mounted() {
    if(!this.byUser)
      this.loadItem()
    else
      this.loadItemByUser()
  }
}
</script>

<template>
  <SearchArticleForm @search="searchFunct" @reset="resetInfo"/>
  <v-container class="my-6" fluid>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-row>
          <v-col
              v-for="item in article"
              :key="item.uuid"
              cols="12"
              md="6"
              lg="4"
          >
            <v-card
                class="pa-4 mb-6 rounded-xl d-flex flex-column justify-space-between"
                :style="`background: linear-gradient(135deg, #fff6f3, #fefaf6);`"
                elevation="1"
                height="100%"
            >
              <!-- Иконка лайка -->
              <like-form
                  :uuid-user="userUuid"
                  :uuid-article="item.uuid"
                  :user-type="userType"
              />

              <!-- Заголовок -->
              <div class="text-subtitle-1 font-weight-bold mb-2 title-case" style="line-height: 1.3;">
                <span class="title-case">{{ item.name }}</span>
              </div>

              <!-- Описание (с обрезкой) -->
              <div
                  class="text-body-2 text-grey-darken-2 mb-3 clamp-3"
              >
                {{ item.description_lite }}
              </div>

              <!-- Автор -->
              <div class="text-caption text-grey-darken-1 mb-1">
                Автор: {{ item.autor.surname || 'admin' }}, {{ timeAgo(item.date_publications) }}
              </div>

              <!-- Теги -->
              <div class="text-caption text-grey-lighten-1 mb-3">
            <span v-for="tag in item.tags" :key="tag.id" class="me-2">
              #{{ tag.name }}
            </span>
              </div>

              <!-- Комментировать и Подробнее -->
              <div class="d-flex justify-space-between align-center">

                <v-btn
                    variant="text"
                    size="small"
                    class="text-none text-caption custom-hover-btn"
                    @click="this.$router.push(`/article/vue/${item.uuid}`)"
                >
                  Читать
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

      <v-row justify="center">
        <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="itemsPerPage"
            color="primary"
        ></v-pagination>
      </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-h6 {
  font-weight: bold;
}
.article-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.article-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.custom-hover-btn {
  border: 1px solid #3B3B3B;
  transition: 0.2s;
}
.title-case {
  text-transform: capitalize;
}
</style>