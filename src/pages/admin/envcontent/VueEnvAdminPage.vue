<script>
import CityTable from "@/components/Tabels/CityTable.vue";
import TopicTable from "@/components/Tabels/TopicTable.vue";
import TagTable from "@/components/Tabels/TagTable.vue";

export default {
  name: "VueEnvAdminPage",
  components: {TagTable, TopicTable, CityTable},
  data(){
    return{
      tab: null,
    }
  }
}
</script>

<template>
  <v-container>
    <v-tabs
        v-model="tab"
        align-tabs="center"
        color="deep-purple-accent-4"
    >
      <v-tab value="city">Города</v-tab>
      <v-tab value="type_article">Типы статей</v-tab>
      <v-tab value="tag">Теги</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab" class="overflow-visible">
      <v-tabs-window-item value="city">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <CityTable/>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="tag">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <TagTable/>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="type_article">
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <TopicTable/>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<style scoped>

</style>