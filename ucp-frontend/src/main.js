import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Views Imports for vue-router
import PageNotFoundView from '@/Views/PageNotFound'

const webPrefix = 'Los Santos RolePlay'
const routes = [
  {
    path: '/:pathMatch(.*)*',
    component: PageNotFoundView,
    meta: { title: `${webPrefix} - Karbantartás alatt!` }
  }
]

const Router = createRouter({ history: createWebHistory(), routes })
const Application = createApp(App)

Router
.beforeEach(( toPage, fromPage, nextFunc ) => {
    document.title = toPage['meta']['title']
    nextFunc()
})

Application
.use(Router)
.mount('#app')
