<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="bg-white border-b shadow-sm">
    <div
      class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between"
    >
      <h1
        class="text-xl font-bold cursor-pointer"
        @click="router.push('/capsules')"
      >
        Dear Future
      </h1>

      <nav class="flex gap-4">
        <button
          class="hover:text-blue-600"
          @click="router.push('/capsules')"
        >
          캡슐 목록
        </button>

        <button
          class="hover:text-blue-600"
          @click="router.push('/capsules/create')"
        >
          캡슐 작성
        </button>

        <button
          class="text-red-500 hover:text-red-700"
          @click="handleLogout"
        >
          로그아웃
        </button>
      </nav>
    </div>
  </header>
</template>