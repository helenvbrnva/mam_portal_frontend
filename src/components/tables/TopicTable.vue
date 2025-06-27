<script>
import EnvService from "@/store/env.service.js";
import TypeArticleForm from "@/components/Form/TypeArticleForm.vue";

export default {
  name: "TopicTable",
  components: {TypeArticleForm},
  data(){
    return {
      headers: [
        {title: 'id', key: 'id'},
        {title: 'name', key: 'name'},
        {title: 'Описание', key: 'description'},
        {title: 'Управление', key: 'actions'}
      ],
      typeArticle: [],
      dialog: false,
      addMode: true,
      targetTypeArticle: null
    }
  },
  methods: {
    getAllTypeArticle(){
      EnvService.getAllTypeArticle().then(
          (typeArticle) => {
            this.typeArticle = typeArticle;
          }
      )
    },

    update(id){
      this.targetTypeArticle = id
      this.addMode = false
      this.$nextTick(()=>{
        this.dialog = true
      })
    },

    addTypeArticle(typeArticle){
      EnvService.addTypeArticle(typeArticle).then(() => {
        this.targetTypeArticle = null
        this.addMode = true
        this.$refs.form.clearForm()
        this.dialog = false
        this.$nextTick(()=>{
          this.getAllTypeArticle()
        })
      })
    },

    updateTypeArticle(typeArticle){
      EnvService.updateTypeArticle(this.targetTypeArticle, typeArticle).then(() => {
        this.targetTypeArticle = null
        this.addMode = true
        this.$refs.form.clearForm()
        this.dialog = false
        this.$nextTick(()=>{
          this.getAllTypeArticle()
        })
      })
    }
  },
  mounted() {
    this.getAllTypeArticle()
  }
}
</script>

<template>
  <v-card
      title="Темы статей"
      flat
  >
    <v-data-table
        :headers="headers"
        :items="typeArticle"
        hide-default-footer
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            class="me-2"
            size="small"
            @click="update(item.id)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
    <v-btn @click="dialog = true">
      Добавить
    </v-btn>
    <v-dialog
        v-model="dialog"
        width="1000px"
    >
      <v-card
          prepend-icon="mdi-update"
          title=""
          class="overflow-visible"
      >
        <v-card-text>
          <v-row>
            <v-col cols="12" md="12">
              <TypeArticleForm
                  :add-mode="addMode"
                  :id-type-article="targetTypeArticle"
                  @addTypeArticle="addTypeArticle"
                  @updateTypeArticle="updateTypeArticle"
                  ref="form"
              />
            </v-col>
          </v-row>

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<style scoped>

</style>