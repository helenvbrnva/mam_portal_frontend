<script>
import UserService from "@/store/user.service.js";
import moment from "moment";
import ArticleService from "@/store/article.service.js";
import DeleteButton from "@/components/UI/DeleteButton.vue";

export default {
  name: "ArticleTable",
  components: {DeleteButton},
  data(){
    return{
      itemsPerPage: 20,
      headers: [
        { title: 'Название', align: 'start', sortable: false, key: 'name',  value: item => {
            if(item.name !== null)
              return item.name
            return "Нет"
          }
        },
        { title: 'Автор', key: 'autor', align: 'start', value: item => {
            if(item.autor.surname === null)
              return "Администратор"
            return `${item.autor.surname} ${item.autor.name[0]}. ${item.autor.patronymic[0]}.`
          }
        },
        { title: 'Дата публикации', key: 'date_publications', align: 'start', value: item => {
            let dateNew = new Date(item.date_publications)
            return moment(dateNew).format('DD.MM.YYYY HH:mm')
          }
        },
        { title: 'Тема', key: 'type', align: 'start', value: item => `${item.type.name}` },
        { title: 'Тэги', key: 'tags', align: 'start', value: item =>
          {
            return item.tags.map(tag => tag.name).join(", ")
          }
        },
        { title: 'Действия', key: "actions", align: 'center' }
      ],
      article: [],
      totalItems: 0,
      loading: true,
      search: '',
    }
  },
  methods: {
    loadItem({page}){
      this.loading = true
      if(this.search.length === 0){
        ArticleService.getPageArticle(page).then(
            response => {
              this.article = response.data
              console.log(this.article)
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"])
              this.itemsPerPage = parseInt(response.headers["x-count-item"])
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
    updateArticle(uuid){
      this.$emit("updateArticle", uuid)
    },
    deleteArticle(uuid){
      this.$emit("deleteArticle", uuid)
    },
    infoArticle(uuid){
      this.$router.push(`/article/vue/${uuid}`)
    },
  },
  watch: {
    search(){
      this.loadItem(1)

    }
  }
}
</script>

<template>
  <v-card
      title="Статьи"
      flat
  >
    <template v-slot:text>
      <v-text-field
          v-model="search"
          label="Поиск"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
      ></v-text-field>
    </template>

    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="article"
        :items-length="totalItems"
        :loading="loading"
        item-value="uuid"
        @update:options="loadItem"
        :items-per-page-options="[
          {value: -1, title: '$vuetify.dataFooter.itemsPerPageAll'}
      ]"
        :items-per-page-text="'Количество элементов'"
        :loading-text="'Закгрузка данных'"
        :no-data-text="'Данных не обнаружено'"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <delete-button
            @agree="deleteArticle(item.uuid)"
        />
        <v-icon
            class="me-2"
            size="small"
            @click="updateArticle(item.uuid)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            class="me-2"
            size="small"
            @click="infoArticle(item.uuid)"
        >
          mdi-information
        </v-icon>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style scoped>

</style>