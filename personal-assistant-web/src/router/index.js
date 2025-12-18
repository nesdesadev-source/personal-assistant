import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import { useAuth } from '../composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { requiresGuest: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated, loadAuthFromStorage } = useAuth()
  
  loadAuthFromStorage()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'auth' })
  } else if (to.meta.requiresGuest && isAuthenticated.value) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router

