// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap'; // Importar el archivo JavaScript de Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App.vue'
import Character from './components/CharacterPage.vue'
import MainView from './components/MainView.vue'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(IconsPlugin)

const routes = [
  {
    path: '/', component: MainView
  }, {
    path: '/:id', component: Character
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: function(createElement){
    return createElement(App)
}
}).$mount('#app')

