<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signup } from '@/api/authApi'

const router = useRouter()

const email = ref('')
const password = ref('')
const nickname = ref('')

const handleSignup = async () => {
  try {
    await signup(
      email.value,
      password.value,
      nickname.value,
    )

    alert('회원가입 성공')
    router.push('/login')
  } catch (error) {
    console.error(error)
    alert('회원가입 실패')
  }
}
</script>

<template>
  <div>
    <h1>회원가입</h1>

    <input
      v-model="email"
      placeholder="이메일"
    />

    <input
      v-model="password"
      type="password"
      placeholder="비밀번호"
    />

    <input
      v-model="nickname"
      placeholder="닉네임"
    />

    <button @click="handleSignup">
      회원가입
    </button>
  </div>
</template>