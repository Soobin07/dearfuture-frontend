import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '@/api/authApi'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'))

  const loginUser = async (email: string, password: string) => {
    const result = await login(email, password)

    accessToken.value = result.accessToken
    localStorage.setItem('accessToken', result.accessToken)
  }

  const logout = () => {
    accessToken.value = null
    localStorage.removeItem('accessToken')
  }

  return {
    accessToken,
    loginUser,
    logout,
  }
})