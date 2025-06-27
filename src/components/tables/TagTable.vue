<script>
import EnvService from "@/store/env.service.js";
import TypeArticleForm from "@/components/Form/TypeArticleForm.vue";
import TagForm from "@/components/Form/TagForm.vue";

export default {
  name: "TagTable",
  components: {TagForm, TypeArticleForm},
  data(){
    return {
      headers: [
        {title: 'id', key: 'id'},
        {title: 'name', key: 'name'},
        {title: 'Описание', key: 'description'},
        {title: 'Управление', key: 'actions'}
      ],
      tag: [],
      dialog: false,
      addMode: true,
      targetTag: null
    }
  },
  methods: {
    getAllTag(){
      EnvService.getAllTag().then(
          (tag) => {
            this.tag = tag;
          }
      )
    },

    update(id){
      this.targetTag = id
      this.addMode = false
      this.$nextTick(()=>{
        this.dialog = true
      })
    },

    addTag(tag){
      EnvService.addTag(tag).then(() => {
        this.targetTag = null
        this.addMode = true
        this.$refs.form.clearForm()
        this.dialog = false
        this.$nextTick(()=>{
          this.getAllTag()
        })
      })
    },

    updateTag(tag){
      EnvService.updateTag(this.targetTag, tag).then(() => {
        this.targetTag = null
        this.addMode = true
        this.$refs.form.clearForm()
        this.dialog = false
        this.$nextTick(()=>{
          this.getAllTag()
        })
      })
    }
  },
  mounted() {
    this.getAllTag()
  }
}
</script>

<template>
  <v-card
      title="Тэги"
      flat
  >
    <v-data-table
        :headers="headers"
        :items="tag"
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
              <TagForm
                  :add-mode="addMode"
                  :id-tag="targetTag"
                  @addTag="addTag"
                  @updateTag="updateTag"
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