<script>
import ArticleListVue from "@/components/UI/ArticleLIstVue.vue";

export default {
  name: "ArticleUserProfilePage",
  components: {ArticleListVue}
}
</script>

<template>
  <article-list-vue :by-user="true"/>
</template>

<style scoped>

</style>