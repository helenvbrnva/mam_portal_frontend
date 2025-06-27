<script>
import EnvService from "@/store/env.service.js";

export default {
  name: "SearchArticleForm",
  data(){
    return{
      searchQuery: "",
      selectedTags: [],
      selectedTopic: null,

      tags: [],
      topics: []
    }
  },
  methods: {
    loadTags(){
      EnvService.getAllTag().then(tags => {
        this.tags = tags;
      })
    },
    loadTopic(){
      EnvService.getAllTypeArticle().then( (topic) => {
        this.topics = topic
      })
    },
    applyFilters(){
      this.$emit('search', {
        searchQuery: this.searchQuery,
        selectedTags: this.selectedTags,
        selectedTopic: this.selectedTopic,
      })
    },
    resetFilters(){
      this.searchQuery = ""
      this.selectedTags = []
      this.selectedTopic = null
      this.$emit('reset')
    }
  },
  mounted() {
    this.loadTopic()
    this.loadTags()
  }
}
</script>

<template>
  <v-container class="py-4" fluid >
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-6 rounded-xl" elevation="0">
          <div class="text-h5 font-weight-bold mb-1 nauryz_redkeds">
            Поиск
          </div>
          <div class="text-subtitle-2 text-grey-darken-1 mb-4">
            Найдите интересные статьи, отфильтровав по тегу или теме.
          </div>

          <!-- Теги -->
          <v-row class="mb-4" no-gutters>
            <v-col cols="12">
              <v-chip-group multiple column class="flex-wrap">
                <v-chip
                    v-for="tag in tags"
                    :key="tag"
                    class="ma-1"
                    :color="selectedTags.includes(tag.id) ? 'orange-lighten-2' : ''"
                    variant="outlined"
                    @click="toggleTag(tag)"
                >
                  #{{ tag.name }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>

          <!-- Поля и кнопки -->
          <v-row class="ga-4 align-center">
            <v-col cols="12" sm="4" md="3">
              <v-select
                  v-model="selectedTopic"
                  :items="topics"
                  item-title="name"
                  item-value="id"
                  variant="outlined"
                  label="Выберите тему"
                  hide-details
                  dense
              ></v-select>
            </v-col>

            <v-col cols="12" sm="4" md="6">
              <v-text-field
                  v-model="searchQuery"
                  label="Поиск по названию"
                  variant="underlined"
                  dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="4" md="2" class="d-flex align-center">
              <v-btn
                  color="pink"
                  variant="outlined"
                  class="rounded-lg me-2"
                  prepend-icon="mdi-magnify"
                  @click="applyFilters"
              >
                Поиск
              </v-btn>
              <v-btn variant="plain" color="grey" @click="resetFilters">
                Сбросить
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.nauryz_redkeds{
  font-family: 'NauryzRedkeds';
}
</style>