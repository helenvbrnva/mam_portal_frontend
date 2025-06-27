<script>
import ArticleService from "@/store/article.service.js";

export default {
  name: "LikeForm",
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
      countLike: 0,
      isUserLike: false,
      snackbar: false,
      message: ""
    }
  },
  methods: {
    getInfoLike(){
      let userUuid = this.uuidUser
      if(this.userType === null)
        userUuid = "no"

      ArticleService.getLikeInfo(this.uuidArticle, userUuid).then((info) => {
        this.countLike = info.count
        this.isUserLike = info.youLike
      })
    },
    addLike(){
      if(this.userType !== null){
        ArticleService.addLike(this.uuidArticle).then((info) => {
          this.getInfoLike()
        })
      }else{
        this.snackbar = true
        this.message = "Для того что бы поставить лайк, необхдимо зарегистрироваться"
      }
    },
    removeLike(){
      ArticleService.deleteLike(this.uuidArticle).then((info) => {
        this.getInfoLike()
      })
    }
  },
  computed: {
    likeColor(){
      if(this.isUserLike)
        return "red"
      return "grey-lighten-1"
    }
  },
  mounted() {
    this.getInfoLike()
  }
}
</script>

<template>
  <!--<v-snackbar
      :timeout="4000"
      v-model="snackbar"
  >
    {{message}}
  </v-snackbar>
  <v-card flat class="pa-4 mb-6">
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <div class="text-body-1">
            <strong>{{countLike}}</strong>
            <v-btn
                v-if="this.isUserLike"
                color="red"
                icon="mdi-heart"
                variant="text"
                @click="removeLike"
            ></v-btn>
            <v-btn
                v-else
                color="grey-lighten-1"
                icon="mdi-heart"
                variant="text"
                @click="addLike"
            ></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>-->
  <v-snackbar
      v-model="snackbar"
      :timeout="4000"
  >
    {{ message }}
  </v-snackbar>
  <div class="like-container">
    <v-btn
        :icon="isUserLike ? 'mdi-heart' : 'mdi-heart-outline'"
        :color="isUserLike ? 'red' : 'grey-lighten-1'"
        variant="text"
        class="like-button"
        @click="isUserLike ? removeLike() : addLike()"
    ></v-btn>
  </div>
</template>
<style scoped>
.like-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}
</style>