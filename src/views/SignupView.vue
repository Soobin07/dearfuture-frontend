<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { signup } from '@/api/authApi'

const router = useRouter()

const email = ref('')
const password = ref('')
const nickname = ref('')

const handleSignup = async () => {
  try {
    await signup(email.value, password.value, nickname.value)
    alert('회원가입 성공')
    router.push('/login')
  } catch (error) {
    console.error(error)
    alert('회원가입 실패')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-2xl shadow p-8">
      <h1 class="text-3xl font-bold text-center mb-2">회원가입</h1>
      <p class="text-center text-gray-500 mb-8">Dear Future 시작하기</p>

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

        <input
          v-model="nickname"
          class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="닉네임"
        />

        <button
          class="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700"
          @click="handleSignup"
        >
          회원가입
        </button>
      </div>

      <p class="text-center text-sm text-gray-500 mt-6">
        이미 계정이 있나요?
        <RouterLink to="/login" class="text-blue-600 hover:underline">
          로그인
        </RouterLink>
      </p>
    </div>
  </div>
</template>