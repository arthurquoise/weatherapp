import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Main from '../views/Main.vue'
import Bookmarks from '../views/Bookmarks.vue'
import BookmarkedElement from '../views/BookmarkedElement.vue'
import Search from '../views/Search.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/Bookmarks',
    name: 'Bookmarks',
    component: Bookmarks
  },
  {
    path: '/BookmarkedElement',
    name: 'BookmarkedElement',
    component: BookmarkedElement
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
