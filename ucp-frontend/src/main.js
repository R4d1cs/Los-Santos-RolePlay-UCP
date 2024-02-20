import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Views, Components Imports for vue-router
import PageNotFoundView from '@/Views/PageNotFound'
import NewsView from '@/Views/News'

import LoginComponent from '@/Components/Login'

const webPrefix = 'Los Santos RolePlay'
const routes = [
  {
    path: '/news',
    component: NewsView,
    meta: { tabTitle: 'Hírek' }
  },
  {
    path: '/login',
    component: LoginComponent,
    meta: { tabTitle: 'Bejelentkezés' }
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFoundView,
    meta: { tabTitle: `Karbantartás alatt!` }
  }
]

const Router = createRouter({ history: createWebHistory(), routes })
const Application = createApp(App)

Router
.beforeEach(( toPage, fromPage, nextFunc ) => {
    document.title = `${ webPrefix } - ${ toPage['meta']['tabTitle'] }`
    nextFunc()
})

Application
.use(Router)
.mount('#app')
