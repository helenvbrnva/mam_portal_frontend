<script>
import EnvService from "@/store/env.service.js";

export default {
  name: "TagSelection",
  props: {
    modelValue: {
      type: Object
    },
    readonly: {
      type: Boolean,
    },
    textBtn: {
      type: String,
      default: "Выбрать теги"
    }
  },
  data: () => ({
    dialog: false,
    tags: [],

    loading: false,
    search: '',
    selected: [],

    content: {}

  }),
  computed: {
    allSelected() {
      return this.selected.length === 5
    },
  },

  watch: {
    search(){
      EnvService.searchTags(this.search)
          .then(tags => {
            this.tags = tags
          })
    }
  },
  methods: {
    open(){
      this.$nextTick(()=>{
        this.dialog = true
      })
    },

    addTag(tag){
      this.content[tag.id] = tag
      this.handleInput()
    },

    deleteTag(id){
      delete this.content[id]
      this.handleInput()
    },

    handleInput(){
      this.$emit("update:modelValue", this.content)
    },
  },
  mounted() {
    console.log(this.modelValue)
    for(let i of this.modelValue){
      console.log(i)
      this.content[i.id] = i
    }
    this.handleInput()
  }
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="500"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-row align="center" justify="start">
        <v-col cols="auto" v-if="Object.keys(content).length > 0">
          <v-chip-group>
            <v-chip v-for="item in content" :key="item.id">{{item.name}}</v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="auto">
          <v-btn
              class="text-none font-weight-regular"
              prepend-icon="mdi-engine"
              variant="tonal"
              v-bind="activatorProps"
              :disabled="readonly"
          >{{textBtn}}</v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card>
      <v-container>
        <v-row align="center" justify="start">
          <v-col
              v-for="item in this.modelValue"
              :key="item.id"
              class="py-1 pe-0"
              cols="auto"
          >
            <v-chip
                :disabled="loading"
                closable
                @click:close="deleteTag(item.id)"
            >
              {{ item.name }}
            </v-chip>
          </v-col>

          <v-col v-if="!allSelected" cols="12">
            <v-text-field
                ref="searchField"
                v-model="search"
                label="Поиск по названию"
                hide-details
                single-line
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider v-if="!allSelected"></v-divider>
        <v-row>
          <v-col cols="12" md="12">
            <v-list v-if="tags.length > 0">
              <template v-for="tag in tags" :key="tag.id">
                <v-list-item
                    :disabled="loading"
                    @click="addTag(tag)"
                >
                  <v-list-item-title v-text="`${tag.name}`"/>

                </v-list-item>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>