import {createApp} from 'vue';
import App from './AppView.vue';
//import {Router} from 'vue-router';
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  './css/w3.css'
//import VeeValidate from 'vee-validate';
//import { library } from '@fortawesome/fontawesome-svg-core';
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/*import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';*/

//library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);




//Vue.component('font-awesome-icon', FontAwesomeIcon);
const app=createApp(App)
app.use(router)
app.use(store)
//app.use(VeeValidate);

app.config.productionTip = false;
app.mount('#app')
/*new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app'); 
*/