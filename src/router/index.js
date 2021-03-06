import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VueGtag from "vue-gtag";
 
Vue.use(VueGtag, {
  config: { id: "G-G691BZ3LEV" }
}, router);
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/matches',
    name: 'matches',
    component: () => import('../views/Matches.vue')
  },
  {
    path: '/match/:matchId',
    name: 'match',
    component: () => import('../views/Match.vue')
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('../views/Terms.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router