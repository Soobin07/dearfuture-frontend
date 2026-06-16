<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/api/authApi'

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const result = await login(
      email.value,
      password.value,
    )

    console.log(result)
    alert('로그인 성공')
  } catch (error) {
    alert('로그인 실패')
  }
}
</script>

<template>
  <div>
    <h1>로그인</h1>

    <input
      v-model="email"
      placeholder="이메일"
    />

    <input
      v-model="password"
      type="password"
      placeholder="비밀번호"
    />

    <button @click="handleLogin">
      로그인
    </button>
  </div>
</template>