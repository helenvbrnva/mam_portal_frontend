<script>
import DeleteButton from "@/components/UI/DeleteButton.vue";
import EnvService from "@/store/env.service.js";
import CityForm from "@/components/Form/CityForm.vue";

export default {
  name: "CityTable",
  components: {CityForm, DeleteButton},
  data(){
    return {
      headers: [
        {title: 'id', key: 'id'},
        {title: 'name', key: 'name'},
        {title: 'Регион', key: 'region'},
        {title: 'Управление', key: 'actions'}
      ],
      city: [],
      dialog: false,
      addMode: true,
      targetCity: null
    }
  },
  methods: {
    getAllCity(){
      EnvService.getAllCity().then(
          (city) => {
            this.city = city;
          }
      )
    },

    update(id){
      this.targetCity = id
      this.addMode = false
      this.$nextTick(()=>{
        this.dialog = true
      })
    },

    addCity(city){
      EnvService.addCity(city).then(() => {
        this.targetCity = null
        this.addMode = true
        this.$refs.form.clearForm()
        this.dialog = false
        this.$nextTick(()=>{
          this.getAllCity()
        })
      })
    },

    updateCity(city){
      EnvService.updateCity(this.targetCity, city).then(() => {
        this.targetCity = null
        this.addMode = true
        this.$refs.form.clearForm()
        this.dialog = false
        this.$nextTick(()=>{
          this.getAllCity()
        })
      })
    }
  },
  mounted() {
    this.getAllCity()
  }
}
</script>

<template>
  <v-card
      title="Город"
      flat
  >
    <v-data-table
        :headers="headers"
        :items="city"
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
              <CityForm
              :add-mode="addMode"
              :id-city="targetCity"
              @addCity="addCity"
              @updateCity="updateCity"
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