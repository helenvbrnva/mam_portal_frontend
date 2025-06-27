<script>
import ButtonAgrea from "@/components/UI/ButtonAgrea.vue";
import EnvService from "@/store/env.service.js";

export default {
  name: "CityForm",
  components: {ButtonAgrea},
  props: {
    addMode: {
      type: Boolean,
      default: true
    },
    idCity: {
      type: String,
      default: null
    }
  },
  data(){
    return {
      city: {
        name: null,
        region: null
      },
      defaultCity: {
        name: null,
        region: null
      },
      nameRule: [
        v => !!v || 'Название не заполнена',
        v => /^[а-яА-ЯёЁ\s-]{2,20}$/.test(v) || 'Название может содержать только русские символы и длинной от 2 до 21 символа'
      ],
      regionRule: [
        v => !!v || 'Регион не заполнена',
        v => /^[а-яА-ЯёЁ\s-]{2,50}$/.test(v) || 'Регион может содержать только русские символы и длинной от 2 до 51 символа'
      ],
    }
  },
  methods: {
    getCity(){
      EnvService.getCityById(this.idCity)
          .then((city) => {
            Object.assign(this.city, city)
          })
    },
    async addCity(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.$emit("addCity", this.city)
    },
    async updateCity(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.$emit("updateCity", this.city)
    },
    clearForm(){
      Object.assign(this.city, this.defaultCity)
    }

  },
  mounted() {
    if(this.addMode === false){
      this.getCity()
    }
  }
}
</script>

<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
            type="text"
            v-model="city.name"
            label="Название *"
            variant="underlined"
            :rules="nameRule"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
            type="text"
            v-model="city.region"
            label="Регион *"
            variant="underlined"
            :rules="regionRule"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <small class="text-caption text-medium-emphasis">* - Поле обязательное</small>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" v-if="addMode">
        <ButtonAgrea @click="addCity">Сохранить</ButtonAgrea>
      </v-col>
      <v-col cols="12" md="4" v-else>
        <ButtonAgrea @click="updateCity">Обновить</ButtonAgrea>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>