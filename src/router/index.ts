import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import CapsuleListView from '@/views/CapsuleListView.vue'
import CapsuleCreateView from '@/views/CapsuleCreateView.vue'
import CapsuleDetailView from '@/views/CapsuleDetailView.vue'
import CapsuleEditView from '@/views/CapsuleEditView.vue'
import SignupView from '@/views/SignupView.vue'

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
  ],
})

export default router