import { createRouter, createWebHistory } from 'vue-router'
import LaunchView from '../views/LaunchView.vue';
import SavedView from '../views/SavedView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LaunchList',
      component: LaunchView
    },
    {
      path: '/savedLaunches',
      name: 'SavedList',
      component: SavedView
    }
  ]
})

export default router

