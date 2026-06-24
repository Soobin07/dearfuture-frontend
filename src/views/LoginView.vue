<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    await authStore.loginUser(email.value, password.value)
    router.push('/capsules')
  } catch (error) {
    console.error(error)
    alert('로그인 실패')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-8">
      <h1 class="text-3xl font-bold text-center mb-2">Dear Future</h1>
      <p class="text-center text-gray-500 mb-8">미래의 나에게 보내는 캡슐</p>

      <div class="space-y-4">
        <input
          v-model="email"
          class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="이메일"
        />

        <input
          v-model="password"
          type="password"
          class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="비밀번호"
        />

        <button
          class="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700"
          @click="handleLogin"
        >
          로그인
        </button>
      </div>

      <p class="text-center text-sm text-gray-500 mt-6">
        계정이 없나요?
        <RouterLink to="/signup" class="text-blue-600 hover:underline">
          회원가입
        </RouterLink>
      </p>
    </div>
  </div>
</template>