import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'


import App from './components/App.vue'
import Students from './components/Students.vue'
import StudentInfo from './components/StudentInfo.vue'
import store from './store.js'

const routes = [
    { path: '/', component: Students},
    { path: '/student-info/:id', component: StudentInfo, props: true},
]
const router = new VueRouter({
    routes
})
    
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
   render: h => h(App),
   el: '#app',
   router,
   store
})
