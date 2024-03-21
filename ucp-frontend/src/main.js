// Default vue imports
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';

// Views, Components Imports for vue-router
import PageNotFoundView from '@/Views/PageNotFound.vue';
import NewsView from '@/Views/News.vue';
import RulesView from '@/Views/Rules.vue';
import DiscordView from '@/Views/Discord.vue';

import LoginComponent from '@/Components/Login.vue';
import RegisterComponent from '@/Components/Register.vue';

// Variables
const webPrefix = 'Los Santos RolePlay';
const serverURL = 'http://localhost:3000/API';

// URL routes
const routes = [
  { path: '/news', alias: ['/', '/home'], component: NewsView, meta: { tabTitle: 'Hírek' } },
  { path: '/rules', component: RulesView, meta: { tabTitle: 'Szabályzat' } },
  { path: '/discord', component: DiscordView, meta: { tabTitle: 'Discord Csatlakozás' } },
  { path: '/login', component: LoginComponent, meta: { tabTitle: 'Bejelentkezés' } },
  { path: '/register', component: RegisterComponent, meta: { tabTitle: 'Regisztráció' } },
  { path: '/:pathMatch(.*)*', component: PageNotFoundView, meta: { tabTitle: 'Karbantartás alatt!' } }
];

// Declarations
const router = createRouter({ history: createWebHistory(), routes });
const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

router.beforeEach((to, from, next) => {
  document.title = `${webPrefix} - ${to.meta.tabTitle}`;
  next();
});

app
  .use(router)
  .use(pinia)
  .mount('#app');

export { serverURL };