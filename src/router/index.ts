import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import CapsuleListView from '@/views/CapsuleListView.vue'
import CapsuleCreateView from '@/views/CapsuleCreateView.vue'
import CapsuleDetailView from '@/views/CapsuleDetailView.vue'
import CapsuleEditView from '@/views/CapsuleEditView.vue'
import SignupView from '@/views/SignupView.vue'
import { useAuthStore } from '@/stores/auth'
import MeView from '@/views/MeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/capsules',
      component: CapsuleListView,
    },
    {
      path: '/capsules/create',
      component: CapsuleCreateView,
    },
    {
      path: '/capsules/:capsuleId',
      component: CapsuleDetailView,
    },
    {
      path: '/capsules/:capsuleId/edit',
      component: CapsuleEditView,
    },
    {
      path: '/signup',
      component: SignupView,
    },
    {
      path: '/me',
      component: MeView,
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  const isLoggedIn = !!authStore.accessToken

  const isPublicPage =
    to.path === '/login' ||
    to.path === '/signup'

  if (!isLoggedIn && !isPublicPage) {
    return '/login'
  }

  if (
    isLoggedIn &&
    (to.path === '/login' || to.path === '/signup')
  ) {
    return '/capsules'
  }

  return true
})

export default router