import { createApp } from "vue";
import BootstrapVue3 from 'bootstrap-vue-3';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(fas);


  
const app = createApp(App)
app.use(axios)
app.use(router)
app.use(store)
app.use(BootstrapVue3)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#app");