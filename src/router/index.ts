import { createRouter, createWebHistory } from 'vue-router'
import Chat from '@/views/Chat.vue'

const routes = [
  // ...other routes
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
