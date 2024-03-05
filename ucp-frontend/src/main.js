import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'

// Views, Components Imports for vue-router
import PageNotFoundView from '@/Views/PageNotFound'
import NewsView from '@/Views/News'
import RulesView from '@/Views/Rules'
import DiscordView from '@/Views/Discord'

import LoginComponent from '@/Components/Login'
import RegisterComponent from '@/Components/Register'

const webPrefix = 'Los Santos RolePlay'
const routes = [
  {
    path: '/news',
    alias: ['/'],
    component: NewsView,
    meta: { tabTitle: 'Hírek' }
  },
  {
    path: '/login',
    component: LoginComponent,
    meta: { tabTitle: 'Bejelentkezés' }
  },
  {
    path: '/register',
    component: RegisterComponent,
    meta: { tabTitle: 'Regisztráció' }
  },
  {
    path: '/rules',
    component: RulesView,
    meta: { tabTitle: 'Szabályzat' }
  },
  {
    path: '/discord',
    component: DiscordView,
    meta: { tabTitle: 'Discord Csatlakozás' }
  },
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFoundView,
    meta: { tabTitle: `Karbantartás alatt!` }
  }
]

const Router = createRouter({ history: createWebHistory(), routes })
const Application = createApp(App)
const Pinia = createPinia()

Router
.beforeEach(( toPage, fromPage, nextFunc ) => {
    document.title = `${ webPrefix } - ${ toPage['meta']['tabTitle'] }`
    nextFunc()
})

Application
.use(Router)
.use(Pinia)
.mount('#app')
