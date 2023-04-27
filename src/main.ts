import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const checkLogin = (to: any) => {
  if (useSessionStore().user_id)
    return { name: 'Error' }
  else return to
}
const routes = setupLayouts(generatedRoutes)
routes.push(
  {
    path: '/board/post/:movieId/:postId',
    component: () => import('./pages/board/post/[movieId]-[postId].vue'),
    props: route => ({
      movieId: route.params.movieId,
      postId: route.params.postId,
    }),
    meta: { layout: 'bare' },
  },
  {
    path: '/login/sso/:key1/:key2',
    component: () => import('./pages/login/sso-[key1]-[key2].vue'),
    props: route => ({
      key1: route.params.key1,
      key2: route.params.key2,
    }),
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('./pages/error.vue'),
  },
  {
    path: '/movieadd',
    component: () => import('./pages/movieadd/index.vue'),
    beforeEnter: to => checkLogin(to),
  },
  {
    path: '/board/postedit',
    component: () => import('./pages/movieadd/index.vue'),
    beforeEnter: to => checkLogin(to),
  },
)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
