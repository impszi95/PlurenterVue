import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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
    path: '/matchView/:matchId',
    name: 'matchView',
    component: () => import('../views/MatchView.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router