<script>
import {QuillEditor} from "@vueup/vue-quill";
import BlotFormatter from 'quill-blot-formatter';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: "TextEditor",
  components: {QuillEditor},
  props: {
    placeholder: {
      type: String
    }
  },
  data(){
    return{
      modules: {
        name: 'blotFormatter',
        module: BlotFormatter,
        options: {/* options */}
      },
      content: ""
    }
  },
  methods: {
    val(content){
      this.$refs.edit.setContents(content)
    },
    onChange(){
      this.$emit('update:modelValue', this.$refs.edit.getContents())
    }
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="9" style="padding-bottom: 50px;">
      <h1>{{placeholder}}</h1>
      <quill-editor
          style="height:300px; "
          theme="snow"
          toolbar="full"
          :modules="modules"
          @text-change="onChange"
          v-model:content="content"
          content-type="html"
          ref="edit"
      />
    </v-col>
  </v-row>
</template>

<style scoped>
.ql-container{
  min-height: inherit;
}
</style>