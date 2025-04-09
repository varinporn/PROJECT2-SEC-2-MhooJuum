import ConcertView from '@/views/ConcertView.vue'
import ConcertDetail from '../views/ConcertDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import UserView from '@/views/UserView.vue'
import NotFound from '@/views/NotFound.vue'

const history = createWebHistory()

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/concert',
    name: 'ConcertView',
    component: ConcertView,
  },
  {
    path: '/concert-detail/:concertId',
    name: 'ConcertDetail',
    component: ConcertDetail,
  },
  {
    path: '/user-detail',
    name: 'UserManager',
    component: UserView,
  },
  {
    path: '/:catchNotMatchPath(.*)',
    name: 'NotFound',
    component: NotFound,
  }
]
const router = createRouter({
  history,
  routes,
})
export default router
