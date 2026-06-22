import { api } from './axios'

export const login = async (
  email: string,
  password: string,
) => {
  const response = await api.post('/api/auth/login', {
    email,
    password,
  })

  return response.data
}

export const signup = async (
  email: string,
  password: string,
  nickname: string,
) => {
  const response = await api.post('/api/users/signup', {
    email,
    password,
    nickname,
  })

  return response.data
}