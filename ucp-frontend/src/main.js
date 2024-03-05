// Default vue imports
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Views, Components Imports for vue-router
import PageNotFoundView from '@/Views/PageNotFound'
import NewsView from '@/Views/News'
import RulesView from '@/Views/Rules'
import DiscordView from '@/Views/Discord'

import LoginComponent from '@/Components/Login'
import RegisterComponent from '@/Components/Register'

// Variables
const webPrefix = 'Los Santos RolePlay'

// URL routes
const routes = [
  {
    path: '/news',
    alias: ['/'],
    component: NewsView,
    meta: { tabTitle: 'Hírek' }
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
  }
]

// Declarations
const Router = createRouter({ history: createWebHistory(), routes })
const Application = createApp(App)
const Pinia = createPinia()

Pinia
.use(piniaPluginPersistedstate)

Router
.beforeEach(( toPage, fromPage, nextFunc ) => {
    document.title = `${ webPrefix } - ${ toPage['meta']['tabTitle'] }`
    nextFunc()
})

Application
.use(Router)
.use(Pinia)
.mount('#app')
