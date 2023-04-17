import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'

import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)
routes.push(
  {
    path: '/board/post/:movieId/:postId',
    name: 'postindex',
    component: () => import('./pages/board/post/[movieId]-[postId].vue'),
    props: route => ({
      movieId: route.params.movieId,
      postId: route.params.postId,
    }),
  },
  {
    path: '/login/sso/:userId',
    name: 'sso',
    component: () => import('./pages/login/sso-[userId].vue'),
    props: route => ({
      userId: route.params.userId,
    }),
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
