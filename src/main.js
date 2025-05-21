import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Importujte všechny komponenty stránek
import HomeView from './views/HomeView.vue'
import ProjectsView from './views/PortfolioView.vue'
import ExperienceView from './views/ExperienceView.vue'
import AboutView from './views/AboutView.vue'

// Vytvoření routeru
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { transition: 'slide-right' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: { transition: 'slide-left' }
    },
    {
      path: '/experience',
      name: 'experience',
      component: ExperienceView,
      meta: { transition: 'slide-left' }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { transition: 'slide-left' }
    }
  ]
})

// Vytvořte a připojte aplikaci
const app = createApp(App)
app.use(router)
app.mount('#app')