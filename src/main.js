import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router";
import './axios'
import store from "@/store";
import '@/assets/styles.css'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const vuetify = createVuetify({
    components: {
        ...components,
    },
    directives,
    icons: {
        defaultSet: 'mdi',
    },

})


const app = createApp(App)

app.component('VueDatePicker', VueDatePicker);

app.use(router).use(store).use(VCalendar, {}).use(vuetify).mount('#app')