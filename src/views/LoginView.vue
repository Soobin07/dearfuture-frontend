<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    await authStore.loginUser(email.value, password.value)
    alert('로그인 성공')
    router.push('/capsules')
  } catch (error) {
    console.error(error)
    alert('로그인 실패')
  }
}
</script>

<template>
  <div>
    <h1>로그인</h1>

    <input v-model="email" placeholder="이메일" />
    <input v-model="password" type="password" placeholder="비밀번호" />

    <button @click="handleLogin">로그인</button>
    <RouterLink to="/signup">
      회원가입
    </RouterLink>
  </div>
</template>