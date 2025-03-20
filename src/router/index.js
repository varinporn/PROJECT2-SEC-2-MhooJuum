import ConcertView from '@/views/ConcertView.vue'
import ConcertDetail from '../components/ConcertDetail.vue'
import { createRouter, createWebHistory } from 'vue-router'

const history = createWebHistory()

const routes = [
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
]
const router = createRouter({
  history,
  routes,
})
export default router
